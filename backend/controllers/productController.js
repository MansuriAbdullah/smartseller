const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const SellerProduct = require('../models/SellerProduct');
const APIFeatures = require('../utils/apiFeatures');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    // Only exclude explicitly deleted products
    const queryCopy = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'keyword'];
    excludedFields.forEach(el => delete queryCopy[el]);

    // Handle initial filter (isDeleted)
    let filter = { isDeleted: { $ne: true }, ...queryCopy };

    // Total Count for Pagination (before pagination is applied)
    const countFeatures = new APIFeatures(Product.find(filter), req.query).search().filter();
    const totalCount = await Product.countDocuments(countFeatures.query.getFilter());

    const limit = req.query.limit * 1 || 10;
    const totalPages = Math.ceil(totalCount / limit);

    const features = new APIFeatures(Product.find(filter), req.query)
        .search()
        .filter()
        .sort()
        .paginate();

    const products = await features.query;

    res.json({
        success: true,
        count: products.length,
        totalCount,
        totalPages,
        data: products,
    });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product && !product.isDeleted) {
        res.json({ success: true, data: product });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Seller/Admin
const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, selling_price, category, brand } = req.body;

    let productData = {
        seller_id: req.user._id,
        name,
        description,
        price: Number(price),
        selling_price: Number(selling_price),
        profit: Number(req.body.profit) || 0,
        category,
        brand
    };

    // Handle single image
    if (req.files && req.files.image) {
        productData.image = `/uploads/${req.files.image[0].filename}`;
    }

    // Handle gallery images
    if (req.files && req.files.gallery) {
        productData.gallery = req.files.gallery.map(file => `/uploads/${file.filename}`);
    }

    const product = await Product.create(productData);

    res.status(201).json({
        success: true,
        data: product,
    });
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Seller/Admin
const updateProduct = asyncHandler(async (req, res) => {
    let product = await Product.findById(req.params.id);

    if (!product || product.isDeleted) {
        res.status(404);
        throw new Error('Product not found');
    }

    // Make sure user is product owner or admin
    if (product.seller_id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        res.status(401);
        throw new Error('User not authorized to update this product');
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.json({ success: true, data: product });
});

// @desc    Delete a product (Soft delete)
// @route   DELETE /api/products/:id
// @access  Private/Seller/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product || product.isDeleted) {
        res.status(404);
        throw new Error('Product not found');
    }

    // Make sure user is product owner or admin
    if (product.seller_id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        res.status(401);
        throw new Error('User not authorized to delete this product');
    }

    product.isDeleted = true;
    await product.save();

    res.json({ success: true, message: 'Product removed' });
});

// @desc    Get logged-in seller's products with Pagination & Search (Handling Missing Products)
// @route   GET /api/products/my-products
// @access  Private/Seller
const getSellerProducts = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const keyword = req.query.keyword ? req.query.keyword.toLowerCase() : null;

    // 1. Find all SellerProduct entries for this seller
    const sellerId = req.user.id; // Custom Numeric ID
    const sellerObjectId = req.user._id; // ObjectId

    let query = {
        $or: [
            { seller_id: sellerId },
            { seller_id: String(sellerId) },
            { seller_id: sellerObjectId },
            { seller_id: String(sellerObjectId) }
        ]
    };

    // Get ALL linked product links
    const sellerProductsLink = await SellerProduct.find(query).sort({ created_at: -1 });

    if (!sellerProductsLink || sellerProductsLink.length === 0) {
        return res.json({
            success: true,
            count: 0,
            totalCount: 0,
            totalPages: 0,
            currentPage: page,
            data: []
        });
    }

    const productIds = sellerProductsLink.map(sp => sp.product_id);

    // 2. Fetch Actual Products (Bulk)
    // We fetch all potential matches to merge valid data
    const dbProducts = await Product.find({
        $or: [
            { _id: { $in: productIds.filter(id => mongoose.isValidObjectId(id)) } },
            { id: { $in: productIds } }
        ]
    });

    // Create a Lookup Map for O(1) access
    const productMap = new Map();
    dbProducts.forEach(p => {
        productMap.set(String(p._id), p);
        if (p.id) productMap.set(String(p.id), p);
    });

    // 3. Merge & Create Placeholders
    let combinedProducts = sellerProductsLink.map(link => {
        const linkIdStr = String(link.product_id);
        const product = productMap.get(linkIdStr);

        if (product) {
            return {
                ...product.toObject(),
                // Keep the link info if needed, or ensure IDs are consistent
                _id: product._id,
                id: product.id,
                link_id: link.id // unique id from SellerProduct might be useful
            };
        } else {
            // Placeholder for Missing Product
            return {
                _id: mongoose.isValidObjectId(link.product_id) ? link.product_id : undefined,
                id: link.product_id, // Show the ID that is missing
                name: `Product Unavailable (ID: ${link.product_id})`,
                description: 'This product is no longer available in the main catalog.',
                price: 0,
                selling_price: 0,
                profit: 0,
                category: 'Unknown',
                image: '', // Placeholder image could be handled on frontend
                status: 'Unavailable',
                link_id: link.id,
                is_missing: true
            };
        }
    });

    // 4. Client-side Search (In-Memory)
    if (keyword) {
        combinedProducts = combinedProducts.filter(p =>
            (p.name && p.name.toLowerCase().includes(keyword)) ||
            (p.category && p.category.toLowerCase().includes(keyword)) ||
            (p.id && String(p.id).includes(keyword))
        );
    }

    // 5. Client-side Pagination
    const totalCount = combinedProducts.length;
    const totalPages = Math.ceil(totalCount / limit);

    // Slice for current page
    const paginatedProducts = combinedProducts.slice(skip, skip + limit);

    res.json({
        success: true,
        count: paginatedProducts.length,
        totalCount,
        totalPages,
        currentPage: page,
        data: paginatedProducts
    });
});

// @desc    Add a product to seller's store (my products)
// @route   POST /api/products/add-to-store
// @access  Private/Seller
const addToMyStore = asyncHandler(async (req, res) => {
    const { product_id } = req.body; // Expecting ID (could be custom "75" or ObjectId)

    if (!product_id) {
        res.status(400);
        throw new Error('Product ID is required');
    }

    // Check if product exists
    const product = await Product.findOne({
        $or: [
            { _id: mongoose.isValidObjectId(product_id) ? product_id : null },
            { id: product_id }
        ]
    });

    if (!product) {
        res.status(404);
        throw new Error('Product not found in Storehouse');
    }

    // Determine seller ID to use (prefer custom ID if available, else ObjectId)
    const sellerId = req.user.id || req.user._id;

    // Check if already added
    const existingLink = await SellerProduct.findOne({
        $or: [
            { seller_id: req.user.id, product_id: product.id }, // Check custom ID match
            { seller_id: req.user._id, product_id: product._id }, // Check ObjectId match
            // Mixed check
            { seller_id: req.user.id, product_id: product._id },
            { seller_id: req.user._id, product_id: product.id }
        ]
    });

    if (existingLink) {
        res.status(400);
        throw new Error('Product already added to your store');
    }

    // Generate a new unique ID for SellerProduct if needed, or let DB handle _id.
    // Schema has 'id' required. We need to generate one?
    // Let's find max ID and increment, or use timestamp.
    const lastRec = await SellerProduct.findOne().sort({ id: -1 });
    const newId = lastRec && lastRec.id ? lastRec.id + 1 : 1;

    // Create Link
    // We prefer using the same ID type as found in Product. 
    // If product has custom 'id', use that. Else use '_id'.
    const linkProductId = product.id || product._id;

    const newLink = await SellerProduct.create({
        id: newId,
        seller_id: sellerId,
        product_id: linkProductId
    });

    res.status(201).json({
        success: true,
        message: 'Product added to your store',
        data: newLink
    });
});

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getSellerProducts,
    addToMyStore,
};

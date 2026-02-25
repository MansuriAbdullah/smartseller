const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Seller = require('../models/Seller');
const Package = require('../models/Package');
const Recharge = require('../models/Recharge');
const Withdraw = require('../models/Withdraw');
const Order = require('../models/Order');
const Product = require('../models/Product');
const SellerProduct = require('../models/SellerProduct');
const bcrypt = require('bcryptjs');

// ===================== DASHBOARD STATS ====================

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
    const totalUsers = await Seller.countDocuments({ role: 'seller' });
    const totalProducts = await Product.countDocuments({ isDeleted: { $ne: true } });
    const totalOrders = await Order.countDocuments({});
    const totalRecharges = await Recharge.countDocuments({});
    const totalWithdrawals = await Withdraw.countDocuments({});
    const totalPackages = await Package.countDocuments({});

    const pendingRecharges = await Recharge.countDocuments({ status: 0 });
    const pendingWithdrawals = await Withdraw.countDocuments({ status: 0 });

    // Revenue summary
    const rechargeRevenue = await Recharge.aggregate([
        { $match: { status: 1 } },
        { $group: { _id: null, total: { $sum: { $toDouble: '$amount' } } } }
    ]);
    const totalRevenue = rechargeRevenue.length > 0 ? rechargeRevenue[0].total : 0;

    // Orders this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const ordersThisMonth = await Order.countDocuments({ createdAt: { $gte: startOfMonth } });

    // New sellers this month
    const newSellers = await Seller.countDocuments({ role: 'seller', createdAt: { $gte: startOfMonth } });

    res.json({
        success: true,
        stats: {
            totalUsers,
            totalProducts,
            totalOrders,
            totalRecharges,
            totalWithdrawals,
            totalPackages,
            pendingRecharges,
            pendingWithdrawals,
            totalRevenue,
            ordersThisMonth,
            newSellers
        }
    });
});

// ===================== USER MANAGEMENT ====================

// @desc    Get all sellers/users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const keyword = req.query.keyword || '';

    let filter = { role: 'seller' };
    if (keyword) {
        filter.$or = [
            { name: { $regex: keyword, $options: 'i' } },
            { email: { $regex: keyword, $options: 'i' } },
            { shop_name: { $regex: keyword, $options: 'i' } }
        ];
    }

    const total = await Seller.countDocuments(filter);
    const users = await Seller.find(filter)
        .select('-password -trans_password -otp -otpExpires')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    res.json({
        success: true,
        users,
        total,
        page,
        pages: Math.ceil(total / limit)
    });
});

// @desc    Get single user
// @route   GET /api/admin/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await Seller.findById(req.params.id).select('-password -trans_password -otp -otpExpires');
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    res.json({ success: true, user });
});

// @desc    Update user (freeze/unfreeze, verify, etc.)
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await Seller.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.shop_name = req.body.shop_name || user.shop_name;
    if (req.body.freeze !== undefined) user.freeze = req.body.freeze;
    if (req.body.verified !== undefined) user.verified = req.body.verified;

    const updated = await user.save();
    res.json({
        success: true,
        user: {
            _id: updated._id,
            name: updated.name,
            email: updated.email,
            shop_name: updated.shop_name,
            freeze: updated.freeze,
            verified: updated.verified,
            role: updated.role
        }
    });
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await Seller.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    if (user.role === 'admin') {
        res.status(400);
        throw new Error('Cannot delete admin account');
    }
    await user.deleteOne();
    res.json({ success: true, message: 'User deleted' });
});

// ===================== PACKAGE MANAGEMENT ====================

// @desc    Get all packages (admin)
// @route   GET /api/admin/packages
// @access  Private/Admin
const getAllPackages = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const total = await Package.countDocuments({});
    const packages = await Package.aggregate([
        {
            $lookup: {
                from: 'sellers',
                localField: 'seller_id',
                foreignField: '_id',
                as: 'seller_obj'
            }
        },
        {
            $lookup: {
                from: 'sellers',
                localField: 'seller_id',
                foreignField: 'id',
                as: 'seller_num'
            }
        },
        {
            $addFields: {
                seller_data: {
                    $cond: {
                        if: { $gt: [{ $size: '$seller_obj' }, 0] },
                        then: { $arrayElemAt: ['$seller_obj', 0] },
                        else: { $arrayElemAt: ['$seller_num', 0] }
                    }
                }
            }
        },
        {
            $project: {
                _id: 1, id: 1, type: 1, amount: 1, profit: 1, product_limit: 1, created_at: 1,
                seller: { name: '$seller_data.name', email: '$seller_data.email', shop_name: '$seller_data.shop_name' }
            }
        },
        { $sort: { created_at: -1 } },
        { $skip: skip },
        { $limit: limit }
    ]);

    res.json({ success: true, packages, total, page, pages: Math.ceil(total / limit) });
});

// ===================== RECHARGE MANAGEMENT ====================

// @desc    Get all recharges (admin)
// @route   GET /api/admin/recharges
// @access  Private/Admin
const getAllRecharges = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const status = req.query.status; // 0=pending, 1=approved, 2=rejected

    let filter = {};
    if (status !== undefined && status !== 'all') filter.status = Number(status);

    const total = await Recharge.countDocuments(filter);
    const recharges = await Recharge.find(filter)
        .populate({ path: 'seller_id', select: 'name email shop_name', model: 'Seller' })
        .sort({ createdAt: -1, created_at: -1 })
        .skip(skip)
        .limit(limit);

    res.json({ success: true, recharges, total, page, pages: Math.ceil(total / limit) });
});

// @desc    Update recharge status
// @route   PUT /api/admin/recharges/:id
// @access  Private/Admin
const updateRechargeStatus = asyncHandler(async (req, res) => {
    const { status, reason } = req.body;
    const recharge = await Recharge.findById(req.params.id);

    if (!recharge) {
        res.status(404);
        throw new Error('Recharge not found');
    }

    recharge.status = status;
    if (reason) recharge.reason = reason;
    await recharge.save();

    res.json({ success: true, recharge });
});

// ===================== WITHDRAWAL MANAGEMENT ====================

// @desc    Get all withdrawals (admin)
// @route   GET /api/admin/withdrawals
// @access  Private/Admin
const getAllWithdrawals = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const status = req.query.status;

    let matchFilter = {};
    if (status !== undefined && status !== 'all') matchFilter.status = Number(status);

    const total = await Withdraw.countDocuments(matchFilter);
    const withdrawals = await Withdraw.aggregate([
        { $match: matchFilter },
        {
            $lookup: {
                from: 'sellers',
                localField: 'seller_id',
                foreignField: '_id',
                as: 'seller_data'
            }
        },
        {
            $unwind: { path: '$seller_data', preserveNullAndEmptyArrays: true }
        },
        {
            $project: {
                _id: 1, amount: 1, op_type: 1, status: 1, reason: 1, message: 1, createdAt: 1,
                seller: { name: '$seller_data.name', email: '$seller_data.email', shop_name: '$seller_data.shop_name' }
            }
        },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit }
    ]);

    res.json({ success: true, withdrawals, total, page, pages: Math.ceil(total / limit) });
});

// @desc    Update withdrawal status
// @route   PUT /api/admin/withdrawals/:id
// @access  Private/Admin
const updateWithdrawalStatus = asyncHandler(async (req, res) => {
    const { status, reason } = req.body;
    const withdrawal = await Withdraw.findById(req.params.id);

    if (!withdrawal) {
        res.status(404);
        throw new Error('Withdrawal not found');
    }

    withdrawal.status = status;
    if (reason) withdrawal.reason = reason;
    await withdrawal.save();

    res.json({ success: true, withdrawal });
});

// ===================== ORDER MANAGEMENT ====================

// @desc    Get all orders (admin)
// @route   GET /api/admin/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const keyword = req.query.keyword || '';
    const status = req.query.status;

    let filter = {};
    if (status && status !== 'all') filter.status = status;
    if (keyword) {
        filter.$or = [
            { customer_name: { $regex: keyword, $options: 'i' } },
            { order_code: { $regex: keyword, $options: 'i' } },
            { customer_phone: { $regex: keyword, $options: 'i' } }
        ];
    }

    const total = await Order.countDocuments(filter);
    const orders = await Order.aggregate([
        { $match: filter },
        {
            $lookup: {
                from: 'sellers',
                localField: 'seller_id',
                foreignField: '_id',
                as: 'seller_data'
            }
        },
        {
            $unwind: { path: '$seller_data', preserveNullAndEmptyArrays: true }
        },
        {
            $project: {
                _id: 1, order_code: 1, customer_name: 1, customer_phone: 1,
                customer_address: 1, order_total: 1, cost_amount: 1,
                status: 1, pick_up_status: 1, payment_status: 1, createdAt: 1,
                seller: { name: '$seller_data.name', email: '$seller_data.email', shop_name: '$seller_data.shop_name' }
            }
        },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit }
    ]);

    res.json({ success: true, orders, total, page, pages: Math.ceil(total / limit) });
});

// @desc    Update order status
// @route   PUT /api/admin/orders/:id
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    if (req.body.status) order.status = req.body.status;
    if (req.body.payment_status) order.payment_status = req.body.payment_status;
    if (req.body.pick_up_status) order.pick_up_status = req.body.pick_up_status;

    await order.save();
    res.json({ success: true, order });
});

// @desc    Delete order
// @route   DELETE /api/admin/orders/:id
// @access  Private/Admin
const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }
    await order.deleteOne();
    res.json({ success: true, message: 'Order deleted' });
});

// ===================== PRODUCT MANAGEMENT ====================

// @desc    Get all products (admin - storehouse)
// @route   GET /api/admin/products
// @access  Private/Admin
const getAllProducts = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const keyword = req.query.keyword || '';
    const category = req.query.category || '';

    let filter = { isDeleted: { $ne: true } };
    if (keyword) {
        filter.$or = [
            { name: { $regex: keyword, $options: 'i' } },
            { category: { $regex: keyword, $options: 'i' } },
            { brand: { $regex: keyword, $options: 'i' } }
        ];
    }
    if (category) filter.category = { $regex: category, $options: 'i' };

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    // Get categories list
    const categories = await Product.distinct('category', { isDeleted: { $ne: true } });

    res.json({ success: true, products, total, page, pages: Math.ceil(total / limit), categories });
});

// @desc    Create product (admin adds to storehouse)
// @route   POST /api/admin/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, selling_price, profit, category, brand } = req.body;

    if (!name || !description || !price || !selling_price || !category) {
        res.status(400);
        throw new Error('Please fill all required fields');
    }

    let image = '';
    if (req.files && req.files.image) {
        image = `/uploads/${req.files.image[0].filename}`;
    } else if (req.body.image) {
        image = req.body.image;
    }

    if (!image) {
        res.status(400);
        throw new Error('Product image is required');
    }

    const product = await Product.create({
        name,
        description,
        price: Number(price),
        selling_price: Number(selling_price),
        profit: Number(profit) || (Number(selling_price) - Number(price)),
        category,
        brand: brand || '',
        image,
        seller_id: req.user._id,
        status: 1
    });

    res.status(201).json({ success: true, product });
});

// @desc    Update product (admin)
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product || product.isDeleted) {
        res.status(404);
        throw new Error('Product not found');
    }

    const updates = { ...req.body };
    if (req.files && req.files.image) {
        updates.image = `/uploads/${req.files.image[0].filename}`;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    res.json({ success: true, product: updated });
});

// @desc    Delete product (admin - soft delete)
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product || product.isDeleted) {
        res.status(404);
        throw new Error('Product not found');
    }

    product.isDeleted = true;
    await product.save();

    res.json({ success: true, message: 'Product removed from storehouse' });
});

// @desc    Permanently delete product
// @route   DELETE /api/admin/products/:id/permanent
// @access  Private/Admin
const permanentDeleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    await product.deleteOne();
    res.json({ success: true, message: 'Product permanently deleted' });
});

module.exports = {
    getDashboardStats,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getAllPackages,
    getAllRecharges,
    updateRechargeStatus,
    getAllWithdrawals,
    updateWithdrawalStatus,
    getAllOrders,
    updateOrderStatus,
    deleteOrder,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    permanentDeleteProduct
};

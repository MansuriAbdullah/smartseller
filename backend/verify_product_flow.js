const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const jwt = require('jsonwebtoken');
const Product = require('./models/Product');
const Seller = require('./models/Seller');
const SellerProduct = require('./models/SellerProduct');

// Load env vars
dotenv.config();

const runVerification = async () => {
    try {
        console.log('Connecting to MongoDB...'.yellow);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected'.green);

        // 1. Setup/Login Users
        console.log('\n--- Setting up Users ---'.cyan);

        const deleteIfExists = async (email) => {
            await Seller.deleteOne({ email });
        };

        // Clean up previous test users to avoid ID conflicts
        // OR better: Find and use them, ensuring they have IDs??
        // Simpler: Just create new ones with randomized email/id each run or clean up specific emails.

        const uniqueId = Math.floor(Date.now() / 1000);

        // Ensure Admin
        let admin = await Seller.findOne({ email: 'admin_test@example.com' });
        if (!admin) {
            admin = await Seller.create({
                id: uniqueId + 1,
                name: 'Test Admin',
                email: 'admin_test@example.com',
                password: 'password123',
                role: 'admin',
                shop_name: 'Admin Shop'
            });
            console.log('Created Test Admin'.green);
        } else {
            console.log('Found Test Admin'.green);
        }

        // Ensure Seller
        let seller = await Seller.findOne({ email: 'seller_test@example.com' });
        if (!seller) {
            seller = await Seller.create({
                id: uniqueId + 2,
                name: 'Test Seller',
                email: 'seller_test@example.com',
                password: 'password123',
                shop_name: 'Seller Shop'
            });
            console.log('Created Test Seller'.green);
        } else {
            console.log('Found Test Seller'.green);
        }

        // 2. Admin Adds Product
        console.log('\n--- Step 1: Admin Adds Product ---'.cyan);
        const uniqueName = `Test Product ${Date.now()}`;
        const productData = {
            seller_id: admin._id,
            name: uniqueName,
            description: 'This is a test product created by verification script',
            price: 100,
            selling_price: 150,
            profit: 50,
            category: 'Electronics',
            brand: 'TestBrand',
            image: '/uploads/test_product.jpg' // Required
        };

        const createdProduct = await Product.create(productData);
        console.log(`Product Created by Admin: ${createdProduct.name} (ID: ${createdProduct._id})`.green);

        // 3. Check Storehouse (Public Fetch)
        console.log('\n--- Step 2: Verify Product in Storehouse ---'.cyan);
        const storehouseProducts = await Product.find({ isDeleted: { $ne: true } });
        const inStorehouse = storehouseProducts.find(p => p._id.toString() === createdProduct._id.toString());

        if (inStorehouse) {
            console.log('SUCCESS: Product is visible in Storehouse Query'.green);
        } else {
            console.log('FAILURE: Product NOT found in Storehouse Query'.red);
        }

        // 4. Seller Adds Product to My Store
        console.log('\n--- Step 3: Seller Adds Product to My Store ---'.cyan);

        // Check if already exists (cleanup from previous runs if any)
        await SellerProduct.deleteOne({ seller_id: seller._id, product_id: createdProduct._id });

        const newLink = await SellerProduct.create({
            id: Date.now(), // simple numeric id
            seller_id: seller._id,
            product_id: createdProduct._id
        });

        console.log(`Product linked to Seller Store (Link ID: ${newLink.id})`.green);

        // 5. Verify in Seller's My Products
        console.log('\n--- Step 4: Verify in Seller My Products ---'.cyan);

        // Simulate the logic in getSellerProducts controller
        const sellerLinks = await SellerProduct.find({ seller_id: seller._id });
        const linkExists = sellerLinks.find(l => l.product_id.toString() === createdProduct._id.toString());

        if (linkExists) {
            // Fetch the actual product to confirm details match
            const finalProduct = await Product.findById(linkExists.product_id);
            if (finalProduct) {
                console.log(`SUCCESS: Product found in Seller's List: ${finalProduct.name}`.green);
                console.log('Database Data Verified:'.yellow);
                console.log(` - Product ID: ${finalProduct._id}`);
                console.log(` - Seller Link: seller_id=${seller._id} <-> product_id=${finalProduct._id}`);
            } else {
                console.log('PARTIAL: Link exists but Product details fetch failed?'.red);
            }
        } else {
            console.log('FAILURE: Product link NOT found in Seller Products'.red);
        }

        console.log('\nVerification Complete.'.bold);
        process.exit();

    } catch (error) {
        console.error('Error Running Verification:'.red, error);
        process.exit(1);
    }
};

runVerification();

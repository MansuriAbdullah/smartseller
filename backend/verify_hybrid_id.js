const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Seller = require('./models/Seller');
const Order = require('./models/Order');
const connectDB = require('./config/db');

dotenv.config();

const verifyHybridFlow = async () => {
    try {
        await connectDB();

        // 1. Create a Test Seller with both _id and id
        const sellerData = {
            id: Math.floor(Math.random() * 1000000),
            name: 'Hybrid Test Seller',
            email: `hybrid_seller_${Date.now()}@example.com`,
            password: 'password123',
            shop_name: 'Hybrid Shop',
            role: 'seller'
        };

        const seller = await Seller.create(sellerData);
        console.log(`Created Seller: _id=${seller._id}, id=${seller.id}`);

        // 2. Create Order 1: Assigned via ObjectId (New way)
        await Order.create({
            order_code: 'ORD-ObjectID-' + Date.now(),
            seller_id: seller._id,
            customer_name: 'Customer ObjectId',
            customer_address: 'Address 1',
            order_total: "100.00",
            status: 'pending'
        });

        // 3. Create Order 2: Assigned via Numeric ID (Old/Legacy way)
        await Order.create({
            order_code: 'ORD-NumericID-' + Date.now(),
            seller_id: seller.id, // Number
            customer_name: 'Customer Numeric',
            customer_address: 'Address 2',
            order_total: "200.00",
            status: 'pending'
        });

        // 4. Create Order 3: Assigned via String Numeric ID (Edge case)
        await Order.create({
            order_code: 'ORD-StringID-' + Date.now(),
            seller_id: String(seller.id), // String
            customer_name: 'Customer String',
            customer_address: 'Address 3',
            order_total: "300.00",
            status: 'pending'
        });

        console.log('Created 3 orders with different seller_id types.');

        // 5. Verify Logic: Emulate what getMyOrders does
        // Logic: $or: [ { seller_id: req.user._id }, { seller_id: req.user.id }, { seller_id: String(req.user.id) } ]

        const filter = {
            $or: [
                { seller_id: seller._id },
                { seller_id: seller.id },
                { seller_id: String(seller.id) }
            ]
        };

        const foundOrders = await Order.find(filter);
        console.log(`Found ${foundOrders.length} orders for this seller.`);

        if (foundOrders.length === 3) {
            console.log('✅ SUCCESS: All 3 orders found! Filter handles Mixed types correctly.');
        } else {
            console.log('❌ FAILURE: Expected 3 orders.');
            foundOrders.forEach(o => console.log(` - Found: ${o.order_code} (seller_id: ${o.seller_id})`));
        }

        // Cleanup
        await Seller.deleteOne({ _id: seller._id });
        await Order.deleteMany({ seller_id: { $in: [seller._id, seller.id, String(seller.id)] } });
        console.log('Cleanup done.');
        process.exit(0);

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

verifyHybridFlow();

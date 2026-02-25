const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Order = require('./models/Order');
const connectDB = require('./config/db');

dotenv.config();

const inspectOrders = async () => {
    try {
        await connectDB();
        const orders = await Order.find().limit(5);

        console.log('--- Inspecting Order seller_id types ---');
        orders.forEach(order => {
            console.log(`Order Code: ${order.order_code}`);
            console.log(`Seller ID Value: ${order.seller_id}`);
            console.log(`Seller ID Type: ${typeof order.seller_id}`);
            // Check if it's an ObjectId object or string
            if (mongoose.Types.ObjectId.isValid(order.seller_id)) {
                console.log('Is Valid ObjectId: Yes');
                if (order.seller_id instanceof mongoose.Types.ObjectId) {
                    console.log('Instance of ObjectId: Yes');
                } else {
                    console.log('Instance of ObjectId: No (It is a String representation)');
                }
            } else {
                console.log('Is Valid ObjectId: No');
            }
            console.log('---');
        });

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

inspectOrders();

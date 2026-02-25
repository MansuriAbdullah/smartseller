const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Seller = require('./models/Seller');
const Order = require('./models/Order');
const Recharge = require('./models/Recharge');
const Withdraw = require('./models/Withdraw');
const GuaranteeMoney = require('./models/GuaranteeMoney');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const listAllSellers = async () => {
    await connectDB();

    const sellers = await Seller.find({});
    console.log(`\n--- Found ${sellers.length} Sellers ---`);

    for (const seller of sellers) {
        console.log(`\nEmail: ${seller.email}`);
        console.log(`ID: ${seller._id} (Numeric: ${seller.id})`);

        const orders = await Order.countDocuments({ seller_id: seller._id });
        console.log(`- Orders: ${orders}`);

        const recharges = await Recharge.countDocuments({ seller_id: seller._id }); // Using generic 'seller_id' field name as per schema update
        console.log(`- Recharges: ${recharges}`);
    }

    process.exit();
};

listAllSellers();

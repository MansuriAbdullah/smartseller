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

const fixData = async () => {
    await connectDB();

    const sellers = await Seller.find({});
    console.log(`Found ${sellers.length} Sellers. Adding data for them...`);

    for (const seller of sellers) {
        console.log(`Processing ${seller.email}...`);

        // 1. Create Orders (Sales)
        // Add 5 orders
        for (let i = 0; i < 5; i++) {
            await Order.create({
                order_code: `ORD-${seller.id}-${Date.now()}-${i}`,
                seller_id: seller._id, // LINKING BY OBJECTID
                customer_name: `Customer ${i}`,
                customer_address: '123 Test St',
                order_total: "150.00",
                status: 'completed'
            });
        }
        console.log(`- Added 5 Completed Orders`);

        // 2. Create Recharges
        await Recharge.create({
            id: Math.floor(Math.random() * 1000000),
            seller_id: seller._id, // LINKING BY OBJECTID
            amount: "500",
            mode: 'bank',
            status: 1
        });
        await Recharge.create({
            id: Math.floor(Math.random() * 1000000),
            seller_id: seller._id,
            amount: "1000",
            mode: 'crypto',
            status: 1
        });
        console.log(`- Added 2 Recharges`);

        // 3. Create Withdrawals
        await Withdraw.create({
            seller_id: seller._id,
            amount: 200,
            op_type: 1,
            status: 1 // Approved
        });
        await Withdraw.create({
            seller_id: seller._id,
            amount: 50,
            op_type: 1,
            status: 0 // Pending
        });
        console.log(`- Added 2 Withdrawals`);

        // 4. Create Guarantee Money
        await GuaranteeMoney.create({
            id: Math.floor(Math.random() * 100000),
            seller_id: seller._id,
            amount: 2000,
            receipt: 'receipt.jpg',
            status: 1
        });
        console.log(`- Added Guarantee Money`);
    }

    console.log('\nData Population Complete!');
    process.exit();
};

fixData();

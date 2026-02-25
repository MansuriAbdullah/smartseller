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

const auditData = async () => {
    await connectDB();

    // 1. Inspect Sellers
    const sellers = await Seller.find({});
    console.log(`Found ${sellers.length} Sellers.`);

    for (const seller of sellers) {
        console.log(`\n--- Seller: ${seller.email} ---`);
        console.log(`_id (ObjectId): ${seller._id}`);
        console.log(`id (Number): ${seller.id}`);

        const idObj = seller._id;
        const idNum = seller.id;
        const idStr = String(seller.id);

        // Check Orders
        const ordersObj = await Order.countDocuments({ seller_id: idObj });
        const ordersStr = await Order.countDocuments({ seller_id: idStr });
        const ordersNum = await Order.countDocuments({ seller_id: idNum });
        console.log(`Orders: ByObj=${ordersObj}, ByStr=${ordersStr}, ByNum=${ordersNum}`);

        // Check Withdraws
        const withObj = await Withdraw.countDocuments({ seller_id: idObj });
        const withNum = await Withdraw.countDocuments({ seller_id: idNum });
        console.log(`Withdraws: ByObj=${withObj}, ByNum=${withNum}`);

        // Check Recharges
        // Check field names 'user_id' vs 'seller_id'
        const recvUserObj = await Recharge.countDocuments({ user_id: idObj });
        const recvUserNum = await Recharge.countDocuments({ user_id: idNum });
        const recvSellerObj = await Recharge.countDocuments({ seller_id: idObj }); // Check if field exists
        console.log(`Recharges: user_id(Obj)=${recvUserObj}, user_id(Num)=${recvUserNum}, seller_id(Obj)=${recvSellerObj}`);

        // Check Guarantee
        const guarObj = await GuaranteeMoney.countDocuments({ seller_id: idObj });
        const guarNum = await GuaranteeMoney.countDocuments({ seller_id: idNum });
        const guarNumAsObj = await GuaranteeMoney.countDocuments({ seller_id: idObj });
        console.log(`Guarantee: ByObj=${guarObj}, ByNum=${guarNum}`);
    }

    // 2. Dump Samples to see Field Names
    console.log('\n--- Sample Dumps ---');

    const sampleRecharge = await Recharge.findOne({});
    if (sampleRecharge) {
        console.log('Recharge Sample:', JSON.stringify(sampleRecharge.toObject(), null, 2));
    } else {
        console.log('No Recharges found.');
    }

    const sampleGuarantee = await GuaranteeMoney.findOne({});
    if (sampleGuarantee) {
        console.log('Guarantee Sample:', JSON.stringify(sampleGuarantee.toObject(), null, 2));
    } else {
        console.log('No GuaranteeMoney found.');
    }

    // Check if Recharge has strict schema issues (fields in DB not in Mongoose model might be hidden)
    // Use native driver to check actual DB content if needed, but toObject() should show virtuals/etc.
    // Actually, if strict is true, Mongoose might strip unknowns.
    // Let's rely on what we see.

    process.exit();
};

auditData();

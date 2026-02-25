const mongoose = require('mongoose');
const Recharge = require('./models/Recharge');
const Seller = require('./models/Seller');
const dotenv = require('dotenv');
dotenv.config();

const debugData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const recharge = await mongoose.connection.db.collection('recharges').findOne({});
        console.log('Sample Raw Recharge:', JSON.stringify(recharge, null, 2));

        const seller = await Seller.findOne({});
        console.log('Sample Seller:', JSON.stringify(seller, null, 2));

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

debugData();

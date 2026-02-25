const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Withdraw = require('./models/Withdraw');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const debugData = async () => {
    await connectDB();

    console.log('--- Checking Withdrawals ---');
    const withdrawals = await Withdraw.find({}).limit(5).lean();
    console.log(JSON.stringify(withdrawals, null, 2));

    process.exit();
};

debugData();

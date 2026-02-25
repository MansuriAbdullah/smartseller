const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const run = async () => {
    try {
        console.log('Connecting to:', process.env.MONGO_URI ? 'URI_FOUND' : 'URI_MISSING');
        if (!process.env.MONGO_URI) throw new Error('MONGO_URI missing');

        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected.');

        const db = mongoose.connection.db;
        const sID_str = "11";
        const sID_num = 11;

        console.log('--- Diagnosis ---');

        const pTotalStr = await db.collection('products').countDocuments({ seller_id: sID_str });
        console.log('P_Str:', pTotalStr);

        const pTotalNum = await db.collection('products').countDocuments({ seller_id: sID_num });
        console.log('P_Num:', pTotalNum);

        const oTotalStr = await db.collection('orders').countDocuments({ seller_id: sID_str });
        console.log('O_Str:', oTotalStr);

        const pDeleted = await db.collection('products').countDocuments({ seller_id: sID_str, isDeleted: true });
        console.log('P_Deleted:', pDeleted);

        process.exit(0);
    } catch (err) {
        console.error('DIAG_ERROR:', err.message);
        process.exit(1);
    }
};

run();

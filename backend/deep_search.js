const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const db = mongoose.connection.db;

        const sID_str = "11";
        const sID_num = 11;

        console.log('--- SELLERPRODUCTS ---');
        const countStr = await db.collection('sellerproducts').countDocuments({ seller_id: sID_str });
        const countNum = await db.collection('sellerproducts').countDocuments({ seller_id: sID_num });
        console.log('Count String "11":', countStr);
        console.log('Count Numeric 11:', countNum);

        const sample = await db.collection('sellerproducts').findOne({ seller_id: sID_str });
        if (sample) {
            console.log('Sample sellerproduct fields:', Object.keys(sample));
            console.log('Sample sellerproduct seller_id:', sample.seller_id, 'Type:', typeof sample.seller_id);
        } else {
            const any = await db.collection('sellerproducts').findOne({});
            console.log('Any sellerproduct seller_id:', any ? any.seller_id : 'NONE', 'Type:', any ? typeof any.seller_id : 'NONE');
        }

        process.exit(0);
    } catch (err) {
        console.error('ERROR:', err.message);
        process.exit(1);
    }
};

run();

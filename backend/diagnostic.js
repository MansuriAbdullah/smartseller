const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const diagnostic = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const db = mongoose.connection.db;

        const numericId = 11;
        const stringId = "11";

        const pNum = await db.collection('products').countDocuments({ seller_id: numericId });
        const pStr = await db.collection('products').countDocuments({ seller_id: stringId });

        const oNum = await db.collection('orders').countDocuments({ seller_id: numericId });
        const oStr = await db.collection('orders').countDocuments({ seller_id: stringId });

        console.log('RESULTS:');
        console.log('Products_Numeric_11:', pNum);
        console.log('Products_String_11:', pStr);
        console.log('Orders_Numeric_11:', oNum);
        console.log('Orders_String_11:', oStr);

        const sampleP = await db.collection('products').findOne({ seller_id: stringId });
        if (sampleP) {
            console.log('Sample_Product_seller_id_type:', typeof sampleP.seller_id);
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

diagnostic();

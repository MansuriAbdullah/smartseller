const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const colors = require('colors'); // removing colors to be safe
const Seller = require('./models/Seller');
const Package = require('./models/Package');

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

    console.log('--- Checking Packages ---');
    // Using lean() to see raw data incase schema strictness hides fields
    const packages = await Package.find({}).limit(1).lean();
    console.log('Package (Raw):', JSON.stringify(packages, null, 2));

    if (packages.length > 0) {
        const sellerId = packages[0].seller_id;
        console.log(`Package seller_id: ${sellerId} (Type: ${typeof sellerId})`);

        console.log('--- Checking Seller ---');
        // Try finding a seller with this "id" property (custom id)
        const sellerByCustomId = await Seller.findOne({ id: sellerId }).lean();
        if (sellerByCustomId) {
            console.log('Found Seller by custom "id" field!');
            console.log('Seller (Raw):', JSON.stringify(sellerByCustomId, null, 2));
        } else {
            console.log('Could NOT find Seller by custom "id" field.');

            // Check if maybe _id IS the number?
            try {
                const sellerByUnderscoreId = await Seller.findById(sellerId).lean();
                console.log('Seller by _id:', sellerByUnderscoreId);
            } catch (e) { console.log('Error finding by _id:', e.message); }
        }

    }

    process.exit();
};

debugData();

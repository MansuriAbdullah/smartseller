const mongoose = require('mongoose');
const dotenv = require('dotenv');
const SellerProduct = require('./models/SellerProduct');
const Product = require('./models/Product');
const Seller = require('./models/Seller');

dotenv.config();

const debugCounts = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        const email = 'zarwebcoders@gmail.com';
        const seller = await Seller.findOne({ email });

        if (!seller) {
            console.log('Seller not found');
            process.exit(1);
        }

        // Query used in controller
        let query = {
            $or: [
                { seller_id: seller.id },
                { seller_id: String(seller.id) },
                { seller_id: seller._id },
                { seller_id: String(seller._id) }
            ]
        };

        const links = await SellerProduct.find(query);
        console.log(`Total SellerProduct links: ${links.length}`);

        const productIds = links.map(sp => sp.product_id);

        // Find existing products
        const products = await Product.find({
            $or: [
                { id: { $in: productIds } },
                { _id: { $in: productIds.filter(id => mongoose.isValidObjectId(id)) } }
            ]
        });

        console.log(`Products found in DB: ${products.length}`);

        const foundIds = products.map(p => String(p.id));
        const foundOids = products.map(p => String(p._id));

        const missingIds = [];
        productIds.forEach(pid => {
            const pidStr = String(pid);
            // Check if matched by custom ID OR ObjectId
            const isFound = foundIds.includes(pidStr) || foundOids.includes(pidStr);
            if (!isFound) {
                missingIds.push(pid);
            }
        });

        console.log(`\nMissing Product IDs (${missingIds.length}):`);
        console.log(missingIds);

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

debugCounts();

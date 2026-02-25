const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Seller = require('./models/Seller');

dotenv.config();

const listUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const sellers = await Seller.find({});
        console.log(`TOTAL_SELLERS: ${sellers.length}`);
        sellers.forEach(s => {
            console.log(`- ${s.email} (${s.role})`);
        });
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

listUsers();

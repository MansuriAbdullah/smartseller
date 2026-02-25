const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const listCollections = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

listCollections();

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const checkCollections = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));

        for (const coll of collections) {
            if (coll.name.toLowerCase().includes('guarantee')) {
                const doc = await mongoose.connection.db.collection(coll.name).findOne({});
                console.log(`Sample from ${coll.name}:`, JSON.stringify(doc, null, 2));
            }
        }
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkCollections();

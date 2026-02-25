const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const listAll = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const collections = await mongoose.connection.db.listCollections().toArray();
        const names = collections.map(c => c.name);
        console.log('COLLECTIONS_LIST:' + JSON.stringify(names));

        for (const name of names) {
            if (name.toLowerCase().includes('guarantee')) {
                const count = await mongoose.connection.db.collection(name).countDocuments();
                console.log(`COLLECTION_INFO:${name}:COUNT:${count}`);
                const sample = await mongoose.connection.db.collection(name).findOne({});
                console.log(`COLLECTION_SAMPLE:${name}:` + JSON.stringify(sample));
            }
        }
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

listAll();

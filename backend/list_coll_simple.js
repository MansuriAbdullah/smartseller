const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });
const list = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const collections = await mongoose.connection.db.listCollections().toArray();
        collections.forEach(c => console.log('COLL_NAME:' + c.name));
        process.exit(0);
    } catch (error) { console.error(error); process.exit(1); }
};
list();

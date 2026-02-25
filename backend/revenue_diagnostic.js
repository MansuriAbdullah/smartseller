const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const db = mongoose.connection.db;

        const q = { status: { $regex: 'shipped|processing|completed|delivered', $options: 'i' } };
        const orders = await db.collection('orders').find(q).limit(5).toArray();

        console.log('--- REVENUE_FIELD_CHECK ---');
        orders.forEach(o => {
            console.log(`ID: ${o._id} | Status: ${o.status} | OrderTotal: ${o.order_total} (Type: ${typeof o.order_total})`);
        });

        const allStatuses = await db.collection('orders').distinct('status');
        console.log('\nALL_STATUSES_IN_DB:', allStatuses.join(', '));

        process.exit(0);
    } catch (err) {
        console.error('ERROR:', err.message);
        process.exit(1);
    }
};

run();

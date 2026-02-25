const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Seller = require('./models/Seller');

dotenv.config();

const fixPassword = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        const email = 'zarwebcoders@gmail.com';
        const password = '123456';

        const seller = await Seller.findOne({ email });

        if (!seller) {
            console.log('Seller not found');
            process.exit(1);
        }

        console.log(`Found seller: ${seller.email}`);

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update directly to avoid triggering pre-save hooks again if not needed, 
        // OR better, just update the field and use updateOne to be safe from model hooks side effects if any unexpected ones exist,
        // although model.save() would work too if we rely on the pre-save hook.
        // But the pre-save hook in Seller.js checks `if (!this.isModified('password'))`.
        // Let's manually set it to hashed and save, trusting the pre-save hook won't double hash if we are careful or use updateOne.
        // Actually, the pre-save hook hashes it if modified. 
        // If I set `seller.password = '123456'` and save, the hook handles it.
        // BUT, the existing password in DB is '123456'.
        // If I fetch it, it is '123456'.
        // If I set it again to '123456', it might not be marked as modified?
        // Let's force it.

        seller.password = password;
        // Mark as modified to ensure pre-save hook runs
        seller.markModified('password');

        await seller.save();

        console.log('Password updated and hashed successfully');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

fixPassword();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Seller = require('./models/Seller');

dotenv.config();

const fixPassword = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        const email = 'sahilzalori121@gmail.com';
        const passwordToHash = 'Sahilzalori@121';

        const seller = await Seller.findOne({ email });

        if (!seller) {
            console.log('Seller NOT found!');
            process.exit(1);
        }

        console.log(`Seller found: ${seller.email}`);
        console.log(`Current Password Hash/Plain: ${seller.password}`);

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(passwordToHash, salt);

        seller.password = hashedPassword;
        // We use updateOne to avoid triggering pre-save hooks again if not needed, 
        // OR just save() if we want standard behavior. 
        // Since the pre-save hook checks isModified, let's just do updateOne to be raw and sure.

        await Seller.updateOne({ _id: seller._id }, { $set: { password: hashedPassword } });

        console.log('Password updated successfully to hashed version.');
        console.log(`New Hash: ${hashedPassword}`);

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

fixPassword();

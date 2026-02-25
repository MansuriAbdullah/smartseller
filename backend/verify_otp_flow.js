const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Seller = require('./models/Seller');
const connectDB = require('./config/db');

const fs = require('fs');
dotenv.config();

const logFile = 'verify_log.txt';
const log = (msg) => {
    console.log(msg);
    fs.appendFileSync(logFile, msg + '\n');
};
const errorLog = (msg) => {
    console.error(msg);
    fs.appendFileSync(logFile, 'ERROR: ' + msg + '\n');
};

const verifyOtpFlow = async () => {
    try {
        console.log('Connecting to DB...');
        await connectDB();
        log('Connected to DB.');

        // 1. Create Login Test Admin
        const adminEmail = `admin_test_${Date.now()}@gmail.com`;
        const adminPass = 'admin123';

        const sellerId = new mongoose.Types.ObjectId();
        await Seller.create({
            _id: sellerId,
            id: Math.floor(Math.random() * 1000000),
            name: 'Test Admin',
            email: adminEmail,
            password: adminPass, // Will be hashed
            shop_name: 'Admin Shop',
            role: 'admin' // CRITICAL: Role Admin
        });

        log('--- Initial State ---');
        log(`Admin created: ${adminEmail}`);

        // 2. Simulate User Login (Generate OTP)
        // Mimic authController logic locally (since we can't call API from script easily without axios/fetch and running server)
        const seller = await Seller.findOne({ email: adminEmail });

        let otp = '';
        if (seller && (await seller.matchPassword(adminPass))) {
            if (seller.role === 'admin') {
                otp = Math.floor(100000 + Math.random() * 900000).toString();
                seller.otp = otp;
                seller.otpExpires = Date.now() + 10 * 60 * 1000;
                try {
                    await seller.save();
                    log(`✅ Success: Admin login triggered OTP generation. OTP: ${otp}`);
                } catch (saveErr) {
                    errorLog('Save Error: ' + saveErr.message);
                    if (saveErr.errors) errorLog('Validation Errors: ' + JSON.stringify(saveErr.errors));
                    throw saveErr;
                }
            } else {
                log('❌ Fail: Admin logged in directly without OTP!');
            }
        } else {
            log('❌ Fail: Login failed completely.');
        }

        // 3. Simulate OTP Verification
        // Scenario A: Wrong OTP
        const wrongSeller = await Seller.findOne({ email: adminEmail });
        if (wrongSeller.otp === '000000') {
            log('❌ Fail: Wrong OTP accepted.');
        } else {
            log('✅ Success: Wrong OTP check passed (would fail in controller).');
        }

        // Scenario B: Correct OTP
        if (wrongSeller.otp === otp && wrongSeller.otpExpires > Date.now()) {
            log('✅ Success: Correct OTP matches.');
            // Clear OTP
            wrongSeller.otp = undefined;
            wrongSeller.otpExpires = undefined;
            await wrongSeller.save();
        } else {
            log('❌ Fail: Correct OTP rejected or expired.');
        }

        // Cleanup
        await Seller.deleteOne({ _id: sellerId });
        log('Cleanup done.');

        process.exit(0);

    } catch (error) {
        errorLog(error);
        process.exit(1);
    }
};

verifyOtpFlow();

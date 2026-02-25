const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const testEmail = async () => {
    console.log('--- Testing Email Configuration ---');
    console.log('SMTP_EMAIL:', process.env.SMTP_EMAIL ? 'Set' : 'Not Set');
    console.log('SMTP_PASSWORD:', process.env.SMTP_PASSWORD ? 'Set (Length: ' + process.env.SMTP_PASSWORD.length + ')' : 'Not Set');

    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
        console.error('❌ Error: Missing credentials in .env');
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });

    try {
        console.log('Attempting to verify transporter connection...');
        await transporter.verify();
        console.log('✅ Connection Verified! Credentials are correct.');

        console.log('Sending test email...');
        await transporter.sendMail({
            from: process.env.SMTP_EMAIL,
            to: process.env.SMTP_EMAIL, // Send to self
            subject: 'Test Email - SmartSeller',
            text: 'If you see this, email is working!'
        });
        console.log('✅ Test email sent successfully!');
    } catch (error) {
        console.error('❌ Email Failed:');
        console.error(error.message);
        if (error.code === 'EAUTH') {
            console.log('\n--- Troubleshooting ---');
            console.log('1. Ensure you are using an "App Password", NOT your login password.');
            console.log('   Go to: https://myaccount.google.com/apppasswords');
            console.log('2. Ensure no spaces around the "=" in .env file.');
            console.log('3. Ensure "2-Step Verification" is ON for your Google Account.');
        }
    }
};

testEmail();

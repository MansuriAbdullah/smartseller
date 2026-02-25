const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const startServer = async () => {
    try {
        // Load environment variables
        dotenv.config();

        // Connect to Database
        await connectDB();

        const PORT = process.env.PORT || 5000;
        const { rotateCode } = require('./controllers/settingsController');

        // Rotate Invitation Code every 5 minutes (300000 ms)
        setInterval(() => {
            rotateCode();
        }, 300000); // 5 minutes

        // Initial generation if needed
        await rotateCode();

        app.listen(PORT, () => {
            console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Error starting server: ${error.message}`);
        process.exit(1);
    }
};

startServer();

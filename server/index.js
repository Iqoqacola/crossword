const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const adminRoutes = require('./src/routes/adminRoutes.js');
const puzzleRoutes = require('./src/routes/puzzleRoutes.js');
const sequelize = require('./src/config/DB.js');

dotenv.config({
    path: './.env.dev'
});

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
    origin: process.env.ORIGIN || 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
};

app.use(cors(corsOptions))
app.use(express.json());

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/puzzles', puzzleRoutes);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();
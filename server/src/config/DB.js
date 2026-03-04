const Sequelize = require('sequelize');
const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: './.env.dev' });
} else {
    dotenv.config();
}

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        connectTimeout: 60000
    }
});

module.exports = sequelize;
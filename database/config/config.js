require('dotenv').config();


module.exports = {
    development: {
        url: process.env.DATABASE_URL,
        ssl: true,
        dialectOptions: {
            ssl: true
        },
        dialect: 'postgres',
    },
    test: {
        url: process.env.DATABASE_URL,
        ssl: true,
        dialectOptions: {
            ssl: true
        },
        dialect: 'postgres',
    },
    production: {
        url: process.env.DATABASE_URL,
        ssl: true,
        dialectOptions: {
            ssl: true
        },
        dialect: 'postgres',
    },
};
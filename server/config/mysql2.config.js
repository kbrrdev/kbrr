const mysql = require("mysql2");
require("dotenv").config();

const dbConfig = {
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
};

const pool = mysql.createPool(dbConfig);

const promisePool = pool.promise();

module.exports = { promisePool };

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.PG_CONNECTION_STRING,
    ssl: process.env.PG_CONNECTION_STRING.includes('localhost')
        ? false // Nonaktifkan SSL jika menggunakan database lokal
        : { rejectUnauthorized: false }, // Railway membutuhkan SSL
});

const connectDB = async () => {
    try {
        await pool.connect();
        console.log('Connected to PostgreSQL database');
    } catch (err) {
        console.error('PostgreSQL connection error:', err.message);
        process.exit(1);
    }
};

module.exports = pool;
module.exports.connectDB = connectDB;
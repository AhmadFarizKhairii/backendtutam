const { Pool } = require('pg');
require('dotenv').config();

if (!process.env.PG_CONNECTION_STRING) {
    console.error('Error: PG_CONNECTION_STRING is not defined in the environment variables.');
    process.exit(1);
}

const pool = new Pool({
    connectionString: process.env.PG_CONNECTION_STRING,
    ssl: process.env.PG_CONNECTION_STRING.includes('sslmode=disable')
        ? false
        : { rejectUnauthorized: false },
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
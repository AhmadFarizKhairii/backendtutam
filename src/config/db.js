const { Pool } = require('pg');
require('dotenv').config();

// Validasi PG_CONNECTION_STRING
if (!process.env.PG_CONNECTION_STRING) {
    console.error('Error: PG_CONNECTION_STRING is not defined in the environment variables.');
    process.exit(1);
}

// Konfigurasi Pool PostgreSQL
const pool = new Pool({
    connectionString: process.env.PG_CONNECTION_STRING,
    ssl: process.env.PG_CONNECTION_STRING.includes('sslmode=disable')
        ? false
        : { rejectUnauthorized: false }, // Aktifkan SSL jika diperlukan
});

// Fungsi untuk menghubungkan ke database
const connectDB = async () => {
    try {
        await pool.connect();
        console.log('Connected to PostgreSQL database');
    } catch (err) {
        console.error('PostgreSQL connection error:', err.message);
        process.exit(1); // Keluar jika koneksi gagal
    }
};

// Log untuk debugging koneksi pool
pool.on('connect', () => {
    console.log('New client connected to PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle PostgreSQL client:', err.message);
    process.exit(1);
});

module.exports = pool;
module.exports.connectDB = connectDB;
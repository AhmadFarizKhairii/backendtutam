const { Pool } = require('pg');
require('dotenv').config();

// Konfigurasi koneksi PostgreSQL
const pool = new Pool({
    connectionString: process.env.PG_CONNECTION_STRING,
    ssl: process.env.PG_CONNECTION_STRING.includes('sslmode=disable') || process.env.PG_CONNECTION_STRING.includes('localhost')
        ? false // Nonaktifkan SSL jika `sslmode=disable` atau menggunakan localhost
        : { rejectUnauthorized: false }, // Aktifkan SSL jika diperlukan
});

// Fungsi untuk menginisialisasi koneksi database
const connectDB = async () => {
    try {
        await pool.connect();
        console.log('Connected to PostgreSQL database');
    } catch (err) {
        console.error('PostgreSQL connection error:', err.message);
        process.exit(1); // Keluar jika koneksi gagal
    }
};

module.exports = pool;
module.exports.connectDB = connectDB;
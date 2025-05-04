require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // Menggunakan Pool untuk koneksi PostgreSQL
const bonRoutes = require('./routes/bonRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Validasi PG_CONNECTION_STRING
if (!process.env.PG_CONNECTION_STRING) {
  console.error('PG_CONNECTION_STRING is not defined in the environment variables.');
  process.exit(1);
}

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.PG_CONNECTION_STRING,
  ssl: process.env.PG_CONNECTION_STRING.includes('sslmode=disable')
    ? false // Nonaktifkan SSL jika `sslmode=disable` ada di connection string
    : { rejectUnauthorized: false }, // Railway atau server lain membutuhkan SSL
});

// Test Database Connection
(async () => {
  try {
    await pool.connect();
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Failed to connect to the database:', err.message);
    process.exit(1);
  }
})();

// Routes
app.use('/api', bonRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
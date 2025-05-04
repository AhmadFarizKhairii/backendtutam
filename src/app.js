require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // Middleware untuk logging
const bonRoutes = require('./routes/bonRoutes');
const { connectDB } = require('./config/db'); // Menggunakan koneksi dari db.js

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors()); // Mengaktifkan CORS untuk semua origin
app.use(express.json()); // Parsing JSON request body
app.use(morgan('dev')); // Logging request ke console

// Validasi PG_CONNECTION_STRING
if (!process.env.PG_CONNECTION_STRING) {
  console.error('Error: PG_CONNECTION_STRING is not defined in the environment variables.');
  process.exit(1);
}

// Inisialisasi Koneksi Database
(async () => {
  try {
    await connectDB(); // Memastikan koneksi database berhasil
    console.log('Database connection established successfully');
  } catch (err) {
    console.error('Failed to connect to the database:', err.message);
    process.exit(1); // Keluar jika koneksi gagal
  }
})();

// Routes
app.use('/api', bonRoutes);

// Middleware untuk menangani route yang tidak ditemukan
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Middleware untuk menangani error
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bonRoutes = require('./routes/bonRoutes');
const { connectDB } = require('./config/db'); // Menggunakan koneksi dari db.js

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());

// Validasi PG_CONNECTION_STRING
if (!process.env.PG_CONNECTION_STRING) {
  console.error('Error: PG_CONNECTION_STRING is not defined in the environment variables.');
  process.exit(1);
}

// Inisialisasi Koneksi Database
(async () => {
  try {
    await connectDB(); // Memastikan koneksi database berhasil
  } catch (err) {
    console.error('Failed to connect to the database:', err.message);
    process.exit(1); // Keluar jika koneksi gagal
  }
})();

// Routes
app.use('/api', bonRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const express = require('express');
const BonController = require('../controllers/bonController');
const router = express.Router();

// Middleware untuk logging request
router.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

// Rute untuk Bon
router.post('/bons', async (req, res, next) => {
    try {
        await BonController.createBon(req, res);
    } catch (err) {
        next(err); // Forward error ke middleware penanganan error
    }
});

router.get('/bons', async (req, res, next) => {
    try {
        await BonController.getBons(req, res);
    } catch (err) {
        next(err);
    }
});

router.get('/bons/total', async (req, res, next) => {
    try {
        await BonController.getTotalBon(req, res);
    } catch (err) {
        next(err);
    }
});

router.delete('/bons/:id', async (req, res, next) => {
    try {
        await BonController.deleteBon(req, res);
    } catch (err) {
        next(err);
    }
});

// Middleware untuk menangani route yang tidak ditemukan
router.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Middleware untuk menangani error
router.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = router;
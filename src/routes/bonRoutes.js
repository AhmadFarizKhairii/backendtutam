const express = require('express');
const BonController = require('../controllers/bonController');
const router = express.Router();

// Rute untuk Bon
router.post('/bons', (req, res) => BonController.createBon(req, res));
router.get('/bons', (req, res) => BonController.getBons(req, res));
router.get('/bons/total', (req, res) => BonController.getTotalBon(req, res));
router.delete('/bons/:id', (req, res) => BonController.deleteBon(req, res));

module.exports = router;
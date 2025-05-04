const express = require('express');
const BonController = require('../controllers/bonController');
const router = express.Router();

const bonController = new BonController();

router.post('/bons', bonController.createBon);
router.get('/bons', bonController.getBons);
router.get('/bons/total', bonController.getTotalBon);
router.delete('/bons/:id', bonController.deleteBon);

module.exports = router;
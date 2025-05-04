const mongoose = require('mongoose');

// Schema untuk Bon
const bonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
        min: [0, 'Amount cannot be negative'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Model untuk Bon
const Bon = mongoose.model('Bon', bonSchema);

module.exports = Bon;
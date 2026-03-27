const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, enum: ['Frontend', 'Backend', 'Tools', 'Other'], default: 'Other' },
    proficiency: { type: Number, min: 0, max: 100 }
});

module.exports = mongoose.model('Skill', skillSchema);

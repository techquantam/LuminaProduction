const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true,
    default: 'Sparkles'
  },
  features: [{
    type: String
  }],
  details: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

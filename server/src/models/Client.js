const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  logoUrl: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.Client || mongoose.model('Client', ClientSchema);

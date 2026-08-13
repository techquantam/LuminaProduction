const mongoose = require('mongoose');

const SiteSettingsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema);

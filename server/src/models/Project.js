const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  client: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  subImages: [{
    type: String
  }],
  location: {
    type: String,
    default: 'Singapore'
  },
  year: {
    type: String,
    default: '2025'
  },
  videoUrl: {
    type: String
  },
  servicesDone: [{
    type: String
  }],
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.Project || mongoose.model('Project', ProjectSchema);


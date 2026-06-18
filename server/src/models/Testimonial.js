const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  feedback: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 5
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);

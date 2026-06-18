const Testimonial = require('../models/Testimonial');
const mockCollections = require('../utils/mockDb');

const getMediaUrl = (req, file) => {
  if (!file) return null;
  if (file.path && file.path.startsWith('http')) {
    return file.path;
  }
  return `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
};

const getAllTestimonials = async (req, res) => {
  try {
    let testimonials;
    if (global.isMockDB) {
      testimonials = mockCollections.Testimonial.find();
    } else {
      testimonials = await Testimonial.find();
    }
    res.json({ success: true, count: testimonials.length, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving testimonials.', error: error.message });
  }
};

const createTestimonial = async (req, res) => {
  try {
    const { clientName, company, feedback, rating } = req.body;
    const imageUrl = req.file ? getMediaUrl(req, req.file) : req.body.imageUrl;

    const testimonialData = {
      clientName,
      company,
      feedback,
      imageUrl: imageUrl || '',
      rating: Number(rating) || 5
    };

    let newTestimonial;
    if (global.isMockDB) {
      newTestimonial = mockCollections.Testimonial.create(testimonialData);
    } else {
      newTestimonial = await Testimonial.create(testimonialData);
    }

    res.status(201).json({ success: true, message: 'Testimonial created successfully.', data: newTestimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating testimonial.', error: error.message });
  }
};

const updateTestimonial = async (req, res) => {
  try {
    const { clientName, company, feedback, rating, imageUrl } = req.body;
    let finalImageUrl = imageUrl;
    
    if (req.file) {
      finalImageUrl = getMediaUrl(req, req.file);
    }

    const updateData = {
      clientName,
      company,
      feedback,
      imageUrl: finalImageUrl,
      rating: rating ? Number(rating) : undefined
    };

    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    let updatedTestimonial;
    if (global.isMockDB) {
      updatedTestimonial = mockCollections.Testimonial.findByIdAndUpdate(req.params.id, updateData);
    } else {
      updatedTestimonial = await Testimonial.findByIdAndUpdate(req.params.id, updateData, { new: true });
    }

    if (!updatedTestimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found.' });
    }

    res.json({ success: true, message: 'Testimonial updated successfully.', data: updatedTestimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating testimonial.', error: error.message });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    let deletedTestimonial;
    if (global.isMockDB) {
      deletedTestimonial = mockCollections.Testimonial.findByIdAndDelete(req.params.id);
    } else {
      deletedTestimonial = await Testimonial.findByIdAndDelete(req.params.id);
    }

    if (!deletedTestimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found.' });
    }

    res.json({ success: true, message: 'Testimonial deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting testimonial.', error: error.message });
  }
};

module.exports = {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};

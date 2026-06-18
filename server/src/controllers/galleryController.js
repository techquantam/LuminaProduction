const Gallery = require('../models/Gallery');
const mockCollections = require('../utils/mockDb');

const getMediaUrl = (req, file) => {
  if (!file) return null;
  if (file.path && file.path.startsWith('http')) {
    return file.path;
  }
  return `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
};

const getAllGalleryItems = async (req, res) => {
  try {
    let items;
    if (global.isMockDB) {
      items = mockCollections.Gallery.find();
    } else {
      items = await Gallery.find().sort({ createdAt: -1 });
    }
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving gallery items.', error: error.message });
  }
};

const createGalleryItem = async (req, res) => {
  try {
    const { title, category, description } = req.body;
    
    if (!req.file && !req.body.imageUrl) {
      return res.status(400).json({ success: false, message: 'Please upload an image or provide an imageUrl.' });
    }

    const imageUrl = req.file ? getMediaUrl(req, req.file) : req.body.imageUrl;

    const galleryData = {
      title,
      category,
      description,
      imageUrl
    };

    let newItem;
    if (global.isMockDB) {
      newItem = mockCollections.Gallery.create(galleryData);
    } else {
      newItem = await Gallery.create(galleryData);
    }

    res.status(201).json({ success: true, message: 'Gallery item created successfully.', data: newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating gallery item.', error: error.message });
  }
};

const updateGalleryItem = async (req, res) => {
  try {
    const { title, category, description, imageUrl } = req.body;
    let finalImageUrl = imageUrl;

    if (req.file) {
      finalImageUrl = getMediaUrl(req, req.file);
    }

    const updateData = {
      title,
      category,
      description,
      imageUrl: finalImageUrl
    };

    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    let updatedItem;
    if (global.isMockDB) {
      updatedItem = mockCollections.Gallery.findByIdAndUpdate(req.params.id, updateData);
    } else {
      updatedItem = await Gallery.findByIdAndUpdate(req.params.id, updateData, { new: true });
    }

    if (!updatedItem) {
      return res.status(404).json({ success: false, message: 'Gallery item not found.' });
    }

    res.json({ success: true, message: 'Gallery item updated successfully.', data: updatedItem });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating gallery item.', error: error.message });
  }
};

const deleteGalleryItem = async (req, res) => {
  try {
    let deletedItem;
    if (global.isMockDB) {
      deletedItem = mockCollections.Gallery.findByIdAndDelete(req.params.id);
    } else {
      deletedItem = await Gallery.findByIdAndDelete(req.params.id);
    }

    if (!deletedItem) {
      return res.status(404).json({ success: false, message: 'Gallery item not found.' });
    }

    res.json({ success: true, message: 'Gallery item deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting gallery item.', error: error.message });
  }
};

module.exports = {
  getAllGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
};

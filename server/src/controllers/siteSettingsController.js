const SiteSettings = require('../models/SiteSettings');
const mockCollections = require('../utils/mockDb');

const getMediaUrl = (req, file) => {
  if (!file) return null;
  if (file.path && file.path.startsWith('http')) {
    return file.path;
  }
  return `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
};

// GET /api/settings/:key
const getSetting = async (req, res) => {
  try {
    const { key } = req.params;
    let setting;
    if (global.isMockDB) {
      // Use in-memory store for mock
      setting = global._mockSettings && global._mockSettings[key];
      if (!setting) {
        return res.json({ success: true, data: null });
      }
      return res.json({ success: true, data: { key, value: setting } });
    }
    setting = await SiteSettings.findOne({ key });
    res.json({ success: true, data: setting });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving setting.', error: error.message });
  }
};

// PUT /api/settings/hero-images  (upload up to 5 images OR pass URLs)
const updateHeroImages = async (req, res) => {
  try {
    let heroImages = [];

    // If files uploaded (multipart)
    if (req.files && req.files.length > 0) {
      heroImages = req.files.map(f => getMediaUrl(req, f));
    } else if (req.body.images) {
      // JSON array of URLs sent as string
      try {
        heroImages = JSON.parse(req.body.images);
      } catch {
        heroImages = req.body.images.split(',').map(u => u.trim()).filter(Boolean);
      }
    }

    if (!heroImages || heroImages.length === 0) {
      return res.status(400).json({ success: false, message: 'No hero images provided.' });
    }

    if (global.isMockDB) {
      global._mockSettings = global._mockSettings || {};
      global._mockSettings['hero-images'] = heroImages;
      return res.json({ success: true, message: 'Hero images updated (mock).', data: { key: 'hero-images', value: heroImages } });
    }

    const updated = await SiteSettings.findOneAndUpdate(
      { key: 'hero-images' },
      { value: heroImages },
      { upsert: true, new: true }
    );

    res.json({ success: true, message: 'Hero images updated successfully.', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating hero images.', error: error.message });
  }
};

// DELETE one hero image by index
const deleteHeroImage = async (req, res) => {
  try {
    const { index } = req.params;
    const idx = parseInt(index);

    if (global.isMockDB) {
      const imgs = (global._mockSettings && global._mockSettings['hero-images']) || [];
      imgs.splice(idx, 1);
      global._mockSettings['hero-images'] = imgs;
      return res.json({ success: true, message: 'Hero image removed (mock).', data: imgs });
    }

    const setting = await SiteSettings.findOne({ key: 'hero-images' });
    if (!setting) return res.status(404).json({ success: false, message: 'No hero images found.' });

    const images = setting.value || [];
    if (idx < 0 || idx >= images.length) {
      return res.status(400).json({ success: false, message: 'Invalid image index.' });
    }
    images.splice(idx, 1);

    const updated = await SiteSettings.findOneAndUpdate(
      { key: 'hero-images' },
      { value: images },
      { new: true }
    );

    res.json({ success: true, message: 'Hero image removed.', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting hero image.', error: error.message });
  }
};

module.exports = { getSetting, updateHeroImages, deleteHeroImage };

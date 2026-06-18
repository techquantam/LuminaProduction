const Admin = require('../models/Admin');
const mockCollections = require('../utils/mockDb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Seed default admin if none exists
const seedDefaultAdmin = async () => {
  const defaultAdmin = {
    username: 'admin',
    email: 'admin@luminalive.com',
    password: 'admin123'
  };

  if (global.isMockDB) {
    const existing = mockCollections.Admin.findOne({ username: 'admin' });
    if (!existing) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(defaultAdmin.password, salt);
      mockCollections.Admin.create({
        username: defaultAdmin.username,
        email: defaultAdmin.email,
        password: hashedPassword
      });
      console.log('\x1b[32m[Seed] Default Admin Created in Mock Database:\x1b[0m', defaultAdmin.email);
    }
  } else {
    try {
      const count = await Admin.countDocuments();
      if (count === 0) {
        // Pass raw password; the Admin model pre-save hook will handle the hashing exactly once.
        await Admin.create({
          username: defaultAdmin.username,
          email: defaultAdmin.email,
          password: defaultAdmin.password
        });
        console.log('\x1b[32m[Seed] Default Admin Created in MongoDB:\x1b[0m', defaultAdmin.email);
      }
    } catch (err) {
      console.error('Error seeding default admin:', err.message);
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide both email and password.' });
  }

  try {
    let adminUser;

    if (global.isMockDB) {
      adminUser = mockCollections.Admin.findOne({ email });
    } else {
      adminUser = await Admin.findOne({ email });
    }

    if (!adminUser) {
      return res.status(400).json({ success: false, message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, adminUser.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: adminUser._id, username: adminUser.username },
      process.env.JWT_SECRET || 'lumina_secret_key',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      admin: {
        id: adminUser._id,
        username: adminUser.username,
        email: adminUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during login.', error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    let adminUser;
    if (global.isMockDB) {
      adminUser = mockCollections.Admin.findById(req.admin.id);
    } else {
      adminUser = await Admin.findById(req.admin.id).select('-password');
    }

    if (!adminUser) {
      return res.status(404).json({ success: false, message: 'Admin not found.' });
    }

    res.json({
      success: true,
      admin: {
        id: adminUser._id,
        username: adminUser.username,
        email: adminUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving profile.', error: error.message });
  }
};

module.exports = {
  seedDefaultAdmin,
  login,
  getProfile
};

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
const { seedDefaultAdmin } = require('./controllers/authController');
const seedData = require('./utils/seeder');

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const serviceRoutes = require('./routes/services');
const testimonialRoutes = require('./routes/testimonials');
const galleryRoutes = require('./routes/gallery');
const contactRoutes = require('./routes/contacts');
const clientRoutes = require('./routes/clients');
const teamRoutes = require('./routes/team');

const app = express();

// Database Connection
connectDB().then(async () => {
  // Seed Database with standard luxury assets & default admin account
  await seedDefaultAdmin();
  await seedData();
});

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://lumina-production.vercel.app'
    ];

    if (process.env.CLIENT_URL) {
      process.env.CLIENT_URL.split(',').forEach(url => {
        allowedOrigins.push(url.trim());
      });
    }

    const isAllowed = allowedOrigins.includes(origin) ||
                      origin.startsWith('http://localhost:') ||
                      /\.vercel\.app$/.test(origin);

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static Uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes Middleware
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/team', teamRoutes);

// Health Check / Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Lumina Production Luxury Experiential Agency API.',
    environment: process.env.NODE_ENV || 'development',
    database: global.isMockDB ? 'Bulletproof JSON Fallback' : 'Connected to MongoDB Atlas'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('\x1b[31m[Server Error]\x1b[0m', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong on the server.',
    error: err.message
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n\x1b[36m==================================================\x1b[0m`);
  console.log(`\x1b[36m   Lumina Production API listening on Port: ${PORT}\x1b[0m`);
  console.log(`\x1b[36m   Mode: ${process.env.NODE_ENV || 'development'}\x1b[0m`);
  console.log(`\x1b[36m==================================================\n\x1b[0m`);
});

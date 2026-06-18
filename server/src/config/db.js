const mongoose = require('mongoose');
const dns = require('dns');

// Bypass Node.js DNS bug for MongoDB Atlas SRV records by using public DNS
dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lumina_db';
    console.log('Attempting connection to MongoDB...');
    
    // Set connection timeout to 3 seconds for local fallback check
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000
    });
    
    console.log(`\x1b[32m[MongoDB Connected] Host: ${conn.connection.host}\x1b[0m`);
    global.isMockDB = false;
  } catch (error) {
    console.warn('\x1b[33m%s\x1b[0m', `[Database Warning] Could not connect to MongoDB: ${error.message}`);
    console.log('\x1b[35m%s\x1b[0m', 'Initializing Lumina Bulletproof File-Based Mock Database System...');
    global.isMockDB = true;
  }
};

module.exports = connectDB;

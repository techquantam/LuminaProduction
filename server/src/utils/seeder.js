const Service = require('../models/Service');
const Project = require('../models/Project');
const Testimonial = require('../models/Testimonial');
const Gallery = require('../models/Gallery');
const Client = require('../models/Client');
const TeamMember = require('../models/TeamMember');

const seedData = async () => {
  // All mock and static data has been removed.
  // The system relies entirely on the Admin Panel for all content.
  console.log('\x1b[33m[Seed] Seeding disabled: Only admin-panel data will be used.\x1b[0m');
};

module.exports = seedData;

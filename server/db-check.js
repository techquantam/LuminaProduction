require('dotenv').config();
const connectDB = require('./src/config/db');
const Client = require('./src/models/Client');

connectDB().then(async () => {
  console.log('Connected to DB. Querying clients...');
  const clients = await Client.find({});
  console.log('Clients in DB:', JSON.stringify(clients, null, 2));
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});

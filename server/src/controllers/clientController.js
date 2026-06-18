const Client = require('../models/Client');
const mockCollections = require('../utils/mockDb');

const getMediaUrl = (req, file) => {
  if (!file) return null;
  if (file.path && file.path.startsWith('http')) {
    return file.path;
  }
  return `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
};

const getAllClients = async (req, res) => {
  try {
    let clients;
    if (global.isMockDB) {
      clients = mockCollections.Client.find();
    } else {
      clients = await Client.find().sort({ createdAt: -1 });
    }
    res.json({ success: true, count: clients.length, data: clients });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving clients.', error: error.message });
  }
};

const createClient = async (req, res) => {
  try {
    const { name } = req.body;
    const logoUrl = req.file ? getMediaUrl(req, req.file) : req.body.logoUrl;

    if (!logoUrl) {
      return res.status(400).json({ success: false, message: 'Brand logo is required.' });
    }

    const clientData = {
      name: name || '',
      logoUrl
    };

    let newClient;
    if (global.isMockDB) {
      newClient = mockCollections.Client.create(clientData);
    } else {
      newClient = await Client.create(clientData);
    }

    res.status(201).json({ success: true, message: 'Client brand added successfully.', data: newClient });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding client brand.', error: error.message });
  }
};

const deleteClient = async (req, res) => {
  try {
    let deletedClient;
    if (global.isMockDB) {
      deletedClient = mockCollections.Client.findByIdAndDelete(req.params.id);
    } else {
      deletedClient = await Client.findByIdAndDelete(req.params.id);
    }

    if (!deletedClient) {
      return res.status(404).json({ success: false, message: 'Client brand not found.' });
    }

    res.json({ success: true, message: 'Client brand removed successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting client brand.', error: error.message });
  }
};

module.exports = {
  getAllClients,
  createClient,
  deleteClient
};

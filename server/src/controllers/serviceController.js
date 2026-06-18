const Service = require('../models/Service');
const mockCollections = require('../utils/mockDb');

const getAllServices = async (req, res) => {
  try {
    let services;
    if (global.isMockDB) {
      services = mockCollections.Service.find();
    } else {
      services = await Service.find();
    }
    res.json({ success: true, count: services.length, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving services.', error: error.message });
  }
};

const getServiceById = async (req, res) => {
  try {
    let service;
    if (global.isMockDB) {
      service = mockCollections.Service.findById(req.params.id);
    } else {
      service = await Service.findById(req.params.id);
    }

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving service detail.', error: error.message });
  }
};

const createService = async (req, res) => {
  try {
    const { name, description, icon, features, details } = req.body;

    let parsedFeatures = features;
    if (typeof features === 'string') {
      try {
        parsedFeatures = JSON.parse(features);
      } catch (e) {
        parsedFeatures = features.split(',').map(f => f.trim());
      }
    }

    const serviceData = {
      name,
      description,
      icon,
      features: parsedFeatures || [],
      details
    };

    let newService;
    if (global.isMockDB) {
      newService = mockCollections.Service.create(serviceData);
    } else {
      newService = await Service.create(serviceData);
    }

    res.status(201).json({ success: true, message: 'Service created successfully.', data: newService });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating service.', error: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const { name, description, icon, features, details } = req.body;

    let parsedFeatures = features;
    if (typeof features === 'string') {
      try {
        parsedFeatures = JSON.parse(features);
      } catch (e) {
        parsedFeatures = features.split(',').map(f => f.trim());
      }
    }

    const updateData = {
      name,
      description,
      icon,
      features: parsedFeatures,
      details
    };

    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    let updatedService;
    if (global.isMockDB) {
      updatedService = mockCollections.Service.findByIdAndUpdate(req.params.id, updateData);
    } else {
      updatedService = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true });
    }

    if (!updatedService) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    res.json({ success: true, message: 'Service updated successfully.', data: updatedService });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating service.', error: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    let deletedService;
    if (global.isMockDB) {
      deletedService = mockCollections.Service.findByIdAndDelete(req.params.id);
    } else {
      deletedService = await Service.findByIdAndDelete(req.params.id);
    }

    if (!deletedService) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    res.json({ success: true, message: 'Service deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting service.', error: error.message });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};

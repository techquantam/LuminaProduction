const Project = require('../models/Project');
const mockCollections = require('../utils/mockDb');

const getMediaUrl = (req, file) => {
  if (!file) return null;
  // If Cloudinary, path is already a direct URL
  if (file.path && file.path.startsWith('http')) {
    return file.path;
  }
  // Otherwise, construct a local static file URL
  const port = process.env.PORT || 5000;
  return `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
};

const getAllProjects = async (req, res) => {
  try {
    const { category } = req.query;
    let projects;

    if (global.isMockDB) {
      const query = {};
      if (category) query.category = category;
      projects = mockCollections.Project.find(query);
    } else {
      const query = {};
      if (category) query.category = category;
      projects = await Project.find(query).sort({ date: -1 });
    }

    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving projects.', error: error.message });
  }
};

const getFeaturedProjects = async (req, res) => {
  try {
    let projects;

    if (global.isMockDB) {
      projects = mockCollections.Project.find({ featured: true });
    } else {
      projects = await Project.find({ featured: true }).sort({ date: -1 });
    }

    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving featured projects.', error: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    let project;

    if (global.isMockDB) {
      project = mockCollections.Project.findById(req.params.id);
    } else {
      project = await Project.findById(req.params.id);
    }

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving project detail.', error: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const { title, description, category, client, date, videoUrl, servicesDone, featured, subImages, location, year } = req.body;
    
    const mainImageFile = req.files?.image?.[0] || req.file;
    const subImageFiles = req.files?.subImages || [];

    if (!mainImageFile && !req.body.imageUrl) {
      return res.status(400).json({ success: false, message: 'Please upload an image or provide an imageUrl.' });
    }

    const imageUrl = mainImageFile ? getMediaUrl(req, mainImageFile) : req.body.imageUrl;
    
    // Parse servicesDone if it comes as a stringified array
    let parsedServices = servicesDone;
    if (typeof servicesDone === 'string') {
      try {
        parsedServices = JSON.parse(servicesDone);
      } catch (e) {
        parsedServices = servicesDone.split(',').map(s => s.trim()).filter(Boolean);
      }
    }

    // Get URLs of uploaded sub-images
    const uploadedSubImageUrls = subImageFiles.map(file => getMediaUrl(req, file));

    // Parse subImages if it comes as a stringified array or comma-separated list
    let parsedSubImages = [];
    if (typeof subImages === 'string' && subImages.trim()) {
      try {
        parsedSubImages = JSON.parse(subImages);
      } catch (e) {
        parsedSubImages = subImages.split(',').map(s => s.trim()).filter(Boolean);
      }
    } else if (Array.isArray(subImages)) {
      parsedSubImages = subImages;
    }

    const finalSubImages = [...uploadedSubImageUrls, ...parsedSubImages];

    const projectData = {
      title,
      description,
      category,
      client,
      date: date ? new Date(date) : new Date(),
      imageUrl,
      subImages: finalSubImages,
      location: location || 'Singapore',
      year: year || '2025',
      videoUrl,
      servicesDone: parsedServices || [],
      featured: featured === 'true' || featured === true
    };

    let newProject;
    if (global.isMockDB) {
      newProject = mockCollections.Project.create(projectData);
    } else {
      newProject = await Project.create(projectData);
    }

    res.status(201).json({ success: true, message: 'Project created successfully.', data: newProject });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating project.', error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { title, description, category, client, date, videoUrl, servicesDone, featured, imageUrl, subImages, location, year } = req.body;
    
    const mainImageFile = req.files?.image?.[0] || req.file;
    const subImageFiles = req.files?.subImages || [];

    let finalImageUrl = imageUrl;
    if (mainImageFile) {
      finalImageUrl = getMediaUrl(req, mainImageFile);
    }

    let parsedServices = servicesDone;
    if (typeof servicesDone === 'string') {
      try {
        parsedServices = JSON.parse(servicesDone);
      } catch (e) {
        parsedServices = servicesDone.split(',').map(s => s.trim()).filter(Boolean);
      }
    }

    // Get URLs of uploaded sub-images
    const uploadedSubImageUrls = subImageFiles.map(file => getMediaUrl(req, file));

    let parsedSubImages = [];
    if (typeof subImages === 'string' && subImages.trim()) {
      try {
        parsedSubImages = JSON.parse(subImages);
      } catch (e) {
        parsedSubImages = subImages.split(',').map(s => s.trim()).filter(Boolean);
      }
    } else if (Array.isArray(subImages)) {
      parsedSubImages = subImages;
    }

    const finalSubImages = subImages !== undefined ? [...uploadedSubImageUrls, ...parsedSubImages] : (uploadedSubImageUrls.length > 0 ? uploadedSubImageUrls : undefined);

    const updateData = {
      title,
      description,
      category,
      client,
      date: date ? new Date(date) : undefined,
      imageUrl: finalImageUrl,
      subImages: finalSubImages,
      location,
      year,
      videoUrl,
      servicesDone: parsedServices,
      featured: featured === 'true' ? true : (featured === 'false' ? false : featured)
    };

    // Clean up undefined properties
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    let updatedProject;
    if (global.isMockDB) {
      updatedProject = mockCollections.Project.findByIdAndUpdate(req.params.id, updateData);
    } else {
      updatedProject = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
    }

    if (!updatedProject) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    res.json({ success: true, message: 'Project updated successfully.', data: updatedProject });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating project.', error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    let deletedProject;
    if (global.isMockDB) {
      deletedProject = mockCollections.Project.findByIdAndDelete(req.params.id);
    } else {
      deletedProject = await Project.findByIdAndDelete(req.params.id);
    }

    if (!deletedProject) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    res.json({ success: true, message: 'Project deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting project.', error: error.message });
  }
};

module.exports = {
  getAllProjects,
  getFeaturedProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};

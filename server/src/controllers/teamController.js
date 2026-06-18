const TeamMember = require('../models/TeamMember');
const mockCollections = require('../utils/mockDb');

const getMediaUrl = (req, file) => {
  if (!file) return null;
  if (file.path && file.path.startsWith('http')) {
    return file.path;
  }
  return `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
};

const getAllTeamMembers = async (req, res) => {
  try {
    let members;
    if (global.isMockDB) {
      members = mockCollections.TeamMember.find();
    } else {
      members = await TeamMember.find().sort({ createdAt: -1 });
    }
    res.json({ success: true, count: members.length, data: members });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving team members.', error: error.message });
  }
};

const createTeamMember = async (req, res) => {
  try {
    const { name, role } = req.body;
    const imageUrl = req.file ? getMediaUrl(req, req.file) : req.body.imageUrl;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Name is required.' });
    }
    if (!role) {
      return res.status(400).json({ success: false, message: 'Role is required.' });
    }
    if (!imageUrl) {
      return res.status(400).json({ success: false, message: 'Image is required.' });
    }

    const memberData = {
      name,
      role,
      imageUrl
    };

    let newMember;
    if (global.isMockDB) {
      newMember = mockCollections.TeamMember.create(memberData);
    } else {
      newMember = await TeamMember.create(memberData);
    }

    res.status(201).json({ success: true, message: 'Team member added successfully.', data: newMember });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding team member.', error: error.message });
  }
};

const deleteTeamMember = async (req, res) => {
  try {
    let deletedMember;
    if (global.isMockDB) {
      deletedMember = mockCollections.TeamMember.findByIdAndDelete(req.params.id);
    } else {
      deletedMember = await TeamMember.findByIdAndDelete(req.params.id);
    }

    if (!deletedMember) {
      return res.status(404).json({ success: false, message: 'Team member not found.' });
    }

    res.json({ success: true, message: 'Team member removed successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting team member.', error: error.message });
  }
};

module.exports = {
  getAllTeamMembers,
  createTeamMember,
  deleteTeamMember
};

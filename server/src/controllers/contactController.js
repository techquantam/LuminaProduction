const Contact = require('../models/Contact');
const mockCollections = require('../utils/mockDb');

const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
    }

    const contactData = {
      name,
      email,
      subject,
      message,
      status: 'unread'
    };

    let newContact;
    if (global.isMockDB) {
      newContact = mockCollections.Contact.create(contactData);
    } else {
      newContact = await Contact.create(contactData);
    }

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received and our luxury concierge will contact you shortly.',
      data: newContact
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error submitting contact form.', error: error.message });
  }
};

const getAllContactSubmissions = async (req, res) => {
  try {
    let submissions;
    if (global.isMockDB) {
      submissions = mockCollections.Contact.find();
    } else {
      submissions = await Contact.find().sort({ createdAt: -1 });
    }
    res.json({ success: true, count: submissions.length, data: submissions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving contact submissions.', error: error.message });
  }
};

const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['unread', 'read', 'archived'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value.' });
    }

    let updatedContact;
    if (global.isMockDB) {
      updatedContact = mockCollections.Contact.findByIdAndUpdate(req.params.id, { status });
    } else {
      updatedContact = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true });
    }

    if (!updatedContact) {
      return res.status(404).json({ success: false, message: 'Submission not found.' });
    }

    res.json({ success: true, message: 'Contact status updated successfully.', data: updatedContact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating status.', error: error.message });
  }
};

const deleteContactSubmission = async (req, res) => {
  try {
    let deletedContact;
    if (global.isMockDB) {
      deletedContact = mockCollections.Contact.findByIdAndDelete(req.params.id);
    } else {
      deletedContact = await Contact.findByIdAndDelete(req.params.id);
    }

    if (!deletedContact) {
      return res.status(404).json({ success: false, message: 'Submission not found.' });
    }

    res.json({ success: true, message: 'Submission deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting submission.', error: error.message });
  }
};

module.exports = {
  submitContactForm,
  getAllContactSubmissions,
  updateContactStatus,
  deleteContactSubmission
};

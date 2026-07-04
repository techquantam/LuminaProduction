const Contact = require('../models/Contact');
const mockCollections = require('../utils/mockDb');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

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

const requestCredentials = async (req, res) => {
  try {
    const { name, email, company, jobTitle } = req.body;
    if (!name || !email || !company) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and company.' });
    }

    const subject = `[Credentials Request] ${name} from ${company}`;
    const message = `Full Name: ${name}\nEmail: ${email}\nCompany: ${company}\nJob Title: ${jobTitle || 'N/A'}`;

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

    // Set up nodemailer transporter
    const smtpHost = process.env.SMTP_HOST || 'smtp.ethereal.email';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM || '"Lumina Production" <noreply@luminalive.com>';

    const pdfPath = path.join(__dirname, '../assets/lumina-credentials.pdf');

    if (!smtpUser || !smtpPass) {
      console.log('--------------------------------------------------');
      console.log('Simulating automated credentials email:');
      console.log(`To: ${email}`);
      console.log(`Subject: ${subject}`);
      console.log(`Attached file: ${pdfPath}`);
      console.log('Configure SMTP_USER and SMTP_PASS in .env to send real emails.');
      console.log('--------------------------------------------------');
      
      return res.status(201).json({
        success: true,
        message: 'Credentials requested successfully! We have registered your request and simulated sending the email. In production, the PDF booklet will be delivered directly to your inbox.',
        data: newContact
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    const mailOptions = {
      from: smtpFrom,
      to: email,
      subject: 'Lumina Production - Credentials Booklet & Creative Portfolio',
      text: `Dear ${name},\n\nThank you for your interest in Lumina Production.\n\nPlease find attached our official credentials booklet and creative portfolio detailing our bespoke experiential exhibitions and luxury event management capabilities.\n\nBest regards,\nLumina Live Team`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 20px; color: #111; max-width: 600px; margin: 0 auto; border: 1px solid #e5e5e5;">
          <h2 style="color: #c5a880; text-transform: uppercase; letter-spacing: 2px;">Lumina Production</h2>
          <p>Dear ${name},</p>
          <p>Thank you for requesting our credentials portfolio. We are thrilled to share our architectural event wonders and luxury pop-up projects with you.</p>
          <p>Please find attached our official credentials booklet detailing our bespoke experiential exhibitions and luxury event management capabilities.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666;">This is an automated delivery on behalf of Lumina Production. If you have any further questions, please reply directly to this email.</p>
        </div>
      `,
      attachments: [
        {
          filename: 'Lumina_Credentials.pdf',
          path: pdfPath
        }
      ]
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: 'Our official credentials booklet has been successfully sent to your email address! Please check your inbox shortly.',
      data: newContact
    });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Error processing credentials request or sending email.', error: error.message });
  }
};

module.exports = {
  submitContactForm,
  getAllContactSubmissions,
  updateContactStatus,
  deleteContactSubmission,
  requestCredentials
};

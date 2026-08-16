const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Email Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Contact Form Route
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, message, service } = req.body;

    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: 'Please fill all required fields'
        });
    }

    // Email HTML Template
    const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                  color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 5px; }
        .label { font-weight: bold; color: #667eea; }
        .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🎬 New Contact Form Submission</h2>
        </div>
        <div class="content">
          <div class="field">
            <span class="label">Name:</span> ${name}
          </div>
          <div class="field">
            <span class="label">Email:</span> ${email}
          </div>
          ${phone ? `<div class="field"><span class="label">Phone:</span> ${phone}</div>` : ''}
          ${service ? `<div class="field"><span class="label">Service:</span> ${service}</div>` : ''}
          <div class="field">
            <span class="label">Message:</span><br>
            ${message}
          </div>
        </div>
        <div class="footer">
          <p>This email was sent from your portfolio website contact form.</p>
        </div>
      </div>
    </body>
    </html>
  `;

    // Email Options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: ['ahmad29415@gmail.com', 'connectsameervisuals@gmail.com'],
        subject: `New Contact Form: ${name}`,
        html: emailHTML,
        replyTo: email
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({
            success: true,
            message: 'Thank you! Your response has been recorded and we will contact you shortly.'
        });
    } catch (error) {
        console.error('Email Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later.'
        });
    }
});

// Test Route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
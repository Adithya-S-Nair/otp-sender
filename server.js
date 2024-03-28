const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'casey.terry@ethereal.email',
        pass: 'PDwbG2CdV3ETPHQWRR'
    }
});

// Route to send email
app.post('/sendotp', (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: 'casey.terry@ethereal.email', // Sender email address
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to send email' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'Email sent successfully' });
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

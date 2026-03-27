const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Message = require('../models/Message');

router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Save to Database
        const newMessage = new Message({ name, email, subject, message });
        await newMessage.save();

        // Email Notification Logic
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER, // Send to yourself
            subject: `Portfolio Message: ${subject}`,
            text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: "Message sent successfully" });
    } catch (err) {
        console.error("Error processing message", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newMessage = new Message({ name, email, subject, message });
        await newMessage.save();

        res.status(201).json({ message: "Message sent successfully" });
    } catch (err) {
        console.error("Error saving message", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;

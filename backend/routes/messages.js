const express = require('express');
const Message = require('../models/Message');
const { authRequired, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Public: send message
router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'name, email and message are required' });
  }
  const m = await Message.create({
    name: String(name),
    email: String(email).toLowerCase(),
    phone: String(phone || ''),
    message: String(message)
  });
  return res.status(201).json({
    id: String(m._id),
    name: m.name,
    email: m.email,
    phone: m.phone,
    message: m.message,
    createdAt: m.createdAt
  });
});

// Admin: list messages
router.get('/', authRequired, adminOnly, async (_req, res) => {
  const list = await Message.find().sort({ createdAt: -1 });
  return res.json(
    list.map((m) => ({
      id: String(m._id),
      name: m.name,
      email: m.email,
      phone: m.phone,
      message: m.message,
      createdAt: m.createdAt
    }))
  );
});

module.exports = router;

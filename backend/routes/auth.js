const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authRequired } = require('../middleware/auth');

const router = express.Router();

function signToken(user) {
  return jwt.sign(
    { sub: String(user._id), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

function userDTO(user) {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    role: user.role,
    avatar: user.avatar || ''
  };
}

router.post('/register', async (req, res) => {
  const { name, email, phone, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required' });
  }
  const normalizedEmail = String(email).toLowerCase().trim();
  const exists = await User.findOne({ email: normalizedEmail });
  if (exists) return res.status(409).json({ message: 'Email already exists' });

  const passwordHash = await bcrypt.hash(String(password), 10);
  const avatar =
    (req.body && typeof req.body.avatar === 'string' && req.body.avatar.trim())
      ? String(req.body.avatar)
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(String(name))}&background=ff4d8d&color=fff`;

  const user = await User.create({
    name: String(name).trim(),
    email: normalizedEmail,
    phone: String(phone || ''),
    passwordHash,
    role: 'USER',
    avatar
  });

  const token = signToken(user);
  return res.status(201).json({ user: userDTO(user), token });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
  const normalizedEmail = String(email).toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(String(password), user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken(user);
  return res.json({ user: userDTO(user), token });
});

router.get('/me', authRequired, async (req, res) => {
  return res.json({ user: userDTO(req.user) });
});

module.exports = router;

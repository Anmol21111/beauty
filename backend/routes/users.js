const express = require('express');
const User = require('../models/User');
const { authRequired, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', authRequired, adminOnly, async (_req, res) => {
  const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
  return res.json(
    users.map((u) => ({
      id: String(u._id),
      name: u.name,
      email: u.email,
      phone: u.phone || '',
      role: u.role,
      avatar: u.avatar || ''
    }))
  );
});

module.exports = router;

const express = require('express');
const Service = require('../models/Service');
const { authRequired, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Public: list services
router.get('/', async (_req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  return res.json(
    services.map((s) => ({
      id: String(s._id),
      name: s.name,
      category: s.category,
      price: s.price,
      duration: s.duration,
      description: s.description,
      imageUrl: s.imageUrl
    }))
  );
});

// Admin: create
router.post('/', authRequired, adminOnly, async (req, res) => {
  const { name, category, price, duration, description, imageUrl } = req.body || {};
  if (!name || !category || typeof price !== 'number') {
    return res.status(400).json({ message: 'name, category and price are required' });
  }
  const s = await Service.create({
    name: String(name).trim(),
    category: String(category).trim(),
    price,
    duration: String(duration || ''),
    description: String(description || ''),
    imageUrl: String(imageUrl || '')
  });
  return res.status(201).json({
    id: String(s._id),
    name: s.name,
    category: s.category,
    price: s.price,
    duration: s.duration,
    description: s.description,
    imageUrl: s.imageUrl
  });
});

// Admin: update
router.put('/:id', authRequired, adminOnly, async (req, res) => {
  const { id } = req.params;
  const patch = {};
  const fields = ['name', 'category', 'duration', 'description', 'imageUrl'];
  for (const f of fields) {
    if (req.body?.[f] !== undefined) patch[f] = String(req.body[f]);
  }
  if (req.body?.price !== undefined) patch.price = Number(req.body.price);

  const s = await Service.findByIdAndUpdate(id, patch, { new: true });
  if (!s) return res.status(404).json({ message: 'Service not found' });
  return res.json({
    id: String(s._id),
    name: s.name,
    category: s.category,
    price: s.price,
    duration: s.duration,
    description: s.description,
    imageUrl: s.imageUrl
  });
});

// Admin: delete
router.delete('/:id', authRequired, adminOnly, async (req, res) => {
  const { id } = req.params;
  const s = await Service.findByIdAndDelete(id);
  if (!s) return res.status(404).json({ message: 'Service not found' });
  return res.json({ ok: true });
});

module.exports = router;

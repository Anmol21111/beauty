const express = require('express');
const Appointment = require('../models/Appointment');
const Service = require('../models/Service');
const { authRequired, adminOnly } = require('../middleware/auth');

const router = express.Router();

function dto(a) {
  return {
    id: String(a._id),
    userId: String(a.user?._id || a.user),
    userName: a.user?.name,
    userEmail: a.user?.email,
    serviceId: String(a.service?._id || a.service),
    serviceName: a.service?.name,
    date: a.date,
    time: a.time,
    notes: a.notes || '',
    status: a.status,
    createdAt: a.createdAt
  };
}

// User: book
router.post('/', authRequired, async (req, res) => {
  const { serviceId, date, time, notes } = req.body || {};
  if (!serviceId || !date || !time) {
    return res.status(400).json({ message: 'serviceId, date and time are required' });
  }
  const s = await Service.findById(serviceId);
  if (!s) return res.status(404).json({ message: 'Service not found' });

  const a = await Appointment.create({
    user: req.user._id,
    service: s._id,
    date: String(date),
    time: String(time),
    notes: String(notes || ''),
    status: 'PENDING'
  });

  const populated = await Appointment.findById(a._id).populate('user').populate('service');
  return res.status(201).json(dto(populated));
});

// User: my appointments
router.get('/mine', authRequired, async (req, res) => {
  const list = await Appointment.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .populate('user')
    .populate('service');
  return res.json(list.map(dto));
});

// Admin: all appointments
router.get('/', authRequired, adminOnly, async (_req, res) => {
  const list = await Appointment.find()
    .sort({ createdAt: -1 })
    .populate('user')
    .populate('service');
  return res.json(list.map(dto));
});

// Admin: update status
router.patch('/:id/status', authRequired, adminOnly, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};
  if (!['PENDING', 'CONFIRMED', 'CANCELLED'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  const a = await Appointment.findByIdAndUpdate(id, { status }, { new: true })
    .populate('user')
    .populate('service');
  if (!a) return res.status(404).json({ message: 'Appointment not found' });
  return res.json(dto(a));
});

module.exports = router;

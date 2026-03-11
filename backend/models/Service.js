const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    duration: { type: String, default: '' },
    description: { type: String, default: '' },
    imageUrl: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', ServiceSchema);

const mongoose = require('mongoose');

const assetsSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  make: {
    type: String,
  },
  model: {
    type: String,
  },
  description: {
    type: String,
  },
  serialNumber: {
    type: String,
  },
  tagNumber: {
    type: String,
  },
  assetType: {
    type: String,
    required: true,
    enum: ['hardware', 'software'],
  },
  acquisitionDate: {
    type: Date,
  },
  acquisitionType: {
    type: String,
  },
  transactionAmount: {
    type: Number,
  },
  minimumAccessLevel: {
    type: String,
    required: true,
    enum: ['sophomore', 'junior', 'senior', 'staff'],
    default: 'staff',
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['in', 'out', 'lost'],
    default: 'in',
  },
  maintenanceStatus: {
    type: String,
    required: true,
    enum: ['active', 'inactive', 'pending triage', 'triaged', 'servicing'],
    default: 'active',
  },
  maintenanceLog: [
    {
      createdAt: {
        type: Date,
        default: Date.now,
      },
      author: {
        type: String,
        required: true,
      },
      notes: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('assets', assetsSchema);

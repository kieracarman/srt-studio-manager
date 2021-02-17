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
  serialNumber: {
    type: Number,
  },
  tagNumber: {
    type: String,
  },
  type: {
    type: String,
    required: true,
    enum: ['hardware', 'software'],
  },
  dateInService: {
    type: Date,
  },
  dateOutOfService: {
    type: Date,
  },
  acquisitionType: {
    type: String,
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
      author: mongoose.Schema.Types.ObjectId,
      notes: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('assets', assetsSchema);

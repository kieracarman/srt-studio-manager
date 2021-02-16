const mongoose = require('mongoose');

const assetsSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
});

module.exports = mongoose.model('assets', assetsSchema);

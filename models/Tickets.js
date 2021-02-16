const mongoose = require('mongoose');

const ticketsSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
});

module.exports = mongoose.model('tickets', ticketsSchema);

const mongoose = require('mongoose');

const bookingsSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
});

module.exports = mongoose.model('bookings', bookingsSchema);

import mongoose from 'mongoose'

const bookingSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true
  },
  bookingDate: {
    type: Date,
    required: true
  },
  approvedDate: {
    type: Date
  },
  author: mongoose.Schema.Types.ObjectId,
  room: {
    type: String,
    required: true,
    enum: ['114', '212', '213']
  },
  assetsUsed: [mongoose.Schema.Types.ObjectId],
  contacts: [
    {
      name: {
        type: String,
        required: true
      },
      phone: {
        type: String
      }
    }
  ],
  updates: [
    {
      createdAt: {
        type: Date,
        default: Date.now
      },
      author: mongoose.Schema.Types.ObjectId,
      notes: {
        type: String,
        required: true
      }
    }
  ]
})

const Booking = mongoose.model('bookings', bookingSchema)

export default Booking

import mongoose from 'mongoose'

const ticketsSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  author: {
    id: mongoose.Schema.Types.ObjectId,
    username: {
      type: String,
      required: true
    }
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  asset: mongoose.Schema.Types.ObjectId,
  status: {
    type: String,
    required: true,
    enum: ['pending', 'in progress', 'complete'],
    default: 'pending,'
  },
  assignedRole: {
    type: String,
    required: true,
    enum: ['supervisor', 'admin'],
    default: 'supervisor'
  },
  comments: [
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

const Tickets = mongoose.model('tickets', ticketsSchema)

export default Tickets

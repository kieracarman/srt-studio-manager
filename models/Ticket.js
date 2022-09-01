import mongoose from 'mongoose'

const ticketSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  author: mongoose.Schema.Types.ObjectId,
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
        type: String
      }
    }
  ]
})

const Ticket = mongoose.model('tickets', ticketSchema)

export default Ticket

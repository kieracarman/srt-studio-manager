import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['basic', 'supervisor', 'admin'],
    default: 'basic'
  },
  accessLevel: {
    type: String,
    required: true,
    enum: ['sophomore', 'junior', 'senior', 'staff'],
    default: 'sophomore'
  }
})

const Users = mongoose.model('users', userSchema)

export default Users

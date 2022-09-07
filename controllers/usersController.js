import bcrypt from 'bcryptjs'

import User from '../models/User.js'

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password').lean()

  if (!users?.length) {
    return res.status(400).json({ message: 'No users found.' })
  }

  res.json(users)
}

// @desc Create a new user
// @route POST /users
// @access Private
const createUser = async (req, res) => {
  const { username, password, firstName, lastName, role, accessLevel } =
    req.body

  // Confirm data
  if (
    !username ||
    !password ||
    !firstName ||
    !lastName ||
    !role ||
    !accessLevel
  ) {
    return res.status(400).json({ message: 'All fields are required.' })
  }

  // Check for duplicate
  const duplicate = await User.findOne({ username }).lean().exec()

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate username.' })
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10) // 10 salt rounds

  const userObject = {
    username,
    password: hashedPwd,
    firstName,
    lastName,
    role,
    accessLevel
  }

  // Create and store new user
  const user = await User.create(userObject)

  if (user) {
    res.status(201).json({ message: `New user '${username}' created.` })
  } else {
    res.status(400).json({ message: 'Invalid user data received.' })
  }
}

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = async (req, res) => {
  const { id, username, password, firstName, lastName, role, accessLevel } =
    req.body

  // Confirm data
  if (!id || !username || !firstName || !lastName || !role || !accessLevel) {
    return res.status(400).json({ message: 'All fields are required.' })
  }

  // Make sure user exists
  const user = await User.findById(id).exec()

  if (!user) {
    return res.status(400).json({ message: 'User not found.' })
  }

  // Check for duplicate
  const duplicate = await User.findOne({ username }).lean().exec()

  // Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate username.' })
  }

  user.username = username
  user.firstName = firstName
  user.lastName = lastName
  user.role = role
  user.accessLevel = accessLevel

  if (password) {
    // Hash password
    user.password = await bcrypt.hash(password, 10) // 10 salt rounds
  }

  const updatedUser = await user.save()

  res.json({ message: `User '${updatedUser.username}' updated.` })
}

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = async (req, res) => {
  const { id } = req.body

  if (!id) {
    return res.status(400).json({ message: 'User id required.' })
  }

  const user = await User.findById(id).exec()

  if (!user) {
    return res.status(400).json({ message: 'User not found.' })
  }

  const result = await user.deleteOne()

  const reply = `Username ${result.username} with id ${result._id} deleted.`

  res.json(reply)
}

export { getAllUsers, createUser, updateUser, deleteUser }

import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

import Users from '../models/Users.js';

// Handle incoming GET requests to view all possible users
export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find().lean();
    const cleanData = users.map(user => ({ ...user, password: '' }));
    res.status(200).json(cleanData);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

// Handle incoming POST requests to create new item
export const createUser = async (req, res) => {
  // Make sure update data is not empty
  if (!req.body) {
    return res.status(400).json({ message: 'Request data can not be empty!' });
  };
  
  // Check if user already exists
  const userAlreadyInDatabase = await Users.findOne({ username: req.body.username });
  if (userAlreadyInDatabase) {
    return res.status(409).send(`User '${req.body.username}' already exists!`);
  };

  // If all checks passed, create new user and save to database
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new Users({
    ...req.body,
    password: hashedPassword
  });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ error: error });
  }
};

// Handle incoming specified GET requests to view single item
export const getOneUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findById(id).lean();
    const cleanData = { ...user, password: '' };
    res.status(200).json(cleanData);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

// Handle incoming PUT requests to update item
export const updateUser = async (req, res) => {
  const { id } = req.params;

  // Make sure update data is not empty
  if (!req.body) return res.status(400).json({ message: 'Data to update can not be empty!' });

  // Make sure user exists
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`)

  let updatedUser = {
    ...req.body,
    _id: id
  };

  // Check if updating password
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    updatedUser = { ...updatedUser, password: hashedPassword };
  }

  await Users.findByIdAndUpdate(id, updatedUser, { new: true });

  res.json(updatedUser);
};

// Handling incoming DELETE requests to delete item
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  // Make sure user exists
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No user with id: ${id}`);
  };

  await Users.findByIdAndRemove(id);

  res.json({ message: 'User deleted.' });
};
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Users from '../models/Users.js';
import validateLoginInput from '../validation/Login.js';

export const login = async (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  const { username, password } = req.body;

  try {
    // Search for user by username
    const user = await Users.findOne({ username });

    // If user doesn't exist, return 404
    if (!user) return res.status(404).json({ message: 'User does not exist.' });

    // Check user password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // If password is incorrect, return 400
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Incorrect username or password.' });

    // Sign JWT token
    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.SECRET_OR_KEY,
      { expiresIn: 31556926 }
    );

    // Return token
    res.status(200).json({ token: `Bearer ${token}` });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Handle incoming GET requests to view all possible users
export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};
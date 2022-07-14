import mongoose from 'mongoose';

import Bookings from '../models/Bookings.js';

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Bookings.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const createBooking = async (req, res) => {
  const newBooking = new Bookings(req.body);

  try {
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const getOneBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Bookings.findById(id);
    res.status(200).json(booking);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const updateBooking = async (req, res) => {
  const { id } = req.params;

  if (!req.body) return res.status(400).json({ message: 'Data to update can not be empty!' });

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No booking with id: ${id}`);

  const updatedBooking = { ...req.body, _id: id };

  await Bookings.findByIdAndUpdate(id, updatedBooking, { new: true });

  res.json(updatedBooking);
};

export const deleteBooking = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No booking with id: ${id}`);

  await Bookings.findByIdAndRemove(id);

  res.json({ message: 'Booking deleted.' });
};
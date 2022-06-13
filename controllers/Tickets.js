import mongoose from 'mongoose';

import Tickets from '../models/Tickets.js';

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Tickets.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const createTicket = async (req, res) => {
  const newTicket = new Tickets(req.body);

  try {
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(409).json({ error: error });
  }
};

export const getOneTicket = async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await Tickets.findById(id);
    res.status(200).json(ticket);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const updateTicket = async (req, res) => {
  const { id } = req.params;

  if (!req.body) return res.status(400).json({ message: 'Data to update can not be empty!' });

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No ticket with id: ${id}`);

  const updatedTicket = { ...req.body, _id: id };

  await Tickets.findByIdAndUpdate(id, updatedTicket, { new: true });

  res.json(updatedTicket);
};

export const deleteTicket = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No ticket with id: ${id}`);

  await Tickets.findByIdAndRemove(id);

  res.json({ message: 'Ticket deleted.' });
};


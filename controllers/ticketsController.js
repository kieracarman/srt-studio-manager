import asyncHandler from 'express-async-handler'

import Ticket from '../models/Ticket.js'

// @desc Get all tickets
// @route GET /tickets
// @access Private
const getAllTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find().lean()

  if (!tickets?.length) {
    return res.status(400).json({ message: 'No tickets found.' })
  }

  res.json(tickets)
})

// @desc Create a new ticket
// @route POST /tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.create(req.body)

  if (ticket) {
    res.status(201).json({ message: 'New ticket created.' })
  } else {
    res.status(400).json({ message: 'Invalid ticket data received.' })
  }
})

// @desc Update a ticket
// @route PATCH /tickets
// @access Private
const updateTicket = asyncHandler(async (req, res) => {
  const { id } = req.body

  // Make sure data is not empty
  if (!req.body) {
    return res.status(400).json({ message: 'Data to update can not be empty!' })
  }

  // Make sure ticket exists
  const ticket = await Ticket.findById(id).exec()

  if (!ticket) {
    return res.status(400).json({ message: 'Ticket not found.' })
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    id,
    { ...req.body, _id: id },
    { new: true }
  )

  res.json({ message: `Ticket with id ${updatedTicket._id} updated.` })
})

// @desc Delete a ticket
// @route DELETE /tickets
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
  const { id } = req.body

  if (!id) {
    return res.status(400).json({ message: 'Ticket id required.' })
  }

  const ticket = await Ticket.findById(id).exec()

  if (!ticket) {
    return res.status(400).json({ message: 'Ticket not found.' })
  }

  const result = await ticket.deleteOne()

  const reply = `Ticket with id ${result._id} deleted.`

  res.json(reply)
})

export { getAllTickets, createTicket, updateTicket, deleteTicket }

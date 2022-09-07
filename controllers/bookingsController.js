import Booking from '../models/Booking.js'

// @desc Get all bookings
// @route GET /bookings
// @access Private
const getAllBookings = async (req, res) => {
  const bookings = await Booking.find().lean()

  if (!bookings?.length) {
    return res.status(400).json({ message: 'No bookings found.' })
  }

  res.json(bookings)
}

// @desc Create a new booking
// @route POST /bookings
// @access Private
const createBooking = async (req, res) => {
  const booking = await Booking.create(req.body)

  if (booking) {
    res.status(201).json({ message: 'New booking created.' })
  } else {
    res.status(400).json({ message: 'Invalid booking data received.' })
  }
}

// @desc Update a booking
// @route PATCH /bookings
// @access Private
const updateBooking = async (req, res) => {
  const { id } = req.body

  // Make sure data is not empty
  if (!req.body) {
    return res.status(400).json({ message: 'Data to update can not be empty!' })
  }

  // Make sure booking exists
  const booking = await Booking.findById(id).exec()

  if (!booking) {
    return res.status(400).json({ message: 'Booking not found.' })
  }

  const updatedBooking = await Booking.findByIdAndUpdate(
    id,
    { ...req.body, _id: id },
    { new: true }
  )

  res.json({ message: `Booking with id ${updatedBooking._id} updated.` })
}

// @desc Delete a booking
// @route DELETE /bookings
// @access Private
const deleteBooking = async (req, res) => {
  const { id } = req.body

  if (!id) {
    return res.status(400).json({ message: 'Booking id required.' })
  }

  const booking = await Booking.findById(id).exec()

  if (!booking) {
    return res.status(400).json({ message: 'Booking not found.' })
  }

  const result = await booking.deleteOne()

  const reply = `Booking with id ${result._id} deleted.`

  res.json(reply)
}

export { getAllBookings, createBooking, updateBooking, deleteBooking }

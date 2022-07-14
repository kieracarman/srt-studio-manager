import { Router } from 'express';
import passport from 'passport';

import {
  getAllBookings,
  createBooking,
  getOneBooking,
  updateBooking,
  deleteBooking
} from '../controllers/Bookings.js';

const router = Router();
const auth = passport.authenticate('jwt', { session: false });

router.get('/', auth, getAllBookings);
router.post('/', auth, createBooking);
router.get('/:id', auth, getOneBooking);
router.put('/:id', auth, updateBooking);
router.delete('/:id', auth, deleteBooking);

export default router;
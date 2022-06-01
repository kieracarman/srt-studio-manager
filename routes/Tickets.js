import { Router } from 'express';
import passport from 'passport';

import {
  getAllTickets,
  createTicket,
  getOneTicket,
  updateTicket,
  deleteTicket
} from '../controllers/Tickets.js';

const router = Router();
const auth = passport.authenticate('jwt', { session: false });

router.get('/', auth, getAllTickets);
router.post('/', auth, createTicket);
router.get('/:id', auth, getOneTicket);
router.put('/:id', auth, updateTicket);
router.delete('/:id', auth, deleteTicket);

export default router;
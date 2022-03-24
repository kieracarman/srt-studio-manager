import { Router } from 'express';
import passport from 'passport';

import {
  login,
  getAllUsers
} from '../controllers/Users.js';

const router = Router();
const auth = passport.authenticate('jwt', { session: false });

router.post('/login', login);
router.get('/', auth, getAllUsers);

export default router;
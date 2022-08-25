import { Router } from 'express'
import passport from 'passport'

import {
  getAllUsers,
  createUser,
  getOneUser,
  updateUser,
  deleteUser
} from '../controllers/Users.js'

const router = Router()
const auth = passport.authenticate('jwt', { session: false })

router.get('/', auth, getAllUsers)
router.post('/', auth, createUser)
router.get('/:id', auth, getOneUser)
router.put('/:id', auth, updateUser)
router.delete('/:id', auth, deleteUser)

export default router

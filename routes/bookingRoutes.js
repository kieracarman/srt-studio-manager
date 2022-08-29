import { Router } from 'express'

import verifyJWT from '../middleware/verifyJWT.js'
import * as bookingsController from '../controllers/bookingsController.js'

const router = Router()

router.use(verifyJWT)

router
  .route('/')
  .get(bookingsController.getAllBookings)
  .post(bookingsController.createBooking)
  .patch(bookingsController.updateBooking)
  .delete(bookingsController.deleteBooking)

export default router

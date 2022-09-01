import { Router } from 'express'

import verifyJWT from '../middleware/verifyJWT.js'
import * as ticketsController from '../controllers/ticketsController.js'

const router = Router()

router.use(verifyJWT)

router
  .route('/')
  .get(ticketsController.getAllTickets)
  .post(ticketsController.createTicket)
  .patch(ticketsController.updateTicket)
  .delete(ticketsController.deleteTicket)

export default router

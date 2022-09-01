import { Router } from 'express'

import verifyJWT from '../middleware/verifyJWT.js'
import * as usersController from '../controllers/usersController.js'

const router = Router()

router.use(verifyJWT)

router
  .route('/')
  .get(usersController.getAllUsers)
  .post(usersController.createUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser)

export default router

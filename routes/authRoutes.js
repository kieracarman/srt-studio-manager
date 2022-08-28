import { Router } from 'express'

import * as authController from '../controllers/authController.js'
import loginLimiter from '../middleware/loginLimiter.js'

const router = Router()

router.route('/login').post(loginLimiter, authController.login)

router.route('/refresh').get(authController.refresh)

router.route('/logout').post(authController.logout)

export default router

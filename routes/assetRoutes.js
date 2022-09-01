import { Router } from 'express'

import verifyJWT from '../middleware/verifyJWT.js'
import * as assetsController from '../controllers/assetsController.js'

const router = Router()

router.use(verifyJWT)

router
  .route('/')
  .get(assetsController.getAllAssets)
  .post(assetsController.createAsset)
  .patch(assetsController.updateAsset)
  .delete(assetsController.deleteAsset)

export default router

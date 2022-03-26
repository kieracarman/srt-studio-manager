import { Router } from 'express';
import passport from 'passport';

import {
  getAllAssets,
  createAsset,
  getOneAsset,
  updateAsset,
  deleteAsset
} from '../controllers/Assets.js';

const router = Router();
const auth = passport.authenticate('jwt', { session: false });

router.get('/', auth, getAllAssets);
router.post('/', auth, createAsset);
router.get('/:id', auth, getOneAsset);
router.put('/:id', auth, updateAsset);
router.delete('/:id', auth, deleteAsset);

export default router;
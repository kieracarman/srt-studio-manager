const { Router } = require('express');
const passport = require('passport');

const router = Router();

const auth = passport.authenticate('jwt', { session: false });

const Assets = require('../controllers/Assets');

router.get('/', auth, Assets.getAll);
router.get('/:id', auth, Assets.getOne);
router.patch('/:id', auth, Assets.updateOne);
router.post('/', auth, Assets.create);
router.delete('/:id', auth, Assets.delete);

module.exports = router;

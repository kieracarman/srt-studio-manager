const { Router } = require('express');
const passport = require('passport');

const router = Router();

const auth = passport.authenticate('jwt', { session: false });

const Bookings = require('../controllers/Bookings');

router.get('/', auth, Bookings.getAll);
router.get('/:id', auth, Bookings.getOne);
router.put('/:id', auth, Bookings.updateOne);
router.post('/', auth, Bookings.create);
router.delete('/:id', auth, Bookings.delete);

module.exports = router;

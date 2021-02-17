const { Router } = require('express');
const passport = require('passport');

const router = Router();

const auth = passport.authenticate('jwt', { session: false });

const Tickets = require('../controllers/Tickets');

router.get('/', auth, Tickets.getAll);
router.get('/:id', auth, Tickets.getOne);
router.put('/:id', auth, Tickets.updateOne);
router.post('/', auth, Tickets.create);
router.delete('/:id', auth, Tickets.delete);

module.exports = router;

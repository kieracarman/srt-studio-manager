const { Router } = require('express');
const passport = require('passport');

const router = Router();

const auth = passport.authenticate('jwt', { session: false });

const Users = require('../controllers/Users');

router.post('/login', Users.login);
router.get('/', auth, Users.getAll);

module.exports = router;

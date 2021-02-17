const { Router } = require('express');

const router = Router();

const Users = require('../controllers/Users');

router.post('/login', Users.login);

module.exports = router;

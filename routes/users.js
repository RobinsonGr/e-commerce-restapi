const {addUser} = require('../controller/user.controller.js');
const passport = require('passport');

const {Router} = require('express');
const router = Router();

router.post('/register', addUser);

module.exports = router;
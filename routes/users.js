const {addUser} = require('../controller/user.controller.js');

const {Router} = require('express');
const router = Router();

router.post('/register', addUser);

module.exports = router;
const {addUser} = require('../controller/user.controller.js');
const passport = require('passport');

const {Router} = require('express');
const router = Router();

router.post('/register', addUser);
router.post('/login', passport.authenticate("local",  {
    successRedirect: "/",
    failureRedirect: "/users/login",
  }), (req, res) => {
  
    res.send(req.isAuthenticated())
    }); // nothing is log in the console, help me out
//router.get('/test', 

module.exports = router;


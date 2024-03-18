const {addUser, getUser} = require('../controller/user.controller.js');
const passport = require('passport');
const multer = require('multer');
const upload = multer()
const {Router} = require('express');
const router = Router();

//I'll be sending the data for registration with formData format, even though without sending complex data
// as imgs, so i got to use multer with .none(), it could be send as plain object just with urlencoded as default parser

router.post('/register', upload.none(), addUser);
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { 
      return next(err); // Handle general errors
    }

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' }); // Or your preferred error response
    }

    // Successful login
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      return res.json({ message: 'Login successful', user }); // Or any other success response
    });   
  })(req, res, next); 
});

//send true or false if the user is authenticathed
router.get('/me', getUser);

reuter.put("/edit", )


module.exports = router;


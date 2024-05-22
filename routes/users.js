const {addUser, getUser, editUser} = require('../controller/user.controller.js');
const passport = require('passport');
const multer = require('multer');
const upload = multer()
const {Router} = require('express');
const router = Router();
const {checkAuthentication} = require('../controller/user.controller.js')

//I'll be sending the data for registration with formData format, even though without sending complex data
// as imgs, so i got to use multer with .none(), it could be send as plain object just with urlencoded as default parser

router.post('/register', upload.none(), addUser);
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err); 
    }
    
    if (!user) {
      return res.status(401).json({ message: info.message }); 
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(401).json({ message: info.message }); 
      }
      return res.status(200).json({ message: 'Login successful', user }); 
    });
  })(req, res, next);
});

//send true or false if the user is authenticathed
router.get('/me', getUser);

router.put('/edituser', editUser);
router.get('/test', checkAuthentication, (req, res) => {res.status(200).json({message: 'it worked'})});

router.get('/logout', (req, res) => {
  req.logout(function(err) {
      if (err) {
          console.error('Error logging loout:', err);
          return res.status(500).send('Error logging out');
      }
    res.status(200).json({ message: 'Logout successful' }); 
  });
});


module.exports = router;


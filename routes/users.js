const {addUser} = require('../controller/user.controller.js');
const passport = require('passport');
const multer = require('multer');
const upload = multer()


const {Router} = require('express');
const router = Router();

//I'll be sending the data for registration with formData format, even though without sending complex data
// as imgs, so i got to use multer with .none(), it could be send as plain object just with urlencoded as default parser
router.post('/register', upload.none(), addUser);
router.post('/login', passport.authenticate("local",  {
    successRedirect: "/user/checklogin",
    failureRedirect: "/user/checklogin",
  })); 

//send true or false if the user is authenticathed
router.get('/checklogin', (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ 
      isAuth: true
    });
  } 
  
  //401 unathorized
    return res.status(401).json({ 
      isAuth: false
    });
  
});


module.exports = router;


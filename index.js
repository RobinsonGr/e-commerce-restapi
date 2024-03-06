const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const LocalStrategy = require("passport-local").Strategy
const pool = require('../config/database.js');
const bcrypt = require('bcrypt');


const authSetup = require('./config/passport');
//authSetup(passport);


app.use(cors())



app.use(
  session({
    secret: '123',
    resave: false,
    saveUninitialized: false,
  })
  )
  
  app.use(passport.initialize());
  app.use(passport.session());
  

//Storing the user id inside a cookie for persistence
passport.serializeUser((user, done) => done(null, user.id));

//Authenticating the user id stored within the cookie and validating it with the db to grant auth
passport.deserializeUser((id, done) => {
    pool.query(`SELECT * FROM customers WHERE id = $1`, [id], (err, result) => {
        
        if(err) {
            done(err)
        };

        //C HECK id or object
        const userId = result.rows[0].id;

        return done(null, userId);
    });
}); 

passport.use(new LocalStrategy(async function(email, password, done) {
        
  //Retriving user from the db and comparing the password in the db 
  await pool.query(`
  SELECT *
  FROM customers
  WHERE email = $1   
  `, 
  [email],
  async (err, result) => {
      console.log('ss')
      
          const user = result.rows[0];
          const passwordMatch = await bcrypt.compare(password, user.password);

          if(err) {
              return done(err)
          }
          if(!user) {
              return done(null, false, {message: 'User was incorrect'});
          };
          
          if(!passwordMatch) {
              return done(null, false, {message: 'Password was incorrect'});
          };
          
          return done(null, user);
  });
}))





app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/products', require('./routes/products'));
app.use('/categories', require('./routes/categories'));
app.use('/user', require('./routes/users'));
app.post('/login', passport.authenticate("local", {failureRedirect: '/loginn'}));


        
app.listen(3000, () => {
  console.log('listening at port 3000')
})


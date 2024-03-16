const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');

const authSetup = require('./config/passport');
authSetup(passport);

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(
  session({
    secret: '123',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      maxAge: 3600000,
      secure: false,
    }
  })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());

app.use(express.json());
// Enables parsing of complex form data as nested objects, arrays using the 'qs' library for flexibility (true).
app.use(express.urlencoded({extended: true}));

app.use('/products', require('./routes/products'));
app.use('/categories', require('./routes/categories'));
app.use('/user', require('./routes/users'));
        
app.listen(3000, () => {
  console.log('listening at port 3000')
})


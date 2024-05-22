const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const env = require('dotenv');

env.config();

const authSetup = require('./config/passport');
authSetup(passport);

// Use the FRONTEND_ORIGIN environment variable for CORS origin
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
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
app.use(express.urlencoded({ extended: true }));

app.use('/products', require('./routes/products'));
app.use('/categories', require('./routes/categories'));
app.use('/user', require('./routes/users'));
app.use('/stripe', require('./routes/stripe'));

// Use the PORT environment variable for server port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

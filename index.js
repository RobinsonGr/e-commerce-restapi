const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');

const authSetup = require('./config/passport');

authSetup(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  session({
    secret: '123',
    resave: false,
    saveUninitialized: false,
  })
)

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/products', require('./routes/index'));
app.use('/categories', require('./routes/categories'));
app.use('/user', require('./routes/users'));
        
app.listen(3000, () => {
  console.log('listening at port 3000')
})

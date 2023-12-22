const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/products', require('./routes/index'));
app.use('/categories', require('./routes/categories'));
app.use('/user', require('./routes/users'));
        
app.listen(3000, () => {
  console.log('listening at port 3000')
})
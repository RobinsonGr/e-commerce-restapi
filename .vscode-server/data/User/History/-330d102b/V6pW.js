const { Client } = require('pg');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const connectToDatabase = async () => {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: '123',
    port: 5432,
  });
}

connectToDatabase();

  
app.listen(8000, () => {
  console.log('Listening now!');
});
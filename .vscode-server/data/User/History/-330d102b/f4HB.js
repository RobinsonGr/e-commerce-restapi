const { Client } = require('pg'); 
const express = require('express'); 
const app = express(); 

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: '123',
  port: 5432,
});

 client.connect();

const now = client.query('SELECT NOW()');

 client.end();

app.listen(8000, () => {
  console.log('Listening now!');
});
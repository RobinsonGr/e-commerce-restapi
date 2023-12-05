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

await client.connect();

const now = await client.query('SELECT NOW()');

await client.end();

app.listen(8000, () => {
  console.log('Listening now!');
});
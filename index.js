const { Client } = require('pg');
const express = require('express');
const app = express();

const connectToDatabase = async () => {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'bamboo',
    password: '123',
    port: 5432,
  });

  try {
    await client.connect();
    const result = await client.query('SELECT NOW()');
    console.log(result);
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
};

connectToDatabase(); // Call the function to establish the database connection

app.listen(8000, () => {
  console.log('Listening now!');
});
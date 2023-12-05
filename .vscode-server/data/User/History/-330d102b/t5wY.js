const { Pool } = require('pg');
const express = require('express');
const app = express();

  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'bamboo',
    password: '123',
    port: 5432,
  });

  await client.connect();


  app.listen(8000, () => {
    console.log('Listening now!');
  })


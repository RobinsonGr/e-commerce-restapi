const { Pool } = require('pg');
const express = require('express');
const app = express();

  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'bamboo',
    password: 'abc',
    port: 5432,
  });

  async function getUsers () {
    const response = await pool.query('SELECT * FROM categories');
    console.log(response.rows);
    res.send('users')
  }

  getUsers()


  app.listen(8000, () => {
    console.log('Listening now!');
  })


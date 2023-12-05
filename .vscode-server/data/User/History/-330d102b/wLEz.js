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

  const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM categories');
    console.log(response.rows);
    res.send('users')
  }

  app.get("/categories", getUsers(req, res))

  app.listen(8000, () => {
    console.log('Listening now!');
  })


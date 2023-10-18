const { Client } = require('pg');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

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
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

connectToDatabase();


app.get('/get-data', async (req, res) => {
  try {
    const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'bamboo',
      password: '123',
      port: 5432,
    });

    await client.connect();

    const query = 'SELECT * FROM your_table_name'; 
    const result = await client.query(query);

    await client.end();

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.post('/insert-data', async (req, res) => {
  const { dataToInsert } = req.body; 

  try {
    const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'bamboo',
      password: '123',
      port: 5432,
    });

    await client.connect();

    const query = 'INSERT INTO your_table_name (column1, column2) VALUES ($1, $2)';

    const result = await client.query(query, [dataToInsert.column1Value, dataToInsert.column2Value]);

    await client.end();

    res.json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'An error occurred while inserting data' });
  }
});

app.listen(8000, () => {
  console.log('Listening now!');
});
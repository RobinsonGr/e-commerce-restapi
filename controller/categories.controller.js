const {Pool} = require("pg");

const pool = new Pool ({
    user: "postgres",
    host: "localhost",
    port: 6000,
    password: "123",
    database: "bamboo"
});

async function getCategories(req, res) {
  try {
    const response = await pool.query(
        `
        SELECT *
        FROM categories `
    );
    console.log(response.rows)
    res.json(response.rows)
  } catch(err) { 
    console.error('Error while trying to fetch categories')
    res.status(500).json({error: 'Feiled to retrieve categories'})
  }
};

async function addCategories (req, res) {

    const {id, name} = req.body.newCategory

    try {
        const response = await pool.query(
            `INSERT INTO categories
            VALUES($1, $2)`, [id, name]
        )
        res.json(response);
    } catch(err) {
        console.error('We could not upload this category')
        res.status(500).json({error: 'We could not upload this category'})
    }
}

module.exports = {
    getCategories,
    addCategories,
}
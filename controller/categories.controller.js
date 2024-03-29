const pool = require('../config/database.js')

// Retrieves all categories from the db
async function getCategories(req, res) {
  try {
    const response = await pool.query(
        `SELECT *
        FROM categories `
    );

    res.json(response.rows)
  } catch(err) { 
    console.error('Failed to delete category:', err.message);
    res.status(500).json({ error: 'Failed to delete category'});
  }
};

//adds a new category to the db
async function addCategories (req, res) {
    const {id, name} = req.body;

    try {
        const response = await pool.query(
            `INSERT INTO categories
            VALUES($1, $2)
            RETURNING *
            `, 
            [id, name]
        );

        res.json(response.rows);
    } catch(err) {
        console.error('Failed to delete category:', err.message);
        res.status(500).json({ error: 'Failed to delete category' });
    }
};

//deletes a category from the db with the id as parameter
async function deleteCategories (req, res) {
    const {id} = req.params;

    try {
        const response = await pool.query(`
        DELETE FROM categories
        WHERE category_id = $1
        RETURNING *
        `, 
        [id]);

        return res.json(response.rows);
    } catch (err) {
        console.error('Failed to delete category:', err.message)
        res.status(500).json({ error: 'Failed to delete category' });
    };
};

module.exports = {
    getCategories,
    addCategories,
    deleteCategories
}


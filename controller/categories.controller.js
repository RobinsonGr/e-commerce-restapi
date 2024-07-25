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
    console.error('Failed retriving the category:', err.message);
    res.status(500).json({ error: 'Failed to delete category'});
  }
};

//adds a new category to the db
async function addCategories (req, res) {
    const {name, url} = req.body;

    try {
        const response = await pool.query(
            `INSERT INTO categories(name, url)
            VALUES($1, $2)
            RETURNING *
            `, 
            [name, url]
        );
        res.json(response.rows[0]);
    } catch(err) {
        console.error('Failed to delete category:', err.message);
        res.status(500).json({ error: 'Failed to delete category' });
    }
};

async function editCategories(req, res) {
    const { id } = req.params;
    const { name, categoryURL } = req.body;


    try {
        const response = await pool.query(
            `UPDATE categories
            SET name = $1, url = $3
            WHERE id = $2
            RETURNING *`,
            [name, id, categoryURL]
        );

        return res.json(response.rows[0]);
    } catch (err) {
        console.error('Failed to edit category:', err.message);
        res.status(500).json({ error: 'Failed to edit category' });
    }
};


//deletes a category from the db with the id as parameter
async function deleteCategories(req, res) {
    const { id } = req.params;

    try {
        await pool.query('BEGIN');

        await pool.query(`
            DELETE FROM categories_products
            WHERE category_id = $1
        `, [id]);

        const response = await pool.query(`
            DELETE FROM categories
            WHERE id = $1
            RETURNING *
        `, [id]);

        await pool.query('COMMIT');

        if (response.rows.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }

        return res.json(response.rows[0]);
    } catch (err) {
        await pool.query('ROLLBACK');
        console.error('Failed to delete category:', err.message);

        return res.status(500).json({ error: 'Failed to delete category' });
    }
}

module.exports = {
    getCategories,
    addCategories,
    deleteCategories,
    editCategories
};
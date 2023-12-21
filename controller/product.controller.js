const pool = require('../config/database.js');

// Retrieves all products with their categories
async function getProducts(req, res) {
    try {
        const response = await pool.query(`
            SELECT products.*, category_name
            FROM products
            JOIN products_categories ON products.id = products_categories.product_id
            JOIN categories ON category_id = categories.id
        `);

        res.json(response.rows);
    } catch (err) {
        console.error('Failed to retrieve products:', err.message);
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
}

// Retrieves a single product with its category (with id)
async function getProduct(req, res) {
    const productId = parseInt(req.params.id);

    try {
        const response = await pool.query(`
            SELECT products.*, category_name
            FROM products
            JOIN products_categories ON products.id = products_categories.product_id
            JOIN categories ON category_id = categories.id
            WHERE products.id = $1
        `, [productId]);

        res.json(response.rows);
    } catch (err) {
        console.error('Failed to retrieve product:', err.message);
        res.status(500).json({ error: 'Failed to retrieve product' });
    }
}

// Creates a new product
async function createProduct(req, res) {
    const { id, name, price, product_description, stockQuantity } = req.body.newProduct;

    try {
        const response = await pool.query(`
            INSERT INTO products (id, name, price, product_description, stockquantity)
            VALUES ($1, $2, $3, $4, $5)
        `, [parseInt(id), name, parseInt(price), product_description, parseInt(stockQuantity)]);

        console.log(response);
        res.json(response);
    } catch (err) {
        console.error('Failed to create product:', err.message);
        res.status(500).json({ error: 'Failed to create product' });
    }
}

// Updates an existing product
async function updateProduct(req, res) {
    const { id, name, price, product_description, stockQuantity } = req.body.updateProduct;

    const updateFields = {
        name,
        price: parseInt(price),
        product_description,
        stockquantity: parseInt(stockQuantity)
    };

    const updateQuery = `
        UPDATE products
        SET ${Object.keys(updateFields).map((column, index) => `${column} = $${index + 1}`).join(", ")}
        WHERE id = $${Object.keys(updateFields).length + 1}
        RETURNING *
    `;

    const values = [...Object.values(updateFields), parseInt(id)];

    try {
        const response = await pool.query(updateQuery, values);

        console.log(response);
        res.json(response);
    } catch (err) {
        console.error('Failed to update product:', err.message);
        res.status(500).json({ error: 'Failed to update product' });
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
};

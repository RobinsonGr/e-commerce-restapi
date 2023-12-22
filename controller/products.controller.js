const pool = require('../config/database.js');

// Retrieves all products with their categories
async function getProducts(req, res) {
    try {
        const response = await pool.query(`
            SELECT products.*, categories.name
            FROM products
            LEFT JOIN products_category 
            ON products.product_id = products_category.product_id
            LEFT JOIN categories
            ON products_category.category_id = categories.category_id
        `);

        console.log(response)
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
            SELECT products.*, categories.category_name
            FROM products
            JOIN products_categories ON products.id = products_categories.product_id
            JOIN categories ON products_categories.category_id = categories.id
            WHERE products.id = $1;
        `, [productId]);

        res.json(response.rows);
    } catch (err) {
        console.error('Failed to retrieve product:', err.message);
        res.status(500).json({ error: 'Failed to retrieve product' });
    }
}

// Creates a new product
async function createProduct(req, res) {
    const { name, price, description, stock_quantity } = req.body.newProduct;

    try {
        const response = await pool.query(`
            INSERT INTO products (name, price, description, stock_quantity)
            VALUES ($1, $2, $3, $4)
        `, [name, parseInt(price), description, parseInt(stock_quantity)]);

        res.json(response.rows);
    } catch (err) {
        console.error('Failed to create product:', err.message);
        res.status(500).json({ error: 'Failed to create product' });
    };
};

// Updates an existing product
async function updateProduct(req, res) {
    const {id, name, price, description, stock_quantity} = req.body.updateProduct;
    //this is the whole information 

    const updateFields = {};

    if(name) updateFields.name = name;
    if(price) updateFields.price = price;
    if(description) updateFields.description = description;
    if(stock_quantity) updateFields.stock_quantity = stock_quantity;
    
    
    const updateQuery = `
        UPDATE products
        SET ${Object.keys(updateFields).map((column, index) => `${column} = $${index + 1}`).join(", ")}
        WHERE product_id = $${Object.keys(updateFields).length + 1}
        RETURNING *
    `;

    const values = [...Object.values(updateFields), parseInt(id)];

    try {
        const response = await pool.query(updateQuery, values);

        console.log(response);
        res.json(response.rows);
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
3


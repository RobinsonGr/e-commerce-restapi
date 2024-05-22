const pool = require('../config/database.js');

// Retrieves all products with their categories
// Retrieves all products from a specific categories, with their categories 
async function getProducts(req, res) {
    const categoryURL = req.params.categoryURL;

    try {

        //PENDING TO MODIFY THE QUERY TO BE ABLE TO RETRIEVE PRODUCTS BY CATEGORY
        const response = await pool.query(`
            SELECT products.*, categories.name as category
            FROM products
            LEFT JOIN categories_products 
            ON products.id = categories_products.product_id
            LEFT JOIN categories
            ON categories_products.category_id = categories.id
            WHERE categories.url = $1;
        `, [categoryURL]);

        res.json(response.rows);
    } catch (err) {
        console.error('Failed to retrieve products:', err.message);
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
};


async function getProductsByCategoryId(req, res) {
    const categoryId = req.params.categoryId;
    try {
        const response = await pool.query(`
            SELECT products.*
            FROM products
            LEFT JOIN categories_products 
            ON products.id = categories_products.product_id
            LEFT JOIN categories
            ON categories_products.category_id = categories.id
            WHERE categories.id = $1;
        `, [categoryId]);

        res.json(response.rows);
    } catch (err) {
        console.error('Failed to retrieve products:', err.message);
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
}

// Retrieves a single product with its category (with id)
//categories.category_name
async function getProduct(req, res) {
    const productId = parseInt(req.params.id);

    try {
        const response = await pool.query(`
            SELECT products.*, categories.name as category
            FROM products
            JOIN categories_products ON products.id = categories_products.product_id
            JOIN categories ON categories_products.category_id = categories.id
            WHERE products.id = $1;
        `, [productId]);

        res.json(response.rows[0]);
    } catch (err) {
        console.error('Failed to retrieve product:', err.message);
        res.status(500).json({ error: 'Failed to retrieve product' });
    }
}

// Creates a new product
async function createProduct(req, res) {
    const { name, price, description, img, stock, selectedCategory } = req.body;
    const imgChecked = !img ? 'https://i.ibb.co/17Vyyft/VIDA-FOR-EMPTY-IMG-PRODUCTS.png' : img

    try {
        await pool.query('BEGIN');

        const response = await pool.query(`
            INSERT INTO products (name, price, description, stock, img)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `, [name, parseInt(price), description, parseInt(stock), imgChecked]);

        const productId = response.rows[0].id;

        await pool.query(`
            INSERT INTO categories_products (category_id, product_id)
            VALUES ($1, $2)
        `, [selectedCategory, productId]);

        await pool.query('COMMIT');

        res.json({ productId });
    } catch (err) {
        await pool.query('ROLLBACK');
        console.error('Failed to create product and category relation:', err.message);
        res.status(500).json({ error: 'Failed to create product and category relation' });
    }
}

// Updates an existing product
async function updateProduct(req, res) {
    const {id, name, price, description, img, stock, selectedCategory} = req.body;
    //this is the whole information 
    if(!img) {
        img = 'https://i.ibb.co/9yHWqDq/ECO-empty-image-product.png';
    }

    const updateFields = {};

    if(name) updateFields.name = name;
    if(price) updateFields.price = price;
    if(description) updateFields.description = description;
    if(stock) updateFields.stock = stock;
    if(img) updateFields.img = img;
    
    const updateQuery = `
    UPDATE products
    SET ${Object.keys(updateFields).map((column, index) => `${column} = $${index + 1}`).join(",")}
    WHERE id = $${Object.keys(updateFields).length + 1}
    RETURNING *
    `;
    
    const values = [...Object.values(updateFields), parseInt(id)];

    try {
        const response = await pool.query(updateQuery, values);

        res.json(response.rows);
    } catch (err) {
        console.error('Failed to update product:', err.message);
        res.status(500).json({ error: 'Failed to update product' });
    }
}

async function deleteProduct(req, res) {
    const productId = parseInt(req.params.id);
  
    try {
      await pool.query('BEGIN'); 
  
      await pool.query(`
        DELETE FROM categories_products
        WHERE product_id = $1;
      `, [productId]);
  
      const response = await pool.query(`
        DELETE FROM products
        WHERE id = $1
        RETURNING *;
      `, [productId]);
  
      if (response.rowCount === 0) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        await pool.query('COMMIT'); 
        res.json({ message: 'Product deleted successfully', product: response.rows[0] });
      }
    } catch (err) {
      await pool.query('ROLLBACK'); 
      console.error('Failed to delete product:', err.message);
      res.status(500).json({ error: 'Failed to delete product' });
    }
  }
  

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    getProductsByCategoryId,
    deleteProduct
};




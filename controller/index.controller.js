const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'bamboo',
    password: '123',
    port: 6000,
  }); 

  async function getProducts (req, res) {
    const response = await pool.query(`
    SELECT products.*, category_name
    FROM products
    JOIN products_categories
    ON products.id = products_categories.product_id
    JOIN categories
    ON category_id = categories.id;
  `);
    console.log(response.rows);
  };

  async function getProduct (req, res) {

    const response = await pool.query(`
    SELECT products.*, category_name
    FROM products
    JOIN products_categories
    ON products.id = products_categories.product_id
    JOIN categories
    ON category_id = categories.id
    WHERE products.id = $1;
    `, [parseInt(req.params.id)]);
    console.log(response.rows);
  };


  async function createProduct (req, res) {

    const newProduct = req.body.newProduct;
    const response = await pool.query(`
    INSERT INTO products (id, name, price, product_description, stockquantity)
    VALUES ($1, $2, $3, $4, $5);
   `, [
    parseInt(newProduct.id), 
    newProduct.name, 
    parseInt(newProduct.price),
    newProduct.product_description,
    parseInt(newProduct.stockQuantity)
    ]);
    console.log(response);
  };

  async function updateProduct (req, res) {
    const {id, name, price, product_description, stockQuantity} = req.body.updateProduct;

    const updateFiels = {};

    if(name) updateFiels.name = name;
    if(price) updateFiels.price = price;
    if(product_description) updateFiels.product_description = product_description;
    if(stockQuantity) updateFiels.stockQuantity = stockQuantity;

  const updateQuery = `
    UPDATE products
    SET ${Object.keys(updateFiels).map((column, index) => `${column} = $${index + 1}`).join(", ")}
    WHERE id = $${Object.keys(updateFiels).length + 1}
    RETURNING *
  `
  const values = [...Object.values(updateFiels), id]

  const response = await pool.query(updateQuery, values);

  console.log(response)
  }

  module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
  };
 SELECT products.*, categories.name
    FROM products
    LEFT JOIN categories_products 
    ON products.id = categories_products.product_id
    LEFT JOIN categories
    ON categories_products.category_id = categories.id
    WHERE categories.url = 'organic-food';

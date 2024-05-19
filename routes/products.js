const {getProducts, getProduct, createProduct, updateProduct, getProductsByCategoryId, deleteProduct} = require('../controller/products.controller')

const {Router} = require('express');
const router = Router();

router.get('/:categoryURL', getProducts)

router.get('/bycategoryid/:categoryId', getProductsByCategoryId)

router.get('/individual/:id', getProduct)


router.post('/', createProduct);

router.put('/', updateProduct);

router.delete('/:id', deleteProduct);


module.exports = router;

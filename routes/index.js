const {getProducts, getProduct, createProduct, updateProduct} = require('../controller/index.controller')

const {Router} = require('express');
const router = Router();

router.get('/', getProducts)

router.get('/:id', getProduct)

router.post('/', createProduct)

router.put('/', updateProduct)



module.exports = router;
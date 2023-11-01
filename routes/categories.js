const {getCategories, addCategories} = require('../controller/categories.controller')

const {Router} = require('express');
const categoriesRouter = Router();


categoriesRouter.get('/', getCategories)
categoriesRouter.post('/', addCategories)

module.exports = categoriesRouter;
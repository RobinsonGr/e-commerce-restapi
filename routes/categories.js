const {getCategories, addCategories, editCategories, deleteCategories} = require('../controller/categories.controller')

const {Router} = require('express');
const categoriesRouter = Router();

categoriesRouter.get('/', getCategories);
categoriesRouter.put('/:id', editCategories);
categoriesRouter.post('/', addCategories);
categoriesRouter.delete('/:id', deleteCategories);

module.exports = categoriesRouter;
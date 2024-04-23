const {getCategories, addCategories, deleteCategories} = require('../controller/categories.controller')

const {Router} = require('express');
const categoriesRouter = Router();

categoriesRouter.get('/', getCategories);
categoriesRouter.post('/', addCategories);
categoriesRouter.delete('/:id', deleteCategories);


categoriesRouter.get('/', getCategories);
categoriesRouter.post('/', addCategories);
categoriesRouter.delete('/:id', deleteCategories);

module.exports = categoriesRouter;
const express = require('express');
const router = express.Router();

const categoria = require('../controllers/categoria.controller');

router.get('/', categoria.getAllCategoria);
router.get('/activos/', categoria.getActiveCategoria);
router.post('/', categoria.createCategoria);
router.get('/:id', categoria.getByIdCategoria);
router.put('/:id', categoria.putCategoria);
router.delete('/:id', categoria.deleteCategoria);

module.exports = router;
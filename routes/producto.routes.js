const express = require('express');
const router = express.Router();

const producto = require('../controllers/producto.controller');

router.get('/', producto.getAllProducto);
router.get('/tienda/:tienda_id', producto.getByIdTiendaProducto);
router.post('/', producto.createProducto);
router.get('/:id', producto.getByIdProducto);
router.put('/:id', producto.putProducto);
router.delete('/:id', producto.deleteProducto);

module.exports = router;
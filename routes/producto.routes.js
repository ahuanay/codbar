const express = require('express');
const router = express.Router();

const producto = require('../controllers/producto.controller');

router.get('/', producto.getAllProducto);
router.post('/', producto.createProducto);
router.get('/:id', producto.getByIdProducto);
router.get('/codbar/:codbar', producto.getByCodBarProducto);
router.put('/:id', producto.getUpdateProducto);
router.delete('/:id', producto.getDeleteProducto);

module.exports = router;
const express = require('express');
const router = express.Router();

const producto_kardex = require('../controllers/producto_kardex.controller');

router.get('/', producto_kardex.getAllProductoKardex);
router.post('/', producto_kardex.createProductoKardex);
router.get('/:id', producto_kardex.getByIdProductoKardex);
router.put('/:id', producto_kardex.putProductoKardex);
router.delete('/:id', producto_kardex.deleteProductoKardex);

module.exports = router;
const express = require('express');
const router = express.Router();

const tienda = require('../controllers/tienda.controller');

router.get('/', tienda.getAllTienda);
router.post('/', tienda.createTienda);
router.get('/:id', tienda.getByIdTienda);
router.put('/:id', tienda.putTienda);
router.delete('/:id', tienda.deleteTienda);

module.exports = router;
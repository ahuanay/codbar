const express = require('express');
const router = express.Router();

const tipo_kardex = require('../controllers/tipo_kardex.controller');

router.get('/', tipo_kardex.getAllTipoKardex);
router.post('/', tipo_kardex.createTipoKardex);
router.get('/:id', tipo_kardex.getByIdTipoKardex);
router.put('/:id', tipo_kardex.putTipoKardex);
router.delete('/:id', tipo_kardex.deleteTipoKardex);

module.exports = router;
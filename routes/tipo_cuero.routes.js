const express = require('express');
const router = express.Router();

const tipo_cuero = require('../controllers/tipo_cuero.controller');

router.get('/', tipo_cuero.getAllTipoCuero);
router.get('/activos/', tipo_cuero.getActiveTipoCuero);
router.post('/', tipo_cuero.createTipoCuero);
router.get('/:id', tipo_cuero.getByIdTipoCuero);
router.put('/:id', tipo_cuero.putTipoCuero);
router.delete('/:id', tipo_cuero.deleteTipoCuero);

module.exports = router;
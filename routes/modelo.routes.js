const express = require('express');
const router = express.Router();

const modelo = require('../controllers/modelo.controller');

router.get('/', modelo.getAllModelo);
router.get('/activos/', modelo.getActiveModelo);
router.post('/', modelo.createModelo);
router.get('/:id', modelo.getByIdModelo);
router.put('/:id', modelo.putModelo);
router.delete('/:id', modelo.deleteModelo);

module.exports = router;
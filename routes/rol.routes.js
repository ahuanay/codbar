const express = require('express');
const router = express.Router();

const rol = require('../controllers/rol.controller');

router.get('/', rol.getAllRol);
router.post('/', rol.createRol);
router.get('/:id', rol.getByIdRol);
router.put('/:id', rol.putRol);
router.delete('/:id', rol.deleteRol);

module.exports = router;
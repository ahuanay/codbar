const express = require('express');
const router = express.Router();

const rol = require('../controllers/rol.controller');

router.get('/', rol.getAllRol);
router.post('/', rol.createRol);
router.get('/:id', rol.getByIdRol);
router.put('/:id', rol.getUpdateRol);
router.delete('/:id', rol.getDeleteRol);

module.exports = router;
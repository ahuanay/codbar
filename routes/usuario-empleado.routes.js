const express = require('express');
const router = express.Router();
const usuarioEmpleado = require('../controllers/usuario-empleado.controller');

router.get('/', usuarioEmpleado.getAllUsuarioEmpleado);
router.post('/', usuarioEmpleado.createUsuarioEmpleado);
// router.get('/:id', usuarioEmpleado.getByIdUsuarioEmpleado);
// router.put('/:id', usuarioEmpleado.getUpdateUsuarioEmpleado);
// router.delete('/:id', usuarioEmpleado.getDeleteUsuarioEmpleado);

module.exports = router;
const express = require('express');
const router = express.Router();
const usuarioEmpleado = require('../controllers/usuario-empleado.controller');

router.post('/', usuarioEmpleado.createUsuarioEmpleado);

module.exports = router;
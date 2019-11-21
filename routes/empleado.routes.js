const express = require('express');
const router = express.Router();

const empleado = require('../controllers/empleado.controller');

router.get('/', empleado.getAllEmpleado);
router.post('/', empleado.createEmpleado);
router.get('/:id', empleado.getByIdEmpleado);
router.put('/:id', empleado.getUpdateEmpleado);
router.delete('/:id', empleado.getDeleteEmpleado);

module.exports = router;
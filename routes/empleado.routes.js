const express = require('express');
const router = express.Router();

const empleado = require('../controllers/empleado.controller');

router.get('/', empleado.getAllEmpleado);
router.post('/', empleado.createEmpleado);
router.get('/:id', empleado.getByIdEmpleado);
router.put('/:id', empleado.putEmpleado);
router.delete('/:id', empleado.deleteEmpleado);

module.exports = router;
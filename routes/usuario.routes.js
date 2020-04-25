const express = require('express');
const router = express.Router();

const usuario = require('../controllers/usuario.controller');

router.get('/', usuario.getAllUsuario);
router.post('/', usuario.createUsuario);
router.get('/:id', usuario.getByIdUsuario);
router.put('/:id', usuario.getUpdateUsuario);
router.delete('/:id', usuario.getDeleteUsuario);

router.post('/login', usuario.getLogin);

module.exports = router;
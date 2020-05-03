const express = require('express');
const router = express.Router();

const color = require('../controllers/color.controller');

router.get('/', color.getAllColor);
router.post('/', color.createColor);
router.get('/:id', color.getByIdColor);
router.put('/:id', color.putColor);
router.delete('/:id', color.deleteColor);

module.exports = router;
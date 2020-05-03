const express = require('express');
const router = express.Router();

const menu = require('../controllers/menu.controller');

router.get('/', menu.getAllMenu);
router.post('/', menu.createMenu);
router.get('/:id', menu.getByIdMenu);
router.put('/:id', menu.putMenu);
router.delete('/:id', menu.deleteMenu);

module.exports = router;
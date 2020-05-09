const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const modelo = require('../controllers/modelo.controller');

// const storage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//         callBack(null, path.join(__dirname, '../images/producto'));
//     },
//     filename: (req, file, callBack) => {
//         callBack(null, 'producto_' + Date.now() + path.extname(file.originalname));
//     }
// })

// var upload = multer({ storage });

router.get('/', modelo.getAllModelo);
router.get('/activos/', modelo.getActiveModelo);
router.post('/',  modelo.createModelo);
router.get('/:id', modelo.getByIdModelo);
router.put('/:id',  modelo.putModelo);
router.delete('/:id', modelo.deleteModelo);

module.exports = router;
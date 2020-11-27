const express =    require('express');
const router = express.Router();
const path =    require('path');
const productoController = require('../controllers/productoController');
var multer = require('multer'); // v1.0.5
var upload = multer({dest:path.join(__dirname,'../public/assets/temp')}); // for parsing multipart/form-data
router.get('/:tipoConsulta', productoController.findAll);
router.get('/findById/:id', productoController.findById);
router.post('/save',upload.single('image'),productoController.save);
//router.post('/update',productoController.update);
module.exports = router;
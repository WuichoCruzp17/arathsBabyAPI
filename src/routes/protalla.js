const express =    require('express');
const router = express.Router();
const protallaController = require('../controllers/protallaController');
router.get('/:tipoConsulta', protallaController.findAll);
router.post('/save',protallaController.save);
//router.post('/update',proveedorController.update);
module.exports = router;
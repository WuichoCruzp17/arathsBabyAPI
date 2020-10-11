const express =    require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');
router.get('/:tipoConsulta', proveedorController.findAll);
router.get('/findById/:id', proveedorController.findById);
router.post('/save',proveedorController.save);
router.post('/update',proveedorController.update);
router.post('/updateStatus',proveedorController.updateStatus);
module.exports = router;
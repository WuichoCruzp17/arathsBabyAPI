const express =    require('express');
const router = express.Router();
const tallaController = require('../controllers/tallaController');
router.get('/:tipoConsulta', tallaController.findAll);
/* router.get('/findById/:id', proveedorController.findById);
router.post('/save',proveedorController.save);
router.post('/update',proveedorController.update);
router.post('/updateStatus',proveedorController.updateStatus); */
module.exports = router;
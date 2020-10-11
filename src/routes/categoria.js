const express =    require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
router.get('/:tipoConsulta', categoriaController.findAll);
router.get('/findById/:id', categoriaController.findById);
router.post('/save',categoriaController.save);
router.post('/update',categoriaController.update);
router.post('/updateStatus',categoriaController.updateStatus);
module.exports = router;
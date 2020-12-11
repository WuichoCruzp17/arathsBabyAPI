const express =    require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
router.post('/save',clienteController.save);
router.post('/login',clienteController.login);
router.get('/:tipoConsulta', clienteController.findAll);
module.exports = router;
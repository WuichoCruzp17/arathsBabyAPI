const express =    require('express');
const router = express.Router();
const path =    require('path');
const pedidoController = require('../controllers/pedidoController');

router.get('/:tipoConsulta',pedidoController.findAll);

module.exports = router;
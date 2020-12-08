const express =    require('express');
const router = express.Router();
const path =    require('path');
const pedidoController = require('../controllers/pedidoController');
const pedidoDetalle = require('../models/pedidoDetalle');

router.get('/:tipoConsulta',pedidoController.findAll);
router.post('/save',pedidoController.save);
router.get('/folio/:folio',pedidoController.findByFolio);
module.exports = router;
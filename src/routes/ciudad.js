const express =    require('express');
const router = express.Router();
const ciudadController = require('../controllers/ciudadController');
router.get('/:tipoConsulta', ciudadController.findAll);
module.exports = router;
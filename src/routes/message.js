const express =    require('express');
const router = express.Router();
const messengerBotController = require('../controllers/messengerBotController');
router.get('/webhook',messengerBotController.verific);
router.post('/webhook',messengerBotController.event);
module.exports = router;
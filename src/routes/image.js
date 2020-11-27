const express =    require('express');
const router = express.Router();
const imgController = require('../controllers/imgController');
var multer = require('multer'); // v1.0.5
const path =    require('path');
var upload = multer({dest:path.join(__dirname,'../public/assets/temp')})
router.post('/save',upload.single('image'),imgController.save);
module.exports = router;
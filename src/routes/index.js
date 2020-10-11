const express =    require('express');
const router = express.Router();
router.get('/', function(req,res){
    res.send('Bienvenido al servicio');
});


module.exports = router;
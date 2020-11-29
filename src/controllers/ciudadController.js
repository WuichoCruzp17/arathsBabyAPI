const ciudadController = {};
const ciudad = require('../models/ciudad');

ciudadController.findAll  = async (req,res)=>{
    var tipoConsulta = null;
    var result =null;
    if(res == undefined){
        tipoConsulta=  req;
        result = await ciudad.findAll(undefined,tipoConsulta);
        return result;
    }else{
        tipoConsulta=  (parseInt(req.params.tipoConsulta) == 1)? true:false;
        result = await ciudad.findAll(undefined,tipoConsulta);
    if(result !=null){ 
        res.status(200).json({errorMessage:'',ciudadades:result});
    }else{
        res.status(500).json({errorMessage:'Error en el srvidor'});
    }
    }
    
    
};

module.exports = ciudadController;
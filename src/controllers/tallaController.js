const talla = require('../models/talla');
const tallaController ={};


tallaController.findAll = async(req,res)=>{
    const tipoConsulta =  ((parseInt(req.params.tipoConsulta) == 1))? true:false;
    var result = await talla.findAll(undefined,tipoConsulta);
    if(result !=null){ 
        res.status(200).json({errorMessage:'',tallas:result});
    }else{
        res.status(500).json({errorMessage:'Error en el srvidor'});
    }
}

module.exports = tallaController;
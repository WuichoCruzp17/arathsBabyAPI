const pedidoController = {};
const pedido = require('../models/pedido');
const ciudadController = require('../controllers/ciudadController');
const ciudad = require('../models/ciudad');
pedidoController.findAll = async(req,res)=>{
    const tipoConsulta =  (parseInt(req.params.tipoConsulta) == 1)? true:false;
    var result = await pedido.findAll(undefined,tipoConsulta);
    if(result !=null){ 
        const ciudades = await ciudadController.findAll(1);
        if(ciudades!=null){
            for(var i =0;i<result.length;i++){
                for(var y =0; y<ciudades.length;y++){
                    if(result[i].ciudadId == ciudades[y].ciudadId){
                        result[i].ciudad =ciudades[y].nombre; 
                    }
                }
            }
        }
        res.status(200).json({errorMessage:'',pedidos:result});
    }else{
        res.status(500).json({errorMessage:'Error en el srvidor'});
    }
};

module.exports = pedidoController;
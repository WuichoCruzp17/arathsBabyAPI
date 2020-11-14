const protalla = require('../models/protalla');
const util = require('../lib/util');
const codeBss =  require('../resources/codeBss');
const productoController = require('./productoController');
const protallaController = {};

protallaController.save =async (req, res)=>{

    const body  = req.body;
    console.log(body);
    body.protallaId = (body.protallaId !='') ? parseInt(body.protallaId):null;

    const rows =await protalla.save(null,[
        body.protallaId,
        body.productoId,
        body.tallaId,
        body.cantidad,
        body.estatusId,
        codeBss.NOELIMINADO,
        body.usuarioCreacionId,
        util.getDateNowFormat(),
        body.usuarioModificoId,
        util.getDateNowFormat()
    ]);
    if(rows != null){
        res.status(200).json({errorMessage:'',categorias:{}});
    }else{
        res.status(500).json({errorMessage:'Error en el srvidor'});
    }

};

protallaController.saveAll = async(productoTallas, productoId, usuario)=>{
    var isSave =0;
    for(var i =0; i<productoTallas.length;i++){
        productoTallas.protallaId = null;

        var rows =await protalla.save(null,[
            productoTallas[i].protallaId,
            productoId,
            parseInt(productoTallas[i].tallaId),
            productoTallas[i].descripcion,
            parseInt(productoTallas[i].cantidad),
            codeBss.INACTIVO,
            codeBss.NOELIMINADO,
            usuario,
            util.getDateNowFormat(),
            usuario,
            util.getDateNowFormat()
        ]);
        if(rows != null){
            isSave ++;
        }
    }
    return isSave;
};

protallaController.findAll = async(req,res)=>{
    const tipoConsulta =  ((parseInt(req.params.tipoConsulta) == 1))? true:false;
    var result = await protalla.findAll(undefined,tipoConsulta);
    if(result !=null){ 
        res.status(200).json({errorMessage:'',proTallas:result});
    }else{
        res.status(500).json({errorMessage:'Error en el srvidor'});
    }
}

module.exports = protallaController;
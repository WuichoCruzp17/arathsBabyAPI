const protalla = require('../models/protalla');
const util = require('../lib/util');
const codeBss =  require('../resources/codeBss');
const protallaController = {};

protallaController.save =(req, res)=>{

    const body  = req.body;
    console.log(body);
    body.protallaId = (body.protallaId !='') ? parseInt(body.protallaId):null;

    const rows = protalla.save(null,[
        body.protallaId,
        body.productoId,
        body.talla,
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

module.exports = protallaController;
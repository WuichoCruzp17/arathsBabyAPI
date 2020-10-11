const proveedor = require('../models/proveedor');
const util = require('../lib/util');
const codeBss =  require('../resources/codeBss');
const provedor = require('../models/proveedor');

const proveedorController = {};

proveedorController.save = async (req,res)=>{

    const body  = req.body;
    body.provedorId = (body.provedorId !='') ? parseInt(body.provedorId):null;

    const rows = await proveedor.save(null,[
        body.proveedorId,
        body.nombre,
        body.rfc,
        body.razonSocial,
        body.telefono,
        body.correo,
        body.celular,
        codeBss.ACTIVO,
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

proveedorController.update = async (req,res)=>{
    console.log(req.body);
    const {proveedorId,nombre,rfc,razonSocial,telefono,correo,celular,usuarioModificoId} = req.body;
    const result = await provedor.update({
        columns:{
            nombre:{column:provedor.getNameColumn('nombre'),value:nombre},
            rfc:{column:provedor.getNameColumn('rfc'),value:rfc},
            razonSocial:{column:provedor.getNameColumn('razonSocial'),value:razonSocial},
            telefono:{column:provedor.getNameColumn('telefono'),value:telefono},
            correo:{column:provedor.getNameColumn('correo'),value:correo},
            celular:{column:provedor.getNameColumn('celular'),value:celular},
            usuarioModificoId:{column:provedor.getNameColumn('usuarioModificoId'), value:usuarioModificoId},
            fechaModifico:{column:provedor.getNameColumn('fechaModifico'),value:util.getDateNowFormat()}

        }
    },{column:provedor.getNameColumn('proveedorId'),value:proveedorId});
    if(result !=null){ 
        res.status(200).json({errorMessage:'',proveedores:result});
    }else{
        res.status(500).json({errorMessage:'Error en el srvidor'});
    }
};

proveedorController.updateStatus = async (req, res)=>{

    const {proveedorId,estatusId,usuarioModificoId} = req.body;
    console.log(req.body);
    const rows = await proveedor.update({
        columns:{
            estatusId:{column:proveedor.getNameColumn('estatusId'), value:estatusId},
            usuarioModificoId:{column:proveedor.getNameColumn('usuarioModificoId'), value:usuarioModificoId},
            fechaModifico:{column:proveedor.getNameColumn('fechaModifico'),value:util.getDateNowFormat()}
        } 
    },{column:proveedor.getNameColumn('proveedorId'), value:proveedorId});
    const successful = (rows !== null) ? true :false;
    res.status(200).json({status:200,successful});
};

proveedorController.findById = async(req,res)=>{

    var result  = await proveedor.findById(req.params.id);

    if(result != null){
        res.status(200).json({errorMessage:'',proveedor:result});
    }else{
        res.status(500).json({errorMessage:'Error en el servidor'});
    }
};

proveedorController.findAll  = async (req,res)=>{
    const tipoConsulta =  ((parseInt(req.params.tipoConsulta) == 1))? true:false;
    var result = await proveedor.findAll(undefined,tipoConsulta);
    if(result !=null){ 
        res.status(200).json({errorMessage:'',proveedores:result});
    }else{
        res.status(500).json({errorMessage:'Error en el srvidor'});
    }
};


module.exports = proveedorController;
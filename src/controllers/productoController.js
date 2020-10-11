const util = require('../lib/util');
const producto = require('../models/producto');
const codeBss =  require('../resources/codeBss');
const imgController = require('../controllers/imgController');
const productoController ={};

productoController.save = async(req,res)=>{
    const body = await req.body;
    var rows =null;
    var errorMessage ="";
    body.productoId =null;
    const result =  await imgController.save(body);
    console.log(result);
    if(result.isSave){
       rows = await producto.save(null,[
            body.productoId,
            body.nombre,
            body.descripcion,
            body.precio,
            result.nombreImg,
            body.cantidad,
            body.categoriaId,
            body.proveedorId,
            (body.descontinuado)?1:0,
            codeBss.INACTIVO,
            body.usuarioCreacionId,
            util.getDateNowFormat(),
            body.usuarioModificoId,
            util.getDateNowFormat()
        ]);
    }else{
        errorMessage="Error al guardar la imagen";
    }
    
    if(rows != null){
        res.status(200).json({errorMessage:'',categorias:{}});
    }else{
        res.status(500).json({errorMessage});
    }
};

module.exports = productoController;
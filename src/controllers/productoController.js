const util = require('../lib/util');
const producto = require('../models/producto');
const codeBss =  require('../resources/codeBss');
const imgController = require('../controllers/imgController');
const protallaController= require('../controllers/protallaController');
const productoController ={};

productoController.save = async(req,res)=>{
    console.log("Keys----"+Object.keys(req.body));
    const body = req.body;
    //const body = JSON.parse(Object.keys(req.body)[0]);
    var rows =null;
    var errorMessage ="";
    body.productoId =null;
    console.log("Incia proceso de guardado de producto"+ body);
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
           
    if(rows != null){
        if(body.productosTalla.length>0){
            const idMAX = await producto.select(`MAX(${producto.columns.productoId.column}) as ${producto.columns.productoId.column}`);
           
            if(idMAX != null){
                const productoId =  idMAX[0].producto_id;
                const result = await protallaController.saveAll(body.productosTalla,productoId,body.usuarioCreacionId);
                if(result !=null){
                    res.status(200).json({errorMessage:'',categorias:{},productoId:productoId});
                }
            }else{
                res.status(500).json({errorMessage:'Error en el srvidor'});
            }
        } 
    }else{
        res.status(500).json({errorMessage:"Error al guardar el producto"});
    }

    
    }else{
        res.status(500).json({errorMessage:"Error al guardar la imagen"});
    }
 
};

module.exports = productoController;
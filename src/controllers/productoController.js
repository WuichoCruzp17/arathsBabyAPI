const util = require('../lib/util');
const producto = require('../models/producto');
const codeBss =  require('../resources/codeBss');
const imgController = require('../controllers/imgController');
const protallaController= require('../controllers/protallaController');
const productoController ={};

productoController.save = async(req,res)=>{
    console.log("Keys----"+Object.keys(req.body));
    console.log("Keys----"+Object.keys(req.body)[4]);
    console.log("Keys----"+Object.keys(req.body['upload']));
    console.log("Keys----"+req.body['upload']['path']);
    console.log("Keys----"+req.body.upload);
    
    //const body = req.body;
   // const body = JSON.parse(req.body);
    var body ={};
    body.productoId =req.body["productoId"];
    body.nombre =req.body["nombre"];
    body.descripcion =req.body["descripcion"];
    body.precio =req.body["precio"];
    body.cantidad =req.body["cantidad"];
    body.categoriaId =req.body["categoriaId"];
    body.proveedorId =req.body["proveedorId"];
    body.descontinuado =req.body["descontinuado"];
    body.usuarioCreacionId =req.body["usuarioCreacionId"];
    body.usuarioModificoId =req.body["usuarioModificoId"];
    body.productosTalla =req.body["productosTalla"];
    body.upload =req.body["upload"];
   // console.log(body)
    var rows =null;
    var errorMessage ="";
    body.productoId =null;
    console.log("Incia proceso de guardado de producto"+ body);
    //body.upload.path = atob(body.upload.path)
    const result =  await imgController.save(body);
    console.log("IMG-->"+result);
    if(result.isSave){
       rows = await producto.save(null,[
            body.productoId,
            body.nombre,
            body.descripcion,
            body.precio,
           result.nombreImg,
            //body.upload,
            body.cantidad,
            body.categoriaId,
            body.proveedorId,
            (body.descontinuado==true)?1:0,
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

productoController.findById = async(req,res)=>{

    var result  = await producto.findById(req.params.id);

    if(result != null){
        const tallas = await protallaController.findByProperty('productoId',result.productoId);
        console.log(tallas);
        result.tallas = tallas;
        res.status(200).json({errorMessage:'',producto:result, tallas});
    }else{
        res.status(500).json({errorMessage:'Error en el servidor'});
    }
};

productoController.findAll  = async (req,res)=>{
    const tipoConsulta =  (parseInt(req.params.tipoConsulta) == 1)? true:false;
    var result = await producto.findAll(undefined,tipoConsulta);
    if(result !=null){ 
        res.status(200).json({errorMessage:'',productos:result});
    }else{
        res.status(500).json({errorMessage:'Error en el srvidor'});
    }
};

productoController.findByProperty= async(req, res)=>{
    var result =null;
    if(typeof req =="string"){
        //req = property y res = valor
        result =  await producto.findByProperty(req,res);
        if(result != null){
            return result;
        }else{
            return [];
        }
    }else{
        result = await producto.findByProperty(req.params.property, req.params.value);
        if(result != null){
            res.status(200).json({errorMessage:'',productos:result});
        }else{
            res.status(500).json({errorMessage:'Error en el srvidor'});
        }
    }

}

module.exports = productoController;
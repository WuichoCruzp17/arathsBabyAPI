const pedidoController = {};
const pedido = require('../models/pedido');
const ciudadController = require('./ciudadController');
const pedidoDetalleController = require('../controllers/pedidoDetalleController');
const codes = require('../resources/codeBss');
const util = require('../lib/util');

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

pedidoController.save = async(req,res)=>{

    const body  = req.body;
    try{
        console.log("Pedido en curso ---->"+JSON.parse(Object.keys(req.body)[0]));
    }catch(e){
        console.log(e);
    }
   
    body.pedidoId =null;
    body.folioPago ="";
    //body.pedidoId = (body.pedidoId !='') ? parseInt(body.pedidoId):null;
    const folio = new Date().getFullYear() +""+ new Date().getMonth()+""+new Date().getDate()+""+new Date().getMinutes();
    const rows = await pedido.save(null,[
        body.pedidoId,
        folio,
        body.nombre,
        body.ciudadId,
        body.direeccion,
        body.numExt,
        body.numInt,
        body.codigoPostal,
        body.correo,
        body.descripcionCasa,
        body.folioPago,
        body.paqueteriaId,
        body.costoEnvio,
        codes.ACTIVO,
        util.getDateNowFormat(),
        util.getDateNowFormat(),
    ]);

    if(rows != null){
        const idMAX = await pedido.select(`MAX(${pedido.columns.pedidoId.column}) as ${pedido.columns.pedidoId.column}`);
        var pedidoId=null;

             pedidoId = idMAX[0].pedido_id;

        console.log("Id del pedido"+pedidoId);
        const pedidoDetalle = body.productos;
        var isSave = null;
        var total =0;
        for(var i=0;i<pedidoDetalle.length;i++){
            pedidoDetalle[i].pedidoId =pedidoId;
            isSave = await pedidoDetalleController.save(pedidoDetalle[i]);
            if(isSave != null){
                total++;
            }
        }
        console.log("Id del pedido"+pedidoId);
        console.log("Nuevo pedido agregado --> "+folio)
        res.status(200).json({errorMessage:'',folio:folio});
    }else{
        res.status(500).json({errorMessage:'Error en el srvidor'});
    }

};

pedidoController.updateEstatus = async(req,res)=>{
    const {pedidoId,folio,estatusId} = req.body;
    const result = await pedido.update({
        columns:{
            folio:{column:pedido.getNameColumn('folio'),value:folio},
            estatusId:{column:pedido.getNameColumn('estatusId'),value:estatusId},
            fechaModifico:{column:pedido.getNameColumn('fechaModifico'),value:util.getDateNowFormat()}
        }
    },{column:pedido.getNameColumn('pedidoId'),value:pedidoId});
    if(result !=null){ 
        res.status(200).json({errorMessage:'',proveedores:result});
    }else{
        res.status(500).json({errorMessage:'Error en el srvidor'});
    }
};

pedidoController.findByProperty =async(property,value)=>{

    return  await pedido.findByProperty(property,value);
}

pedidoController.findByFolio =async(req,res)=>{
    const pedidos = await pedidoController.findByProperty('folio',req.params.folio);
    if(pedidos!=null){
        const pedidoDetalle = await   pedidoDetalleController.executeString(`
        SELECT 
	        pe.pedetalle_id as 	pedetalleId,
            pe.product_Id as productoId,
            pe.cantidad,
            pe.precio,
            pe.estatus_id as estatusId,
            p.nombre,
            p.descripcion,
            pro.protalla_id as protallaId,
            pro.descripcion as descripcionProductoTalla,
            t.talla_id as tallaId,
            t.nombre as nombreTalla,
            t.descripcion as descripcionTalla
        FROM PEDDETALLE pe inner join PRODUCTO p  on pe.product_id = p.producto_id    
             left outer join  PROTALLA pro on   pe.proTallaId = pro.protalla_id 
             left outer join TALLA t on pro.talla_id  = t.talla_id
             WHERE pe.pedido_id =?
        `,[pedidos[0].pedidoId]);
        if(pedidoDetalle!=null){
            res.status(200).json({errorMessage:'',pedido:pedidos,pedidoDetalle:pedidoDetalle});
        }else{
            res.status(500).json({errorMessage:'Error en el srvidor'});
        }
    }

   
};


module.exports = pedidoController;
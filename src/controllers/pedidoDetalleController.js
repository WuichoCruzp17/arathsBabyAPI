const pedidoDetalle = require('../models/pedidoDetalle');
const codes = require('../resources/codeBss');
const pedidoDetalleController ={};

pedidoDetalleController.save = async(model)=>{
    console.log(model)
    const rows = await pedidoDetalle.save(null,[
        null,
        model.pedidoId,
        model.productoId,
        model.cantidad,
        model.precio,
        model.proTallaId,
        codes.ACTIVO
    ]);
    return rows;
};


pedidoDetalleController.findByProperty =async(property,value)=>{

    return  await pedidoDetalle.findByProperty(property,value);
}

pedidoDetalleController.executeString = async(sql,params)=>{
    return await pedidoDetalle.executeQuery(sql,params);
};

module.exports = pedidoDetalleController;

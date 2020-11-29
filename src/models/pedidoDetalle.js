const helpers = require('../lib/helpers');
let pedidoDetalle ={};

pedidoDetalle.table ={name:'PEDDETALLE'}

pedidoDetalle.columns={
    peDetalleId:{
        column:'pedetalle_id',
        primarykey:true
    },
    pedidoId:{
        column:'pedido_id'
    },
    ciudadId:{
        column:'ciudad_id'
    },
    productId:{
        column:'product_id'
    },
    cantidad:{
        column:'cantidad'
    },
    precio:{
        column:'precio'
    },
    estatus_id:{
        column:'estatus_id'
    }
}

pedidoDetalle = helpers.setFunctionsModels(pedidoDetalle);

module.exports = pedidoDetalle;


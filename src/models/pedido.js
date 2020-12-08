const helpers = require('../lib/helpers');
let pedido ={};

pedido.table ={name:'PEDIDO'}

pedido.columns={
    pedidoId:{
        column:'pedido_id',
        primarykey:true
    },
    folio:{
        column:'folio'
    },
    nombre:{
        column:'nombre'
    },
    ciudadId:{
        column:'ciudad_id'
    },
    direccion:{
        column:'direccion'
    },
    numExt:{
        column:'num_ext'
    },
    numInt:{
        column:'num_int'
    },
    codigoPostal:{
        column:'codigo_postal'
    },
    correo:{
        column:'correo'
    },
    descripcionCasa:{
        column:'descripcion_casa'
    },
    folioPago:{
        column:'folio_pago'
    },
    paqueteriaId:{
        column:'paqueteria_id'
    },
    costoEnvio:{
        column:'costo_envio'
    },
    estatusId:{
        column:'estatus_id'
    },
    fechaCreacion:{
        column:'fecha_creacion'
    },
    fechaModifico:{
        column:'fecha_modifico'
    }
}

pedido = helpers.setFunctionsModels(pedido);

module.exports = pedido;


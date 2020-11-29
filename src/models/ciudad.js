const helpers = require('../lib/helpers');
let ciudad ={};

ciudad.table ={name:'CIUDAD'}

ciudad.columns={
    ciudadId:{
        column:'ciudad_id',
        primarykey:true
    },
    nombre:{
        column:'nombre'
    },
    pagoEnvio:{
        column:'pago_envio'
    },
    estatusId:{
        column:'estatus_id'
    },
    usuarioCreacionId:{
        column:'usuario_creacion_id'
    },
    fechaCreacion:{
        column:'fecha_creacion'
    },
    usuarioModificoId:{
        column:'usuario_modifico_Id'
    },
    fechaModifico:{
        column:'fecha_modifico'
    }
}

ciudad = helpers.setFunctionsModels(ciudad);

module.exports = ciudad;


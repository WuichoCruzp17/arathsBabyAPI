const helpers = require('../lib/helpers');
let cliente ={};

cliente.table ={name:'CLIENTE'}

cliente.columns={
    clienteId:{
        column:'cliente_id',
        primarykey:true
    },
    nombre:{
        column:'nombre'
    },
    correo:{
        column:'correo'
    },
    password:{
        column:'password'
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

cliente = helpers.setFunctionsModels(cliente);

module.exports = cliente;


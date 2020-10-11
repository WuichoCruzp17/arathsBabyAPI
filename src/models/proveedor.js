
const helpers = require('../lib/helpers');
let provedor ={};

provedor.table= {name:'PROVEEDOR'}

provedor.columns ={
    proveedorId:{
        column:'proveedor_id',
        primarykey:true
    },
    nombre:{
        column:'nombre'
    },
    rfc:{
        column:'rfc'
    },
    razonSocial:{
        column:'razonSocial'
    },
    telefono:{
        column:'telefono'
    },
    correo:{
        column:'correo'
    },
    celular:{
        column:'celular'
    },
    estatusId:{
        column:'estatus_id'
    },
    eliminadoId:{
        column:'eliminado_id'
    },
    usuarioCreacionId:{
        column:'usuario_creacion_id'
    },
    fechaCracion:{
        column:'fecha_creacion'
    },
    usuarioModificoId:{
        column:'usuario_modifico_Id'
    },
    fechaModifico:{
        column:'fecha_modifico'
    }
};

provedor = helpers.setFunctionsModels(provedor);

module.exports = provedor;
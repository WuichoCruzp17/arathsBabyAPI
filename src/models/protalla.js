
const helpers = require('../lib/helpers');
let protalla ={};

protalla.table= {name:'PROTALLA'}

protalla.columns ={
    protallaId:{
        column:'protalla_id',
        primarykey:true
    },
    productoId:{
        column:'producto_id'
    },
    talla:{
        column:'talla'
    },
    descripcion:{
        column:'descripcion'
    },
    cantidad:{
        column:'cantidad'
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

protalla = helpers.setFunctionsModels(protalla);

module.exports = protalla;
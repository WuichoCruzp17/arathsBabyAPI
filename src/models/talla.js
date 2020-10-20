
const helpers = require('../lib/helpers');
let talla ={};

talla.table= {name:'TALLA'}

talla.columns ={
    tallaId:{
        column:'talla_id',
        primarykey:true
    },
    nombre:{
        column:'nombre'
    },
    descripcion:{
        column:'descripcion'
    },
    estatusId:{
        column:'estatus_id'
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

talla = helpers.setFunctionsModels(talla);

module.exports = talla;
const helpers = require('../lib/helpers');
let categoria ={};

categoria.table= {name:'CATEGORIA'}

categoria.columns ={
    categoriaId:{
        column:'categoria_id',
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

categoria = helpers.setFunctionsModels(categoria);

module.exports = categoria;
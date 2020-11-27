const helpers = require('../lib/helpers');
let producto ={};

producto.table= {name:'PRODUCTO'}

producto.columns ={
    productoId:{
        column:'producto_id',
        primarykey:true
    },
    nombre:{
        column:'nombre'
    },
    descripcion:{
        column:'descripcion'
    },
    precio:{
        column:'precio'
    },
    upload:{
        column:'upload'
    },
    cantidad:{
        column:'cantidad'
    },
    categoriaId:{
        column:'categoria_id'
    },
    proveedorId:{
        column:'proveedor_id'
    },
    descontinuado:{
        column:'descontinuado'
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
};

producto = helpers.setFunctionsModels(producto);

module.exports = producto;
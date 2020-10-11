const categoria = require('../models/categoria');
const util  = require('../lib/util');
const codeBss =  require('../resources/codeBss');
const categoriaController = {};

categoriaController.save = async(req,res)=>{
   const body = req.body;
   body.categoriaId = null;
   const row = await categoria.save(null,[

      body.categoriaId,body.nombre,body.descripcion,codeBss.ACTIVO,codeBss.NOELIMINADO,body.usuarioCreacionId,util.getDateNowFormat(),body.usuarioModificoId,util.getDateNowFormat()
   ]);
   if(row != null){
      res.status(200).json({errorMessage:'',success:true});
  }else{
      res.status(500).json({errorMessage:'Error en el srvidor'});
   }

}

categoriaController.update  = async(req,res)=>{
   console.log(req.body);
   const {categoriaId,nombre,descripcion,usuarioModificoId} = req.body;
   const rows = await categoria.update({
      columns:{
         nombre:{column:categoria.getNameColumn('nombre'), value:nombre},
         descripcion:{column:categoria.getNameColumn('descripcion'),value:descripcion},
         usuarioModificoId:{column:categoria.getNameColumn('usuarioModificoId'),value:usuarioModificoId},
         fechaModifico:{column:categoria.getNameColumn('fechaModifico'),value:util.getDateNowFormat()}
      }
   },{column:categoria.getNameColumn('categoriaId'),value:categoriaId});

   if(rows != null){
      res.status(200).json({errorMessage:'',success:'OK'});
  }else{
      res.status(500).json({errorMessage:'Error en el srvidor'});
   }
};

categoriaController.updateStatus = async (req, res)=>{

   const {categoriaId,estatusId,usuarioModificoId} = req.body;
   console.log(req.body);
   const rows = await categoria.update({
       columns:{
           estatusId:{column:categoria.getNameColumn('estatusId'), value:estatusId},
           usuarioModificoId:{column:categoria.getNameColumn('usuarioModificoId'), value:usuarioModificoId},
           fechaModifico:{column:categoria.getNameColumn('fechaModifico'),value:util.getDateNowFormat()}
       } 
   },{column:categoria.getNameColumn('categoriaId'), value:categoriaId});
   const successful = (rows !== null) ? true :false;
   res.status(200).json({status:200,successful});
};

categoriaController.findById = async(req, res)=>{
   var result  = await categoria.findById(req.params.id);

   if(result != null){
       res.status(200).json({errorMessage:'',categoria:result});
   }else{
       res.status(500).json({errorMessage:'Error en el servidor'});
   }
};
categoriaController.findAll = async(req, res)=>{
  const tipoConsulta =  ((parseInt(req.params.tipoConsulta) == 1))? true:false;
   var categorias = await  categoria.findAll(undefined,tipoConsulta);
   res.status(200).json({errorMessage:'',categorias:(categorias !=null)?categorias:null});
};

module.exports = categoriaController;
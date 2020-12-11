const cliente = require('../models/cliente');
const helpers = require('../lib/helpers');
const codes =require('../resources/codeBss');
const util = require('../lib/util');
const clienteController ={};

clienteController.save = async(req,res)=>{

    const body  = req.body;
    body.password = await helpers.encryptPassword(body.password);
    try{
        console.log("Pedido en curso ---->"+JSON.parse(Object.keys(req.body)[0]));
    }catch(e){
        console.log(e);
    }
   const isNotEmailRegister =await cliente.findByProperty('correo',body.correo);
   if(isNotEmailRegister.length==0){
        body.pedidoId =null;
        body.folioPago ="";
        const clienteId = null;
        const row = await cliente.save(null,[
            clienteId,
            body.nombre,
            body.correo,
            body.password,
            codes.ACTIVO,
            util.getDateNowFormat(),
            util.getDateNowFormat(),
        ]);
    if(row != null){
        res.status(200).json({errorMessage:'',success:true});
    }else{
        res.status(500).json({errorMessage:'Error en el srvidor'});
     }
   }else{
    res.status(500).json({errorMessage:'El correo ya esta registrado'});
   }
    
}

clienteController.login = async(req,res)=>{

    const rows = await cliente.findByProperty('correo',req.body.correo);

    if(rows!=null){
        if(rows.length>0){
            console.log(rows)
            const clie = rows[0];
            console.log(req.body);
            const validPassword = await helpers.matchPassword(req.body.password, clie.password);
            if(validPassword){
                res.status(200).json({errorMessage:'',cliente:clie});
            }else{
                res.status(200).json({errorMessage:'"Error en el correo o contraseña"',cliente:null,});
            }
        }else{
            res.status(200).json({errorMessage:'El correo no esta registrado',cliente:null});
        }
        
    }else{
        res.status(500).json({errorMessage:'Error en el srvidor'});
    }

};

clienteController.findAll  = async (req,res)=>{
    const tipoConsulta =  (parseInt(req.params.tipoConsulta) == 1)? true:false;
    var result = await cliente.findAll(undefined,tipoConsulta);
    if(result !=null){ 
        res.status(200).json({errorMessage:'',clientes:result});
    }else{
        res.status(500).json({errorMessage:'Error en el srvidor'});
    }
};

clienteController.findByProperty= async(req, res)=>{
    var result =null;
    if(typeof req =="string"){
        //req = property y res = valor
        result =  await cliente.findByProperty(req,res);
        if(result != null){
            return result;
        }else{
            return [];
        }
    }else{
        result = await cliente.findByProperty(req.params.property, req.params.value);
        if(result != null){
            res.status(200).json({errorMessage:'',productos:result});
        }else{
            res.status(500).json({errorMessage:'Error en el srvidor'});
        }
    }

}

module.exports = clienteController;
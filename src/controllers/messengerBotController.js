const messengerBotController ={};
const request  = require('request');
const keys = require('../keys');
messengerBotController.verific=(req,res)=>{

    //Verificar la coincidencia del token
    console.log(req.query["hub.verify_token"])
    if(req.query["hub.verify_token"]==keys.token){
        console.log("Logeo con exito");
        res.status(200).send(req.query["hub.challenge"]);
    }else{
        console.error("La verificación ha fallado");
        res.status(403).end();
    }

};

//Todos los eventos de mesenger seran apuntados por esta ruta

messengerBotController.event =(req,res)=>{
    console.log("Entro al evento del mensaje");
    console.log(req.body.entry[0].changes[0])
    //Verificar si el evento proviene de la pagina asociada
    if(req.body.object="page"){
        //Si existe multiples entradas entras
        const entry = req.body.entry;
        for(var i=0;i<entry.length;i++){
            for(var y=0;y<entry[i].changes.length;y++){
                if(entry[i].changes[y].field){
                    process_event(entry[i].changes[y]);
                    res.sendStatus(200);
                }
            }
        }
       
    }
}
//Función donde se procesan los eventos.
function process_event(event){
console.log("Proceso de envio de texto")
//Capturamos los datos del quegenera el evento y el mensaje 
var senderID = event.sender.id;
var message = event.message;
//Si en el evento existe un mensaje de tipo texto
console.log(event);
    if(message.text){
        var response ={
            "text":"Hola!!!!0"+message.text
        }
    }

    enviar_texto(senderID,response);
}
//Función donde el chat responda usando SenAPI
function enviar_texto(senderID,response){
    //Construcción del cuerpo del mensaje
    let request_body={
        "recipient":{
            "id":senderID
        },
        "message":response
    }

    request({
        "uri":"",
        "qs":{"access_token":keys.token},
        "method":"POST",
        "json":request_body
    },(err,res,body)=>{
        if(!err){
            console.log("Mensaje enviado");
        }else{
            console.log("No se pudo enviar el menaje:" +err);
        }
    });
}


module.exports = messengerBotController;
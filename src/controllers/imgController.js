const fs  = require('fs-extra');
const path = require('path');
const multer = require('multer');
const {promisify} = require('util');
const base64Img = require('base64-img');
/* const multer = require('multer');
const upload = multer({dest:path.join(__dirname,'../public/assets/temp')}).single('image'); */
const imgController =  {};
fs.writeFile =promisify(fs.writeFile);
fs.readFile = promisify(fs.readFile);
base64Img.img = promisify(base64Img.img);

imgController.save = async(img)=>{
    console.log(img)
    console.log("Incia Proceso de guardado de imagen")
    var base64Data = img.upload.path;
    var crypto = require('crypto'); 
    var imageTypeRegularExpression = /\/(.*?)$/; 
    var isSave = false;
    var nombreImg ="";
        var seed = crypto.randomBytes(20); 
        var uniqueSHA1String = crypto .createHash('sha1') 
                                    .update(seed) 
                                        .digest('hex');
    var uniqueRandomImageName = 'image-' + uniqueSHA1String;
    console.log(`Nombre de IMG ${uniqueRandomImageName}` );
    nombreImg = uniqueRandomImageName;
    var imageBuffer = decodeBase64Image(img.upload.path);
    //var imageTypeDetected = imageBuffer.type.match(imageTypeRegularExpression);
    nombreImg = uniqueRandomImageName;
    var dirr = __dirname.split('\controllers')[0];
    var dirrProduct =dirr + `public/assets/productos/`;
    console.log(dirr[0]);
    console.log(__dirname.split('\controllers'));

    try{
       const resultSav  = await  base64Img.img(base64Data,dirrProduct,nombreImg);
       console.log("IMG --->"+ resultSav);
       isSave = true;
    }catch(err){
        console.log("Error en Guardado de la IMG--->"+err);
    }
    
    console.log("Return");
    nombreImg=nombreImg+"."+img.upload.ext;
    return {isSave,nombreImg}; 
};  


function decodeBase64Image(dataString){
    var response ={};
    var isSave = false;
    var nombreImg = "";
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches.length !== 3) { 
        return {isSave,nombreImg}; 
    }
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    return response;
}


module.exports =  imgController;
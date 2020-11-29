const express =    require('express');
const morgan =    require('morgan');
const path =    require('path');
const flash=require('connect-flash');
const session =    require('express-session');
const bodyParser = require('body-parser');
const mysqlStore=    require('express-mysql-session');
const {database,errorpage} =    require('./keys');
const passport =    require('passport');
const multer = require('multer');

//Initizations
const app =    express();
//require('./lib/passport');
//Settings
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname,'views'));
//Middlewares -> Se ejecuta en cada peticion al servidor
app.use(session({
    secret:'fatzmysqlnodesession',
    resave:false,
    saveUninitialized:false,
    store: new mysqlStore(database)
}));
 //Guardar la imagen en la carpeta de temp
// app.use(multer({dest:path.join(__dirname,'../public/assets/temp')}).single('image'));
app.use(flash());//Enviar mensajes
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json({ limit: '5mb' }));
/**app.use(passport.initialize());
app.use(passport.session());**/
//Global Variables
app.use((req, res, next)=>{
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user    =req.user;
    next();
});
console.log("Muestro log");
//Routes
app.use('/',require('./routes/index'));
app.use('/arathsBaby/usuarios', require('./routes/usuario'));
app.use('/arathsBaby/categorias', require('./routes/categoria'));
app.use('/arathsBaby/proveedores', require('./routes/proveedor'));
app.use('/arathsBaby/productos', require('./routes/producto'));
app.use('/arathsBaby/tallas', require('./routes/talla'));
app.use('/arathsBaby/productos_tallas/', require('./routes/protalla'));
app.use('/arathsBaby/image/', require('./routes/image'));
app.use('/arathsBaby/pedidos/', require('./routes/pedido'));
app.use('/arathsBaby/ciudades/', require('./routes/ciudad'));


//Public
app.use(express.static(path.join(__dirname, 'public')));
//Startin server
app.listen(app.get('port'),()=>{
    console.log('Server on por', app.get('port'));
});
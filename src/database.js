const mysql =    require('mysql');
const {database} =    require('./keys');
const {promisify} = require('util');
//const configEnv = require('./lib/config');
const pool =mysql.createPool(database);
//const pool =mysql.createPool(configEnv.getConnection());
try{
    pool.getConnection((err, connection)=>{
        console.log("Entro a la conexion")
        if(err){
            if(err.code =='PROTOCOL_CONNECTION_LOST'){
                console.error('Database connection was closed');
            }
            if(err.code==='ER_CON_COUNT_ERROR'){
                console.error('Database has to many connections');
            }
            if(err.code ==='ECONNREFUSED'){
                console.error('Database connection was refused');
            }
            if(err.code ==='ER_ACCESS_DENIED_ERROR'){
                console.error("Acceso denegado");
            }
            if(err.code="ETIMEDOUT"){
                console.log("Error en a conexión")
            }
        }
        if(connection){
            connection.release();
            console.log('DB is Connected');
        }  
    });
}catch(err){
    console.log("Error de conexion-->"+err);
}

//Promisify Pool Query
pool.query =    promisify(pool.query);
module.exports = pool;
const mysql= require('mysql');
const {promisify}=require('util');
const {database}= require('./keys');

//peticiones a la db
const pool = mysql.createPool(database);

pool.getConnection((err,connection)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONEECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSE');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if (connection) connection.release();
    console.log('conectada');
    return;
});
pool.query=promisify(pool.query);
module.exports=pool;
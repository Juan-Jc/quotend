import mysql from "mysql2";
// Creo la conexion con la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err)=>{
    if(err) throw err;
    console.log('Conectado a la base de datos.');
});

export default db;
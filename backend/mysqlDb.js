import mysql from 'mysql2';

const database=mysql.createConnection({
    host:"localhost",
    user:"root",
    port:"3306",
    password:"tarn",
});

database.connect((err)=>{
    if(err) console.log(err);
    else console.log("connected");
})
export default database;
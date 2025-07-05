import express from 'express';
import first from './routers/regist.js';
import second from './routers/mess.js'
import { db } from './db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import database from './mysqlDb.js';

const app=express();
db();
// database;
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/registration',first);
app.use('/messageSend',second);

//working on error middleware
app.use((err, _, res,next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

app.listen(4000,()=>{
    console.log("port 4000");
})
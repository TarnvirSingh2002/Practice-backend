import express from 'express';
import first from './routers/regist.js';
import second from './routers/mess.js'
import { db } from './db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app=express();
db();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/registration',first);
app.use('/messageSend',second);
app.listen(4000,()=>{
    console.log("port 4000");
})
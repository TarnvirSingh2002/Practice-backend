import express from 'express';
import first from './routers/regist.js';
import { db } from './db.js';
import cors from 'cors';

const app=express();
db();
app.use(express.json());
app.use(cors());
app.use('/registration',first);
app.listen(4000,()=>{
    console.log("port 4000");
})
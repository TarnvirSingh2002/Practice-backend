import express from "express";
import { login, regist } from "../controller/registeration.js";
const routes=express.Router();

routes.post('/register',regist);
routes.post('/login',login);
export default routes;
import express from "express";
import { login, regist,refreshTokenUpdate } from "../controller/registeration.js";
const routes=express.Router();

routes.post('/register',regist);
routes.post('/login',login);
routes.post('/refresh-token',refreshTokenUpdate);
export default routes;
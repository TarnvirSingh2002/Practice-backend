import express from "express";
import { addMesage, getallmesssages } from "../controller/messages.js";
import { fetchUser } from "../middlewares/fetchUser.js";
const routes=express.Router();
routes.post('/addMess',fetchUser,addMesage);
routes.get('/getall',fetchUser,getallmesssages);
export default routes;
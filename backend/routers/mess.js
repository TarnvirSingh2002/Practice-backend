import express from "express";
import { addMesage, getallmesssages, updateMessage } from "../controller/messages.controller.js";
import { fetchUser } from "../middlewares/fetchUser.js";
const routes = express.Router();
routes.post('/addMess', fetchUser, addMesage);
routes.get('/getall', fetchUser, getallmesssages);
routes.patch('/update-message', fetchUser, updateMessage);
//patch is used when we just want to update a specific thing from thr document
export default routes;
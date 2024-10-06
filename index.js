import express from "express"
import { UserRouter } from "./controller/UserRouter.js";
import dotenv from 'dotenv';



const app=express();
dotenv.config();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/",UserRouter)
app.listen(PORT,()=>{
console.log(`sever is running oin port localhost: ${PORT}`)
})
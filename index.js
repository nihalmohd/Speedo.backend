import express from "express"
import { UserRouter } from "./controller/UserRouter.js";



const app=express();

const PORT=5000;
app.use(express.json());
app.use("/",UserRouter)
app.listen(PORT,()=>{
console.log(`sever is running oin port localhost: ${PORT}`)
})
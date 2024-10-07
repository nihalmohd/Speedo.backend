import express from "express";
import { userRouter } from "./controller/UserRouter.js"; 
import dotenv from 'dotenv';
import connectDB from "./models/config.js"; 
dotenv.config();

const app = express();
connectDB();

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.use("/", userRouter); 
app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});

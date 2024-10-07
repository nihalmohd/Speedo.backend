import express from "express";
import { userRouter } from "./controller/UserRouter.js"; 
import dotenv from 'dotenv';
import cors from "cors"; 
import connectDB from "./models/config.js"; 
dotenv.config();

const app = express();
const corsOptions = {
    origin: process.env.FRONTENDURL, 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
  };
  
  // Use CORS with options
  app.use(cors(corsOptions)); 
connectDB();

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.use("/", userRouter); 
app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});

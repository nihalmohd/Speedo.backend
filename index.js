import express from "express";
import { userRouter } from "./controller/UserRouter.js"; 
import dotenv from 'dotenv';
import cors from "cors"; 
import connectDB from "./models/config.js"; 

dotenv.config();

const app = express();


const corsOptions = {
    origin: process.env.FRONTENDURL,  
    methods: ['GET', 'POST'],  
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
};


app.use(cors(corsOptions)); 


connectDB();


app.use(express.json());


const PORT = process.env.PORT || 5000;

// Routes
app.use("/", userRouter); 

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});

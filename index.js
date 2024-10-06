import express from "express";
import { UserRouter } from "./controller/UserRouter.js"; 
import dotenv from "dotenv";
import connectDB from "./Model/config.js";

dotenv.config();

const app = express();
connectDB();


app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/", UserRouter); 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

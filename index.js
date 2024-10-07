import express from "express";
import { userRouter } from "./controller/UserRouter.js"; // Correct import for userRouter
import dotenv from 'dotenv';
import connectDB from "./models/config.js"; // Ensure this path is correct

dotenv.config();

const app = express();
connectDB();

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.use("/", userRouter); // Updated route to include '/user' for clarity
app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});

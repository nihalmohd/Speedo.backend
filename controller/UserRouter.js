import express from 'express';
import UserData from '../models/User.js';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.json({ message: "User endpoint reached" });
});

userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body; 

        const foundedUser = await UserData.findOne({ email });
        if (!foundedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        if(password = foundedUser.password){
          res.status(200).json({ message: "Login successful", user: foundedUser });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export { userRouter };

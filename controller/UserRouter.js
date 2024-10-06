import express from 'express';

const UserRouter = express.Router();

UserRouter.get('/', (req, res) => {
    res.json({ message: "User endpoint reached" });
});

export { UserRouter };

import express from "express"


export const UserRouter = express.Router();

UserRouter.get('/', (req, res) => {
  res.send('User home route');
});


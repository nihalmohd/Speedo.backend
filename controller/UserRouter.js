import express from 'express';
import UserData from '../models/User.js';
import MapData from '../models/MapcalculatedData.js';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.json({ message: "User endpoint reached" });
});

userRouter.post('/Login', async (req, res) => {
  try {
      const { email, password } = req.body;
      console.log(email, password);

      const foundedUser = await UserData.findOne({ email }); 
      console.log(foundedUser);

      if (!foundedUser) {
          return res.status(404).json({ message: "User not found" });
      }

      if (password === foundedUser.password) {  
          res.status(200).json({ message: "Login successful", user: foundedUser });
      } else {
          res.status(400).json({ message: "Invalid password" });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
});
userRouter.post('/mapdata', async (req, res) => {
  try {
    const { userId,tripName, totalDistanceTravelled, totalDuration, overSpeedDuration, overSpeedDistance, stoppedDuration } = req.body;

    console.log(userId,tripName, totalDistanceTravelled, totalDuration, overSpeedDuration, overSpeedDistance, stoppedDuration );
    
    const user = await UserData.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newMapData = new MapData({
      userId: user._id, 
      tripName, 
      totalDistanceTravelled,
      totalDuration,
      overSpeedDuration,
      overSpeedDistance,
      stoppedDuration
    });

    const savedMapData = await newMapData.save();

    res.status(201).json({
      message: "Map data saved successfully",
      mapData: savedMapData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

userRouter.get('/mapdata/:userId', async (req, res) => {
  try {
      const { userId } = req.params;

      // Find all map data for the given userId
      const mapData = await MapData.find({ userId });

      if (!mapData || mapData.length === 0) {
          return res.status(404).json({ message: 'No map data found for this user' });
      }

      res.status(200).json(mapData);
  } catch (error) {
      console.error('Error fetching map data:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

export { userRouter };

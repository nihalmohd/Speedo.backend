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
    const { userId, tripName, totalDistanceTravelled, totalDuration, overSpeedDuration, overSpeedDistance, stoppedDuration, locations } = req.body;

    console.log(userId, tripName, totalDistanceTravelled, totalDuration, overSpeedDuration, overSpeedDistance, stoppedDuration, locations);
    
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
      stoppedDuration,
      locations, 
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

userRouter.get('/gettrip/:id', async (req, res) => {
  console.log(req.params);

  try {
      const { id } = req.params;

      
      const trip = await MapData.findById(id);

      if (!trip) {
          return res.status(404).json({ message: 'Trip not found' });
      }

      
      res.status(200).json({ message: "Trip found successfully", trip });
  } catch (error) {
      console.error('Error fetching trip data:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});
userRouter.post('/getdocuments', async (req, res) => {
  try {
    const { ids } = req.body;

   
    const documents = await MapData.find({ _id: { $in: ids } });

    if (!documents || documents.length === 0) {
      return res.status(404).json({ message: 'No documents found for the provided IDs' });
    }

    res.status(200).json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

userRouter.delete('/deletedocuments', async (req, res) => {
  try {
    const { ids } = req.body; 
    console.log(ids,'this is ids showning');
    
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Invalid or missing IDs' });
    }

 
    const result = await MapData.deleteMany({ _id: { $in: ids } });

 
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No documents found for the provided IDs' });
    }

    res.status(200).json({ message: `${result.deletedCount} document(s) deleted successfully` });
  } catch (error) {
    console.error('Error deleting documents:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export { userRouter };

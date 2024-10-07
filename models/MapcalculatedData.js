import mongoose from 'mongoose';

const mapDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'User',  
    required: true,  
  },
  totalDistanceTravelled: {
    type: Number,
    required: true,  
  },
  totalDuration: {
    type: Number,
    required: true,  
  },
  overSpeedDuration: {
    type: Number,
    required: true,  
  },
  overSpeedDistance: {
    type: Number,
    required: true,  
  },
  stoppedDuration: {
    type: Number,
    required: true,  
  }
  
});

// Create a model from the schema
const MapData = mongoose.model('MapData', mapDataSchema);

export default MapData;

import mongoose from 'mongoose';

const mapDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'User',  
    required: true,  
  },
  tripName:{
    type:String,
    required:true
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

const MapData = mongoose.model('MapData', mapDataSchema);

export default MapData;

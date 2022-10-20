import mongoose from 'mongoose';

const tripSchema = mongoose.Schema(
    {
        uid: { type: String, required: true },
        uName: { type: String, required: true },
        uPhoto: { type: String, default: '' },
        stops: [],
    },
 
  { timestamps: true }
);

const Trip = mongoose.model('trips', tripSchema);

export default Trip;

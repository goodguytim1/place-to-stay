import Trip from '../models/Trip.js';
import tryCatch from './utils/tryCatch.js';

export const createTrip = tryCatch(async (req, res) => {
  const { id: uid, name: uName, photoURL: uPhoto } = req.user;
  console.log(req.body)
  const newTrip = new Trip({uid, uPhoto, uName, stops: [...req.body]});
  await newTrip.save();
  res.status(201).json({ success: true, result: newTrip });
});

export const getTrips = tryCatch(async (req, res) => {
  const trips = await Trip.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: trips});
});
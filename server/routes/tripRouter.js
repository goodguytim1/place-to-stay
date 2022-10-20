import { Router } from 'express';

import {
  createTrip,
  getTrips,
} from '../controllers/trip.js';
import auth from '../middleware/auth.js';
//import checkAccess from '../middleware/checkAccess.js';
//import roomPermissions from '../middleware/permissions/room/roomPermissions.js';

const tripRouter = Router();
tripRouter.post('/', auth, createTrip);
tripRouter.get('/', getTrips);
// roomRouter.delete(
//   '/:roomId',
//   auth,
//   //checkAccess(roomPermissions.delete),
//   deleteRoom
// );
// roomRouter.patch(
//   '/:roomId',
//   auth,
//   //checkAccess(roomPermissions.update),
//   updateRoom
// );
export default tripRouter;

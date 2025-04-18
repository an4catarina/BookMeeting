import { Router } from 'express';
import usersRoutes from './users.routes'
import roomsRoutes from './rooms.routes'
import reservationsRoutes from './reservations.routes'

const router = Router();

router.use('/users', usersRoutes);
router.use('/rooms', roomsRoutes);
router.use('/reservations', reservationsRoutes);

export default router;

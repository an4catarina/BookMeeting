import { Router } from 'express';
import { ReservationController } from '../controllers/reservations.controller';

const router = Router();

/**
 * @swagger
 * /api/reservations/create:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - room_id
 *               - title
 *               - start_time
 *               - end_time
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 3
 *               room_id:
 *                 type: integer
 *                 example: 2
 *               title:
 *                 type: string
 *                 example: Planning meeting
 *               description:
 *                 type: string
 *                 example: Meeting to define new goals
 *               start_time:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-04-20T09:00:00-03:00"
 *               end_time:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-04-20T10:30:00-03:00"
 *     responses:
 *       201:
 *         description:
*/
router.post('/create', ReservationController.create);

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Get all reservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description:
*/
router.get('/', ReservationController.getAll);

/**
 * @swagger
 * /api/reservations/reservation/{id}:
 *   get:
 *     summary: Get a reservation by ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Reservation ID
 *     responses:
 *       200:
 *         description:
 *
 */
router.get('/reservation/:id', ReservationController.getById);

/**
 * @swagger
 * /api/reservations/user/{userId}:
 *   get:
 *     summary: Get reservations by user ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       200:
 *         description:
 */
router.get('/user/:userId', ReservationController.getByUser);

/**
 * @swagger
 * /api/reservations/room/{roomId}:
 *   get:
 *     summary: Get reservations by room ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the room
 *     responses:
 *       200:
 *         description:
 */
router.get('/room/:roomId', ReservationController.getByRoom);

/**
 * @swagger
 * /api/reservations/reservation/{id}:
 *   patch:
 *     summary: Update a reservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Reservation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Planning meeting
 *               description:
 *                 type: string
 *                 example: Meeting to define new goals
 *               start_time:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-04-21T10:00:00-03:00"
 *               end_time:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-04-21T11:00:00-03:00"
 *     responses:
 *       200:
 *         description:
 */
router.patch('/reservation/:id', ReservationController.update);

/**
 * @swagger
 * /api/reservations/reservation/{id}:
 *   delete:
 *     summary: Delete a reservation by ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the reservation to delete
 *     responses:
 *       200:
 *         description: 
 */
router.delete('/reservation/:id', ReservationController.delete);

export default router;
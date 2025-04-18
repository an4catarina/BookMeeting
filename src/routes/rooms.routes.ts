import { Router } from 'express';
import { RoomController } from '../controllers/rooms.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Room's endpoints
 */

/**
 * @swagger
 * /api/rooms/create:
 *   post:
 *     summary: Create a room
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sala de Reunião 1
 *               capacity:
 *                 type: integer
 *                 example: 10
 *               location:
 *                 type: string
 *                 example: 2º Andar - Ala B
 *     responses:
 *       200:
 *         description:
 */
router.post('/create', RoomController.create);

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Get all rooms
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description:
 */
router.get('/', RoomController.getAllRooms);

/**
 * @swagger
 * /api/rooms/{id}:
 *   get:
 *     summary: Get a room by ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Room ID
 *     responses:
 *       200:
 *         description:
 */
router.get('/:id', RoomController.getRoomById);

/**
 * @swagger
 * /api/rooms/name/{name}:
 *   get:
 *     summary: Get a room by Name
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Room Name
 *     responses:
 *       200:
 *         description:
 */
router.get('/name/:name', RoomController.getRoomByName);

/**
 * @swagger
 * /api/rooms/id/{id}:
 *   patch:
 *     summary: Update a room
 *     tags: [Rooms]
 *     parameters:
 *       - in: path 
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               updates:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: Sala de Reunião 1
 *                   capacity:
 *                     type: integer
 *                     example: 10
 *                   location:
 *                     type: string
 *                     example: 2º Andar - Ala B
 *     responses:
 *       200:
 *         description:
 */
router.patch('/id/:id', RoomController.updateRoom);

/**
 * @swagger
 * /api/rooms/{id}:
 *   delete:
 *     summary: Delete a room by ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description:
 */
router.delete('/:id', RoomController.deleteRoom);

export default router;
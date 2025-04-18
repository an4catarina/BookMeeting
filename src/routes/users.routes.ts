import { Router } from 'express';
import { UserController } from '../controllers/users.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User's endpoints
 */

/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Create a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Juliana Carvalho"
 *               email:
 *                 type: string
 *                 example: "julianacarvalho@gmail.com"
 *     responses:
 *       201:
 *         description:
 */
router.post('/create', UserController.create);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description:
 */
router.get('/', UserController.getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description:
 */
router.get('/:id', UserController.getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update a user
 *     tags: [Users]
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
 *                     example: "Juliana Carvalho"
 *                   email:
 *                     type: string
 *                     example: "julianacarvalho@gmail.com"
 *     responses:
 *       200:
 *         description:
 */
router.patch('/:id', UserController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
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
router.delete('/:id', UserController.deleteUser);

export default router;

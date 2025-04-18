import { Request, Response } from 'express';
import { UserService } from '../services/users.service';
import { User } from '../types/users.types';

export class UserController {
  static async create(req: Request, res: Response) {
    try {
      const userData: User = req.body;
      const newUser = await UserService.createUser(userData);
      res.status(201).json(newUser);

    } catch (err) {
      const error = err as Error;
      res.status(400).json({ error: error.message });
    }
  }

  static async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const data = await UserService.getAllUsers()

      if (!data || data.length === 0) {
        res.status(404).json({ message: 'No user was found' });
        return;
      }

      res.json(data);
    } catch (err) {
      const error = err as Error;
      res.status(400).json({ error: error.message });
    }
  }

  static async getUserById(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      const user = await UserService.getUserById(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (err) {
      const error = err as Error;
      res.status(400).json({ error: error.message });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);

      const userExists = await UserService.getUserById(id);
      if (!userExists) {
        return res.status(404).json({ message: 'User not found'})
      }
      
      const updates = req.body.updates;
      const updatedUser = await UserService.updateUser(id, updates);

      res.status(200).json({
        message: 'User successfully updated',
        room: updatedUser});
    } catch (err) {
      const error = err as Error;
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      const deleted = await UserService.deleteUser(id);

      if (!deleted) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ message: 'User successfully deleted' });
    } catch (err) {
      const error = err as Error;
      res.status(400).json({ error: error.message });
    }
  }
}
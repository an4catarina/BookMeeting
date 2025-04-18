import { Request, Response } from 'express';
import { RoomService } from '../services/rooms.service';

export class RoomController {
  static async create(req: Request, res: Response) {
    try {
      const room = await RoomService.createRoom(req.body);
      res.status(201).json(room);
    } catch (err) {
      const error = err as Error;
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllRooms(req: Request, res: Response) {
    try {
      const data = await RoomService.getAllRooms()

      if (!data || data.length === 0) {
        res.status(404).json({ message: 'No room was found' });
        return;
      }

      res.status(200).json(data);
    } catch (err) {
      const error = err as Error;
      res.status(400).json({ error: error.message });
    }
  }

  static async getRoomById(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      const room = await RoomService.getRoomById(id);
      
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
      
      res.status(200).json(room);
    } catch (err) {
      const error = err as Error;
      res.status(400).json({ error: error.message });
    }
  }

  static async getRoomByName(req: Request, res: Response): Promise<any> {
    try {
      const name = req.params.name;
      const room = await RoomService.getRoomByName(name)

      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }

      res.status(200).json(room);
    } catch (err) {
      const error = err as Error;
      res.status(400).json({ error: error.message });
    }
  }

  static async updateRoom(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);

      const roomExists = await RoomService.getRoomById(id);
      if(!roomExists){
        return res.status(404).json({ message: 'Room not found'})
      }

      const updates = req.body.updates;
      const updatedRoom = await RoomService.updateRoom(id, updates);

      res.status(200).json({
        message: 'Room successfully updated',
        room: updatedRoom});
    } catch (err) {
      const error = err as Error;
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteRoom(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      const deletedRoom = await RoomService.deleteRoom(id);
  
      if (!deletedRoom) {
        return res.status(404).json({ message: 'Room not found' });
      }
  
      return res.status(200).json({ message: 'Room successfully deleted' });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
}

import { Request, Response } from 'express';
import { ReservationService } from '../services/reservations.service';
import { UserService } from '../services/users.service';
import { RoomService } from '../services/rooms.service';

export class ReservationController {
  static async create(req: Request, res: Response): Promise<any>  {
    try {
      const user_id = req.body.user_id;
      const user = await UserService.getUserById(user_id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const room_id = req.body.room_id;
      const room = await RoomService.getRoomById(room_id);
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }

      const reservation = await ReservationService.createReservation(req.body);
      res.status(201).json(reservation);
    } catch (err) {
      const error = err as Error;
      res.status(400).json({ error: error.message });
    }
  }

  static async getById(req: Request, res: Response): Promise<any>  {
    try {
      const id = parseInt(req.params.id);
      const reservation = await ReservationService.getReservationById(id);

      if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found' });
      }

      res.status(200).json(reservation);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const reservations = await ReservationService.getAllReservations();
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async getByUser(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.userId);
      const reservations = await ReservationService.getUserReservations(id);

      if (reservations.length === 0) {
        return res.status(404).json({ message: 'No reservations found for this user' });
      }

      res.status(200).json(reservations);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }  

  static async getByRoom(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.roomId);
      const reservations = await ReservationService.getRoomReservations(id);

      if (reservations.length === 0) {
        return res.status(404).json({ message: 'No reservations found for this room' });
      }

      res.status(200).json(reservations);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  static async update(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      const updated = await ReservationService.updateReservation(id, req.body);

      if (!updated) {
        return res.status(404).json({ message: 'Reservation not found' });
      }

      res.status(200).json(updated);
    } catch (err) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'message' in err &&
        (err as any).message === 'Reservation not found'
      ) {
        return res.status(404).json({ message: 'Reservation not found' });
      }

      res.status(400).json({ error: (err as Error).message });
    }
  }
  
  static async delete(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);  
      const deletedReservation = await ReservationService.deleteReservation(id);
      
      if (!deletedReservation){
        return res.status(404).json({ message: 'Reservation not found' });
      }
  
      return res.status(200).json({ message: 'Reservation successfully deleted' });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
}

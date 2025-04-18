import { supabase } from '../config/supabase';
import { Reservation } from '../types/reservation.types';

export class ReservationService {
  static async checkAvailability(
    room_id: number,
    start_time: string,
    end_time: string,
    exclude_id?: number
  ): Promise<boolean> {
    const start = new Date(start_time).toISOString();
    const end = new Date(end_time).toISOString();

    let query = supabase
      .from('reservations')
      .select()
      .eq('room_id', room_id)
      .lte('start_time', end)
      .gte('end_time', start);

    if (exclude_id) {
      query = query.neq('id', exclude_id);
    }

    const { data, error } = await query;

    if (error) throw new Error(error.message);
    return data.length === 0;
  }

  static async createReservation(reservationData: Reservation): Promise<Reservation> {
    const { start_time, end_time } = reservationData;
    const start = new Date(start_time).toISOString();
    const end = new Date(end_time).toISOString();

    const isAvailable = await this.checkAvailability(
      reservationData.room_id,
      start,
      end
    );

    if (!isAvailable) {
      throw new Error('Room is not available for the selected time slot');
    }

    const { data, error } = await supabase
      .from('reservations')
      .insert({
        ...reservationData,
        start_time: start,
        end_time: end,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new Error('Failed to create reservation');

    return data;
  }

  static async getReservationById(id: number) {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data;
  }

  static async getAllReservations(): Promise<Reservation[]> {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .order('start_time', { ascending: true });
  
    if (error) throw new Error(error.message);
    return data || [];
  }
  

  static async getUserReservations(user_id: number): Promise<Reservation[]> {
    const {data, error} = await supabase
      .from('reservations')
      .select('*')
      .eq('user_id', user_id)
      .order('start_time', { ascending: true });
    
    if (error) throw new Error(error.message);
    return data || [];
  }

  static async getRoomReservations(room_id: number): Promise<Reservation[]> {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('room_id', room_id)
      .order('start_time', { ascending: true });

    if (error) throw new Error(error.message);
    return data || [];
  }

  static async updateReservation(id: number, updateData: Partial<Reservation>): Promise<Reservation | null> {
    const currentReservation = await this.getReservationById(id);
  
    if (!currentReservation) {
      throw new Error('Reservation not found');
    }
  
    if (updateData.start_time || updateData.end_time) {
      const isAvailable = await this.checkAvailability(
        currentReservation.room_id,
        updateData.start_time || currentReservation.start_time,
        updateData.end_time || currentReservation.end_time,
        id
      );
  
      if (!isAvailable) {
        throw new Error('Room is not available for the new time slot');
      }
    }
  
    const { data, error } = await supabase
      .from('reservations')
      .update(updateData)
      .eq('id', id)
      .select();
  
    if (error) throw new Error(error.message);
    if (!data || data.length === 0) return null;
  
    return data[0];
  }
  

  static async deleteReservation(id: number): Promise<boolean> {
    const { error, count } = await supabase
      .from('reservations')
      .delete({ count: 'exact' })
      .eq('id', id);
  
    if (error){
      console.error('Error at deleting reservation:', error);
      return false;
    }
    return count !== null && count > 0;
  }
}
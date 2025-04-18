import { supabase } from '../config/supabase';
import { Room } from '../types/room.types';

export class RoomService {
  static async createRoom(roomData: Omit<Room, 'id' | 'created_at'>): Promise<Room> {
    const {data, error} = await supabase
      .from('rooms')
      .insert(roomData)
      .select();
    
    if (error) {
      console.error('Error at creating room:', error);
      throw new Error(error.message);
    }
      
    return data[0] as Room;
  }

  static async getAllRooms(): Promise<Room[]> {
    const {data, error} = await supabase
      .from('rooms')
      .select('*')
    
    if (error) throw new Error(error.message);
    return data
  }

  static async getRoomById(id: number): Promise<Room | null> {
    const {data, error} = await supabase
      .from('rooms')
      .select()
      .eq('id', id)
      .maybeSingle()
    
    if (error) throw new Error(error.message);
    return data as Room;
  }

  static async getRoomByName(name: string): Promise<Room | null> {
    const {data, error} = await supabase
      .from('rooms')
      .select()
      .eq('name', name)
      .maybeSingle()
    
    if (error) throw new Error(error.message);
    return data as Room;
  }

  static async updateRoom(id: number, updateData: Partial<Room>): Promise<Room | null> {
    const { data, error } = await supabase
      .from('rooms')
      .update(updateData)
      .eq('id', id)
      .select()

    if (error) throw new Error(error.message);
    return data[0] as Room;
  }

  static async deleteRoom(id: number): Promise<Boolean> {
    const {error, count} = await supabase
      .from('rooms')
      .delete({ count: 'exact' })
      .eq('id', id);

    if (error){
      console.error('Error at deleting room:', error);
      return false;
    }
    return count !== null && count > 0;
  }
}
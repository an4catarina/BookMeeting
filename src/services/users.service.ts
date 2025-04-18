import { supabase } from '../config/supabase';
import { User } from '../types/users.types';

export class UserService {
  static async createUser(userData: User): Promise<User> {
    const {data, error} = await supabase
      .from('users')
      .insert(userData)
      .select();

    if (error) throw new Error(error.message);
    return data[0] as User;
  }

  static async getAllUsers(): Promise<User[]> {
    const {data, error} = await supabase
      .from('users')
      .select('*')
    
    if (error) throw new Error(error.message);
    return data
  }

  static async getUserById(id: number): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('id', id)
      .maybeSingle()
    
    if (error) throw new Error(error.message);
    return data as User;
  }

  static async updateUser(id: number, updateData: Partial<User>): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select()

    if (error) throw new Error(error.message);
    return data[0] as User;
  }

  static async deleteUser(id: number): Promise<Boolean> {
    const {error, count} = await supabase
      .from('users')
      .delete({ count: 'exact' })
      .eq('id', id);

      if (error){
        console.error('Error at deleting user:', error);
        return false;
      }
    
      return count !== null && count > 0;
  }
}
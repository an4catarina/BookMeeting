export interface Reservation {
  id?: number;
  user_id: number;
  room_id: number;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  created_at?: Date;
}
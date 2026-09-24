export type BookingStatus = 'Pending' | 'Confirmed' | 'Cancelled';

export interface Booking {
  id: number;
  parentName: string;
  parentEmail: string;
  phone: string;
  childName: string;
  classId: number;
  bookingDate: string;
  status: BookingStatus;
}

import { Booking } from '../models/booking.model';

export const initialBookings: Booking[] = [
  {
    id: 1,
    parentName: 'Emily Carter',
    parentEmail: 'emily.carter@example.com',
    phone: '+1 555 410 3301',
    childName: 'Noah Carter',
    classId: 1,
    bookingDate: '2026-09-18',
    status: 'Confirmed'
  },
  {
    id: 2,
    parentName: 'Ahmed Hassan',
    parentEmail: 'ahmed.hassan@example.com',
    phone: '+20 100 555 2930',
    childName: 'Lina Hassan',
    classId: 2,
    bookingDate: '2026-09-20',
    status: 'Pending'
  },
  {
    id: 3,
    parentName: 'Rachel Green',
    parentEmail: 'rachel.green@example.com',
    phone: '+1 555 410 3303',
    childName: 'Mia Green',
    classId: 3,
    bookingDate: '2026-09-21',
    status: 'Cancelled'
  }
];

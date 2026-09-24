import { Injectable, signal } from '@angular/core';
import { initialBookings } from '../data/initial-bookings';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly bookingsSignal = signal<Booking[]>(initialBookings);
  readonly bookings = this.bookingsSignal.asReadonly();

  getBookings(): Booking[] { return this.bookings(); }
  getBookingById(id: number): Booking | undefined { return this.bookings().find(b => b.id === id); }
  addBooking(booking: Booking): void { this.bookingsSignal.update(b => [...b, booking]); }
  updateBooking(id: number, updatedBooking: Booking): void {
    this.bookingsSignal.update(b => b.map(item => item.id === id ? { ...updatedBooking, id } : item));
  }
  deleteBooking(id: number): void { this.bookingsSignal.update(b => b.filter(item => item.id !== id)); }
  getNextId(): number { return Math.max(0, ...this.bookings().map(b => b.id)) + 1; }
}

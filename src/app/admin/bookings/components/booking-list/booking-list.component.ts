import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ClassService } from '../../../../services/class.service';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { Booking, BookingStatus } from '../../../../models/booking.model';
import { BookingService } from '../../../../services/booking.service';

@Component({
  selector: 'app-booking-list',
  imports: [RouterLink, ConfirmModalComponent],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent {
  private readonly bookingService = inject(BookingService);
  private readonly classService = inject(ClassService);
  private readonly toastService = inject(ToastService);

  readonly searchTerm = signal('');
  readonly selectedStatus = signal<BookingStatus | 'All'>('All');
  readonly bookingToDelete = signal<Booking | null>(null);

  readonly filteredBookings = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const status = this.selectedStatus();

    return this.bookingService.bookings().filter((booking) => {
      const matchesSearch =
        booking.parentName.toLowerCase().includes(term) || booking.childName.toLowerCase().includes(term);
      const matchesStatus = status === 'All' || booking.status === status;
      return matchesSearch && matchesStatus;
    });
  });

  className(classId: number): string {
    return this.classService.getClassById(classId)?.name ?? 'Unknown class';
  }

  askDelete(booking: Booking): void {
    this.bookingToDelete.set(booking);
  }

  cancelDelete(): void {
    this.bookingToDelete.set(null);
  }

  confirmDelete(): void {
    const booking = this.bookingToDelete();

    if (!booking) {
      return;
    }

    this.bookingService.deleteBooking(booking.id);
    this.bookingToDelete.set(null);
    this.toastService.show('Booking deleted successfully.');
  }
}

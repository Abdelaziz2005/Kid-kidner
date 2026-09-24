import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ClassService } from '../../../../services/class.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { Booking } from '../../../../models/booking.model';
import { BookingService } from '../../../../services/booking.service';

@Component({
  selector: 'app-booking-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly bookingService = inject(BookingService);
  private readonly classService = inject(ClassService);
  private readonly toastService = inject(ToastService);

  readonly classes = this.classService.classes;
  readonly editingId = signal<number | null>(null);
  readonly notFound = signal(false);
  readonly submitted = signal(false);
  readonly isEditMode = computed(() => this.editingId() !== null);

  readonly form = this.fb.nonNullable.group({
    parentName: ['', Validators.required],
    parentEmail: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    childName: ['', Validators.required],
    classId: [0, [Validators.required, Validators.min(1)]],
    bookingDate: ['', Validators.required],
    status: ['Pending' as Booking['status'], Validators.required]
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      this.form.patchValue({ classId: this.classes()[0]?.id ?? 0 });
      return;
    }

    const id = Number(idParam);
    const booking = this.bookingService.getBookingById(id);
    this.editingId.set(id);

    if (!booking) {
      this.notFound.set(true);
      return;
    }

    this.form.patchValue(booking);
  }

  hasError(controlName: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || this.submitted());
  }

  submit(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const id = this.editingId() ?? this.bookingService.getNextId();
    const booking: Booking = {
      id,
      ...this.form.getRawValue()
    };

    if (this.isEditMode()) {
      this.bookingService.updateBooking(id, booking);
      this.toastService.show('Booking updated successfully.');
    } else {
      this.bookingService.addBooking(booking);
      this.toastService.show('Booking added successfully.');
    }

    this.router.navigateByUrl('/admin/bookings');
  }
}

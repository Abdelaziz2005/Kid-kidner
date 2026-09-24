import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BookingService } from '../../services/booking.service';
import { ClassService } from '../../services/class.service';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private readonly classService = inject(ClassService);
  private readonly teacherService = inject(TeacherService);
  private readonly bookingService = inject(BookingService);

  readonly totalClasses = computed(() => this.classService.classes().length);
  readonly totalTeachers = computed(() => this.teacherService.teachers().length);
  readonly totalBookings = computed(() => this.bookingService.bookings().length);
  readonly activeClasses = computed(() => this.classService.classes().filter((item) => item.status === 'Active').length);
  readonly activeTeachers = computed(() => this.teacherService.teachers().filter((item) => item.status === 'Active').length);
  readonly recentClasses = computed(() => this.classService.classes().slice(-3).reverse());
  readonly recentBookings = computed(() => this.bookingService.bookings().slice(-4).reverse());

  className(classId: number): string {
    return this.classService.getClassById(classId)?.name ?? 'Unknown class';
  }
}

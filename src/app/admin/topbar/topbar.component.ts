import { Component, EventEmitter, Output, computed, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  @Output() menuClicked = new EventEmitter<void>();

  private readonly router = inject(Router);
  private readonly routeUrl = toSignal(
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)),
    { initialValue: new NavigationEnd(0, this.router.url, this.router.url) }
  );

  readonly pageTitle = computed(() => {
    const url = this.routeUrl().urlAfterRedirects;

    if (url.includes('/classes/add')) return 'Add Class';
    if (url.includes('/classes/edit')) return 'Edit Class';
    if (url.includes('/classes')) return 'Classes';
    if (url.includes('/teachers/add')) return 'Add Teacher';
    if (url.includes('/teachers/edit')) return 'Edit Teacher';
    if (url.includes('/teachers')) return 'Teachers';
    if (url.includes('/bookings/add')) return 'Add Booking';
    if (url.includes('/bookings/edit')) return 'Edit Booking';
    if (url.includes('/bookings')) return 'Bookings';

    return 'Dashboard';
  });
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() open = false;
  @Output() navigated = new EventEmitter<void>();

  readonly navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'bi-speedometer2', route: '/admin/dashboard' },
    { label: 'Classes', icon: 'bi-mortarboard', route: '/admin/classes' },
    { label: 'Teachers', icon: 'bi-people', route: '/admin/teachers' },
    { label: 'Bookings', icon: 'bi-calendar-check', route: '/admin/bookings' }
  ];
}

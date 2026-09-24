import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Navbar } from './comp/navbar/navbar';
import { filter } from 'rxjs';

import { Hero } from './comp/hero&about-home/hero';

@Component({
  imports: [RouterOutlet,Navbar,Hero],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Final');
  public router = inject(Router);
  isAdminRoute = false;
  constructor() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      this.isAdminRoute = e.urlAfterRedirects.startsWith('/admin');
    });
  }
}

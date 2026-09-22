import { Auth } from './../../services/auth';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  constructor(public auth: Auth, private router: Router) {}

  logout(): void {
    this.auth.logout();
    console.log('Current User:', this.auth.getCurrentUser());
    console.log('Logged In:', this.auth.isLoggedIn());
    console.log('Admin:', this.auth.isAdmin());
    this.router.navigate(['/login']);
  }
}

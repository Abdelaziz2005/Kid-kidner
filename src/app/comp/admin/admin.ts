import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-admin',
  styleUrl: './admin.css',
  templateUrl: './admin.html',
})
export class Admin implements OnInit{
   
  adminName = '';

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit() {
    this.adminName = this.auth.getCurrentUser()?.name ?? '';
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

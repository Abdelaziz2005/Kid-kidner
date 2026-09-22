import { UserModel } from './../../models/user.model';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule],
  selector: 'app-profile',
  styleUrl: './profile.css',
  templateUrl: './profile.html',
})
export class Profile implements OnInit {
  userModel: UserModel | null = null;
  constructor(private auth: Auth , private router: Router) {}

  ngOnInit() {
    this.userModel = this.auth.getCurrentUser();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }


}

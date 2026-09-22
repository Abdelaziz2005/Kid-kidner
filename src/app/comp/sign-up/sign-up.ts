
import { CommonModule } from '@angular/common';
import { Auth } from './../../services/auth';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


@Component({
  imports: [FormsModule,RouterLink, CommonModule],
  selector: 'app-sign-up',
  styleUrl: './sign-up.css',
  templateUrl: './sign-up.html',
})
export class SignUp {
  name='';
  age: number|null = null;
  email='';
  password='';
  error_m='';
  error_m2='';
  error_m3='';

  constructor(private auth:Auth , private router:Router ){}
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  onSubmit() {
    if (!this.name || !this.age || !this.email || !this.password) {
      this.error_m = 'Please fill in all fields.';
      return;
    }
    if (!this.isValidEmail(this.email)) {
      this.error_m3 = 'Please enter a valid email address.';
      return;
    }

    if (this.password.length < 8) {
      this.error_m2 = 'Password must be at least 8 characters long.';
      return;
    }

    const result = this.auth.signup({
      name: this.name,
      age: this.age,
      email: this.email,
      password: this.password
    });


     if (result.success) {
      this.router.navigate(['/login']);
    } else {
      this.error_m = result.message;
    }
  }

}

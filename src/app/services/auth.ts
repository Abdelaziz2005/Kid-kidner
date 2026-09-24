import { Injectable, signal } from '@angular/core';
import { UserModel } from '../models/user.model';
const u_key = 'app_users';
const curr_uKey = 'current_user';
const admin_email = 'admin@myapp.com';
@Injectable({ providedIn: 'root' })
export class Auth {
    private currentUser = signal<UserModel | null>(null);

    constructor() {
      const data = localStorage.getItem(curr_uKey);
      this.currentUser.set(data ? JSON.parse(data) : null);
      
      const users = this.getUsers();
      if (!users.some(u => u.email === admin_email)) {
         users.push({ name: 'Admin', age: 30, email: admin_email, password: 'password123' });
         localStorage.setItem(u_key, JSON.stringify(users));
      }
    }

  signup(user: UserModel): { success: boolean; message: string } {
    const users = this.getUsers();

    if (users.some(u => u.email === user.email)) {
      return { success: false, message: 'Email already registered.' };
    }

    users.push(user);
    localStorage.setItem(u_key, JSON.stringify(users));
    return { success: true, message: 'Signup successful!' };
  }


  login(email: string, password: string): { success: boolean; message: string } {
    const users = this.getUsers();
    const found = users.find(u => u.email === email && u.password === password);

    if (!found) {
      return { success: false, message: 'Invalid email or password.' };
    }

    localStorage.setItem(curr_uKey, JSON.stringify(found));
    this.currentUser.set(found);
    return { success: true, message: 'Login successful!' };
  }

  logout(): void {
    localStorage.removeItem(curr_uKey);
    this.currentUser.set(null);
  }

  getCurrentUser(): UserModel | null {
    return this.currentUser();
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return !!user && user.email === admin_email;
  }

  private getUsers(): UserModel[] {
    const data = localStorage.getItem(u_key);
    return data ? JSON.parse(data) : [];
  }


}

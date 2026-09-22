import { Routes } from '@angular/router';
import { Login } from './comp/login/login';
import { SignUp } from './comp/sign-up/sign-up';
import { Profile } from './comp/profile/profile';
import { Admin } from './comp/admin/admin';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';
import { Teachers } from './comp/teachers/teachers';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'signup', component: SignUp },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'admin', component: Admin, canActivate: [adminGuard] },
  { path: 'teachers', component: Teachers },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

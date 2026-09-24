import { Routes } from '@angular/router';
import { Login } from './comp/login/login';
import { SignUp } from './comp/sign-up/sign-up';
import { Profile } from './comp/profile/profile';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';
import { Teachers } from './comp/teachers/teachers';

import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { BookingFormComponent } from './admin/bookings/components/booking-form/booking-form.component';
import { BookingListComponent } from './admin/bookings/components/booking-list/booking-list.component';
import { ClassFormComponent } from './admin/classes/components/class-form/class-form.component';
import { ClassListComponent } from './admin/classes/components/class-list/class-list.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { TeacherFormComponent } from './admin/teachers/components/teacher-form/teacher-form.component';
import { TeacherListComponent } from './admin/teachers/components/teacher-list/teacher-list.component';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'signup', component: SignUp },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'classes', component: ClassListComponent },
      { path: 'classes/add', component: ClassFormComponent },
      { path: 'classes/edit/:id', component: ClassFormComponent },
      { path: 'teachers', component: TeacherListComponent },
      { path: 'teachers/add', component: TeacherFormComponent },
      { path: 'teachers/edit/:id', component: TeacherFormComponent },
      { path: 'bookings', component: BookingListComponent },
      { path: 'bookings/add', component: BookingFormComponent },
      { path: 'bookings/edit/:id', component: BookingFormComponent }
    ]
  },
  { path: 'teachers', component: Teachers },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

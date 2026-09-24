import { Injectable, signal } from '@angular/core';
import { initialTeachers } from '../data/initial-teachers';
import { Teacher } from '../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private readonly teachersSignal = signal<Teacher[]>(initialTeachers);
  readonly teachers = this.teachersSignal.asReadonly();

  getTeachers(): Teacher[] { return this.teachers(); }
  getTeacherById(id: number): Teacher | undefined { return this.teachers().find(t => t.id === id); }
  addTeacher(teacher: Teacher): void { this.teachersSignal.update(t => [...t, teacher]); }
  updateTeacher(id: number, updatedTeacher: Teacher): void {
    this.teachersSignal.update(t => t.map(item => item.id === id ? { ...updatedTeacher, id } : item));
  }
  deleteTeacher(id: number): void { this.teachersSignal.update(t => t.filter(item => item.id !== id)); }
  getNextId(): number { return Math.max(0, ...this.teachers().map(t => t.id)) + 1; }
}

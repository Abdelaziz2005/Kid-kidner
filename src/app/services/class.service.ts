import { Injectable, signal } from '@angular/core';
import { initialClasses } from '../data/initial-classes';
import { Class } from '../models/class.model';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private readonly classesSignal = signal<Class[]>(initialClasses);
  readonly classes = this.classesSignal.asReadonly();

  getClasses(): Class[] { return this.classes(); }
  getClassById(id: number): Class | undefined { return this.classes().find(c => c.id === id); }
  addClass(classItem: Class): void { this.classesSignal.update(c => [...c, classItem]); }
  updateClass(id: number, updatedClass: Class): void {
    this.classesSignal.update(c => c.map(item => item.id === id ? { ...updatedClass, id } : item));
  }
  deleteClass(id: number): void { this.classesSignal.update(c => c.filter(item => item.id !== id)); }
  getNextId(): number { return Math.max(0, ...this.classes().map(c => c.id)) + 1; }
}

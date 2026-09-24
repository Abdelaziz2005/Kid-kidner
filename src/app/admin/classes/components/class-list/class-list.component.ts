import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { Class, ClassStatus } from '../../../../models/class.model';
import { ClassService } from '../../../../services/class.service';

@Component({
  selector: 'app-class-list',
  imports: [RouterLink, ConfirmModalComponent],
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.css'
})
export class ClassListComponent {
  private readonly classService = inject(ClassService);
  private readonly toastService = inject(ToastService);

  readonly searchTerm = signal('');
  readonly selectedStatus = signal<ClassStatus | 'All'>('All');
  readonly classToDelete = signal<Class | null>(null);

  readonly filteredClasses = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const status = this.selectedStatus();

    return this.classService.classes().filter((classItem) => {
      const matchesSearch = classItem.name.toLowerCase().includes(term);
      const matchesStatus = status === 'All' || classItem.status === status;
      return matchesSearch && matchesStatus;
    });
  });

  askDelete(classItem: Class): void {
    this.classToDelete.set(classItem);
  }

  cancelDelete(): void {
    this.classToDelete.set(null);
  }

  confirmDelete(): void {
    const classItem = this.classToDelete();

    if (!classItem) {
      return;
    }

    this.classService.deleteClass(classItem.id);
    this.classToDelete.set(null);
    this.toastService.show('Class deleted successfully.');
  }
}

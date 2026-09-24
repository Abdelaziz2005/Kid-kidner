import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { Teacher, TeacherStatus } from '../../../../models/teacher.model';
import { TeacherService } from '../../../../services/teacher.service';

@Component({
  selector: 'app-teacher-list',
  imports: [RouterLink, ConfirmModalComponent],
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.css'
})
export class TeacherListComponent {
  private readonly teacherService = inject(TeacherService);
  private readonly toastService = inject(ToastService);

  readonly searchTerm = signal('');
  readonly selectedStatus = signal<TeacherStatus | 'All'>('All');
  readonly teacherToDelete = signal<Teacher | null>(null);

  readonly filteredTeachers = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const status = this.selectedStatus();

    return this.teacherService.teachers().filter((teacher) => {
      const matchesSearch =
        teacher.name.toLowerCase().includes(term) || teacher.subject.toLowerCase().includes(term);
      const matchesStatus = status === 'All' || teacher.status === status;
      return matchesSearch && matchesStatus;
    });
  });

  askDelete(teacher: Teacher): void {
    this.teacherToDelete.set(teacher);
  }

  cancelDelete(): void {
    this.teacherToDelete.set(null);
  }

  confirmDelete(): void {
    const teacher = this.teacherToDelete();

    if (!teacher) {
      return;
    }

    this.teacherService.deleteTeacher(teacher.id);
    this.teacherToDelete.set(null);
    this.toastService.show('Teacher deleted successfully.');
  }
}

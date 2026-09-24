import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TeacherService } from '../../services/teacher.service';

@Component({
  imports: [RouterLink],
  selector: 'app-teachers',
  styleUrl: './teachers.css',
  templateUrl: './teachers.html',
})
export class Teachers {
  private readonly teacherService = inject(TeacherService);
  readonly teachers = computed(() => this.teacherService.teachers().filter(t => t.status === 'Active'));
}

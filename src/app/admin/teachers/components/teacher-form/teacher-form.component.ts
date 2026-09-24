import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ToastService } from '../../../../shared/components/toast/toast.service';
import { Teacher } from '../../../../models/teacher.model';
import { TeacherService } from '../../../../services/teacher.service';

@Component({
  selector: 'app-teacher-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './teacher-form.component.html',
  styleUrl: './teacher-form.component.css'
})
export class TeacherFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly teacherService = inject(TeacherService);
  private readonly toastService = inject(ToastService);

  readonly editingId = signal<number | null>(null);
  readonly notFound = signal(false);
  readonly submitted = signal(false);
  readonly isEditMode = computed(() => this.editingId() !== null);

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    subject: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    bio: ['', Validators.required],
    imageUrl: ['', Validators.required],
    status: ['Active' as Teacher['status'], Validators.required]
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      return;
    }

    const id = Number(idParam);
    const teacher = this.teacherService.getTeacherById(id);
    this.editingId.set(id);

    if (!teacher) {
      this.notFound.set(true);
      return;
    }

    this.form.patchValue(teacher);
  }

  hasError(controlName: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || this.submitted());
  }

  submit(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const id = this.editingId() ?? this.teacherService.getNextId();
    const teacher: Teacher = {
      id,
      ...this.form.getRawValue()
    };

    if (this.isEditMode()) {
      this.teacherService.updateTeacher(id, teacher);
      this.toastService.show('Teacher updated successfully.');
    } else {
      this.teacherService.addTeacher(teacher);
      this.toastService.show('Teacher added successfully.');
    }

    this.router.navigateByUrl('/admin/teachers');
  }
}

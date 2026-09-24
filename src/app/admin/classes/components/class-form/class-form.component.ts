import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ToastService } from '../../../../shared/components/toast/toast.service';
import { Class } from '../../../../models/class.model';
import { ClassService } from '../../../../services/class.service';

@Component({
  selector: 'app-class-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './class-form.component.html',
  styleUrl: './class-form.component.css'
})
export class ClassFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly classService = inject(ClassService);
  private readonly toastService = inject(ToastService);

  readonly editingId = signal<number | null>(null);
  readonly notFound = signal(false);
  readonly submitted = signal(false);
  readonly isEditMode = computed(() => this.editingId() !== null);

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    ageFrom: [2, Validators.required],
    ageTo: [3, Validators.required],
    seats: [1, [Validators.required, Validators.min(1)]],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    fee: [0, [Validators.required, Validators.min(0)]],
    imageUrl: ['', Validators.required],
    status: ['Active' as Class['status'], Validators.required]
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      return;
    }

    const id = Number(idParam);
    const classItem = this.classService.getClassById(id);
    this.editingId.set(id);

    if (!classItem) {
      this.notFound.set(true);
      return;
    }

    this.form.patchValue(classItem);
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

    const id = this.editingId() ?? this.classService.getNextId();
    const classItem: Class = {
      id,
      ...this.form.getRawValue()
    };

    if (this.isEditMode()) {
      this.classService.updateClass(id, classItem);
      this.toastService.show('Class updated successfully.');
    } else {
      this.classService.addClass(classItem);
      this.toastService.show('Class added successfully.');
    }

    this.router.navigateByUrl('/admin/classes');
  }
}

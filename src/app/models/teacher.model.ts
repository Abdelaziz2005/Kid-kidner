export type TeacherStatus = 'Active' | 'Inactive';

export interface Teacher {
  id: number;
  name: string;
  subject: string;
  email: string;
  phone: string;
  bio: string;
  imageUrl: string;
  status: TeacherStatus;
}

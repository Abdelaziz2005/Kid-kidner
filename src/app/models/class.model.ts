export type ClassStatus = 'Active' | 'Inactive';

export interface Class {
  id: number;
  name: string;
  description: string;
  ageFrom: number;
  ageTo: number;
  seats: number;
  startTime: string;
  endTime: string;
  fee: number;
  imageUrl: string;
  status: ClassStatus;
}

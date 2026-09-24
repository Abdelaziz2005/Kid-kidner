import { Class } from '../models/class.model';

export const initialClasses: Class[] = [
  {
    id: 1,
    name: 'Tiny Explorers',
    description: 'A playful early learning class focused on sensory discovery, storytelling, and social confidence.',
    ageFrom: 2,
    ageTo: 3,
    seats: 16,
    startTime: '09:00',
    endTime: '11:00',
    fee: 120,
    imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=500&q=80',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Creative Stars',
    description: 'Art, music, movement, and guided play for children building creative expression.',
    ageFrom: 3,
    ageTo: 4,
    seats: 18,
    startTime: '11:30',
    endTime: '13:30',
    fee: 145,
    imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=500&q=80',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Pre-K Builders',
    description: 'Foundational literacy, numbers, teamwork, and classroom routines for school readiness.',
    ageFrom: 4,
    ageTo: 5,
    seats: 20,
    startTime: '08:30',
    endTime: '12:30',
    fee: 180,
    imageUrl: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=500&q=80',
    status: 'Inactive'
  }
];

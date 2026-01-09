import { Category } from './types';

export const categories: Category[] = [
  { id: 'javascript', name: 'JavaScript', icon: 'code-2' },
  { id: 'angular', name: 'Angular', icon: 'component' },
  { id: 'java', name: 'Java', icon: 'coffee' },
  { id: 'springboot', name: 'Spring Boot', icon: 'leaf' },
  { 
    id: 'databases', 
    name: 'Databases', 
    icon: 'database',
    subcategories: [
      { id: 'sql', name: 'SQL' },
      { id: 'mongodb', name: 'MongoDB' }
    ]
  },
  { id: 'react', name: 'React', icon: 'atom' },
  { id: 'blogs', name: 'Blogs', icon: 'book-open' },
  { id: 'interview-prep', name: 'Interview Prep', icon: 'graduation-cap' },
  { id: 'contact', name: 'Contact', icon: 'mail' }
];

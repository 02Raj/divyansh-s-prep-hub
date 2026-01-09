import { BlogPost } from './types';

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Mastering Java Streams: A Comprehensive Guide',
    excerpt: 'Learn how to leverage Java Streams API for cleaner, more functional code. From basic operations to advanced parallel processing.',
    date: '2024-12-15',
    readTime: '8 min read',
    tags: ['Java', 'Streams', 'Functional Programming']
  },
  {
    id: 'blog-2',
    title: 'Angular Signals vs RxJS: When to Use What',
    excerpt: 'Angular 16 introduced Signals as a new reactive primitive. Understand when to use Signals over RxJS Observables.',
    date: '2024-12-10',
    readTime: '6 min read',
    tags: ['Angular', 'Signals', 'RxJS']
  },
  {
    id: 'blog-3',
    title: 'Building RESTful APIs with Spring Boot 3',
    excerpt: 'A step-by-step guide to creating production-ready REST APIs using Spring Boot 3, including security and testing.',
    date: '2024-12-05',
    readTime: '12 min read',
    tags: ['Spring Boot', 'REST API', 'Java']
  },
  {
    id: 'blog-4',
    title: 'MongoDB Aggregation Pipeline Deep Dive',
    excerpt: 'Master MongoDB aggregation framework with real-world examples. Learn to write efficient pipelines for data analysis.',
    date: '2024-11-28',
    readTime: '10 min read',
    tags: ['MongoDB', 'NoSQL', 'Database']
  },
  {
    id: 'blog-5',
    title: 'React Performance Optimization Techniques',
    excerpt: 'Practical tips and patterns to optimize your React applications. From memo to code splitting and beyond.',
    date: '2024-11-20',
    readTime: '7 min read',
    tags: ['React', 'Performance', 'JavaScript']
  },
  {
    id: 'blog-6',
    title: 'Understanding JavaScript Event Loop',
    excerpt: 'Demystifying how JavaScript handles asynchronous operations. A visual guide to the event loop, call stack, and task queues.',
    date: '2024-11-15',
    readTime: '9 min read',
    tags: ['JavaScript', 'Async', 'Fundamentals']
  }
];

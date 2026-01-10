import { BlogPost } from './types';

export interface MediumBlog {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  url: string;
  date: string;
}

export const mediumBlogs: MediumBlog[] = [
  // JavaScript Blogs
  {
    id: 'js-1',
    title: 'Promise and Its Methods: all, race, any, allSettled',
    description: 'A comprehensive guide to JavaScript Promise methods with practical examples and use cases.',
    category: 'JavaScript',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
    url: 'https://medium.com/@bittukumar-web/promise-and-its-methods-all-race-any-allsettled-0dc677b5aee1',
    date: '2024-12-01'
  },
  {
    id: 'js-2',
    title: 'Understanding JavaScript Closures',
    description: 'Deep dive into closures, lexical scope, and practical applications in JavaScript.',
    category: 'JavaScript',
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop',
    url: 'https://medium.com/@bittukumar-web',
    date: '2024-11-25'
  },
  {
    id: 'js-3',
    title: 'Event Loop Demystified',
    description: 'How JavaScript handles asynchronous operations: call stack, task queue, and microtasks.',
    category: 'JavaScript',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
    url: 'https://medium.com/@bittukumar-web',
    date: '2024-11-20'
  },
  // Angular Blogs
  {
    id: 'ang-1',
    title: 'Angular Signals: The New Reactive Primitive',
    description: 'Learn how Angular 16+ Signals change the way we handle reactivity in Angular apps.',
    category: 'Angular',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
    url: 'https://medium.com/@bittukumar-web',
    date: '2024-12-10'
  },
  {
    id: 'ang-2',
    title: 'RxJS Operators Every Angular Developer Should Know',
    description: 'Master essential RxJS operators: switchMap, mergeMap, debounceTime, and more.',
    category: 'Angular',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
    url: 'https://medium.com/@bittukumar-web',
    date: '2024-11-28'
  },
  {
    id: 'ang-3',
    title: 'Lazy Loading in Angular: Complete Guide',
    description: 'Optimize your Angular app performance with lazy loading modules and preloading strategies.',
    category: 'Angular',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
    url: 'https://medium.com/@bittukumar-web',
    date: '2024-11-15'
  },
  // Java Blogs
  {
    id: 'java-1',
    title: 'Java Streams API: From Basics to Advanced',
    description: 'Complete guide to Java Stream operations, collectors, and parallel processing.',
    category: 'Java',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop',
    url: 'https://medium.com/@bittukumar-web',
    date: '2024-12-05'
  },
  {
    id: 'java-2',
    title: 'Multithreading in Java: A Practical Guide',
    description: 'Understanding threads, executors, and concurrent collections in Java.',
    category: 'Java',
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=250&fit=crop',
    url: 'https://medium.com/@bittukumar-web',
    date: '2024-11-22'
  },
  // Spring Boot Blogs
  {
    id: 'spring-1',
    title: 'Building REST APIs with Spring Boot 3',
    description: 'Step-by-step guide to create production-ready REST APIs with Spring Boot.',
    category: 'Spring Boot',
    thumbnail: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=250&fit=crop',
    url: 'https://medium.com/@bittukumar-web',
    date: '2024-12-08'
  },
  {
    id: 'spring-2',
    title: 'Spring Security with JWT Authentication',
    description: 'Implement secure authentication using JWT tokens in Spring Boot applications.',
    category: 'Spring Boot',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop',
    url: 'https://medium.com/@bittukumar-web',
    date: '2024-11-30'
  },
  // Database Blogs
  {
    id: 'db-1',
    title: 'SQL Query Optimization Techniques',
    description: 'Learn how to write efficient SQL queries and use indexes effectively.',
    category: 'SQL',
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop',
    url: 'https://medium.com/@bittukumar-web',
    date: '2024-11-18'
  },
  {
    id: 'db-2',
    title: 'MongoDB Aggregation Pipeline Deep Dive',
    description: 'Master MongoDB aggregation framework with real-world examples.',
    category: 'MongoDB',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop',
    url: 'https://medium.com/@bittukumar-web',
    date: '2024-11-10'
  },
  // System Design Blogs
  {
    id: 'sd-1',
    title: 'System Design Fundamentals for Interviews',
    description: 'Essential concepts: scalability, load balancing, caching, and database design.',
    category: 'System Design',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop',
    url: 'https://medium.com/@bittukumar-web',
    date: '2024-12-12'
  },
  {
    id: 'sd-2',
    title: 'Designing a URL Shortener: Complete Guide',
    description: 'Step-by-step system design of a URL shortening service like bit.ly.',
    category: 'System Design',
    thumbnail: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=250&fit=crop',
    url: 'https://medium.com/@bittukumar-web',
    date: '2024-11-05'
  }
];

// Keep old blogPosts for backwards compatibility if needed
export const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Mastering Java Streams: A Comprehensive Guide',
    excerpt: 'Learn how to leverage Java Streams API for cleaner, more functional code.',
    date: '2024-12-15',
    readTime: '8 min read',
    tags: ['Java', 'Streams', 'Functional Programming']
  }
];

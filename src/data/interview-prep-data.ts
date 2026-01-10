// Interview Questions for Tab 1
export const interviewQuestions = [
  // Angular Questions
  "1. What is Angular and how does it differ from AngularJS?",
  "2. Explain the Angular component lifecycle hooks.",
  "3. What are Angular directives? Explain the types.",
  "4. What is dependency injection in Angular?",
  "5. Explain the difference between ngOnInit and constructor.",
  "6. What are Angular services and why are they used?",
  "7. How does change detection work in Angular?",
  "8. What is the difference between Template-driven and Reactive forms?",
  "9. Explain Angular routing and lazy loading.",
  "10. What are Angular pipes? How to create a custom pipe?",
  // JavaScript Questions
  "11. Explain closures in JavaScript with an example.",
  "12. What is the difference between var, let, and const?",
  "13. How does prototypal inheritance work in JavaScript?",
  "14. Explain the event loop in JavaScript.",
  "15. What are Promises? How do they differ from callbacks?",
  "16. Explain async/await and error handling.",
  "17. What is hoisting in JavaScript?",
  "18. Explain the 'this' keyword in different contexts.",
  "19. What are arrow functions and how do they differ from regular functions?",
  "20. Explain debouncing and throttling.",
  // System Design Questions
  "21. What is system design and why is it important?",
  "22. Explain horizontal vs vertical scaling.",
  "23. What is a load balancer and how does it work?",
  "24. Explain caching strategies (Redis, CDN).",
  "25. What is database sharding?",
  "26. Explain microservices architecture vs monolith.",
  "27. What is the CAP theorem?",
  "28. How do message queues work (Kafka, RabbitMQ)?",
  "29. Explain rate limiting and its implementation.",
  "30. What is API Gateway pattern?"
];

// Angular Interview Sets for Tab 2
export interface InterviewSetDetail {
  id: string;
  title: string;
  company: string;
  date: string;
  questionCount: number;
  technology: string;
  questions: string[];
}

export const angularInterviewSets: InterviewSetDetail[] = [
  {
    id: 'angular-set-1',
    title: 'Angular Fundamentals – First Round Interview',
    company: 'TCS Digital',
    date: '2024-03-15',
    questionCount: 20,
    technology: 'Angular',
    questions: [
      "What is Angular and how is it different from AngularJS?",
      "Explain Angular component lifecycle hooks in order.",
      "What is dependency injection? How does Angular implement it?",
      "Difference between ngOnInit and constructor?",
      "What are Angular services and how to create one?",
      "Explain @Input and @Output decorators.",
      "What is ViewChild and ContentChild?",
      "How does change detection work in Angular?",
      "Explain OnPush change detection strategy.",
      "What are Angular pipes? Built-in vs custom pipes.",
      "Difference between Template-driven and Reactive forms.",
      "What is FormGroup and FormControl?",
      "How to implement form validation in Angular?",
      "What is Angular routing? How to set up routes?",
      "Explain lazy loading in Angular.",
      "What are route guards? Types of guards.",
      "What is an Angular module?",
      "Explain the difference between declarations, imports, and providers.",
      "What is HttpClient? How to make API calls?",
      "How to handle errors in HTTP requests?"
    ]
  },
  {
    id: 'angular-set-2',
    title: 'Angular Advanced – Technical Round',
    company: 'Infosys',
    date: '2024-02-20',
    questionCount: 15,
    technology: 'Angular',
    questions: [
      "What are Angular Signals introduced in Angular 16?",
      "Explain RxJS and its role in Angular.",
      "What are Subjects in RxJS? Types of Subjects.",
      "Explain switchMap, mergeMap, and concatMap operators.",
      "How to implement state management in Angular?",
      "What is NgRx? Explain its architecture.",
      "How to optimize Angular application performance?",
      "What is tree shaking in Angular?",
      "Explain Angular Universal (SSR).",
      "How to implement internationalization (i18n)?",
      "What are Angular Elements?",
      "Explain micro-frontend architecture with Angular.",
      "How to implement custom structural directives?",
      "What is Zone.js and its role in Angular?",
      "Explain Angular testing with Jasmine and Karma."
    ]
  },
  {
    id: 'angular-set-3',
    title: 'Angular + System Design – Full Stack Round',
    company: 'Wipro',
    date: '2024-01-10',
    questionCount: 18,
    technology: 'Angular',
    questions: [
      "How to structure a large-scale Angular application?",
      "Explain module federation in Angular.",
      "How to implement authentication in Angular?",
      "JWT vs Session-based authentication.",
      "How to secure Angular routes?",
      "Explain CORS and how to handle it.",
      "What is Angular CDK? How is it useful?",
      "How to implement drag and drop in Angular?",
      "Explain virtual scrolling in Angular.",
      "How to handle memory leaks in Angular?",
      "What are Web Workers? How to use in Angular?",
      "Explain Progressive Web Apps (PWA) with Angular.",
      "How to implement offline support?",
      "What is Service Worker in Angular?",
      "How to deploy Angular application?",
      "Explain CI/CD for Angular projects.",
      "How to implement feature flags in Angular?",
      "Angular CLI commands you use frequently."
    ]
  }
];

// JavaScript Prep for Tab 3
export const javascriptTopicsList = [
  "Variables and Data Types",
  "Operators and Expressions",
  "Control Flow Statements",
  "Functions and Scope",
  "Closures and Lexical Scope",
  "Hoisting",
  "this Keyword",
  "Prototypes and Inheritance",
  "ES6+ Features",
  "Promises and Async/Await",
  "Event Loop",
  "DOM Manipulation",
  "Event Handling",
  "Error Handling"
];

export const codingPatterns = [
  "Two Pointers",
  "Sliding Window",
  "Binary Search",
  "BFS / DFS",
  "Dynamic Programming",
  "Recursion and Backtracking",
  "Hash Maps",
  "Stack and Queue",
  "Linked List Operations",
  "Tree Traversal"
];

export const jsRepoStats = {
  stars: 2400,
  forks: 890,
  watchers: 156
};

// Java Prep for Tab 4
export const javaTopicsChecklist = [
  { topic: "Core Java Fundamentals", completed: true },
  { topic: "Object-Oriented Programming (OOPs)", completed: true },
  { topic: "Collections Framework", completed: true },
  { topic: "Exception Handling", completed: false },
  { topic: "Multithreading & Concurrency", completed: false },
  { topic: "JVM Architecture", completed: false },
  { topic: "Garbage Collection", completed: false },
  { topic: "Java 8+ Features (Streams, Lambda)", completed: true },
  { topic: "Design Patterns", completed: false },
  { topic: "JDBC & Database Connectivity", completed: false }
];

// System Design for Tab 5
export const systemDesignTopics = [
  {
    title: "What is System Design?",
    description: "Understanding the fundamentals of designing large-scale distributed systems."
  },
  {
    title: "High-Level Design vs Low-Level Design",
    description: "HLD focuses on system architecture, LLD focuses on class/module level design."
  },
  {
    title: "Scalability, Availability, Reliability",
    description: "Core principles for building production-grade systems."
  },
  {
    title: "Load Balancer",
    description: "Distributes traffic across multiple servers. Types: L4 vs L7, Round Robin, Least Connections."
  },
  {
    title: "Caching (Redis, CDN)",
    description: "Improves performance by storing frequently accessed data closer to the user."
  },
  {
    title: "Database Scaling (Sharding, Replication)",
    description: "Horizontal partitioning (sharding) and data redundancy (replication) for scale."
  },
  {
    title: "SQL vs NoSQL",
    description: "Choosing the right database based on data structure and query patterns."
  },
  {
    title: "Message Queues (Kafka, RabbitMQ)",
    description: "Asynchronous communication between services for decoupling and reliability."
  },
  {
    title: "Rate Limiting",
    description: "Protects APIs from abuse. Algorithms: Token Bucket, Leaky Bucket, Fixed Window."
  },
  {
    title: "CAP Theorem",
    description: "Consistency, Availability, Partition Tolerance - you can only pick two."
  },
  {
    title: "Microservices vs Monolith",
    description: "Trade-offs between monolithic and microservices architecture."
  },
  {
    title: "API Design & REST Principles",
    description: "Best practices for designing RESTful APIs with proper versioning and error handling."
  }
];

// Java/Spring Boot Interview Sets for Tab 7
export const javaSpringInterviewSets: InterviewSetDetail[] = [
  {
    id: 'java-set-1',
    title: 'Core Java – Campus Placement Round',
    company: 'Cognizant',
    date: '2024-04-01',
    questionCount: 22,
    technology: 'Java',
    questions: [
      "What is Java? Features of Java.",
      "Explain JVM, JRE, and JDK.",
      "What are primitive data types in Java?",
      "Difference between == and .equals()?",
      "What is method overloading vs overriding?",
      "Explain access modifiers in Java.",
      "What is an interface? How is it different from abstract class?",
      "Explain the final keyword.",
      "What is static keyword used for?",
      "Explain exception handling in Java.",
      "Difference between checked and unchecked exceptions.",
      "What is try-with-resources?",
      "Explain String pool in Java.",
      "Difference between String, StringBuilder, StringBuffer.",
      "What are wrapper classes?",
      "Explain autoboxing and unboxing.",
      "What is Java Collections Framework?",
      "Difference between ArrayList and LinkedList.",
      "What is HashMap? How does it work internally?",
      "Difference between HashMap and HashTable.",
      "What is the difference between Comparable and Comparator?",
      "Explain Java Stream API basics."
    ]
  },
  {
    id: 'java-set-2',
    title: 'Spring Boot Microservices – Backend Round',
    company: 'Capgemini',
    date: '2024-03-25',
    questionCount: 18,
    technology: 'Spring Boot',
    questions: [
      "What is Spring Boot? How is it different from Spring?",
      "Explain Spring Boot auto-configuration.",
      "What is @SpringBootApplication annotation?",
      "How to create REST APIs in Spring Boot?",
      "Explain @RestController vs @Controller.",
      "What is @RequestMapping and its variants?",
      "How to handle exceptions in Spring Boot?",
      "What is @ControllerAdvice?",
      "Explain Spring Data JPA.",
      "What are JPA repositories?",
      "How to implement pagination in Spring Boot?",
      "What is Spring Security? How to implement it?",
      "Explain JWT authentication in Spring Boot.",
      "What are microservices? Benefits and challenges.",
      "How to implement service discovery (Eureka)?",
      "What is API Gateway pattern?",
      "Explain circuit breaker pattern (Resilience4j).",
      "How to implement inter-service communication?"
    ]
  },
  {
    id: 'java-set-3',
    title: 'Java + System Design – Senior Developer Round',
    company: 'HCL Tech',
    date: '2024-02-28',
    questionCount: 16,
    technology: 'System Design',
    questions: [
      "Explain multithreading in Java.",
      "What is synchronized keyword?",
      "Difference between wait() and sleep().",
      "What is ExecutorService?",
      "Explain CompletableFuture in Java.",
      "What is the Fork/Join framework?",
      "Explain JVM memory model.",
      "What is garbage collection? Types of GC.",
      "How to tune JVM performance?",
      "Design a URL shortener service.",
      "Design a rate limiter.",
      "Design a notification system.",
      "How to implement caching in Spring Boot?",
      "Explain database connection pooling.",
      "What is Hibernate? First-level vs second-level cache.",
      "How to optimize database queries?"
    ]
  }
];

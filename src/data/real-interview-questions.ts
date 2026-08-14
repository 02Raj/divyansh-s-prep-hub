export type QuestionCategory = 'Java' | 'Spring Boot' | 'Microservices' | 'Angular' | 'JavaScript' | 'SQL' | 'Java Coding' | 'JS Coding' | 'System Design' | 'Other';

export interface RealInterviewQuestion {
  id: string;
  category: QuestionCategory;
  question: string;
  frequency: number;
  companies: string[];
  variations: string[];
  answerSEE: {
    simple: string;
    explain: string;
    example: string;
    summary10s: string;
  };
}

export const realInterviewQuestions: RealInterviewQuestion[] = [
  {
    "id": "java-interface-vs-abstract",
    "category": "Java",
    "question": "Difference between Interface and Abstract Class?",
    "frequency": 5,
    "companies": [
      "Deloitte",
      "Virtusa",
      "L&T"
    ],
    "variations": [
      "When to use Interface vs Abstract Class?",
      "Can abstract classes have constructors?"
    ],
    "answerSEE": {
      "simple": "An interface defines a pure contract with no state. An abstract class can have state and partial implementation.",
      "explain": "In simple terms, an interface is purely a contract (though Java 8 allows default/static methods) and supports multiple inheritance. An abstract class can have fields, constructors, and a mix of implemented and abstract methods, but you can only inherit one abstract class.",
      "example": "\"I use an interface when I want to define a contract that unrelated classes can implement. I use an abstract class when there's shared state or common logic that subclasses should inherit, like a base entity class with common fields. For example, Comparable is an interface (a capability), while a Vehicle might be an abstract class with common fields like speed and fuel.\"",
      "summary10s": "Interface = contract, multi-inheritance. Abstract class = shared state, single inheritance."
    }
  },
  {
    "id": "java-default-methods",
    "category": "Java",
    "question": "Why were default methods introduced in Java 8 interfaces?",
    "frequency": 3,
    "companies": [
      "TCS",
      "Infosys"
    ],
    "variations": [
      "Default methods vs Abstract Class"
    ],
    "answerSEE": {
      "simple": "Default methods were introduced so you can add new behavior to an interface without breaking existing implementations.",
      "explain": "Before Java 8, adding a method to an interface broke all classes implementing it. Default methods solve this by providing a fallback implementation. However, interfaces still cannot hold mutable instance state, unlike abstract classes.",
      "example": "\"I'd use a default method when I need to add new functionality to an existing interface without breaking all the classes that already implement it—like when forEach() was added to the Collection interface. If I need actual instance state or constructors, I would reach for an abstract class instead.\"",
      "summary10s": "Default method = extend interface safely. Abstract class = need state or constructors."
    }
  },
  {
    "id": "java-static-methods-interface",
    "category": "Java",
    "question": "What is the use of static methods in an interface?",
    "frequency": 2,
    "companies": [
      "Cognizant"
    ],
    "variations": [
      "Can we override static methods in an interface?"
    ],
    "answerSEE": {
      "simple": "A static method in an interface is a utility method that belongs to the interface itself. It cannot be overridden.",
      "explain": "Static methods have a full body inside the interface and are called directly using the interface name (e.g., InterfaceName.method()). They are not inherited by implementing classes, which means they are bound to the interface, not the object hierarchy.",
      "example": "\"Static methods in an interface let us define utility logic that doesn't need an instance to run. A good example is Comparator.naturalOrder(). This lets us keep helper logic inside the interface itself instead of creating a separate utility class.\"",
      "summary10s": "Static method in interface = utility method, called via interface name, not inherited, not overridable."
    }
  },
  {
    "id": "java-equals-hashcode",
    "category": "Java",
    "question": "Why do we need to override equals() and hashCode() together?",
    "frequency": 8,
    "companies": [
      "Amazon",
      "Walmart",
      "Morgan Stanley"
    ],
    "variations": [
      "What happens if you only override equals() in HashMap?"
    ],
    "answerSEE": {
      "simple": "HashMap uses hashCode() to find the correct bucket, and equals() to find the exact object in that bucket. Both must be consistent.",
      "explain": "In simple terms, equal objects MUST have equal hashCodes. If you only override equals(), two equal objects might get different hashCodes and land in different buckets. If you only override hashCode(), they land in the same bucket but equals() will say they are different objects.",
      "example": "\"hashCode() decides which bucket an object goes into, and equals() confirms if it's truly the same object within that bucket. If I only override equals(), a HashSet would treat equal objects as distinct, and HashMap.get() would fail to find an existing key. That's why we always override both together.\"",
      "summary10s": "Override only one → broken lookups or duplicates. Always override both together."
    }
  },
  {
    "id": "java-hashmap-mutability",
    "category": "Java",
    "question": "What happens if you modify a key after inserting it into a HashMap?",
    "frequency": 4,
    "companies": [
      "Goldman Sachs",
      "JP Morgan"
    ],
    "variations": [
      "Can we use mutable objects as HashMap keys?"
    ],
    "answerSEE": {
      "simple": "If a key's fields change after insertion, its hashCode changes, making it \"lost\" in the wrong bucket.",
      "explain": "When you insert a key, HashMap places it in a bucket based on its hashCode at that exact moment. If you mutate the key later, the object is still sitting in the old bucket, but future get() calls will compute a new hashCode and look in a different bucket.",
      "example": "\"This is a subtle bug. If we mutate a field that's part of the hashCode calculation, the object's hashCode changes but it remains in the old bucket. When we call get(), it looks in the new bucket and simply can't find the entry. That's exactly why I always use immutable objects (like String) as HashMap keys.\"",
      "summary10s": "Mutating key fields after insert breaks lookup. Always use immutable keys."
    }
  },
  {
    "id": "spring-transactions-propagation",
    "category": "Spring Boot",
    "question": "Explain Transaction Propagation and Isolation Levels in Spring.",
    "frequency": 6,
    "companies": [
      "Barclays",
      "HSBC"
    ],
    "variations": [
      "REQUIRED vs REQUIRES_NEW",
      "How do you prevent dirty reads?"
    ],
    "answerSEE": {
      "simple": "Propagation decides how a method joins an existing transaction. Isolation controls how much one transaction sees of another's changes.",
      "explain": "Propagation REQUIRED (the default) joins an existing transaction, while REQUIRES_NEW suspends the current one and starts fresh. Isolation levels range from READ_COMMITTED (avoids dirty reads) to SERIALIZABLE (avoids all concurrency issues but is very slow).",
      "example": "\"Propagation defines transaction nesting. I use REQUIRES_NEW for things like audit logging that must save to the DB even if the main transaction rolls back. For isolation, READ_COMMITTED is the common default, while SERIALIZABLE is the strictest but hurts performance under high traffic.\"",
      "summary10s": "Propagation = transaction nesting behavior. Isolation = visibility between concurrent transactions."
    }
  },
  {
    "id": "spring-transactional-fails",
    "category": "Spring Boot",
    "question": "In what scenarios does the @Transactional annotation fail to work?",
    "frequency": 7,
    "companies": [
      "EPAM",
      "Capgemini"
    ],
    "variations": [
      "Why is my @Transactional not rolling back?"
    ],
    "answerSEE": {
      "simple": "@Transactional relies on Spring AOP proxies. It fails if the proxy is bypassed (like self-invocation) or if a checked exception is thrown.",
      "explain": "If you call a @Transactional method from another method inside the exact same class, it bypasses the Spring proxy completely. Also, by default, Spring only rolls back for RuntimeExceptions (unchecked), not for Checked exceptions.",
      "example": "\"The most common reason is self-invocation. If I call a @Transactional method from within the same class, no transaction is created. It also won't work if the method isn't public. Finally, checked exceptions silently commit unless I explicitly add rollbackFor = Exception.class.\"",
      "summary10s": "Self-invocation bypasses the proxy. Checked exceptions don't auto-rollback by default."
    }
  },
  {
    "id": "spring-kafka-exactly-once",
    "category": "Microservices",
    "question": "How do you achieve exactly-once payment processing with Kafka and Spring Boot?",
    "frequency": 5,
    "companies": [
      "Paytm",
      "PhonePe",
      "Razorpay"
    ],
    "variations": [
      "How to handle duplicate messages in Kafka?"
    ],
    "answerSEE": {
      "simple": "True exactly-once is hard. We design for \"effectively-once\" using an idempotent producer and a unique transaction ID on the consumer side.",
      "explain": "On the producer side, we enable Kafka's transactional API to avoid duplicate publishes. On the consumer side, we store a unique idempotency key (like a transaction ID) in the database with a UNIQUE constraint to prevent double processing.",
      "example": "\"Since true exactly-once is very hard end-to-end, I design for effectively-once. On the producer, I enable the idempotent producer flag. On the consumer, I store a unique transaction ID in the DB. Even if a message is redelivered, the duplicate DB insert fails safely. I usually combine this with the Outbox pattern.\"",
      "summary10s": "Idempotent producer + unique transaction ID DB check + Outbox pattern = effectively-once."
    }
  },
  {
    "id": "system-design-422-vs-500",
    "category": "System Design",
    "question": "When should you return 422 vs 500, and how does it affect retries?",
    "frequency": 4,
    "companies": [
      "Uber",
      "Swiggy"
    ],
    "variations": [
      "How to design safe API retries?"
    ],
    "answerSEE": {
      "simple": "Use 422 for business logic validation failures (do not retry). Use 500 for unexpected server errors (safe to retry).",
      "explain": "A 422 means the client sent valid JSON but it failed a business rule (like end date before start date). A 500 means the server crashed unexpectedly. Clients should only retry 500s, and they must use an idempotency key to prevent duplicate actions.",
      "example": "\"I return a 422 when the request is syntactically correct but fails a business rule, because retrying it will just fail again. 500 is reserved for unexpected server crashes. To make retrying a 500 safe, especially for POST requests, I require the client to send an idempotency key header.\"",
      "summary10s": "422 = bad request/don't retry. 500 = server error/safe to retry with idempotency key."
    }
  },
  {
    "id": "system-design-put-vs-patch",
    "category": "System Design",
    "question": "Difference between PUT and PATCH? How to make PATCH idempotent?",
    "frequency": 7,
    "companies": [
      "Atlassian",
      "Microsoft",
      "Flipkart"
    ],
    "variations": [
      "Are all REST methods idempotent?"
    ],
    "answerSEE": {
      "simple": "PUT replaces the entire resource and is always idempotent. PATCH updates partial fields and is not inherently idempotent.",
      "explain": "Sending the same PUT request multiple times results in the same final state. PATCH is only idempotent if you set absolute values. If a PATCH request says \"increment counter by 1\", running it twice gives a different result, breaking idempotency.",
      "example": "\"PUT is meant to replace the whole resource, so it is naturally idempotent. PATCH updates specific fields. To keep PATCH idempotent, I make sure the updates are absolute value assignments (like setting status to ACTIVE) rather than relative operations (like increment by 1).\"",
      "summary10s": "PUT = full replace (always idempotent). PATCH = partial update (idempotent only if setting absolute values)."
    }
  },
  {
    "id": "angular-parent-child-comm",
    "category": "Angular",
    "question": "Parent-Child Communication in Angular",
    "frequency": 2,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "How do you communicate between parent and child components?"
    ],
    "answerSEE": {
      "simple": "Besides @Input()/@Output(), components can communicate via a shared service, ViewChild, or template reference variables.",
      "explain": "@Input()/@Output() — direct parent-child, most common\nShared Service with RxJS Subject/BehaviorSubject — for sibling or distant component communication\n@ViewChild() — parent directly accesses child component's properties/methods\nTemplate reference variables — parent template accesses child directly in HTML",
      "example": "\"The most common way is @Input() for passing data down and @Output() with EventEmitter for sending data up. Beyond that, I use a shared service with a BehaviorSubject when components aren't directly related, like siblings. I've also used @ViewChild() when a parent needs to directly call a method on a child component instance, like triggering a reset.\"",
      "summary10s": "@Input/@Output for direct, shared service for distant, @ViewChild for direct access."
    }
  },
  {
    "id": "angular-standalone-components",
    "category": "Angular",
    "question": "Standalone Components",
    "frequency": 3,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "What is the difference between Standalone Components and NgModules?"
    ],
    "answerSEE": {
      "simple": "Standalone components don't need to be declared in an NgModule — they manage their own dependencies directly.",
      "explain": "Set standalone: true, import dependencies directly in the component's imports array\nReduces boilerplate — no need for NgModules for every feature\nSimplifies lazy loading — can lazy-load a component directly, not just a module",
      "example": "\"Standalone components let us skip NgModules entirely — the component declares its own dependencies directly in its imports array. This reduces a lot of boilerplate we used to write with NgModules for every small feature. I've used this for lazy-loading individual components directly via the router, which simplifies the module structure a lot in newer Angular projects.\"",
      "summary10s": "No NgModule needed — component manages its own imports directly."
    }
  },
  {
    "id": "angular-onpush-change-detection",
    "category": "Angular",
    "question": "Default vs OnPush Change Detection",
    "frequency": 3,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "What is Change Detection in Angular? Explain OnPush strategy."
    ],
    "answerSEE": {
      "simple": "Default checks the entire component tree on every event; OnPush only checks when an Input reference changes or an event fires within it.",
      "explain": "Default — Angular checks all components on every browser event, timer, or async operation (can be expensive)\nOnPush — only re-checks when @Input() reference changes, an event originates inside the component, or an Observable (via async pipe) emits\nOnPush requires immutable data patterns (new object reference, not mutation) to trigger detection",
      "example": "\"Default change detection checks the entire component tree on every possible event, which can get expensive in large apps. OnPush only triggers a check when the Input reference actually changes, an event happens inside that component, or an observable through the async pipe emits. To use OnPush correctly, I make sure to treat data immutably — passing a new object reference instead of mutating the existing one — otherwise Angular won't detect the change.\"",
      "summary10s": "Default = checks everything, OnPush = checks only on Input reference change/local event."
    }
  },
  {
    "id": "angular-dependency-injection",
    "category": "Angular",
    "question": "Dependency Injection",
    "frequency": 3,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "What is Dependency Injection in Angular? Explain the different provider scopes."
    ],
    "answerSEE": {
      "simple": "DI means Angular provides a class's dependencies instead of the class creating them itself.",
      "explain": "Angular's injector creates and provides service instances automatically\nReduces tight coupling, makes components easier to test\nInjected via constructor, using providedIn: 'root' for singleton services",
      "example": "\"Dependency Injection in Angular means I don't manually create service instances inside a component — Angular's injector provides them automatically through the constructor. This makes testing much easier since I can inject mock services. I typically use providedIn: 'root' so the service becomes a singleton, shared across the whole application.\"",
      "summary10s": "Angular injects dependencies via constructor — don't create with new."
    }
  },
  {
    "id": "angular-why-injectable",
    "category": "Angular",
    "question": "Why @Injectable()?",
    "frequency": 1,
    "companies": [
      "Deloitte"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "@Injectable() marks a class as available to be injected and lets it inject other dependencies itself.",
      "explain": "Tells Angular's DI system this class can be provided/injected\nRequired if the service itself has constructor dependencies (needs metadata to resolve them)\nWorks with providedIn to register the service with the injector",
      "example": "\"@Injectable() tells Angular that this class participates in the dependency injection system — it can be injected into other classes, and it can also have its own dependencies injected into its constructor. It's what allows Angular to generate the metadata needed to resolve those constructor dependencies. Along with providedIn: 'root', it registers the service with Angular's root injector.\"",
      "summary10s": "Marks class as injectable — needed to resolve its own constructor dependencies."
    }
  },
  {
    "id": "angular-remove-injectable",
    "category": "Angular",
    "question": "What if we remove @Injectable()?",
    "frequency": 1,
    "companies": [
      "Deloitte"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "If the service has no constructor dependencies, it may still work; but if it depends on other injected services, DI will fail.",
      "explain": "Without @Injectable(), Angular can't generate the metadata needed to inject dependencies into that service's constructor\nA simple service with no dependencies might still get injected in some cases, but it's not reliable practice\nBest practice: always add @Injectable() explicitly, especially once TypeScript decorators/metadata are involved",
      "example": "\"If I remove @Injectable() from a service that itself depends on other injected services, Angular won't be able to resolve those constructor dependencies, and I'll get a runtime DI error. If the service has zero dependencies, it might technically still work in some Angular versions, but it's not something I'd rely on — I always add @Injectable() explicitly as best practice.\"",
      "summary10s": "Without it, Angular can't resolve the service's own injected dependencies — causes DI errors."
    }
  },
  {
    "id": "js-dependencies-vs-devdependencies",
    "category": "JavaScript",
    "question": "dependencies vs devDependencies",
    "frequency": 1,
    "companies": [
      "Deloitte"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "dependencies are needed to run the app in production; devDependencies are only needed during development/build.",
      "explain": "dependencies — libraries bundled into the production build (e.g., Angular core, RxJS)\ndevDependencies — tools used only during development (e.g., testing libraries, linters, TypeScript compiler)\nRunning npm install --production skips devDependencies",
      "example": "\"dependencies are the packages actually needed at runtime, bundled into the production build — things like Angular itself or RxJS. devDependencies are only needed during development, like testing frameworks, ESLint, or build tools — they're not shipped in the final production bundle. This distinction matters for keeping the production build lean and for CI/CD pipelines that install only what's needed.\"",
      "summary10s": "dependencies = needed at runtime, devDependencies = only for development/build."
    }
  },
  {
    "id": "angular-http-interceptors",
    "category": "Angular",
    "question": "Angular HTTP Interceptors",
    "frequency": 2,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "What is an HTTP Interceptor in Angular? Where would you use it?"
    ],
    "answerSEE": {
      "simple": "Interceptors let you intercept and modify HTTP requests/responses globally before they're sent or after they're received.",
      "explain": "Implement HttpInterceptor interface, override intercept() method\nCommon uses: attaching auth tokens, logging, error handling, loading spinners\nRegistered in providers array (or functional interceptors in newer Angular)",
      "example": "\"HTTP Interceptors let me hook into every outgoing HTTP request or incoming response globally, without touching individual service calls. I implement the intercept() method, clone the request to modify it, and pass it along the chain. I've used them for automatically attaching a JWT token to every request's Authorization header, and for centralized error handling, like redirecting to login on a 401 response.\"",
      "summary10s": "Intercepts every HTTP request/response globally — implement intercept()."
    }
  },
  {
    "id": "angular-interceptor-usecase",
    "category": "Angular",
    "question": "Interceptor real-time use case",
    "frequency": 2,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "How do you handle API errors globally in Angular?"
    ],
    "answerSEE": {
      "simple": "Attaching JWT auth tokens automatically and handling global error responses are the most common real-world uses.",
      "explain": "Auth Interceptor — attaches Authorization: Bearer <token> to every outgoing request automatically\nError Interceptor — catches 401/403 globally, redirects to login or refreshes token\nLoading Interceptor — shows/hides a global spinner based on active requests",
      "example": "\"In my project, I implemented an Auth Interceptor that automatically attached the JWT token from local storage to every outgoing HTTP request, so I didn't have to add it manually in every service call. I also built an Error Interceptor that caught 401 responses globally and redirected the user to the login page, and a Loading Interceptor that showed a spinner whenever there were active HTTP requests in flight.\"",
      "summary10s": "Auth token attachment + global error handling — the two most common real uses."
    }
  },
  {
    "id": "angular-lazy-loading",
    "category": "Angular",
    "question": "Lazy Loading",
    "frequency": 2,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "What is Lazy Loading in Angular and why is it important?"
    ],
    "answerSEE": {
      "simple": "Lazy Loading loads feature modules only when the user navigates to that route, instead of loading everything upfront.",
      "explain": "Reduces initial bundle size — faster first load\nConfigured via loadChildren in routing (or loadComponent for standalone components)\nImproves performance, especially for large apps with many features",
      "example": "\"Lazy Loading means a feature module or component isn't loaded until the user actually navigates to that route, instead of bundling everything into the initial load. I configure this using loadChildren in the routing module, or loadComponent for standalone components. This significantly reduced our initial bundle size and improved first-load performance in a large application with many modules.\"",
      "summary10s": "Load modules only when navigated to — via loadChildren, reduces initial bundle size."
    }
  },
  {
    "id": "angular-route-guards",
    "category": "Angular",
    "question": "Route Guards",
    "frequency": 3,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "What is a Route Guard? How do you protect authenticated routes?"
    ],
    "answerSEE": {
      "simple": "Route Guards control whether a user is allowed to navigate to, away from, or load a specific route.",
      "explain": "CanActivate — controls if a route can be entered (e.g., auth check)\nCanDeactivate — controls if user can leave a route (e.g., unsaved changes warning)\nCanLoad/CanMatch — controls if a lazy module is loaded/matched at all (blocks even downloading the chunk)\nResolve — pre-fetches data before the route activates, so the component loads with data ready",
      "example": "\"Route Guards control navigation behavior. CanActivate is the most common — I use it to check if a user is authenticated before entering a route. CanDeactivate is useful for warning users about unsaved changes when they try to leave a form. CanMatch, which replaced CanLoad, prevents even downloading the lazy-loaded chunk if the guard fails. And Resolve is different — it pre-fetches data before the route activates, so my component doesn't render with a loading state.\"",
      "summary10s": "CanActivate=entry, CanDeactivate=exit, CanMatch=blocks lazy load, Resolve=prefetch data."
    }
  },
  {
    "id": "angular-subject-vs-behaviorsubject",
    "category": "Angular",
    "question": "Subject vs BehaviorSubject",
    "frequency": 1,
    "companies": [
      "Deloitte"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Subject has no initial value and doesn't replay past values; BehaviorSubject requires an initial value and always gives the latest value to new subscribers.",
      "explain": "Subject — new subscribers get nothing until the next emission\nBehaviorSubject — requires an initial value, new subscribers immediately get the current/last emitted value\nBehaviorSubject has .value property to synchronously get the current value",
      "example": "\"A Subject doesn't hold any value — if I subscribe late, I miss everything emitted before I subscribed. BehaviorSubject requires an initial value and always gives new subscribers the most recently emitted value immediately upon subscription. I use BehaviorSubject a lot for things like storing the current logged-in user state, where any component that subscribes later still needs the current value right away.\"",
      "summary10s": "Subject = no initial/replay value, BehaviorSubject = has initial value, replays latest to new subscribers."
    }
  },
  {
    "id": "js-callback-hell",
    "category": "JavaScript",
    "question": "Callback Hell",
    "frequency": 1,
    "companies": [
      "Deloitte"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Callback Hell is deeply nested callbacks that make async code hard to read and maintain.",
      "explain": "Happens when multiple async operations depend on each other, each nested inside the previous callback\nLeads to \"pyramid of doom\" — hard to read, debug, and handle errors\nAvoided using Promises (.then() chaining) or async/await, or RxJS operators like switchMap in Angular",
      "example": "\"Callback Hell happens when you have multiple asynchronous operations that depend on each other, each nested inside the previous one's callback, creating deeply indented, hard-to-read code. I avoid it by using Promises with proper chaining, or async/await for cleaner sequential-looking code. In Angular specifically, I use RxJS operators like switchMap or mergeMap to flatten dependent HTTP calls instead of nesting subscriptions.\"",
      "summary10s": "Nested callbacks = hard to read. Fix with async/await or RxJS switchMap."
    }
  },
  {
    "id": "js-promises-vs-observables",
    "category": "Angular",
    "question": "Promises vs Observables",
    "frequency": 3,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "What is the difference between Observable and Promise?"
    ],
    "answerSEE": {
      "simple": "Promises handle a single async value and execute eagerly; Observables handle multiple values over time and are lazy.",
      "explain": "Promise — resolves once, executes immediately upon creation, not cancellable\nObservable — can emit multiple values over time, lazy (doesn't run until subscribed), cancellable via unsubscribe\nObservables support powerful operators (map, filter, switchMap) for transforming streams",
      "example": "\"A Promise handles a single asynchronous value and starts executing immediately when created, and it can't be cancelled. An Observable can emit multiple values over time, it's lazy — meaning it doesn't execute until something subscribes to it — and it's cancellable via unsubscribe. In Angular, I prefer Observables for HTTP calls because I get access to powerful operators like switchMap for cancelling a previous in-flight request when a new one comes in, like in a search-as-you-type feature.\"",
      "summary10s": "Promise = single value, eager, not cancellable. Observable = multiple values, lazy, cancellable."
    }
  },
  {
    "id": "js-closure",
    "category": "JavaScript",
    "question": "Closure in JavaScript",
    "frequency": 1,
    "companies": [
      "Deloitte"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "A closure is a function that remembers and can access variables from its outer scope, even after that outer function has finished executing.",
      "explain": "Inner function retains a reference to its lexical (outer) scope's variables\nCommonly used for data privacy/encapsulation and creating factory functions\nThe outer variable isn't garbage collected as long as the inner function still references it",
      "example": "\"A closure is when an inner function retains access to variables from its outer function's scope, even after the outer function has already returned. This is really useful for creating private state, like a counter function where count can't be accessed directly from outside, only through the returned function. I've used this pattern for things like creating memoized or debounced utility functions.\"",
      "summary10s": "Inner function remembers outer function's variables even after it returns."
    }
  },
  {
    "id": "angular-versions-worked-on",
    "category": "Angular",
    "question": "Angular versions worked on",
    "frequency": 1,
    "companies": [
      "Virtusa"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "State your actual experience range, latest being Angular 18.",
      "explain": "Mention range (e.g., Angular 12 → 18)\nHighlight familiarity with newer features (standalone components, signals)\nShows adaptability to version upgrades",
      "example": "\"I've worked across several Angular versions, starting from Angular 12 in earlier projects up to Angular 18 in my current one. With Angular 18, I've been using standalone components and getting hands-on with Signals for state management, which is a shift from the traditional RxJS-heavy approach I used in older versions.\"",
      "summary10s": "State your actual range — mention latest = Angular 18, standalone components/signals."
    }
  },
  {
    "id": "angular-micro-frontends",
    "category": "Angular",
    "question": "Micro Frontends",
    "frequency": 1,
    "companies": [
      "Virtusa"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Micro Frontends split a large frontend application into smaller, independently deployable pieces, each owned by a different team.",
      "explain": "Each MFE can be built, deployed, and versioned independently\nComposed together at runtime (or build time) into one cohesive application\nCommon implementation: Webpack Module Federation",
      "example": "\"Micro Frontends apply the microservices idea to the frontend — instead of one large monolithic Angular app, we split it into smaller, independently deployable applications, often owned by different teams, and compose them together into a single user experience. I've worked with this using Webpack Module Federation, where a shell application loads remote modules at runtime.\"",
      "summary10s": "Split a large frontend into independently deployable pieces — composed via Module Federation."
    }
  },
  {
    "id": "angular-mfe-communication",
    "category": "Angular",
    "question": "How do two Micro Frontends communicate?",
    "frequency": 1,
    "companies": [
      "Virtusa"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Through a shared event bus, custom browser events, shared state service, or URL/query params.",
      "explain": "Custom Events (window.dispatchEvent/addEventListener) — simple, decoupled, works across frameworks\nShared state via a common service exposed through Module Federation, or a shared library\nQuery params/routing state for loosely coupled navigation-based communication",
      "example": "\"The simplest way I've used is custom browser events — one MFE dispatches a custom event, and another listens for it, which keeps them loosely coupled since neither needs to know about the other's internals. I've also used a shared singleton service exposed through Module Federation when the MFEs are both Angular and need tighter, more structured communication.\"",
      "summary10s": "Custom events (loose coupling) or shared service via Module Federation (tighter coupling)."
    }
  },
  {
    "id": "angular-lifecycle-hooks-count",
    "category": "Angular",
    "question": "How many Angular Lifecycle Hooks are there?",
    "frequency": 2,
    "companies": [
      "Virtusa"
    ],
    "variations": [
      "Explain Angular Component Lifecycle Hooks. Which hooks have you used in real projects?"
    ],
    "answerSEE": {
      "simple": "There are 8 lifecycle hooks in Angular components.",
      "explain": "Creation: ngOnChanges, ngOnInit\nUpdate/Check: ngDoCheck, ngAfterContentInit, ngAfterContentChecked, ngAfterViewInit, ngAfterViewChecked\nDestruction: ngOnDestroy",
      "example": "\"There are 8 lifecycle hooks — ngOnChanges and ngOnInit run during creation, ngDoCheck and the AfterContent/AfterView hooks run during the change detection cycle, and ngOnDestroy runs at the end for cleanup. In practice, I mostly work with ngOnInit, ngOnChanges, and ngOnDestroy on a daily basis.\"",
      "summary10s": "8 hooks — most used: ngOnInit, ngOnChanges, ngOnDestroy."
    }
  },
  {
    "id": "angular-lifecycle-api-calls",
    "category": "Angular",
    "question": "Which lifecycle hook for API calls, and why?",
    "frequency": 1,
    "companies": [
      "Virtusa"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "ngOnInit — because it runs once the component's inputs are initialized and ready.",
      "explain": "Constructor runs before Angular sets @Input() bindings — not safe to use them yet\nngOnInit runs after the first ngOnChanges, so inputs are guaranteed to be available\nKeeps the constructor lightweight (only for dependency injection)",
      "example": "\"I always call API requests in ngOnInit, not the constructor, because by the time ngOnInit runs, Angular has already set any @Input() bindings on the component, so I can safely use them in my API call. The constructor should only be used for dependency injection — putting logic like API calls there is a common anti-pattern since inputs aren't guaranteed to be set yet.\"",
      "summary10s": "ngOnInit — inputs are guaranteed set by then, constructor is only for DI."
    }
  },
  {
    "id": "angular-constructor-vs-ngoninit",
    "category": "Angular",
    "question": "Constructor vs ngOnInit()",
    "frequency": 1,
    "companies": [
      "Virtusa"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Constructor is for dependency injection; ngOnInit is for component initialization logic.",
      "explain": "Constructor — called by JavaScript/TypeScript when the class is instantiated, before Angular sets Inputs\nngOnInit — called by Angular after the first change detection cycle, Inputs are guaranteed available\nBest practice: keep constructor minimal, do actual setup logic in ngOnInit",
      "example": "\"The constructor is a plain TypeScript/JavaScript concept, used purely for injecting dependencies, and it runs before Angular has set any @Input() properties. ngOnInit is an Angular-specific lifecycle hook that runs after Angular has initialized the component's inputs, so that's where I put actual initialization logic, like calling an API or setting up initial state.\"",
      "summary10s": "Constructor = DI only, ngOnInit = init logic (inputs guaranteed ready)."
    }
  },
  {
    "id": "angular-directives",
    "category": "Angular",
    "question": "What are Directives?",
    "frequency": 1,
    "companies": [
      "Virtusa"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Directives are classes that let you add behavior or modify the DOM structure/appearance of elements.",
      "explain": "Component — a directive with a template (special case)\nStructural — changes DOM layout (*ngIf, *ngFor, @if/@for in new syntax)\nAttribute — changes appearance/behavior of an element (ngClass, ngStyle, custom ones)",
      "example": "\"Directives let me add custom behavior to DOM elements without creating a full component. There are three types — Components, which are really directives with a template; Structural directives like ngIf and ngFor that change the DOM layout by adding or removing elements; and Attribute directives like ngClass or ngStyle that change how an element looks or behaves without altering the DOM structure.\"",
      "summary10s": "3 types: Component, Structural (*ngIf/*ngFor), Attribute (ngClass/ngStyle)."
    }
  },
  {
    "id": "angular-custom-directives",
    "category": "Angular",
    "question": "Custom Directives",
    "frequency": 1,
    "companies": [
      "Virtusa"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Yes — created for reusable DOM behavior not covered by built-in directives.",
      "explain": "Attribute directive example: highlight-on-hover, auto-focus, restrict input to numbers only\nUses @Directive decorator with a selector, injects ElementRef/Renderer2 to manipulate the DOM\nEncapsulates reusable behavior across multiple components without duplicating code",
      "example": "\"Yes, I've created custom attribute directives — one example was a numeric-only input directive that restricted a text field to accept only digits, which I reused across multiple forms instead of duplicating the validation logic. I used the @Directive decorator with a selector, and injected ElementRef and Renderer2 to safely manipulate the DOM element's behavior.\"",
      "summary10s": "Custom @Directive using ElementRef/Renderer2 for reusable DOM behavior."
    }
  },
  {
    "id": "angular-reactive-forms",
    "category": "Angular",
    "question": "Reactive Forms",
    "frequency": 1,
    "companies": [
      "Virtusa"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Reactive Forms build the form model programmatically in the component class using FormGroup/FormControl.",
      "explain": "Form structure/validation defined in TypeScript, not the template\nMore testable — form logic is in the component, easy to unit test\nBetter for complex, dynamic forms (conditional fields, dynamic validation)",
      "example": "\"Reactive Forms let me define the form structure and validation programmatically in the component class using FormGroup and FormControl, rather than in the template. This makes them much easier to unit test since the form logic lives in TypeScript, and they're better suited for complex, dynamic forms where fields or validation rules change based on other inputs.\"",
      "summary10s": "Form model built in component class (FormGroup/FormControl) — testable, good for complex forms."
    }
  },
  {
    "id": "angular-reactive-vs-template-forms",
    "category": "Angular",
    "question": "Reactive Forms vs Template-driven Forms",
    "frequency": 2,
    "companies": [
      "Virtusa"
    ],
    "variations": [
      "What is the difference between Template-driven and Reactive Forms?"
    ],
    "answerSEE": {
      "simple": "Reactive Forms are defined in code and are more scalable; Template-driven Forms are defined in the HTML template and are simpler for basic forms.",
      "explain": "Reactive — explicit, synchronous, form model in TypeScript, better for complex/dynamic forms\nTemplate-driven — uses ngModel, form model created implicitly by Angular, simpler for basic use cases\nReactive Forms are generally preferred in larger, enterprise-scale applications",
      "example": "\"Reactive Forms define the form model explicitly in the component using FormGroup, giving me more control and making it easier to handle complex validation or dynamic fields. Template-driven Forms use ngModel directly in the template, and Angular creates the form model implicitly behind the scenes, which is simpler for basic forms but harder to scale. In most of my projects, especially anything enterprise-level, I default to Reactive Forms.\"",
      "summary10s": "Reactive = explicit/code-based, scalable. Template-driven = implicit/ngModel, simple forms only."
    }
  },
  {
    "id": "angular-dynamic-form-rendering",
    "category": "JS Coding",
    "question": "Coding: Dynamically render form controls based on \"type\"",
    "frequency": 1,
    "companies": [
      "Virtusa"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Loop through the field config array and use an @switch/*ngIf chain (or ngSwitch) on the type property to render the matching control.",
      "explain": "Approach: Define a fields array with type, label, formControlName. In the template, iterate with @for and use @switch on field.type to render the right input element, bound via Reactive Forms.\n// TypeScript\nfields = [{ type: 'text', label: 'Name', controlName: 'name' }, ...];\nform = this.fb.group({ name: [''] });\n// HTML\n<form [formGroup]=\"form\">\n  @for (field of fields; track field.controlName) {\n    @switch (field.type) {\n      @case ('text') { <input [formControlName]=\"field.controlName\" /> }\n    }\n  }\n</form>",
      "example": "\"I'd model each field as a config object with a type, label, and formControlName, stored in an array. In the template, I loop through that array and use a switch statement on the type property to render the matching control — text input, dropdown, or date picker — all bound to the same Reactive Form. This makes the form fully data-driven, so adding a new field type is just adding a new config entry and a new case in the switch.\"",
      "summary10s": "Config-driven array + @switch on type → renders matching control, bound via Reactive Forms."
    }
  },
  {
    "id": "angular-signals-vs-subject",
    "category": "Angular",
    "question": "Signals vs Subject",
    "frequency": 2,
    "companies": [
      "Virtusa"
    ],
    "variations": [
      "What are Angular Signals? How are Signals different from RxJS Observables?"
    ],
    "answerSEE": {
      "simple": "Signals are Angular's built-in, synchronous reactive primitive with automatic dependency tracking; Subject is RxJS's manual, stream-based way to push values to subscribers.",
      "explain": "Signals — synchronous read (signal()), automatically triggers change detection when used in templates, no subscribe/unsubscribe needed\nSubject — asynchronous stream, requires explicit .subscribe(), manual unsubscribe to avoid memory leaks\nSignals are simpler for local component state; RxJS/Subject still better for complex async operations (debounce, switchMap, combining streams)",
      "example": "\"Signals are Angular's newer, built-in reactivity primitive — I just call the signal like a function to read its value, and Angular automatically tracks dependencies and updates the view, no subscribe or unsubscribe needed. A Subject, from RxJS, is a stream that requires explicit subscription and manual cleanup to avoid memory leaks. I'm shifting toward Signals for simple local component state, but I still reach for RxJS and Subjects for complex async operations like debounced search or combining multiple streams.\"",
      "summary10s": "Signals = sync, auto-tracked, no subscribe. Subject = async stream, needs subscribe/unsubscribe."
    }
  },
  {
    "id": "angular-unit-test-cases",
    "category": "Angular",
    "question": "Unit Test Cases (Jasmine/Karma)",
    "frequency": 1,
    "companies": [
      "Virtusa"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Yes — used Jasmine/Karma to test component logic, service methods, and API interactions.",
      "explain": "Component tests — verify UI logic, event handlers, and property bindings using TestBed\nService tests — mock HTTP calls using HttpClientTestingModule/HttpTestingController\nCoverage — form validation logic, conditional rendering, and error-handling paths",
      "example": "\"Yes, I've written unit tests using Jasmine and Karma. For components, I used TestBed to test things like button click handlers and conditional UI rendering based on component state. For services, I used HttpClientTestingModule with HttpTestingController to mock API calls and verify the service handled both success and error responses correctly. I also tested form validation logic, making sure the right error messages appeared for invalid inputs.\"",
      "summary10s": "TestBed for components, HttpClientTestingModule for services — tested logic, validation, API handling."
    }
  },
  {
    "id": "angular-rxjs-what-and-why",
    "category": "Angular",
    "question": "What is RxJS and Why Does Angular Use It?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "RxJS handles async data as streams so Angular can react to changes cleanly.",
      "explain": "Everything in Angular is async — HTTP calls, user events, routing\nRxJS handles all of these with one consistent pattern — Observables\nOperators like map, filter, switchMap transform streams without callbacks\nAngular uses it in HttpClient, Router, Forms everywhere internally",
      "example": "\"RxJS gives Angular one consistent way to handle all async operations. Instead of mixing Promises, callbacks, and event listeners, everything becomes an Observable stream. I can transform, combine, and control data using operators. Angular itself uses RxJS internally in HttpClient, Router, and Reactive Forms.\"",
      "summary10s": "RxJS = one pattern for all async using streams and operators."
    }
  },
  {
    "id": "angular-subject-vs-observable",
    "category": "Angular",
    "question": "Subject vs Observable",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Observable is read-only, Subject can both emit and be subscribed to.",
      "explain": "Observable — you only subscribe to it, cannot push values from outside\nSubject — you can call next() to push values and subscribe to receive them\nSubject is hot — all subscribers share same stream\nUsed for cross-component communication and event broadcasting",
      "example": "\"Observable is one-directional — I can only subscribe and receive. Subject is two-directional — I can push values using next() and also subscribe to it. Subject is hot so all subscribers get the same emission. I use Subject when I need to manually trigger events across components.\"",
      "summary10s": "Observable=receive only, Subject=push and receive, hot shared stream."
    }
  },
  {
    "id": "angular-behaviorsubject-vs-replaysubject-vs-asyncsubject",
    "category": "Angular",
    "question": "BehaviorSubject vs ReplaySubject vs AsyncSubject",
    "frequency": 2,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "BehaviorSubject holds current value, ReplaySubject holds history, AsyncSubject holds last value on complete.",
      "explain": "BehaviorSubject — needs initial value, new subscriber gets latest value immediately\nReplaySubject — buffers last N values, replays all to new subscriber\nAsyncSubject — emits only last value and only when complete is called\nUse BehaviorSubject for state, ReplaySubject for history, AsyncSubject rarely",
      "example": "\"BehaviorSubject is my go-to for shared state because any new subscriber immediately gets the current value. ReplaySubject is for scenarios like chat history where late subscribers need recent past values. AsyncSubject I rarely use — it only emits the last value after complete, behaving like a Promise.\"",
      "summary10s": "BehaviorSubject=current state, ReplaySubject=history, AsyncSubject=last on complete."
    }
  },
  {
    "id": "angular-switchmap-what-does-it-do",
    "category": "Angular",
    "question": "What Does switchMap Do?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "switchMap cancels previous inner Observable and switches to the new one.",
      "explain": "Each emission triggers a new inner Observable like an API call\nIf new emission arrives before previous completes, previous is cancelled\nOnly latest inner Observable result is used\nPerfect for search — only care about latest typed value",
      "example": "\"switchMap is used when each value from a stream triggers a new async operation and only the latest matters. In a search box, when user types fast, I do not want results from old requests overwriting latest. switchMap automatically cancels the old API call and switches to the new one. Only latest result reaches the template.\"",
      "summary10s": "switchMap=cancel old, switch to latest, perfect for search."
    }
  },
  {
    "id": "angular-switchmap-vs-mergemap-vs-concatmap-vs-exhaustmap",
    "category": "Angular",
    "question": "switchMap vs mergeMap vs concatMap vs exhaustMap",
    "frequency": 3,
    "companies": [],
    "variations": [
      "Explain RxJS operators like switchMap, mergeMap, concatMap and forkJoin."
    ],
    "answerSEE": {
      "simple": "switch cancels old, merge runs all together, concat queues one by one, exhaust ignores new while busy.",
      "explain": "switchMap — cancel previous, use latest. Search autocomplete\nmergeMap — all run in parallel, results as they arrive. Parallel API calls\nconcatMap — one at a time in order. Sequential saves or uploads\nexhaustMap — ignore new while current running. Login button, form submit",
      "example": "\"I choose based on what should happen when a new emission arrives before the previous completes. For search I use switchMap to cancel old requests. For parallel independent calls I use mergeMap. For ordered sequential operations like saving steps I use concatMap. For preventing double submit on a login button I use exhaustMap.\"",
      "summary10s": "switch=cancel, merge=parallel, concat=queue, exhaust=ignore while busy."
    }
  },
  {
    "id": "angular-debouncetime",
    "category": "Angular",
    "question": "What is debounceTime?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "debounceTime waits for silence before emitting, preventing too many rapid emissions.",
      "explain": "Resets timer every time a new value arrives\nOnly emits after specified silence period passes\nPrevents API call on every single keystroke in search\nUsually combined with distinctUntilChanged to skip unchanged values",
      "example": "\"debounceTime solves the problem of too many rapid events. In a search box without debounce, every keystroke fires an API call. With debounceTime(300), it waits until user stops typing for 300ms before emitting. This reduces API calls from hundreds to just a few. I always combine it with distinctUntilChanged to skip duplicate values.\"",
      "summary10s": "debounceTime=wait for silence, emit last value, reduces rapid API calls."
    }
  },
  {
    "id": "angular-takeuntil",
    "category": "Angular",
    "question": "What is takeUntil?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "takeUntil keeps subscription alive until a notifier Observable emits, then auto-completes.",
      "explain": "Create destroy$ Subject in component\nPipe all subscriptions with takeUntil(this.destroy$)\nIn ngOnDestroy call destroy$.next()\nAll subscriptions auto-complete, no memory leak",
      "example": "\"takeUntil is my standard pattern for preventing memory leaks in Angular components. I create a destroy$ Subject, add takeUntil(this.destroy$) to every subscription, and in ngOnDestroy I call destroy$.next(). When component is destroyed, all subscriptions complete automatically. In Angular 16 plus I use takeUntilDestroyed which is even cleaner.\"",
      "summary10s": "takeUntil=auto-complete on destroy$, prevents memory leaks."
    }
  },
  {
    "id": "angular-how-to-unsubscribe",
    "category": "Angular",
    "question": "How to Unsubscribe? What Happens If You Don't?",
    "frequency": 2,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Not unsubscribing from infinite Observables causes memory leaks.",
      "explain": "Finite — HTTP calls, forkJoin auto-complete, no action needed\nInfinite — interval, Subject, fromEvent never complete, must unsubscribe\nMemory leak — stream runs after component destroyed, holds reference, GC cannot collect\nFix — async pipe, takeUntil, or takeUntilDestroyed",
      "example": "\"HTTP calls auto-complete so they are safe. But infinite streams like interval or Subject keep running even after component is destroyed. The subscription holds a reference to the component preventing garbage collection — that is a memory leak. I always use async pipe in templates or takeUntil pattern in ts files to handle this.\"",
      "summary10s": "HTTP=auto-complete safe, infinite=must unsubscribe, use async pipe or takeUntil."
    }
  },
  {
    "id": "angular-async-pipe-vs-manual",
    "category": "Angular",
    "question": "Async Pipe vs Manual Subscription",
    "frequency": 2,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Async pipe auto-subscribes and auto-unsubscribes, no cleanup code needed.",
      "explain": "Manual subscribe needs ngOnDestroy and unsubscribe logic\nAsync pipe handles everything automatically when component destroys\nAlso triggers change detection correctly with OnPush strategy\nCleaner template, zero boilerplate",
      "example": "\"Async pipe is better because it manages the full subscription lifecycle automatically. With manual subscribe I have to remember to unsubscribe in ngOnDestroy or risk memory leaks. Async pipe also works perfectly with OnPush change detection which manual subscriptions often break. It is less code and safer.\"",
      "summary10s": "Async pipe=auto subscribe, auto unsubscribe, works with OnPush."
    }
  },
  {
    "id": "angular-combinelatest",
    "category": "Angular",
    "question": "What is combineLatest?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "combineLatest emits whenever any source emits, combining latest value from each source.",
      "explain": "Waits for all sources to emit at least once before emitting\nAfter that emits on every change from any source\nCombines latest values from all sources into one array\nUse for dependent filters — any filter changes triggers new combined emission",
      "example": "\"combineLatest is perfect for reactive filter scenarios. If I have three filter dropdowns — category, price, sort — I combine all three with combineLatest. Whenever user changes any filter, combineLatest emits the latest value of all three together and I use switchMap to fire a new API call with all current filter values.\"",
      "summary10s": "combineLatest=emit on any change, combine all latest values, use for filters."
    }
  },
  {
    "id": "angular-combinelatest-vs-forkjoin-vs-zip",
    "category": "Angular",
    "question": "combineLatest vs forkJoin vs zip",
    "frequency": 2,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "forkJoin waits for all to complete, combineLatest reacts to any change, zip pairs by position.",
      "explain": "forkJoin — all must complete, emits once with all last values. Page load multiple APIs\ncombineLatest — emits on any source change after all emitted once. Reactive filters\nzip — pairs values by index position. Rarely used, for positional pairing",
      "example": "\"I use forkJoin when I need to fire multiple API calls on page load and wait for all to complete before rendering. I use combineLatest for reactive UI where multiple streams affect the same output and I need to react to any change. zip I rarely use — it pairs values by position which is needed in very specific scenarios.\"",
      "summary10s": "forkJoin=wait all complete, combineLatest=react to any change, zip=positional pairs."
    }
  },
  {
    "id": "angular-catcherror",
    "category": "Angular",
    "question": "catchError and Error Handling",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "catchError catches stream error and lets you return a fallback Observable so stream does not die.",
      "explain": "Without catchError, any error terminates the entire stream permanently\ncatchError must return an Observable — use of() for fallback value\nPlace inside switchMap for per-request error handling\nPlace outside for global stream error handling",
      "example": "\"If I do not use catchError and an HTTP call fails, the entire Observable stream terminates and no future values can come through. catchError intercepts the error, lets me log it or show a message, and return a fallback Observable like of empty array so the stream survives. I put it inside switchMap so each individual request handles its own error.\"",
      "summary10s": "catchError=catch error, return fallback Observable, stream survives."
    }
  },
  {
    "id": "angular-cold-vs-hot-observable",
    "category": "Angular",
    "question": "Cold vs Hot Observable",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Cold creates new stream per subscriber, Hot shares one stream for all subscribers.",
      "explain": "Cold — HttpClient, each subscription gets own independent execution\nHot — Subject, all subscribers share same stream, late ones miss past values\nTwo subscriptions to same HTTP Observable means two API calls\nFix cold duplicate calls with shareReplay(1)",
      "example": "\"Cold Observable creates a fresh execution for each subscriber — like Netflix where each user starts their own stream. Hot Observable is shared — like live TV, everyone sees the same thing. HttpClient is cold so two subscriptions mean two API calls. I use shareReplay(1) to make it hot and cache the result for all subscribers.\"",
      "summary10s": "Cold=own stream per subscriber, Hot=shared stream, shareReplay converts cold to hot."
    }
  },
  {
    "id": "angular-sharereplay",
    "category": "Angular",
    "question": "What Does shareReplay Do?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "shareReplay multicasts one execution and replays cached values to late subscribers.",
      "explain": "Without it — each subscriber triggers own HTTP call\nWith shareReplay(1) — one HTTP call, result cached, shared with all subscribers\nLate subscribers get the cached last value replayed immediately\nUse in services where multiple components need same data",
      "example": "\"shareReplay(1) solves duplicate HTTP calls. If two components subscribe to same HTTP Observable in a service, without shareReplay they each trigger their own request. With shareReplay(1) the first subscription fires the request, result is cached, and the second subscriber gets the cached result replayed. One call shared by all.\"",
      "summary10s": "shareReplay(1)=one HTTP call, cached, shared and replayed to all subscribers."
    }
  },
  {
    "id": "angular-httpclient-rxjs-internally",
    "category": "Angular",
    "question": "How HttpClient Uses RxJS Internally",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "HttpClient wraps HTTP requests in cold Observables that emit once and auto-complete.",
      "explain": "Every HttpClient method returns a cold Observable\nSubscription triggers the actual HTTP request\nResponse is emitted as single value then Observable completes automatically\nSupports all RxJS operators — retry, catchError, map, switchMap",
      "example": "\"HttpClient returns a cold Observable for every request. Nothing happens until I subscribe. When subscribed, it sends the HTTP request, emits the response once, and auto-completes. Because it is an Observable I can chain operators — like retry for automatic retries, catchError for error handling, and map to transform the response.\"",
      "summary10s": "HttpClient=cold Observable, emits once, auto-completes, supports all operators."
    }
  },
  {
    "id": "angular-tap-operator",
    "category": "Angular",
    "question": "What is tap Operator?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "tap performs side effects without changing the stream value.",
      "explain": "Value passes through tap unchanged\nUse for logging, showing or hiding loader, analytics\nNever modify the value inside tap\nHelps debug stream without breaking the chain",
      "example": "\"tap is for side effects only. I use it to log values at different points in my pipe, toggle a loading spinner, or track analytics — all without touching the actual data flowing through the stream. If I need to transform the value I use map. tap is purely for observing and reacting without interfering.\"",
      "summary10s": "tap=side effects only, value unchanged, use for logging and loaders."
    }
  },
  {
    "id": "angular-filter-vs-map-vs-pluck",
    "category": "Angular",
    "question": "filter vs map vs pluck",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "filter decides what passes, map transforms value, pluck extracts a property.",
      "explain": "filter — only passes values that meet condition, like Array.filter\nmap — transforms each value to something else, like Array.map\npluck — shortcut to extract a nested property from each object\npluck is deprecated in newer RxJS, use map with property access instead",
      "example": "\"filter is like a gate — only values meeting the condition pass through. map transforms each value into something else. pluck was a shortcut for extracting a property like pluck user name, but it is deprecated in newer RxJS versions. I now use map with direct property access which is clearer.\"",
      "summary10s": "filter=gate condition, map=transform value, pluck=extract property deprecated use map."
    }
  },
  {
    "id": "angular-typeahead-search-rxjs",
    "category": "Angular",
    "question": "Type-Ahead Search Using RxJS",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Combine debounceTime, distinctUntilChanged, and switchMap for efficient search.",
      "explain": "valueChanges emits on every keystroke\ndebounceTime(300) waits for typing pause\ndistinctUntilChanged skips if same value as before\nfilter removes short strings, switchMap cancels old and fires new API call",
      "example": "\"For type-ahead search I pipe the input's valueChanges through debounceTime of 300ms so API only fires after user pauses. Then distinctUntilChanged skips if value did not change. Then filter to ignore strings under 2 characters. Then switchMap to cancel any previous request and fire new one. Result shown via async pipe in template.\"",
      "summary10s": "valueChanges → debounceTime → distinctUntilChanged → filter → switchMap → async pipe."
    }
  },
  {
    "id": "angular-scan-vs-reduce",
    "category": "Angular",
    "question": "scan vs reduce",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "scan emits running total after each value, reduce emits only final total after complete.",
      "explain": "scan — emits accumulated result on every emission, stream stays alive\nreduce — waits for stream to complete, emits single final accumulated value\nscan for real-time running totals like live cart count\nreduce for final sum after all values processed",
      "example": "\"scan is like reduce but emits after every step instead of waiting for completion. I use scan for real-time scenarios like updating a running cart total as items are added — each addition emits the new total immediately. reduce I use when I need one final value after the entire stream completes, like summing all values from a finite list.\"",
      "summary10s": "scan=emit running total each step, reduce=emit final total after complete."
    }
  },
  {
    "id": "angular-application-flow-after-compilation",
    "category": "Angular",
    "question": "Angular Application Flow After Compilation",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Browser loads index.html, Angular bootstraps root component, router takes over rendering.",
      "explain": "AOT compiles TypeScript and templates to JavaScript at build time\nBrowser loads main.js, polyfills, styles\nmain.ts calls bootstrapApplication, Angular sets up DI container\nRoot component selector found in index.html, rendered, router activates",
      "example": "\"After AOT compilation, browser loads the bundled JavaScript. main.ts bootstraps the root component, Angular sets up the injector tree and reads all providers. It finds the app-root selector in index.html and renders the root component. Router then reads the current URL and activates the matching route component inside router-outlet.\"",
      "summary10s": "index.html loads → bootstrap root component → DI setup → router reads URL → renders route component."
    }
  },
  {
    "id": "can-we-use-multiple-guards-for-single-route",
    "category": "Angular",
    "question": "Can We Use Multiple Guards for Single Route",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Yes, pass an array of guards in canActivate — all must pass for navigation to proceed.",
      "explain": "canActivate accepts array of guard functions\nAngular runs them in order\nAll must return true for navigation to succeed\nUse for layered checks — auth guard then role guard then feature flag guard",
      "example": "\"Yes, I pass multiple guards as an array in the route config. Angular runs them sequentially. I use this for layered security — first AuthGuard checks if logged in, then RoleGuard checks if user has required role. If either fails navigation stops. Order matters — put cheapest check first.\"",
      "summary10s": "Array of guards in canActivate, all must return true, runs in order, first failure stops navigation."
    }
  },
  {
    "id": "what-happens-if-one-guard-fails",
    "category": "Angular",
    "question": "What Happens If One Guard Fails",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Navigation stops immediately at the failing guard, remaining guards do not run.",
      "explain": "Guards run in declaration order\nFirst guard returning false or UrlTree stops the chain\nSubsequent guards are not executed\nUser is redirected if UrlTree returned or stays on current route if false",
      "example": "\"If one guard in the array returns false or a UrlTree, Angular stops immediately and does not run remaining guards. If AuthGuard fails it redirects to login and RoleGuard never runs. This is why order matters — put the most fundamental check like authentication before authorization checks.\"",
      "summary10s": "First failing guard stops chain, remaining guards skipped, redirect if UrlTree returned."
    }
  },
  {
    "id": "how-to-call-multiple-apis-at-same-time",
    "category": "Angular",
    "question": "How to Call Multiple APIs at Same Time",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Use forkJoin to fire all requests simultaneously and wait for all to complete.",
      "explain": "forkJoin fires all observables in parallel\nWaits for all to complete then emits combined result\nIf any fails, entire forkJoin fails — use catchError on each individual call\nResult is array or object matching input structure",
      "example": "\"I use forkJoin to call multiple APIs simultaneously. forkJoin fires all requests at the same time and waits for all to complete before emitting. I pass an object with named keys so the result is easy to destructure. I add catchError to each individual call so one failure does not kill all results.\"",
      "summary10s": "forkJoin=fire all simultaneously, wait all complete, object keys for named results, catchError per call."
    }
  },
  {
    "id": "forkjoin-vs-mergemap",
    "category": "Angular",
    "question": "forkJoin vs mergeMap",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "forkJoin runs multiple independent observables in parallel, mergeMap transforms each value into a new observable.",
      "explain": "forkJoin — takes array or object of observables, runs all together, emits once when all complete\nmergeMap — each emission from source triggers a new inner observable, all run concurrently\nforkJoin for parallel independent calls, mergeMap for each item in stream needing its own call\nmergeMap does not wait for inner observables to complete before starting new ones",
      "example": "\"forkJoin is for running known independent API calls simultaneously — load user, load settings, load notifications at page load. mergeMap is for when a stream emits values and each value needs its own API call — like a stream of user IDs where each triggers a separate profile fetch. forkJoin is one-shot, mergeMap is continuous.\"",
      "summary10s": "forkJoin=known parallel calls one-shot, mergeMap=each stream emission triggers new inner observable."
    }
  },
  {
    "id": "call-one-api-after-previous-completes",
    "category": "Angular",
    "question": "Call One API After Previous Completes",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Use switchMap or concatMap to chain dependent API calls sequentially.",
      "explain": "switchMap — use result of first call as input to second call\nMost common pattern for dependent calls — get user then get their orders\nconcatMap — queue calls, each waits for previous to complete, order guaranteed\nDo not nest subscribes — chain with operators instead",
      "example": "\"I use switchMap to chain dependent API calls. First observable emits user data, switchMap takes that result and returns the second API call using data from the first response. Result of second call comes through as the final value. This avoids nested subscribes which is an anti-pattern and makes the chain readable.\"",
      "summary10s": "switchMap for dependent calls, first result becomes input to second, avoid nested subscribes."
    }
  },
  {
    "id": "enable-next-field-based-on-dropdown-in-reactive-forms",
    "category": "Angular",
    "question": "Enable Next Field Based on Dropdown in Reactive Forms",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Subscribe to dropdown valueChanges, enable or disable next control based on value.",
      "explain": "Get reference to the dependent FormControl\nSubscribe to dropdown FormControl valueChanges\nOn value meeting condition call control.enable()\nOn value not meeting condition call control.disable()\nDisabled controls are excluded from form value and validation",
      "example": "\"I subscribe to the dropdown's valueChanges Observable. When value meets the condition I call enable on the dependent control, otherwise I call disable. Disabled controls are automatically excluded from form submission. I do this in ngOnInit and use takeUntilDestroyed to auto-unsubscribe when component is destroyed.\"",
      "summary10s": "valueChanges subscription, control.enable() or control.disable() based on dropdown value."
    }
  },
  {
    "id": "latest-angular-version-and-key-features",
    "category": "Angular",
    "question": "Latest Angular Version and Key Features",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Angular 18 and 19 brought Signals stable, zoneless change detection, and deferrable views.",
      "explain": "Signals — reactive primitives, fine-grained change detection without zone.js\nZoneless change detection — experimental, no zone.js needed, better performance\nDeferrable views — @defer for lazy loading template sections\nNew control flow — @if, @for, @switch built into template compiler\nSignal-based inputs and outputs — input() and output() functions",
      "example": "\"Recent Angular versions have focused heavily on Signals and zoneless change detection. Signals give fine-grained reactivity — only components using a signal re-render when it changes. New control flow with @if and @for is cleaner and needs no imports. Deferrable views with @defer enable lazy loading of template sections. These changes make Angular significantly more performant.\"",
      "summary10s": "Signals, zoneless detection, @defer, new @if/@for control flow, signal inputs outputs."
    }
  },
  {
    "id": "what-are-signals-in-angular",
    "category": "Angular",
    "question": "What Are Signals in Angular",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Signals are reactive values — when they change, anything reading them automatically updates.",
      "explain": "signal() creates a reactive value\ncomputed() creates derived value that auto-updates when dependencies change\neffect() runs side effects when signals it reads change\nWorks without zone.js — fine-grained updates only to affected components",
      "example": "\"Signal is a reactive primitive that holds a value. When signal value changes, Angular knows exactly which template or computed value depends on it and updates only those. Unlike zone.js which checks everything, signals enable surgical updates. computed creates derived signals, effect runs side effects. This makes Angular much more efficient.\"",
      "summary10s": "signal()=reactive value, computed()=derived auto-updates, effect()=side effects, surgical re-renders."
    }
  },
  {
    "id": "http-interceptors-can-we-have-more-than-one",
    "category": "Angular",
    "question": "HTTP Interceptors — Can We Have More Than One",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Yes, multiple interceptors form a chain — each processes request before passing to next.",
      "explain": "Each interceptor receives request and next handler\nCalls next to pass to following interceptor\nLast in chain makes actual HTTP call\nOrder matters — auth interceptor before logging interceptor",
      "example": "\"Yes, interceptors form a middleware chain. Each receives the request, can modify it, and calls next to pass along. I typically have an auth interceptor adding JWT header, a loading interceptor showing spinner, and an error interceptor handling 401 and 500 responses. They run in order provided — I put auth first so token is added before logging.\"",
      "summary10s": "Multiple interceptors form chain, run in order, each calls next to pass along, order matters."
    }
  },
  {
    "id": "login-and-logout-flow-in-angular",
    "category": "Angular",
    "question": "Login and Logout Flow in Angular",
    "frequency": 2,
    "companies": [],
    "variations": [
      "How do you implement JWT authentication in Angular?"
    ],
    "answerSEE": {
      "simple": "Login stores token, sets auth state, redirects to home. Logout clears token, resets state, redirects to login.",
      "explain": "Login — call auth API, receive JWT, store in localStorage or httpOnly cookie, update BehaviorSubject, navigate to home\nInterceptor reads token from storage, adds to every request header\nAuth guard reads BehaviorSubject to protect routes\nLogout — clear token from storage, reset BehaviorSubject to null, navigate to login",
      "example": "\"On login I call the auth API, store JWT in localStorage, and update my AuthService BehaviorSubject with the user. HTTP interceptor picks up token from storage and adds to every subsequent request. Auth guard subscribes to the BehaviorSubject to protect routes. On logout I clear token, reset the BehaviorSubject to null, and redirect to login.\"",
      "summary10s": "Login=store token + update BehaviorSubject. Interceptor adds token. Guard checks BehaviorSubject. Logout=clear all."
    }
  },
  {
    "id": "handle-roles-and-permissions-after-login",
    "category": "Angular",
    "question": "Handle Roles and Permissions After Login",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Decode JWT for roles, store in AuthService, use role guard and directive to control access.",
      "explain": "JWT payload contains user roles — decode on login and store in AuthService\nRole guard checks if current user role matches required route role\nStructural directive hides or shows UI elements based on role\nBackend must also validate role on every API call — frontend is only UX",
      "example": "\"After login I decode the JWT payload which contains the user roles and store them in AuthService. Route-level protection uses a role guard that checks if user has required role before activating the route. For UI elements like buttons and menu items I create a structural directive that hides elements the user's role cannot access. Backend always re-validates — frontend is just UX.\"",
      "summary10s": "Decode JWT roles, store in AuthService, role guard for routes, directive for UI elements, backend validates always."
    }
  },
  {
    "id": "package-json-vs-package-lock-json",
    "category": "Angular",
    "question": "package.json vs package-lock.json",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "package.json defines what dependencies you want, package-lock.json records exact versions installed.",
      "explain": "package.json — you write this, lists dependencies with version ranges like caret or tilde\npackage-lock.json — auto-generated, records exact version of every package and sub-dependency\npackage-lock.json ensures same versions installed on every machine and CI\nNever manually edit package-lock.json, always commit it to git",
      "example": "\"package.json is what I write — it lists my dependencies with version ranges. package-lock.json is auto-generated and locks every package to the exact version installed including all transitive dependencies. Without package-lock.json two developers running npm install might get different versions. I always commit package-lock.json to ensure consistent installs across all environments.\"",
      "summary10s": "package.json=version ranges you write, package-lock.json=exact versions auto-generated, commit both."
    }
  },
  {
    "id": "cookies-vs-localstorage-vs-sessionstorage",
    "category": "JavaScript",
    "question": "Cookies vs LocalStorage vs SessionStorage",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Cookies sent with requests automatically, LocalStorage persists forever, SessionStorage cleared on tab close.",
      "explain": "Cookies — sent to server on every request, can be httpOnly secure, has expiry, 4KB limit\nLocalStorage — stays until explicitly cleared, 5MB, client only, survives tab close\nSessionStorage — cleared when tab closes, 5MB, client only, per tab isolated\nFor JWT — httpOnly cookie is most secure, localStorage is convenient but XSS risk",
      "example": "\"Cookies are automatically sent with every HTTP request making them ideal for auth tokens — especially httpOnly cookies which JavaScript cannot access preventing XSS attacks. LocalStorage persists until cleared, good for user preferences. SessionStorage is tab-scoped and cleared on close, good for temporary wizard state. For security I prefer httpOnly cookies for tokens over localStorage.\"",
      "summary10s": "Cookies=auto-sent with requests httpOnly secure, LocalStorage=forever client-only, SessionStorage=tab-scoped cleared on close."
    }
  },
  {
    "id": "constructor-vs-ngoninit",
    "category": "Angular",
    "question": "constructor vs ngOnInit",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Constructor for DI only, ngOnInit for initialization logic after Angular sets up component.",
      "explain": "Constructor — JavaScript instantiation, DI injects here, Inputs not available yet\nngOnInit — Angular calls after first change detection, Inputs are set, Angular ready\nAPI calls and setup using Input values must go in ngOnInit not constructor\nConstructor should have only dependency assignments",
      "example": "\"Constructor is called by JavaScript when the class is created — I only inject dependencies here. Angular has not set Input values yet at constructor time. ngOnInit fires after Angular initializes the component and sets all Inputs. So all setup logic — API calls, subscription setup, using Input values — goes in ngOnInit.\"",
      "summary10s": "Constructor=DI only, ngOnInit=logic after Inputs set and Angular ready."
    }
  },
  {
    "id": "complete-order-of-angular-lifecycle-hooks",
    "category": "Angular",
    "question": "Complete Order of Angular Lifecycle Hooks",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "ngOnChanges → ngOnInit → ngDoCheck → ngAfterContentInit → ngAfterContentChecked → ngAfterViewInit → ngAfterViewChecked → ngOnDestroy.",
      "explain": "ngOnChanges — fires first if @Input changes, receives SimpleChanges\nngOnInit — fires once after first change detection, setup logic here\nngAfterViewInit — view and children rendered, access ViewChild here\nngOnDestroy — cleanup subscriptions and timers",
      "example": "\"The order starts with ngOnChanges if there are Input changes, then ngOnInit for setup. Content hooks fire next — ngAfterContentInit when projected content is ready. Then view hooks — ngAfterViewInit when the component view and all children are fully rendered, this is where I access ViewChild. ngOnDestroy is last — cleanup everything here.\"",
      "summary10s": "Changes→Init→DoCheck→ContentInit→ContentChecked→ViewInit→ViewChecked→Destroy."
    }
  },
  {
    "id": "change-detection-how-it-works",
    "category": "Angular",
    "question": "Change Detection — How It Works",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Angular checks component tree for data changes and updates DOM when changes found.",
      "explain": "Zone.js patches async operations and notifies Angular when something might have changed\nAngular traverses component tree from root checking each component\nDefault — every component checked every cycle\nOnPush — component skipped unless Input changed, async emitted, or DOM event fired",
      "example": "\"Zone.js intercepts all async operations — setTimeout, HTTP calls, events — and triggers Angular change detection after each. Angular then walks the component tree from root to leaves checking if any data bound in templates changed. Default strategy checks everything. OnPush skips components unless they are specifically marked dirty.\"",
      "summary10s": "Zone.js triggers detection, Angular walks tree checking templates, Default=all, OnPush=only marked dirty."
    }
  },
  {
    "id": "zone-js-and-zoneless-change-detection",
    "category": "Angular",
    "question": "Zone.js and Zoneless Change Detection",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Zone.js triggers change detection automatically, zoneless requires manual or Signal-based triggers.",
      "explain": "Zone.js patches browser APIs to detect async completions and notify Angular\nProblem — too many unnecessary change detection cycles, performance overhead\nZoneless — experimental, no zone.js, change detection triggered only by Signals or markForCheck\nSignals make zoneless practical — Angular knows exactly what changed",
      "example": "\"Zone.js is the magic that tells Angular when to run change detection by intercepting all async operations. It works but causes too many unnecessary cycles. Zoneless change detection removes zone.js entirely — Angular only updates when a Signal changes or when explicitly triggered. Signals make this practical because Angular knows precisely which components to update.\"",
      "summary10s": "Zone.js=auto detect all async, Zoneless=no zone only Signals or explicit triggers, more efficient."
    }
  },
  {
    "id": "lazy-loading-vs-eager-loading",
    "category": "Angular",
    "question": "Lazy Loading vs Eager Loading",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Eager loads everything upfront, lazy loads feature code only when user navigates to it.",
      "explain": "Eager — module or component included in main bundle, loaded at startup even if never visited\nLazy — separate chunk created at build, downloaded only on first navigation to that route\nLazy dramatically reduces initial bundle size and startup time\nUse loadComponent for standalone lazy loading",
      "example": "\"Eager loading puts everything in the initial bundle — slow first load even if user never visits most features. Lazy loading splits each feature into a separate JavaScript chunk downloaded only when user navigates there. Initial load is fast, feature loads when needed. I lazy load all feature routes and eager load only core app components.\"",
      "summary10s": "Eager=in main bundle loaded always, Lazy=separate chunk loaded on navigation, reduces initial bundle."
    }
  },
  {
    "id": "pipes-pure-vs-impure",
    "category": "Angular",
    "question": "Pipes — Pure vs Impure",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Pipes transform display data, pure recalculates only on reference change, impure recalculates every cycle.",
      "explain": "Pure — default, cached result, only recalculates when input reference changes\nImpure — runs every change detection cycle, performance expensive\nasync pipe is impure — must react to any Observable emission\nCustom impure pipes can cause serious performance degradation",
      "example": "\"Pipes transform data in templates without changing the original. Pure pipes are cached — Angular only recalculates when the input reference changes which is very efficient. Impure pipes run on every change detection cycle regardless of whether input changed. I avoid custom impure pipes unless absolutely necessary. async pipe is intentionally impure to react to every emission.\"",
      "summary10s": "Pure=cached runs on reference change, Impure=every cycle expensive, async is impure by design."
    }
  },
  {
    "id": "viewchild-vs-contentchild",
    "category": "Angular",
    "question": "ViewChild vs ContentChild",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "ViewChild queries component's own template, ContentChild queries projected ng-content.",
      "explain": "ViewChild — element or component in my own template, available in ngAfterViewInit\nContentChild — element projected from parent via ng-content, available in ngAfterContentInit\nBoth can query by class, directive, or template reference variable\nViewChild most common — accessing child component methods or DOM elements",
      "example": "\"ViewChild queries elements I defined in my own template — like getting a reference to a child component to call its methods or a form element for focus. ContentChild queries content projected in from outside via ng-content. Timing differs — ViewChild ready in ngAfterViewInit, ContentChild ready in ngAfterContentInit.\"",
      "summary10s": "ViewChild=own template AfterViewInit, ContentChild=projected content AfterContentInit."
    }
  },
  {
    "id": "resolvers-and-when-to-use-them",
    "category": "Angular",
    "question": "Resolvers and When to Use Them",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Resolver pre-fetches data before route activates — component never renders without data.",
      "explain": "Resolver runs before route component is created\nComponent accesses resolved data from ActivatedRoute.data\nPrevents empty state flash on component load\nDownside — navigation appears delayed while data loads",
      "example": "\"Resolver fetches required data before the component is created. User navigates, resolver fires API call, Angular waits for it, then activates the route with data ready. Component reads from ActivatedRoute.data and renders fully populated. I use resolvers for critical data like user profile pages where empty state is unacceptable.\"",
      "summary10s": "Resolver fetches before route activates, no empty state, component reads from ActivatedRoute.data."
    }
  },
  {
    "id": "guards-vs-interceptors-vs-resolvers",
    "category": "Angular",
    "question": "Guards vs Interceptors vs Resolvers",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Guards control navigation, Interceptors control HTTP, Resolvers fetch data before navigation.",
      "explain": "Guards — run before route activation, control if navigation proceeds, auth and roles\nInterceptors — run on every HTTP request and response, add headers, handle errors\nResolvers — run before route activation, fetch data, pass to component via route data\nGuards and Resolvers are routing concerns, Interceptors are HTTP concerns",
      "example": "\"Guards decide if you can navigate to a route — auth and permission checks. Interceptors sit in the HTTP pipeline — they add auth headers, log requests, handle global errors. Resolvers pre-fetch data before a route activates so component always has data. Guards run first, then resolvers, then component is created.\"",
      "summary10s": "Guards=can you navigate, Interceptors=HTTP pipeline, Resolvers=pre-fetch data before component."
    }
  },
  {
    "id": "improve-angular-app-performance",
    "category": "Angular",
    "question": "Improve Angular App Performance",
    "frequency": 2,
    "companies": [],
    "variations": [
      "How would you optimize the performance of a large Angular application?"
    ],
    "answerSEE": {
      "simple": "OnPush, lazy loading, trackBy, async pipe, @defer, pure pipes, and bundle optimization.",
      "explain": "OnPush on all components — reduces unnecessary change detection\nLazy load all feature routes — smaller initial bundle\ntrackBy or track in lists — prevents full DOM re-render\n@defer for below-fold heavy components\nshareReplay for shared HTTP calls, pure pipes, avoid impure",
      "example": "\"I apply OnPush to all components and use immutable data patterns. All feature routes are lazy loaded. Lists always have track or trackBy. Heavy below-fold components use @defer. HTTP calls shared across components use shareReplay to prevent duplicates. I run Lighthouse and bundle analyzer to find remaining bottlenecks.\"",
      "summary10s": "OnPush, lazy load routes, track in lists, @defer for heavy, shareReplay for HTTP, bundle analyzer."
    }
  },
  {
    "id": "ssr-and-hydration-in-angular",
    "category": "Angular",
    "question": "SSR and Hydration in Angular",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "SSR renders app on server first, hydration makes that server HTML interactive on client.",
      "explain": "SSR — Angular Universal renders HTML on server, sends to browser, faster first paint\nWithout hydration — client discards server HTML and re-renders everything, wasteful\nHydration — client attaches event listeners to existing server HTML instead of re-rendering\nBetter SEO, faster LCP, less layout shift",
      "example": "\"SSR renders the Angular app on the server and sends complete HTML to the browser — user sees content immediately without waiting for JavaScript to run. Hydration is the key improvement — instead of throwing away server HTML and re-rendering, Angular attaches to existing DOM. This avoids double rendering and gives fast interactive time.\"",
      "summary10s": "SSR=render on server faster first paint, Hydration=attach to server HTML not re-render, better SEO."
    }
  },
  {
    "id": "trackby-in-ngfor-why-important",
    "category": "Angular",
    "question": "TrackBy in ngFor — Why Important",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "TrackBy tells Angular which property identifies each item — only changed items re-render.",
      "explain": "Without trackBy — Angular destroys and recreates entire DOM list on any change\nWith trackBy — Angular identifies which items changed, added, removed by unique property\nOnly affected DOM nodes updated — huge performance win for large lists\nAlways use id as track key, never index for dynamic lists",
      "example": "\"Without trackBy when the list array changes Angular destroys and recreates every DOM element. With trackBy I provide a function returning each item's unique ID — Angular tracks items across renders and only updates what actually changed. For a list of 1000 items this difference is massive.\"",
      "summary10s": "Without trackBy=full DOM re-render, with trackBy=only changed items update, always use unique id."
    }
  },
  {
    "id": "structure-a-large-angular-project",
    "category": "Angular",
    "question": "Structure a Large Angular Project",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Feature-based folder structure with core, shared, and feature modules or standalone components.",
      "explain": "Core folder — singleton services, guards, interceptors, models\nShared folder — reusable components, directives, pipes used across features\nFeatures folder — one folder per feature with its own components, services, routes\nEach feature lazy loaded, owns its state and routing",
      "example": "\"I structure large Angular projects by feature. Core holds app-wide singletons — auth service, interceptors, guards. Shared holds reusable UI components and pipes. Each feature has its own folder with components, services, and routes — all lazy loaded. This keeps features independent, teams can own a feature folder without conflicts.\"",
      "summary10s": "Core=singletons, Shared=reusable UI, Features=own folder lazy loaded, feature teams own their folder."
    }
  },
  {
    "id": "flatten-nested-array-without-flatmap",
    "category": "JS Coding",
    "question": "Flatten Nested Array Without flatMap",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Use recursive function or reduce to flatten nested arrays.",
      "explain": "Recursive approach — loop through array, if element is array recurse, else push to result\nreduce approach — accumulate with concat checking if array\nWorks for any depth of nesting\nJSON.stringify approach works but is hacky",
      "example": "\"I write a recursive flatten function. I loop through each element — if it is an array I recursively call flatten and spread the result, if it is a value I push it to result array. This handles any depth of nesting. Alternatively with reduce I accumulate and concat arrays recursively.\"",
      "summary10s": "Recursive check if array then recurse else push, handles any depth."
    }
  },
  {
    "id": "string-transformation-hello-to-h1e1l2o3",
    "category": "JS Coding",
    "question": "String Transformation — hello to h1e1l2o3",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Count consecutive occurrences of each character, append count after each character.",
      "explain": "Loop through string tracking current character and count\nWhen character changes, append previous character and count to result\nHandle last character after loop ends\nh appears 1 time, e appears 1 time, l appears 2 times, o appears 3 times",
      "example": "\"I iterate through the string tracking current character and its consecutive count. When the character changes I append the previous character and its count to the result string. After the loop I append the last tracked character and count. This gives h1e1l2o3 — each unique character followed by how many times it appeared consecutively.\"",
      "summary10s": "Track char and count, on change append char+count to result, handle last char after loop."
    }
  },
  {
    "id": "find-longest-word-in-sentence",
    "category": "JS Coding",
    "question": "Find Longest Word in Sentence",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Split by space, reduce to find word with maximum length.",
      "explain": "Split sentence by space to get words array\nUse reduce to compare lengths and keep longest\nOr sort by length descending and take first\nHandle edge cases — empty string, multiple spaces",
      "example": "\"I split the sentence by spaces to get an array of words. Then I use reduce starting with the first word — each iteration compares current word length with accumulator and keeps the longer one. This runs in O(n) time. For tied lengths reduce returns the first longest found.\"",
      "summary10s": "split by space, reduce comparing lengths, keep longer word each iteration."
    }
  },
  {
    "id": "debounce-function",
    "category": "JS Coding",
    "question": "Debounce Function",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Debounce delays function execution until after a pause in calls.",
      "explain": "Returns a function that clears previous timeout and sets new one\nOnly executes original function if no new call within delay period\nThrottle is different — executes at most once per time period regardless\nDebounce for search input, throttle for scroll events",
      "example": "\"Debounce wraps a function and delays its execution. I keep a timer reference. Each call clears the previous timer and sets a new one with the delay. Original function only runs if no new call comes within the delay period. This is exactly what debounceTime operator does in RxJS — wait for silence then emit.\"",
      "summary10s": "Clear previous timer, set new timer, function runs only if no new call within delay."
    }
  },
  {
    "id": "reverse-string-without-built-in-methods",
    "category": "JS Coding",
    "question": "Reverse String Without Built-in Methods",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Loop from last index to zero, append each character to result.",
      "explain": "Initialize empty result string or array\nLoop from string.length minus 1 down to 0\nAppend character at each index to result\nReturn result — array approach is more efficient, join at end",
      "example": "\"I initialize an empty result. I loop from the last index of the string down to zero, appending each character to result. Using an array and joining at the end is more efficient than string concatenation since strings are immutable — concatenation creates new string each iteration.\"",
      "summary10s": "Loop from last index to 0, push char to array, join and return."
    }
  },
  {
    "id": "tell-me-about-your-project-and-your-contribution-to-it",
    "category": "System Design",
    "question": "Tell me about your project and your contribution to it.",
    "frequency": 1,
    "companies": [
      "Flipkart"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Briefly explain your project's business domain, architecture, and your specific roles and responsibilities.",
      "explain": "Start with a high-level summary of the product (what it does and for whom). Then explain the technical stack and architecture (monolith vs microservices). Finally, focus on exactly what YOU built, optimized, or fixed, highlighting your impact.",
      "example": "In my current project, an e-commerce platform handling 10k daily orders, we use a Microservices architecture with Spring Boot and Kafka. My main contribution was designing and implementing the Order Processing service and migrating synchronous HTTP calls to asynchronous Kafka events, which improved our checkout latency by 40%.",
      "summary10s": "Business domain -> Tech Stack -> Your specific impact/contribution."
    }
  },
  {
    "id": "why-did-you-migrate-to-microservices",
    "category": "Microservices",
    "question": "Why did you migrate to microservices?",
    "frequency": 1,
    "companies": [
      "Flipkart"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "To solve scalability issues, allow independent deployments, and enable team autonomy.",
      "explain": "Monoliths become hard to scale, build, and deploy as the team and codebase grow. Microservices allow scaling only the services that have high traffic (like search or checkout), enable different teams to work independently, and allow using different technologies for different problems.",
      "example": "We migrated to microservices because our monolith was becoming too slow to build and deploy. Also, certain parts like the Search service needed heavy scaling during sales, while the Admin panel didn't. Splitting them allowed us to scale the Search service independently and deploy new features without risking the whole application.",
      "summary10s": "Independent scaling, faster deployments, team autonomy."
    }
  },
  {
    "id": "if-testing-becomes-difficult-in-microservices-why-did-you-still-choose-it",
    "category": "Microservices",
    "question": "If testing becomes difficult in microservices, why did you still choose it?",
    "frequency": 1,
    "companies": [
      "Flipkart"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Because the benefits of independent scaling and faster releases outweighed the testing complexity.",
      "explain": "Microservices do introduce complexity in testing (integration, distributed tracing, etc.). However, for a growing product, the inability to scale specific components or the risk of one bad commit bringing down the entire system is a much bigger problem than testing complexity.",
      "example": "Testing distributed systems is definitely harder. We had to introduce contract testing and distributed tracing. But we chose this tradeoff because the monolith was bottlenecking our releases. The ability to deploy the Payment service independently and scale the Search service during peak traffic was worth the added testing overhead.",
      "summary10s": "Tradeoff: independent scaling and fast deployments are worth the testing overhead."
    }
  },
  {
    "id": "how-do-microservices-communicate-with-each-other",
    "category": "Microservices",
    "question": "How do microservices communicate with each other?",
    "frequency": 1,
    "companies": [
      "Flipkart"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Synchronously via REST/gRPC or asynchronously via Message Brokers like Kafka/RabbitMQ.",
      "explain": "Synchronous communication blocks the caller until a response is received, which is good for querying data but creates tight coupling. Asynchronous communication uses events/messages, which is fire-and-forget, leading to loose coupling and better fault tolerance.",
      "example": "We use two main approaches. For real-time data fetching, like the Order service asking the User service for a profile, we use REST APIs via Feign Client. For state changes, like sending an email after an order is placed, we use asynchronous events via Kafka so the Order service doesn't have to wait for the email to send.",
      "summary10s": "REST/gRPC for synchronous reads. Kafka/RabbitMQ for asynchronous events."
    }
  },
  {
    "id": "why-did-you-choose-kafka-for-asynchronous-operations",
    "category": "Microservices",
    "question": "Why did you choose Kafka for asynchronous operations?",
    "frequency": 1,
    "companies": [
      "Flipkart"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Kafka provides high throughput, durability, and replayability, making it perfect for event-driven microservices.",
      "explain": "Unlike traditional message queues (like RabbitMQ) which delete messages after consumption, Kafka is a distributed append-only log. It persists messages to disk, allowing multiple consumer groups to read the same event at their own pace, and it can handle millions of messages per second.",
      "example": "We chose Kafka because of its high throughput and durability. In our system, when an order is created, we need to notify the Inventory, Shipping, and Notification services. Kafka allows all three independent consumer groups to read the same 'OrderCreated' event at their own pace. Plus, if a service goes down, it can replay the messages when it comes back up.",
      "summary10s": "High throughput, persistent storage, supports multiple independent consumer groups."
    }
  },
  {
    "id": "can-t-a-synchronous-service-handle-the-notification-service",
    "category": "System Design",
    "question": "Can’t a synchronous service handle the notification service?",
    "frequency": 1,
    "companies": [
      "Flipkart"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Yes, but it creates tight coupling, increases latency, and risks cascading failures.",
      "explain": "If the Order Service calls the Notification Service synchronously (REST API), the user has to wait for the email to be sent before getting a successful checkout response. If the Notification service is down, the entire checkout process might fail.",
      "example": "Technically, yes, it can. But if we make a synchronous REST call to send an SMS/Email, we add the network and processing latency of the Notification service to the user's checkout time. Worse, if the third-party email provider is down, our synchronous call times out, and we might accidentally fail the user's order. Asynchronous is much safer here.",
      "summary10s": "Yes, but it adds latency and tight coupling. If notifications fail, the main process fails."
    }
  },
  {
    "id": "if-the-synchronous-service-can-handle-notifications-what-s-the-need-for-kafka",
    "category": "Microservices",
    "question": "If the synchronous service can handle notifications, what’s the need for Kafka?",
    "frequency": 1,
    "companies": [
      "Flipkart"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Kafka decouples the services, ensuring the main process (like checkout) completes instantly and reliably.",
      "explain": "Kafka acts as a buffer. The Order service just drops a message in Kafka and immediately returns a success to the user. The Notification service consumes it whenever it has capacity. This ensures fault isolation—one service going down doesn't bring down others.",
      "example": "Kafka decouples the producers from the consumers. If our email provider goes down for 2 hours, a synchronous setup would drop all notifications or crash the checkout service. With Kafka, the Notification service simply stops consuming. The Order service keeps working normally, and the messages pile up safely in Kafka. When the email provider is back, it processes the backlog.",
      "summary10s": "Fault isolation, decoupling, and buffering during traffic spikes or downtime."
    }
  },
  {
    "id": "which-rest-methods-did-you-use",
    "category": "System Design",
    "question": "Which REST methods did you use?",
    "frequency": 1,
    "companies": [
      "Flipkart"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "GET for fetching, POST for creating, PUT for full updates, PATCH for partial updates, and DELETE for removal.",
      "explain": "These correspond to CRUD operations. GET and DELETE are idempotent. PUT is also idempotent as it replaces the entire resource. POST is not idempotent. PATCH is for partial updates and is not strictly idempotent.",
      "example": "In my project, I used GET to retrieve user profiles, POST to create new orders, PUT to update an entire product catalog entry, PATCH to just update an order's status to Shipped, and DELETE to remove items from a cart.",
      "summary10s": "GET (read), POST (create), PUT (full update), PATCH (partial update), DELETE (remove)."
    }
  },
  {
    "id": "while-using-the-post-method-where-is-the-resource-created",
    "category": "System Design",
    "question": "While using the POST method, where is the resource created?",
    "frequency": 1,
    "companies": [
      "Flipkart"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "The resource is created on the server (usually in a database), and the server returns its new URI in the Location header.",
      "explain": "When you send a POST request to a collection URI (e.g., /users), the server takes the payload, processes it, stores it in the database, generates a unique ID, and returns a 201 Created status along with the URI of the new resource (e.g., /users/123).",
      "example": "The resource is created on the backend database. For example, if I POST a JSON payload to /api/orders, the Spring Boot controller processes it, saves it to PostgreSQL, and returns a 201 Created response. The response header usually contains a 'Location' field pointing to the newly created resource, like /api/orders/987.",
      "summary10s": "Created in the backend DB. Server returns 201 Created and the new resource URI."
    }
  },
  {
    "id": "how-did-you-handle-global-exception-handling",
    "category": "Spring Boot",
    "question": "How did you handle global exception handling?",
    "frequency": 1,
    "companies": [
      "Flipkart"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "By using @RestControllerAdvice and @ExceptionHandler annotations in Spring Boot.",
      "explain": "@RestControllerAdvice intercepts exceptions thrown globally across all controllers. Inside it, methods annotated with @ExceptionHandler specify which exception to catch (like CustomNotFoundException). We then return a standardized JSON error response.",
      "example": "I created a GlobalExceptionHandler class annotated with @RestControllerAdvice. Inside it, I wrote methods with @ExceptionHandler(ResourceNotFoundException.class) to catch specific exceptions. These methods return a custom ErrorResponse object containing the timestamp, error message, and HTTP status code, ensuring the client always gets a consistent JSON format instead of a messy stack trace.",
      "summary10s": "@RestControllerAdvice + @ExceptionHandler to return a consistent JSON error response."
    }
  },
  {
    "id": "what-is-a-topic-in-kafka",
    "category": "Microservices",
    "question": "What is a Topic in Kafka?",
    "frequency": 1,
    "companies": [
      "Flipkart"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "A Topic is a logical channel or category where producers publish messages and consumers read them.",
      "explain": "Think of it as a table in a database or a folder in a filesystem. Messages in Kafka are categorized into topics. Each topic is split into partitions for scalability and distributed across brokers.",
      "example": "A topic is just a named category used to store and publish records. For example, in our e-commerce app, we have a topic named 'order-events'. The Order service writes messages to this topic, and the Inventory service reads from it.",
      "summary10s": "A logical category or channel where messages are published and consumed."
    }
  },
  {
    "id": "explain-kafka-partitioning",
    "category": "Microservices",
    "question": "Explain Kafka Partitioning.",
    "frequency": 1,
    "companies": [
      "Flipkart"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Partitioning splits a single Topic into multiple pieces across different brokers to allow parallel processing.",
      "explain": "A topic is divided into partitions. Each partition is an ordered, immutable sequence of messages. By having multiple partitions, multiple consumers in a group can read from the same topic simultaneously, which provides massive horizontal scalability.",
      "example": "Partitioning is how Kafka scales. If an 'order-events' topic has 3 partitions, we can run 3 instances of our Inventory service, and each instance will read from one partition in parallel. Messages with the same key (like orderId) always go to the same partition, ensuring order is maintained for that specific entity.",
      "summary10s": "Splits a topic into parts for parallel consumption. Same key goes to the same partition."
    }
  },
  {
    "id": "what-is-cluster-metadata-in-kafka",
    "category": "Microservices",
    "question": "What is Cluster Metadata in Kafka?",
    "frequency": 1,
    "companies": [
      "Flipkart"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Cluster metadata contains information about brokers, topics, partitions, and replicas in the Kafka cluster.",
      "explain": "It tells producers and consumers which broker is the leader for a specific partition. Clients fetch this metadata initially so they know exactly which broker IP to connect to when sending or reading a message.",
      "example": "Cluster metadata is the map of the cluster. When our Spring Boot producer starts, it connects to any broker and asks for metadata. It learns that Partition 0 of 'order-events' is on Broker A, and Partition 1 is on Broker B. It then caches this so it can send messages directly to the correct broker.",
      "summary10s": "Information mapping partitions to specific brokers. Clients use it to route requests."
    }
  },
  {
    "id": "how-does-kafka-support-scalability",
    "category": "Microservices",
    "question": "How does Kafka support scalability?",
    "frequency": 1,
    "companies": [
      "Flipkart"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Through partitioning and distributed brokers.",
      "explain": "Kafka scales horizontally by adding more brokers to the cluster. Topics are split into partitions distributed across these brokers. This allows adding more consumer instances to process partitions in parallel.",
      "example": "Kafka scales mainly through partitions. If our topic is getting too much traffic, we can increase the number of partitions and then spin up more consumer microservice instances to match. The load is automatically distributed, and adding more broker machines increases the total storage and network capacity.",
      "summary10s": "More partitions allow more parallel consumers. More brokers allow more data storage/throughput."
    }
  },
  {
    "id": "what-happens-when-a-kafka-broker-goes-down",
    "category": "Microservices",
    "question": "What happens when a Kafka broker goes down?",
    "frequency": 1,
    "companies": [
      "Flipkart"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Kafka automatically elects a new leader from the in-sync replicas (ISR) for the partitions that were on the down broker.",
      "explain": "Kafka replicates partitions across multiple brokers. One is the Leader, others are Followers. If a broker crashes, the cluster controller detects it and promotes one of the in-sync follower replicas on another broker to be the new leader.",
      "example": "If Broker 1 goes down, any partition where Broker 1 was the leader becomes temporarily unavailable. The Kafka controller immediately elects a new leader from the surviving replicas on Broker 2 or 3. Producers and consumers fetch the new metadata and automatically reconnect to the new leader without losing data.",
      "summary10s": "A new leader is elected from the replica followers. Clients automatically reconnect."
    }
  },
  {
    "id": "suppose-there-are-three-microservices-a-b-and-c-and-service-c-becomes-unavailable-what-will-happen",
    "category": "Microservices",
    "question": "Suppose there are three microservices A, B, and C, and Service C becomes unavailable. What will happen?",
    "frequency": 1,
    "companies": [
      "Flipkart"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "If they communicate via Kafka, messages for C simply pile up in the topic safely. A and B continue working normally.",
      "explain": "This is the main benefit of asynchronous communication. Because A and B do not wait for C, they are unaffected. When C comes back online, it will resume consuming messages from where it left off (its last committed offset).",
      "example": "If Service C is our Notification service and it crashes, Service A (Orders) keeps taking orders and pushing events to Kafka. Kafka safely stores these events on disk. The system remains highly available for the user. Once Service C restarts, it reconnects, reads its consumer group offset, and processes the backlog of notifications.",
      "summary10s": "Messages buffer in Kafka safely. Other services are unaffected. C processes backlog on restart."
    }
  },
  {
    "id": "how-does-kafka-ensure-data-consistency",
    "category": "Microservices",
    "question": "How does Kafka ensure data consistency?",
    "frequency": 1,
    "companies": [
      "Flipkart"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "By replicating partitions across brokers and using acknowledgments (acks).",
      "explain": "Producers can configure acks=all, meaning a message is only considered successfully written if the leader AND all in-sync replicas save it. This guarantees no data loss even if the leader crashes immediately after.",
      "example": "To ensure strict consistency, I configure the producer with acks=all. This means when the Order service sends a message, Kafka won't send a success response until the leader broker and its follower replicas have all written the message to disk. This prevents data loss if a broker fails.",
      "summary10s": "Replication across brokers + producer setting acks=all ensures no data loss."
    }
  },
  {
    "id": "how-does-kafka-handle-data-retention",
    "category": "Microservices",
    "question": "How does Kafka handle data retention?",
    "frequency": 1,
    "companies": [
      "Flipkart"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Kafka retains messages on disk based on a configured time period or size limit, regardless of whether they have been consumed.",
      "explain": "Unlike traditional queues that delete messages upon reading, Kafka keeps them. You can configure retention policies like 'delete after 7 days' or 'delete when topic size reaches 100GB'.",
      "example": "Kafka stores messages on disk in log segments. We configure a retention period, usually something like 7 days (log.retention.hours=168). Even if all consumer groups have processed the message, Kafka keeps it until 7 days pass. This is incredibly useful because if we find a bug in production, we can reset our consumer offsets and replay the last 7 days of data.",
      "summary10s": "Keeps messages on disk for a set time (e.g., 7 days) or size, allowing replay."
    }
  },
  {
    "id": "what-happens-inside-the-jvm-when-a-method-executes-with-primitives-and-objects",
    "category": "Java",
    "question": "What happens inside the JVM when a method executes with primitives and objects?",
    "frequency": 1,
    "companies": [
      "Flipkart"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Local primitives and object references go to the Stack. The actual object data goes to the Heap.",
      "explain": "When `public void test()` executes, a stack frame is created. The primitive `int x = 10` is stored in the Stack. `Employee e` (the reference) is also in the Stack, but the actual `new Employee()` object is created in the Heap.",
      "example": "In that method, the primitive `x` and the reference variable `e` are both stored in the thread's Stack memory inside the method's frame. The actual `Employee` object instance is allocated in the Heap. Once the method finishes execution, the stack frame is popped off, destroying `x` and `e`. Since there are no more references pointing to the `Employee` object in the Heap, it becomes eligible for Garbage Collection.",
      "summary10s": "Primitives & references on Stack. Objects on Heap. Object is GCed when method ends."
    }
  },
  {
    "id": "coding-move-all-0s-to-the-end-of-the-array-1-0-1-0-0-1-0-1",
    "category": "Java Coding",
    "question": "Coding: Move all 0s to the end of the array {1, 0, 1, 0, 0, 1, 0, 1}",
    "frequency": 1,
    "companies": [
      "Flipkart"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Maintain a pointer for the position of non-zero elements, loop through, and swap non-zero elements to the front.",
      "explain": "Use a single loop with an index `count` starting at 0. If you encounter a non-zero element, place it at the `count` index and increment `count`. After the loop, fill the remaining positions from `count` to the end of the array with 0s.",
      "example": "I'd use an in-place O(n) approach. I create a `nonZeroIndex` starting at 0. I iterate through the array, and whenever I find a 1, I put it at `array[nonZeroIndex]` and increment the index. After iterating the whole array, all 1s are at the front. Then, I run a second small loop from `nonZeroIndex` to the end of the array, filling those remaining spots with 0s.",
      "summary10s": "O(n) time, O(1) space. Shift non-zeros to front, fill remaining with zeros."
    }
  },
  {
    "id": "coding-find-the-middle-node-of-a-linkedlist",
    "category": "Java Coding",
    "question": "Coding: Find the middle node of a LinkedList",
    "frequency": 1,
    "companies": [
      "Flipkart"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Use the fast and slow pointer (Tortoise and Hare) approach.",
      "explain": "Initialize two pointers, `slow` and `fast`, at the head. Move `slow` by one step and `fast` by two steps in a loop. When `fast` reaches the end of the list, `slow` will be exactly at the middle.",
      "example": "I use the two-pointer technique. I set a slow pointer and a fast pointer to the head of the LinkedList. I loop through while `fast` and `fast.next` are not null. I move `slow` one step, and `fast` two steps. Because `fast` moves twice as fast, when it hits the end of the list, `slow` is guaranteed to be pointing exactly at the middle node. This runs in O(N) time with O(1) space.",
      "summary10s": "Two pointers: slow moves 1 step, fast moves 2 steps. When fast ends, slow is at middle."
    }
  },
  {
    "id": "what-is-angular-and-how-is-it-different-from-angularjs",
    "category": "Angular",
    "question": "What is Angular and how is it different from AngularJS?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Angular is a component-based framework written in TypeScript, while AngularJS was an MVC framework based on plain JavaScript.",
      "explain": "AngularJS (1.x) used two-way data binding and scopes ($scope) which became slow in large apps. Angular (2+) was a complete rewrite. It uses a component tree, unidirectional data flow (mostly), TypeScript for static typing, and RxJS for async handling, making it much faster and more scalable.",
      "example": "When they rewrote Angular, they dropped the MVC and $scope architecture entirely. Modern Angular is component-based. It uses TypeScript instead of JavaScript, which catches errors at compile time. It also uses RxJS heavily and a completely different change detection mechanism (Zone.js/Signals) which is far more performant than the old AngularJS digest cycle.",
      "summary10s": "Angular = Component-based, TypeScript, fast. AngularJS = MVC, JavaScript, slow."
    }
  },
  {
    "id": "how-do-you-implement-custom-validation-in-reactive-forms",
    "category": "Angular",
    "question": "How do you implement custom validation in Reactive Forms?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "By creating a validator function that returns null if valid, or an error object if invalid.",
      "explain": "A custom validator is just a function that takes an AbstractControl. If the control's value passes your rule, you return null. If it fails, you return an object with a key (like { passwordWeak: true }). You then pass this function into the FormControl constructor.",
      "example": "In a recent project, I needed to ensure a username didn't contain spaces. I created a function `noSpaceValidator(control: AbstractControl)`. Inside, if `control.value` had a space, it returned `{ hasSpace: true }`, otherwise `null`. I attached it to the form control array, and in the template, I checked `form.get('username').hasError('hasSpace')` to show a red warning.",
      "summary10s": "Create a function taking AbstractControl. Return null for success, error object for failure."
    }
  },
  {
    "id": "how-would-you-migrate-an-existing-angular-application-from-an-older-version-to-a-newer-version",
    "category": "Angular",
    "question": "How would you migrate an existing Angular application from an older version to a newer version?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Use the Angular Update Guide, run ng update, and update dependencies one major version at a time.",
      "explain": "You never jump from Angular 12 to 18 directly. You migrate version by version (12 -> 13, 13 -> 14). The `ng update` CLI command automatically refactors a lot of code (like migrating to standalone components or updating RxJS imports). You must also check third-party libraries for compatibility.",
      "example": "I usually start by visiting update.angular.io. It gives a checklist. Then I update node to the required version. I run `ng update @angular/core@<next_version> @angular/cli@<next_version>`. This tool automatically runs schematics to update code syntax. Then I run tests, fix any breaking changes in RxJS or third-party libraries, and repeat until I reach the target version.",
      "summary10s": "Check update.angular.io, use ng update to run auto-migrations, migrate one major version at a time."
    }
  },
  {
    "id": "suppose-an-angular-page-takes-5-10-seconds-to-load-how-would-you-troubleshoot-and-optimize-it",
    "category": "Angular",
    "question": "Suppose an Angular page takes 5–10 seconds to load. How would you troubleshoot and optimize it?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "I'd use Chrome DevTools and Lighthouse to identify the bottleneck: bundle size, slow APIs, or change detection issues.",
      "explain": "If the initial bundle is huge, I'd implement Lazy Loading, check for heavy third-party libraries, and enable Standalone Components. If it's a runtime issue, I'd profile the app for Change Detection loops and apply OnPush strategy. If it's data-related, I'd use RxJS operators (like shareReplay) to prevent duplicate API calls.",
      "example": "First, I'd run a Lighthouse audit. If the JavaScript bundle is 5MB, I'd use `source-map-explorer` to find what's bloating it, remove unused imports, and lazy load feature modules. If the bundle is fine but rendering is slow, I'd use the Angular DevTools profiler to see if Change Detection is firing too often, and I'd switch components to OnPush and use trackBy in loops. Lastly, I'd check the Network tab to see if a slow backend API is blocking the page.",
      "summary10s": "Profile with Lighthouse/Angular DevTools. Fix via lazy loading, OnPush, trackBy, and optimizing APIs."
    }
  },
  {
    "id": "key-features-of-java-17",
    "category": "Java",
    "question": "Key features of Java 17?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Java 17 is an LTS release featuring Records, Sealed Classes, Text Blocks, and Switch Expressions.",
      "explain": "Records provide a compact syntax for immutable data classes. Sealed Classes restrict which classes can extend or implement them. Text Blocks allow multi-line strings without ugly escapes. Switch Expressions can now return values and use arrow syntax.",
      "example": "In our latest microservice, we upgraded to Java 17 to use Records for all our DTOs. It completely eliminated the need for Lombok's @Value and boilerplate getters. We also heavily use Pattern Matching for switch statements, which makes our factory classes much cleaner.",
      "summary10s": "LTS release. Brought Records, Sealed Classes, Text Blocks, Pattern Matching for Switch."
    }
  },
  {
    "id": "what-is-var-can-it-be-used-with-generics",
    "category": "Java",
    "question": "What is var? Can it be used with generics?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "var is used for local variable type inference. Yes, it can be used with generics but the right side must specify the type.",
      "explain": "var allows the compiler to infer the type of a local variable from its initialization. It cannot be used for fields, method parameters, or return types. When using generics, if you use the diamond operator (<>) on the right, it infers Object. You must provide the generic type.",
      "example": "I use `var list = new ArrayList<String>();` to save typing. If I just write `var list = new ArrayList<>();`, the compiler infers `ArrayList<Object>`, which is usually not what I want. It only works inside methods, so I can't use it for class-level variables.",
      "summary10s": "Local variable type inference. Generics need type on the right side."
    }
  },
  {
    "id": "what-is-an-effectively-final-variable",
    "category": "Java",
    "question": "What is an effectively final variable?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "A variable whose value is never changed after initialization, even if not explicitly marked with the 'final' keyword.",
      "explain": "Java 8 introduced this so you can use local variables inside lambda expressions or anonymous inner classes without having to explicitly type 'final'. If you try to reassign it later, the compiler will throw an error inside the lambda.",
      "example": "If I declare `int count = 10;` and then use `count` inside a lambda like `list.forEach(i -> System.out.println(i + count));`, it works. But if I try to do `count++` anywhere in that method, `count` loses its effectively final status and the lambda will fail to compile.",
      "summary10s": "A local variable that is never reassigned. Required for use inside lambdas."
    }
  },
  {
    "id": "what-are-java-records-how-do-you-fetch-the-first-record",
    "category": "Java",
    "question": "What are Java Records? How do you fetch the first record?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Records are a concise way to create immutable data carrier classes. You fetch data using auto-generated accessor methods.",
      "explain": "Introduced in Java 14, a Record automatically generates a constructor, getters (named the same as the fields, e.g., name() instead of getName()), equals(), hashCode(), and toString(). All fields are final.",
      "example": "Instead of writing a 50-line class for a UserDTO with getters, setters, and equals, I just write `public record UserDTO(String name, int age) {}`. To read the name, I call `user.name()` instead of `user.getName()`. It's perfect for passing immutable data between layers.",
      "summary10s": "Immutable data carriers without boilerplate. Access fields via fieldName() method."
    }
  },
  {
    "id": "what-is-optional-when-should-you-use-it",
    "category": "Java",
    "question": "What is Optional? When should you use it?",
    "frequency": 2,
    "companies": [
      "Accenture"
    ],
    "variations": [
      "What is the use of Optional?"
    ],
    "answerSEE": {
      "simple": "Optional is a container object used to represent the presence or absence of a value, preventing NullPointerExceptions.",
      "explain": "It forces the caller to actively check if a value is present using methods like isPresent() or orElse(). It should primarily be used as a method return type, never as a class field or a method parameter.",
      "example": "Instead of returning null from a repository method like findById, I return `Optional<User>`. Then the service layer has to explicitly handle the missing case, usually by calling `.orElseThrow(() -> new NotFoundException())`. This completely eliminates surprise NullPointerExceptions.",
      "summary10s": "A container for possible null values. Forces explicit null checking. Use as return type."
    }
  },
  {
    "id": "checked-vs-unchecked-exceptions",
    "category": "Java",
    "question": "Checked vs Unchecked Exceptions?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Checked exceptions are checked at compile time and must be handled. Unchecked exceptions occur at runtime.",
      "explain": "Checked exceptions (like IOException) force you to use a try-catch block or declare 'throws'. Unchecked exceptions (like NullPointerException or anything extending RuntimeException) do not require explicit handling. Modern frameworks prefer unchecked exceptions.",
      "example": "If I read a file, Java forces me to catch IOException—that's a checked exception. But if I access a null object, I get a RuntimeException—that's unchecked. In Spring Boot, almost all database or HTTP errors are unchecked because it keeps the code cleaner, and Spring handles them globally.",
      "summary10s": "Checked = compiler forces you to handle it. Unchecked (RuntimeException) = happens at runtime."
    }
  },
  {
    "id": "what-is-controlleradvice",
    "category": "Spring Boot",
    "question": "What is @ControllerAdvice?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "It is an interceptor that allows you to handle exceptions globally across all controllers in a Spring Boot application.",
      "explain": "Instead of writing try-catch blocks in every controller, you write one class with @ControllerAdvice. Methods inside it annotated with @ExceptionHandler will catch specific exceptions from anywhere and return a standardized HTTP response.",
      "example": "I use @RestControllerAdvice to catch things like ResourceNotFoundException. When a controller throws it, the advice intercepts it and returns a clean 404 JSON response with a timestamp and custom error message, so the frontend always gets a consistent error format.",
      "summary10s": "Global exception handler for all controllers. Returns consistent error responses."
    }
  },
  {
    "id": "reverse-a-string-without-built-in-methods",
    "category": "Java Coding",
    "question": "Reverse a String without built-in methods.",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Loop backwards through the string and append each character to a new string or array.",
      "explain": "Strings in Java are immutable, so concatenating in a loop is slow. It is best to use a char array or StringBuilder.",
      "example": "I convert the string to a char array, then I use a for loop starting from `length - 1` down to 0, appending each character to a StringBuilder. Finally, I return the StringBuilder as a string. This runs in O(N) time.",
      "summary10s": "Loop from string end to start. Append characters to a StringBuilder."
    }
  },
  {
    "id": "can-hashmap-keys-be-mutable-why",
    "category": "Java",
    "question": "Can HashMap keys be mutable? Why?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Technically yes, but it is highly dangerous. If the key's state changes, its hashcode changes, and the entry becomes lost.",
      "explain": "When a key is inserted, HashMap calculates its hashcode to pick a bucket. If you mutate the key later such that its hashcode changes, future get() calls will look in the wrong bucket and return null.",
      "example": "If I use a mutable object like a User as a key, and later change the User's name, the hashcode calculation changes. When I try to retrieve that user from the map, it calculates the new hashcode, looks in a different bucket, and says 'not found', even though the object is still sitting in the original bucket. Always use immutable keys like String.",
      "summary10s": "Yes, but don't. Mutating changes the hashcode, making the entry unretrievable."
    }
  },
  {
    "id": "can-interfaces-have-private-methods",
    "category": "Java",
    "question": "Can interfaces have private methods?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Yes, starting from Java 9, interfaces can have private and private static methods.",
      "explain": "They are used purely to share common code between default methods or static methods within the same interface, preventing code duplication.",
      "example": "If I have two default methods in an interface that share 5 lines of validation logic, I can extract those 5 lines into a private method inside the interface. The implementing classes won't see it, but it keeps my interface code DRY.",
      "summary10s": "Yes, since Java 9. Used as helper methods for default/static methods to avoid duplication."
    }
  },
  {
    "id": "what-types-of-methods-can-interfaces-contain",
    "category": "Java",
    "question": "What types of methods can interfaces contain?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Abstract, Default, Static, and Private methods.",
      "explain": "Pre-Java 8: Only abstract. Java 8: Added default (with body, inheritable) and static (with body, bound to interface). Java 9: Added private (helper methods).",
      "example": "In modern Java, an interface can have standard abstract methods that subclasses must implement. It can have default methods to provide a fallback implementation. It can have static utility methods called on the interface itself, and private methods to help the default methods.",
      "summary10s": "Abstract (no body), Default (fallback body), Static (utility), Private (internal helper)."
    }
  },
  {
    "id": "same-default-method-in-two-interfaces-how-to-resolve",
    "category": "Java",
    "question": "Same default method in two interfaces how to resolve?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The implementing class must override the method to resolve the conflict.",
      "explain": "If a class implements two interfaces that have a default method with the exact same signature, the compiler throws an error (Diamond Problem). The class must override the method and explicitly choose which interface's method to call.",
      "example": "If I implement InterfaceA and InterfaceB, and both have a default method `show()`, my class won't compile. I have to override `show()` in my class, and inside it, I can call `InterfaceA.super.show()` to explicitly pick one, or just write a completely new implementation.",
      "summary10s": "Compiler error. Must override the method in the class and explicitly call Interface.super.method()."
    }
  },
  {
    "id": "what-are-the-solid-principles",
    "category": "System Design",
    "question": "What are the SOLID principles?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Five design principles: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion.",
      "explain": "They make object-oriented designs more understandable, flexible, and maintainable. They prevent code from becoming tightly coupled and rigid.",
      "example": "I use Single Responsibility so a class only has one reason to change. I use Open/Closed to add new features via inheritance or interfaces without touching existing code. I use Dependency Inversion by injecting interfaces (like an EmailSender interface) rather than concrete classes, making it easy to swap implementations.",
      "summary10s": "SRP (one job), OCP (extend not modify), LSP (subclass swap), ISP (small interfaces), DIP (depend on abstractions)."
    }
  },
  {
    "id": "what-is-the-liskov-substitution-principle",
    "category": "System Design",
    "question": "What is the Liskov Substitution Principle?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Objects of a superclass must be replaceable with objects of its subclasses without breaking the application.",
      "explain": "A subclass should behave in a way that clients of the superclass expect. It shouldn't throw unexpected exceptions or change fundamental behavior.",
      "example": "If I have a `Bird` class with a `fly()` method, and I create an `Ostrich` subclass, I violate Liskov if `Ostrich` throws an exception for `fly()`. A better design is to have a `FlyingBird` interface. That way, any code expecting a `FlyingBird` will work perfectly with any subclass passed to it.",
      "summary10s": "Subclasses must behave correctly when used in place of their parent class."
    }
  },
  {
    "id": "explain-the-factory-design-pattern",
    "category": "System Design",
    "question": "Explain the Factory Design Pattern.",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "A creational pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.",
      "explain": "Instead of calling `new Object()`, you call a factory method. This encapsulates the instantiation logic, making the system loosely coupled and easier to extend.",
      "example": "If I need to generate different types of documents (PDF, Word), I create a `DocumentFactory`. I pass in a type string like 'PDF', and the factory contains the complex switch statement to instantiate and return the correct document object. The client code just gets the interface and doesn't care how it was built.",
      "summary10s": "Encapsulates object creation. Centralizes the 'new' keyword logic based on input parameters."
    }
  },
  {
    "id": "synchronized-vs-reentrantlock",
    "category": "Java",
    "question": "synchronized vs ReentrantLock?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "synchronized is a basic built-in keyword for locking. ReentrantLock is a flexible class offering advanced features like try-lock and fair locking.",
      "explain": "synchronized locks automatically release when the block ends. ReentrantLock requires explicit `lock()` and `unlock()` (usually in a finally block), but gives you the ability to interrupt a waiting thread, try to acquire a lock without blocking, and enforce fairness (longest waiting thread gets the lock).",
      "example": "I usually stick to `synchronized` because it's simple and less error-prone. But if I need to attempt to get a lock for only 5 seconds and then give up instead of waiting forever, I have to use `ReentrantLock.tryLock()`. I also use it when I need to lock in one method and unlock in another.",
      "summary10s": "synchronized = simple, auto-release. ReentrantLock = advanced features like tryLock, interruptibility, and fairness."
    }
  },
  {
    "id": "what-is-volatile",
    "category": "Java",
    "question": "What is volatile?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "A keyword that ensures a variable is always read from and written to main memory, not the thread's local cache.",
      "explain": "Threads often cache variables for performance. If one thread updates a flag, another thread might not see it immediately. Marking it `volatile` guarantees visibility across all threads. However, it does not guarantee atomicity (e.g., count++ is still not safe).",
      "example": "If I have a `boolean isRunning = true` flag used to keep a background thread looping, and another thread sets it to false to stop it, I must mark it as `volatile`. Otherwise, the background thread might keep reading its cached `true` value forever and never stop.",
      "summary10s": "Guarantees visibility of changes across threads by bypassing CPU caches. Does NOT guarantee atomicity."
    }
  },
  {
    "id": "volatile-vs-atomic-classes",
    "category": "Java",
    "question": "volatile vs Atomic classes?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "volatile ensures visibility of a value across threads, but Atomic classes ensure both visibility AND atomicity for operations like incrementing.",
      "explain": "An operation like `count++` is actually 3 steps (read, add, write). `volatile` doesn't stop two threads from reading the same value simultaneously and overwriting each other. `AtomicInteger` uses CAS (Compare-And-Swap) at the hardware level to do it safely without blocking.",
      "example": "If I just need a boolean flag to start/stop a thread, `volatile` is perfect. But if I am counting total web requests concurrently, `volatile int count` will lose counts. I must use `AtomicInteger.incrementAndGet()` to ensure thread-safe counting without heavy locks.",
      "summary10s": "volatile = visibility only (good for flags). Atomic = visibility + thread-safe operations (good for counters)."
    }
  },
  {
    "id": "what-is-completablefuture",
    "category": "Java",
    "question": "What is CompletableFuture?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "It is an advanced asynchronous programming tool in Java that allows you to chain non-blocking tasks and handle errors easily.",
      "explain": "Unlike the old Future, which forced you to block using `.get()`, CompletableFuture provides methods like `thenApply` and `thenCombine` to trigger callbacks automatically when a task finishes.",
      "example": "I use CompletableFuture when an API needs to fetch user data and order data from two different microservices simultaneously. I fire both off asynchronously, use `thenCombine` to merge their results, and return the combined response to the frontend without blocking the main Tomcat thread.",
      "summary10s": "Non-blocking async tool. Allows chaining tasks and combining results via callbacks."
    }
  },
  {
    "id": "what-is-a-race-condition-how-do-you-prevent-it",
    "category": "Java",
    "question": "What is a Race Condition? How do you prevent it?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "A race condition occurs when multiple threads modify shared data simultaneously, causing unpredictable and incorrect results.",
      "explain": "It happens when the outcome depends on the unpredictable timing of thread execution. You prevent it by synchronizing the critical section so only one thread can execute it at a time.",
      "example": "If two threads try to withdraw money from a bank account at the same time, they both might read a balance of $100 and allow a $100 withdrawal, resulting in a negative balance. I prevent this by using a `synchronized` block around the withdrawal logic or using `ReentrantLock` so the second thread has to wait.",
      "summary10s": "Threads stepping on each other's toes. Prevent using synchronized blocks, Locks, or Atomic classes."
    }
  },
  {
    "id": "stream-vs-parallel-stream",
    "category": "Java",
    "question": "Stream vs Parallel Stream?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Stream processes elements sequentially on a single thread. Parallel Stream divides elements into chunks and processes them concurrently on multiple threads.",
      "explain": "Parallel streams use the common ForkJoinPool. They are faster for massive datasets or CPU-intensive tasks, but slower for small tasks due to thread overhead. They are also dangerous if the operations are stateful.",
      "example": "I use a standard Stream 99% of the time. If I have a massive list of 1 million records and I need to do heavy CPU math on each, I'll switch to `.parallelStream()`. But I never use parallel streams if the operation involves network calls or database queries, as it will just exhaust the thread pool.",
      "summary10s": "Stream = single thread. Parallel = multi-thread using ForkJoinPool (use only for heavy CPU tasks)."
    }
  },
  {
    "id": "map-vs-flatmap",
    "category": "Java",
    "question": "map() vs flatMap()?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "map() transforms one element into one new element. flatMap() transforms one element into a stream of elements and flattens them into a single stream.",
      "explain": "If you use map() on a list of lists, you get a Stream of Lists. If you use flatMap(), you get a Stream of the individual items from all the inner lists combined.",
      "example": "If I have a List of Users, and I want a list of their names, I use `map(user -> user.getName())` (1-to-1). If each User has a List of PhoneNumbers, and I want a single list of all phone numbers for all users, I use `flatMap(user -> user.getPhoneNumbers().stream())` (1-to-many flattened).",
      "summary10s": "map = 1 to 1 transformation. flatMap = 1 to Many transformation, flattened into a single stream."
    }
  },
  {
    "id": "what-is-a-functional-interface",
    "category": "Java",
    "question": "What is a Functional Interface?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "An interface that has exactly one abstract method. They are the basis for Lambda expressions.",
      "explain": "It can have multiple default or static methods, but only one abstract method. The @FunctionalInterface annotation is optional but recommended to prevent others from accidentally adding a second abstract method.",
      "example": "The standard `Runnable` or `Comparator` interfaces are functional interfaces. If I want to pass a block of code as a parameter to a method, the method must accept a Functional Interface. I can then pass a lambda expression like `(a, b) -> a.compareTo(b)`.",
      "summary10s": "Interface with exactly one abstract method. Used as target types for lambda expressions."
    }
  },
  {
    "id": "what-are-intermediate-and-terminal-operations",
    "category": "Java",
    "question": "What are intermediate and terminal operations?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Intermediate operations return a new stream and are lazy. Terminal operations produce a final result and trigger the execution of the stream.",
      "explain": "Methods like filter(), map(), and sorted() are intermediate. They do nothing until a terminal operation is called. Methods like collect(), count(), and forEach() are terminal and close the stream.",
      "example": "If I write `list.stream().filter(x -> x > 10)`, absolutely nothing happens because it's lazy. The filtering only actually executes when I append a terminal operation like `.collect(Collectors.toList())` at the end.",
      "summary10s": "Intermediate (map, filter) = lazy, returns stream. Terminal (collect, count) = triggers execution, returns result."
    }
  },
  {
    "id": "what-is-the-difference-between-filter-and-map",
    "category": "Java",
    "question": "What is the difference between filter() and map()?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "filter() selects elements based on a condition, keeping the type the same. map() transforms elements, potentially changing their type.",
      "explain": "filter takes a Predicate (returns boolean). If true, the element stays. map takes a Function (returns an object). It converts the input into something else.",
      "example": "I use `filter(user -> user.getAge() > 18)` to remove underage users from the stream. Then I use `map(user -> user.getEmail())` to transform the remaining User objects into a stream of String emails.",
      "summary10s": "filter removes unwanted elements. map transforms elements from one type/value to another."
    }
  },
  {
    "id": "how-does-the-spring-container-work",
    "category": "Spring Boot",
    "question": "How does the Spring Container work?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The Spring IoC container creates, wires, and manages the lifecycle of objects (beans) in your application.",
      "explain": "It scans for annotations like @Component, creates instances of those classes, injects any dependencies they need, and stores them in its context for the duration of the application.",
      "example": "When my Spring Boot app starts, the container scans my packages. It sees my @Service and my @Repository. It creates the Repository first, then creates the Service and automatically passes the Repository into its constructor. It manages everything so I never have to write `new MyService()`.",
      "summary10s": "Inversion of Control (IoC). It scans, creates, and injects dependencies (beans) automatically."
    }
  },
  {
    "id": "explain-the-bean-lifecycle",
    "category": "Spring Boot",
    "question": "Explain the Bean Lifecycle.",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Instantiation -> Dependency Injection -> Initialization (@PostConstruct) -> Use -> Destruction (@PreDestroy).",
      "explain": "First, Spring creates the object. Second, it injects dependencies. Third, it calls any initialization methods (like @PostConstruct). Then the bean is ready for use. On shutdown, it calls destruction methods.",
      "example": "After Spring injects a database config dependency into my bean, I often need to test the connection immediately. I write a method annotated with `@PostConstruct` to do this. Spring guarantees this method runs exactly once, right after injection but before the application starts serving traffic.",
      "summary10s": "Instantiate -> Inject -> @PostConstruct (init) -> Application runs -> @PreDestroy (cleanup)."
    }
  },
  {
    "id": "what-does-enableautoconfiguration-do",
    "category": "Spring Boot",
    "question": "What does @EnableAutoConfiguration do?",
    "frequency": 2,
    "companies": [
      "Accenture"
    ],
    "variations": [
      "What is the purpose of @EnableAutoConfiguration?"
    ],
    "answerSEE": {
      "simple": "It automatically configures your Spring application based on the jar dependencies present on the classpath.",
      "explain": "It's the magic behind Spring Boot. If it sees Tomcat and Spring MVC on the classpath, it configures a web server. If it sees a database driver, it configures a DataSource.",
      "example": "Because of @EnableAutoConfiguration (which is part of @SpringBootApplication), I don't have to write any XML or @Configuration classes to connect to a database. I just drop the PostgreSQL dependency in my pom.xml, put the URL in application.properties, and Spring auto-configures the rest.",
      "summary10s": "Guesses and configures beans automatically based on what dependencies are in the classpath."
    }
  },
  {
    "id": "primary-vs-qualifier",
    "category": "Spring Boot",
    "question": "@Primary vs @Qualifier?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "@Primary sets a default bean when multiple exist. @Qualifier specifies exactly which bean to inject by name.",
      "explain": "If you have two implementations of an interface, Spring won't know which to inject and will throw an error. @Primary solves this globally by making one the default. @Qualifier solves it locally at the injection point.",
      "example": "If I have an `EmailSender` and an `SmsSender` both implementing `NotificationSender`, Spring fails to inject. I can put `@Primary` on `EmailSender` so it's always picked by default. Or, I can use `@Qualifier(\"smsSender\")` on the constructor parameter to specifically request the SMS version.",
      "summary10s": "@Primary = the default choice. @Qualifier = explicitly selecting a bean by its name."
    }
  },
  {
    "id": "ioc-vs-dependency-injection",
    "category": "Spring Boot",
    "question": "IoC vs Dependency Injection?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "IoC is the concept of handing over control to a framework. DI is the actual design pattern used to implement IoC.",
      "explain": "Inversion of Control means the framework calls your code, not the other way around. Dependency Injection is the specific mechanism where the framework provides objects with their instance variables.",
      "example": "IoC is the philosophy—my code doesn't manage its own lifecycle, the Spring container does. Dependency injection is the execution—Spring physically passing the Repository instance into the Service's constructor at startup.",
      "summary10s": "IoC is the principle (framework is in control). DI is the pattern (passing dependencies via constructor)."
    }
  },
  {
    "id": "what-are-the-types-of-dependency-injection",
    "category": "Spring Boot",
    "question": "What are the types of Dependency Injection?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Constructor Injection, Setter Injection, and Field Injection.",
      "explain": "Constructor injection requires dependencies when the object is created (best for mandatory dependencies). Setter allows injecting later (optional). Field uses @Autowired directly on the variable (bad practice, hard to test).",
      "example": "I strictly use Constructor Injection. I declare a `final` field and use a constructor (or Lombok's @RequiredArgsConstructor). It ensures the bean can't be instantiated without its dependencies, prevents circular dependencies at startup, and makes the class easy to unit test without needing Spring.",
      "summary10s": "Constructor (Best, enforces mandatory), Setter (Optional), Field (Bad practice, uses reflection)."
    }
  },
  {
    "id": "what-are-spring-profiles",
    "category": "Spring Boot",
    "question": "What are Spring Profiles?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Profiles allow you to map parts of your configuration or beans to different environments (e.g., dev, test, prod).",
      "explain": "You can load different properties (application-dev.yml vs application-prod.yml) or conditionally load beans using @Profile depending on the active environment.",
      "example": "In my project, we use an in-memory H2 database for the 'dev' profile so we can test locally quickly, but the 'prod' profile connects to AWS RDS. We just set the active profile to 'prod' via environment variables during deployment, and Spring switches configurations automatically.",
      "summary10s": "Environment-specific configurations. Load different properties or beans for dev vs prod."
    }
  },
  {
    "id": "pathvariable-vs-requestparam",
    "category": "Spring Boot",
    "question": "@PathVariable vs @RequestParam?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "@PathVariable extracts values from the URI path. @RequestParam extracts values from the query string.",
      "explain": "Path variables are used to identify specific resources. Request params are used to filter, sort, or paginate those resources.",
      "example": "If the URL is `/users/123?status=active`, I use `@PathVariable` to get the '123' because it identifies the specific user. I use `@RequestParam` to get 'active' because it's an optional filter on the request.",
      "summary10s": "PathVariable = `/users/{id}` (identifies resource). RequestParam = `?status=active` (filters/options)."
    }
  },
  {
    "id": "lazy-vs-eager-loading",
    "category": "Spring Boot",
    "question": "Lazy vs Eager Loading?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Eager loading fetches related data immediately. Lazy loading waits and fetches related data only when it is accessed.",
      "explain": "In JPA/Hibernate, a `@OneToMany` relationship is Lazy by default (avoids massive queries), while `@ManyToOne` is Eager. Lazy loading improves initial query performance but can cause the N+1 select problem.",
      "example": "If I fetch a User entity, eager loading pulls all their 1000 Orders from the DB immediately, which is slow. Lazy loading only fetches the User. The Orders are replaced with a proxy. The DB query for Orders only fires if I explicitly call `user.getOrders()`. But I have to be careful not to call it inside a loop, or I get N+1 queries.",
      "summary10s": "Eager = fetch all related data immediately. Lazy = fetch related data on-demand via a proxy."
    }
  },
  {
    "id": "what-is-spring-security",
    "category": "Spring Boot",
    "question": "What is Spring Security?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "It is a framework that provides authentication, authorization, and protection against common attacks like CSRF.",
      "explain": "It acts as a filter chain sitting in front of your controllers. It intercepts every incoming request, checks if the user is authenticated, and verifies they have the required roles to access the endpoint.",
      "example": "I use Spring Security to protect my REST APIs. By configuring a SecurityFilterChain, I ensure that endpoints like `/api/public` are open to everyone, but `/api/admin` requires the user to pass a valid JWT token in the header and have the 'ADMIN' role.",
      "summary10s": "A customizable filter chain for authentication and authorization in Spring apps."
    }
  },
  {
    "id": "authentication-vs-authorization",
    "category": "Spring Boot",
    "question": "Authentication vs Authorization?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Authentication is verifying WHO you are (login). Authorization is verifying WHAT you are allowed to do (roles/permissions).",
      "explain": "Authentication comes first—checking credentials against a database to prove identity. Authorization happens next—checking if that authenticated identity has the rights to view a specific page or execute an action.",
      "example": "When a user enters their username and password, that's Authentication. If they pass, they get a JWT token. When they try to access the `/delete-user` endpoint and the system checks if they have the 'ADMIN' role, that's Authorization.",
      "summary10s": "Authentication = Who are you? (Credentials). Authorization = What can you do? (Roles)."
    }
  },
  {
    "id": "how-does-jwt-authentication-work",
    "category": "Spring Boot",
    "question": "How does JWT authentication work?",
    "frequency": 2,
    "companies": [
      "Accenture"
    ],
    "variations": [
      "Have you implemented JWT?"
    ],
    "answerSEE": {
      "simple": "The server generates a signed token upon login, and the client sends it back on every request to prove identity without the server storing session state.",
      "explain": "JWTs contain a header, payload (claims like username/roles), and a signature. The server signs it with a secret key. On subsequent requests, the server validates the signature to ensure the token wasn't tampered with, extracting the user info directly from the payload.",
      "example": "Upon login, I generate a JWT using a secret key and return it. The frontend stores it and sends it in the `Authorization: Bearer <token>` header. My Spring Security filter intercepts the request, parses the JWT, verifies the signature, extracts the username and roles, and places the user into the SecurityContext.",
      "summary10s": "Stateless auth. Server signs a token on login. Client sends token in header. Server verifies signature."
    }
  },
  {
    "id": "how-do-you-secure-rest-apis",
    "category": "Spring Boot",
    "question": "How do you secure REST APIs?",
    "frequency": 2,
    "companies": [
      "Accenture"
    ],
    "variations": [
      "What type of security are you using in your current project?"
    ],
    "answerSEE": {
      "simple": "By enforcing HTTPS, implementing stateless JWT authentication, and applying role-based authorization.",
      "explain": "REST should be stateless, so sessions shouldn't be used. Instead, secure the transport layer with TLS (HTTPS), use OAuth2 or JWT for authentication, validate all incoming inputs to prevent injection, and apply rate limiting.",
      "example": "To secure my Spring Boot APIs, I disable default session creation to make it completely stateless. I add a custom JWT filter to authenticate requests. I use `@PreAuthorize(\"hasRole('ADMIN')\")` on sensitive controller methods, and ensure the API is deployed behind an API Gateway that handles HTTPS and rate limiting.",
      "summary10s": "Use HTTPS, stateless JWTs, input validation, rate limiting, and method-level role authorization."
    }
  },
  {
    "id": "how-do-you-implement-security-across-microservices",
    "category": "Microservices",
    "question": "How do you implement security across microservices?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Use an API Gateway for external authentication and pass a JWT token to downstream services.",
      "explain": "The API Gateway handles the initial login/authentication (often via an Identity Provider like Keycloak or OAuth2). It verifies the token and forwards the request along with the JWT to internal microservices. Internal services just validate the JWT signature to trust the request.",
      "example": "In my architecture, the client hits the API Gateway. The Gateway validates the JWT. If valid, it forwards the request to the Order Service, passing the JWT in the header. The Order Service doesn't talk to a database to authenticate; it simply verifies the JWT's cryptographic signature using a shared public key, extracts the user roles, and authorizes the action.",
      "summary10s": "API Gateway handles auth. Internal services trust the forwarded JWT by verifying its signature."
    }
  },
  {
    "id": "what-are-the-java-8-features-you-have-used",
    "category": "Java",
    "question": "What are the Java 8 features you have used?",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "I mostly use Streams, Lambdas, Optional, and the new Date/Time API.",
      "explain": "Java 8 changed how we write Java. Streams allow declarative data processing. Lambdas provide concise implementations for functional interfaces. Optional prevents NullPointerExceptions, and the java.time package replaces the old, thread-unsafe Date/Calendar classes.",
      "example": "In my current project, I use Streams heavily to map and filter lists of DTOs. I use Optional as a return type for database queries to force null-checking, and I use the LocalDate API for all timestamp logging because it's thread-safe and immutable.",
      "summary10s": "Streams (processing), Lambdas (concise code), Optional (null-safety), Date/Time API (thread-safe dates)."
    }
  },
  {
    "id": "why-were-functional-interfaces-introduced-in-java-8",
    "category": "Java",
    "question": "Why were Functional Interfaces introduced in Java 8?",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "They were introduced to enable functional programming and to act as the target types for Lambda expressions.",
      "explain": "Before Java 8, we had to use bulky anonymous inner classes to pass behavior to a method. Functional interfaces (interfaces with exactly one abstract method) give the compiler a specific type to map a Lambda expression to, allowing us to pass functions as arguments.",
      "example": "Before Java 8, if I wanted to run a thread, I had to create an anonymous class implementing `Runnable`. Now, because `Runnable` is a Functional Interface, I can just pass a simple Lambda `() -> System.out.println(\"running\")`. It dramatically reduces boilerplate code.",
      "summary10s": "To support Lambda expressions. They act as the target type when passing a function as a parameter."
    }
  },
  {
    "id": "how-have-you-used-functional-interfaces-with-lambda-expressions",
    "category": "Java",
    "question": "How have you used Functional Interfaces with Lambda expressions?",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "I use them mostly with Streams, passing Lambdas to methods like map(), filter(), and forEach().",
      "explain": "Java provides built-in functional interfaces in `java.util.function` like Predicate, Function, Consumer, and Supplier. Whenever I call a Stream method, I am passing a Lambda that implements one of these interfaces.",
      "example": "When I call `list.stream().filter(user -> user.getAge() > 18)`, I am actually passing a Lambda expression that implements the `Predicate<User>` functional interface. I also occasionally write custom functional interfaces annotated with `@FunctionalInterface` for specific callback patterns.",
      "summary10s": "Mostly via Stream API. filter() takes a Predicate, map() takes a Function, forEach() takes a Consumer."
    }
  },
  {
    "id": "what-is-the-input-and-output-of-predicate",
    "category": "Java",
    "question": "What is the input and output of Predicate?",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "A Predicate takes one input of any type (T) and always outputs a boolean primitive.",
      "explain": "It represents a boolean-valued function. It is primarily used for filtering or matching. The single abstract method it contains is called `test(T t)`.",
      "example": "If I define `Predicate<String> isLong = str -> str.length() > 5;`, the input is a String, and the output is true or false. I can then pass this predicate to `stream().filter(isLong)` to keep only the long strings.",
      "summary10s": "Input: Object of type T. Output: boolean. Used heavily for filtering."
    }
  },
  {
    "id": "given-a-list-of-integers-find-print-duplicate-values-using-java-8-streams",
    "category": "Java Coding",
    "question": "Given a list of integers, find/print duplicate values using Java 8 Streams.",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Use a Set to track seen items, and filter the stream based on whether adding the item to the Set fails.",
      "explain": "A `HashSet.add()` returns false if the item already exists in the set. By putting this check inside a `filter()` operation on the stream, we easily isolate the duplicates without writing nested loops.",
      "example": "I would initialize a `Set<Integer> seen = new HashSet<>();`. Then I'd create the stream from the list and use `list.stream().filter(n -> !seen.add(n)).forEach(System.out::println);`. It runs in O(N) time and requires O(N) space for the Set.",
      "summary10s": "Create an external Set. Use `.filter(n -> !set.add(n))` inside the stream."
    }
  },
  {
    "id": "what-happens-if-static-and-final-are-used-with-a-variable",
    "category": "Java",
    "question": "What happens if static and final are used with a variable?",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "It creates a constant. It belongs to the class (static) and its value cannot be changed once assigned (final).",
      "explain": "Using both keywords means there is only one copy of this variable in memory for the whole class, and it is immutable. By convention, such variables are named in ALL_CAPS.",
      "example": "I use `public static final int MAX_USERS = 100;` to define a global constant. Because it's static, I don't need an object to access it. Because it's final, no one can accidentally change `MAX_USERS` to 200 during runtime. The compiler will enforce this.",
      "summary10s": "It creates a class-level constant. One shared copy, value cannot be modified."
    }
  },
  {
    "id": "what-will-be-the-output-of-a-given-java-code-snippet",
    "category": "Java Coding",
    "question": "What will be the output of a given Java code snippet?",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Be prepared to dry-run output questions focusing on Object references, String pools, exception handling blocks, or collection behavior.",
      "explain": "Interviewers use output snippets to test deep understanding of JVM behavior rather than syntax. Common traps include comparing Strings with `==` instead of `.equals()`, or trying to catch an exception after a `finally` block.",
      "example": "Usually, I read the snippet line by line like the compiler. If I see `String a = \"hi\"; String b = \"hi\"; a == b`, I know it prints true because they point to the same String Pool reference. If I see a try-catch-finally returning different values, I remember that `finally` always overrides the return.",
      "summary10s": "Tests deep JVM concepts like String Pool, pass-by-value vs reference, or try-catch-finally execution order."
    }
  },
  {
    "id": "what-happens-if-is-removed-from-a-filter-condition-using-hashset-add",
    "category": "Java Coding",
    "question": "What happens if ! is removed from a filter() condition using HashSet.add()?",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "The stream will filter out the duplicates and keep only the first occurrence of each unique element.",
      "explain": "If you use `filter(n -> seen.add(n))`, it returns `true` the first time an element is added to the Set, allowing it to pass through. If the element is a duplicate, `add()` returns `false`, and the filter drops it. This effectively creates a list of distinct elements.",
      "example": "If I have a list `[1, 2, 2, 3]`, and I do `filter(n -> seen.add(n))`, the number 1 passes. The first 2 passes. The second 2 returns false and is filtered out. The 3 passes. So the stream result is `[1, 2, 3]`. It acts exactly like `.distinct()`.",
      "summary10s": "Removing the `!` reverses the logic. It will return distinct elements instead of duplicates."
    }
  },
  {
    "id": "what-genai-llm-tools-have-you-worked-with",
    "category": "Other",
    "question": "What GenAI/LLM tools have you worked with?",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "I have worked with tools like ChatGPT, GitHub Copilot, and Claude for coding, and explored integrating OpenAI APIs in backend services.",
      "explain": "Familiarity with consumer tools shows productivity. Familiarity with API integrations (like Langchain or direct OpenAI API calls) shows engineering capability with LLMs.",
      "example": "On a daily basis, I use GitHub Copilot embedded in my IDE to write boilerplate code and unit tests faster. I also use ChatGPT for debugging complex stack traces. On the development side, I did a POC where I called the OpenAI API from our Spring Boot backend to automatically summarize user reviews.",
      "summary10s": "Copilot/ChatGPT for productivity. OpenAI API for integrating AI features into applications."
    }
  },
  {
    "id": "what-is-your-hands-on-experience-with-genai",
    "category": "Other",
    "question": "What is your hands-on experience with GenAI?",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "I have used GenAI to increase my coding efficiency and have built small proof-of-concepts calling LLM APIs.",
      "explain": "As a backend developer, hands-on experience usually means prompt engineering for productivity, writing API wrappers around LLM endpoints, or using frameworks like LangChain4j.",
      "example": "My primary hands-on experience is productivity-based—using it to generate Regex, write SQL queries, and generate JUnit tests. I also experimented with Spring AI (or LangChain4j) to create a simple RAG (Retrieval-Augmented Generation) pipeline that answers questions based on our internal PDF documentation.",
      "summary10s": "Used for developer productivity (Regex, Tests, SQL) and basic API integrations (Spring AI/LangChain4j)."
    }
  },
  {
    "id": "have-you-worked-on-frontend-angular",
    "category": "Other",
    "question": "Have you worked on frontend/Angular?",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "State your genuine experience level. If you are a backend dev, emphasize that you understand the concepts but focus mainly on APIs.",
      "explain": "Full-stack roles expect some UI knowledge. If you are strong in backend, just show you can debug frontend issues and connect APIs properly.",
      "example": "While my core expertise is Java backend, I have worked with Angular on the frontend. I can build components, manage state using RxJS BehaviorSubjects, and consume REST APIs using HttpClient. I am comfortable making UI changes and debugging the full flow from the browser network tab down to the database.",
      "summary10s": "Be honest. Highlight your ability to build components, use RxJS, and connect frontend to your backend APIs."
    }
  }
];

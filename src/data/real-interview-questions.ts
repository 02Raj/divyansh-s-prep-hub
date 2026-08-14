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
    "frequency": 9,
    "companies": [
      "Amazon",
      "Walmart",
      "Morgan Stanley"
    ],
    "variations": [
      "What happens if you only override equals() in HashMap?",
      "equals() and hashCode()"
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
    "frequency": 4,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "What is Dependency Injection in Angular? Explain the different provider scopes.",
      "Dependency Injection in Spring Boot"
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
    "frequency": 2,
    "companies": [
      "Flipkart"
    ],
    "variations": [
      "How do microservices communicate?"
    ],
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
    "frequency": 2,
    "companies": [
      "Flipkart"
    ],
    "variations": [
      "Global Exception Handling"
    ],
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
    "frequency": 2,
    "companies": [
      "Flipkart"
    ],
    "variations": [
      "Kafka Broker Goes Down"
    ],
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
    "frequency": 2,
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
    "frequency": 2,
    "companies": [],
    "variations": [
      "SOLID Principles"
    ],
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
    "frequency": 2,
    "companies": [],
    "variations": [
      "Factory Design Pattern"
    ],
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
    "frequency": 3,
    "companies": [],
    "variations": [
      "map() vs flatMap()"
    ],
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
    "frequency": 2,
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
    "frequency": 3,
    "companies": [],
    "variations": [
      "Lazy vs Eager Loading",
      "Lazy vs Eager"
    ],
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
  },
  {
    "id": "what-is-optional-in-java-8",
    "category": "Java",
    "question": "What is Optional in Java 8?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Optional is a wrapper class used to avoid null checks and NullPointerException.",
      "explain": "Wraps a value that may or may not be present\nMethods like isPresent(), orElse(), ifPresent() handle absence safely\nEncourages explicit null-handling instead of silent NPEs\n\nExample: Optional<String> name = Optional.ofNullable(getName()); name.orElse(\"Unknown\");",
      "example": "\"Optional is a container object used to represent a value that might be absent, mainly to avoid explicit null checks and NullPointerException. Instead of returning null from a method, I return Optional and the caller can safely handle it using orElse() or ifPresent(). I use it mostly in service/repository layers where a lookup might not find a result.\"",
      "summary10s": "Wrapper to avoid null checks — orElse(), ifPresent(), isPresent()."
    }
  },
  {
    "id": "what-is-apache-kafka-why-asynchronous",
    "category": "Microservices",
    "question": "What is Apache Kafka? Why asynchronous?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Kafka is a distributed messaging system used for high-throughput, real-time event streaming between services.",
      "explain": "Producer sends messages to a Topic without waiting for the Consumer to process them\nConsumer reads messages independently, at its own pace\nThis decoupling of send/receive timing is why it's called asynchronous",
      "example": "\"Kafka is a distributed event streaming platform used for building real-time data pipelines between microservices. It's called asynchronous because the Producer just publishes a message to a topic and moves on — it doesn't wait for the Consumer to process it. The Consumer reads and processes messages independently, whenever it's ready, so the two are fully decoupled in time.\"",
      "summary10s": "Producer sends, doesn't wait — Consumer reads later = asynchronous."
    }
  },
  {
    "id": "query-returns-1-lakh-records-how-to-improve-performance",
    "category": "SQL",
    "question": "Query returns 1 lakh records — how to improve performance?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Improve it using pagination, indexing, and fetching only required columns.",
      "explain": "Use pagination (LIMIT/OFFSET or Spring Data Pageable) instead of loading all at once\nAdd indexes on filter/sort columns, check plan via EXPLAIN ANALYZE\nFetch only needed columns (avoid SELECT *), stream large results if processing server-side",
      "example": "\"First, I'd avoid loading all 1 lakh records into memory at once — I'd use pagination with Spring Data's Pageable to fetch data in chunks. I'd also check if proper indexes exist on the columns used in WHERE or ORDER BY, using EXPLAIN ANALYZE to verify. If it's a batch job that must process everything, I'd use streaming instead of loading it all into a List.\"",
      "summary10s": "Paginate + index + select only needed columns."
    }
  },
  {
    "id": "default-static-methods-in-functional-interface",
    "category": "Java",
    "question": "Default & Static methods in Functional Interface",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Default and static methods let interfaces have method bodies without breaking the single-abstract-method rule.\\",
      "explain": "Default methods are called on an instance/object, using instance.methodName()\nStatic methods are called directly on the interface, using InterfaceName.methodName()\nBoth don't count toward the \"single abstract method\" requirement\n          Default method → has implementation and is inherited by implementing classes.\nStatic method → belongs to the interface and is called using the interface name.\n\nApproach: Define a functional interface with one abstract method, add a default and a static method, then implement and call them.\n@FunctionalInterface\ninterface Calculator {\n    int calculate(int a, int b);\n\n    default void printResult(int a, int b) {\n        System.out.println(\"Result: \" + calculate(a, b));\n    }\n\n    static Calculator getAdder() {\n        return (a, b) -> a + b;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Calculator add = Calculator.getAdder(); // static method call\n        add.printResult(5, 3);                  // default method call → Result: 8\n    }\n}",
      "example": "\"Default methods are called on an object instance, like add.printResult(), and they provide a common implementation shared across all implementations. Static methods belong to the interface itself, called like Calculator.getAdder(), usually for factory or utility logic. Both were introduced in Java 8 so interfaces could evolve without breaking existing implementations.\"",
      "summary10s": "Default → call on object, Static → call on interface name directly."
    }
  },
  {
    "id": "findfirst-vs-findany",
    "category": "Java",
    "question": "findFirst() vs findAny()",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "findFirst() always returns the first matching element; findAny() returns any matching element, useful in parallel streams.",
      "explain": "findFirst() — respects encounter order, deterministic\nfindAny() — no order guarantee, can return faster in parallel streams\nBoth return an Optional<T>",
      "example": "\"findFirst() guarantees it returns the first element that matches, respecting the stream's order. findAny() doesn't guarantee which matching element you get — it just returns whichever one it finds first, which makes it more efficient in parallel streams since there's no ordering constraint. I use findFirst() when order matters, and findAny() when I just need any match and I'm optimizing for performance.\"",
      "summary10s": "findFirst = ordered, findAny = faster in parallel, no order guarantee."
    }
  },
  {
    "id": "comparable-vs-comparator",
    "category": "Java",
    "question": "Comparable vs Comparator",
    "frequency": 2,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Comparable defines a class's natural ordering; Comparator defines custom ordering from outside the class.",
      "explain": "Comparable — compareTo(), inside the class, single default order\nComparator — compare(), external, multiple custom sort strategies\nComparator often used with lambdas for flexible sorting",
      "example": "\"Comparable is implemented inside the class to define its one natural sort order, using compareTo(). Comparator is external and lets me define multiple different sorting strategies without modifying the original class, using compare(). In real projects, I mostly use Comparator with lambdas when I need to sort a list by different fields depending on the situation.\"",
      "summary10s": "Comparable = one default order, Comparator = multiple custom orders."
    }
  },
  {
    "id": "hashmap-vs-concurrenthashmap",
    "category": "Java",
    "question": "HashMap vs ConcurrentHashMap",
    "frequency": 2,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "HashMap isn't thread-safe; ConcurrentHashMap is designed for safe concurrent access.",
      "explain": "HashMap — no locking, fails/corrupts under concurrent modification\nConcurrentHashMap — locks only specific buckets, allows concurrent reads/writes\nConcurrentHashMap doesn't allow null keys/values; HashMap does",
      "example": "\"HashMap isn't thread-safe — using it with multiple threads can lead to data corruption or infinite loops in older Java versions. ConcurrentHashMap solves this by locking only the specific bucket being updated instead of the whole map, so multiple threads can work on different parts simultaneously. I always use ConcurrentHashMap in multi-threaded scenarios, like a shared cache.\"",
      "summary10s": "HashMap = not thread-safe, ConcurrentHashMap = bucket-level locking, thread-safe."
    }
  },
  {
    "id": "arraylist-vs-linkedlist",
    "category": "Java",
    "question": "ArrayList vs LinkedList",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "ArrayList is backed by a dynamic array; LinkedList is backed by a doubly linked list.",
      "explain": "ArrayList — fast random access (O(1)), slow insert/delete in middle (O(n))\nLinkedList — fast insert/delete (O(1)) once position is known, slow random access (O(n))\nArrayList is used more often in practice; LinkedList mainly when frequent insert/delete needed\n\n       ArrayList → Fast random access (get()), slower insertion/deletion in the middle.\n       LinkedList → Fast insertion/deletion, slower random access.\n       ArrayList uses less memory; LinkedList uses more memory because each node stores previous and next references.\n     \n  Use ArrayList for frequent reads and LinkedList for frequent insertions/deletions.",
      "example": "\"ArrayList is backed by a dynamic array, so accessing an element by index is very fast, but inserting or deleting in the middle requires shifting elements. LinkedList is backed by nodes with pointers, so insertion and deletion are faster once you're at the right position, but random access is slower since it has to traverse. In practice, I use ArrayList most of the time unless there's heavy insertion/deletion.\"",
      "summary10s": "ArrayList = fast access, LinkedList = fast insert/delete, slow access."
    }
  },
  {
    "id": "types-of-stream-operations",
    "category": "Java",
    "question": "Types of Stream operations",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Stream operations are of two types — intermediate and terminal.",
      "explain": "Intermediate — filter(), map(), sorted() — return a Stream, lazy (not executed immediately)\nTerminal — collect(), forEach(), count() — trigger execution, return a result\nA stream pipeline needs exactly one terminal operation to actually run",
      "example": "\"Stream operations fall into two categories — intermediate operations like filter, map, and sorted, which return another stream and are lazy, and terminal operations like collect, forEach, or count, which actually trigger the pipeline execution and produce a final result. Nothing runs until a terminal operation is called — that's the lazy evaluation behavior of Streams.\"",
      "summary10s": "Intermediate = lazy (filter/map), Terminal = triggers execution (collect/forEach)."
    }
  },
  {
    "id": "lazy-evaluation-in-streams",
    "category": "Java",
    "question": "Lazy Evaluation in Streams",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Lazy evaluation means intermediate stream operations don't run until a terminal operation is called.",
      "explain": "filter(), map() etc. just build up the pipeline definition\nActual processing happens only when collect(), forEach(), etc. is invoked\nImproves performance — avoids unnecessary processing if not all elements are needed (e.g., with findFirst())",
      "example": "\"Streams are lazily evaluated, meaning operations like filter or map don't actually execute when we write them — they just define the pipeline. Processing only starts when a terminal operation like collect() or forEach() is called. This is efficient because, for something like findFirst(), the stream can stop processing as soon as it finds a match, instead of going through every element.\"",
      "summary10s": "Nothing runs until terminal operation — enables short-circuiting like findFirst()."
    }
  },
  {
    "id": "kafka-producer-consumer-topic-partition-offset",
    "category": "Microservices",
    "question": "Kafka Producer, Consumer, Topic, Partition, Offset",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "These are the core building blocks of how Kafka stores and delivers messages.",
      "explain": "Producer — publishes messages to a Topic\nTopic — a category of messages, split into Partitions for scalability\nConsumer — reads messages from partitions, tracked via Offset (message position)",
      "example": "\"In Kafka, a Producer publishes messages to a Topic, which is like a category or channel. Each Topic is split into Partitions to allow parallel processing and scalability. A Consumer reads messages from these partitions, and Kafka tracks each Consumer's position using an Offset, so it knows exactly where to resume reading from if it restarts.\"",
      "summary10s": "Producer→Topic (split into Partitions)→Consumer reads, tracked via Offset."
    }
  },
  {
    "id": "component-vs-service-vs-repository",
    "category": "Spring Boot",
    "question": "@Component vs @Service vs @Repository",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "All are specializations of @Component, used to indicate the layer of the class.",
      "explain": "@Component — generic Spring-managed bean\n@Service — business logic layer, semantic clarity\n@Repository — data access layer, also translates DB exceptions into Spring's DataAccessException",
      "example": "\"All three are technically @Component under the hood, so Spring detects them the same way through component scanning. But we use @Service for business logic and @Repository for the data access layer — @Repository additionally translates database-specific exceptions into Spring's unified DataAccessException, which is a real functional difference, not just naming.\"",
      "summary10s": "Same base (@Component), Repository also translates DB exceptions."
    }
  },
  {
    "id": "restcontroller-vs-controller",
    "category": "Spring Boot",
    "question": "@RestController vs @Controller",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "@RestController returns data directly (like JSON); @Controller is used for returning views.",
      "explain": "@Controller — typically returns a view name (used with Thymeleaf/JSP)\n@RestController = @Controller + @ResponseBody — returns data directly serialized as JSON/XML\nREST APIs almost always use @RestController",
      "example": "\"@Controller is traditionally used when we're returning a view, like a Thymeleaf template. @RestController is a combination of @Controller and @ResponseBody, so every method's return value is directly serialized into the response body, usually as JSON. Since I mostly build REST APIs, I use @RestController almost everywhere.\"",
      "summary10s": "@Controller = returns view, @RestController = @Controller + @ResponseBody (returns JSON)."
    }
  },
  {
    "id": "dry-and-kiss",
    "category": "System Design",
    "question": "DRY and KISS",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "DRY means don't repeat logic; KISS means keep the design as simple as possible.",
      "explain": "DRY — extract common/repeated code into reusable methods, utilities, or base classes\nKISS — avoid unnecessary complexity, over-engineering, or premature optimization\nBoth lead to more maintainable, readable code",
      "example": "\"DRY means avoiding duplicate logic — if I see the same validation or calculation repeated in multiple places, I extract it into a shared method or utility class. KISS is about not over-engineering — I try to solve the problem with the simplest design that works, instead of adding unnecessary abstraction layers or patterns that aren't actually needed yet.\"",
      "summary10s": "DRY = don't repeat code, KISS = keep design simple, avoid over-engineering."
    }
  },
  {
    "id": "singleton-design-pattern",
    "category": "System Design",
    "question": "Singleton Design Pattern",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Singleton ensures only one instance of a class exists throughout the application.",
      "explain": "Private constructor + static instance + static access method\nCommon uses: config managers, logging, connection pools\nNeeds thread-safety handling (double-checked locking, enum) in multi-threaded apps",
      "example": "\"Singleton restricts a class to just one instance, typically implemented with a private constructor and a static getInstance() method. I've used it for things like a configuration manager that should be shared across the app. In multi-threaded environments, I'd make sure it's thread-safe using double-checked locking or an enum-based implementation.\"",
      "summary10s": "One instance only — private constructor + static access, thread-safe if needed."
    }
  },
  {
    "id": "strategy-design-pattern",
    "category": "System Design",
    "question": "Strategy Design Pattern",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Strategy pattern lets you swap between different algorithms/behaviors at runtime using a common interface.",
      "explain": "Define a common interface, multiple implementations (strategies)\nContext class holds a reference to the strategy interface, not a concrete class\nAvoids long if-else/switch chains for choosing behavior\nExample: Different discount strategies (FlatDiscount, PercentageDiscount) implementing a common DiscountStrategy interface.",
      "example": "\"Strategy pattern lets me define a family of algorithms behind a common interface and swap between them at runtime. I've used this for discount calculation — instead of a big if-else block, I had separate strategy classes like FlatDiscount and PercentageDiscount, and the context class just called strategy.apply() without caring which one it was. It makes adding a new strategy easy without touching existing code.\"",
      "summary10s": "Swap algorithms at runtime via a common interface — avoids if-else chains."
    }
  },
  {
    "id": "observer-design-pattern",
    "category": "System Design",
    "question": "Observer Design Pattern",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Observer pattern lets multiple objects (observers) get notified automatically when a subject's state changes.",
      "explain": "Subject maintains a list of observers, notifies all of them on state change\nObservers implement a common update/listener interface\nCommon in event-driven systems — e.g., Spring's ApplicationEventPublisher",
      "example": "\"Observer pattern is used when multiple components need to react to a change in one place without tight coupling. The subject keeps a list of observers and notifies them all when something changes. In Spring, I've used this indirectly through ApplicationEventPublisher — for example, publishing an OrderPlacedEvent that multiple listeners react to, like sending an email and updating inventory, without the order service knowing about either of them directly.\"",
      "summary10s": "Subject notifies all observers on change — like Spring's ApplicationEventPublisher."
    }
  },
  {
    "id": "adapter-design-pattern",
    "category": "System Design",
    "question": "Adapter Design Pattern",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Adapter pattern converts one interface into another that the client expects, so incompatible classes can work together.",
      "explain": "Wraps an existing class with a new interface the client understands\nUseful when integrating a third-party library with a different interface than what your code expects\nDoesn't change the original class, just wraps it\nExample: Wrapping a legacy XmlPaymentGateway behind a new PaymentGateway interface your app expects.",
      "example": "\"Adapter pattern is useful when I need to integrate an existing class or third-party library whose interface doesn't match what my application expects. I wrap that class inside an adapter that implements the interface my code uses, translating calls internally. I've used this when integrating a legacy payment gateway that returned XML, wrapping it behind our standard PaymentGateway interface so the rest of the app didn't need to know the difference.\"",
      "summary10s": "Wraps incompatible interface into the one your code expects."
    }
  },
  {
    "id": "internal-working-of-hashmap",
    "category": "Java",
    "question": "Internal working of HashMap",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "HashMap stores key-value pairs in buckets based on the key's hashcode, using a linked list or tree for collisions.",
      "explain": "hash(key) determines the bucket index\nCollisions handled via linked list; converts to Red-Black Tree if a bucket has 8+ entries (Java 8+)\nResizes (doubles capacity) when load factor threshold (default 0.75) is crossed",
      "example": "\"HashMap calculates a hash from the key to decide which bucket it goes into. If multiple keys collide into the same bucket, Java 8 uses a linked list, but converts it to a Red-Black Tree once that bucket has 8 or more entries, to keep lookups fast. It also resizes by doubling its capacity once the map exceeds the load factor, which is 0.75 by default.\"",
      "summary10s": "Hash → bucket, collisions via list→tree(8+), resizes at 0.75 load factor."
    }
  },
  {
    "id": "internal-working-of-hashset",
    "category": "Java",
    "question": "Internal working of HashSet",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "HashSet is internally backed by a HashMap, where each element is stored as a key with a dummy constant value.",
      "explain": "add(element) internally calls map.put(element, PRESENT) — a fixed dummy Object\nUniqueness comes from HashMap's key uniqueness (hashCode + equals check)\nAll HashMap behavior (buckets, collisions, resizing) applies underneath",
      "example": "\"HashSet is basically a wrapper around a HashMap — every time we add an element, it's stored internally as a key in the map, with a dummy constant value attached. So the uniqueness guarantee of HashSet comes directly from HashMap's key uniqueness, based on hashCode and equals. That's also why HashSet requires proper equals and hashCode implementations on custom objects, just like HashMap keys do.\"",
      "summary10s": "HashSet = HashMap internally, element as key, dummy value — uniqueness from map keys."
    }
  },
  {
    "id": "why-use-transactional",
    "category": "Spring Boot",
    "question": "Why use @Transactional?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "@Transactional ensures a group of database operations either all succeed together or all roll back.",
      "explain": "Wraps a method in a transaction boundary automatically\nAvoids manual begin/commit/rollback code\nEnsures data consistency when multiple DB writes must happen together",
      "example": "\"I use @Transactional to make sure a set of database operations behave as a single atomic unit — either everything commits, or everything rolls back if something fails. It saves me from manually writing begin, commit, and rollback logic. I typically apply it at the service layer, especially for methods that involve multiple related writes, like updating an order and deducting inventory together.\"",
      "summary10s": "Groups DB operations into one atomic unit — auto commit/rollback."
    }
  },
  {
    "id": "can-transactional-be-applied-to-private-or-static-methods",
    "category": "Spring Boot",
    "question": "Can @Transactional be applied to private or static methods?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "No — @Transactional doesn't work on private or static methods because it relies on Spring's proxy mechanism.",
      "explain": "Spring creates a proxy around the bean; proxies can only intercept public method calls made from outside the class\nPrivate methods can't be overridden/proxied — the annotation is silently ignored\nStatic methods belong to the class, not an instance — proxies can't intercept them at all",
      "example": "\"@Transactional won't work on private or static methods, because Spring implements it using proxies, and a proxy can only intercept calls to public methods invoked from outside the class. Since a private method can't be overridden by a subclass proxy, and a static method isn't tied to an instance at all, Spring simply can't wrap either of them — the annotation gets silently ignored, which is a common gotcha.\"",
      "summary10s": "Proxy can't intercept private/static methods — annotation is silently ignored."
    }
  },
  {
    "id": "which-exceptions-trigger-rollback-with-transactional",
    "category": "Spring Boot",
    "question": "Which exceptions trigger rollback with @Transactional?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "By default, only unchecked exceptions (RuntimeException and its subclasses) trigger a rollback.",
      "explain": "Unchecked exceptions (RuntimeException, Error) → automatic rollback\nChecked exceptions → NO automatic rollback by default, transaction commits\nOverride this using @Transactional(rollbackFor = Exception.class) to rollback on checked exceptions too",
      "example": "\"By default, @Transactional only rolls back on unchecked exceptions, like RuntimeException. If a checked exception is thrown, Spring actually commits the transaction by default, which surprises a lot of people. If I need a checked exception to also trigger a rollback, I explicitly configure it using rollbackFor, like @Transactional(rollbackFor = Exception.class).\"",
      "summary10s": "Default: rollback on RuntimeException only. Use rollbackFor for checked exceptions."
    }
  },
  {
    "id": "java-singleton-vs-spring-singleton-bean-scope",
    "category": "Spring Boot",
    "question": "Java Singleton vs Spring Singleton Bean scope",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Java Singleton is one instance per JVM; Spring Singleton is one instance per Spring container (ApplicationContext).",
      "explain": "Java Singleton — enforced by private constructor, truly one instance across the entire JVM\nSpring Singleton — one instance per ApplicationContext, but you CAN create multiple new instances manually, and multiple contexts give multiple \"singletons\"\nSpring doesn't restrict instantiation via constructor — it's a container-managed convention, not a JVM-level guarantee",
      "example": "\"The classic Java Singleton pattern enforces just one instance across the entire JVM, usually by making the constructor private. Spring's singleton scope is different — it just means one instance per Spring container, but Spring doesn't stop me from calling new on that class manually to create additional instances, since the constructor is public. So Spring singleton is more of a container-managed convention rather than a hard JVM-level guarantee like the traditional pattern.\"",
      "summary10s": "Java Singleton = one per JVM (enforced). Spring Singleton = one per container (convention, not enforced)."
    }
  },
  {
    "id": "filter-employees-by-experience-salary-sort-ascending-descending",
    "category": "Java Coding",
    "question": "Filter Employees by experience & salary, sort ascending/descending",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Use Streams to filter by conditions, then sort using a Comparator.",
      "explain": "Approach: Filter with filter() on experience and salary thresholds, then sort with sorted() using Comparator.comparing(), reversing for descending order.\nimport java.util.*;\nimport java.util.stream.*;\n\nrecord Employee(String name, int id, double salary, int experience) {}\n\npublic class EmployeeFilter {\n    public static void main(String[] args) {\n        List<Employee> employees = List.of(\n            new Employee(\"A\", 1, 50000, 3),\n            new Employee(\"B\", 2, 80000, 6),\n            new Employee(\"C\", 3, 60000, 5)\n        );\n\n        List<Employee> result = employees.stream()\n            .filter(e -> e.experience() >= 5 && e.salary() >= 55000)\n            .sorted(Comparator.comparing(Employee::salary).reversed()) // descending\n            .collect(Collectors.toList());\n\n        result.forEach(e -> System.out.println(e.name() + \" - \" + e.salary()));\n    }\n}",
      "example": "\"I'd use Java Streams — filter the list based on the experience and salary conditions using filter(), then sort with sorted() and a Comparator on salary. For descending order, I just chain .reversed() on the Comparator, or swap to Comparator.comparing(...).reversed() — it's a clean one-liner instead of writing custom sorting logic.\"",
      "summary10s": "filter() for conditions + sorted(Comparator...reversed()) for order."
    }
  },
  {
    "id": "bufferedinputstream-vs-bufferedoutputstream",
    "category": "Java",
    "question": "BufferedInputStream vs BufferedOutputStream",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "BufferedInputStream reads data efficiently by buffering input, BufferedOutputStream writes data efficiently by buffering output — both reduce actual disk/network IO operations.",
      "explain": "BufferedInputStream — wraps another InputStream, reads chunks into internal buffer (8KB default), subsequent reads served from buffer without hitting disk\nBufferedOutputStream — wraps another OutputStream, accumulates writes in buffer, flushes to disk only when buffer is full or flush() called\nWithout buffering — every read/write is a system call to OS — very slow for small frequent reads\nBoth are Filter Streams — they wrap and enhance other streams\nAlways close or use try-with-resources — unflushed buffer data can be lost",
      "example": "\"Without buffering, reading a file byte by byte means thousands of system calls to the OS — extremely slow. BufferedInputStream reads a large chunk into memory first, then subsequent reads come from that in-memory buffer — far fewer system calls. BufferedOutputStream accumulates writes in memory and flushes in one large write instead of many small ones. They are wrappers around other streams — I always wrap FileInputStream with BufferedInputStream for performance.\"",
      "summary10s": "Buffered streams reduce IO system calls by reading/writing chunks to memory buffer instead of disk for every byte."
    }
  },
  {
    "id": "why-is-string-immutable-in-java",
    "category": "Java",
    "question": "Why is String Immutable in Java?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "String objects cannot be changed after creation — any modification creates a new String object, never modifying the original.",
      "explain": "Security — String used for class loading, DB URLs, network connections — mutable String would be a security vulnerability\nString Pool — JVM reuses String literals safely because immutable objects can be shared without copy\nThread Safety — immutable objects need no synchronization, inherently thread-safe\nHashCode Caching — String caches its hashCode, works correctly only because value never changes\nHashMap key safety — String is the safest map key because hashCode never changes after put",
      "example": "\"String immutability serves four purposes. Security — if I pass a file path to a method, the method cannot secretly change the path after my security check. String pool efficiency — JVM reuses identical literals safely because two variables pointing to the same pooled String cannot affect each other through one changing it. Thread safety — multiple threads can read the same String simultaneously without locks. HashCode caching — String caches hashCode for fast HashMap lookups, valid only because the value never changes.\"",
      "summary10s": "String immutable for security, string pool sharing, thread safety, and hashCode caching — all four depend on value never changing."
    }
  },
  {
    "id": "what-are-filter-streams",
    "category": "Java",
    "question": "What are Filter Streams?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Filter Streams wrap other streams to add functionality — they delegate actual IO to the wrapped stream while adding their own behavior on top.",
      "explain": "Design Pattern — Decorator pattern, wraps a stream and enhances it\nThey take another stream as constructor argument\nExamples — BufferedInputStream wraps FileInputStream to add buffering, DataInputStream wraps to read primitives, CipherInputStream wraps to add encryption\nCan chain multiple filter streams — BufferedInputStream(CipherInputStream(FileInputStream))\nDo not perform actual IO themselves — delegate to wrapped stream\nCode:\n// Chaining filter streams — Decorator pattern\nInputStream raw = new FileInputStream(\"data.bin\");\nInputStream decrypted = new CipherInputStream(raw, cipher);     // adds decryption\nInputStream buffered = new BufferedInputStream(decrypted);       // adds buffering\nDataInputStream data = new DataInputStream(buffered);           // adds primitive reading\n\n// Reading automatically decrypts, buffers, and parses\nint value = data.readInt(); // three layers of decoration",
      "example": "\"Filter streams implement the Decorator design pattern. They wrap another stream and add functionality without changing the interface. BufferedInputStream wraps FileInputStream — it delegates actual file reading to FileInputStream but adds an in-memory buffer layer on top. I can chain multiple filter streams — wrap with CipherInputStream for decryption, wrap that with BufferedInputStream for buffering. Each layer adds one responsibility.\"",
      "summary10s": "Filter streams=Decorator pattern, wrap another stream adding functionality, delegate actual IO to wrapped stream, can chain multiple layers."
    }
  },
  {
    "id": "marker-interfaces",
    "category": "Java",
    "question": "Marker Interfaces",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Marker interfaces are empty interfaces with no methods — they mark a class to inform the JVM or framework that special treatment is needed.",
      "explain": "Serializable — marks class as eligible for serialization by ObjectOutputStream\nCloneable — marks class as eligible for Object.clone() without throwing CloneNotSupportedException\nRandomAccess — marks List implementations as supporting fast random access\nRemote — marks object as eligible for RMI (Remote Method Invocation)\nModern alternative — annotations (@FunctionalInterface, @Deprecated) serve similar purpose more explicitly",
      "example": "\"Marker interfaces are empty — they contain no methods or fields. Their sole purpose is to tag a class so the JVM or a framework can detect it via instanceof and apply special behavior. Serializable tells ObjectOutputStream that this class can be serialized. Without Serializable, ObjectOutputStream throws NotSerializableException. In modern Java, annotations have largely replaced marker interfaces — @Transactional marks a method for transaction management, @Cacheable marks a method for caching — same concept but more flexible.\"",
      "summary10s": "Marker interfaces are empty, tag classes for special JVM/framework treatment. Serializable, Cloneable, RandomAccess. Modern replacement is annotations."
    }
  },
  {
    "id": "what-is-serialization-and-where-have-you-used-it",
    "category": "Java",
    "question": "What is Serialization and Where Have You Used It",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Serialization converts a Java object into a byte stream for storage or transmission, deserialization converts bytes back to object.",
      "explain": "Implement Serializable marker interface — enables ObjectOutputStream to write the object\nserialVersionUID — version control for compatibility between serialized and current class\ntransient — skip field during serialization (passwords, session tokens)\nUsed in — HTTP session persistence, caching (Redis serializes objects), message queues (Kafka object messages), distributed systems\nReal usage:\n@Entity\npublic class UserSession implements Serializable {\n    @Serial\n    private static final long serialVersionUID = 1L;\n    \n    private Long userId;\n    private String role;\n    \n    @Transient // not serialized\n    private transient String sensitiveToken;\n}\n\n// Redis serialization — object to bytes for cache storage\n// Kafka — message payload serialized as bytes for transmission\n// HTTP session — session attributes serialized when stored to DB",
      "example": "\"Serialization converts object state to a byte stream. In my banking project I used it in three places. Redis cache stores Java objects as serialized bytes — when I put an Account object in Redis it serializes it, when I get it back it deserializes. Kafka message payloads — complex event objects serialized to bytes for transmission. HTTP session replication — in a clustered environment session attributes must be serializable to be replicated across nodes. I always declare serialVersionUID explicitly and mark sensitive fields as transient.\"",
      "summary10s": "Serialization=object to bytes. Used for Redis caching, Kafka messages, session replication. Always declare serialVersionUID, mark passwords transient."
    }
  },
  {
    "id": "how-to-store-passwords-in-database",
    "category": "Spring Boot",
    "question": "How to Store Passwords in Database",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Never store plain text or reversibly encrypted passwords — always store a one-way hash using BCrypt.",
      "explain": "Plain text — catastrophic if DB is breached, never acceptable\nSimple hash (MD5, SHA) — vulnerable to rainbow table attacks, fast to brute-force\nBCrypt — slow by design (work factor), includes random salt per password, each hash is unique\nSalt — random bytes added before hashing, prevents rainbow table attacks\nSpring Security PasswordEncoder — use BCryptPasswordEncoder, verify with matches() never manual comparison",
      "example": "\"Passwords must be one-way hashed with a salt — never encrypted, never plain text. Encryption is reversible if the key is compromised. BCrypt is the standard — it incorporates a random salt so two users with the same password get different hashes, and it has a configurable work factor making brute-force extremely slow. Spring Security's BCryptPasswordEncoder.encode() does all this automatically. matches() compares raw input against the stored hash without ever decoding the stored hash.\"",
      "summary10s": "Never plain text or encryption — use BCrypt (one-way, salted, slow by design). BCryptPasswordEncoder.encode() to store, matches() to verify, never decrypt."
    }
  },
  {
    "id": "bcrypt-hashing-mechanism-explained",
    "category": "Spring Boot",
    "question": "BCrypt — Hashing Mechanism Explained",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "BCrypt is an adaptive password hashing function — incorporates random salt and work factor making it extremely resistant to brute-force attacks.",
      "explain": "Cost factor (strength) — default 10, each increment doubles computation time\nRandom salt — 16 bytes of randomness, different hash for same password each time\nOutput includes — algorithm, cost, salt, and hash all in one 60-character string\nmatches() extracts salt from stored hash, re-hashes input, compares\nAs hardware gets faster — increase cost factor, old hashes still work\nCode:\n@Bean\npublic PasswordEncoder passwordEncoder() {\n    return new BCryptPasswordEncoder(12); // strength 12 — about 400ms per hash\n}\n\n// Registration\nString rawPassword = \"userPassword123\";\nString encodedPassword = passwordEncoder.encode(rawPassword);\n// $2a$12$[22charSalt][31charHash] — 60 chars total\nuser.setPassword(encodedPassword);\nuserRepository.save(user);\n\n// Login verification\nboolean matches = passwordEncoder.matches(rawPassword, storedHash);\n// Extracts salt from storedHash, re-hashes rawPassword with that salt, compares",
      "example": "\"BCrypt output is a 60-character string containing the algorithm version, cost factor, salt, and hash all in one. When verifying, BCrypt extracts the salt from the stored hash, applies it to the input password, and compares — no decryption involved. The cost factor makes BCrypt adaptive — I set it to 12 which takes about 400ms per hash. That is acceptable for login but makes brute-force attacks impractical. If hardware gets faster I increase the cost factor without breaking existing hashes.\"",
      "summary10s": "BCrypt=one-way, cost factor makes it slow, random salt in output string, matches() extracts salt and re-hashes to verify without decrypting."
    }
  },
  {
    "id": "encryption-vs-hashing",
    "category": "Spring Boot",
    "question": "Encryption vs Hashing",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Encryption is reversible with a key (two-way), Hashing is irreversible (one-way) — use encryption for data you need back, hashing for passwords you only need to verify.",
      "explain": "Encryption — encrypt(data, key)=ciphertext, decrypt(ciphertext, key)=original data. Reversible\nHashing — hash(data)=digest, no way to get original data back. One-way\nHashing has no key — same input always produces same output (deterministic)\nEncryption has key — same input with different keys produces different output\nUse encryption for — credit card numbers, sensitive data you need to retrieve\nUse hashing for — passwords, you verify by re-hashing never by decrypting",
      "example": "\"Encryption and decryption are inverse operations — what encryption locks, decryption unlocks using a key. Hashing has no reverse — given a hash you cannot get the original data. For passwords I want hashing because I never need to retrieve the original password, I only need to verify that what a user types matches what was stored. For data I need to retrieve later — like storing an encrypted credit card number — I use encryption. Encrypting passwords is wrong because if someone gets the encryption key they can decrypt all passwords.\"",
      "summary10s": "Encryption=reversible with key (two-way), Hashing=irreversible one-way. Encrypt data you need back, hash passwords you only need to verify."
    }
  },
  {
    "id": "what-is-rsa-and-where-is-it-used",
    "category": "Spring Boot",
    "question": "What is RSA and Where is it Used",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "RSA is an asymmetric encryption algorithm — uses a public key to encrypt and a private key to decrypt (or vice versa for digital signatures).",
      "explain": "Asymmetric — two mathematically linked keys, public and private\nEncrypt with public key — only private key holder can decrypt\nSign with private key — anyone with public key can verify signature\nUsed in — HTTPS/TLS for key exchange, SSH authentication, JWT RS256 signing, digital signatures, certificate authorities\nSlower than symmetric encryption — used to exchange a symmetric key then switch to AES",
      "example": "\"RSA is built on a mathematical problem that is easy to compute forward but practically impossible to reverse — factoring large prime numbers. In HTTPS, RSA is used during TLS handshake to securely exchange a symmetric AES session key. For JWT with RS256 algorithm, the server signs tokens with its private key, clients verify with the public key — this means clients can verify token authenticity without having the signing secret. In my project I used RSA for JWT signing so that multiple services could verify tokens by sharing only the public key, never the private key.\"",
      "summary10s": "RSA=asymmetric two-key system. Public key encrypts or verifies, private key decrypts or signs. Used in TLS, JWT RS256, SSH, digital signatures."
    }
  },
  {
    "id": "how-is-csrf-protection-implemented",
    "category": "Spring Boot",
    "question": "How is CSRF Protection Implemented",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "CSRF protection ensures form submissions and state-changing requests come from your own frontend by using an unpredictable token that malicious sites cannot forge.",
      "explain": "CSRF attack — malicious site tricks authenticated user's browser into making unwanted requests\nCSRF token — unique per-session random value, server validates it on every state-changing request\nSpring Security includes CSRF protection by default for non-REST apps\nFor REST APIs with JWT (stateless) — CSRF not needed because no session cookies used\nSameSite cookie attribute — modern alternative, browser only sends cookie for same-site requests\nCode:\n// For REST APIs with JWT — disable CSRF (stateless, no cookie session)\n@Bean\npublic SecurityFilterChain filterChain(HttpSecurity http) throws Exception {\n    http\n        .csrf(csrf -> csrf.disable()) // Safe for stateless JWT APIs\n        .sessionManagement(session -> \n            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))\n        ...\n    return http.build();\n}\n\n// For traditional web apps — keep CSRF enabled (default)\n// Spring Security sends X-CSRF-TOKEN in response\n// Frontend must include it in every POST/PUT/DELETE request header\n// Malicious site cannot read this token from another origin (Same-Origin Policy)",
      "example": "\"CSRF exploits the fact that browsers automatically send cookies with every request. A malicious site can trigger a form submit to your bank's API and the browser sends the session cookie. CSRF token prevents this — it is embedded in the form and must be included in the request header. The malicious site cannot read it due to Same-Origin Policy. For REST APIs using JWT in Authorization header — not cookies — CSRF is not needed because the malicious site cannot forge the Authorization header. So I disable CSRF for stateless JWT-based APIs.\"",
      "summary10s": "CSRF token=unpredictable value in form, malicious site cannot read it. Disable CSRF for stateless JWT APIs — no session cookie means no CSRF risk."
    }
  },
  {
    "id": "authenticationmanager-and-authenticationprovider",
    "category": "Spring Boot",
    "question": "AuthenticationManager and AuthenticationProvider",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "AuthenticationManager delegates to AuthenticationProvider which actually verifies credentials — authentication flows through them in sequence.",
      "explain": "AuthenticationManager — interface with authenticate(Authentication) method, single entry point for authentication\nProviderManager — most common implementation, holds a list of AuthenticationProviders\nAuthenticationProvider — actual credential verification, one per authentication mechanism\nDaoAuthenticationProvider — loads UserDetails from DB, verifies password with PasswordEncoder\nMultiple providers — app can support username/password AND LDAP AND OTP simultaneously\nFlow:\nLogin Request → AuthenticationManager (ProviderManager)\n    → Tries AuthenticationProvider 1 (DaoAuthenticationProvider)\n        → UserDetailsService.loadUserByUsername()\n        → PasswordEncoder.matches()\n        → Returns Authentication if success\n    → Tries AuthenticationProvider 2 (LdapAuthenticationProvider) if 1 fails\n    → Returns successful Authentication or throws AuthenticationException\n\n// Custom AuthenticationProvider\n@Component\npublic class OtpAuthenticationProvider implements AuthenticationProvider {\n    @Override\n    public Authentication authenticate(Authentication auth) {\n        String username = auth.getName();\n        String otp = auth.getCredentials().toString();\n        // verify OTP logic\n        if (otpService.isValid(username, otp)) {\n            return new UsernamePasswordAuthenticationToken(username, null, authorities);\n        }\n        throw new BadCredentialsException(\"Invalid OTP\");\n    }\n    \n    @Override\n    public boolean supports(Class<?> auth) {\n        return OtpAuthenticationToken.class.isAssignableFrom(auth);\n    }\n}",
      "example": "\"AuthenticationManager is the front door — it receives the authentication request and delegates to a list of AuthenticationProviders. Each provider handles a specific authentication type. DaoAuthenticationProvider handles username/password — it calls UserDetailsService to load the user from DB, then PasswordEncoder.matches() to verify the password. For my banking app with OTP login, I created a custom AuthenticationProvider for OTP verification alongside the standard one for password — both registered with the same ProviderManager.\"",
      "summary10s": "AuthenticationManager=front door delegates to providers. AuthenticationProvider=actual verification. DaoAuthenticationProvider=DB user + password check. Multiple providers for multiple auth types."
    }
  },
  {
    "id": "jwt-what-it-contains-and-authentication-flow",
    "category": "Spring Boot",
    "question": "JWT — What it Contains and Authentication Flow",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "JWT is a compact self-contained signed token with three parts — Header, Payload, Signature — carrying user identity without server-side session.",
      "explain": "",
      "example": "",
      "summary10s": ""
    }
  },
  {
    "id": "oauth-vs-oauth-2-0",
    "category": "Spring Boot",
    "question": "OAuth vs OAuth 2.0",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "OAuth 1.0 used complex cryptographic request signing, OAuth 2.0 simplified this using HTTPS and bearer tokens — OAuth 2.0 is the standard today.",
      "explain": "OAuth 1.0 — required cryptographic signature on every request, complex to implement, no standard for mobile\nOAuth 2.0 — relies on HTTPS for security, simpler token-based, supports multiple grant types\nGrant types — Authorization Code (web), PKCE (mobile/SPA), Client Credentials (server-to-server), Implicit (deprecated)\nOAuth 2.0 roles — Resource Owner (user), Client (app), Authorization Server (issues tokens), Resource Server (API)\nOAuth 2.0 is authorization not authentication — OpenID Connect (OIDC) adds identity layer on top",
      "example": "\"OAuth 1.0 required every API request to be cryptographically signed — complex timestamp and nonce management making it hard to implement correctly. OAuth 2.0 dropped this complexity by relying on HTTPS for transport security and using simpler bearer tokens. OAuth 2.0 also introduced multiple grant types for different scenarios — Authorization Code for traditional web apps, PKCE for mobile and single-page apps, Client Credentials for machine-to-machine. When people say 'Login with Google', that is OAuth 2.0 with OpenID Connect on top for identity.\"",
      "summary10s": "OAuth 1.0=complex cryptographic signing on every request. OAuth 2.0=simpler HTTPS+bearer tokens, multiple grant types. OAuth 2.0 is today's standard. Add OIDC for authentication."
    }
  },
  {
    "id": "preauthorize-and-postauthorize",
    "category": "Spring Boot",
    "question": "@PreAuthorize and @PostAuthorize",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "@PreAuthorize checks authorization BEFORE method executes, @PostAuthorize checks AFTER and can restrict based on the returned object.",
      "explain": "Enable with @EnableMethodSecurity on configuration class\n@PreAuthorize — evaluate SpEL expression before method runs, throws AccessDeniedException if false\n@PostAuthorize — evaluate after method returns, useful when authorization depends on the result\nhasRole — checks user has specific role in SecurityContext\nhasAuthority — checks specific authority/permission string\nreturnObject — available in @PostAuthorize, refers to the method's return value\nCode:\n@EnableMethodSecurity\n@Configuration\npublic class SecurityConfig { }\n\n@Service\npublic class AccountService {\n    \n    // Method only executes if user has ADMIN role\n    @PreAuthorize(\"hasRole('ADMIN')\")\n    public List<Account> getAllAccounts() { ... }\n    \n    // Multiple conditions with AND/OR\n    @PreAuthorize(\"hasRole('MANAGER') or hasAuthority('ACCOUNT_READ')\")\n    public Account getAccount(Long id) { ... }\n    \n    // Access method parameter in expression\n    @PreAuthorize(\"hasRole('ADMIN') or #userId == authentication.principal.id\")\n    public UserProfile getUserProfile(@P(\"userId\") Long userId) {\n        // User can access their own profile, admin can access any\n    }\n    \n    // @PostAuthorize — check after method returns\n    // Blocks response if returned account does not belong to current user\n    @PostAuthorize(\"returnObject.ownerId == authentication.principal.id or hasRole('ADMIN')\")\n    public Account getAccountById(Long id) {\n        return accountRepository.findById(id).orElseThrow();\n    }\n}",
      "example": "\"@PreAuthorize prevents unauthorized method execution — if the SpEL expression evaluates to false the method never runs, throwing AccessDeniedException immediately. I use it for role checks like hasRole ADMIN or hasAuthority ACCOUNT_WRITE. @PostAuthorize is unique — the method executes and retrieves data, but the response is blocked if the post-condition fails. In my banking project I used @PostAuthorize to ensure users cannot access other customers' account details even if they somehow guess the ID — the returnObject is checked against the current authenticated user's ID.\"",
      "summary10s": "@PreAuthorize=SpEL check BEFORE method, blocks execution. @PostAuthorize=SpEL check AFTER using returnObject, blocks response. Enable with @EnableMethodSecurity."
    }
  },
  {
    "id": "configure-multiple-databases-in-spring-boot",
    "category": "Spring Boot",
    "question": "Configure Multiple Databases in Spring Boot",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Create separate DataSource, EntityManagerFactory, and TransactionManager beans for each database — use @Primary on the main one.",
      "explain": "Each database needs its own DataSource, JPA EntityManagerFactory, and PlatformTransactionManager\n@Primary on the main database beans — default for auto-wiring\n@Qualifier for explicitly selecting the secondary database beans\nSeparate packages for entities of each database — each EntityManagerFactory scans its own package\nSeparate @EnableTransactionManagement and @EnableJpaRepositories per database\nCode:\n// Primary database configuration\n@Configuration\n@EnableTransactionManagement\n@EnableJpaRepositories(\n    basePackages = \"com.app.primary.repository\",\n    entityManagerFactoryRef = \"primaryEntityManagerFactory\",\n    transactionManagerRef = \"primaryTransactionManager\"\n)\npublic class PrimaryDatabaseConfig {\n    \n    @Primary\n    @Bean\n    @ConfigurationProperties(\"spring.datasource.primary\")\n    public DataSource primaryDataSource() {\n        return DataSourceBuilder.create().build();\n    }\n    \n    @Primary\n    @Bean\n    public LocalContainerEntityManagerFactoryBean primaryEntityManagerFactory(\n            @Qualifier(\"primaryDataSource\") DataSource ds,\n            EntityManagerFactoryBuilder builder) {\n        return builder\n            .dataSource(ds)\n            .packages(\"com.app.primary.entity\") // scans only this package\n            .persistenceUnit(\"primary\")\n            .build();\n    }\n    \n    @Primary\n    @Bean\n    public PlatformTransactionManager primaryTransactionManager(\n            @Qualifier(\"primaryEntityManagerFactory\") EntityManagerFactory emf) {\n        return new JpaTransactionManager(emf);\n    }\n}\n\n// Secondary database configuration\n@Configuration\n@EnableJpaRepositories(\n    basePackages = \"com.app.secondary.repository\",\n    entityManagerFactoryRef = \"secondaryEntityManagerFactory\",\n    transactionManagerRef = \"secondaryTransactionManager\"\n)\npublic class SecondaryDatabaseConfig {\n    \n    @Bean\n    @ConfigurationProperties(\"spring.datasource.secondary\")\n    public DataSource secondaryDataSource() {\n        return DataSourceBuilder.create().build();\n    }\n    \n    @Bean\n    public LocalContainerEntityManagerFactoryBean secondaryEntityManagerFactory(\n            @Qualifier(\"secondaryDataSource\") DataSource ds,\n            EntityManagerFactoryBuilder builder) {\n        return builder.dataSource(ds)\n            .packages(\"com.app.secondary.entity\")\n            .persistenceUnit(\"secondary\")\n            .build();\n    }\n    \n    @Bean\n    public PlatformTransactionManager secondaryTransactionManager(\n            @Qualifier(\"secondaryEntityManagerFactory\") EntityManagerFactory emf) {\n        return new JpaTransactionManager(emf);\n    }\n}\n\n// application.properties\n// spring.datasource.primary.url=jdbc:mysql://localhost/primarydb\n// spring.datasource.primary.username=user1\n// spring.datasource.secondary.url=jdbc:postgresql://localhost/secondarydb\n// spring.datasource.secondary.username=user2",
      "example": "\"Multiple databases require separate Spring configuration beans for each. Each database gets its own DataSource, EntityManagerFactory scanning only its own entity package, and TransactionManager. I mark the main database beans with @Primary so they are the default for auto-wiring. The secondary database beans are selected with @Qualifier. The critical part is keeping entity packages strictly separated — each EntityManagerFactory must scan only its own entities otherwise they get confused. Repositories in each package get the right EntityManagerFactory through the @EnableJpaRepositories basePackages configuration.\"",
      "summary10s": "Separate DataSource+EntityManagerFactory+TransactionManager per DB. @Primary on main. @EnableJpaRepositories with basePackages and refs pointing to correct beans. Separate entity packages strictly."
    }
  },
  {
    "id": "trailing-zeroes-in-factorial",
    "category": "Java Coding",
    "question": "Trailing Zeroes in Factorial",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Count factors of 5 in the number — each pair of 2 and 5 creates a trailing zero, and there are always more 2s than 5s.",
      "explain": "Trailing zero is created by 10 = 2 × 5 in the factorial\nFactorial always has more factors of 2 than 5, so count factors of 5 only\nEvery multiple of 5 contributes one 5. Multiples of 25 contribute two 5s. Multiples of 125 contribute three\nFormula — count = n/5 + n/25 + n/125 + ... until divisor exceeds n\nO(log n) time, O(1) space\nCode:\npublic int trailingZeroes(int n) {\n    int count = 0;\n    \n    // Each power of 5 contributes additional factor of 5\n    while (n >= 5) {\n        n /= 5;        // floor division\n        count += n;    // add multiples of 5, 25, 125...\n    }\n    \n    return count;\n}\n\n// Trace for n = 100:\n// Iteration 1: n = 100/5 = 20, count = 20 (multiples of 5: 5,10,15...100)\n// Iteration 2: n = 20/5 = 4,  count = 24 (multiples of 25: 25,50,75,100 add extra 5)\n// Iteration 3: n = 4/5 = 0,   loop ends\n// Answer: 24\n\n// Verify: 100! has 24 trailing zeroes\n\n// Alternative explicit version:\npublic int trailingZeroesExplicit(int n) {\n    int count = 0;\n    for (long power = 5; power <= n; power *= 5) {\n        count += n / power;\n    }\n    return count;\n}\n\n// Edge cases:\n// n=0 → 0\n// n=4 → 0 (no factors of 5)\n// n=5 → 1 (one factor of 5)\n// n=25 → 6 (five from multiples of 5, one extra from 25 itself)",
      "example": "\"Every trailing zero needs one factor of 2 and one factor of 5. Factorial always has more factors of 2 than 5, so I only need to count factors of 5. Multiples of 5 each contribute one factor. Multiples of 25 contribute two. Multiples of 125 contribute three. The pattern means I divide n by increasing powers of 5 and sum the results. For n equals 100 — 100 divided by 5 is 20 multiples of 5, then 100 divided by 25 is 4 additional multiples of 25, total 24 trailing zeroes. Loop runs log base 5 of n times — very efficient.\"",
      "summary10s": "Count factors of 5 only (more 2s always available). Divide n by 5, add to count, repeat. Total = n/5 + n/25 + n/125... O(log n)."
    }
  },
  {
    "id": "features-of-java-8-and-java-17",
    "category": "Java",
    "question": "Features of Java 8 and Java 17",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Java 8 introduced functional programming, Java 17 added modern syntax features and is the current LTS.",
      "explain": "Lambda expressions — short anonymous functions for functional interfaces\nStream API — declarative collection processing\nOptional — container to handle null safely\nDefault and static methods in interfaces\nNew Date Time API — LocalDate, LocalDateTime replacing broken Date/Calendar\n\nExplain Java 17:\nSealed classes — restrict which classes can extend, using permits\nRecords — immutable data class, auto-generates boilerplate\nPattern matching for instanceof — no explicit cast needed\nText blocks — multiline strings without escape characters\nEnhanced switch expressions with arrow syntax",
      "example": "\"Java 8 was the functional programming revolution — Lambdas, Streams, and Optional changed how I write collection processing code. Java 17 is the current LTS and brought Records which eliminate DTO boilerplate, Sealed classes for controlled inheritance hierarchies, and Pattern matching for instanceof which removes explicit casting. I use Records heavily for API DTOs now — one line replaces 30 lines of constructor, getters, equals, hashCode.\"",
      "summary10s": "Java 8=Lambda+Streams+Optional+DateTime API, Java 17=Records+Sealed+Pattern matching+Text blocks."
    }
  },
  {
    "id": "what-problem-does-stream-api-solve",
    "category": "Java",
    "question": "What Problem Does Stream API Solve",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Stream API solves verbose, imperative, hard-to-read collection processing by replacing loops with declarative pipelines.",
      "explain": "Before Streams — nested for loops, temporary variables, mutable state for filtering/transforming\nStreams — chain operations declaratively, describe WHAT not HOW\nReduces boilerplate — filter, map, collect replace 10+ lines of loop code\nEnables easy parallelization — parallelStream() without rewriting logic\nImproves readability — pipeline reads like the problem statement\nBefore vs After:\n// Before Streams — imperative, verbose\nList<String> activeUserNames = new ArrayList<>();\nfor (User user : users) {\n    if (user.isActive()) {\n        activeUserNames.add(user.getName().toUpperCase());\n    }\n}\n\n// With Streams — declarative, concise\nList<String> activeUserNames = users.stream()\n    .filter(User::isActive)\n    .map(User::getName)\n    .map(String::toUpperCase)\n    .collect(Collectors.toList());",
      "example": "\"Before Java 8, processing collections meant writing explicit loops with mutable accumulator variables — verbose and error-prone, especially when chaining multiple operations like filter then transform then collect. Stream API solves this by letting me describe the transformation pipeline declaratively. I say what I want — filter active users, map to uppercase names, collect to list — without managing loop counters or temporary lists manually. It also makes parallel processing trivial by just calling parallelStream().\"",
      "summary10s": "Streams replace verbose imperative loops with declarative chainable pipelines, easier to read and parallelize."
    }
  },
  {
    "id": "two-interfaces-with-same-default-method-resolving-conflict",
    "category": "Java",
    "question": "Two Interfaces With Same Default Method — Resolving Conflict",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Compiler forces the implementing class to override the conflicting method explicitly.",
      "explain": "If Class C implements Interface A and B, both having identical default method signature — compile error\nJava cannot decide which default implementation to inherit — ambiguous\nClass must override the method to resolve ambiguity itself\nInside the override, call a specific interface's version using InterfaceName.super.methodName()\nCode:\ninterface A {\n    default void greet() { System.out.println(\"Hello from A\"); }\n}\ninterface B {\n    default void greet() { System.out.println(\"Hello from B\"); }\n}\n\nclass C implements A, B {\n    @Override\n    public void greet() {\n        A.super.greet();  // explicitly call A's version\n        // OR B.super.greet();\n        // OR write completely new logic here\n        System.out.println(\"Custom greet in C\");\n    }\n}",
      "example": "\"Compiler refuses to compile until I resolve this explicitly — it cannot guess which default method I want. I must override greet() in class C. Inside the override I have full control — I can call A's version specifically using A.super.greet(), call B's version, call both, or write entirely new logic. This explicit resolution prevents the classic diamond problem from silently picking the wrong behavior.\"",
      "summary10s": "Compiler error on identical default methods, class must override, use InterfaceName.super.method() to delegate to specific version."
    }
  },
  {
    "id": "imperative-vs-functional-programming",
    "category": "Java",
    "question": "Imperative vs Functional Programming",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Imperative tells the computer HOW to do something step by step, Functional tells it WHAT to do declaratively.",
      "explain": "Imperative — explicit control flow, mutable state, loops, step-by-step instructions\nFunctional — pure functions, immutability, composition, declarative transformations\nImperative — easier to trace execution order, but verbose for collection processing\nFunctional — more concise, easier to parallelize, but can be less intuitive for control-flow-heavy logic\nJava supports both — traditional loops are imperative, Streams are functional\nSide by side:\n// Imperative — HOW\nint sum = 0;\nfor (int num : numbers) {\n    if (num % 2 == 0) {\n        sum += num;\n    }\n}\n\n// Functional — WHAT\nint sum = numbers.stream()\n    .filter(num -> num % 2 == 0)\n    .mapToInt(Integer::intValue)\n    .sum();",
      "example": "\"Imperative programming describes the exact steps — initialize a sum variable, loop through, check condition, add. It is explicit about control flow and mutates state along the way. Functional programming describes the result I want — filter even numbers, sum them — without me managing the loop mechanics or mutable accumulator. Java lets me mix both — I use imperative for complex control flow with multiple exit conditions, and functional Streams for straightforward collection transformations.\"",
      "summary10s": "Imperative=explicit steps and mutable state HOW, Functional=declarative transformations WHAT, Java supports both."
    }
  },
  {
    "id": "mock-vs-static-mock-in-junit",
    "category": "Spring Boot",
    "question": "Mock vs Static Mock in JUnit",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "@Mock creates a mock for instance methods on an object, static mock (mockStatic) mocks static methods of a class.",
      "explain": "@Mock — Mockito creates a mock instance of a class/interface, used for instance method calls\nRegular mocking only works for objects injected as dependencies — instance method calls\nStatic methods belong to the class not an instance — cannot be mocked with regular @Mock\nmockStatic() — Mockito's MockedStatic API specifically for mocking static method calls\nUsed for utility classes — like mocking LocalDateTime.now() or a static helper method\nCode:\n// Regular @Mock — for instance methods\n@Mock\nprivate UserRepository userRepository;\n\n@Test\nvoid testFindUser() {\n    when(userRepository.findById(1L)).thenReturn(Optional.of(user));\n    // mocks an instance method call\n}\n\n// Static mock — for static methods\n@Test\nvoid testWithStaticMock() {\n    try (MockedStatic<LocalDateTime> mockedStatic = \n            Mockito.mockStatic(LocalDateTime.class)) {\n        mockedStatic.when(LocalDateTime::now)\n            .thenReturn(LocalDateTime.of(2024, 1, 1, 0, 0));\n        \n        // Now any code calling LocalDateTime.now() gets fixed date\n        LocalDateTime result = myService.getCurrentTimestamp();\n        assertEquals(LocalDateTime.of(2024, 1, 1, 0, 0), result);\n    }\n    // Static mock automatically cleaned up after try-with-resources\n}",
      "example": "\"@Mock creates a mock object for a dependency — I use it when my class calls instance methods on injected objects like a repository. Regular Mockito cannot intercept static method calls because static methods are not called on an instance. For that I use mockStatic which returns a MockedStatic object inside a try-with-resources block. This is essential for testing code that calls static utility methods like LocalDateTime.now() — I fix the time so my test is deterministic.\"",
      "summary10s": "@Mock=mocks instance methods on injected objects, mockStatic()=mocks static method calls via MockedStatic, use try-with-resources to scope it."
    }
  },
  {
    "id": "abstract-class-vs-interface",
    "category": "Java",
    "question": "Abstract Class vs Interface",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Abstract class is a partial implementation with shared state, Interface is a pure contract with multiple implementation allowed.",
      "explain": "Abstract class — constructors, instance variables, mix of abstract and concrete methods\nInterface — no constructors, no instance state (only constants), can have default/static methods since Java 8\nInheritance — class extends only ONE abstract class but implements MULTIPLE interfaces\nUse abstract class — when subclasses share common state and behavior (is-a with shared implementation)\nUse interface — when defining a capability/contract that unrelated classes can implement (can-do)\nComparison table:\n                 Abstract Class          Interface\nConstructor      Yes                     No\nInstance fields  Yes (any access mod)    No (only static final constants)\nMethods          Abstract + concrete     Abstract + default + static\nMultiple inherit No (extends one)        Yes (implements many)\nAccess modifiers Any (private/protected) public by default\nUse case         Shared state/behavior   Capability contract",
      "example": "\"Abstract class is for when related classes share common state and behavior — like an Animal class with a name field and breathe method that all animals inherit. A class can extend only one abstract class. Interface defines a contract of what a class CAN DO — Flyable, Serializable — without caring about shared state. A class can implement multiple interfaces. My rule of thumb — if it's about what something IS with shared implementation, abstract class; if it's about what something CAN DO as a capability, interface.\"",
      "summary10s": "Abstract class=shared state+behavior, single inheritance. Interface=pure contract, multiple implementation, no state."
    }
  },
  {
    "id": "aggregation-association-composition-code-examples",
    "category": "System Design",
    "question": "Aggregation, Association, Composition — Code Examples",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Association is general relationship, Aggregation is weak HAS-A (independent lifecycle), Composition is strong HAS-A (dependent lifecycle).",
      "explain": "Association — two classes are related, neither owns the other, can exist independently, loosest coupling\nAggregation — HAS-A relationship, child CAN exist without parent, parent just holds a reference (whole-part, but part is independent)\nComposition — HAS-A relationship, child CANNOT exist without parent, parent fully owns and manages child's lifecycle (strongest coupling)\nCode for all three:\n// 1. ASSOCIATION — Teacher and Student are related, but independent\n// Neither owns the other. Both can exist without each other.\nclass Teacher {\n    private String name;\n    // Teacher doesn't \"contain\" Student, just relates to it\n}\n\nclass Student {\n    private String name;\n    private Teacher teacher; // association — just a reference\n    \n    public Student(String name, Teacher teacher) {\n        this.name = name;\n        this.teacher = teacher; // teacher created elsewhere, independently\n    }\n}\n// Usage: Teacher exists in DB regardless of student\nTeacher t = new Teacher(\"Mr. Smith\");\nStudent s = new Student(\"Alice\", t); // s references t, both independent\n\n\n// 2. AGGREGATION — Department HAS Employees, but Employee can exist \n// without Department (e.g., transferred to another department)\nclass Employee {\n    private String name;\n}\n\nclass Department {\n    private String deptName;\n    private List<Employee> employees; // aggregation — holds reference\n    \n    public Department(String deptName, List<Employee> employees) {\n        this.deptName = deptName;\n        this.employees = employees; // employees created OUTSIDE, passed in\n    }\n}\n// Usage: Employees created independently, THEN added to department\nEmployee e1 = new Employee(\"Bob\");\nEmployee e2 = new Employee(\"Carol\");\nList<Employee> emps = new ArrayList<>(List.of(e1, e2));\nDepartment dept = new Department(\"Engineering\", emps);\n// If dept is destroyed, e1 and e2 still exist independently!\n\n\n// 3. COMPOSITION — Car HAS-A Engine, Engine CANNOT exist without Car\n// Engine's lifecycle is entirely controlled by Car\nclass Engine {\n    private String type;\n    public Engine(String type) {\n        this.type = type;\n    }\n}\n\nclass Car {\n    private final Engine engine; // composition — created INSIDE Car\n    \n    public Car(String engineType) {\n        this.engine = new Engine(engineType); // Car creates its own Engine\n        // Engine has no meaning or existence outside this Car\n    }\n}\n// Usage: Engine is born and dies with the Car\nCar car = new Car(\"V8\");\n// car = null; → engine is also garbage collected, no other reference exists",
      "example": "\"Association is the loosest — Teacher and Student reference each other but neither creates nor owns the other; both exist completely independently in the system. Aggregation is a HAS-A relationship where Department holds a list of Employees, but those Employees are created outside and passed in — if I delete the Department, employees still exist, maybe transferred elsewhere. Composition is the strongest — Car creates its own Engine internally in its constructor. The Engine has no independent existence; if the Car object is destroyed, the Engine goes with it. The key differentiator is lifecycle ownership and where the object is instantiated.\"",
      "summary10s": "Association=independent reference, Aggregation=HAS-A but child created outside survives parent, Composition=HAS-A child created inside dies with parent."
    }
  },
  {
    "id": "lru-cache-implementation",
    "category": "System Design",
    "question": "LRU Cache Implementation",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Use LinkedHashMap with accessOrder=true and override removeEldestEntry to evict the least recently used entry automatically.",
      "explain": "LinkedHashMap with accessOrder true — every get() or put() moves that entry to the end of internal order\nFront of the map is always the least recently used entry\nOverride removeEldestEntry() — return true when size exceeds capacity, triggering automatic eviction\nGives O(1) get and put — no manual list management needed\nFor production-grade thread safety, wrap with synchronization or use ConcurrentLinkedHashMap\nComplete Implementation:\nimport java.util.LinkedHashMap;\nimport java.util.Map;\n\npublic class LRUCache<K, V> extends LinkedHashMap<K, V> {\n    private final int capacity;\n    \n    public LRUCache(int capacity) {\n        // initialCapacity, loadFactor, accessOrder=true (critical!)\n        super(capacity, 0.75f, true);\n        this.capacity = capacity;\n    }\n    \n    @Override\n    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {\n        // Called automatically after every put()\n        // Return true → eldest (least recently used) entry gets removed\n        return size() > capacity;\n    }\n    \n    public static void main(String[] args) {\n        LRUCache<Integer, String> cache = new LRUCache<>(3);\n        \n        cache.put(1, \"A\");\n        cache.put(2, \"B\");\n        cache.put(3, \"C\");\n        System.out.println(cache); // {1=A, 2=B, 3=C}\n        \n        cache.get(1); // access 1 → moves it to end (most recently used)\n        cache.put(4, \"D\"); // capacity exceeded → evicts 2 (least recently used)\n        \n        System.out.println(cache); // {3=C, 1=A, 4=D} — 2 is evicted!\n    }\n}\n\n// Thread-safe version\nclass ThreadSafeLRUCache<K, V> {\n    private final LRUCache<K, V> cache;\n    \n    public ThreadSafeLRUCache(int capacity) {\n        this.cache = new LRUCache<>(capacity);\n    }\n    \n    public synchronized V get(K key) {\n        return cache.get(key);\n    }\n    \n    public synchronized void put(K key, V value) {\n        cache.put(key, value);\n    }\n}\n\n// Manual implementation without LinkedHashMap (for deeper interview follow-up)\n// Uses HashMap + Doubly Linked List for true O(1) without relying on built-in ordering\nclass ManualLRUCache {\n    class Node {\n        int key, value;\n        Node prev, next;\n        Node(int key, int value) { this.key = key; this.value = value; }\n    }\n    \n    private final int capacity;\n    private final Map<Integer, Node> map = new HashMap<>();\n    private final Node head = new Node(0, 0); // dummy head\n    private final Node tail = new Node(0, 0); // dummy tail\n    \n    public ManualLRUCache(int capacity) {\n        this.capacity = capacity;\n        head.next = tail;\n        tail.prev = head;\n    }\n    \n    public int get(int key) {\n        if (!map.containsKey(key)) return -1;\n        Node node = map.get(key);\n        remove(node);\n        insertAtFront(node); // mark as recently used\n        return node.value;\n    }\n    \n    public void put(int key, int value) {\n        if (map.containsKey(key)) {\n            remove(map.get(key));\n        }\n        if (map.size() == capacity) {\n            map.remove(tail.prev.key); // evict least recently used\n            remove(tail.prev);\n        }\n        Node newNode = new Node(key, value);\n        map.put(key, newNode);\n        insertAtFront(newNode);\n    }\n    \n    private void remove(Node node) {\n        node.prev.next = node.next;\n        node.next.prev = node.prev;\n    }\n    \n    private void insertAtFront(Node node) {\n        node.next = head.next;\n        node.prev = head;\n        head.next.prev = node;\n        head.next = node;\n    }\n}",
      "example": "\"The quick solution extends LinkedHashMap with accessOrder true — every get or put automatically reorders entries so the front always has the least recently used item. I override removeEldestEntry to return true once size exceeds capacity, which triggers automatic eviction with zero manual list management. For interviews wanting deeper understanding without relying on built-in features, I implement it manually with a HashMap for O(1) key lookup combined with a doubly linked list for O(1) reordering — get moves the node to front, put evicts from the tail when capacity is exceeded.\"",
      "summary10s": "Quick=LinkedHashMap(accessOrder=true)+override removeEldestEntry. Manual=HashMap+DoublyLinkedList for O(1) get/put without relying on LinkedHashMap."
    }
  },
  {
    "id": "repository-annotation-use-and-what-happens-without-it",
    "category": "Spring Boot",
    "question": "@Repository Annotation — Use and What Happens Without It",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "@Repository marks the data access layer and enables automatic exception translation — without it, exceptions stay as raw vendor-specific exceptions instead of Spring's unified hierarchy.",
      "explain": "@Repository is a specialization of @Component — registers the class as a Spring bean via component scanning\nPrimary added value — Persistence Exception Translation, a Spring AOP feature\nWithout @Repository — class still works as a bean if you use plain @Component, BUT exception translation does NOT happen\nWith exception translation — raw JDBC/Hibernate exceptions (like SQLException, ConstraintViolationException) get wrapped into Spring's unified DataAccessException hierarchy\nThis unified hierarchy lets you catch DataAccessException regardless of which underlying DB driver or persistence technology you use — JDBC, Hibernate, JPA all translate to the same exception types\nWhat happens without @Repository:\n// WITH @Repository\n@Repository\npublic class UserDao {\n    @PersistenceContext\n    private EntityManager entityManager;\n    \n    public User findById(Long id) {\n        return entityManager.find(User.class, id);\n    }\n}\n// If a constraint violation occurs internally:\n// Hibernate's ConstraintViolationException \n//   → automatically translated by Spring's PersistenceExceptionTranslationPostProcessor\n//   → becomes Spring's DataIntegrityViolationException (extends DataAccessException)\n\n// Calling code can catch the UNIFIED exception:\ntry {\n    userDao.save(user);\n} catch (DataAccessException e) {\n    // Works regardless of whether underlying impl is Hibernate, JPA, or plain JDBC\n}\n\n\n// WITHOUT @Repository (using plain @Component instead)\n@Component  // bean registration still works!\npublic class UserDao {\n    @PersistenceContext\n    private EntityManager entityManager;\n    \n    public User findById(Long id) {\n        return entityManager.find(User.class, id);\n    }\n}\n// Same constraint violation now throws RAW Hibernate exception:\n// jakarta.persistence.PersistenceException or ConstraintViolationException\n// NOT translated to Spring's DataAccessException\n\ntry {\n    userDao.save(user);\n} catch (DataAccessException e) {\n    // This catch block is NEVER reached!\n    // Must catch the vendor-specific exception instead:\n} catch (PersistenceException e) {\n    // tightly coupled to JPA/Hibernate specifically\n}",
      "example": "\"@Repository is a specialization of @Component, so the bean registration part still works even without it — Spring still finds and creates the bean. What you LOSE without @Repository is automatic Persistence Exception Translation. Spring has a post-processor that wraps repository beans annotated with @Repository in a proxy — this proxy catches vendor-specific exceptions like Hibernate's ConstraintViolationException or raw SQLException and translates them into Spring's unified DataAccessException hierarchy. Without @Repository, my catch blocks looking for DataAccessException never trigger — I'd be forced to catch vendor-specific exceptions directly, which tightly couples my business logic to the specific persistence technology I'm using. This matters a lot if I ever want to swap from Hibernate to a different JPA provider — my exception handling code stays unchanged because it's all catching Spring's unified exceptions.\"",
      "summary10s": "@Repository=@Component + automatic Persistence Exception Translation. Without it, vendor-specific exceptions (Hibernate/JDBC) are NOT wrapped into Spring's DataAccessException — your catch blocks for DataAccessException silently never trigger."
    }
  },
  {
    "id": "hashmap-collision-handling",
    "category": "Java",
    "question": "HashMap Collision Handling",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Multiple keys with same bucket index stored as LinkedList, becomes Red-Black Tree after 8 entries.",
      "explain": "hashCode determines bucket index, two different keys can get same index — collision\nJava 7 and below — linked list in bucket, O(n) worst case lookup\nJava 8 plus — list converts to Red-Black Tree when bucket has more than 8 entries, O(log n)\nequals() used to find exact key within bucket\ntreeify threshold is 8, untreeify threshold is 6 — hysteresis prevents thrashing",
      "example": "\"When two keys hash to the same bucket that is a collision. Java stores them as a linked list in that bucket. Java 8 improved this — when a bucket accumulates more than 8 entries it converts to a Red-Black Tree giving O(log n) lookup instead of O(n). When entries reduce below 6 it converts back to list. equals() is always used to find the exact key within the bucket.\"",
      "summary10s": "Same bucket=collision, LinkedList for few entries, Red-Black Tree after 8 for O(log n), equals finds exact key."
    }
  },
  {
    "id": "fail-fast-vs-fail-safe-iterator",
    "category": "Java",
    "question": "Fail-Fast vs Fail-Safe Iterator",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Fail-Fast vs Fail-Safe"
    ],
    "answerSEE": {
      "simple": "Fail-fast throws exception on modification during iteration, Fail-safe iterates over a copy — no exception.",
      "explain": "Fail-fast — ArrayList, HashMap, tracks modCount, throws ConcurrentModificationException immediately on structural change\nFail-safe — CopyOnWriteArrayList, ConcurrentHashMap, iterates over snapshot copy\nFail-safe may see stale data — snapshot not reflect latest additions\nUse fail-safe in multithreaded scenarios",
      "example": "\"Fail-fast iterators detect structural modification during iteration by tracking modCount. Any add or remove increments modCount. Iterator checks on every next call — mismatch means someone modified the collection and it throws immediately rather than producing wrong results. Fail-safe iterators in concurrent collections work on a snapshot — no exception possible but you might miss recent updates.\"",
      "summary10s": "Fail-fast=modCount check throws immediately, Fail-safe=snapshot no exception may see stale data."
    }
  },
  {
    "id": "completablefuture-vs-executorservice",
    "category": "Java",
    "question": "CompletableFuture vs ExecutorService",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "ExecutorService manages thread pool and task execution, CompletableFuture composes async tasks with callbacks.",
      "explain": "ExecutorService — submit tasks, get Future back, get() blocks thread until result ready\nCompletableFuture — non-blocking callbacks, chain transformations, combine results, handle errors\nCompletableFuture uses ExecutorService internally — ForkJoinPool by default\nCompletableFuture for complex async pipelines, ExecutorService for simple parallel task submission",
      "example": "\"ExecutorService is for managing thread pools and submitting tasks. The old Future from submit requires blocking get() call to get result. CompletableFuture is the modern approach — I chain thenApply, thenCompose, handle errors with exceptionally, combine multiple futures with allOf. No blocking needed — callbacks run when result is ready. For parallel API calls CompletableFuture with allOf is much cleaner than managing multiple Futures manually.\"",
      "summary10s": "ExecutorService=thread pool blocking get(), CompletableFuture=non-blocking callbacks composable pipeline."
    }
  },
  {
    "id": "synchronization-method-vs-block-level",
    "category": "Java",
    "question": "Synchronization Method vs Block Level",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Method-level locks entire method on object, block-level locks only specific code section — better performance.",
      "explain": "Method level — synchronized on entire method, lock held for full method duration\nBlock level — synchronized on specific object for specific lines only\nSmaller critical section means less contention and better throughput\nCan synchronize on different objects — finer grained locking",
      "example": "\"Method-level synchronization locks the entire method on the object's monitor — every caller waits even if they only need a small part of the method. Block-level lets me define exactly what needs protection. I identify the shared mutable state and wrap only those lines. This reduces the time lock is held and allows more concurrent execution. Always prefer smallest possible critical section.\"",
      "summary10s": "Method=entire method locked, Block=only critical lines locked, smaller critical section=better throughput."
    }
  },
  {
    "id": "memory-leak-in-java",
    "category": "Java",
    "question": "Memory Leak in Java",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Objects that are no longer needed but still referenced — GC cannot collect them, heap grows over time.",
      "explain": "Static collections growing without bound — cache without eviction policy\nThreadLocal not removed in thread pool — previous request's data held indefinitely\nEvent listeners or callbacks not unregistered — listener holds reference to object\nInner class holding implicit reference to outer class — outer class cannot be collected\nUnclosed resources — connections, streams held in open state",
      "example": "\"Java memory leaks happen when objects are still referenced but no longer needed. Classic example is a static HashMap used as cache — if I keep adding and never remove, it grows until OOM. ThreadLocal in thread pool is dangerous — threads are reused, old ThreadLocal value from previous request accumulates. I detect leaks with heap dump analysis in Eclipse MAT — look for objects with unexpectedly high retention.\"",
      "summary10s": "Still referenced but not needed — static cache no eviction, ThreadLocal not removed, listeners not unregistered."
    }
  },
  {
    "id": "volatile-practical-usage",
    "category": "Java",
    "question": "volatile Practical Usage",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Use volatile for flags read by multiple threads — ensures fresh value from main memory not CPU cache.",
      "explain": "Without volatile — each CPU core caches the variable, other threads see stale value\nWith volatile — every read goes to main memory, every write goes to main memory\nCommon use — boolean running flag to stop a thread gracefully\nDoes not make compound operations atomic — increment is not atomic with volatile\nUse AtomicBoolean or AtomicInteger for atomic compound operations",
      "example": "\"Practical use of volatile is a shutdown flag. If main thread sets running equals false to stop a worker thread, without volatile the worker thread reads from its CPU cache and never sees the change — infinite loop. With volatile, worker thread reads from main memory on every iteration and sees the updated value. I never use volatile for counters — increment is read-modify-write, three operations not one.\"",
      "summary10s": "volatile=visibility from main memory, use for flags not counters, compound operations still not atomic."
    }
  },
  {
    "id": "thread-pool-sizing-in-production",
    "category": "System Design",
    "question": "Thread Pool Sizing in Production",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "CPU-bound tasks — number of cores, IO-bound tasks — higher thread count based on wait time ratio.",
      "explain": "CPU-bound — threads compete for CPU, optimal is CPU cores or cores plus one\nIO-bound — threads spend time waiting, can have many more threads than cores\nFormula for IO-bound — threads = cores × (1 + wait time / CPU time)\nToo few threads — CPU idle while threads wait. Too many — context switching overhead\nMonitor thread dump and CPU utilization to tune",
      "example": "\"Thread pool sizing depends on task type. For CPU-intensive like cryptography or complex computation — thread count equals number of CPU cores. Adding more just causes context switching. For IO-bound like DB queries or HTTP calls — threads spend most time waiting, so more threads can run. Rule of thumb for IO-bound — cores multiplied by 1 plus wait-to-CPU ratio. I also monitor with thread dumps and adjust based on actual CPU utilization and response times.\"",
      "summary10s": "CPU-bound=core count, IO-bound=cores×(1+wait/CPU ratio), monitor and tune based on actual metrics."
    }
  },
  {
    "id": "api-versioning-strategies",
    "category": "Microservices",
    "question": "API Versioning Strategies",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "URI versioning is most common, header versioning is cleaner but less visible.",
      "explain": "URI versioning — /api/v1/users, /api/v2/users — visible, cacheable, simple\nHeader versioning — Accept: application/vnd.api.v2+json — clean URLs but harder to test in browser\nRequest param — /api/users?version=2 — easy but messy\nNever delete old version immediately — deprecate first, give consumers migration time",
      "example": "\"I use URI versioning — /api/v1 and /api/v2 prefixes. It is visible in URLs, easy to test in browser and Postman, cacheable by proxies. When I release v2 I keep v1 running with a deprecation notice in response headers. I give consumers a migration window — usually 3 to 6 months — then retire v1. Breaking changes always get a new version, non-breaking changes go in same version.\"",
      "summary10s": "URI versioning most common, keep old version during migration window, deprecate before removing."
    }
  },
  {
    "id": "securing-microservices-internally",
    "category": "Microservices",
    "question": "Securing Microservices Internally",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "JWT at API Gateway for external, service-to-service uses mutual TLS or internal service tokens.",
      "explain": "External requests — API Gateway validates JWT before forwarding\nService-to-service — internal JWT tokens with short expiry or mutual TLS\nNo service exposed directly to outside — only Gateway port is public\nNetwork policies in Kubernetes — restrict which services can talk to which\nSecrets management — Vault or Kubernetes secrets for credentials",
      "example": "\"For external security JWT validation at API Gateway handles authentication — no individual service needs to repeat it. For service-to-service calls I use short-lived internal tokens — each service has a service account token it includes in headers. Kubernetes network policies restrict communication — payment service can only be called by order service, not by any service. No microservice port is exposed outside the cluster.\"",
      "summary10s": "Gateway validates external JWT, internal service tokens or mTLS, network policies restrict service communication."
    }
  },
  {
    "id": "handling-timeout-between-microservices",
    "category": "Microservices",
    "question": "Handling Timeout Between Microservices",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Set explicit connect and read timeouts on all outgoing calls, add circuit breaker to stop waiting on failures.",
      "explain": "Never use default infinite timeout — one slow service blocks all threads\nConfigure connection timeout and read timeout on RestTemplate or WebClient\nCircuit Breaker opens when failures cross threshold — stops waiting, returns fallback\nResilience4j @TimeLimiter annotation enforces timeout at method level\nCombine timeout with retry and circuit breaker for complete resilience",
      "example": "\"I configure explicit timeouts on every outgoing call — typically 2 seconds connect timeout and 5 seconds read timeout. Without this one slow downstream service blocks Tomcat threads until they exhaust. I add Resilience4j circuit breaker — after 5 failures in 10 seconds circuit opens and returns fallback immediately without waiting. This is the combination — timeout stops waiting, circuit breaker stops repeated waiting.\"",
      "summary10s": "Set connect and read timeout on all calls, circuit breaker stops repeated timeouts, Resilience4j @TimeLimiter."
    }
  },
  {
    "id": "handling-1-lakh-records-without-performance-impact",
    "category": "System Design",
    "question": "Handling 1 Lakh Records Without Performance Impact",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Never fetch all at once — paginate, stream, or process asynchronously in batches.",
      "explain": "Pagination — return 20-50 records per page, client requests next page\nDatabase streaming — JPA scroll or JDBC ResultSet streaming, process row by row\nAsync export — generate file in background, notify when ready, return download link\nSpring Batch — process large datasets in configurable chunks with fault tolerance\nDatabase level — LIMIT OFFSET or keyset pagination for better performance at high offsets",
      "example": "\"For APIs browsing data I use pagination — 50 records per page, client gets total count to show page navigation. For bulk exports like downloading all transactions to Excel I use async processing — return 202 Accepted with a job ID, process with Spring Batch in background, store result in S3, notify via email or webhook when ready. Streaming is for when I need to process each record without loading all into memory.\"",
      "summary10s": "Pagination for browsing, async+Spring Batch for export, streaming for record-by-record processing."
    }
  },
  {
    "id": "kafka-vs-rabbitmq",
    "category": "System Design",
    "question": "Kafka vs RabbitMQ",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Kafka is for high-throughput event streaming with replay, RabbitMQ is for traditional message queuing with routing.",
      "explain": "Kafka — log-based, messages persisted by time not consumption, replay possible, high throughput\nRabbitMQ — traditional broker, message deleted after consumption, complex routing with exchanges\nKafka for event sourcing, audit logs, stream processing, high volume\nRabbitMQ for task queues, RPC patterns, complex routing logic\nKafka consumers control their own offset — can reprocess old messages anytime",
      "example": "\"Kafka shines when I need replay capability — new service can read all historical events from beginning. RabbitMQ deletes messages after consumption — no replay. Kafka handles millions of messages per second with horizontal scaling. RabbitMQ has better support for complex routing patterns with exchanges and binding keys. For event-driven microservices and audit trails I choose Kafka. For job queues or RPC patterns RabbitMQ is simpler.\"",
      "summary10s": "Kafka=log-based replay high throughput, RabbitMQ=traditional broker complex routing message deleted after consume."
    }
  },
  {
    "id": "consumer-lag-and-monitoring",
    "category": "System Design",
    "question": "Consumer Lag and Monitoring",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Consumer lag is how far behind consumers are from latest messages — monitor to detect slow processing.",
      "explain": "Lag = latest offset in partition minus consumer's current offset\nHigh lag means consumers are not keeping up with producer rate\nMonitor with kafka-consumer-groups script or tools like Kafka UI, Confluent Control Center\nPrometheus with JMX exporter exposes lag metrics to Grafana\nFix — increase consumer instances, optimize processing, increase partition count",
      "example": "\"Consumer lag tells me if consumers are keeping up with producers. If producer writes 1000 messages per second and consumer processes 800, lag grows by 200 per second. I monitor lag with Kafka consumer groups command or through our Grafana dashboard fed by Prometheus JMX metrics. When lag crosses a threshold I alert and investigate — is processing slow, is consumer crashing, do we need more partitions and consumers.\"",
      "summary10s": "Lag=latest offset minus consumer offset, monitor via Prometheus Grafana, fix with more consumers or optimize processing."
    }
  },
  {
    "id": "dead-letter-queue-usage",
    "category": "System Design",
    "question": "Dead Letter Queue Usage",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "DLQ receives messages that failed processing after all retries — prevents losing data and blocking the queue.",
      "explain": "Consumer fails to process a message — retries configured number of times\nAfter max retries exhausted — message sent to DLQ topic\nMain consumer continues processing other messages — not blocked by poison pill\nDLQ messages investigated, fixed, and replayed manually or by a DLQ consumer\nAlert on DLQ messages — each one means a processing failure",
      "example": "\"DLQ prevents one bad message from blocking all processing. If a message causes exception repeatedly, after 3 retries it gets routed to the dead letter topic. Our main consumer continues with the next message. We have a DLQ consumer that logs and alerts on these messages — operations team investigates the root cause. Once fixed we can replay the DLQ messages. Common causes — malformed payload, downstream service down during processing.\"",
      "summary10s": "DLQ=failed messages after max retries, prevents blocking, investigate and replay after fix."
    }
  },
  {
    "id": "idempotency-in-event-driven-systems",
    "category": "System Design",
    "question": "Idempotency in Event-Driven Systems",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Processing same message multiple times produces same result — needed because Kafka guarantees at-least-once delivery.",
      "explain": "Kafka at-least-once — message may be delivered more than once in failure scenarios\nConsumer must be idempotent — duplicate processing must not cause duplicate side effects\nTrack processed message IDs in Redis or DB — check before processing\nUse upsert instead of insert — duplicate DB write has no effect\nExactly-once in Kafka — requires transactional producers and consumer, complex setup",
      "example": "\"Kafka delivers at-least-once by default — after a consumer crash it may reprocess messages. I make consumers idempotent. Each message has a unique ID. Before processing I check Redis if that ID was already processed. If yes, I skip and acknowledge. If no, I process, mark ID as processed in Redis with TTL, commit offset. Upsert at database level provides second layer — duplicate processing just updates to same values.\"",
      "summary10s": "At-least-once means duplicates possible, track message ID in Redis, skip if already processed, upsert at DB level."
    }
  },
  {
    "id": "composite-index-vs-single-index",
    "category": "SQL",
    "question": "Composite Index vs Single Index",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Single index on one column, composite index on multiple columns — useful when queries filter multiple columns together.",
      "explain": "Single index — speeds up WHERE on that one column\nComposite index — speeds up WHERE using all or leftmost prefix of indexed columns\nLeft-most prefix rule — composite index on A,B,C helps WHERE A, WHERE A and B, WHERE A B C\nDoes not help WHERE B alone or WHERE C alone without A\nColumn order in composite index matters — put highest cardinality and most filtered first",
      "example": "\"Composite index is powerful when queries always filter on multiple columns together. If 90 percent of queries have WHERE department equals something AND status equals something, a composite index on department and status is much better than two separate indexes. The leftmost prefix rule matters — composite index on department,status,date also helps queries filtering just department. Column order is critical — most selective column first.\"",
      "summary10s": "Composite=multiple columns, leftmost prefix rule, order matters put most selective first, helps WHERE on prefix columns."
    }
  },
  {
    "id": "optimizing-slow-sql-query",
    "category": "SQL",
    "question": "Optimizing Slow SQL Query",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "EXPLAIN plan first, add missing indexes, rewrite query, reduce data fetched.",
      "explain": "plan first, add missing indexes, rewrite query, reduce data fetched.\nExplain:\nEXPLAIN ANALYZE — shows actual execution plan, identifies full table scans and cost\nAdd index on WHERE, JOIN, ORDER BY columns\nAvoid SELECT star — fetch only needed columns\nFix N plus 1 with JOIN instead of multiple queries\nCheck for functions on indexed columns in WHERE — defeats index use",
      "example": "\"I start with EXPLAIN ANALYZE to see exactly what the database is doing. Full table scan on a large table is the main warning sign. I add missing indexes on WHERE and JOIN columns. Common mistake I fix is function on indexed column in WHERE clause — WHERE YEAR(created_at) equals 2024 cannot use index on created_at. Rewrite as WHERE created_at between range. I also check for implicit type conversions that prevent index use.\"",
      "summary10s": "EXPLAIN ANALYZE first, add index on WHERE/JOIN, avoid functions on indexed columns, no SELECT star."
    }
  },
  {
    "id": "transaction-propagation-levels",
    "category": "Spring Boot",
    "question": "Transaction Propagation Levels",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Propagation controls how a transaction behaves when called from within another transaction.",
      "explain": "REQUIRED — default, use existing transaction or create new one\nREQUIRES_NEW — always create new independent transaction, suspend existing\nNESTED — create savepoint within existing transaction, can rollback to savepoint\nSUPPORTS — use existing if available, run without if not\nMANDATORY — must have existing transaction, throws if none\nNEVER — must not run in transaction, throws if one exists",
      "example": "\"REQUIRED is my default — if caller has transaction use it, otherwise create one. I use REQUIRES_NEW when I need independent transaction — audit logging that must commit even if main transaction rolls back. NESTED is for sub-operations that can fail independently without rolling back the whole transaction — like processing optional enrichment data where failure is acceptable. MANDATORY is for methods that absolutely require a transaction context.\"",
      "summary10s": "REQUIRED=use or create, REQUIRES_NEW=always new independent, NESTED=savepoint within existing, MANDATORY=must have one."
    }
  },
  {
    "id": "first-non-repeated-character",
    "category": "Java Coding",
    "question": "First Non-Repeated Character",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Build frequency map, then iterate original string to find first character with count 1.",
      "explain": "Map freq = build frequency from string. For each char in original string order — if freq.get(ch) equals 1 return ch.\nStream approach: str.chars().mapToObj(c -> (char)c).filter(c -> Collections.frequency(str.chars().mapToObj(x -> (char)x).collect(toList()), c) == 1).findFirst()\nEfficient approach: Map freq = new LinkedHashMap. For each char — freq.merge(ch, 1, Integer::sum). freq.entrySet().stream().filter(e -> e.getValue() == 1).map(Map.Entry::getKey).findFirst()",
      "example": "\"Two-pass solution is most readable and efficient. First pass builds frequency map. Second pass iterates original string — not the map which has no guaranteed order — and returns first character with count 1. LinkedHashMap preserves insertion order so I can also filter entrySet directly. O(n) time, O(k) space where k is character set size.\"",
      "summary10s": "Build frequency map, iterate original string order, return first with count=1, O(n) time."
    }
  },
  {
    "id": "group-employees-by-department",
    "category": "Java Coding",
    "question": "Group Employees by Department",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Collectors.groupingBy with department getter — returns Map of department to list of employees.",
      "explain": "Map result = employees.stream().collect(Collectors.groupingBy(Employee::getDepartment))\nCount per department: Map countByDept = employees.stream().collect(groupingBy(Employee::getDepartment, counting()))\nAverage salary per department: Map avgSalary = employees.stream().collect(groupingBy(Employee::getDepartment, averagingDouble(Employee::getSalary)))",
      "example": "\"groupingBy is the key operator here. It groups stream elements by the classifier function and puts them in a Map. Value is a List by default. I can change the downstream collector — counting() for count per group, averagingDouble for average salary, mapping to extract just names. Very flexible. This single operator replaces what would be a complex loop with a Map and multiple list operations.\"",
      "summary10s": "collect(groupingBy(Employee::getDepartment)) returns Map<String,List<Employee>>, downstream collectors for aggregation."
    }
  },
  {
    "id": "custom-lru-cache",
    "category": "Java Coding",
    "question": "Custom LRU Cache",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Extend LinkedHashMap with accessOrder true, override removeEldestEntry for eviction.",
      "explain": "class LRUCache extends LinkedHashMap: private int capacity\nconstructor(capacity): super(capacity, 0.75f, true) // accessOrder=true this.capacity = capacity\noverride removeEldestEntry(eldest): return size() > capacity\nget(key) — returns value, updates access order automatically put(key, value) — adds or updates, evicts eldest if over capacity\nFor thread-safe version wrap with Collections.synchronizedMap or use ReentrantReadWriteLock.",
      "example": "\"LinkedHashMap with accessOrder true is perfect for LRU. Every get or put moves the accessed entry to the end of the internal linked list. The front always has the least recently used entry. I extend it and override removeEldestEntry to return true when size exceeds capacity — LinkedHashMap automatically removes the eldest front entry. O(1) get and put. For thread safety I use ReentrantReadWriteLock — multiple concurrent reads allowed, exclusive write lock.\"",
      "summary10s": "LinkedHashMap accessOrder=true, removeEldestEntry evicts oldest, O(1) operations, add lock for thread safety."
    }
  },
  {
    "id": "sql-duplicate-records-in-employee-table",
    "category": "SQL",
    "question": "SQL Duplicate Records in Employee Table",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Find duplicate rows by name and department: SELECT name, department, COUNT() as count FROM employees GROUP BY name, department HAVING COUNT() greater than 1",
      "explain": "Find duplicate rows by name and department: SELECT name, department, COUNT() as count FROM employees GROUP BY name, department HAVING COUNT() greater than 1\nSee full duplicate rows: SELECT * FROM employees WHERE (name, department) IN (SELECT name, department FROM employees GROUP BY name, department HAVING COUNT(*) greater than 1)\nKeep one record delete rest: DELETE FROM employees WHERE id NOT IN (SELECT MIN(id) FROM employees GROUP BY name, email)",
      "example": "\"To find duplicates I GROUP BY the columns that define uniqueness and use HAVING COUNT greater than 1. This shows what is duplicated. To see the full rows I use that as a subquery with IN clause. To delete duplicates while keeping one record per group I delete rows whose ID is not the minimum ID in each group — keeps the first occurrence of each duplicate group.\"",
      "summary10s": "GROUP BY unique columns HAVING COUNT>1, delete WHERE id NOT IN SELECT MIN(id) GROUP BY to remove duplicates."
    }
  },
  {
    "id": "find-missing-number-in-array",
    "category": "Java Coding",
    "question": "Find Missing Number in Array",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Use sum formula — expected sum minus actual sum gives the missing number.",
      "explain": "Array contains n numbers from 1 to n+1 with one missing\nExpected sum of 1 to n+1 = (n+1)(n+2)/2\nActual sum = sum all elements in array\nMissing number = expected sum minus actual sum\nO(n) time, O(1) space — no sorting needed\nLogic: int n = arr.length. int expected = (n + 1) * (n + 2) / 2. int actual = IntStream.of(arr).sum() or loop sum. Missing = expected minus actual.\nXOR approach for large numbers avoiding overflow: XOR all indices 1 to n+1, XOR all array elements, result is missing number.",
      "example": "\"Math approach is most elegant — expected sum of 1 to n plus 1 using Gauss formula minus actual sum of array elements gives the missing number. O(n) single pass, O(1) space. No sorting needed. If overflow is a concern for very large arrays I use XOR approach — XOR all expected numbers with all actual numbers, duplicate XORs cancel out leaving the missing number.\"",
      "summary10s": "Expected sum formula (n+1)(n+2)/2 minus actual sum = missing number, O(n) time O(1) space."
    }
  },
  {
    "id": "what-is-global-exception-handling",
    "category": "Spring Boot",
    "question": "What is Global Exception Handling?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "One centralized class handles all exceptions from all controllers — consistent error responses, clean controller code.",
      "explain": "@RestControllerAdvice class with @ExceptionHandler per exception type\nEach handler maps exception to appropriate HTTP status and structured error body\nAlways include a catch-all Exception handler as final fallback\nStructured error response — timestamp, status code, error message, request path\n\nCode:\n@RestControllerAdvice\npublic class GlobalExceptionHandler {\n    \n    @ExceptionHandler(ResourceNotFoundException.class)\n    public ResponseEntity<ErrorResponse> handleNotFound(\n            ResourceNotFoundException ex, HttpServletRequest request) {\n        ErrorResponse error = new ErrorResponse(\n            HttpStatus.NOT_FOUND.value(),\n            ex.getMessage(),\n            request.getRequestURI(),\n            LocalDateTime.now()\n        );\n        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);\n    }\n    \n    @ExceptionHandler(MethodArgumentNotValidException.class)\n    public ResponseEntity<ErrorResponse> handleValidation(\n            MethodArgumentNotValidException ex) {\n        Map<String, String> errors = ex.getBindingResult()\n            .getFieldErrors().stream()\n            .collect(Collectors.toMap(\n                FieldError::getField,\n                FieldError::getDefaultMessage));\n        return ResponseEntity.badRequest().body(new ValidationErrorResponse(errors));\n    }\n    \n    @ExceptionHandler(Exception.class) // catch-all fallback\n    public ResponseEntity<ErrorResponse> handleGeneral(Exception ex) {\n        return ResponseEntity.internalServerError()\n            .body(new ErrorResponse(500, \"Internal server error\", null, LocalDateTime.now()));\n    }\n}",
      "example": "\"Global exception handling means one place handles all exceptions. I create a @RestControllerAdvice class with specific @ExceptionHandler methods — ResourceNotFoundException returns 404 with error details, validation exceptions return 400 with field-level errors, and a catch-all Exception handler returns 500. Controllers stay completely clean with no try-catch. All API errors return the same structured JSON format which makes it predictable for API consumers.\"",
      "summary10s": "@RestControllerAdvice with @ExceptionHandler per type, specific handlers plus catch-all Exception fallback, consistent structured JSON error response."
    }
  },
  {
    "id": "what-is-responseentity",
    "category": "Spring Boot",
    "question": "What is ResponseEntity?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "ResponseEntity gives full control over the HTTP response — status code, headers, and body all in one object.",
      "explain": "Wrapper for HTTP response, generic type for the body\nResponseEntity.ok(body) — 200 with body\nResponseEntity.status(HttpStatus.CREATED).body(body) — 201 with body\nResponseEntity.noContent().build() — 204 with no body\nCan add custom headers — Location header after creating resource\n\nCode:\n@GetMapping(\"/{id}\")\npublic ResponseEntity<UserDTO> getUser(@PathVariable Long id) {\n    UserDTO user = userService.findById(id);\n    return ResponseEntity.ok(user); // 200 OK with body\n}\n\n@PostMapping\npublic ResponseEntity<UserDTO> createUser(@RequestBody @Valid CreateUserRequest req) {\n    UserDTO created = userService.create(req);\n    URI location = URI.create(\"/api/users/\" + created.getId());\n    return ResponseEntity.created(location).body(created); // 201 with Location header\n}\n\n@DeleteMapping(\"/{id}\")\npublic ResponseEntity<Void> deleteUser(@PathVariable Long id) {\n    userService.delete(id);\n    return ResponseEntity.noContent().build(); // 204 No Content\n}",
      "example": "\"ResponseEntity wraps the entire HTTP response — I control the status code, response headers, and body. Without it, Spring assumes 200 for every successful response. With ResponseEntity I return 201 Created with a Location header after creating a resource, 204 No Content after deletion, and 404 with an error body when resource is not found. It is the clean way to express proper REST semantics.\"",
      "summary10s": "ResponseEntity = full HTTP response control (status + headers + body). ok()=200, created()=201, noContent()=204, status(code).body(obj) for custom."
    }
  },
  {
    "id": "how-to-return-proper-http-status-codes",
    "category": "Spring Boot",
    "question": "How to Return Proper HTTP Status Codes",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Use ResponseEntity with explicit status, or @ResponseStatus on exception classes for automatic mapping.",
      "explain": "200 OK — successful GET, PUT, PATCH with body\n201 Created — successful POST that creates a resource, include Location header\n204 No Content — successful DELETE, no body\n400 Bad Request — validation failure, malformed request\n401 Unauthorized — not authenticated\n403 Forbidden — authenticated but not authorized\n404 Not Found — resource does not exist\n500 Internal Server Error — unexpected server failure",
      "example": "\"I map HTTP status codes to business outcomes carefully. GET that finds something returns 200. POST that creates returns 201 with Location header pointing to the new resource. DELETE returns 204 with no body. Resource not found throws a custom ResourceNotFoundException annotated with @ResponseStatus NOT_FOUND which the global exception handler catches and returns 404. Validation failures return 400 with field-level error details. This makes the API self-documenting through standard HTTP semantics.\"",
      "summary10s": "200=found, 201=created+Location, 204=deleted, 400=validation, 401=not authenticated, 403=no permission, 404=not found, 500=server error."
    }
  },
  {
    "id": "how-file-upload-works-in-spring-boot",
    "category": "Spring Boot",
    "question": "How File Upload Works in Spring Boot",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Client sends multipart/form-data request, Spring binds it to @RequestParam MultipartFile, service processes and stores.",
      "explain": "Client sends file as multipart/form-data content type\n@RequestParam MultipartFile file in controller captures the uploaded file\nMultipartFile provides — getOriginalFilename, getBytes, getInputStream, getSize, getContentType\nStore to filesystem, cloud storage like S3, or database as bytes\nConfigure max file size in application.properties\n\nCode:\n// Controller\n@PostMapping(\"/upload\")\npublic ResponseEntity<String> uploadFile(\n        @RequestParam(\"file\") MultipartFile file,\n        @RequestParam(\"description\") String description) {\n    \n    if (file.isEmpty()) {\n        return ResponseEntity.badRequest().body(\"File is empty\");\n    }\n    \n    // Validate file type\n    String contentType = file.getContentType();\n    if (!\"application/pdf\".equals(contentType) && \n        !contentType.startsWith(\"image/\")) {\n        return ResponseEntity.badRequest().body(\"Invalid file type\");\n    }\n    \n    String filename = fileService.store(file);\n    return ResponseEntity.ok(\"File uploaded: \" + filename);\n}\n\n// Service\n@Service\npublic class FileService {\n    private final Path uploadDir = Paths.get(\"uploads\");\n    \n    public String store(MultipartFile file) {\n        String filename = UUID.randomUUID() + \"_\" + file.getOriginalFilename();\n        try {\n            Files.copy(file.getInputStream(), uploadDir.resolve(filename));\n        } catch (IOException e) {\n            throw new FileStorageException(\"Could not store file\", e);\n        }\n        return filename;\n    }\n}\n\n// application.properties\nspring.servlet.multipart.max-file-size=10MB\nspring.servlet.multipart.max-request-size=10MB",
      "example": "\"File upload uses multipart/form-data encoding. The controller method receives a MultipartFile parameter — Spring automatically binds the uploaded file to it. I validate the file before processing — check it is not empty, verify content type matches allowed types, check file size. For storage I write to the filesystem with a UUID prefix to avoid naming conflicts, or in production I stream directly to S3 using AWS SDK to avoid storing on server disk.\"",
      "summary10s": "@RequestParam MultipartFile file, validate size and content type, UUID-prefix filename, store to disk or stream to S3, configure max sizes in properties."
    }
  },
  {
    "id": "how-multipart-request-handling-works",
    "category": "Spring Boot",
    "question": "How Multipart Request Handling Works",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Spring's MultipartResolver parses multipart/form-data boundary-separated parts into individual MultipartFile objects.",
      "explain": "HTTP multipart separates parts using boundary string in Content-Type header\nStandardServletMultipartResolver — built into Spring Boot, no extra config needed\nEach part has its own Content-Disposition header with field name and filename\nSpring maps each part to method parameters by name\nMultiple files — use @RequestParam List of MultipartFile or MultipartFile array\n\nCode:\n// Multiple files + metadata in one request\n@PostMapping(\"/upload-batch\")\npublic ResponseEntity<List<String>> uploadMultiple(\n        @RequestParam(\"files\") List<MultipartFile> files,\n        @RequestParam(\"category\") String category) {\n    \n    List<String> uploadedNames = files.stream()\n        .filter(f -> !f.isEmpty())\n        .map(fileService::store)\n        .collect(Collectors.toList());\n    \n    return ResponseEntity.ok(uploadedNames);\n}\n\n// Mixed - file + JSON in one request using @RequestPart\n@PostMapping(\"/upload-with-metadata\")\npublic ResponseEntity<String> uploadWithMetadata(\n        @RequestPart(\"file\") MultipartFile file,\n        @RequestPart(\"metadata\") @Valid FileMetadata metadata) {\n    // metadata is deserialized from JSON part\n    fileService.storeWithMetadata(file, metadata);\n    return ResponseEntity.ok(\"Success\");\n}",
      "example": "\"Multipart requests split the body into parts separated by a boundary string. Spring Boot has multipart resolver enabled by default — it parses the boundary, reads each part, and maps them to method parameters by name. For mixed requests with a file and JSON metadata, I use @RequestPart — the JSON part gets deserialized automatically by Jackson while the file part becomes a MultipartFile. This avoids the awkward pattern of sending metadata as separate form fields.\"",
      "summary10s": "Spring's MultipartResolver parses boundary-separated parts, @RequestParam for simple files, @RequestPart for mixed file+JSON in one request."
    }
  },
  {
    "id": "how-pagination-works-in-spring-boot",
    "category": "Spring Boot",
    "question": "How Pagination Works in Spring Boot",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Pass Pageable as parameter to repository, return Page — Spring generates LIMIT/OFFSET SQL and COUNT query automatically.",
      "explain": "Pageable — interface carrying page number, page size, and sort\nPageRequest.of(page, size, sort) — creates concrete Pageable instance\nPage<T> response — contains content list plus totalElements, totalPages, hasNext\nSpring Data runs two queries — one with LIMIT/OFFSET for data, one COUNT for totals\nController accepts page, size, sort as query parameters from client\n\nCode:\n// Repository\npublic interface EmployeeRepository extends JpaRepository<Employee, Long> {\n    Page<Employee> findByDepartment(String department, Pageable pageable);\n}\n\n// Service\npublic Page<EmployeeDTO> getEmployees(String dept, int page, int size, String sortBy) {\n    Pageable pageable = PageRequest.of(\n        page, size, Sort.by(Sort.Direction.ASC, sortBy));\n    return employeeRepository.findByDepartment(dept, pageable)\n        .map(employeeMapper::toDTO);\n}\n\n// Controller\n@GetMapping\npublic ResponseEntity<Page<EmployeeDTO>> getEmployees(\n        @RequestParam String department,\n        @RequestParam(defaultValue = \"0\") int page,\n        @RequestParam(defaultValue = \"10\") int size,\n        @RequestParam(defaultValue = \"name\") String sortBy) {\n    return ResponseEntity.ok(\n        employeeService.getEmployees(department, page, size, sortBy));\n}\n// GET /employees?department=Finance&page=0&size=10&sortBy=name",
      "example": "\"Pagination in Spring Data JPA uses three components. Pageable carries the request — page number zero-indexed, size, and optional sort. PageRequest.of builds the Pageable. The repository method accepts Pageable and returns Page<T> which contains the data subset plus metadata like total count and total pages. Spring generates two SQL queries automatically — one with LIMIT and OFFSET for the actual data, one COUNT for pagination metadata. The frontend uses totalPages to build page navigation.\"",
      "summary10s": "PageRequest.of(page, size, sort) creates Pageable, pass to repo, get Page<T> back with content+totalElements+totalPages. Spring runs LIMIT/OFFSET + COUNT automatically."
    }
  },
  {
    "id": "how-sorting-works-in-spring-boot",
    "category": "Spring Boot",
    "question": "How Sorting Works in Spring Boot",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Three approaches — OrderBy in method name (fixed), Sort parameter (dynamic), Pageable with embedded sort (combined with pagination).",
      "explain": "Method name derivation — findAllByOrderByNameAsc, fixed at compile time\nSort parameter — findByDepartment(String dept, Sort sort), runtime decided\nSort.by(Direction, field) for single field, Sort.Order.asc/desc for multi-field\nCombined with Pageable — PageRequest.of(page, size, Sort.by(field)) for pagination+sorting together\n\nCode:\npublic interface EmployeeRepository extends JpaRepository<Employee, Long> {\n    // Fixed sort via method name\n    List<Employee> findAllByOrderBySalaryDesc();\n    \n    // Dynamic sort via Sort parameter\n    List<Employee> findByDepartment(String department, Sort sort);\n}\n\n// Single field dynamic sort\nSort sort = Sort.by(Sort.Direction.valueOf(direction.toUpperCase()), sortField);\nemployeeRepository.findByDepartment(\"Finance\", sort);\n\n// Multi-field sort\nSort multiSort = Sort.by(Sort.Order.asc(\"name\"), Sort.Order.desc(\"salary\"));\nemployeeRepository.findByDepartment(\"Finance\", multiSort);\n\n// Combined with pagination\nPageable pageable = PageRequest.of(0, 10, Sort.by(\"name\").ascending());\nemployeeRepository.findAll(pageable);",
      "example": "\"Spring Data JPA provides three sorting options. OrderBy in the method name is hardcoded — findAllByOrderBySalaryDesc always sorts by salary descending. When sort field or direction must be decided at runtime — like from a request parameter — I add Sort as a method parameter and build it dynamically with Sort.by. For APIs that need both pagination and sorting, I embed the Sort directly inside PageRequest.of so one Pageable object carries everything.\"",
      "summary10s": "OrderBy in method name = fixed compile-time, Sort parameter = dynamic runtime, embed Sort in PageRequest for pagination+sorting combined."
    }
  },
  {
    "id": "how-to-handle-cors-in-spring-boot",
    "category": "Spring Boot",
    "question": "How to Handle CORS in Spring Boot",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "CORS allows browsers to make requests to a different origin — configure allowed origins, methods, and headers.",
      "explain": "Browser blocks cross-origin requests by default — CORS headers tell browser to allow specific origins\n@CrossOrigin on specific controller or method — quick but requires adding to every controller\nGlobal WebMvcConfigurer — one place configures CORS for all endpoints\nSpring Security with CORS — must configure CORS before security filters or security blocks it\nProduction — allow only specific frontend URLs not wildcard\n\nCode:\n// Option 1: @CrossOrigin on controller\n@CrossOrigin(origins = \"http://localhost:4200\")\n@RestController\npublic class UserController { }\n\n// Option 2: Global WebMvcConfigurer\n@Configuration\npublic class WebConfig implements WebMvcConfigurer {\n    @Override\n    public void addCorsMappings(CorsRegistry registry) {\n        registry.addMapping(\"/api/**\")\n            .allowedOrigins(\"http://localhost:4200\", \"https://myapp.com\")\n            .allowedMethods(\"GET\", \"POST\", \"PUT\", \"DELETE\", \"PATCH\")\n            .allowedHeaders(\"*\")\n            .allowCredentials(true)\n            .maxAge(3600);\n    }\n}\n\n// Option 3: With Spring Security\n@Bean\npublic SecurityFilterChain filterChain(HttpSecurity http) throws Exception {\n    http.cors(cors -> cors.configurationSource(corsConfigurationSource()))\n        .csrf(csrf -> csrf.disable())\n        ...\n    return http.build();\n}\n\n@Bean\npublic CorsConfigurationSource corsConfigurationSource() {\n    CorsConfiguration config = new CorsConfiguration();\n    config.setAllowedOrigins(List.of(\"http://localhost:4200\"));\n    config.setAllowedMethods(List.of(\"GET\",\"POST\",\"PUT\",\"DELETE\"));\n    config.setAllowCredentials(true);\n    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();\n    source.registerCorsConfiguration(\"/**\", config);\n    return source;\n}",
      "example": "\"CORS is a browser security mechanism — when my Angular frontend on localhost:4200 calls my Spring Boot API on localhost:8080, the browser blocks it as cross-origin unless the API explicitly allows it. For development I use @CrossOrigin on controllers, but for production I configure CORS globally in WebMvcConfigurer specifying exact allowed origins. When Spring Security is involved, CORS configuration must go through SecurityFilterChain otherwise the security filter rejects the preflight OPTIONS request before it even reaches the CORS configuration.\"",
      "summary10s": "CORS = browser security for cross-origin requests. @CrossOrigin per controller or global WebMvcConfigurer. With Spring Security, configure CorsConfigurationSource in SecurityFilterChain."
    }
  },
  {
    "id": "spring-data-jpa-vs-jpa-vs-hibernate",
    "category": "Spring Boot",
    "question": "Spring Data JPA vs JPA vs Hibernate",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "JPA is the specification, Hibernate is the implementation, Spring Data JPA removes boilerplate on top.",
      "explain": "JPA — standard specification, defines @Entity, @Id, EntityManager, JPQL — no actual code\nHibernate — implements JPA, does the actual SQL generation and execution via JDBC\nSpring Data JPA — built on JPA, provides Repository interfaces eliminating DAO boilerplate\nStack: Spring Data JPA → JPA → Hibernate → JDBC → Database",
      "example": "\"JPA is like a rulebook — it defines how Java objects should map to database tables but provides no implementation. Hibernate follows that rulebook and does the actual work — reads my annotations, generates SQL, manages caching. Spring Data JPA sits on top and removes boilerplate — I just declare an interface extending JpaRepository and get findById, findAll, save, delete for free. I code against JPA standard so theoretically I could swap Hibernate for EclipseLink without changing my application code.\"",
      "summary10s": "JPA=spec no code, Hibernate=implements JPA generates SQL, Spring Data JPA=zero-boilerplate Repository on top. Stack: SpringDataJPA→JPA→Hibernate→JDBC→DB."
    }
  },
  {
    "id": "crudrepository-vs-jparepository",
    "category": "Spring Boot",
    "question": "CrudRepository vs JpaRepository",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "CrudRepository has basic CRUD, JpaRepository extends it with JPA-specific batch operations and flush control.",
      "explain": "CrudRepository — save, findById, findAll returns Iterable, delete, count, existsById\nPagingAndSortingRepository — adds findAll(Pageable) and findAll(Sort)\nJpaRepository — extends both, adds: deleteInBatch, saveAllAndFlush, getReferenceById, flush\nJpaRepository returns List not Iterable — more convenient for most use cases\nUse JpaRepository always unless explicitly restricting capabilities to callers",
      "example": "\"JpaRepository is the most complete — it extends CrudRepository for basic CRUD and PagingAndSortingRepository for pagination, then adds JPA-specific methods. deleteInBatch sends one DELETE query instead of N individual ones — critical for performance when deleting many records. getReferenceById returns a proxy without a DB hit, useful for setting foreign key relationships without loading the full entity. I always use JpaRepository unless I want to restrict what repository methods are visible to callers.\"",
      "summary10s": "CrudRepository=basic CRUD, PagingAndSorting=adds pagination, JpaRepository=all of above plus deleteInBatch, flush, getReferenceById. Use JpaRepository always."
    }
  },
  {
    "id": "how-transactions-work-internally",
    "category": "Spring Boot",
    "question": "How Transactions Work Internally",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "@Transactional creates an AOP proxy — proxy opens transaction before method, commits on success, rolls back on exception.",
      "explain": "Spring creates CGLIB proxy wrapping the bean at startup\nWhen method is called, proxy intercepts — opens connection, begins transaction\nMethod executes with that connection in thread-local TransactionSynchronizationManager\nOn normal return — proxy commits and closes connection\nOn RuntimeException — proxy rolls back\nChecked exceptions do NOT rollback by default",
      "example": "\"@Transactional uses AOP. Spring wraps my @Service bean in a CGLIB proxy at startup. When I call a transactional method, the proxy intercepts the call, gets a connection from the pool, begins a transaction, and stores the connection in a thread-local variable. All JPA operations in that thread use that same connection and transaction. On normal return the proxy commits. On unchecked exception it rolls back. Two things I always mention — checked exceptions don't rollback by default, and calling a @Transactional method from within the same class bypasses the proxy.\"",
      "summary10s": "CGLIB proxy intercepts call, opens transaction, commit on success, rollback on RuntimeException. Checked exceptions need rollbackFor. Self-invocation bypasses proxy."
    }
  },
  {
    "id": "transaction-propagation-types",
    "category": "Spring Boot",
    "question": "Transaction Propagation Types",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Propagation controls what happens when a transactional method is called from another transactional method.",
      "explain": "REQUIRED — default, use existing transaction or create new one\nREQUIRES_NEW — always create new transaction, suspend existing one\nNESTED — create savepoint within existing transaction, can rollback to savepoint\nSUPPORTS — use existing transaction if present, run without if not\nMANDATORY — must have existing transaction, throw if none\nNEVER — must NOT run in transaction, throw if one exists",
      "example": "\"REQUIRED is what I use 99% of the time — join existing transaction or create one. REQUIRES_NEW is critical for audit logging in banking — when a payment fails and rolls back, I still want the failure audit log to commit. REQUIRES_NEW suspends the outer transaction, commits the audit log independently, then resumes outer. NESTED is useful when I want partial rollback capability — if the optional enrichment step fails I rollback to the savepoint but keep the main operation going.\"",
      "summary10s": "REQUIRED=use or create(default), REQUIRES_NEW=always new(audit logs), NESTED=savepoint within, MANDATORY=must exist, SUPPORTS=optional, NEVER=must not exist."
    }
  },
  {
    "id": "transaction-isolation-levels",
    "category": "Spring Boot",
    "question": "Transaction Isolation Levels",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Isolation level controls what a transaction can see from other concurrent transactions — trade-off between consistency and performance.",
      "explain": "READ_UNCOMMITTED — can see uncommitted changes (dirty reads) — almost never use\nREAD_COMMITTED — only see committed data, default for most databases\nREPEATABLE_READ — same query returns same result within transaction, prevents non-repeatable reads\nSERIALIZABLE — fully isolated, transactions run as if sequential — slowest but safest\nProblems each prevents:\nLevel              | Dirty Read | Non-Repeatable Read | Phantom Read\nREAD_UNCOMMITTED   | Possible   | Possible            | Possible\nREAD_COMMITTED     | Prevented  | Possible            | Possible\nREPEATABLE_READ    | Prevented  | Prevented           | Possible\nSERIALIZABLE       | Prevented  | Prevented           | Prevented\n\nDirty read — reading uncommitted data that might be rolled back\nNon-repeatable read — same row returns different values in same transaction\nPhantom read — new rows appear in same query within same transaction",
      "example": "\"READ_COMMITTED is the practical default — I only see committed data, preventing dirty reads. For financial operations where I read a balance, check it, then debit — I need REPEATABLE_READ to ensure the balance doesn't change between my read and write. SERIALIZABLE prevents phantom reads too but locks more aggressively. For banking I use REPEATABLE_READ for critical balance checks and @Version optimistic locking to handle concurrent updates instead of SERIALIZABLE for better throughput.\"",
      "summary10s": "READ_COMMITTED=no dirty reads(default), REPEATABLE_READ=consistent reads in transaction, SERIALIZABLE=fully isolated but slow. Use READ_COMMITTED+@Version for banking."
    }
  },
  {
    "id": "what-is-n-1-problem",
    "category": "Spring Boot",
    "question": "What is N+1 Problem",
    "frequency": 2,
    "companies": [],
    "variations": [
      "N+1 Problem"
    ],
    "answerSEE": {
      "simple": "One query fetches N parents, then N additional queries fire one per parent to load their children — total N+1 queries.",
      "explain": "Fetch 10 orders — 1 query. Access each order's items lazily — 10 more queries. Total 11\nSilently kills performance — 100 customers means 101 queries, 1000 means 1001\nLooks fine in tests with small data, catastrophic in production with real volume\nDetect with show_sql enabled in dev — count queries per request\nHibernate Batch Fetching can partially help but JOIN FETCH is the proper fix\n\nExample:\n// N+1 problem\nList<Order> orders = orderRepository.findAll();  // 1 query: SELECT * FROM orders\norders.forEach(order -> {\n    // EACH iteration fires a query: SELECT * FROM items WHERE order_id = ?\n    System.out.println(order.getItems().size()); // N queries!\n});\n// Total: 1 + N queries\n\n// Fix with JOIN FETCH\n@Query(\"SELECT o FROM Order o JOIN FETCH o.items\")\nList<Order> findAllWithItems(); // 1 query with JOIN: SELECT o.*, i.* FROM orders o JOIN items i",
      "example": "\"N+1 is when Hibernate fires one query for the list and then one additional query per element to load a lazy relationship. Loading 100 orders and accessing items for each fires 101 queries — unnoticed in development with 5 rows of test data but catastrophic in production with 10,000 orders. I always enable show_sql in development and count queries per API call. As soon as I see the same query pattern repeating I know there's an N+1 and fix it with JOIN FETCH.\"",
      "summary10s": "1 query for list + N queries for lazy child = N+1. Enable show_sql to detect, fix with JOIN FETCH or @EntityGraph."
    }
  },
  {
    "id": "how-to-solve-n-1-problem",
    "category": "Spring Boot",
    "question": "How to Solve N+1 Problem",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "JOIN FETCH in JPQL, @EntityGraph on repository method, or Hibernate batch fetching — all load relationships in fewer queries.",
      "explain": "// Solution 1: JOIN FETCH in @Query\n@Query(\"SELECT o FROM Order o JOIN FETCH o.items WHERE o.customerId = :id\")\nList<Order> findByCustomerWithItems(@Param(\"id\") Long customerId);\n// ONE query with JOIN — no lazy loading\n\n// Solution 2: @EntityGraph — cleaner approach\n@EntityGraph(attributePaths = {\"items\", \"items.product\"})\nList<Order> findByCustomerId(Long customerId);\n// Spring generates LEFT JOIN FETCH automatically\n\n// Solution 3: Batch size configuration\n@OneToMany(mappedBy = \"order\")\n@BatchSize(size = 50) // Hibernate fetches 50 items at once instead of 1 per order\nprivate List<OrderItem> items;\n// Reduces N+1 to ceil(N/50)+1 queries — not perfect but better than N\n\n// Solution 4: Separate query for specific use case\nList<Order> orders = orderRepository.findByCustomerId(customerId);\nMap<Long, List<Item>> itemsByOrder = itemRepository\n    .findByOrderIdIn(orders.stream().map(Order::getId).collect(toList()))\n    .stream().collect(groupingBy(Item::getOrderId));\n// 2 queries total regardless of order count",
      "example": "\"My preferred solution is JOIN FETCH or @EntityGraph. JOIN FETCH in the JPQL query loads the parent and children in a single SQL JOIN — one query regardless of collection size. @EntityGraph is cleaner as it doesn't require writing the full JPQL, just specifying which attribute paths to eagerly load for that specific query. For cases where I cannot modify the query, I use @BatchSize on the collection — Hibernate then fetches items in batches of N instead of one per parent, reducing 1000 queries to 20.\"",
      "summary10s": "JOIN FETCH or @EntityGraph = single SQL with JOIN. @BatchSize = reduces N+1 to N/batchSize+1. Choose JOIN FETCH for complete fix."
    }
  },
  {
    "id": "jpql-vs-native-query",
    "category": "Spring Boot",
    "question": "JPQL vs Native Query",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "JPQL uses entity class names and is database-independent, Native Query uses actual table names and is database-specific.",
      "explain": "JPQL — queries against entity model not DB schema, JPA specification standard\nNative SQL — actual SQL with real table and column names, database-specific syntax\nJPQL advantages — database portability, compile-time checking, works with entity state\nNative advantages — use any DB feature, window functions, full-text search, performance hints\nChoose JPQL by default, native only when JPQL cannot express the requirement\nCode:\n// JPQL — entity class name Employee, field name firstName\n@Query(\"SELECT e FROM Employee e WHERE e.firstName = :name AND e.salary > :sal\")\nList<Employee> findHighEarners(@Param(\"name\") String name, @Param(\"sal\") BigDecimal sal);\n\n// Native SQL — table name employees, column name first_name\n@Query(value = \"SELECT * FROM employees WHERE first_name = :name AND salary > :sal\",\n       nativeQuery = true)\nList<Employee> findHighEarnersNative(@Param(\"name\") String name, @Param(\"sal\") BigDecimal sal);\n\n// Native for DB-specific features\n@Query(value = \"SELECT *, ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) as rank \" +\n               \"FROM employees\",\n       nativeQuery = true)\nList<Object[]> findEmployeeRankings(); // ROW_NUMBER not available in JPQL",
      "example": "\"JPQL is my default because it works at the entity level — I use Employee not the employees table name, firstName not first_name column. If I switch databases, my JPQL queries still work. Native SQL is for situations JPQL cannot handle — window functions like ROW_NUMBER, full-text search using MATCH AGAINST, database-specific JSON operations, or when I need a complex optimized query with specific indexes hints. The trade-off is tight coupling to the database vendor.\"",
      "summary10s": "JPQL=entity names database-portable, Native=table names database-specific. Use JPQL by default, native for DB-specific features like window functions."
    }
  },
  {
    "id": "how-query-works",
    "category": "Spring Boot",
    "question": "How @Query Works",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "@Query defines a custom JPQL or SQL query on a repository method — overrides Spring Data's method name derivation.",
      "explain": "@Param binds method parameter to named parameter in query\nWithout nativeQuery — JPQL parsed, entity/field names used\nnativeQuery=true — raw SQL with table/column names\n@Modifying required for UPDATE/DELETE queries — tells Spring this is a write operation\n@Transactional needed on modifying queries to execute in a transaction context\nCode:\n// JPQL with named params\n@Query(\"SELECT e FROM Employee e WHERE e.department.name = :deptName AND e.salary BETWEEN :min AND :max\")\nList<Employee> findByDeptAndSalaryRange(\n    @Param(\"deptName\") String deptName,\n    @Param(\"min\") BigDecimal min,\n    @Param(\"max\") BigDecimal max);\n\n// Modifying query — needs @Modifying and @Transactional\n@Modifying\n@Transactional\n@Query(\"UPDATE Employee e SET e.status = :status WHERE e.department.id = :deptId\")\nint updateStatusByDepartment(@Param(\"deptId\") Long deptId, @Param(\"status\") String status);\n\n// Native with pagination\n@Query(value = \"SELECT * FROM employees WHERE dept_id = :deptId\",\n       countQuery = \"SELECT COUNT(*) FROM employees WHERE dept_id = :deptId\",\n       nativeQuery = true)\nPage<Employee> findByDeptNative(@Param(\"deptId\") Long deptId, Pageable pageable);",
      "example": "\"@Query gives me full control over the query when method name derivation becomes too complex or insufficient. For read queries I just add @Query with the JPQL or SQL. For UPDATE and DELETE I add @Modifying to tell Spring this query changes data — without it Spring throws an exception. When using native queries with pagination, I also need to provide a separate countQuery because Spring cannot derive the count from the native query automatically.\"",
      "summary10s": "@Query for custom JPQL/SQL, @Param binds parameters, @Modifying+@Transactional for UPDATE/DELETE, countQuery for native pagination."
    }
  },
  {
    "id": "pagination-with-jpa",
    "category": "Spring Boot",
    "question": "Pagination with JPA",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Pass Pageable into repository method, return Page — contains data subset plus totalElements and totalPages metadata.",
      "explain": "Pageable carries — page number (0-indexed), page size, optional sort\nPageRequest.of(page, size, Sort) — concrete Pageable implementation\nPage<T> response — getContent(), getTotalElements(), getTotalPages(), hasNext()\nSpring runs two queries — LIMIT/OFFSET for data, COUNT for totals\nMap Page<Entity> to Page<DTO> using page.map(mapper::toDTO)",
      "example": "\"Spring Data JPA pagination needs three things. Pageable parameter in the repository method. PageRequest.of in the service to build it. Page<T> as the return type. Spring generates the LIMIT OFFSET query automatically plus a separate COUNT query — the Page object includes both the current page data and total count so the frontend can calculate total pages. Important — page numbers are zero-indexed, so page 0 is the first page.\"",
      "summary10s": "PageRequest.of(page, size, sort)→Pageable parameter→Page<T> response. Spring auto-generates LIMIT/OFFSET + COUNT. Page numbers zero-indexed."
    }
  },
  {
    "id": "optimistic-vs-pessimistic-locking",
    "category": "Spring Boot",
    "question": "Optimistic vs Pessimistic Locking",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Optimistic checks for conflict at commit time, Pessimistic locks the row immediately preventing concurrent access.",
      "explain": "Optimistic — no DB lock, uses @Version field, fails at commit if version changed by another transaction\nPessimistic — SELECT FOR UPDATE locks the row, other transactions wait until lock released\nOptimistic — better throughput for low-conflict scenarios, fails with OptimisticLockException\nPessimistic — guaranteed no conflict, but lower throughput and risk of deadlock\nBanking — @Version for account balance updates, pessimistic for critical inventory deduction\nCode:\n// Optimistic locking\n@Entity\npublic class Account {\n    @Id private Long id;\n    private BigDecimal balance;\n    \n    @Version\n    private Long version; // automatically managed by Hibernate\n}\n\n// Two concurrent transactions:\n// TX1: read account (version=1), deduct 100\n// TX2: read account (version=1), deduct 200\n// TX1 commits first: version becomes 2\n// TX2 tries to commit: WHERE id=? AND version=1 → no rows → OptimisticLockException!\n\n// Pessimistic locking\n@Lock(LockModeType.PESSIMISTIC_WRITE)\n@Query(\"SELECT a FROM Account a WHERE a.id = :id\")\nAccount findByIdForUpdate(@Param(\"id\") Long id);\n// Generates: SELECT * FROM accounts WHERE id = ? FOR UPDATE\n// Other transactions block until this transaction commits",
      "example": "\"Optimistic locking assumes conflicts are rare — no DB lock is acquired. @Version adds a version column, Hibernate includes it in every UPDATE. If two transactions update the same row, the second one finds the version has changed and throws OptimisticLockException — I catch it and retry. Pessimistic locking immediately locks the database row with SELECT FOR UPDATE — no other transaction can modify it until I commit. I use optimistic for most business operations and pessimistic for truly critical sections like stock deduction where losing a retry is unacceptable.\"",
      "summary10s": "Optimistic=@Version check at commit, OptimisticLockException on conflict, high throughput. Pessimistic=SELECT FOR UPDATE row lock, blocks others, guaranteed no conflict."
    }
  },
  {
    "id": "what-is-version",
    "category": "Spring Boot",
    "question": "What is @Version",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "@Version marks a field Hibernate manages automatically for optimistic locking — auto-increments on every update, prevents lost updates.",
      "explain": "Hibernate automatically increments @Version field on every UPDATE\nSQL generated: UPDATE account SET balance=?, version=version+1 WHERE id=? AND version=?\nIf WHERE clause matches zero rows (another transaction already updated) — OptimisticLockException\nType can be int, Integer, long, Long, or Timestamp\nNever manually set the @Version field — Hibernate manages it entirely\nCode:\n@Entity\npublic class Account {\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    \n    private BigDecimal balance;\n    \n    @Version\n    private Long version; // DO NOT set this manually\n}\n\n// What Hibernate generates for every save:\n// UPDATE accounts SET balance = ?, version = 3 WHERE id = ? AND version = 2\n// If another transaction already changed version to 3:\n// WHERE id=1 AND version=2 → 0 rows updated → OptimisticLockException thrown\n\n// Handling the exception\ntry {\n    accountRepository.save(account);\n} catch (OptimisticLockingFailureException e) {\n    // Reload and retry\n    account = accountRepository.findById(account.getId()).orElseThrow();\n    // re-apply the change\n    accountRepository.save(account);\n}",
      "example": "\"@Version adds a version column that Hibernate manages automatically. Every UPDATE Hibernate generates includes WHERE version equals current value and increments it. If another transaction already updated the row and incremented the version, the WHERE clause matches nothing and Hibernate throws OptimisticLockingFailureException. I catch it, reload the entity with fresh data, reapply my change, and retry. The field type can be Long for most cases — I never touch it in application code.\"",
      "summary10s": "@Version auto-increments on every UPDATE, included in WHERE clause, zero rows matched = OptimisticLockException. Never manually set it."
    }
  },
  {
    "id": "entity-lifecycle-states",
    "category": "Spring Boot",
    "question": "Entity Lifecycle States",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Four states — Transient (new), Persistent (managed), Detached (session closed), Removed (scheduled delete).",
      "explain": "Transient — new object, not in DB, Hibernate not tracking it\nPersistent — attached to Hibernate session, all changes auto-synced to DB at flush\nDetached — was persistent but session closed, changes NOT tracked anymore\nRemoved — marked for deletion, DELETE on flush or commit\nState transitions:\nnew Employee() → TRANSIENT (not in DB, not tracked)\n    ↓ entityManager.persist() / repository.save()\nPERSISTENT (tracked, auto-sync on flush)\n    ↓ session closes\nDETACHED (changes not tracked)\n    ↓ entityManager.merge()\nPERSISTENT (re-attached)\n    ↓ entityManager.remove()\nREMOVED → deleted on flush",
      "example": "\"Understanding entity states helps debug subtle bugs. Transient is a new Java object — Hibernate does not know about it. Persistent means it is managed — any field change I make is automatically detected and synced to DB at flush time, no explicit save call needed. Detached is the common trap — entity was loaded in one transaction, transaction ended, entity is now detached. If I change it and save it in a new transaction I must use merge. Removed means I called delete — it is scheduled for deletion on the next flush or commit.\"",
      "summary10s": "Transient=new not tracked, Persistent=managed auto-synced, Detached=session closed changes ignored, Removed=scheduled for deletion. persist→Persistent, session close→Detached, merge→re-Persistent."
    }
  },
  {
    "id": "what-is-dirty-checking",
    "category": "Spring Boot",
    "question": "What is Dirty Checking",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Hibernate automatically detects changes to persistent entities and generates UPDATE queries — no explicit save() needed for updates.",
      "explain": "When entity is in Persistent state, Hibernate takes a snapshot at load time\nAt flush time — Hibernate compares current state with snapshot\nIf any field changed — automatically generates UPDATE SQL for those fields\nThis is why update operations within @Transactional work without calling save()\nOnly works for persistent entities — detached entities need explicit merge/save\nCode:\n@Service\n@Transactional\npublic class EmployeeService {\n    \n    public void updateSalary(Long id, BigDecimal newSalary) {\n        Employee emp = employeeRepository.findById(id)\n            .orElseThrow(() -> new ResourceNotFoundException(\"Not found\"));\n        \n        // Just change the field — NO explicit save() call needed!\n        emp.setSalary(newSalary);\n        \n        // At end of @Transactional method:\n        // Hibernate compares current salary with snapshot\n        // Detects change → generates: UPDATE employees SET salary=? WHERE id=?\n        // Commits automatically\n    }\n}",
      "example": "\"Dirty checking means Hibernate watches persistent entities automatically. When I load an employee within a transaction, Hibernate takes a snapshot of all its field values. At flush time before commit, Hibernate compares current field values with the snapshot. If salary changed, it generates and executes an UPDATE automatically — I never call save() for updates within a transaction. This is one of the most misunderstood JPA behaviors — calling save() on a managed entity is redundant but harmless.\"",
      "summary10s": "Hibernate snapshots entity at load, compares at flush, auto-generates UPDATE for changed fields — no explicit save() needed for updates within @Transactional."
    }
  },
  {
    "id": "save-vs-saveandflush",
    "category": "Spring Boot",
    "question": "save() vs saveAndFlush()",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "save() stages changes in persistence context, saveAndFlush() immediately writes to DB within the same transaction.",
      "explain": "save() — marks entity as persistent, actual SQL may not execute until flush happens at commit\nsaveAndFlush() — immediately executes SQL to DB, useful when subsequent logic needs DB-generated values\nflush() — forces SQL execution without committing the transaction\nUse case for saveAndFlush — save entity then call a stored procedure that needs that data in same transaction\nCode:\n// save() — SQL executes at transaction commit\nEmployee emp = new Employee(\"Alice\", \"Engineering\");\nemployeeRepository.save(emp);\n// At this point, emp.id might be null if DB assigns it\n// SQL executes when transaction flushes (usually at commit)\n\n// saveAndFlush() — SQL executes immediately\nEmployee emp = new Employee(\"Alice\", \"Engineering\");\nemployeeRepository.saveAndFlush(emp);\n// emp.id is populated NOW — DB has the row, generated ID is available\nLong empId = emp.getId(); // available immediately\n\n// Use case — save then immediately reference\nDepartment dept = new Department(\"Engineering\");\ndepartmentRepository.saveAndFlush(dept); // flush to DB now\n// Now I can reference dept.getId() in the next query\nList<Employee> emps = employeeRepository.findByDepartmentId(dept.getId());",
      "example": "\"save() stages the entity in the persistence context but SQL execution timing is controlled by Hibernate's flush mode — usually at transaction commit. saveAndFlush() forces immediate SQL execution to the database right now, still within the same transaction. I use saveAndFlush when I need the database-generated ID or need to reference the saved record in a subsequent query within the same transaction. For normal use save() is sufficient and better for batching multiple operations.\"",
      "summary10s": "save()=stages in context SQL at flush/commit, saveAndFlush()=immediate SQL to DB. Use saveAndFlush when DB-generated ID needed immediately or for same-transaction reference."
    }
  },
  {
    "id": "how-auditing-works-in-jpa",
    "category": "Spring Boot",
    "question": "How Auditing Works in JPA",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "@CreatedDate, @LastModifiedDate, @CreatedBy, @LastModifiedBy auto-populate audit fields — enable with @EnableJpaAuditing.",
      "explain": "Add @EnableJpaAuditing on @SpringBootApplication or @Configuration class\nAbstract base entity with @EntityListeners(AuditingEntityListener.class) and audit fields\nEntities extend the base entity to inherit audit fields\nAuditorAware bean provides current user for @CreatedBy and @LastModifiedBy\n@CreationTimestamp and @UpdateTimestamp are Hibernate-specific alternatives\nCode:\n// Enable auditing\n@SpringBootApplication\n@EnableJpaAuditing(auditorAwareRef = \"auditorProvider\")\npublic class Application { }\n\n// AuditorAware bean — provides current user\n@Bean\npublic AuditorAware<String> auditorProvider() {\n    return () -> Optional.of(\n        SecurityContextHolder.getContext()\n            .getAuthentication().getName()\n    );\n}\n\n// Base auditing entity\n@MappedSuperclass\n@EntityListeners(AuditingEntityListener.class)\npublic abstract class BaseAuditEntity {\n    @CreatedDate\n    @Column(updatable = false)\n    private LocalDateTime createdAt;\n    \n    @LastModifiedDate\n    private LocalDateTime updatedAt;\n    \n    @CreatedBy\n    @Column(updatable = false)\n    private String createdBy;\n    \n    @LastModifiedBy\n    private String lastModifiedBy;\n}\n\n// All entities extend it\n@Entity\npublic class Account extends BaseAuditEntity {\n    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    private BigDecimal balance;\n    // createdAt, updatedAt, createdBy, lastModifiedBy inherited automatically\n}",
      "example": "\"JPA auditing eliminates manually setting createdAt and updatedBy in every service method. I enable it with @EnableJpaAuditing, create a base entity class with @MappedSuperclass and @EntityListeners pointing to AuditingEntityListener, then annotate fields with @CreatedDate, @LastModifiedDate, @CreatedBy, @LastModifiedBy. The AuditorAware bean provides the current username from Spring Security context. All my entities extend this base class and get auditing for free without any code in service layer.\"",
      "summary10s": "@EnableJpaAuditing + @EntityListeners(AuditingEntityListener) + @CreatedDate/@LastModifiedDate/@CreatedBy/@LastModifiedBy + AuditorAware bean for username."
    }
  },
  {
    "id": "concurrenthashmap-internal-working",
    "category": "Java",
    "question": "ConcurrentHashMap internal working",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "ConcurrentHashMap allows multiple threads to read/write safely without locking the entire map.",
      "explain": "Uses bucket-level locking (segment locking in older versions, CAS + synchronized in Java 8+)\nOnly the specific bucket being modified is locked, not the whole map\nReads are mostly lock-free, giving high concurrency",
      "example": "\"ConcurrentHashMap achieves thread-safety without locking the whole map. In Java 8 onwards, it uses CAS operations and synchronizes only on the specific bucket being updated, not the entire structure. This makes reads mostly lock-free and gives much better performance than a synchronized HashMap in multi-threaded scenarios.\"",
      "summary10s": "Locks only the bucket, not the whole map — high concurrency."
    }
  },
  {
    "id": "daemon-thread",
    "category": "Java",
    "question": "Daemon Thread",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "A daemon thread is a background thread that doesn't stop the JVM from exiting.",
      "explain": "JVM exits once all non-daemon (user) threads finish, ignoring daemon threads\nSet using thread.setDaemon(true) before calling start()\nUsed for background tasks like garbage collection, logging",
      "example": "\"A daemon thread runs in the background and doesn't prevent the JVM from shutting down — once all normal threads finish, the JVM exits even if daemon threads are still running. Garbage collection is a classic example. We set it using setDaemon(true) before starting the thread.\"",
      "summary10s": "Background thread — JVM doesn't wait for it to finish."
    }
  },
  {
    "id": "solid-principles-with-real-time-example",
    "category": "Java",
    "question": "SOLID principles with real-time example",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "SOLID is a set of 5 design principles that make code more maintainable and extensible.",
      "explain": "S — Single Responsibility: one class, one job\nO — Open/Closed: open for extension, closed for modification\nL, I, D — Liskov substitution, Interface segregation, Dependency inversion (depend on abstractions)\nExample: Instead of one PaymentService handling Card, UPI, NetBanking logic, split into separate strategy classes implementing a common PaymentMethod interface.",
      "example": "\"SOLID is a set of five principles for writing clean, maintainable code. For example, in a payment module, instead of writing all payment logic in one class, I'd apply Single Responsibility and Open/Closed by creating separate classes for each payment type implementing a common interface — so adding a new payment method doesn't require changing existing code. This also naturally follows Dependency Inversion since the service depends on the interface, not concrete classes.\"",
      "summary10s": "5 principles → one job per class, extend don't modify, depend on abstractions."
    }
  },
  {
    "id": "optional-ispresent-vs-ifpresent",
    "category": "Java",
    "question": "Optional: isPresent() vs ifPresent()",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "isPresent() checks if a value exists; ifPresent() runs code only if the value exists.",
      "explain": "isPresent() returns boolean, needs manual if-check\nifPresent(consumer) takes a lambda, executes it only when value is present\nifPresent() is more functional-style, avoids extra null checks",
      "example": "\"isPresent() just returns a boolean telling us whether a value is present, so we still need an if-condition. ifPresent() is more functional — we pass a lambda, and it only executes that lambda if the value exists, so it avoids writing extra if-blocks. I prefer ifPresent() for cleaner code when I just need to act on the value.\"",
      "summary10s": "isPresent = boolean check, ifPresent = lambda runs automatically."
    }
  },
  {
    "id": "jvm-memory-management",
    "category": "Java",
    "question": "JVM Memory Management",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "JVM manages memory using different areas like Heap, Stack, and Metaspace, and cleans unused objects via Garbage Collection.",
      "explain": "Heap — stores objects, divided into Young Gen (Eden, Survivor) and Old Gen\nStack — stores method calls and local variables, per thread\nGC automatically removes objects with no references (Minor GC for Young Gen, Major GC for Old Gen)",
      "example": "\"\"JVM memory is mainly divided into Heap and Stack. Objects are created in the Heap, which itself is split into Young and Old Generation for efficient garbage collection. The Stack holds method calls and local variables per thread. Garbage Collector automatically removes \nobjects that no longer have references, so we don't manage memory manually like in C++.\"\"",
      "summary10s": "Heap for objects, Stack for method calls, GC auto-cleans unused ones."
    }
  },
  {
    "id": "how-do-you-implement-jwt-authentication",
    "category": "Microservices",
    "question": "How do you implement JWT authentication?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "JWT authentication means the server issues a signed token after login, and the client sends it on every request instead of a session.",
      "explain": "Login → generate JWT (with user info + expiry) → sign with secret key\nClient sends token in Authorization: Bearer <token> header\nA filter (extends OncePerRequestFilter) validates token on each request before reaching controller",
      "example": "\"After a successful login, I generate a JWT containing user details and an expiry, signed with a secret key. The client stores this token and sends it in the Authorization header for every request. I implement a custom filter extending OncePerRequestFilter that validates the token and sets the authentication in the SecurityContext before the request reaches the controller.\"",
      "summary10s": "Login → issue JWT → validate via filter on every request."
    }
  },
  {
    "id": "oauth2-vs-jwt",
    "category": "Microservices",
    "question": "OAuth2 vs JWT",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "OAuth2 is an authorization framework/protocol; JWT is just a token format that can be used within it.",
      "explain": "OAuth2 — defines how to get access (flows like Authorization Code, Client Credentials)\nJWT — a self-contained token format, can carry claims, used to represent the OAuth2 access token\nOAuth2 often needs an Authorization Server; JWT can be used standalone too",
      "example": "\"OAuth2 is a full authorization framework that defines flows for how a client gets access to resources, often involving an Authorization Server, like login with Google. JWT is simply a token format — OAuth2 can use JWT as the access token format, but JWT itself doesn't define any authorization flow. So they solve different problems but are often used together.\"",
      "summary10s": "OAuth2 = authorization flow, JWT = token format used inside it."
    }
  },
  {
    "id": "resttemplate-vs-webclient",
    "category": "Spring Boot",
    "question": "RestTemplate vs WebClient",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "RestTemplate is the older, blocking way to call REST APIs; WebClient is the newer, non-blocking/reactive way.",
      "explain": "RestTemplate — synchronous, blocks thread until response, now in maintenance mode\nWebClient — asynchronous, non-blocking, supports reactive streams (Mono/Flux)\nWebClient is recommended for new projects, better under high load",
      "example": "\"RestTemplate is the traditional way to make REST calls, but it's synchronous and blocks the thread until a response comes back — it's also in maintenance mode now. WebClient is the modern, non-blocking alternative that works well with reactive programming using Mono and Flux. I'd use WebClient for new projects, especially where we're calling multiple services and want better throughput.\"",
      "summary10s": "RestTemplate = blocking (legacy), WebClient = non-blocking (modern)."
    }
  },
  {
    "id": "api-gateway-and-why-it-s-required",
    "category": "Microservices",
    "question": "API Gateway and why it's required",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "API Gateway is a single entry point that routes client requests to the correct microservice.",
      "explain": "Handles routing, authentication, rate limiting in one place\nClients don't need to know individual service addresses\nReduces cross-cutting logic duplication across services",
      "example": "\"API Gateway acts as a single entry point for all client requests and routes them to the right microservice internally. It's required because it centralizes things like authentication, rate limiting, and logging, so individual services don't have to repeat that logic. I've used Spring Cloud Gateway for this in a microservices setup.\"",
      "summary10s": "Single entry point → routing + auth + rate limiting, centralized."
    }
  },
  {
    "id": "how-does-transactional-work-internally",
    "category": "Spring Boot",
    "question": "How does @Transactional work internally?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "@Transactional works by wrapping the method call in a proxy that manages commit/rollback.",
      "explain": "Spring creates a proxy (AOP) around the bean at startup\nProxy starts a transaction before method execution, commits after success\nRolls back automatically on unchecked exceptions (RuntimeException)\nDoesn't work on private methods or self-invocation (calling from within same class)",
      "example": "\"Internally, Spring uses AOP to create a proxy around the bean. When a method annotated with @Transactional is called through the proxy, it starts a transaction, executes the method, and commits if successful, or rolls back if a runtime exception occurs. One important gotcha I always mention is that it doesn't work if you call the method from within the same class, because that bypasses the proxy.\"",
      "summary10s": "Proxy wraps method — commits on success, rolls back on runtime exception."
    }
  },
  {
    "id": "first-level-vs-second-level-cache",
    "category": "Spring Boot",
    "question": "First-level vs Second-level cache",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "First-level cache is per-session and always on; second-level cache is shared across sessions and optional.",
      "explain": "First-level — tied to Hibernate Session, enabled by default, cleared when session closes\nSecond-level — tied to SessionFactory, shared across sessions, needs explicit setup (like EhCache)\nSecond-level reduces DB hits across multiple requests",
      "example": "\"First-level cache is enabled by default and scoped to a single Hibernate session — it's cleared once the session closes. Second-level cache is optional, scoped to the SessionFactory, and shared across multiple sessions, so it helps reduce database calls across different requests. I've used EhCache as the second-level cache provider in a read-heavy project.\"",
      "summary10s": "1st-level = per session (default), 2nd-level = shared, needs setup."
    }
  },
  {
    "id": "how-to-optimize-slow-queries",
    "category": "Java",
    "question": "How to optimize slow queries?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Optimize slow queries by indexing, avoiding unnecessary data fetching, and analyzing the execution plan.",
      "explain": "Add proper indexes on frequently filtered/joined columns\nUse EXPLAIN ANALYZE to check query execution plan\nAvoid SELECT *, fetch only needed columns; use pagination for large data\nFix N+1 issues and use proper fetch strategies",
      "example": "\"To optimize slow queries, I first check the execution plan using EXPLAIN ANALYZE to see if indexes are being used properly. Then I add indexes on columns used in WHERE or JOIN clauses. I also avoid fetching unnecessary columns, use pagination for large result sets, and make sure I'm not hitting N+1 issues from lazy loading.\"",
      "summary10s": "Index + EXPLAIN ANALYZE + avoid SELECT * + pagination."
    }
  },
  {
    "id": "how-do-you-handle-concurrent-updates",
    "category": "Spring Boot",
    "question": "How do you handle concurrent updates?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Concurrent updates are handled using optimistic or pessimistic locking to prevent data conflicts.",
      "explain": "Optimistic locking — @Version field, checks version before update, throws exception on conflict\nPessimistic locking — locks the row in DB (SELECT FOR UPDATE) until transaction completes\nOptimistic is preferred for high-read, low-conflict scenarios; pessimistic for high-conflict critical data",
      "example": "\"For concurrent updates, I mostly use optimistic locking with a @Version field on the entity — Hibernate checks the version before committing, and throws an OptimisticLockException if someone else updated it first. For more critical operations like inventory or balance updates, where conflicts are more likely, I'd use pessimistic locking to lock the row until the transaction finishes.\"",
      "summary10s": "Optimistic = @Version check, Pessimistic = row lock (SELECT FOR UPDATE)."
    }
  },
  {
    "id": "why-override-equals-and-hashcode",
    "category": "Java",
    "question": "Why Override equals() and hashCode()?",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Why Override equals() and hashCode() Together?"
    ],
    "answerSEE": {
      "simple": "Without overriding, two objects with same data are treated as different objects — breaks collections.",
      "explain": "Default equals() uses == — compares memory address not content\nDefault hashCode() returns memory-based number — two equal objects get different hash\nHashMap and HashSet use both to store and find objects\nIf equals() says two objects are equal, hashCode() must return same value — this is the contract",
      "example": "\"Default equals checks reference — two User objects with same id are not equal by default. If I put one in a HashMap and search with another User having same id, it will not find it. Overriding equals to compare id field fixes the logic. But HashMap first uses hashCode to find the bucket — if hashCode is different, it does not even call equals. That is why both must be overridden together.\"",
      "summary10s": "Default equals=reference, override for content equality, hashCode must match for equal objects or collections break."
    }
  },
  {
    "id": "what-is-autowired",
    "category": "Spring Boot",
    "question": "What is @Autowired?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "@Autowired tells Spring to automatically inject the matching bean into this field, constructor, or setter.",
      "explain": "Spring scans IoC container for a bean matching the type\nInjects it without you calling new or writing any wiring code\nCan be used on constructor, setter, or field\nIf multiple beans of same type exist, use @Qualifier to specify which one\nConstructor injection without @Autowired works in Spring 4.3 plus with single constructor",
      "example": "\"@Autowired delegates object creation to Spring. Instead of writing new UserService() I just declare UserService userService and annotate with @Autowired. Spring finds the bean of that type in its container and injects it. If two beans of same type exist Spring gets confused — I use @Qualifier with the bean name to tell Spring exactly which one to inject.\"",
      "summary10s": "@Autowired=Spring finds and injects matching bean automatically, @Qualifier for disambiguation."
    }
  },
  {
    "id": "setter-injection-vs-constructor-injection",
    "category": "Spring Boot",
    "question": "Setter Injection vs Constructor Injection",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Constructor injection is for mandatory dependencies, Setter injection is for optional ones.",
      "explain": "Constructor injection — dependencies passed at object creation, object cannot exist without them, immutable\nSetter injection — dependencies set after object creation, object can exist without them initially\nConstructor injection prevents NullPointerException — dependency always present\nSpring team recommends Constructor injection for all mandatory dependencies",
      "example": "\"Constructor injection passes dependencies when object is created — the class literally cannot be instantiated without them. This guarantees no NPE from uninjected dependency. Setter injection sets dependencies after creation — object exists but dependency might be null until setter is called. For testing, constructor injection is also cleaner — I pass mocks directly without needing Spring context.\"",
      "summary10s": "Constructor=mandatory immutable no NPE, Setter=optional set after creation, Constructor preferred."
    }
  },
  {
    "id": "how-constructor-injection-avoids-nullpointerexception",
    "category": "Spring Boot",
    "question": "How Constructor Injection Avoids NullPointerException",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Dependency is set in constructor — object cannot exist without it, so it is never null.",
      "explain": "Field injection — Spring sets the field after object creation, tiny window where it is null\nIf someone creates the class with new outside Spring context — fields never injected, NPE guaranteed\nConstructor injection — dependency is a constructor parameter, class cannot compile without it\nIn tests without Spring — just pass mock in constructor, field injection would leave it null",
      "example": "\"With field injection, the field starts as null — Spring injects after object creation. If I accidentally create the class with new somewhere, Spring never injects and NPE happens on first use. With constructor injection, the dependency is required by the constructor — it is impossible to create the object without providing the dependency. Null only if I explicitly pass null which is obvious in code.\"",
      "summary10s": "Constructor param is required at creation time, object cannot exist without it, impossible to have null dependency."
    }
  },
  {
    "id": "exception-handling-in-spring-boot",
    "category": "Spring Boot",
    "question": "Exception Handling in Spring Boot",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "@ControllerAdvice with @ExceptionHandler methods — one central class handles all exceptions.",
      "explain": "@ControllerAdvice — intercepts exceptions from all controllers globally\n@ExceptionHandler per method — handles specific exception type\nReturns proper HTTP status code and structured error response body\nCatch-all handler for Exception class as final fallback\nAdd correlation ID in response for easy log tracing",
      "example": "\"I create one GlobalExceptionHandler class with @ControllerAdvice. Each @ExceptionHandler method handles a specific exception — ResourceNotFoundException returns 404 with error message, ValidationException returns 400 with field errors. I always have a catch-all Exception handler at the bottom returning 500 with correlation ID. Controllers stay completely clean — no try-catch needed anywhere.\"",
      "summary10s": "@ControllerAdvice + @ExceptionHandler per type, specific handlers + catch-all 500, clean controllers."
    }
  },
  {
    "id": "spring-bean-scopes-where-and-how-to-define",
    "category": "Spring Boot",
    "question": "Spring Bean Scopes — Where and How to Define",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Define scope using @Scope annotation on bean definition or in @Component class.",
      "explain": "@Scope on @Component class — applies to that component\n@Scope on @Bean method — applies to that bean definition\nScope values — singleton, prototype, request, session, application\nRequest and session scopes only work in web application context",
      "example": "\"Bean scope is defined using @Scope annotation. On a @Component class I add @Scope of prototype directly above the class. On a @Bean method in @Configuration class I add @Scope before the return type. For web scopes like request and session, Spring requires a web application context — these are only valid inside web requests.\"",
      "summary10s": "@Scope on @Component class or @Bean method, web scopes need web context."
    }
  },
  {
    "id": "singleton-prototype-request-session-scope",
    "category": "Spring Boot",
    "question": "Singleton, Prototype, Request, Session Scope",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Singleton=one instance app-wide, Prototype=new instance every time, Request=one per HTTP request, Session=one per user session.",
      "explain": "Singleton — default scope, one shared instance, stateless services like UserService\nPrototype — new instance on every getBean() or injection, stateful beans\nRequest — new instance per HTTP request, destroyed after request completes\nSession — new instance per user HTTP session, persists across requests for same user",
      "example": "\"Singleton is default — one instance shared across entire application, perfect for stateless services. Prototype creates fresh instance every time the bean is requested — I inject it differently using ApplicationContext.getBean or Spring proxy. Request scope is per HTTP request lifecycle — useful for request-specific context holders. Session scope lives for user session duration — useful for user preferences or cart data.\"",
      "summary10s": "Singleton=one app-wide default, Prototype=new every injection, Request=per HTTP request, Session=per user session."
    }
  },
  {
    "id": "real-time-use-case-of-prototype-scope",
    "category": "Spring Boot",
    "question": "Real-Time Use Case of Prototype Scope",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Use Prototype when each consumer needs its own independent instance with separate state.",
      "explain": "Shopping cart — each user's cart is independent, shared cart would mix all users' items\nReport generator — each report generation needs its own state and configuration\nStateful task processors — each task has its own processing state\nEmail template builder — each email build is independent",
      "example": "\"Best real-time example is a shopping cart bean. If cart is Singleton, all users share the same cart and items get mixed — disaster. With Prototype scope each user gets their own cart instance with its own state. Another example is a report generator bean that accumulates data during generation — Prototype ensures each report job has its own accumulator and they never interfere.\"",
      "summary10s": "Prototype for stateful beans needing isolation — shopping cart, report generator, task processor per user."
    }
  },
  {
    "id": "microservices-architecture-functionalities",
    "category": "Microservices",
    "question": "Microservices Architecture Functionalities",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Service discovery, API Gateway, load balancing, circuit breaker, distributed tracing, and centralized config.",
      "explain": "Service discovery — Eureka, services register and find each other dynamically\nAPI Gateway — single entry point, routing, authentication, rate limiting\nCircuit Breaker — Resilience4j, stop calling failing service, return fallback\nDistributed tracing — Zipkin, trace request across multiple services\nCentralized config — Spring Cloud Config Server, one place for all configs\nMessage broker — Kafka or RabbitMQ for async communication",
      "example": "\"Microservices architecture needs several supporting components. API Gateway is the front door handling auth and routing. Service discovery with Eureka allows dynamic service location without hardcoded URLs. Circuit Breaker with Resilience4j prevents cascade failures. Distributed tracing with Zipkin correlates logs across services. Config Server centralizes configuration. Kafka handles async event-driven communication between services.\"",
      "summary10s": "Gateway+Eureka+CircuitBreaker+Zipkin+ConfigServer+Kafka = complete microservices ecosystem."
    }
  },
  {
    "id": "circuit-breaker",
    "category": "Microservices",
    "question": "Circuit Breaker",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Monitors failures, opens circuit after threshold, returns fallback — prevents cascade failure.",
      "explain": "Closed state — normal operation, requests pass through\nOpen state — failure threshold crossed, requests blocked, fallback returned immediately\nHalf-Open state — after cooldown, test request sent to check if service recovered\nIf test succeeds — circuit closes again. If fails — stays open\nResilience4j with @CircuitBreaker annotation",
      "example": "\"\"Circuit Breaker is like an electrical circuit breaker. Normally closed — requests flow through. When downstream service fails repeatedly and crosses failure rate threshold, circuit opens — all requests immediately return fallback without hitting the failing service. After cooldown period it \ngoes half-open and sends one test request. This prevents one slow service from blocking all threads and cascading failure to the entire system.\"\"",
      "summary10s": "Closed=normal, Open=block+fallback after threshold, Half-Open=test recovery, prevents cascade failure."
    }
  },
  {
    "id": "jwt-authentication-flow",
    "category": "Microservices",
    "question": "JWT Authentication Flow",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Login gets signed token, client sends in header, server validates signature every request.",
      "explain": "User sends credentials to login endpoint\nServer validates, creates JWT with user ID and roles, signs with secret key\nClient stores JWT and sends in Authorization Bearer header on every request\nJWT filter validates signature and expiry, extracts user info, sets SecurityContext\nStateless — no session stored on server",
      "example": "\"On login I validate credentials against database. If valid I create JWT containing userId and roles as claims, sign with secret key using HMAC SHA256. Client stores token and sends as Authorization Bearer header. My JWT filter runs before every request — extracts token, validates signature, checks expiry, sets authentication in SecurityContext. No server-side session means any instance can handle any request.\"",
      "summary10s": "Login=create signed JWT, client sends Bearer header, filter validates signature sets SecurityContext, stateless."
    }
  },
  {
    "id": "how-to-validate-user-credentials",
    "category": "Microservices",
    "question": "How to Validate User Credentials",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Load user by username from DB, verify password matches stored hash using BCrypt.",
      "explain": "Implement UserDetailsService, override loadUserByUsername\nSpring Security calls this during authentication\nLoad user from database by username or email\nPasswordEncoder.matches() compares raw password with stored BCrypt hash\nIf match — authentication success, JWT generated. If not — throw BadCredentialsException",
      "example": "\"Spring Security calls my UserDetailsService.loadUserByUsername with the submitted username. I load the user from database and return UserDetails object. Spring Security then calls PasswordEncoder.matches comparing the submitted password against the stored BCrypt hash. If they match authentication succeeds and I generate JWT. If not Spring Security throws BadCredentialsException automatically.\"",
      "summary10s": "UserDetailsService loads from DB, PasswordEncoder.matches compares raw with BCrypt hash, success=JWT generated."
    }
  },
  {
    "id": "bcrypt-hashing-or-encryption",
    "category": "Microservices",
    "question": "BCrypt — Hashing or Encryption?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "BCrypt is hashing — one-way, cannot be reversed, not encryption.",
      "explain": "Hashing — one-way function, same input always same output, cannot get original from hash\nEncryption — two-way, can decrypt back to original with key\nBCrypt adds random salt before hashing — same password gives different hash each time\nmatches() re-hashes the input with the stored salt and compares — no decryption needed\nNever encrypt passwords — always hash, if DB breached hashes are useless to attacker",
      "example": "\"BCrypt is hashing not encryption. Hashing is one-way — I cannot reverse a BCrypt hash to get the original password. BCrypt adds a random salt to the password before hashing so same password produces different hash each time. matches() works by extracting the salt from the stored hash, hashing the input with same salt, and comparing. This is why even if DB is breached, attackers cannot get real passwords.\"",
      "summary10s": "BCrypt=one-way hashing not encryption, random salt per hash, matches() re-hashes to compare, irreversible."
    }
  },
  {
    "id": "http-404-vs-500",
    "category": "Other",
    "question": "HTTP 404 vs 500",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "404 is client error — resource not found, 500 is server error — something crashed on server.",
      "explain": "404 Not Found — client requested a resource that does not exist, client's problem\n500 Internal Server Error — something unexpected failed on the server, server's problem\n404 examples — wrong URL, deleted resource, typo in endpoint path\n500 examples — unhandled exception, NullPointerException, DB connection failure\n4xx are client errors, 5xx are server errors — important distinction",
      "example": "\"404 means the client asked for something that does not exist — wrong URL or resource deleted. The server understood the request but has nothing to return. 500 means the server understood the request but something went wrong internally — unhandled exception, database down, out of memory. 404 is client mistake, 500 is server problem. In production I monitor 500 errors closely — each one means something broke on my end.\"",
      "summary10s": "404=resource not found client error, 500=server crashed internal error, 4xx=client fault 5xx=server fault."
    }
  },
  {
    "id": "json-parsing-issues-in-projects",
    "category": "Other",
    "question": "JSON Parsing Issues in Projects",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Common JSON issues — field name mismatch, date format, null values, type mismatch.",
      "explain": "Field name mismatch — JSON uses snake_case, Java uses camelCase, use @JsonProperty\nDate format — JSON sends string, Java expects specific format, use @JsonFormat\nUnknown fields — JSON has extra fields Java object does not, use @JsonIgnoreProperties\nNull values — missing field in JSON causes null, use @JsonInclude or Optional handling\nType mismatch — JSON number comes as string, configure ObjectMapper or use @JsonDeserialize",
      "example": "\"Most common JSON parsing issue I faced was field name mismatch — external API sent user_name but my DTO had userName. Fixed with @JsonProperty on the field. Date parsing was another issue — API sent dates as strings in different formats. I used @JsonFormat with the exact pattern. For APIs sending extra unknown fields I added @JsonIgnoreProperties to prevent deserialization failures.\"",
      "summary10s": "@JsonProperty for name mismatch, @JsonFormat for dates, @JsonIgnoreProperties for extra fields, handle nulls defensively."
    }
  },
  {
    "id": "json-structure-issues",
    "category": "Other",
    "question": "JSON Structure Issues",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Nested structure, array vs object mismatch, wrapped responses need custom deserialization.",
      "explain": "Nested response — API returns data wrapped in response object, use wrapper DTO or @JsonPath\nArray vs object — API sometimes returns single object sometimes array for same field\nDynamic fields — API returns different keys based on condition, use Map or @JsonAnySetter\nDeeply nested — use nested DTO classes matching the structure exactly\nGeneric wrapper — create ApiResponse of T with data field of generic type",
      "example": "\"Common structure issue I faced was API returning response wrapped in a data key — response was object with status and data fields where data contained actual content. I created a wrapper DTO ApiResponse of T with a data field of type T. Jackson deserializes the wrapper, I get the actual content from data field. Another issue was inconsistent structure — sometimes field was object sometimes array. I used @JsonDeserialize with custom deserializer to handle both cases.\"",
      "summary10s": "Wrapper DTO for nested responses, custom deserializer for inconsistent structures, Map for dynamic keys."
    }
  },
  {
    "id": "what-is-spring-data-jpa",
    "category": "Spring Boot",
    "question": "What is Spring Data JPA?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Spring Data JPA is a Spring module that makes database operations very easy. It sits on top of JPA and removes boilerplate code. We can write simple repository interfaces, and Spring automatically creates the queries for us. This helps us focus on business logic instead of writing database code.",
      "explain": "",
      "example": "",
      "summary10s": ""
    }
  },
  {
    "id": "explain-features-of-spring-data-jpa",
    "category": "Spring Boot",
    "question": "Explain features of Spring Data JPA?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Spring Data JPA provides several useful features. It gives built-in CRUD operations, supports query creation using method names, and allows custom JPQL or native SQL when needed. It also offers pagination and sorting out of the box. Overall, it removes most boilerplate code and makes database work much simpler.",
      "explain": "",
      "example": "",
      "summary10s": ""
    }
  },
  {
    "id": "how-to-create-a-custom-repository-class-in-spring-jpa",
    "category": "Spring Boot",
    "question": "How to create a custom Repository class in Spring JPA?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "To create a custom repository in Spring JPA, we first extend JpaRepository in an interface. Then we add our own custom methods, and Spring automatically provides the implementation. If we need more advanced logic, we can create a separate custom interface and its implementation class and link them with the main repository.",
      "explain": "",
      "example": "",
      "summary10s": ""
    }
  },
  {
    "id": "difference-between-crudrepository-and-jparepository",
    "category": "Spring Boot",
    "question": "Difference between CrudRepository and JpaRepository",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "CrudRepository gives only basic CRUD operations like save, find, update, and delete. JpaRepository extends CrudRepository and adds extra JPA features like pagination, sorting, flushing, and batch operations. So, JpaRepository is more powerful and is preferred in most real applications.",
      "explain": "",
      "example": "",
      "summary10s": ""
    }
  },
  {
    "id": "write-a-custom-query-in-spring-jpa",
    "category": "Spring Boot",
    "question": "Write a custom query in Spring JPA",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "We can write custom queries in Spring JPA using the @Query annotation. It allows us to write JPQL or native SQL inside the repository method. We can also use @Param to pass method arguments into the query.",
      "explain": "",
      "example": "\"@Query(\\\"SELECT u FROM User u WHERE u.firstName = :firstName\\\") List<User> findByFirstName(@Param(\\\"firstName\\\") String firstName);\"",
      "summary10s": ""
    }
  },
  {
    "id": "what-is-the-purpose-of-the-save-method-in-crudrepository",
    "category": "Spring Boot",
    "question": "What is the purpose of the save() method in CrudRepository?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The save() method is used to insert or update an entity. If the record does not exist, it creates a new one. If the record already exists, it updates it based on the primary key. So save() works for both create and update operations automatically.",
      "explain": "",
      "example": "",
      "summary10s": ""
    }
  },
  {
    "id": "what-is-the-use-of-modifying-annotation",
    "category": "Spring Boot",
    "question": "What is the use of @Modifying annotation?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The @Modifying annotation is used when a query changes the data, like update or delete. It tells Spring Data JPA that this is not a select query but a write operation, so the changes must be executed and committed to the database.",
      "explain": "",
      "example": "",
      "summary10s": ""
    }
  },
  {
    "id": "difference-between-findbyid-and-getone",
    "category": "Spring Boot",
    "question": "Difference between findById() and getOne()",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "findById() hits the database immediately and returns an Optional, so it safely handles missing records. getOne() does not fetch the data immediately; it returns a proxy and loads the data lazily. If the entity does not exist, getOne() throws an EntityNotFoundException.",
      "explain": "",
      "example": "",
      "summary10s": ""
    }
  },
  {
    "id": "use-of-temporal-annotation",
    "category": "Spring Boot",
    "question": "Use of @Temporal annotation",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The @Temporal annotation is used to tell JPA how to store a Date or Calendar field in the database. It specifies whether the field should be saved as only DATE, only TIME, or full TIMESTAMP. This helps JPA map Java date types correctly to SQL date types.",
      "explain": "",
      "example": "",
      "summary10s": ""
    }
  },
  {
    "id": "write-a-query-method-for-sorting-in-spring-data-jpa",
    "category": "Spring Boot",
    "question": "Write a query method for sorting in Spring Data JPA",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "In Spring Data JPA, we can sort results by adding OrderBy and the field name in the method. Then we specify Asc or Desc to define the sorting direction, and Spring generates the query automatically.",
      "explain": "",
      "example": "\"List<User> findByOrderByLastNameAsc();\"",
      "summary10s": ""
    }
  },
  {
    "id": "explain-transactional-annotation-in-spring",
    "category": "Spring Boot",
    "question": "Explain @Transactional annotation in Spring",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The @Transactional annotation makes a method run inside a transaction. It treats multiple database operations as one unit, so either all succeed or all fail. If an exception occurs, the transaction is rolled back and the changes are not saved. This helps maintain data consistency.",
      "explain": "",
      "example": "",
      "summary10s": ""
    }
  },
  {
    "id": "what-is-the-difference-between-fetchtype-eager-and-fetchtype-lazy",
    "category": "Spring Boot",
    "question": "What is the difference between FetchType.Eager and FetchType.Lazy?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Eager fetch loads the related data immediately along with the main entity, which can cause unnecessary data loading. Lazy fetch loads the related data only when it is actually needed, which improves performance. So eager means load now, lazy means load later.",
      "explain": "",
      "example": "",
      "summary10s": ""
    }
  },
  {
    "id": "use-of-id-annotation",
    "category": "Spring Boot",
    "question": "Use of @Id annotation",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The @Id annotation marks the primary key of an entity. It tells JPA which field is the unique identifier, so the framework can track, save, update, and manage the entity correctly.",
      "explain": "",
      "example": "",
      "summary10s": ""
    }
  },
  {
    "id": "how-will-you-create-a-composite-primary-key-in-spring-jpa",
    "category": "Spring Boot",
    "question": "How will you create a composite primary key in Spring JPA.",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "To create a composite primary key in Spring JPA, I create a separate class marked with @Embeddable that contains the key fields. Then in the entity, I use @EmbeddedId to use that class as the primary key. This lets JPA treat multiple fields as a single primary key.",
      "explain": "",
      "example": "",
      "summary10s": ""
    }
  },
  {
    "id": "what-is-the-use-of-enablejparepositories-method",
    "category": "Spring Boot",
    "question": "What is the use of @EnableJpaRepositories method?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The @EnableJpaRepositories annotation activates Spring Data JPA in the application. It tells Spring where to scan for repository interfaces and sets up the required JPA components so that repository methods work automatically.",
      "explain": "",
      "example": "",
      "summary10s": ""
    }
  },
  {
    "id": "what-are-the-rules-to-follow-to-declare-custom-methods-in-repository",
    "category": "Spring Boot",
    "question": "What are the rules to follow to declare custom methods in Repository.",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "To declare custom methods in a repository, we follow Spring Data JPA’s naming conventions. The method should start with prefixes like findBy, deleteBy, or countBy, and then include the entity field names with keywords like And, Or, or OrderBy. When the naming rule is correct, Spring automatically generates the query, so no manual query writing is needed.",
      "explain": "",
      "example": "",
      "summary10s": ""
    }
  },
  {
    "id": "explain-querybyexample-in-spring-data-jpa",
    "category": "Spring Boot",
    "question": "Explain QueryByExample in spring data jpa.",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Query By Example lets us build dynamic queries without writing SQL. We create an example object with the fields we want to match, and Spring Data JPA automatically generates the query using the non-null fields. It’s useful for flexible searches where conditions change at runtime.",
      "explain": "",
      "example": "",
      "summary10s": ""
    }
  },
  {
    "id": "what-is-pagination-and-how-to-implement-pagination-in-spring-data",
    "category": "Spring Boot",
    "question": "What is pagination and how to implement pagination in spring data?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Pagination means breaking large data into smaller pages so the application loads faster. In Spring Data, we implement it using Pageable and PageRequest. We pass Pageable to the repository method, and Spring automatically returns a Page object with the required page, size, and sorting. This makes handling large datasets efficient and simple.",
      "explain": "",
      "example": "",
      "summary10s": ""
    }
  },
  {
    "id": "explain-few-crudrepository-methods",
    "category": "Spring Boot",
    "question": "Explain few CrudRepository methods",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "CrudRepository provides basic database operations. save() is used to insert or update records, findById() retrieves a record by its primary key, deleteById() removes a specific record, findAll() returns all records, and count() gives the total number of records. These cover the core CRUD operations used in most applications.",
      "explain": "",
      "example": "",
      "summary10s": ""
    }
  },
  {
    "id": "difference-between-delete-and-deleteinbatch-methods",
    "category": "Spring Boot",
    "question": "Difference between delete() and deleteInBatch() methods",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "delete() removes one entity at a time, while deleteInBatch() deletes a whole collection of entities in one batch. deleteInBatch() is more efficient for multiple deletions because it reduces the number of database calls.",
      "explain": "",
      "example": "",
      "summary10s": ""
    }
  },
  {
    "id": "how-do-you-execute-a-complex-query-involving-multiple-tables-and-conditions-in-spring-jpa",
    "category": "Spring Boot",
    "question": "How do you execute a complex query involving multiple tables and conditions in Spring JPA?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "For complex queries, I use the @Query annotation on repository methods and write JPQL or native SQL. This lets me join multiple tables and apply custom conditions easily. It gives full control when the standard CRUD or method-name queries are not enough.",
      "explain": "",
      "example": "",
      "summary10s": ""
    }
  },
  {
    "id": "your-application-requires-inserting-thousands-of-records-at-once-how-do-you-optimize-this-batch-process-in-spring-jpa",
    "category": "Spring Boot",
    "question": "Your application requires inserting thousands of records at once. How do you optimize this batch process in Spring JPA?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "To optimize bulk inserts, I enable Hibernate batch processing by setting hibernate.jdbc.batch_size in application.properties. This allows Hibernate to group multiple inserts into batches instead of running each insert separately. It reduces database round trips and makes large insert operations much faster.",
      "explain": "",
      "example": "",
      "summary10s": ""
    }
  },
  {
    "id": "you-have-entities-with-bidirectional-relationships-how-do-you-avoid-issues-like-infinite-recursion",
    "category": "Spring Boot",
    "question": "You have entities with bidirectional relationships. How do you avoid issues like infinite recursion?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "I handle bidirectional relationships by setting the correct mappedBy on the owning side of the relationship. To avoid infinite recursion during JSON serialization, I use @JsonManagedReference and @JsonBackReference, or I use DTOs to control what gets returned. This keeps the relationship consistent and prevents serialization loops.",
      "explain": "",
      "example": "",
      "summary10s": ""
    }
  },
  {
    "id": "how-do-you-handle-schema-migration-in-a-spring-jpa-project-when-the-schema-changes",
    "category": "Spring Boot",
    "question": "How do you handle schema migration in a Spring JPA project when the schema changes?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "I use migration tools like Flyway or Liquibase to manage schema changes. These tools run versioned SQL scripts during application startup, so every schema update is tracked and applied automatically. This keeps the database in sync with new business requirements and ensures safe, consistent migrations across all environments.",
      "explain": "",
      "example": "",
      "summary10s": ""
    }
  },
  {
    "id": "you-are-experiencing-performance-issues-with-frequently-accessed-data-how-do-you-implement-caching-in-spring-jpa",
    "category": "Spring Boot",
    "question": "You are experiencing performance issues with frequently accessed data. How do you implement caching in Spring JPA?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "I use Spring’s Cache abstraction with a cache provider like Redis or EhCache. By adding @Cacheable to frequently accessed methods, the results are stored in the cache instead of hitting the database each time. This reduces repeated queries and significantly improves performance.",
      "explain": "",
      "example": "",
      "summary10s": ""
    }
  },
  {
    "id": "what-do-you-know-about-hibernate",
    "category": "Spring Boot",
    "question": "What do you know about Hibernate?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "",
      "explain": "",
      "example": "\"Hibernate is a popular ORM framework that maps Java objects to database tables. It removes the need for writing SQL for most operations and lets us work with the database using objects. It also manages relationships, caching, lazy loading, and transactions, making database work much easier and cleaner.\"",
      "summary10s": ""
    }
  },
  {
    "id": "explain-each-annotation-in-a-jpa-entity",
    "category": "Spring Boot",
    "question": "Explain each annotation in a JPA entity",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "",
      "explain": "",
      "example": "\"@Entity marks the class as a JPA entity. @Id identifies the primary key. @GeneratedValue tells JPA to auto-generate the ID. @ManyToOne defines a relationship where many child records link to one parent. Each annotation helps JPA map the class properly to the database.\"",
      "summary10s": ""
    }
  },
  {
    "id": "mapping-structure",
    "category": "Spring Boot",
    "question": "Mapping structure",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "",
      "explain": "",
      "example": "\"The entity has relationships like @ManyToOne or @OneToMany. The owning side holds the foreign key, and the mappedBy side defines the relationship. This structure tells JPA how entities connect and how joins should be handled.\"",
      "summary10s": ""
    }
  },
  {
    "id": "copy-constructor-logic",
    "category": "Java Coding",
    "question": "Copy constructor logic",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "",
      "explain": "",
      "example": "\"A copy constructor creates a new object by copying values from another entity. This is useful for protecting the original entity or sending safe copies to the UI without exposing internal fields.\"",
      "summary10s": ""
    }
  },
  {
    "id": "caching-strategy",
    "category": "Spring Boot",
    "question": "Caching strategy",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "",
      "explain": "",
      "example": "\"The caching strategy controls how JPA stores entities in memory to avoid repeated database hits. For example, READ_ONLY or NONSTRICT_READ_WRITE improves performance by reducing queries. The right strategy depends on how often data changes.\"",
      "summary10s": ""
    }
  },
  {
    "id": "spring-data-jpa-main-interfaces",
    "category": "Spring Boot",
    "question": "Spring Data JPA main interfaces",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "",
      "explain": "",
      "example": "\"The main Spring Data JPA interfaces are CrudRepository, PagingAndSortingRepository, and JpaRepository. CrudRepository provides basic CRUD operations, PagingAndSortingRepository adds pagination and sorting, and JpaRepository extends both and adds JPA-specific features like batch operations and flushing. In real projects, JpaRepository is used most of the time.\"",
      "summary10s": ""
    }
  },
  {
    "id": "jpa-hibernet",
    "category": "Spring Boot",
    "question": "JPA/HIBERNET?",
    "frequency": 2,
    "companies": [],
    "variations": [
      "What is JPA,Spring Data JPA,Hibernet?"
    ],
    "answerSEE": {
      "simple": "JPA does not perform database operations itself. It only defines annotations and APIs. Hibernate is one of the most popular implementations of JPA which reads those annotations and handles the actual persistence logic with the database.",
      "explain": "",
      "example": "",
      "summary10s": ""
    }
  },
  {
    "id": "explain-jpa-hibernate-and-spring-data-jpa",
    "category": "Spring Boot",
    "question": "Explain JPA, Hibernate, and Spring Data JPA",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "JPA is a rule book, Hibernate is a tool that follows those rules, Spring Data JPA makes using Hibernate very easy.",
      "explain": "JPA (Java Persistence API) is just a specification. It tells how Java objects should be mapped to database tables, but it does not do the work itself. Hibernate is an implementation of JPA. It actually talks to the database and performs operations like insert, update, delete, and fetch. Spring Data JPA sits on top of JPA and Hibernate. It removes boilerplate code by providing ready-made repository methods like save(), findById(), and findAll().",
      "example": "\"I create an entity using JPA annotations like @Entity. Hibernate converts that entity into SQL and talks to the database. Spring Data JPA lets me write just a repository interface instead of SQL queries.\"",
      "summary10s": ""
    }
  },
  {
    "id": "jpa-custom-query",
    "category": "Spring Boot",
    "question": "JPA Custom Query",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Custom query means writing our own SQL or JPQL instead of relying on automatic JPA queries.",
      "explain": "Used when default JPA methods are not enough. Can write JPQL or native SQL queries. Defined using @Query annotation. Gives more control over complex queries.",
      "example": "\"In JPA, custom queries are used when the built-in repository methods are not enough. We write JPQL or native SQL queries using the @Query annotation. This allows us to handle complex joins or filtering conditions. It gives more control compared to derived query methods.\"",
      "summary10s": "Custom query = write JPQL/SQL manually using @Query."
    }
  },
  {
    "id": "jpa-inbuilt-derived-query-methods",
    "category": "Spring Boot",
    "question": "JPA Inbuilt (Derived Query Methods)",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Inbuilt queries are automatically generated by Spring Data JPA based on method names.",
      "explain": "No need to write SQL. Method name defines the query logic. Spring converts method name → SQL query. Useful for simple queries.",
      "example": "\"Spring Data JPA provides built-in or derived queries where the query is automatically generated from the method name. For example, a method like findByEmail will automatically generate the SQL query. This reduces boilerplate code for simple database operations.\"",
      "summary10s": "Inbuilt query = method name automatically converted to SQL."
    }
  },
  {
    "id": "query-annotation",
    "category": "Spring Boot",
    "question": "@Query Annotation",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "@Query allows us to write custom JPQL or native SQL queries inside the repository.",
      "explain": "Used for complex queries. Supports JPQL and native SQL. Allows parameters using :name. Provides more flexibility than derived queries.",
      "example": "\"The @Query annotation in Spring Data JPA allows us to define custom queries directly in the repository interface. We can write JPQL or native SQL queries and pass parameters dynamically. It is mainly used when derived query methods are not sufficient.\"",
      "summary10s": "@Query = write custom JPQL or SQL inside repository."
    }
  },
  {
    "id": "jpa-internal-working-entitymanager-orm",
    "category": "Spring Boot",
    "question": "JPA – Internal Working (EntityManager, ORM)",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "JPA works by mapping Java objects to database tables and managing them using EntityManager.",
      "explain": "JPA uses ORM (Object Relational Mapping) to map class → table. EntityManager manages entity lifecycle (persist, update, delete). It uses a persistence context (cache) to track objects. Converts operations into SQL queries using provider like Hibernate.",
      "example": "\"JPA internally works using ORM, where Java classes are mapped to database tables. The EntityManager is responsible for managing the lifecycle of entities like persist, update, and delete. It maintains a persistence context to track changes, and based on that it generates SQL queries using providers like Hibernate. This abstraction helps us work with objects instead of writing SQL manually.\"",
      "summary10s": "JPA = EntityManager + ORM → converts objects into SQL and manages lifecycle automatically."
    }
  }
];
;
;
;
;
;
;
;
;
;

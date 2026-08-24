export type QuestionCategory = 'Java' | 'Spring Boot' | 'Microservices' | 'Angular' | 'JavaScript' | 'SQL' | 'Java Coding' | 'JS Coding' | 'System Design' | 'DevOps' | 'Other';

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
    "id": "java-equals-hashcode",
    "category": "Java",
    "question": "Why do we need to override equals() and hashCode() together?",
    "frequency": 11,
    "companies": [
      "Amazon",
      "Walmart",
      "Morgan Stanley"
    ],
    "variations": [
      "What happens if you only override equals() in HashMap?",
      "equals() and hashCode()",
      "Why must \"equals()\" and \"hashCode()\" always follow a strict contract?",
      "How can \"HashSet\" fail to detect duplicates if that contract is broken?"
    ],
    "answerSEE": {
      "simple": "HashMap uses hashCode() to find the correct bucket, and equals() to find the exact object in that bucket. Both must be consistent.",
      "explain": "In simple terms, equal objects MUST have equal hashCodes. If you only override equals(), two equal objects might get different hashCodes and land in different buckets. If you only override hashCode(), they land in the same bucket but equals() will say they are different objects.",
      "example": "\"hashCode() decides which bucket an object goes into, and equals() confirms if it's truly the same object within that bucket. If I only override equals(), a HashSet would treat equal objects as distinct, and HashMap.get() would fail to find an existing key. That's why we always override both together.\"",
      "summary10s": "Override only one → broken lookups or duplicates. Always override both together."
    }
  },
  {
    "id": "spring-transactional-fails",
    "category": "Spring Boot",
    "question": "In what scenarios does the @Transactional annotation fail to work?",
    "frequency": 10,
    "companies": [
      "EPAM",
      "Capgemini"
    ],
    "variations": [
      "Why is my @Transactional not rolling back?",
      "Why can @Transactional fail during self-invocation?",
      "Why can \"@Transactional\" fail during self-invocation?"
    ],
    "answerSEE": {
      "simple": "@Transactional relies on Spring AOP proxies. It fails if the proxy is bypassed (like self-invocation) or if a checked exception is thrown.",
      "explain": "If you call a @Transactional method from another method inside the exact same class, it bypasses the Spring proxy completely. Also, by default, Spring only rolls back for RuntimeExceptions (unchecked), not for Checked exceptions.",
      "example": "\"The most common reason is self-invocation. If I call a @Transactional method from within the same class, no transaction is created. It also won't work if the method isn't public. Finally, checked exceptions silently commit unless I explicitly add rollbackFor = Exception.class.\"",
      "summary10s": "Self-invocation bypasses the proxy. Checked exceptions don't auto-rollback by default."
    }
  },
  {
    "id": "map-vs-flatmap",
    "category": "Java",
    "question": "map() vs flatMap()?",
    "frequency": 9,
    "companies": [
      "Deloitte",
      "EPAM"
    ],
    "variations": [
      "map() vs flatMap()",
      "map vs flatMap in Streams",
      "Explain map() vs flatMap() with a real-world example.",
      "map vs flatMap",
      "Streams vs traditional loops — when is a traditional loop actually the better choice?"
    ],
    "answerSEE": {
      "simple": "map transforms each element one to one, flatMap transforms and flattens nested structures.",
      "explain": "map — each element becomes one new element, Stream of Stream remains nested\nflatMap — each element becomes a stream, all flattened into one single stream\nUse flatMap when each element produces a list or optional\nExample — list of orders each with list of items, flatMap gives all items in one stream",
      "example": "\"map is one-to-one transformation. If each element maps to a List, map gives Stream of Lists which is hard to work with. flatMap flattens that — each element maps to a stream and all streams merge into one. I use flatMap when working with nested collections like getting all order items from a list of orders.\"",
      "summary10s": "map=one-to-one, flatMap=one-to-many then flatten into single stream."
    }
  },
  {
    "id": "memory-leak-in-java",
    "category": "Java",
    "question": "Memory Leak in Java",
    "frequency": 9,
    "companies": [
      "EPAM"
    ],
    "variations": [
      "Why can memory keep increasing even after GC runs?",
      "How would you identify a memory leak in a Java application?",
      "Why can an object remain in memory even when you think it's no longer needed?",
      "How would you debug a Java application that suddenly starts consuming 90% memory?",
      "What would you check first if a Java application suddenly starts throwing OutOfMemoryError?",
      "What would you do if you found a memory leak in a Spring Boot application?",
      "How would you identify the root cause of the memory leak?"
    ],
    "answerSEE": {
      "simple": "Objects that are no longer needed but still referenced — GC cannot collect them, heap grows over time.",
      "explain": "Static collections growing without bound — cache without eviction policy\nThreadLocal not removed in thread pool — previous request's data held indefinitely\nEvent listeners or callbacks not unregistered — listener holds reference to object\nInner class holding implicit reference to outer class — outer class cannot be collected\nUnclosed resources — connections, streams held in open state",
      "example": "\"Java memory leaks happen when objects are still referenced but no longer needed. Classic example is a static HashMap used as cache — if I keep adding and never remove, it grows until OOM. ThreadLocal in thread pool is dangerous — threads are reused, old ThreadLocal value from previous request accumulates. I detect leaks with heap dump analysis in Eclipse MAT — look for objects with unexpectedly high retention.\"",
      "summary10s": "Still referenced but not needed — static cache no eviction, ThreadLocal not removed, listeners not unregistered."
    }
  },
  {
    "id": "system-design-put-vs-patch",
    "category": "System Design",
    "question": "Difference between PUT and PATCH? How to make PATCH idempotent?",
    "frequency": 8,
    "companies": [
      "Atlassian",
      "Microsoft",
      "Flipkart"
    ],
    "variations": [
      "Are all REST methods idempotent?",
      "PUT vs PATCH"
    ],
    "answerSEE": {
      "simple": "PUT replaces the entire resource and is always idempotent. PATCH updates partial fields and is not inherently idempotent.",
      "explain": "Sending the same PUT request multiple times results in the same final state. PATCH is only idempotent if you set absolute values. If a PATCH request says \"increment counter by 1\", running it twice gives a different result, breaking idempotency.",
      "example": "\"PUT is meant to replace the whole resource, so it is naturally idempotent. PATCH updates specific fields. To keep PATCH idempotent, I make sure the updates are absolute value assignments (like setting status to ACTIVE) rather than relative operations (like increment by 1).\"",
      "summary10s": "PUT = full replace (always idempotent). PATCH = partial update (idempotent only if setting absolute values)."
    }
  },
  {
    "id": "spring-transactions-propagation",
    "category": "Spring Boot",
    "question": "Explain Transaction Propagation and Isolation Levels in Spring.",
    "frequency": 8,
    "companies": [
      "Barclays",
      "HSBC"
    ],
    "variations": [
      "REQUIRED vs REQUIRES_NEW",
      "How do you prevent dirty reads?",
      "Serializable interface",
      "Transaction propagation"
    ],
    "answerSEE": {
      "simple": "Propagation decides how a method joins an existing transaction. Isolation controls how much one transaction sees of another's changes.",
      "explain": "Propagation REQUIRED (the default) joins an existing transaction, while REQUIRES_NEW suspends the current one and starts fresh. Isolation levels range from READ_COMMITTED (avoids dirty reads) to SERIALIZABLE (avoids all concurrency issues but is very slow).",
      "example": "\"Propagation defines transaction nesting. I use REQUIRES_NEW for things like audit logging that must save to the DB even if the main transaction rolls back. For isolation, READ_COMMITTED is the common default, while SERIALIZABLE is the strictest but hurts performance under high traffic.\"",
      "summary10s": "Propagation = transaction nesting behavior. Isolation = visibility between concurrent transactions."
    }
  },
  {
    "id": "what-is-executorservice",
    "category": "Java",
    "question": "What is ExecutorService?",
    "frequency": 8,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "Executor Framework",
      "ExecutorService and Thread Pools",
      "Thread Pool",
      "ExecutorService and its important methods",
      "What is ExecutorService?",
      "How would you execute multiple tasks using ExecutorService?",
      "Why should you use \"ExecutorService\" instead of creating threads manually?"
    ],
    "answerSEE": {
      "simple": "ExecutorService manages a pool of threads and assigns submitted tasks to them instead of creating a new thread each time.",
      "explain": "Maintains a thread pool + task queue, reuses threads\nDifferent types: FixedThreadPool, CachedThreadPool, ScheduledThreadPool\nAvoids the overhead of constant thread creation/destruction",
      "example": "\"ExecutorService manages a pool of worker threads and a queue of tasks internally. When I submit a task, an available thread picks it up, or it waits in the queue if all threads are busy. This avoids the overhead of creating a new thread for every task. I usually use Executors.newFixedThreadPool() for predictable workloads.\"",
      "summary10s": "Thread pool + task queue — reuses threads instead of creating new ones."
    }
  },
  {
    "id": "angular-dependency-injection",
    "category": "Angular",
    "question": "Dependency Injection",
    "frequency": 7,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "What is Dependency Injection in Angular? Explain the different provider scopes.",
      "Dependency Injection in Spring Boot",
      "Explain Dependency Injection and IoC.",
      "What are the different provider scopes in Angular?",
      "Explain singleton design pattern."
    ],
    "answerSEE": {
      "simple": "DI means Angular provides a class's dependencies instead of the class creating them itself.",
      "explain": "Angular's injector creates and provides service instances automatically\nReduces tight coupling, makes components easier to test\nInjected via constructor, using providedIn: 'root' for singleton services",
      "example": "\"Dependency Injection in Angular means I don't manually create service instances inside a component — Angular's injector provides them automatically through the constructor. This makes testing much easier since I can inject mock services. I typically use providedIn: 'root' so the service becomes a singleton, shared across the whole application.\"",
      "summary10s": "Angular injects dependencies via constructor — don't create with new."
    }
  },
  {
    "id": "java-interface-vs-abstract",
    "category": "Java",
    "question": "Difference between Interface and Abstract Class?",
    "frequency": 7,
    "companies": [
      "Deloitte",
      "Virtusa",
      "L&T",
      "Zensar Technologies"
    ],
    "variations": [
      "When to use Interface vs Abstract Class?",
      "Can abstract classes have constructors?",
      "Difference between Abstract Class and Interface",
      "Comparable interface"
    ],
    "answerSEE": {
      "simple": "An interface defines a pure contract with no state. An abstract class can have state and partial implementation.",
      "explain": "In simple terms, an interface is purely a contract (though Java 8 allows default/static methods) and supports multiple inheritance. An abstract class can have fields, constructors, and a mix of implemented and abstract methods, but you can only inherit one abstract class.",
      "example": "\"I use an interface when I want to define a contract that unrelated classes can implement. I use an abstract class when there's shared state or common logic that subclasses should inherit, like a base entity class with common fields. For example, Comparable is an interface (a capability), while a Vehicle might be an abstract class with common fields like speed and fuel.\"",
      "summary10s": "Interface = contract, multi-inheritance. Abstract class = shared state, single inheritance."
    }
  },
  {
    "id": "synchronized-vs-reentrantlock",
    "category": "Java",
    "question": "synchronized vs ReentrantLock?",
    "frequency": 7,
    "companies": [],
    "variations": [
      "synchronized vs Lock",
      "ReentrantLock and tryLock",
      "synchronized vs ReentrantLock",
      "Explain reentrantlock.",
      "What is ReentrantLock?",
      "\"synchronized\" vs \"volatile\" — when would you use each?"
    ],
    "answerSEE": {
      "simple": "synchronized is simple and automatic, ReentrantLock gives more control and flexibility.",
      "explain": "synchronized — auto releases on exit, no timeout, cannot interrupt waiting thread\nReentrantLock — must manually unlock in finally, supports tryLock with timeout, interruptible\nBoth provide mutual exclusion and visibility\nReentrantLock also supports fair ordering and multiple condition variables",
      "example": "\"synchronized is simpler — lock acquired on entry, released automatically on exit. ReentrantLock requires manual unlock in finally block but gives more power — tryLock with timeout prevents indefinite blocking, lock can be interrupted, and fair mode ensures waiting threads get lock in order. I use ReentrantLock when I need timeout or interruptible locking.\"",
      "summary10s": "synchronized=simple auto release, ReentrantLock=manual unlock but tryLock, timeout, interruptible."
    }
  },
  {
    "id": "what-is-completablefuture",
    "category": "Java",
    "question": "What is CompletableFuture?",
    "frequency": 7,
    "companies": [],
    "variations": [
      "CompletableFuture use cases",
      "CompletableFuture",
      "CompletableFuture Key Methods",
      "What is CompletableFuture, and why is it useful?",
      "How would you run multiple asynchronous operations using CompletableFuture?",
      "What specific problem does \"CompletableFuture\" solve in asynchronous programming?"
    ],
    "answerSEE": {
      "simple": "CompletableFuture runs async tasks and chains, combines, and handles results cleanly.",
      "explain": "supplyAsync — run task on background thread, returns CompletableFuture with result\nthenApply — transform result when available\nthenAccept — consume result, no return\nallOf — wait for all futures to complete\nexceptionally — handle error in chain",
      "example": "\"supplyAsync runs a task asynchronously and returns a CompletableFuture. thenApply transforms the result like map. thenAccept consumes it without returning. For parallel calls I use allOf to fire multiple futures simultaneously and wait for all. exceptionally is my error handler — if any stage fails it catches the exception and returns a fallback.\"",
      "summary10s": "supplyAsync=run async, thenApply=transform, allOf=wait all, exceptionally=handle error."
    }
  },
  {
    "id": "angular-onpush-change-detection",
    "category": "Angular",
    "question": "Default vs OnPush Change Detection",
    "frequency": 7,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "What is Change Detection in Angular? Explain OnPush strategy.",
      "How does ChangeDetectionStrategy.OnPush work?",
      "Why did you choose ChangeDetectionStrategy.OnPush? What changes did you make to ensure the UI refreshed reliably without affecting performance?",
      "If data in a dropdown changes while using OnPush, what exactly would you change in the code? Would you create a new reference or manually trigger change detection?",
      "Why is \"String\" immutable in Java, and how does it impact memory?"
    ],
    "answerSEE": {
      "simple": "Default checks the entire component tree on every event; OnPush only checks when an Input reference changes or an event fires within it.",
      "explain": "Default — Angular checks all components on every browser event, timer, or async operation (can be expensive)\nOnPush — only re-checks when @Input() reference changes, an event originates inside the component, or an Observable (via async pipe) emits\nOnPush requires immutable data patterns (new object reference, not mutation) to trigger detection",
      "example": "\"Default change detection checks the entire component tree on every possible event, which can get expensive in large apps. OnPush only triggers a check when the Input reference actually changes, an event happens inside that component, or an observable through the async pipe emits. To use OnPush correctly, I make sure to treat data immutably — passing a new object reference instead of mutating the existing one — otherwise Angular won't detect the change.\"",
      "summary10s": "Default = checks everything, OnPush = checks only on Input reference change/local event."
    }
  },
  {
    "id": "what-is-a-functional-interface",
    "category": "Java",
    "question": "What is a Functional Interface?",
    "frequency": 7,
    "companies": [
      "EPAM"
    ],
    "variations": [
      "What is a Functional Interface? Can it have default and static methods?",
      "What is a functional interface",
      "Can it have default and static methods",
      "Common examples (Runnable, Comparator, Callable)",
      "\"Runnable\" vs \"Callable\" — when would you choose each?"
    ],
    "answerSEE": {
      "simple": "An interface that has exactly one abstract method. They are the basis for Lambda expressions.",
      "explain": "It can have multiple default or static methods, but only one abstract method. The @FunctionalInterface annotation is optional but recommended to prevent others from accidentally adding a second abstract method.",
      "example": "The standard `Runnable` or `Comparator` interfaces are functional interfaces. If I want to pass a block of code as a parameter to a method, the method must accept a Functional Interface. I can then pass a lambda expression like `(a, b) -> a.compareTo(b)`.",
      "summary10s": "Interface with exactly one abstract method. Used as target types for lambda expressions."
    }
  },
  {
    "id": "spring-kafka-exactly-once",
    "category": "Microservices",
    "question": "How do you achieve exactly-once payment processing with Kafka and Spring Boot?",
    "frequency": 6,
    "companies": [
      "Paytm",
      "PhonePe",
      "Razorpay",
      "EPAM"
    ],
    "variations": [
      "How to handle duplicate messages in Kafka?",
      "How would you prevent duplicate processing of Kafka messages?"
    ],
    "answerSEE": {
      "simple": "True exactly-once is hard. We design for \"effectively-once\" using an idempotent producer and a unique transaction ID on the consumer side.",
      "explain": "On the producer side, we enable Kafka's transactional API to avoid duplicate publishes. On the consumer side, we store a unique idempotency key (like a transaction ID) in the database with a UNIQUE constraint to prevent double processing.",
      "example": "\"Since true exactly-once is very hard end-to-end, I design for effectively-once. On the producer, I enable the idempotent producer flag. On the consumer, I store a unique transaction ID in the DB. Even if a message is redelivered, the duplicate DB insert fails safely. I usually combine this with the Outbox pattern.\"",
      "summary10s": "Idempotent producer + unique transaction ID DB check + Outbox pattern = effectively-once."
    }
  },
  {
    "id": "what-is-a-deadlock",
    "category": "Java",
    "question": "What is a deadlock?",
    "frequency": 6,
    "companies": [],
    "variations": [
      "Deadlock",
      "Deadlocks, Livelocks, Starvation",
      "What is deadlock, and how can you prevent it?",
      "How would you find and prevent a deadlock?",
      "How would you identify and resolve a deadlock in a running Java application?"
    ],
    "answerSEE": {
      "simple": "A deadlock happens when two or more threads wait forever for locks held by each other.",
      "explain": "Thread A holds Lock 1, waits for Lock 2; Thread B holds Lock 2, waits for Lock 1\nNeither can proceed — a permanent cyclic wait\nPrevented by always acquiring locks in a consistent order, or using tryLock() with timeout",
      "example": "\"A deadlock happens when two threads each hold a lock the other needs, and both wait forever, forming a cycle. I avoid this by always acquiring multiple locks in the same consistent order across the whole codebase, or by using tryLock() with a timeout so a thread can back off instead of waiting indefinitely.\"",
      "summary10s": "Cyclic lock-wait between threads — avoid with consistent lock ordering or tryLock()."
    }
  },
  {
    "id": "how-do-you-secure-rest-apis",
    "category": "Spring Boot",
    "question": "How do you secure REST APIs?",
    "frequency": 5,
    "companies": [
      "Accenture"
    ],
    "variations": [
      "What type of security are you using in your current project?",
      "How to secure REST APIs?",
      "Spring Security Implementation in Projects",
      "How do you secure REST APIs in Spring Boot?"
    ],
    "answerSEE": {
      "simple": "Configure SecurityFilterChain, add JWT filter, define public and protected routes.",
      "explain": "SecurityFilterChain bean — configure which routes are public and which need auth\nAdd custom JWT filter before UsernamePasswordAuthenticationFilter\nJWT filter validates token, sets Authentication in SecurityContext\nUserDetailsService loads user details for validation",
      "example": "\"I configure a SecurityFilterChain bean where I define public endpoints like login and protected ones requiring authentication. I add a custom JWT filter that intercepts every request, extracts and validates the token, and sets the authentication in SecurityContext. If token is invalid the filter rejects the request before it reaches any controller.\"",
      "summary10s": "SecurityFilterChain defines routes, JWT filter validates token, sets SecurityContext."
    }
  },
  {
    "id": "volatile-vs-atomic-classes",
    "category": "Java",
    "question": "volatile vs Atomic classes?",
    "frequency": 5,
    "companies": [],
    "variations": [
      "Atomic Classes",
      "volatile vs Atomic Classes",
      "What is a race condition?",
      "Volatile vs Atomic"
    ],
    "answerSEE": {
      "simple": "volatile gives visibility, Atomic gives visibility plus atomicity for compound operations.",
      "explain": "volatile — read and write individually atomic, but increment is read-modify-write, not atomic\nAtomicInteger — incrementAndGet is single atomic operation using CPU compare-and-swap\nAtomic classes are faster than synchronized for single variable operations\nUse volatile for flags, Atomic for counters and state that needs atomic updates",
      "example": "\"volatile ensures visibility but does not help with compound operations. Two threads both reading 5 and incrementing to 6 is a race condition even with volatile. AtomicInteger uses hardware compare-and-swap to make incrementAndGet a single unbreakable operation. For anything more than a simple boolean flag I use Atomic classes.\"",
      "summary10s": "volatile=visibility only, Atomic=visibility plus atomic compound operations via CAS."
    }
  },
  {
    "id": "hashmap-vs-concurrenthashmap",
    "category": "Java",
    "question": "HashMap vs ConcurrentHashMap",
    "frequency": 5,
    "companies": [],
    "variations": [
      "When would you choose ConcurrentHashMap over HashMap?",
      "HashMap vs ConcurrentHashMap",
      "\"HashMap\" vs \"ConcurrentHashMap\" — what's the real difference in how they handle locks?"
    ],
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
    "frequency": 5,
    "companies": [],
    "variations": [
      "ArrayList vs LinkedList",
      "What is LinkedList",
      "\"ArrayList\" vs \"LinkedList\" — when is one genuinely better than the other?",
      "What is the difference between an Array and a Linked List?"
    ],
    "answerSEE": {
      "simple": "ArrayList is backed by a dynamic array; LinkedList is backed by a doubly linked list.",
      "explain": "ArrayList — fast random access (O(1)), slow insert/delete in middle (O(n))\nLinkedList — fast insert/delete (O(1)) once position is known, slow random access (O(n))\nArrayList is used more often in practice; LinkedList mainly when frequent insert/delete needed\n\n       ArrayList → Fast random access (get()), slower insertion/deletion in the middle.\n       LinkedList → Fast insertion/deletion, slower random access.\n       ArrayList uses less memory; LinkedList uses more memory because each node stores previous and next references.\n     \n  Use ArrayList for frequent reads and LinkedList for frequent insertions/deletions.",
      "example": "\"ArrayList is backed by a dynamic array, so accessing an element by index is very fast, but inserting or deleting in the middle requires shifting elements. LinkedList is backed by nodes with pointers, so insertion and deletion are faster once you're at the right position, but random access is slower since it has to traverse. In practice, I use ArrayList most of the time unless there's heavy insertion/deletion.\"",
      "summary10s": "ArrayList = fast access, LinkedList = fast insert/delete, slow access."
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
    "id": "explain-the-bean-lifecycle",
    "category": "Spring Boot",
    "question": "Explain the Bean Lifecycle.",
    "frequency": 4,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "What is the complete lifecycle of a Spring bean?",
      "Bean Lifecycle",
      "Spring Bean Lifecycle"
    ],
    "answerSEE": {
      "simple": "Instantiate, inject dependencies, PostConstruct, use, PreDestroy, destroy.",
      "explain": "Spring creates bean instance via constructor\nInjects all dependencies\nCalls @PostConstruct for initialization logic\nBean used throughout application\nOn shutdown @PreDestroy called for cleanup",
      "example": "\"Bean lifecycle is straightforward. Spring instantiates the class, injects dependencies, then calls @PostConstruct where I put initialization code like loading config or opening connections. Bean is then in use. When Spring context closes, @PreDestroy fires for cleanup like closing resources. This gives me hooks at both ends of the lifecycle.\"",
      "summary10s": "Create → Inject → PostConstruct → Use → PreDestroy → Destroy."
    }
  },
  {
    "id": "primary-vs-qualifier",
    "category": "Spring Boot",
    "question": "@Primary vs @Qualifier?",
    "frequency": 4,
    "companies": [],
    "variations": [
      "What happens when two beans of the same type are available?",
      "How do @Primary and @Qualifier resolve bean conflicts?",
      "@Primary vs @Qualifier"
    ],
    "answerSEE": {
      "simple": "@Primary sets default bean, @Qualifier explicitly names which bean to inject.",
      "explain": "When multiple beans of same type exist, Spring does not know which to inject\n@Primary on one bean — Spring uses it by default when no qualifier specified\n@Qualifier on injection point — explicitly names which bean to use\n@Qualifier overrides @Primary — more specific wins",
      "example": "\"If I have two DataSource beans, Spring gets confused which to inject. I mark one with @Primary to be the default choice. When a specific component needs the other DataSource, I use @Qualifier with the bean name at the injection point. @Qualifier always wins over @Primary — explicit beats default.\"",
      "summary10s": "@Primary=default when multiple beans, @Qualifier=explicit by name, Qualifier overrides Primary."
    }
  },
  {
    "id": "ioc-vs-dependency-injection",
    "category": "Spring Boot",
    "question": "IoC vs Dependency Injection?",
    "frequency": 4,
    "companies": [
      "Deloitte",
      "EPAM"
    ],
    "variations": [
      "IoC vs Dependency Injection",
      "IoC Container (Inversion of Control)",
      "How does Dependency Injection work internally in Spring?"
    ],
    "answerSEE": {
      "simple": "IoC is the principle, Dependency Injection is one way to implement it.",
      "explain": "IoC — control of object creation is inverted from developer to framework\nTraditional code — you create dependencies with new keyword\nIoC — framework creates and manages objects for you\nDependency Injection is IoC implementation — framework injects dependencies into your class",
      "example": "\"Using the new keyword is not wrong. IoC doesn't mean we completely stop creating objects manually. I still use new for simple objects like DTOs or helper classes. However, for core application components like services, repositories, and controllers, I rely on Spring's IoC container to create and manage them. So the control of important dependencies is still inverted to Spring, which means IoC is properly followed.\"",
      "summary10s": "IoC=principle of inverted control, DI=technique to implement IoC by injecting dependencies."
    }
  },
  {
    "id": "internal-working-of-hashmap",
    "category": "Java",
    "question": "Internal working of HashMap",
    "frequency": 4,
    "companies": [
      "Zensar Technologies"
    ],
    "variations": [
      "Why can HashMap become slow even with a good hash function?",
      "How does HashMap work internally?"
    ],
    "answerSEE": {
      "simple": "HashMap stores key-value pairs in buckets based on the key's hashcode, using a linked list or tree for collisions.",
      "explain": "hash(key) determines the bucket index\nCollisions handled via linked list; converts to Red-Black Tree if a bucket has 8+ entries (Java 8+)\nResizes (doubles capacity) when load factor threshold (default 0.75) is crossed",
      "example": "\"HashMap calculates a hash from the key to decide which bucket it goes into. If multiple keys collide into the same bucket, Java 8 uses a linked list, but converts it to a Red-Black Tree once that bucket has 8 or more entries, to keep lookups fast. It also resizes by doubling its capacity once the map exceeds the load factor, which is 0.75 by default.\"",
      "summary10s": "Hash → bucket, collisions via list→tree(8+), resizes at 0.75 load factor."
    }
  },
  {
    "id": "how-does-transactional-work-internally",
    "category": "Spring Boot",
    "question": "How does @Transactional work internally?",
    "frequency": 4,
    "companies": [
      "EPAM"
    ],
    "variations": [
      "How does @Transactional work?",
      "How @Transactional Works",
      "How does @Transactional work internally in Spring Boot?"
    ],
    "answerSEE": {
      "simple": "Spring creates a proxy that opens a transaction before method and commits or rolls back after.",
      "explain": "Spring wraps bean in proxy using AOP\nProxy opens DB transaction before method executes\nMethod runs, if success proxy commits\nIf RuntimeException thrown, proxy rolls back\nSelf-invocation bypasses proxy — transaction does not apply",
      "example": "\"@Transactional works through a Spring AOP proxy. When I call a transactional method, the proxy intercepts, opens a database transaction, runs my method, and commits on success or rolls back on RuntimeException. The critical thing I always remember is self-invocation — calling @Transactional method from same class bypasses proxy so transaction never starts.\"",
      "summary10s": "AOP proxy opens transaction, commit on success, rollback on exception, self-invocation bypasses proxy."
    }
  },
  {
    "id": "java-default-methods",
    "category": "Java",
    "question": "Why were default methods introduced in Java 8 interfaces?",
    "frequency": 4,
    "companies": [
      "TCS",
      "Infosys"
    ],
    "variations": [
      "Default methods vs Abstract Class",
      "Why can interfaces have default and static methods?"
    ],
    "answerSEE": {
      "simple": "Default methods were introduced so you can add new behavior to an interface without breaking existing implementations.",
      "explain": "Before Java 8, adding a method to an interface broke all classes implementing it. Default methods solve this by providing a fallback implementation. However, interfaces still cannot hold mutable instance state, unlike abstract classes.",
      "example": "\"I'd use a default method when I need to add new functionality to an existing interface without breaking all the classes that already implement it—like when forEach() was added to the Collection interface. If I need actual instance state or constructors, I would reach for an abstract class instead.\"",
      "summary10s": "Default method = extend interface safely. Abstract class = need state or constructors."
    }
  },
  {
    "id": "why-is-string-immutable-in-java",
    "category": "Java",
    "question": "Why is String Immutable in Java?",
    "frequency": 4,
    "companies": [],
    "variations": [
      "Why is \"String\" immutable in Java?",
      "String Pool, intern(), == vs equals()"
    ],
    "answerSEE": {
      "simple": "String objects cannot be changed after creation — any modification creates a new String object, never modifying the original.",
      "explain": "Security — String used for class loading, DB URLs, network connections — mutable String would be a security vulnerability\nString Pool — JVM reuses String literals safely because immutable objects can be shared without copy\nThread Safety — immutable objects need no synchronization, inherently thread-safe\nHashCode Caching — String caches its hashCode, works correctly only because value never changes\nHashMap key safety — String is the safest map key because hashCode never changes after put",
      "example": "\"String immutability serves four purposes. Security — if I pass a file path to a method, the method cannot secretly change the path after my security check. String pool efficiency — JVM reuses identical literals safely because two variables pointing to the same pooled String cannot affect each other through one changing it. Thread safety — multiple threads can read the same String simultaneously without locks. HashCode caching — String caches hashCode for fast HashMap lookups, valid only because the value never changes.\"",
      "summary10s": "String immutable for security, string pool sharing, thread safety, and hashCode caching — all four depend on value never changing."
    }
  },
  {
    "id": "spring-data-jpa-vs-jpa-vs-hibernate",
    "category": "Spring Boot",
    "question": "Spring Data JPA vs JPA vs Hibernate",
    "frequency": 4,
    "companies": [],
    "variations": [
      "JPA vs Hibernate.",
      "Spring Data JPA main interfaces",
      "How Spring/Hibernate generates SQL"
    ],
    "answerSEE": {
      "simple": "JPA is the specification, Hibernate is the implementation, Spring Data JPA removes boilerplate on top.",
      "explain": "JPA — standard specification, defines @Entity, @Id, EntityManager, JPQL — no actual code\nHibernate — implements JPA, does the actual SQL generation and execution via JDBC\nSpring Data JPA — built on JPA, provides Repository interfaces eliminating DAO boilerplate\nStack: Spring Data JPA → JPA → Hibernate → JDBC → Database",
      "example": "\"JPA is like a rulebook — it defines how Java objects should map to database tables but provides no implementation. Hibernate follows that rulebook and does the actual work — reads my annotations, generates SQL, manages caching. Spring Data JPA sits on top and removes boilerplate — I just declare an interface extending JpaRepository and get findById, findAll, save, delete for free. I code against JPA standard so theoretically I could swap Hibernate for EclipseLink without changing my application code.\"",
      "summary10s": "JPA=spec no code, Hibernate=implements JPA generates SQL, Spring Data JPA=zero-boilerplate Repository on top. Stack: SpringDataJPA→JPA→Hibernate→JDBC→DB."
    }
  },
  {
    "id": "java-interface-default-conflict",
    "category": "Java",
    "question": "What happens when a class implements two interfaces with conflicting default methods?",
    "frequency": 4,
    "companies": [],
    "variations": [
      "Can a class implement two interfaces that contain the same default method? How does Java resolve it?",
      "What if two interface have same method how will you will resolve this when a class implement both.",
      "Diamond problem caused by multiple inheritance ,how can we resolve it.",
      "What is the difference between method overloading and method overriding?"
    ],
    "answerSEE": {
      "simple": "The compiler throws an error, and you must explicitly resolve the conflict by overriding the method.",
      "explain": "If interfaces A and B both provide a default method doWork(), Java prevents the Diamond Problem by forcing the implementing class to override doWork(). Inside the overridden method, you can provide your own logic or explicitly call one of the interface methods using A.super.doWork().",
      "example": "\"If both Flyable and Swimmable have a default move() method, my Duck class won't compile until I override move(). Inside my move() method, I can decide to call Flyable.super.move() or write entirely new logic.\"",
      "summary10s": "Compiler error. You must override the method and optionally call SuperInterface.super.methodName()."
    }
  },
  {
    "id": "circuit-breaker",
    "category": "Microservices",
    "question": "Circuit Breaker",
    "frequency": 4,
    "companies": [
      "EPAM"
    ],
    "variations": [
      "Explain Circuit Breaker, Retry and Timeout patterns.",
      "How do you prevent cascading failures in microservices?",
      "How would you technically implement the Circuit Breaker pattern?"
    ],
    "answerSEE": {
      "simple": "Monitors failures, opens circuit after threshold, returns fallback — prevents cascade failure.",
      "explain": "Closed state — normal operation, requests pass through\nOpen state — failure threshold crossed, requests blocked, fallback returned immediately\nHalf-Open state — after cooldown, test request sent to check if service recovered\nIf test succeeds — circuit closes again. If fails — stays open\nResilience4j with @CircuitBreaker annotation",
      "example": "\"\"Circuit Breaker is like an electrical circuit breaker. Normally closed — requests flow through. When downstream service fails repeatedly and crosses failure rate threshold, circuit opens — all requests immediately return fallback without hitting the failing service. After cooldown period it \ngoes half-open and sends one test request. This prevents one slow service from blocking all threads and cascading failure to the entire system.\"\"",
      "summary10s": "Closed=normal, Open=block+fallback after threshold, Half-Open=test recovery, prevents cascade failure."
    }
  },
  {
    "id": "spring-oauth-basics",
    "category": "Spring Boot",
    "question": "OAuth basics and role-based access",
    "frequency": 4,
    "companies": [],
    "variations": [
      "Have you implemented security in your Spring Boot project?",
      "Where is the authentication token attached to the request?",
      "How are those tokens validated?"
    ],
    "answerSEE": {
      "simple": "OAuth is a protocol for authorization, allowing third-party apps to access data without exposing passwords, using access tokens.",
      "explain": "In Spring Security, you can act as a Resource Server that accepts JWTs issued by an Authorization Server (like Keycloak). Once the token is validated, Spring extracts the \"roles\" or \"scopes\" from the token and uses `@PreAuthorize(\"hasRole('ADMIN')\")` to restrict endpoint access.",
      "example": "\"In my project, the UI gets a JWT from Auth0. It sends the JWT in the Authorization header to my Spring Boot API. Spring Security intercepts it, validates the signature, and reads the claims. If the claims contain `role: admin`, my `@PreAuthorize` allows them into the delete endpoint.\"",
      "summary10s": "Auth server issues tokens. Spring validates token signatures and maps token claims to Roles for endpoint security."
    }
  },
  {
    "id": "how-does-the-spring-container-work",
    "category": "Spring Boot",
    "question": "How does the Spring Container work?",
    "frequency": 4,
    "companies": [],
    "variations": [
      "Internal Working of Spring Container",
      "Spring annotations: @Component, @Bean, @Qualifier, @Value",
      "What is the difference between @Component, @Bean, and @Configuration beyond simply “creating beans”?"
    ],
    "answerSEE": {
      "simple": "Spring scans classes, creates beans, injects dependencies, and manages their lifecycle.",
      "explain": "Reads configuration — annotations or XML\nCreates BeanDefinition for each bean\nInstantiates beans respecting dependencies order\nInjects dependencies via constructor or setter\nCalls PostConstruct, makes bean available, calls PreDestroy on shutdown",
      "example": "\"Spring Container starts by scanning all @Component annotated classes and creating BeanDefinition metadata. Then it instantiates beans in dependency order — dependency first, then dependent. After injection it calls @PostConstruct for initialization. ApplicationContext holds all beans ready for use. On shutdown @PreDestroy is called for cleanup.\"",
      "summary10s": "Scan classes, create BeanDefinitions, instantiate in order, inject, PostConstruct, ready."
    }
  },
  {
    "id": "java-jvm-metrics",
    "category": "Java",
    "question": "Your Java API suddenly becomes slow in production. What JVM-level metrics do you check first?",
    "frequency": 4,
    "companies": [],
    "variations": [
      "An API response time was previously around 10 ms but suddenly increased to 3 seconds. How would you troubleshoot it?",
      "What tools or metrics would you use for troubleshooting application performance?",
      "Your Spring Boot API suddenly goes from 200 ms to 5 seconds. What would you check first?"
    ],
    "answerSEE": {
      "simple": "Check GC pause times, Heap memory usage, and Thread states (Blocked/Waiting).",
      "explain": "If the API is slow, it is usually one of three things: 1. The JVM is constantly running Full GCs (\"Stop-the-world\" pauses) because the heap is 99% full. 2. Threads are deadlocked or blocked waiting for a database connection pool. 3. CPU is spiking due to infinite loops.",
      "example": "\"First, I look at Datadog/Prometheus for GC metrics. If time spent in GC is spiking, the app is starving for memory. Next, I pull a thread dump. If I see 200 threads in `BLOCKED` state waiting for a HikariCP database lock, I know the database is the bottleneck, not the JVM.\"",
      "summary10s": "1. GC Pause Times (Heap exhaustion). 2. Thread Dumps (Deadlocks/DB pool exhaustion)."
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
    "id": "what-is-optional-when-should-you-use-it",
    "category": "Java",
    "question": "What is Optional? When should you use it?",
    "frequency": 3,
    "companies": [
      "Accenture"
    ],
    "variations": [
      "What is the use of Optional?",
      "Optional Class"
    ],
    "answerSEE": {
      "simple": "Optional is a container that may or may not hold a value — eliminates NullPointerException.",
      "explain": "Wrap return value in Optional instead of returning null\nisPresent or isEmpty to check, get to retrieve value\norElse for default value, orElseThrow for exception\nmap and flatMap to transform value if present",
      "example": "\"Optional forces the caller to handle the case where value may be absent instead of getting a surprise NullPointerException. I use it as return type from service methods when result may not exist. I chain orElseThrow to throw a meaningful exception or orElse to return a default. I avoid Optional.get without checking — defeats the purpose.\"",
      "summary10s": "Optional=nullable wrapper, use orElse or orElseThrow, avoid get without check."
    }
  },
  {
    "id": "what-is-controlleradvice",
    "category": "Spring Boot",
    "question": "What is @ControllerAdvice?",
    "frequency": 3,
    "companies": [],
    "variations": [
      "Exception Handling and Controller Advisor"
    ],
    "answerSEE": {
      "simple": "Exception handling manages errors gracefully, ControllerAdvice centralizes it for all controllers.",
      "explain": "@ControllerAdvice — global exception handler class\n@ExceptionHandler inside it handles specific exception types\nReturns consistent error response with proper HTTP status\nNo try-catch needed in individual controllers",
      "example": "\"Instead of try-catch in every controller, I create one class with @ControllerAdvice. Inside it @ExceptionHandler methods each handle a specific exception type and return a structured error response with the right HTTP status code. This keeps controllers clean and ensures consistent error format across all APIs.\"",
      "summary10s": "@ControllerAdvice + @ExceptionHandler = central error handling, consistent response format."
    }
  },
  {
    "id": "what-is-the-liskov-substitution-principle",
    "category": "System Design",
    "question": "What is the Liskov Substitution Principle?",
    "frequency": 3,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "Liskov Substitution Principle",
      "Liskov Substitution Principle (LSP)"
    ],
    "answerSEE": {
      "simple": "Subclass should be usable wherever parent is used without breaking the program.",
      "explain": "If Bird is parent and Penguin extends Bird but cannot fly — LSP violated\nSubclass should not remove or weaken behavior of parent\nInheritance is needed even with LSP for code reuse and polymorphism\nLSP ensures the substitution is correct — not that inheritance is unnecessary",
      "example": "\"LSP says I should be able to replace a parent class with any subclass without breaking functionality. If I have a method accepting Animal, passing any subclass should work correctly. Inheritance is still needed for code reuse and polymorphism — LSP just guides how to do it correctly. Violating LSP means the subclass is not a true is-a relationship.\"",
      "summary10s": "Subclass replaces parent without breaking behavior. Inheritance for reuse, LSP for correctness."
    }
  },
  {
    "id": "what-is-volatile",
    "category": "Java",
    "question": "What is volatile?",
    "frequency": 3,
    "companies": [],
    "variations": [
      "volatile Keyword",
      "Volatile, Synchronized, and Atomic Variables"
    ],
    "answerSEE": {
      "simple": "volatile ensures all threads read variable from main memory not CPU cache.",
      "explain": "Without volatile threads cache variable — see stale values\nvolatile forces every read and write to main memory\nVisibility guarantee only — not atomicity\nUse for simple flags, not for counters — use Atomic for counters",
      "example": "\"volatile solves the visibility problem in multithreading. Each CPU core caches variables locally and threads can see stale values without volatile. Marking a variable volatile forces all reads and writes to go to main memory. But it does not make compound operations like increment atomic. For counters I use AtomicInteger.\"",
      "summary10s": "volatile=main memory visibility only, not atomic, use for flags not counters."
    }
  },
  {
    "id": "stream-vs-parallel-stream",
    "category": "Java",
    "question": "Stream vs Parallel Stream?",
    "frequency": 3,
    "companies": [],
    "variations": [
      "Why does using parallelStream() sometimes make performance worse?",
      "Stream vs Parallel Stream"
    ],
    "answerSEE": {
      "simple": "Stream processes sequentially, Parallel Stream splits work across multiple CPU cores.",
      "explain": "Parallel stream uses ForkJoinPool to split and process in parallel\nFaster for large datasets with CPU-intensive operations\nNot always faster — small lists, I/O tasks, or stateful operations can be slower\nOrder not guaranteed in parallel stream — use forEachOrdered if needed",
      "example": "\"Parallel stream splits the data into chunks and processes them on multiple cores using ForkJoinPool. For large CPU-intensive operations it can be significantly faster. But I use it carefully — for small collections or I/O operations overhead outweighs benefit. In production I used parallel stream for processing large batch data transformations where order did not matter.\"",
      "summary10s": "Parallel stream=ForkJoinPool multi-core, faster for large CPU work, not for small or I/O tasks."
    }
  },
  {
    "id": "what-does-enableautoconfiguration-do",
    "category": "Spring Boot",
    "question": "What does @EnableAutoConfiguration do?",
    "frequency": 3,
    "companies": [
      "Accenture"
    ],
    "variations": [
      "What is the purpose of @EnableAutoConfiguration?",
      "@EnableAutoConfiguration"
    ],
    "answerSEE": {
      "simple": "Tells Spring Boot to automatically configure beans based on dependencies on classpath.",
      "explain": "Spring Boot checks what jars are on classpath\nAuto-configures matching beans — DataSource if JDBC jar present, Tomcat if web jar present\nUses @Conditional annotations internally — only configures if condition met\n@SpringBootApplication includes @EnableAutoConfiguration",
      "example": "\"@EnableAutoConfiguration is what makes Spring Boot magical. It scans the classpath and automatically creates beans for what it finds. If it sees H2 jar, it auto-configures in-memory DataSource. If it sees Spring Web, it sets up Tomcat and DispatcherServlet. All without XML config. I can override any auto-configuration by defining my own bean.\"",
      "summary10s": "Reads classpath, auto-configures matching beans conditionally, @SpringBootApplication includes it."
    }
  },
  {
    "id": "what-are-spring-profiles",
    "category": "Spring Boot",
    "question": "What are Spring Profiles?",
    "frequency": 3,
    "companies": [],
    "variations": [
      "How do Spring profiles work internally?",
      "Spring Profiles"
    ],
    "answerSEE": {
      "simple": "Profiles allow different configurations for different environments like dev, test, prod.",
      "explain": "@Profile on bean or config class — only loaded when that profile is active\napplication-dev.properties, application-prod.properties for environment specific values\nSet active profile via environment variable SPRING_PROFILES_ACTIVE\nPrevents prod config accidentally used in dev and vice versa",
      "example": "\"I use Spring Profiles to separate environment configurations. Dev profile has H2 in-memory database and debug logging. Prod profile has real datasource and info logging. I set SPRING_PROFILES_ACTIVE as environment variable in deployment. In my project I also use profiles to switch between mock services in test and real services in production.\"",
      "summary10s": "Profiles=env-specific config, @Profile on beans, set via SPRING_PROFILES_ACTIVE env variable."
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
      "simple": "Eager loads related data immediately, Lazy loads only when you access it.",
      "explain": "Eager — loads everything in one query even if not needed\nLazy — loads related data on first access, default for collections\nLazy risk — LazyInitializationException if session closed before access\nFix — JOIN FETCH in query or keep method @Transactional",
      "example": "\"Lazy loading is the default for collections in Hibernate. Related entities load only when accessed which saves unnecessary DB calls. But if I access lazy data after session closes I get LazyInitializationException. I fix this with JOIN FETCH in my JPQL to load everything in one query when I know I will need it.\"",
      "summary10s": "Eager=load now always, Lazy=load on access, session must be open, fix with JOIN FETCH."
    }
  },
  {
    "id": "fail-fast-vs-fail-safe-iterator",
    "category": "Java",
    "question": "Fail-Fast vs Fail-Safe Iterator",
    "frequency": 3,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "Fail-Fast vs Fail-Safe",
      "Fail-Fast vs Fail-Safe iterators"
    ],
    "answerSEE": {
      "simple": "Fail-fast throws exception on modification during iteration, Fail-safe iterates over a copy — no exception.",
      "explain": "Fail-fast — ArrayList, HashMap, tracks modCount, throws ConcurrentModificationException immediately on structural change\nFail-safe — CopyOnWriteArrayList, ConcurrentHashMap, iterates over snapshot copy\nFail-safe may see stale data — snapshot not reflect latest additions\nUse fail-safe in multithreaded scenarios",
      "example": "\"Fail-fast iterators detect structural modification during iteration by tracking modCount. Any add or remove increments modCount. Iterator checks on every next call — mismatch means someone modified the collection and it throws immediately rather than producing wrong results. Fail-safe iterators in concurrent collections work on a snapshot — no exception possible but you might miss recent updates.\"",
      "summary10s": "Fail-fast=modCount check throws immediately, Fail-safe=snapshot no exception may see stale data."
    }
  },
  {
    "id": "concurrenthashmap-internal-working",
    "category": "Java",
    "question": "ConcurrentHashMap internal working",
    "frequency": 3,
    "companies": [
      "EPAM"
    ],
    "variations": [
      "How does ConcurrentHashMap work?",
      "Explain the internal working of ConcurrentHashMap."
    ],
    "answerSEE": {
      "simple": "ConcurrentHashMap allows multiple threads to read/write safely without locking the entire map.",
      "explain": "Uses bucket-level locking (segment locking in older versions, CAS + synchronized in Java 8+)\nOnly the specific bucket being modified is locked, not the whole map\nReads are mostly lock-free, giving high concurrency",
      "example": "\"ConcurrentHashMap achieves thread-safety without locking the whole map. In Java 8 onwards, it uses CAS operations and synchronizes only on the specific bucket being updated, not the entire structure. This makes reads mostly lock-free and gives much better performance than a synchronized HashMap in multi-threaded scenarios.\"",
      "summary10s": "Locks only the bucket, not the whole map — high concurrency."
    }
  },
  {
    "id": "threadlocal",
    "category": "Java",
    "question": "ThreadLocal",
    "frequency": 3,
    "companies": [
      "Accenture"
    ],
    "variations": [
      "ThreadLocal and InheritableThreadLocal",
      "What is ThreadLocal and where is it used?"
    ],
    "answerSEE": {
      "simple": "ThreadLocal gives each thread its own independent copy of a variable.",
      "explain": "No sharing between threads — each thread has private copy\nUsed for storing user context, transaction context, request ID per thread\nSpring uses ThreadLocal internally for SecurityContext and transaction management\nMust call remove() after use to prevent memory leaks in thread pools",
      "example": "\"ThreadLocal is useful when I need per-thread state like storing the current logged-in user or request correlation ID without passing it everywhere. Each thread gets its own copy so there is no sharing or synchronization needed. I always call remove in a finally block because thread pools reuse threads — stale data from previous request would otherwise bleed into next request.\"",
      "summary10s": "Each thread owns its copy, no sharing, always remove after use in thread pools."
    }
  },
  {
    "id": "angular-http-interceptors",
    "category": "Angular",
    "question": "Angular HTTP Interceptors",
    "frequency": 3,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "What is an HTTP Interceptor in Angular? Where would you use it?",
      "How do multiple HTTP interceptors work together?"
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
    "frequency": 3,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "How do you handle API errors globally in Angular?",
      "How to attach JWT tokens to API requests using interceptors?"
    ],
    "answerSEE": {
      "simple": "Attaching JWT auth tokens automatically and handling global error responses are the most common real-world uses.",
      "explain": "Auth Interceptor — attaches Authorization: Bearer <token> to every outgoing request automatically\nError Interceptor — catches 401/403 globally, redirects to login or refreshes token\nLoading Interceptor — shows/hides a global spinner based on active requests",
      "example": "\"In my project, I implemented an Auth Interceptor that automatically attached the JWT token from local storage to every outgoing HTTP request, so I didn't have to add it manually in every service call. I also built an Error Interceptor that caught 401 responses globally and redirected the user to the login page, and a Loading Interceptor that showed a spinner whenever there were active HTTP requests in flight.\"",
      "summary10s": "Auth token attachment + global error handling — the two most common real uses."
    }
  },
  {
    "id": "angular-combinelatest-vs-forkjoin-vs-zip",
    "category": "Angular",
    "question": "combineLatest vs forkJoin vs zip",
    "frequency": 3,
    "companies": [],
    "variations": [
      "When and why do we use the forkJoin operator?"
    ],
    "answerSEE": {
      "simple": "forkJoin waits for all to complete, combineLatest reacts to any change, zip pairs by position.",
      "explain": "forkJoin — all must complete, emits once with all last values. Page load multiple APIs\ncombineLatest — emits on any source change after all emitted once. Reactive filters\nzip — pairs values by index position. Rarely used, for positional pairing",
      "example": "\"I use forkJoin when I need to fire multiple API calls on page load and wait for all to complete before rendering. I use combineLatest for reactive UI where multiple streams affect the same output and I need to react to any change. zip I rarely use — it pairs values by position which is needed in very specific scenarios.\"",
      "summary10s": "forkJoin=wait all complete, combineLatest=react to any change, zip=positional pairs."
    }
  },
  {
    "id": "jpql-vs-native-query",
    "category": "Spring Boot",
    "question": "JPQL vs Native Query",
    "frequency": 3,
    "companies": [],
    "variations": [
      "JPQL vs Native Query.",
      "What are indexes in sql."
    ],
    "answerSEE": {
      "simple": "JPQL uses entity class names and is database-independent, Native Query uses actual table names and is database-specific.",
      "explain": "JPQL — queries against entity model not DB schema, JPA specification standard\nNative SQL — actual SQL with real table and column names, database-specific syntax\nJPQL advantages — database portability, compile-time checking, works with entity state\nNative advantages — use any DB feature, window functions, full-text search, performance hints\nChoose JPQL by default, native only when JPQL cannot express the requirement\nCode:\n// JPQL — entity class name Employee, field name firstName\n@Query(\"SELECT e FROM Employee e WHERE e.firstName = :name AND e.salary > :sal\")\nList<Employee> findHighEarners(@Param(\"name\") String name, @Param(\"sal\") BigDecimal sal);\n\n// Native SQL — table name employees, column name first_name\n@Query(value = \"SELECT * FROM employees WHERE first_name = :name AND salary > :sal\",\n       nativeQuery = true)\nList<Employee> findHighEarnersNative(@Param(\"name\") String name, @Param(\"sal\") BigDecimal sal);\n\n// Native for DB-specific features\n@Query(value = \"SELECT *, ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) as rank \" +\n               \"FROM employees\",\n       nativeQuery = true)\nList<Object[]> findEmployeeRankings(); // ROW_NUMBER not available in JPQL",
      "example": "\"JPQL is my default because it works at the entity level — I use Employee not the employees table name, firstName not first_name column. If I switch databases, my JPQL queries still work. Native SQL is for situations JPQL cannot handle — window functions like ROW_NUMBER, full-text search using MATCH AGAINST, database-specific JSON operations, or when I need a complex optimized query with specific indexes hints. The trade-off is tight coupling to the database vendor.\"",
      "summary10s": "JPQL=entity names database-portable, Native=table names database-specific. Use JPQL by default, native for DB-specific features like window functions."
    }
  },
  {
    "id": "jvm-memory-management",
    "category": "Java",
    "question": "JVM Memory Management",
    "frequency": 3,
    "companies": [],
    "variations": [
      "Why can increasing JVM heap size sometimes make the problem worse?",
      "Explain memory management in java."
    ],
    "answerSEE": {
      "simple": "JVM manages memory using different areas like Heap, Stack, and Metaspace, and cleans unused objects via Garbage Collection.",
      "explain": "Heap — stores objects, divided into Young Gen (Eden, Survivor) and Old Gen\nStack — stores method calls and local variables, per thread\nGC automatically removes objects with no references (Minor GC for Young Gen, Major GC for Old Gen)",
      "example": "\"\"JVM memory is mainly divided into Heap and Stack. Objects are created in the Heap, which itself is split into Young and Old Generation for efficient garbage collection. The Stack holds method calls and local variables per thread. Garbage Collector automatically removes \nobjects that no longer have references, so we don't manage memory manually like in C++.\"\"",
      "summary10s": "Heap for objects, Stack for method calls, GC auto-cleans unused ones."
    }
  },
  {
    "id": "kafka-producer-consumer-topic-partition-offset",
    "category": "Microservices",
    "question": "Kafka Producer, Consumer, Topic, Partition, Offset",
    "frequency": 3,
    "companies": [],
    "variations": [
      "What is a Kafka partition?",
      "How would you solve a producer-consumer problem?"
    ],
    "answerSEE": {
      "simple": "These are the core building blocks of how Kafka stores and delivers messages.",
      "explain": "Producer — publishes messages to a Topic\nTopic — a category of messages, split into Partitions for scalability\nConsumer — reads messages from partitions, tracked via Offset (message position)",
      "example": "\"In Kafka, a Producer publishes messages to a Topic, which is like a category or channel. Each Topic is split into Partitions to allow parallel processing and scalability. A Consumer reads messages from these partitions, and Kafka tracks each Consumer's position using an Offset, so it knows exactly where to resume reading from if it restarts.\"",
      "summary10s": "Producer→Topic (split into Partitions)→Consumer reads, tracked via Offset."
    }
  },
  {
    "id": "happens-before-jmm",
    "category": "Java",
    "question": "Happens-Before in Java Memory Model",
    "frequency": 3,
    "companies": [],
    "variations": [
      "Java Memory Model (JMM)",
      "What is the Java Memory Model (JMM)?"
    ],
    "answerSEE": {
      "simple": "Happens-before guarantees that one action is visible to another thread before it runs.",
      "explain": "Without happens-before, threads can see stale values due to CPU caching and reordering\nsynchronized and volatile establish happens-before relationships\nThread start and join also create happens-before guarantees\nThis is why unsynchronized shared variable access is unpredictable",
      "example": "\"Java Memory Model defines happens-before relationships to guarantee visibility. If action A happens-before B, then B is guaranteed to see all changes made by A. synchronized blocks, volatile writes, and thread start and join all establish this. Without these guarantees the CPU and compiler can reorder instructions and threads can see stale cached values.\"",
      "summary10s": "Happens-before=visibility guarantee, established by synchronized, volatile, thread start/join."
    }
  },
  {
    "id": "garbage-collection-in-java",
    "category": "Java",
    "question": "Garbage Collection in Java",
    "frequency": 3,
    "companies": [
      "Accenture",
      "Zensar Technologies"
    ],
    "variations": [
      "How does Garbage Collection work in Java?",
      "What is garbage collection in Java?"
    ],
    "answerSEE": {
      "simple": "GC automatically removes objects that no longer have any live references, freeing up heap memory.",
      "explain": "- Heap split into Young Gen (Minor GC) and Old Gen (Major GC)\n- Modern default collector: G1, divides heap into regions, collects garbage-heavy regions first\n- Developer doesn't manually free memory — GC handles it based on reachability",
      "example": "\"Garbage Collection automatically identifies and removes objects that no longer have any live references, so I don't have to manually free memory like in C++. The heap is split into Young and Old Generation for efficient collection — short-lived objects get cleaned quickly in Minor GC, while long-lived ones move to Old Gen and get cleaned less frequently in Major GC.\"",
      "summary10s": "\"Auto-removes unreachable objects — Young Gen (Minor GC) + Old Gen (Major GC).\""
    }
  },
  {
    "id": "what-are-java-records-how-do-you-fetch-the-first-record",
    "category": "Java",
    "question": "What are Java Records? How do you fetch the first record?",
    "frequency": 3,
    "companies": [],
    "variations": [
      "Record Class and Fetching First Record",
      "collect(), findFirst(), findAny()"
    ],
    "answerSEE": {
      "simple": "Record is immutable data class, fetch first from list using stream findFirst.",
      "explain": "Record auto-generated constructor, getters, equals, hashCode, toString\nCan hold a list as a component — List is part of record definition\nTo get first record from a list — list.stream().findFirst().orElse(null)\nRecords cannot extend classes but can implement interfaces",
      "example": "\"Record class eliminates boilerplate for data carriers. If my record contains a List from a query result, I access it via the auto-generated accessor. To get the first element I use stream findFirst which returns an Optional — I chain orElseThrow or orElse for safe access. Records are perfect for query result DTOs.\"",
      "summary10s": "Record=immutable auto-boilerplate, first element via stream().findFirst().orElse()."
    }
  },
  {
    "id": "explain-the-factory-design-pattern",
    "category": "System Design",
    "question": "Explain the Factory Design Pattern.",
    "frequency": 3,
    "companies": [],
    "variations": [
      "Factory Design Pattern",
      "Factory pattern concept"
    ],
    "answerSEE": {
      "simple": "Factory creates objects without exposing creation logic — caller gets object without knowing exact class.",
      "explain": "Define interface or abstract class for product\nFactory class has method that returns correct subclass based on input\nCaller only knows the interface, not which concrete class was created\nUse when object creation logic is complex or type depends on runtime condition",
      "example": "\"Factory pattern hides object creation complexity. I define a NotificationService interface with implementations EmailService and SMSService. A NotificationFactory has a getService method that takes a type string and returns the correct implementation. Caller just uses the interface — adding a new notification type means adding a new class, not changing caller code.\"",
      "summary10s": "Factory creates correct subclass based on input, caller only knows interface."
    }
  },
  {
    "id": "pathvariable-vs-requestparam",
    "category": "Spring Boot",
    "question": "@PathVariable vs @RequestParam?",
    "frequency": 3,
    "companies": [],
    "variations": [
      "Path Variable vs Request Param",
      "Pagination and unique constraints"
    ],
    "answerSEE": {
      "simple": "PathVariable is part of URL path, RequestParam is a query string parameter.",
      "explain": "@PathVariable — extract value from URL path like /users/123, id is path variable\n@RequestParam — extract from query string like /users?status=active, status is request param\nPathVariable for resource identity, RequestParam for filtering or optional inputs\nRequestParam can have default value and be optional",
      "example": "\"PathVariable is for identifying a specific resource — like /orders/456 where 456 is the order ID in the path. RequestParam is for filtering or optional data — like /orders?status=pending&page=1. I use PathVariable for required identifiers and RequestParam for optional filters, pagination, and search criteria.\"",
      "summary10s": "PathVariable=resource ID in URL path, RequestParam=optional filter in query string."
    }
  },
  {
    "id": "java-final-finally-finalize",
    "category": "Java",
    "question": "Difference between final, finally, and finalize",
    "frequency": 3,
    "companies": [
      "Zensar Technologies"
    ],
    "variations": [
      "What is the difference between final, finally, and finalize?",
      "Try-with-resources"
    ],
    "answerSEE": {
      "simple": "final is a keyword to restrict modification; finally is a block in exception handling; finalize is a method for garbage collection cleanup.",
      "explain": "final variables can't be reassigned, methods can't be overridden, and classes can't be inherited. finally is always executed after try-catch (used for resource cleanup). finalize() is called by the Garbage Collector before an object is destroyed.",
      "example": "\"I use 'final' to define constants or prevent classes from being inherited. 'finally' is my go-to block in try-catch to ensure resources like database connections are always closed regardless of exceptions. As for 'finalize()', I rarely use it because it's deprecated in newer Java versions; we now use try-with-resources or cleaner patterns for memory management.\"",
      "summary10s": "final = keyword (constant), finally = block (cleanup), finalize = method (GC)."
    }
  },
  {
    "id": "what-happens-inside-the-jvm-when-a-method-executes-with-primitives-and-objects",
    "category": "Java",
    "question": "What happens inside the JVM when a method executes with primitives and objects?",
    "frequency": 3,
    "companies": [
      "Flipkart"
    ],
    "variations": [
      "How does the JVM determine which objects are eligible for Garbage Collection?",
      "Heap vs Stack memory — what is stored where?"
    ],
    "answerSEE": {
      "simple": "Local primitives and object references go to the Stack. The actual object data goes to the Heap.",
      "explain": "When `public void test()` executes, a stack frame is created. The primitive `int x = 10` is stored in the Stack. `Employee e` (the reference) is also in the Stack, but the actual `new Employee()` object is created in the Heap.",
      "example": "In that method, the primitive `x` and the reference variable `e` are both stored in the thread's Stack memory inside the method's frame. The actual `Employee` object instance is allocated in the Heap. Once the method finishes execution, the stack frame is popped off, destroying `x` and `e`. Since there are no more references pointing to the `Employee` object in the Heap, it becomes eligible for Garbage Collection.",
      "summary10s": "Primitives & references on Stack. Objects on Heap. Object is GCed when method ends."
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
    "id": "key-features-of-java-17",
    "category": "Java",
    "question": "Key features of Java 17?",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Key Features in Java 17"
    ],
    "answerSEE": {
      "simple": "Java 17 is LTS with sealed classes, records, pattern matching, and text blocks.",
      "explain": "Sealed classes — restrict which classes can extend a class\nRecords — immutable data classes with auto-generated boilerplate\nPattern matching for instanceof — no explicit cast needed\nText blocks — multiline strings with clean formatting\nEnhanced switch expressions",
      "example": "\"Java 17 is a Long Term Support release. Key features I use are Records for clean DTO classes, Sealed classes for controlled inheritance, and pattern matching for instanceof which removes explicit casting. Text blocks clean up multiline JSON or SQL strings in code. These features reduce boilerplate significantly.\"",
      "summary10s": "Java 17 LTS — Records, Sealed classes, Pattern matching, Text blocks, Enhanced switch."
    }
  },
  {
    "id": "what-is-var-can-it-be-used-with-generics",
    "category": "Java",
    "question": "What is var? Can it be used with generics?",
    "frequency": 2,
    "companies": [],
    "variations": [
      "var Keyword"
    ],
    "answerSEE": {
      "simple": "var lets Java infer the type of local variable — less typing, same strong typing.",
      "explain": "Compiler infers type at compile time — not dynamic typing\nOnly for local variables — not fields, parameters, or return types\nCannot be used as generic type parameter like List of var\nMakes code cleaner but can reduce readability if overused",
      "example": "\"var lets Java figure out the variable type from the value. I don't need to write the type myself. It is still strongly typed, so the type cannot change. It only works for local variables, and I use it when the type is clear to keep the code short and clean.\"",
      "summary10s": "var=compiler infers type, local variables only, cannot use as generic type."
    }
  },
  {
    "id": "what-is-an-effectively-final-variable",
    "category": "Java",
    "question": "What is an effectively final variable?",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Effectively Final Variable"
    ],
    "answerSEE": {
      "simple": "A variable that is never reassigned after initialization — even without final keyword.",
      "explain": "Java 8 plus allows lambdas to use local variables without final if they are never changed\nIf you try to reassign the variable, compiler shows error in lambda\nEffectively final means compiler treats it as final even without keyword\nCommon in lambda expressions and anonymous inner classes",
      "example": "\"Effectively final means a variable that is never modified after first assignment. Java allows lambdas to capture local variables only if they are final or effectively final. If I declare a variable and never reassign it, Java treats it as final automatically. The moment I try to change it, the lambda using it gives a compile error.\"",
      "summary10s": "Never reassigned after init = effectively final, lambdas can capture it."
    }
  },
  {
    "id": "checked-vs-unchecked-exceptions",
    "category": "Java",
    "question": "Checked vs Unchecked Exceptions?",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Checked Exception — Pros and Cons"
    ],
    "answerSEE": {
      "simple": "Checked exception must be handled or declared — compiler enforces it.",
      "explain": "Checked — IOException, SQLException — compiler forces handle or declare with throws\nAdvantage — forces caller to handle, makes error handling explicit and visible\nDisadvantage — verbose, pollutes method signatures, leads to empty catch blocks\nUnchecked — RuntimeException — no forced handling, cleaner but easy to miss",
      "example": "\"Checked exceptions force developers to handle error cases at compile time which improves reliability. The downside is they add throws declarations to every method in the call stack and often lead to swallowed exceptions in empty catch blocks. In modern Spring Boot I prefer unchecked exceptions and handle them globally with @ControllerAdvice.\"",
      "summary10s": "Checked=compiler forces handling, pro=explicit, con=verbose and pollutes signatures."
    }
  },
  {
    "id": "reverse-a-string-without-built-in-methods",
    "category": "Java Coding",
    "question": "Reverse a String without built-in methods.",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Reverse String Without Predefined Methods"
    ],
    "answerSEE": {
      "simple": "Use a loop from end to start, build reversed string character by character.",
      "explain": "Loop from last index to 0\nAppend each character to a new string or StringBuilder\nStringBuilder approach is more efficient — no new String object each iteration\nTime O(n), Space O(n)",
      "example": "\"I loop from the last index of the string down to zero and append each character to a StringBuilder. Finally I return the StringBuilder as a string. This avoids using reverse method and runs in O(n) time. Using StringBuilder instead of string concatenation avoids creating unnecessary intermediate string objects.\"",
      "summary10s": "Loop from end to start, append each char to StringBuilder, return result."
    }
  },
  {
    "id": "can-hashmap-keys-be-mutable-why",
    "category": "Java",
    "question": "Can HashMap keys be mutable? Why?",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Can HashMap Keys Be Mutable?"
    ],
    "answerSEE": {
      "simple": "Technically yes, but it breaks HashMap — never use mutable keys.",
      "explain": "HashMap finds bucket using hashCode of key at put time\nIf key mutates after insertion, hashCode changes\nNow get with same object returns null — key is in wrong bucket\nAlways use immutable keys — String, Integer, enums, or proper value objects",
      "example": "\"HashMap can accept mutable objects as keys but it breaks the contract. When you put a key, its hashCode determines the bucket. If you mutate the key later, hashCode changes and HashMap cannot find it anymore — get returns null even though key exists. This is why String is the most common key — it is immutable by design.\"",
      "summary10s": "Mutable key = hashCode changes after put = get returns null = never use mutable keys."
    }
  },
  {
    "id": "can-interfaces-have-private-methods",
    "category": "Java",
    "question": "Can interfaces have private methods?",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Private Methods in Interface"
    ],
    "answerSEE": {
      "simple": "Yes, Java 9 introduced private methods in interfaces to share code between default methods.",
      "explain": "Private method — can only be called by other methods in same interface\nPrevents code duplication between two default methods\nNot visible to implementing classes or subinterfaces\nPrivate static methods also allowed for static helper logic",
      "example": "\"From Java 9, interfaces can have private methods. This is useful when two default methods share common logic — instead of duplicating code, extract it to a private method in the interface. Implementing classes cannot see or override private methods. It is purely an internal implementation detail of the interface.\"",
      "summary10s": "Java 9 allows private interface methods, used to share logic between default methods."
    }
  },
  {
    "id": "what-types-of-methods-can-interfaces-contain",
    "category": "Java",
    "question": "What types of methods can interfaces contain?",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Types of Methods in Interface"
    ],
    "answerSEE": {
      "simple": "Five types — abstract, default, static, private, and private static.",
      "explain": "Abstract — no body, must be implemented by class, default type\nDefault — has body, can be overridden, introduced Java 8\nStatic — has body, belongs to interface, called via interface name\nPrivate — has body, only for internal use by default methods, Java 9\nPrivate static — static version of private, for static helper logic",
      "example": "\"Modern interfaces can have five types of methods. Abstract methods are the original contract. Default methods with body allow backward compatibility. Static methods are utility methods on the interface itself. Private and private static methods added in Java 9 for internal code reuse between default methods.\"",
      "summary10s": "Abstract, Default, Static, Private, Private Static — five types since Java 9."
    }
  },
  {
    "id": "same-default-method-in-two-interfaces-how-to-resolve",
    "category": "Java",
    "question": "Same default method in two interfaces how to resolve?",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Conflict When Two Interfaces Have Same Default Method"
    ],
    "answerSEE": {
      "simple": "Compiler forces the implementing class to override the conflicting method.",
      "explain": "If Class C implements Interface A and B, both having same default method\nCompiler gives error — ambiguous, must override\nClass must override the method and provide its own implementation\nCan call specific interface version using InterfaceName.super.methodName()",
      "example": "\"If two interfaces have the same default method and one class implements both interfaces, Java gets confused about which method to use. So the compiler forces the class to override that method and provide its own implementation. Inside the overridden method, we can call a specific interface’s method using InterfaceName.super.method().\"",
      "summary10s": "Compiler forces override in class, call specific version with InterfaceA.super.method()."
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
    "id": "what-is-a-race-condition-how-do-you-prevent-it",
    "category": "Java",
    "question": "What is a Race Condition? How do you prevent it?",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Race Condition"
    ],
    "answerSEE": {
      "simple": "A race condition occurs when multiple threads modify shared data simultaneously, causing unpredictable and incorrect results.",
      "explain": "It happens when the outcome depends on the unpredictable timing of thread execution. You prevent it by synchronizing the critical section so only one thread can execute it at a time.",
      "example": "If two threads try to withdraw money from a bank account at the same time, they both might read a balance of $100 and allow a $100 withdrawal, resulting in a negative balance. I prevent this by using a `synchronized` block around the withdrawal logic or using `ReentrantLock` so the second thread has to wait.",
      "summary10s": "Threads stepping on each other's toes. Prevent using synchronized blocks, Locks, or Atomic classes."
    }
  },
  {
    "id": "what-is-the-difference-between-filter-and-map",
    "category": "Java",
    "question": "What is the difference between filter() and map()?",
    "frequency": 2,
    "companies": [],
    "variations": [
      "filter() vs map()"
    ],
    "answerSEE": {
      "simple": "filter() selects elements based on a condition, keeping the type the same. map() transforms elements, potentially changing their type.",
      "explain": "filter takes a Predicate (returns boolean). If true, the element stays. map takes a Function (returns an object). It converts the input into something else.",
      "example": "I use `filter(user -> user.getAge() > 18)` to remove underage users from the stream. Then I use `map(user -> user.getEmail())` to transform the remaining User objects into a stream of String emails.",
      "summary10s": "filter removes unwanted elements. map transforms elements from one type/value to another."
    }
  },
  {
    "id": "what-are-the-types-of-dependency-injection",
    "category": "Spring Boot",
    "question": "What are the types of Dependency Injection?",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Types of Dependency Injection"
    ],
    "answerSEE": {
      "simple": "Three types — Constructor, Setter, and Field injection.",
      "explain": "Constructor — inject via constructor, mandatory deps, immutable, best for testing\nSetter — inject via setter, optional deps, can change after creation\nField — @Autowired on field directly, convenient but hard to test, avoid in production",
      "example": "\"I always prefer constructor injection because it makes dependencies mandatory and the class is easy to unit test without Spring context. Setter injection is for optional dependencies that can be changed. Field injection looks clean but is bad practice — you cannot instantiate the class in tests without Spring. Spring team also recommends constructor injection.\"",
      "summary10s": "Constructor=best mandatory immutable testable, Setter=optional, Field=avoid in production."
    }
  },
  {
    "id": "what-is-spring-security",
    "category": "Spring Boot",
    "question": "What is Spring Security?",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Spring Security Fundamentals"
    ],
    "answerSEE": {
      "simple": "Spring Security is a filter chain that intercepts every request and handles authentication and authorization.",
      "explain": "Filter chain sits in front of all controllers\nAuthentication — verify who you are\nAuthorization — verify what you can do\nSecurityContext holds authenticated user for current request\nConfigured via SecurityFilterChain bean",
      "example": "\"Spring Security works as a chain of filters that every request passes through before reaching the controller. Authentication verifies identity — usually by validating credentials or JWT. Authorization checks if authenticated user has permission for the requested resource. SecurityContext stores the authenticated user and is accessible anywhere in the request thread.\"",
      "summary10s": "Filter chain intercepts every request, Authentication=who, Authorization=what allowed."
    }
  },
  {
    "id": "authentication-vs-authorization",
    "category": "Spring Boot",
    "question": "Authentication vs Authorization?",
    "frequency": 2,
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
    "id": "how-do-you-implement-security-across-microservices",
    "category": "Microservices",
    "question": "How do you implement security across microservices?",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Security in Distributed Microservices"
    ],
    "answerSEE": {
      "simple": "API Gateway validates JWT centrally, services trust validated requests.",
      "explain": "All external requests go through API Gateway\nGateway validates JWT signature before forwarding\nGateway passes user info in request header to downstream services\nService-to-service calls use internal service tokens or mutual TLS",
      "example": "\"In microservices I validate JWT at the API Gateway so each service does not need to repeat auth logic. Gateway extracts user information from token and passes it as headers to downstream services. For internal service-to-service calls I use service-specific tokens. No microservice is exposed directly to the outside world — everything goes through the gateway.\"",
      "summary10s": "Gateway validates JWT, passes user in headers, internal calls use service tokens."
    }
  },
  {
    "id": "given-a-list-of-integers-find-print-duplicate-values-using-java-8-streams",
    "category": "Java Coding",
    "question": "Given a list of integers, find/print duplicate values using Java 8 Streams.",
    "frequency": 2,
    "companies": [
      "Accenture"
    ],
    "variations": [
      "Find duplicate elements using Streams"
    ],
    "answerSEE": {
      "simple": "Use a Set to track seen items, and filter the stream based on whether adding the item to the Set fails.",
      "explain": "A `HashSet.add()` returns false if the item already exists in the set. By putting this check inside a `filter()` operation on the stream, we easily isolate the duplicates without writing nested loops.",
      "example": "I would initialize a `Set<Integer> seen = new HashSet<>();`. Then I'd create the stream from the list and use `list.stream().filter(n -> !seen.add(n)).forEach(System.out::println);`. It runs in O(N) time and requires O(N) space for the Set.",
      "summary10s": "Create an external Set. Use `.filter(n -> !set.add(n))` inside the stream."
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
    "id": "restcontroller-vs-controller",
    "category": "Spring Boot",
    "question": "@RestController vs @Controller",
    "frequency": 2,
    "companies": [],
    "variations": [
      "What is the difference between @Controller and @RestController?"
    ],
    "answerSEE": {
      "simple": "@RestController returns data directly (like JSON); @Controller is used for returning views.",
      "explain": "@Controller — typically returns a view name (used with Thymeleaf/JSP)\n@RestController = @Controller + @ResponseBody — returns data directly serialized as JSON/XML\nREST APIs almost always use @RestController",
      "example": "\"@Controller is traditionally used when we're returning a view, like a Thymeleaf template. @RestController is a combination of @Controller and @ResponseBody, so every method's return value is directly serialized into the response body, usually as JSON. Since I mostly build REST APIs, I use @RestController almost everywhere.\"",
      "summary10s": "@Controller = returns view, @RestController = @Controller + @ResponseBody (returns JSON)."
    }
  },
  {
    "id": "singleton-design-pattern",
    "category": "System Design",
    "question": "Singleton Design Pattern",
    "frequency": 2,
    "companies": [
      "EPAM"
    ],
    "variations": [
      "Implement a thread-safe Singleton using double-checked locking."
    ],
    "answerSEE": {
      "simple": "Singleton ensures only one instance of a class exists throughout the application.",
      "explain": "Private constructor + static instance + static access method\nCommon uses: config managers, logging, connection pools\nNeeds thread-safety handling (double-checked locking, enum) in multi-threaded apps",
      "example": "\"Singleton restricts a class to just one instance, typically implemented with a private constructor and a static getInstance() method. I've used it for things like a configuration manager that should be shared across the app. In multi-threaded environments, I'd make sure it's thread-safe using double-checked locking or an enum-based implementation.\"",
      "summary10s": "One instance only — private constructor + static access, thread-safe if needed."
    }
  },
  {
    "id": "aggregation-association-composition-code-examples",
    "category": "System Design",
    "question": "Aggregation, Association, Composition — Code Examples",
    "frequency": 2,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "Aggregation vs Composition"
    ],
    "answerSEE": {
      "simple": "Association is general relationship, Aggregation is weak HAS-A (independent lifecycle), Composition is strong HAS-A (dependent lifecycle).",
      "explain": "Association — two classes are related, neither owns the other, can exist independently, loosest coupling\nAggregation — HAS-A relationship, child CAN exist without parent, parent just holds a reference (whole-part, but part is independent)\nComposition — HAS-A relationship, child CANNOT exist without parent, parent fully owns and manages child's lifecycle (strongest coupling)\nCode for all three:\n// 1. ASSOCIATION — Teacher and Student are related, but independent\n// Neither owns the other. Both can exist without each other.\nclass Teacher {\n    private String name;\n    // Teacher doesn't \"contain\" Student, just relates to it\n}\n\nclass Student {\n    private String name;\n    private Teacher teacher; // association — just a reference\n    \n    public Student(String name, Teacher teacher) {\n        this.name = name;\n        this.teacher = teacher; // teacher created elsewhere, independently\n    }\n}\n// Usage: Teacher exists in DB regardless of student\nTeacher t = new Teacher(\"Mr. Smith\");\nStudent s = new Student(\"Alice\", t); // s references t, both independent\n\n\n// 2. AGGREGATION — Department HAS Employees, but Employee can exist \n// without Department (e.g., transferred to another department)\nclass Employee {\n    private String name;\n}\n\nclass Department {\n    private String deptName;\n    private List<Employee> employees; // aggregation — holds reference\n    \n    public Department(String deptName, List<Employee> employees) {\n        this.deptName = deptName;\n        this.employees = employees; // employees created OUTSIDE, passed in\n    }\n}\n// Usage: Employees created independently, THEN added to department\nEmployee e1 = new Employee(\"Bob\");\nEmployee e2 = new Employee(\"Carol\");\nList<Employee> emps = new ArrayList<>(List.of(e1, e2));\nDepartment dept = new Department(\"Engineering\", emps);\n// If dept is destroyed, e1 and e2 still exist independently!\n\n\n// 3. COMPOSITION — Car HAS-A Engine, Engine CANNOT exist without Car\n// Engine's lifecycle is entirely controlled by Car\nclass Engine {\n    private String type;\n    public Engine(String type) {\n        this.type = type;\n    }\n}\n\nclass Car {\n    private final Engine engine; // composition — created INSIDE Car\n    \n    public Car(String engineType) {\n        this.engine = new Engine(engineType); // Car creates its own Engine\n        // Engine has no meaning or existence outside this Car\n    }\n}\n// Usage: Engine is born and dies with the Car\nCar car = new Car(\"V8\");\n// car = null; → engine is also garbage collected, no other reference exists",
      "example": "\"Association is the loosest — Teacher and Student reference each other but neither creates nor owns the other; both exist completely independently in the system. Aggregation is a HAS-A relationship where Department holds a list of Employees, but those Employees are created outside and passed in — if I delete the Department, employees still exist, maybe transferred elsewhere. Composition is the strongest — Car creates its own Engine internally in its constructor. The Engine has no independent existence; if the Car object is destroyed, the Engine goes with it. The key differentiator is lifecycle ownership and where the object is instantiated.\"",
      "summary10s": "Association=independent reference, Aggregation=HAS-A but child created outside survives parent, Composition=HAS-A child created inside dies with parent."
    }
  },
  {
    "id": "synchronization-method-vs-block-level",
    "category": "Java",
    "question": "Synchronization Method vs Block Level",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Why can synchronized code become a production bottleneck?"
    ],
    "answerSEE": {
      "simple": "Method-level locks entire method on object, block-level locks only specific code section — better performance.",
      "explain": "Method level — synchronized on entire method, lock held for full method duration\nBlock level — synchronized on specific object for specific lines only\nSmaller critical section means less contention and better throughput\nCan synchronize on different objects — finer grained locking",
      "example": "\"Method-level synchronization locks the entire method on the object's monitor — every caller waits even if they only need a small part of the method. Block-level lets me define exactly what needs protection. I identify the shared mutable state and wrap only those lines. This reduces the time lock is held and allows more concurrent execution. Always prefer smallest possible critical section.\"",
      "summary10s": "Method=entire method locked, Block=only critical lines locked, smaller critical section=better throughput."
    }
  },
  {
    "id": "what-is-responseentity",
    "category": "Spring Boot",
    "question": "What is ResponseEntity?",
    "frequency": 2,
    "companies": [],
    "variations": [
      "What is ResponseEntity and why do you use it?"
    ],
    "answerSEE": {
      "simple": "ResponseEntity gives full control over the HTTP response — status code, headers, and body all in one object.",
      "explain": "Wrapper for HTTP response, generic type for the body\nResponseEntity.ok(body) — 200 with body\nResponseEntity.status(HttpStatus.CREATED).body(body) — 201 with body\nResponseEntity.noContent().build() — 204 with no body\nCan add custom headers — Location header after creating resource\n\nCode:\n@GetMapping(\"/{id}\")\npublic ResponseEntity<UserDTO> getUser(@PathVariable Long id) {\n    UserDTO user = userService.findById(id);\n    return ResponseEntity.ok(user); // 200 OK with body\n}\n\n@PostMapping\npublic ResponseEntity<UserDTO> createUser(@RequestBody @Valid CreateUserRequest req) {\n    UserDTO created = userService.create(req);\n    URI location = URI.create(\"/api/users/\" + created.getId());\n    return ResponseEntity.created(location).body(created); // 201 with Location header\n}\n\n@DeleteMapping(\"/{id}\")\npublic ResponseEntity<Void> deleteUser(@PathVariable Long id) {\n    userService.delete(id);\n    return ResponseEntity.noContent().build(); // 204 No Content\n}",
      "example": "\"ResponseEntity wraps the entire HTTP response — I control the status code, response headers, and body. Without it, Spring assumes 200 for every successful response. With ResponseEntity I return 201 Created with a Location header after creating a resource, 204 No Content after deletion, and 404 with an error body when resource is not found. It is the clean way to express proper REST semantics.\"",
      "summary10s": "ResponseEntity = full HTTP response control (status + headers + body). ok()=200, created()=201, noContent()=204, status(code).body(obj) for custom."
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
    "id": "save-vs-saveandflush",
    "category": "Spring Boot",
    "question": "save() vs saveAndFlush()",
    "frequency": 2,
    "companies": [],
    "variations": [
      "save() vs saveAndFlush()"
    ],
    "answerSEE": {
      "simple": "save() stages changes in persistence context, saveAndFlush() immediately writes to DB within the same transaction.",
      "explain": "save() — marks entity as persistent, actual SQL may not execute until flush happens at commit\nsaveAndFlush() — immediately executes SQL to DB, useful when subsequent logic needs DB-generated values\nflush() — forces SQL execution without committing the transaction\nUse case for saveAndFlush — save entity then call a stored procedure that needs that data in same transaction\nCode:\n// save() — SQL executes at transaction commit\nEmployee emp = new Employee(\"Alice\", \"Engineering\");\nemployeeRepository.save(emp);\n// At this point, emp.id might be null if DB assigns it\n// SQL executes when transaction flushes (usually at commit)\n\n// saveAndFlush() — SQL executes immediately\nEmployee emp = new Employee(\"Alice\", \"Engineering\");\nemployeeRepository.saveAndFlush(emp);\n// emp.id is populated NOW — DB has the row, generated ID is available\nLong empId = emp.getId(); // available immediately\n\n// Use case — save then immediately reference\nDepartment dept = new Department(\"Engineering\");\ndepartmentRepository.saveAndFlush(dept); // flush to DB now\n// Now I can reference dept.getId() in the next query\nList<Employee> emps = employeeRepository.findByDepartmentId(dept.getId());",
      "example": "\"save() stages the entity in the persistence context but SQL execution timing is controlled by Hibernate's flush mode — usually at transaction commit. saveAndFlush() forces immediate SQL execution to the database right now, still within the same transaction. I use saveAndFlush when I need the database-generated ID or need to reference the saved record in a subsequent query within the same transaction. For normal use save() is sufficient and better for batching multiple operations.\"",
      "summary10s": "save()=stages in context SQL at flush/commit, saveAndFlush()=immediate SQL to DB. Use saveAndFlush when DB-generated ID needed immediately or for same-transaction reference."
    }
  },
  {
    "id": "daemon-thread",
    "category": "Java",
    "question": "Daemon Thread",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Daemon Thread"
    ],
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
    "frequency": 2,
    "companies": [],
    "variations": [
      "SOLID Principles"
    ],
    "answerSEE": {
      "simple": "Five design principles for clean, maintainable, and extensible object-oriented code.",
      "explain": "S — Single Responsibility, one class one reason to change\nO — Open Closed, open for extension closed for modification\nL — Liskov Substitution, subclass should replace parent without breaking behavior\nI — Interface Segregation, small specific interfaces not one fat interface\nD — Dependency Inversion, depend on abstractions not concrete classes",
      "example": "\"SOLID helps me write maintainable code. Single Responsibility means each class does one thing. Open Closed means I add features by extending not modifying. Liskov means subclasses should work wherever parent is expected. Interface Segregation means split fat interfaces into focused ones. Dependency Inversion means depend on interfaces not implementations — this is what enables Spring DI.\"",
      "summary10s": "Single Responsibility, Open Closed, Liskov, Interface Segregation, Dependency Inversion."
    }
  },
  {
    "id": "api-gateway-and-why-it-s-required",
    "category": "Microservices",
    "question": "API Gateway and why it's required",
    "frequency": 2,
    "companies": [
      "EPAM"
    ],
    "variations": [
      "API Gateway vs Load Balancer — what is the difference?"
    ],
    "answerSEE": {
      "simple": "API Gateway is a single entry point that routes client requests to the correct microservice.",
      "explain": "Handles routing, authentication, rate limiting in one place\nClients don't need to know individual service addresses\nReduces cross-cutting logic duplication across services",
      "example": "\"API Gateway acts as a single entry point for all client requests and routes them to the right microservice internally. It's required because it centralizes things like authentication, rate limiting, and logging, so individual services don't have to repeat that logic. I've used Spring Cloud Gateway for this in a microservices setup.\"",
      "summary10s": "Single entry point → routing + auth + rate limiting, centralized."
    }
  },
  {
    "id": "how-to-optimize-slow-queries",
    "category": "Java",
    "question": "How to optimize slow queries?",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Troubleshooting a slow query"
    ],
    "answerSEE": {
      "simple": "Optimize slow queries by indexing, avoiding unnecessary data fetching, and analyzing the execution plan.",
      "explain": "Add proper indexes on frequently filtered/joined columns\nUse EXPLAIN ANALYZE to check query execution plan\nAvoid SELECT *, fetch only needed columns; use pagination for large data\nFix N+1 issues and use proper fetch strategies",
      "example": "\"To optimize slow queries, I first check the execution plan using EXPLAIN ANALYZE to see if indexes are being used properly. Then I add indexes on columns used in WHERE or JOIN clauses. I also avoid fetching unnecessary columns, use pagination for large result sets, and make sure I'm not hitting N+1 issues from lazy loading.\"",
      "summary10s": "Index + EXPLAIN ANALYZE + avoid SELECT * + pagination."
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
    "id": "jwt-authentication-flow",
    "category": "Microservices",
    "question": "JWT Authentication Flow",
    "frequency": 2,
    "companies": [],
    "variations": [
      "JWT Authentication Flow"
    ],
    "answerSEE": {
      "simple": "Login generates signed token, client sends it every request, server validates signature.",
      "explain": "User logs in with credentials, server validates, creates JWT with user details\nJWT signed with secret key — Header.Payload.Signature\nClient stores and sends in Authorization Bearer header\nServer validates signature on every request — no session needed\nStateless — scales perfectly across multiple instances",
      "example": "\"Login generates a signed JWT, Angular stores it in localStorage and sends it via HTTP interceptor in Authorization header, server validates token using a filter—stateless so it scales horizontally.\"",
      "summary10s": "Login creates signed JWT, client sends in header, filter validates signature, stateless scales horizontally."
    }
  },
  {
    "id": "explain-transactional-annotation-in-spring",
    "category": "Spring Boot",
    "question": "Explain @Transactional annotation in Spring",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Explain @Transactional."
    ],
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
    "frequency": 2,
    "companies": [],
    "variations": [
      "LAZY vs EAGER loading"
    ],
    "answerSEE": {
      "simple": "Eager fetch loads the related data immediately along with the main entity, which can cause unnecessary data loading. Lazy fetch loads the related data only when it is actually needed, which improves performance. So eager means load now, lazy means load later.",
      "explain": "",
      "example": "",
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
    "id": "java-overloading-vs-overriding",
    "category": "Java",
    "question": "Overloading vs Overriding",
    "frequency": 2,
    "companies": [
      "Zensar Technologies"
    ],
    "variations": [
      "Overloading vs Overriding in Automation Frameworks"
    ],
    "answerSEE": {
      "simple": "Overloading is same method name with different parameters in the same class; Overriding is redefining a parent's method in a subclass with the same signature.",
      "explain": "Overloading — compile-time (static) polymorphism, resolved by parameter types/count\nOverriding — runtime (dynamic) polymorphism, resolved based on actual object type at runtime\nOverriding requires inheritance; overloading doesn't",
      "example": "\"Overloading is having multiple methods with the same name but different parameters in the same class — it's resolved at compile time. Overriding is when a subclass provides its own implementation of a method already defined in its parent, with the exact same signature — this is resolved at runtime based on the actual object type, which is what enables polymorphism.\"",
      "summary10s": "Overloading = same name, different params, compile-time. Overriding = same signature, subclass, runtime."
    }
  },
  {
    "id": "runnable-vs-callable",
    "category": "Java",
    "question": "Runnable vs Callable",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Creating Threads — Thread, Runnable, Callable"
    ],
    "answerSEE": {
      "simple": "Runnable doesn't return a result; Callable can return a result and throw checked exceptions.",
      "explain": "Runnable — run(), no return value, no checked exceptions\nCallable — call(), returns a value via Future, can throw checked exceptions",
      "example": "\"Runnable's run() doesn't return anything and can't throw checked exceptions. Callable's call() can return a result through a Future, and can also throw checked exceptions. I use Callable whenever I need the outcome of an async task, like fetching data in parallel.\"",
      "summary10s": "Runnable = no result, Callable = returns result via Future."
    }
  },
  {
    "id": "what-is-the-saga-pattern",
    "category": "Microservices",
    "question": "What is the Saga Pattern?",
    "frequency": 2,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "Saga Design Pattern"
    ],
    "answerSEE": {
      "simple": "Saga Pattern manages transactions across multiple microservices using local transactions plus compensating actions.",
      "explain": "Each service does its own local transaction; failure triggers a compensating (undo) transaction\nTwo types: Choreography (event-based) and Orchestration (central controller)\nEnsures eventual consistency, not immediate consistency",
      "example": "\"Saga Pattern manages distributed transactions across microservices — since we can't have one transaction spanning multiple databases, each service does its own local transaction, and if something fails downstream, we run a compensating transaction to undo the earlier steps. I've used it to keep data consistent across order, payment, and inventory services, using the Orchestration style with a central coordinator.\"",
      "summary10s": "Distributed transaction → local steps + rollback via compensation."
    }
  },
  {
    "id": "sql-find-second-highest-salary",
    "category": "SQL",
    "question": "Find the second-highest salary",
    "frequency": 2,
    "companies": [
      "Zensar Technologies"
    ],
    "variations": [
      "Query to Find the 2nd Highest Salary"
    ],
    "answerSEE": {
      "simple": "Use LIMIT/OFFSET on a descending sorted distinct salary list, or a subquery with MAX() excluding the top value.",
      "explain": "Sort distinct salaries descending, skip the first one, take the next.",
      "example": "\"I'd select distinct salaries, sort them descending, and use LIMIT 1 OFFSET 1 to skip the highest and grab the next one — DISTINCT handles cases where multiple employees share the top salary. Alternatively, I could use a subquery that finds the max salary less than the overall max, which achieves the same result without OFFSET, useful for databases that don't support it well.\"",
      "summary10s": "Distinct + ORDER BY DESC + LIMIT 1 OFFSET 1, or MAX() excluding the top value."
    }
  },
  {
    "id": "what-is-a-consumer-group",
    "category": "Microservices",
    "question": "What is a consumer group?",
    "frequency": 2,
    "companies": [],
    "variations": [
      "What is a Consumer Group?"
    ],
    "answerSEE": {
      "simple": "A consumer group is a set of consumers that work together to consume a topic, with each partition read by only one consumer in the group.",
      "explain": "Enables parallel consumption — each partition assigned to exactly one consumer in the group\nMultiple consumer groups can independently consume the same topic\nIf consumers < partitions, some consumers handle multiple partitions; if consumers > partitions, extras stay idle",
      "example": "\"A consumer group lets multiple consumer instances share the work of processing a topic — Kafka ensures each partition is only read by one consumer within that group at a time, which is what enables safe parallel processing. Different consumer groups are completely independent, so I could have one group processing for real-time updates and another for analytics, both reading the same topic separately.\"",
      "summary10s": "Group of consumers sharing a topic — each partition read by exactly one consumer per group."
    }
  },
  {
    "id": "thread-lifecycle",
    "category": "Java",
    "question": "Thread Lifecycle",
    "frequency": 2,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Thread goes through New, Runnable, Running, Blocked/Waiting, and Terminated states.",
      "explain": "New — thread created but not started\nRunnable — start() called, waiting for CPU\nRunning — CPU assigned, executing\nBlocked or Waiting — waiting for lock or signal\nTerminated — execution complete or exception thrown",
      "example": "\"Thread lifecycle starts at New when created, moves to Runnable after start is called. Scheduler assigns CPU and it moves to Running. If it needs a lock held by another thread it goes to Blocked. After wait or sleep it goes to Waiting. When execution finishes it is Terminated. Understanding this helps debug deadlocks and thread starvation.\"",
      "summary10s": "New → Runnable → Running → Blocked/Waiting → Terminated."
    }
  },
  {
    "id": "producer-consumer-pattern",
    "category": "Java",
    "question": "Producer-Consumer Pattern",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Producer-Consumer Problem and Solutions"
    ],
    "answerSEE": {
      "simple": "Producer adds to shared queue, Consumer takes from it — decoupled by the queue.",
      "explain": "Producer and Consumer run at different speeds — queue acts as buffer\nProducer waits when queue is full, Consumer waits when queue is empty\nIn Java — BlockingQueue handles waiting automatically\nUsed in Kafka, thread pools, task queues everywhere",
      "example": "\"Producer-Consumer decouples the producer from the consumer using a shared queue. Producer puts items in, consumer takes items out. If queue is full producer waits, if empty consumer waits. In Java I use BlockingQueue which handles all the waiting and signaling internally. This pattern is everywhere — Kafka is essentially a distributed Producer-Consumer.\"",
      "summary10s": "Producer adds, Consumer takes, BlockingQueue handles waiting — decoupled by buffer."
    }
  },
  {
    "id": "blockingqueue",
    "category": "Java",
    "question": "BlockingQueue",
    "frequency": 2,
    "companies": [
      "Accenture"
    ],
    "variations": [
      "What is BlockingQueue and real use case?"
    ],
    "answerSEE": {
      "simple": "Thread-safe queue where put blocks when full and take blocks when empty.",
      "explain": "Put — adds item, blocks if queue is at capacity until space available\nTake — removes item, blocks if queue empty until item available\nNo manual wait and notify needed — built in\nTypes — ArrayBlockingQueue fixed size, LinkedBlockingQueue optionally bounded",
      "example": "\"BlockingQueue is the backbone of Producer-Consumer in Java. It handles all the synchronization internally. Producer calls put — if queue is full it blocks automatically. Consumer calls take — if queue is empty it blocks. No manual synchronization needed. I use ArrayBlockingQueue when I want a bounded buffer to apply backpressure on the producer.\"",
      "summary10s": "put blocks when full, take blocks when empty, handles sync automatically."
    }
  },
  {
    "id": "concurrency-vs-parallelism",
    "category": "Java",
    "question": "Concurrency vs Parallelism",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Basics of Concurrency and Why It Matters"
    ],
    "answerSEE": {
      "simple": "Concurrency is dealing with many tasks, Parallelism is doing many tasks at the same time.",
      "explain": "Concurrency — single core switches between tasks rapidly, gives illusion of simultaneous\nParallelism — multiple cores run tasks truly at the same time\nConcurrency is about structure, Parallelism is about execution\nJava achieves both — concurrency via threads, parallelism via multi-core CPU",
      "example": "\"Concurrency means multiple tasks are in progress but not necessarily running at the same instant — like one CPU switching between threads. Parallelism means tasks literally run at the same moment on multiple cores. In Java I write concurrent code and the JVM plus OS decide whether it runs in parallel based on available cores.\"",
      "summary10s": "Concurrency=juggling tasks, Parallelism=doing tasks simultaneously on multiple cores."
    }
  },
  {
    "id": "angular-micro-frontends",
    "category": "Angular",
    "question": "Micro Frontends",
    "frequency": 2,
    "companies": [
      "Virtusa"
    ],
    "variations": [
      "What is Micro Frontend Architecture and why use it in Angular?"
    ],
    "answerSEE": {
      "simple": "Micro Frontends split a large frontend application into smaller, independently deployable pieces, each owned by a different team.",
      "explain": "Each MFE can be built, deployed, and versioned independently\nComposed together at runtime (or build time) into one cohesive application\nCommon implementation: Webpack Module Federation",
      "example": "\"Micro Frontends apply the microservices idea to the frontend — instead of one large monolithic Angular app, we split it into smaller, independently deployable applications, often owned by different teams, and compose them together into a single user experience. I've worked with this using Webpack Module Federation, where a shell application loads remote modules at runtime.\"",
      "summary10s": "Split a large frontend into independently deployable pieces — composed via Module Federation."
    }
  },
  {
    "id": "angular-directives",
    "category": "Angular",
    "question": "What are Directives?",
    "frequency": 2,
    "companies": [
      "Virtusa"
    ],
    "variations": [
      "Structural vs attribute directives"
    ],
    "answerSEE": {
      "simple": "Directives are classes that let you add behavior or modify the DOM structure/appearance of elements.",
      "explain": "Component — a directive with a template (special case)\nStructural — changes DOM layout (*ngIf, *ngFor, @if/@for in new syntax)\nAttribute — changes appearance/behavior of an element (ngClass, ngStyle, custom ones)",
      "example": "\"Directives let me add custom behavior to DOM elements without creating a full component. There are three types — Components, which are really directives with a template; Structural directives like ngIf and ngFor that change the DOM layout by adding or removing elements; and Attribute directives like ngClass or ngStyle that change how an element looks or behaves without altering the DOM structure.\"",
      "summary10s": "3 types: Component, Structural (*ngIf/*ngFor), Attribute (ngClass/ngStyle)."
    }
  },
  {
    "id": "package-json-vs-package-lock-json",
    "category": "Angular",
    "question": "package.json vs package-lock.json",
    "frequency": 2,
    "companies": [],
    "variations": [
      "What is the difference between package.json and package-lock.json?"
    ],
    "answerSEE": {
      "simple": "package.json defines what dependencies you want, package-lock.json records exact versions installed.",
      "explain": "package.json — you write this, lists dependencies with version ranges like caret or tilde\npackage-lock.json — auto-generated, records exact version of every package and sub-dependency\npackage-lock.json ensures same versions installed on every machine and CI\nNever manually edit package-lock.json, always commit it to git",
      "example": "\"package.json is what I write — it lists my dependencies with version ranges. package-lock.json is auto-generated and locks every package to the exact version installed including all transitive dependencies. Without package-lock.json two developers running npm install might get different versions. I always commit package-lock.json to ensure consistent installs across all environments.\"",
      "summary10s": "package.json=version ranges you write, package-lock.json=exact versions auto-generated, commit both."
    }
  },
  {
    "id": "complete-order-of-angular-lifecycle-hooks",
    "category": "Angular",
    "question": "Complete Order of Angular Lifecycle Hooks",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Explain the different phases of the Angular component lifecycle."
    ],
    "answerSEE": {
      "simple": "ngOnChanges → ngOnInit → ngDoCheck → ngAfterContentInit → ngAfterContentChecked → ngAfterViewInit → ngAfterViewChecked → ngOnDestroy.",
      "explain": "ngOnChanges — fires first if @Input changes, receives SimpleChanges\nngOnInit — fires once after first change detection, setup logic here\nngAfterViewInit — view and children rendered, access ViewChild here\nngOnDestroy — cleanup subscriptions and timers",
      "example": "\"The order starts with ngOnChanges if there are Input changes, then ngOnInit for setup. Content hooks fire next — ngAfterContentInit when projected content is ready. Then view hooks — ngAfterViewInit when the component view and all children are fully rendered, this is where I access ViewChild. ngOnDestroy is last — cleanup everything here.\"",
      "summary10s": "Changes→Init→DoCheck→ContentInit→ContentChecked→ViewInit→ViewChecked→Destroy."
    }
  },
  {
    "id": "java-override-static-method",
    "category": "Java",
    "question": "Can a static method be overridden? What actually happens?",
    "frequency": 2,
    "companies": [],
    "variations": [
      "What is method hiding, and how is it different from method overriding?"
    ],
    "answerSEE": {
      "simple": "No, static methods cannot be overridden; they are \"hidden\" instead.",
      "explain": "Static methods are bound to the class at compile time, not to an instance at runtime. If a child class defines a static method with the same signature as the parent, it simply hides the parent's method. Polymorphism (runtime dispatch) does not apply.",
      "example": "\"If both Parent and Child have a `static void show()`, and I do `Parent p = new Child(); p.show();`, it will call the Parent's `show()` method. Because the method is static, the compiler looks at the reference type (`Parent`), completely ignoring the actual object type (`Child`).\"",
      "summary10s": "Static methods belong to the class, so they are resolved at compile time (Method Hiding), not runtime."
    }
  },
  {
    "id": "java-parent-constructor-called-first",
    "category": "Java",
    "question": "Why is the parent constructor called before the child constructor?",
    "frequency": 2,
    "companies": [],
    "variations": [
      "What happens if a child class does not call super() explicitly inside its constructor?"
    ],
    "answerSEE": {
      "simple": "Because a child object relies on the parent's state, so the parent must be fully initialized before the child can safely build on top of it.",
      "explain": "Constructor chaining ensures object integrity. The child class inherits fields and methods from the parent. If the child's constructor runs first and tries to use an inherited field, it would crash or behave unpredictably because the parent hasn't set it up yet. That's why Java inserts an implicit `super()` call at the top.",
      "example": "\"Think of building a house. The parent constructor is the foundation, and the child constructor is the walls. You can't build the walls until the foundation is poured. If my `Manager` class inherits from `Employee`, the `Employee` constructor MUST run first to set up the basic ID and Name before `Manager` sets up the team size.\"",
      "summary10s": "Foundation first. Parent state must be initialized so the child can safely use inherited fields."
    }
  },
  {
    "id": "java-is-a-vs-has-a",
    "category": "Java",
    "question": "What is IS-A vs HAS-A? Why is composition often preferred over inheritance?",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Why is composition generally more flexible than inheritance?"
    ],
    "answerSEE": {
      "simple": "IS-A is inheritance (Car is a Vehicle); HAS-A is composition (Car has an Engine). Composition is more flexible and loosely coupled.",
      "explain": "Inheritance tightly couples the child to the parent, meaning any change in the parent breaks the child (fragile base class problem). Composition (HAS-A) injects dependencies, making it easier to swap out behaviors at runtime, test components in isolation, and avoid deep, rigid class hierarchies.",
      "example": "\"I prefer composition over inheritance to avoid deep hierarchies. Instead of making a `FlyingBird` and `SwimmingBird` inherit from `Bird`, I give a generic `Bird` class a `MovementStrategy` object (HAS-A). This lets me swap behaviors dynamically and keeps my code highly modular and easy to test.\"",
      "summary10s": "IS-A = strict inheritance. HAS-A = composition. Composition avoids fragile, deeply nested class hierarchies."
    }
  },
  {
    "id": "system-design-avoid-inheritance",
    "category": "System Design",
    "question": "Where would you deliberately AVOID inheritance in a real production application, and why?",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Why can excessive inheritance make a system difficult to maintain?"
    ],
    "answerSEE": {
      "simple": "I avoid inheritance when sharing utility methods or when the relationship isn't strictly \"IS-A\", to prevent deep, fragile hierarchies.",
      "explain": "Inheritance violates encapsulation if not designed carefully, causing the \"Fragile Base Class\" problem where a change in the parent breaks all children. I avoid it for code reuse (use composition instead) and avoid deep nesting (more than 2 levels).",
      "example": "\"In production, I strictly avoid creating a massive `BaseController` or `BaseEntity` just to share utility methods like date formatting or validation. It tightly couples unrelated classes and makes unit testing a nightmare. Instead, I inject small, focused utility classes or services using Composition. I only use inheritance when a true, strict 'IS-A' relationship dictates it.\"",
      "summary10s": "Avoid for simple code reuse. Deep hierarchies cause tight coupling and fragile code. Use Composition instead."
    }
  },
  {
    "id": "java-exception-handling-best-practices",
    "category": "Java",
    "question": "Exception Handling Best Practices in Java",
    "frequency": 2,
    "companies": [
      "Zensar Technologies"
    ],
    "variations": [
      "Can we create a custom exception in Java?"
    ],
    "answerSEE": {
      "simple": "Catch the most specific exception first, never swallow exceptions, and use try-with-resources for automatic cleanup.",
      "explain": "Best practices include logging exceptions properly (not just printStackTrace), not catching Exception or Throwable directly unless at the highest level, using custom exceptions for business logic, and failing fast.",
      "example": "\"In my projects, I always use try-with-resources so I don't have to manually close streams in a finally block. I also avoid empty catch blocks—swallowing exceptions makes debugging a nightmare. Instead, I catch specific exceptions like IOException before catching a generic Exception, and I wrap technical exceptions into meaningful custom business exceptions for the frontend.\"",
      "summary10s": "Use try-with-resources, catch specific exceptions first, don't swallow exceptions."
    }
  },
  {
    "id": "longest-substring-without-repe",
    "category": "Java Coding",
    "question": "Longest substring without repeating characters",
    "frequency": 2,
    "companies": [
      "Accenture"
    ],
    "variations": [
      "Longest substring without repeating characters."
    ],
    "answerSEE": {
      "simple": "Use a sliding window with a HashSet (or HashMap of last-seen index) to track characters in the current window.",
      "explain": "Expand the window by moving the right pointer; if a duplicate is found, shrink from the left until the duplicate is removed. Track the max window length seen.\npublic class LongestSubstring {\n    public static int lengthOfLongestSubstring(String s) {\n        Map<Character, Integer> lastIndex = new HashMap<>();\n        int maxLen = 0, left = 0;\n\n        for (int right = 0; right < s.length(); right++) {\n            char c = s.charAt(right);\n            if (lastIndex.containsKey(c) && lastIndex.get(c) >= left) {\n                left = lastIndex.get(c) + 1; // jump left past the duplicate\n            }\n            lastIndex.put(c, right);\n            maxLen = Math.max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(lengthOfLongestSubstring(\"abcabcbb\")); // 3 (\"abc\")\n    }\n}\n",
      "example": "\"I'd use the sliding window technique with a HashMap tracking each character's last seen index. As I expand the window with a right pointer, if I encounter a character already in the map within my current window, I jump the left pointer past that duplicate's previous position instead of moving it one step at a time — that makes it a single O(n) pass instead of a nested-loop O(n squared) brute force.\"",
      "summary10s": "\"Sliding window + HashMap of last-seen index — jump left pointer past duplicates, O(n) single pass.\""
    }
  },
  {
    "id": "what-are-the-java-8-features-you-have-used",
    "category": "Java",
    "question": "What are the Java 8 features you have used?",
    "frequency": 2,
    "companies": [
      "Accenture"
    ],
    "variations": [
      "Key Java 8 features (Streams, Lambdas, Functional interfaces)"
    ],
    "answerSEE": {
      "simple": "I mostly use Streams, Lambdas, Optional, and the new Date/Time API.",
      "explain": "Java 8 changed how we write Java. Streams allow declarative data processing. Lambdas provide concise implementations for functional interfaces. Optional prevents NullPointerExceptions, and the java.time package replaces the old, thread-unsafe Date/Calendar classes.",
      "example": "In my current project, I use Streams heavily to map and filter lists of DTOs. I use Optional as a return type for database queries to force null-checking, and I use the LocalDate API for all timestamp logging because it's thread-safe and immutable.",
      "summary10s": "Streams (processing), Lambdas (concise code), Optional (null-safety), Date/Time API (thread-safe dates)."
    }
  },
  {
    "id": "configure-multiple-databases-in-spring-boot",
    "category": "Spring Boot",
    "question": "Configure Multiple Databases in Spring Boot",
    "frequency": 2,
    "companies": [],
    "variations": [
      "application.properties purpose"
    ],
    "answerSEE": {
      "simple": "Create separate DataSource, EntityManagerFactory, and TransactionManager beans for each database — use @Primary on the main one.",
      "explain": "Each database needs its own DataSource, JPA EntityManagerFactory, and PlatformTransactionManager\n@Primary on the main database beans — default for auto-wiring\n@Qualifier for explicitly selecting the secondary database beans\nSeparate packages for entities of each database — each EntityManagerFactory scans its own package\nSeparate @EnableTransactionManagement and @EnableJpaRepositories per database\nCode:\n// Primary database configuration\n@Configuration\n@EnableTransactionManagement\n@EnableJpaRepositories(\n    basePackages = \"com.app.primary.repository\",\n    entityManagerFactoryRef = \"primaryEntityManagerFactory\",\n    transactionManagerRef = \"primaryTransactionManager\"\n)\npublic class PrimaryDatabaseConfig {\n    \n    @Primary\n    @Bean\n    @ConfigurationProperties(\"spring.datasource.primary\")\n    public DataSource primaryDataSource() {\n        return DataSourceBuilder.create().build();\n    }\n    \n    @Primary\n    @Bean\n    public LocalContainerEntityManagerFactoryBean primaryEntityManagerFactory(\n            @Qualifier(\"primaryDataSource\") DataSource ds,\n            EntityManagerFactoryBuilder builder) {\n        return builder\n            .dataSource(ds)\n            .packages(\"com.app.primary.entity\") // scans only this package\n            .persistenceUnit(\"primary\")\n            .build();\n    }\n    \n    @Primary\n    @Bean\n    public PlatformTransactionManager primaryTransactionManager(\n            @Qualifier(\"primaryEntityManagerFactory\") EntityManagerFactory emf) {\n        return new JpaTransactionManager(emf);\n    }\n}\n\n// Secondary database configuration\n@Configuration\n@EnableJpaRepositories(\n    basePackages = \"com.app.secondary.repository\",\n    entityManagerFactoryRef = \"secondaryEntityManagerFactory\",\n    transactionManagerRef = \"secondaryTransactionManager\"\n)\npublic class SecondaryDatabaseConfig {\n    \n    @Bean\n    @ConfigurationProperties(\"spring.datasource.secondary\")\n    public DataSource secondaryDataSource() {\n        return DataSourceBuilder.create().build();\n    }\n    \n    @Bean\n    public LocalContainerEntityManagerFactoryBean secondaryEntityManagerFactory(\n            @Qualifier(\"secondaryDataSource\") DataSource ds,\n            EntityManagerFactoryBuilder builder) {\n        return builder.dataSource(ds)\n            .packages(\"com.app.secondary.entity\")\n            .persistenceUnit(\"secondary\")\n            .build();\n    }\n    \n    @Bean\n    public PlatformTransactionManager secondaryTransactionManager(\n            @Qualifier(\"secondaryEntityManagerFactory\") EntityManagerFactory emf) {\n        return new JpaTransactionManager(emf);\n    }\n}\n\n// application.properties\n// spring.datasource.primary.url=jdbc:mysql://localhost/primarydb\n// spring.datasource.primary.username=user1\n// spring.datasource.secondary.url=jdbc:postgresql://localhost/secondarydb\n// spring.datasource.secondary.username=user2",
      "example": "\"Multiple databases require separate Spring configuration beans for each. Each database gets its own DataSource, EntityManagerFactory scanning only its own entity package, and TransactionManager. I mark the main database beans with @Primary so they are the default for auto-wiring. The secondary database beans are selected with @Qualifier. The critical part is keeping entity packages strictly separated — each EntityManagerFactory must scan only its own entities otherwise they get confused. Repositories in each package get the right EntityManagerFactory through the @EnableJpaRepositories basePackages configuration.\"",
      "summary10s": "Separate DataSource+EntityManagerFactory+TransactionManager per DB. @Primary on main. @EnableJpaRepositories with basePackages and refs pointing to correct beans. Separate entity packages strictly."
    }
  },
  {
    "id": "crudrepository-vs-jparepository",
    "category": "Spring Boot",
    "question": "CrudRepository vs JpaRepository",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Iterable interface"
    ],
    "answerSEE": {
      "simple": "CrudRepository has basic CRUD, JpaRepository extends it with JPA-specific batch operations and flush control.",
      "explain": "CrudRepository — save, findById, findAll returns Iterable, delete, count, existsById\nPagingAndSortingRepository — adds findAll(Pageable) and findAll(Sort)\nJpaRepository — extends both, adds: deleteInBatch, saveAllAndFlush, getReferenceById, flush\nJpaRepository returns List not Iterable — more convenient for most use cases\nUse JpaRepository always unless explicitly restricting capabilities to callers",
      "example": "\"JpaRepository is the most complete — it extends CrudRepository for basic CRUD and PagingAndSortingRepository for pagination, then adds JPA-specific methods. deleteInBatch sends one DELETE query instead of N individual ones — critical for performance when deleting many records. getReferenceById returns a proxy without a DB hit, useful for setting foreign key relationships without loading the full entity. I always use JpaRepository unless I want to restrict what repository methods are visible to callers.\"",
      "summary10s": "CrudRepository=basic CRUD, PagingAndSorting=adds pagination, JpaRepository=all of above plus deleteInBatch, flush, getReferenceById. Use JpaRepository always."
    }
  },
  {
    "id": "design-patterns-used-in-project",
    "category": "System Design",
    "question": "Design patterns used in the project",
    "frequency": 2,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "What design patterns have you used in real life?",
      "Builder pattern (usage + example)"
    ],
    "answerSEE": {
      "simple": "Singleton for config, Factory for object creation, Strategy for algorithms, Builder for complex objects.",
      "explain": "Singleton: Database connections or Spring Beans (default scope).\nFactory: Creating different types of notification services (Email, SMS) based on input.\nStrategy: Swapping payment methods (CreditCard, PayPal) at runtime.\nBuilder: Constructing complex DTOs with many optional fields.",
      "example": "\"In my project, I used the Factory pattern to instantiate the correct PaymentProcessor based on the user's selected provider. I also extensively used the Builder pattern via Lombok's @Builder to cleanly construct complex API response objects without writing massive constructors.\"",
      "summary10s": "Singleton (Spring Beans), Factory (object creation), Strategy (swappable logic), Builder (complex objects)."
    }
  },
  {
    "id": "hashmap-vs-hashtable",
    "category": "Java",
    "question": "HashMap vs Hashtable",
    "frequency": 2,
    "companies": [
      "Accenture"
    ],
    "variations": [
      "HashMap vs Hashtable vs ConcurrentHashMap"
    ],
    "answerSEE": {
      "simple": "HashMap isn't thread-safe and allows null keys/values; Hashtable is thread-safe (fully synchronized) and doesn't allow nulls.",
      "explain": "- HashMap — not synchronized, allows one null key and multiple null values\n- Hashtable — legacy class, every method synchronized (locks whole map), no nulls allowed\n- HashMap is preferred today; use ConcurrentHashMap instead of Hashtable for thread-safety",
      "example": "\"HashMap isn't thread-safe but allows one null key and multiple null values. Hashtable is an older, legacy class where every method is synchronized, locking the entire map for any operation, and it doesn't allow null keys or values at all. In modern code, I'd never actually use Hashtable — I'd use HashMap for single-threaded contexts or ConcurrentHashMap for thread-safe scenarios instead.\"",
      "summary10s": "\"HashMap = not thread-safe, allows null. Hashtable = fully synchronized (legacy), no nulls.\""
    }
  },
  {
    "id": "virtual-threads",
    "category": "Java",
    "question": "Virtual Threads — Future of Java Concurrency",
    "frequency": 2,
    "companies": [],
    "variations": [
      "How do Virtual Threads (Project Loom) change the traditional \"thread-per-request\" model?"
    ],
    "answerSEE": {
      "simple": "Virtual threads are lightweight JVM-managed threads — create millions without memory issues.",
      "explain": "Platform threads — OS threads, expensive, limited to thousands, each uses 1MB stack\nVirtual threads — JVM managed, very lightweight, millions can exist, mounted on carrier threads\nBlocking in virtual thread — JVM unmounts from carrier thread, carrier handles another virtual thread\nPerfect for IO-bound workloads — no need for async reactive code, write simple blocking code",
      "example": "\"Traditional threads are OS threads — each needs about 1MB stack memory, limited to a few thousand before OOM. Virtual threads from Java 21 are JVM-managed — they are extremely lightweight, millions can exist. When a virtual thread blocks on IO, the JVM unmounts it from the OS thread which then runs another virtual thread. I can write simple blocking code and get throughput of reactive async code. Game changer for web APIs and microservices.\"",
      "summary10s": "Virtual threads=JVM managed, millions lightweight, block unmounts from carrier, simple blocking code with reactive throughput."
    }
  },
  {
    "id": "what-is-kafka-rebalancing",
    "category": "Microservices",
    "question": "What is Kafka Rebalancing?",
    "frequency": 2,
    "companies": [],
    "variations": [
      "What happens during a \"stop-the-world\" Full GC, and why does it spike API latency?"
    ],
    "answerSEE": {
      "simple": "It's the process where Kafka redistributes partitions among consumers in a group when a consumer joins or leaves.",
      "explain": "Rebalancing ensures fair load distribution and high availability. During a rebalance, consumers usually pause processing (stop-the-world) while partitions are reassigned, though newer Kafka versions support Cooperative Rebalancing which minimizes downtime.",
      "example": "\"Rebalancing happens whenever a consumer joins or crashes. Kafka redistributes the partitions among the available consumers in the group. The downside is that historically, rebalancing was a 'stop-the-world' event where all processing paused briefly. It's a necessary mechanism for fault tolerance, but frequent rebalancing causes lag.\"",
      "summary10s": "Redistributing partitions when consumers join or die. Causes brief processing pauses."
    }
  },
  {
    "id": "java-hashmap-internal-working",
    "category": "Java",
    "question": "How HashMap works internally",
    "frequency": 2,
    "companies": [],
    "variations": [
      "How does \"HashMap\" work internally, and what happens when two keys share the same hashcode?"
    ],
    "answerSEE": {
      "simple": "It uses an array of Nodes (buckets) and a hashing algorithm to compute the index. On collision, it uses a LinkedList, which upgrades to a Red-Black tree.",
      "explain": "When you put(K, V), it calculates `hash(K) % capacity` to find the bucket index. If the bucket is empty, it stores it. If occupied (collision), it appends to a LinkedList. In Java 8+, if the LinkedList exceeds 8 elements, it transforms into a Red-Black Tree to optimize search time from O(N) to O(log N).",
      "example": "\"I explain it like an array of linked lists. You hash the key to find the array slot. If two keys hash to the same slot, they form a chain. To keep performance at O(1), HashMap automatically resizes (doubles capacity) when it gets 75% full (load factor), re-hashing everything.\"",
      "summary10s": "Array of buckets. Hashing finds index. Collisions use LinkedLists (or Red-Black trees in Java 8+)."
    }
  },
  {
    "id": "dsa-reverse-array",
    "category": "Java Coding",
    "question": "Reverse array.",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Reverse an array \"[1, 2, 3, 4, 5]\"."
    ],
    "answerSEE": {
      "simple": "Use two pointers, one at the start and one at the end, and swap them until they meet in the middle.",
      "explain": "Initialize `left = 0` and `right = array.length - 1`. While `left < right`, swap the elements at those indices and move both pointers inward. This is an optimal in-place algorithm running in O(N) time and O(1) space.",
      "example": "\"I initialize a start pointer at 0 and an end pointer at the last index. I swap their values, then do `start++` and `end--`. I repeat this in a while loop until start is no longer less than end. It's in-place and optimal.\"",
      "summary10s": "Two pointers (start/end). Swap and converge to the middle. O(N) time, O(1) space."
    }
  },
  {
    "id": "spring-exception-handling-controllers",
    "category": "Spring Boot",
    "question": "Exception handling in controllers",
    "frequency": 2,
    "companies": [],
    "variations": [
      "How do you implement exception handling in a Spring Boot project?"
    ],
    "answerSEE": {
      "simple": "Use @RestControllerAdvice to handle exceptions globally across all controllers.",
      "explain": "Instead of putting try-catch blocks in every controller method, you create a central class annotated with @RestControllerAdvice. Inside, you define methods annotated with @ExceptionHandler(SpecificException.class) to catch errors and return consistent JSON error formats.",
      "example": "\"If my service throws a `UserNotFoundException`, it bubbles up out of the controller. My global `@RestControllerAdvice` class intercepts it using an `@ExceptionHandler`, wraps the error message in a standard `ApiError` DTO, and returns it with a 404 HTTP status code. It keeps my controllers completely clean.\"",
      "summary10s": "@RestControllerAdvice acts as a global try-catch for the entire application."
    }
  },
  {
    "id": "coding-first-non-repeating-character-stream",
    "category": "Java Coding",
    "question": "Find the first non-repeating character using Java 8 Streams",
    "frequency": 2,
    "companies": [
      "EPAM"
    ],
    "variations": [
      "Find the first non-repeating character in a string."
    ],
    "answerSEE": {
      "simple": "Convert string to chars, group by character counting occurrences using LinkedHashMap, then find the first entry with a count of 1.",
      "explain": "Use str.chars().mapToObj(c -> (char) c).collect(Collectors.groupingBy(Function.identity(), LinkedHashMap::new, Collectors.counting())). LinkedHashMap maintains insertion order. Then stream the map entries to find the first one with value == 1.",
      "example": "\"I'd first convert the string to a Stream of Characters. Then I'd use groupingBy to count the occurrences of each character, explicitly providing a LinkedHashMap supplier so the original string order is preserved. Finally, I'd stream that LinkedHashMap's entry set, filter for a value of 1, and return the first match using findFirst().\"",
      "summary10s": "groupingBy into LinkedHashMap to keep order, filter count == 1, findFirst()."
    }
  },
  {
    "id": "filter-vs-interceptor",
    "category": "Spring Boot",
    "question": "Filter vs Interceptor.",
    "frequency": 2,
    "companies": [],
    "variations": [
      "What is HttpClient and how do you use interceptors?"
    ],
    "answerSEE": {
      "simple": "Filters are part of the Java Servlet spec and run before the request reaches Spring. Interceptors are part of Spring MVC and run after the request enters Spring's context.",
      "explain": "Filters execute outside the DispatcherServlet, making them ideal for security, logging, or modifying the raw request/response. Interceptors execute inside the DispatcherServlet, so they have access to the actual Controller and Method being called.",
      "example": "\"Filters run at the web server level before Spring even knows about the request, so I use them for global things like CORS or Spring Security. Interceptors belong to Spring MVC, so they can see which Controller method is about to be executed. I use interceptors when I need to do something specific to my application logic, like checking a custom @Audit annotation on a controller method.\"",
      "summary10s": "Filter = Servlet spec, runs before Spring. Interceptor = Spring MVC, runs right before Controller."
    }
  },
  {
    "id": "spring-boot-production-mistakes",
    "category": "Spring Boot",
    "question": "What Spring Boot mistakes commonly cause production performance issues?",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Why can an N+1 query problem remain hidden even when using JPA repositories?"
    ],
    "answerSEE": {
      "simple": "N+1 query problems in JPA, blocking threads in reactive setups, or relying on default connection pool sizes under heavy load.",
      "explain": "Common issues include: 1) JPA N+1 fetching massive amounts of data lazily inside a loop. 2) Leaving the default Tomcat thread pool (200) or HikariCP connection pool (10) when traffic requires tuning. 3) Accidentally caching too much in memory without eviction policies.",
      "example": "\"The most common performance killer I've seen is the N+1 query problem using Spring Data JPA, where lazy loading inside a loop triggers thousands of DB queries. Another mistake is forgetting to tune HikariCP. The default pool size of 10 is great for dev, but in a high-throughput production environment, it often causes request queuing.\"",
      "summary10s": "JPA N+1 query problem, untuned HikariCP connection pools, and blocking operations."
    }
  },
  {
    "id": "what-is-the-volatile-keyword",
    "category": "Java",
    "question": "What is the volatile keyword?",
    "frequency": 2,
    "companies": [
      "Accenture"
    ],
    "variations": [
      "What happens to an in-flight request when a Spring Boot application receives a shutdown signal?"
    ],
    "answerSEE": {
      "simple": "volatile ensures every thread sees the most recent value of a variable, bypassing CPU-level caching.",
      "explain": "- Forces reads/writes to go directly to main memory\n- Doesn't make compound operations (like `count++`) atomic\n- Commonly used for simple flags (e.g., a shutdown signal read by multiple threads)",
      "example": "\"volatile guarantees that when one thread updates a variable, other threads immediately see the latest value, since it bypasses CPU caching. It doesn't make an operation like count++ atomic though, since that's still a read-modify-write sequence. I typically use it for simple flags, like a boolean shutdown signal that multiple threads check.\"",
      "summary10s": "\"Ensures visibility across threads — not atomicity. Good for simple flags.\""
    }
  },
  {
    "id": "java-checked-vs-unchecked-exceptions",
    "category": "Java",
    "question": "What is the difference between Checked and Unchecked Exceptions?",
    "frequency": 2,
    "companies": [],
    "variations": [
      "Why can @Transactional behave differently for checked and unchecked exceptions?"
    ],
    "answerSEE": {
      "simple": "Checked exceptions are checked at compile-time and must be handled; unchecked exceptions happen at runtime and don't force handling.",
      "explain": "Checked exceptions (like IOException) inherit from Exception and force you to write try-catch or throws. Unchecked exceptions (like NullPointerException) inherit from RuntimeException, usually indicating programming errors rather than expected system failures.",
      "example": "\"If I read a file, Java forces me to handle IOException (checked) because a file might legitimately not exist. But Java doesn't force me to wrap every array access in a try-catch for ArrayIndexOutOfBounds (unchecked), because I should just write better logic to prevent that.\"",
      "summary10s": "Checked = compiler forces try-catch (IOException). Unchecked = RuntimeException, programming errors (NPE)."
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
  },
  {
    "id": "springapplication-run-behind-scenes",
    "category": "Spring Boot",
    "question": "What happens after SpringApplication.run() is called?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Spring Boot sets up the ApplicationContext, triggers auto-configuration, starts the embedded server, and loads beans.",
      "explain": "When you call run(), Spring Boot creates the appropriate ApplicationContext (web or standard). It then registers a ShutdownHook, parses application.properties, runs ComponentScan and AutoConfiguration, and finally starts the embedded Tomcat/Jetty before triggering any ApplicationRunners.",
      "example": "\"When I call SpringApplication.run(), Spring bootstraps the entire environment. It first creates the ApplicationContext, then evaluates all the auto-configuration rules. After wiring up the beans, it fires up the embedded Tomcat server so the app is ready to accept requests without any manual server configuration on my part.\"",
      "summary10s": "Creates context -> Loads properties -> Scans/Auto-configures beans -> Starts embedded server."
    }
  },
  {
    "id": "springbootapplication-annotations",
    "category": "Spring Boot",
    "question": "How does @SpringBootApplication combine multiple annotations?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "@SpringBootApplication is a convenience annotation that combines @Configuration, @EnableAutoConfiguration, and @ComponentScan.",
      "explain": "@Configuration tags the class as a source of bean definitions. @EnableAutoConfiguration tells Spring Boot to guess and configure beans based on classpath. @ComponentScan tells Spring to look for other components, configurations, and services in the current package and its sub-packages.",
      "example": "\"Instead of writing three separate annotations, I just put @SpringBootApplication on my main class. It automatically enables component scanning in my base package, marks the class as a configuration source, and turns on Spring Boot's auto-configuration magic all at once.\"",
      "summary10s": "It combines @Configuration, @EnableAutoConfiguration, and @ComponentScan."
    }
  },
  {
    "id": "spring-boot-highest-priority-config",
    "category": "Spring Boot",
    "question": "Which configuration source gets the highest priority?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Command-line arguments have the highest priority, followed by OS environment variables, then application properties.",
      "explain": "Spring Boot loads properties in a very specific order. If a property is defined in multiple places, command-line arguments override everything else. After that, environment variables are checked, followed by profile-specific application-{profile}.properties, and finally the default application.properties.",
      "example": "\"If I want to quickly override a database URL for a single run without changing code, I pass it as a command-line argument like `--spring.datasource.url=...`. Because command-line args have the highest priority in Spring Boot's PropertyResolver, it easily overrides whatever is in application.yml.\"",
      "summary10s": "Command-line args > Env variables > Profile properties > Default properties."
    }
  },
  {
    "id": "embedded-tomcat-detection",
    "category": "Spring Boot",
    "question": "How is embedded Tomcat detected and started?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Spring Boot checks the classpath for Tomcat libraries; if found, it auto-configures a ServletWebServerFactory to start it.",
      "explain": "If you include `spring-boot-starter-web`, it transitively pulls in Tomcat dependencies. During startup, `@EnableAutoConfiguration` detects `Tomcat.class` on the classpath. It then creates a `TomcatServletWebServerFactory` bean which programmatically configures and starts the Tomcat server.",
      "example": "\"I don't have to install Tomcat on my machine. Just by having `spring-boot-starter-web` in my POM, the Tomcat jars are on the classpath. Spring Boot's auto-configuration sees them, creates a server factory bean, and programmatically starts Tomcat on port 8080 during application startup.\"",
      "summary10s": "Auto-configuration detects Tomcat on the classpath and programmatically starts it via a WebServerFactory."
    }
  },
  {
    "id": "configuration-vs-component",
    "category": "Spring Boot",
    "question": "What is the difference between @Configuration and a regular class with @Component?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "@Configuration guarantees that bean methods are intercepted to return a singleton, whereas @Component does not.",
      "explain": "If a class is annotated with @Configuration, Spring wraps it with a CGLIB proxy. This means if you call a @Bean method directly from another @Bean method within the same class, Spring intercepts the call and returns the cached singleton instance. With @Component, calling a method directly returns a brand new instance.",
      "example": "\"If I have a @Bean method `dataSource()` and another @Bean method `jdbcTemplate()` that calls `dataSource()`, I must put them in a @Configuration class. The proxy ensures `jdbcTemplate` gets the exact same DataSource singleton. If I used @Component instead, it would instantiate a second DataSource, which is a subtle bug.\"",
      "summary10s": "@Configuration uses CGLIB proxying to ensure @Bean method calls always return singletons."
    }
  },
  {
    "id": "spring-boot-choose-server-port",
    "category": "Spring Boot",
    "question": "How does Spring Boot choose the server port?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "It defaults to 8080, but can be overridden by the server.port property or set to 0 for a random port.",
      "explain": "Spring Boot reads `server.port` from the environment. If it's not set, it defaults to 8080. If you set `server.port=0`, Spring Boot will scan for a random available port at startup, which is highly useful for parallel integration testing to avoid port binding conflicts.",
      "example": "\"Normally it runs on 8080, but I usually change it via `server.port=8081` in application.yml. When I write integration tests using `@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)`, Spring Boot sets the port to 0 under the hood, ensuring my tests don't fail if port 8080 is already in use.\"",
      "summary10s": "Defaults to 8080. Can be overridden in properties or set to 0 for a random free port."
    }
  },
  {
    "id": "spring-mvc-request-flow",
    "category": "Spring Boot",
    "question": "What happens from the moment a REST request reaches the application?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The request hits Tomcat, goes to the DispatcherServlet, gets routed to a Controller, and the response is serialized back.",
      "explain": "1. Embedded Tomcat receives the HTTP request.\n2. Filters (like Security) intercept it.\n3. DispatcherServlet takes over and consults the HandlerMapping.\n4. The matching @RestController method executes.\n5. The returned object is converted to JSON via HttpMessageConverter (Jackson).\n6. The JSON is written back to the HTTP response.",
      "example": "\"First, the embedded Tomcat intercepts the incoming request and passes it through any configured Filters. Then, Spring's DispatcherServlet takes it, finds the right controller method using HandlerMapping, executes my business logic, and finally Jackson kicks in via HttpMessageConverter to serialize my returned DTO into a JSON response.\"",
      "summary10s": "Tomcat -> Filters -> DispatcherServlet -> HandlerMapping -> Controller -> HttpMessageConverter (JSON) -> Response."
    }
  },
  {
    "id": "spring-request-mapping-internals",
    "category": "Spring Boot",
    "question": "How does Spring map a request to the correct controller method?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The DispatcherServlet uses a HandlerMapping to match the URL and HTTP method to a specific controller method.",
      "explain": "At startup, Spring scans all classes annotated with @Controller or @RestController. It looks at @RequestMapping (or @GetMapping, etc.) and registers the URLs in a RequestMappingHandlerMapping registry. When a request arrives, the DispatcherServlet looks up the URL in this registry to find the exact method to invoke.",
      "example": "\"When the application starts, Spring builds an in-memory map of all my @GetMapping and @PostMapping paths using RequestMappingHandlerMapping. Later, when a request hits the DispatcherServlet, it simply looks up the exact URL and HTTP method in that map, finds my target controller method, and executes it via reflection.\"",
      "summary10s": "DispatcherServlet looks up the URL and HTTP method in the HandlerMapping registry built at startup."
    }
  },
  {
    "id": "spring-boot-json-serialization",
    "category": "Spring Boot",
    "question": "How does Spring Boot serialize Java objects into JSON?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "It uses the Jackson library and HttpMessageConverters automatically behind the scenes.",
      "explain": "When a @RestController method returns an object, Spring looks for an appropriate HttpMessageConverter. Since `spring-boot-starter-web` includes Jackson by default, Spring Boot auto-configures a MappingJackson2HttpMessageConverter, which takes the returned Java object and serializes it into a JSON string.",
      "example": "\"I don't have to manually write JSON conversion code. Because I use @RestController, Spring knows it needs to write the return value to the response body. It loops through its registered HttpMessageConverters, picks the Jackson converter because it supports JSON, and Jackson automatically maps my object's getters to JSON properties.\"",
      "summary10s": "Uses Jackson via MappingJackson2HttpMessageConverter configured automatically by the web starter."
    }
  },
  {
    "id": "spring-boot-datasource-autoconfig",
    "category": "Spring Boot",
    "question": "How does Spring Boot create a DataSource automatically?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "DataSourceAutoConfiguration checks the classpath for database drivers and reads your properties to build a connection pool.",
      "explain": "If `spring-jdbc` and a driver (like HikariCP or PostgreSQL) are on the classpath, the `DataSourceAutoConfiguration` triggers. It reads `spring.datasource.url`, `username`, and `password` from application properties. It then instantiates and configures a connection pool (HikariCP by default) as a Spring bean.",
      "example": "\"As long as I include `spring-boot-starter-data-jpa` and a PostgreSQL driver in my dependencies, Spring Boot's auto-configuration detects them. It automatically reads my database credentials from application.yml and spins up a HikariCP connection pool, exposing it as a DataSource bean that my repositories can use instantly.\"",
      "summary10s": "DataSourceAutoConfiguration detects drivers on classpath, reads properties, and creates a HikariCP connection pool bean."
    }
  },
  {
    "id": "spring-data-exception-translation",
    "category": "Spring Boot",
    "question": "How does exception translation work in Spring Data?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Spring Data catches database-specific SQL exceptions and converts them into Spring's standard DataAccessException hierarchy.",
      "explain": "Instead of throwing a vendor-specific SQLException (like a Postgres constraint violation), Spring intercepts it using AOP (PersistenceExceptionTranslationPostProcessor). It maps the vendor error code to a generic, unchecked Spring DataAccessException, shielding your application from database-specific error handling.",
      "example": "\"If I switch from Oracle to PostgreSQL, I don't have to rewrite my error handling. Spring Data uses a PersistenceExceptionTranslator to catch the raw SQL exceptions and convert them into a uniform `DataIntegrityViolationException`. This keeps my business logic decoupled from the underlying database vendor.\"",
      "summary10s": "AOP catches raw SQLExceptions and maps them to Spring's vendor-agnostic DataAccessException hierarchy."
    }
  },
  {
    "id": "actuator-health-metrics",
    "category": "Spring Boot",
    "question": "How does Actuator expose health and metrics endpoints?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Actuator auto-configures web endpoints under `/actuator` to expose operational data from internal Spring beans like HealthIndicators and MeterRegistries.",
      "explain": "By adding `spring-boot-starter-actuator`, auto-configuration registers specific endpoints. The `/health` endpoint aggregates statuses from various `HealthIndicator` beans (like DB, Disk, Redis). The `/metrics` endpoint pulls data from Micrometer's `MeterRegistry`.",
      "example": "\"I use Actuator for monitoring. Just adding the dependency exposes endpoints like `/actuator/health`. Under the hood, Spring Boot aggregates data from `HealthIndicator` beans—so if my DB goes down, the health endpoint automatically reflects that. I also hook the `/actuator/prometheus` endpoint into our monitoring stack.\"",
      "summary10s": "Auto-configures endpoints under `/actuator` that read from HealthIndicator beans and Micrometer metrics."
    }
  },
  {
    "id": "dependency-management-bom",
    "category": "Spring Boot",
    "question": "How are dependency versions managed without specifying each version?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Spring Boot uses a BOM (Bill of Materials) via `spring-boot-dependencies` to enforce compatible versions for hundreds of libraries.",
      "explain": "When you inherit from `spring-boot-starter-parent` (or use the dependency management plugin), you inherit a giant `<dependencyManagement>` section. This BOM explicitly defines the exact version of Jackson, Hibernate, Tomcat, etc., that have been tested to work together with that specific Spring Boot version.",
      "example": "\"I never specify versions for things like Jackson or Hibernate in my pom.xml. Because I use `spring-boot-starter-parent`, Spring Boot's BOM (Bill of Materials) automatically provides the correct, tested version for all those dependencies, completely eliminating dependency hell and version conflicts.\"",
      "summary10s": "Uses a BOM (spring-boot-dependencies) that dictates compatible versions for all common libraries."
    }
  },
  {
    "id": "spring-boot-executable-jar",
    "category": "Spring Boot",
    "question": "What is inside an executable or \"fat\" JAR?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "A fat JAR contains your application classes, all third-party dependency JARs, and an embedded server, plus Spring Boot's custom classloader.",
      "explain": "Normally, Java doesn't allow JARs nested inside a JAR. Spring Boot solves this via the `spring-boot-loader`. The fat JAR contains your `.class` files in `BOOT-INF/classes`, all your Maven dependencies in `BOOT-INF/lib`, and Spring's custom `JarLauncher` at the root to load everything into memory and start the app.",
      "example": "\"When I run `mvn clean package`, the Spring Boot plugin bundles everything into a single fat JAR. If I unzip it, I see `BOOT-INF/classes` for my code and `BOOT-INF/lib` containing every dependency, including Tomcat. The JAR's manifest points to `JarLauncher`, a custom classloader that makes running nested JARs possible.\"",
      "summary10s": "Contains your code, all dependencies (including embedded server), and a custom classloader (JarLauncher)."
    }
  },
  {
    "id": "debug-slow-starting-spring-boot",
    "category": "Spring Boot",
    "question": "How would you debug a slow-starting Spring Boot application?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "I would use Spring Boot's Startup Tracking feature or enable debug logging to find the bottleneck.",
      "explain": "You can enable Spring Boot's `ApplicationStartup` tracking (via `BufferingApplicationStartup`) to record time taken by bean instantiation and post-processing. Additionally, setting `logging.level.org.springframework=DEBUG` helps see which components or auto-configurations are hanging.",
      "example": "\"If an application takes 60 seconds to start, I don't guess. I set `SpringApplication.setApplicationStartup(new BufferingApplicationStartup())` and expose the `/actuator/startup` endpoint. This gives me a timeline of exactly which beans took the longest to instantiate. Often, it's a slow database connection pool init or a huge classpath scan.\"",
      "summary10s": "Use BufferingApplicationStartup and the /actuator/startup endpoint to see exactly which beans are slow."
    }
  },
  {
    "id": "multiple-threads-modify-same-arraylist",
    "category": "Java",
    "question": "What happens when multiple threads modify the same ArrayList?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "It causes a race condition leading to data corruption, lost updates, or a ConcurrentModificationException.",
      "explain": "ArrayList is not thread-safe. If one thread is adding an element while another is reading or writing, the internal state (like the size or array index) can get out of sync. This often results in `ArrayIndexOutOfBoundsException` or silent data loss. If one thread iterates while another modifies, it throws `ConcurrentModificationException`.",
      "example": "\"In a previous project, we accidentally shared a simple ArrayList across multiple request threads to track user sessions. Randomly, we started losing session data and seeing ArrayIndexOutOfBoundsExceptions. We fixed it by switching to a thread-safe `CopyOnWriteArrayList`.\"",
      "summary10s": "ArrayList is not thread-safe. Use CopyOnWriteArrayList or Collections.synchronizedList instead."
    }
  },
  {
    "id": "java-thread-gets-blocked",
    "category": "Java",
    "question": "What actually happens when a Java thread gets blocked?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The thread's state changes to BLOCKED, and the OS suspends it, putting it in a waiting queue until a lock or resource becomes available.",
      "explain": "When a thread encounters a `synchronized` block that is already held by another thread, or it waits for an I/O operation (like reading a file or a database query), the JVM notifies the OS. The OS performs a context switch, removing the thread from the CPU and placing it in a blocked queue. This wastes time and resources because the thread sits idle taking up memory.",
      "example": "\"When I used a synchronous HTTP client to call a slow external API, the executing thread got blocked waiting for the network response. It sat in the BLOCKED state, consuming around 1MB of memory and doing nothing. This is why I prefer non-blocking async clients like WebClient for heavy I/O.\"",
      "summary10s": "The OS suspends the thread, triggering a context switch. It waits idle, wasting memory."
    }
  },
  {
    "id": "thread-pool-exhausted",
    "category": "Java",
    "question": "What happens when a thread pool becomes exhausted?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "New tasks are queued up. If the queue is also full, the pool rejects the tasks, often throwing a RejectedExecutionException.",
      "explain": "A ThreadPoolExecutor has a core pool size, a max pool size, and a work queue. If all threads are busy, new tasks go to the queue. If the queue fills up, it creates new threads up to the max size. If the max size is reached and the queue is full, the defined `RejectedExecutionHandler` kicks in (default is throwing `RejectedExecutionException`).",
      "example": "\"During a flash sale, our Tomcat server received thousands of concurrent requests. Our thread pool hit its max size of 200, and the queue filled up. The application suddenly started returning 503 Service Unavailable errors because Tomcat began rejecting new connections due to thread exhaustion.\"",
      "summary10s": "Tasks queue up -> queue fills -> max threads reached -> throws RejectedExecutionException."
    }
  },
  {
    "id": "api-creates-too-many-threads",
    "category": "Java",
    "question": "What happens when an API creates too many threads under heavy traffic?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "It leads to CPU thrashing due to excessive context switching, and can cause OutOfMemoryErrors since each thread takes memory.",
      "explain": "Each Java thread consumes about 1MB of heap/stack memory. If you spawn 2,000 threads, that's 2GB gone just for thread overhead. Furthermore, the CPU spends more time switching context between threads than actually executing code, bringing the entire application to a crawl.",
      "example": "\"I saw a bug where a developer spawned a `new Thread()` for every incoming request instead of using a pool. Under heavy traffic, the server tried to create thousands of threads, leading to an immediate `OutOfMemoryError: unable to create new native thread`, and the application crashed entirely.\"",
      "summary10s": "Context switching kills CPU performance, and thread stack overhead causes OutOfMemoryError."
    }
  },
  {
    "id": "too-many-database-connections-slow-app",
    "category": "Java",
    "question": "Why can too many database connections slow down the application?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Databases have limited resources. Too many connections cause severe contention for CPU and memory on the DB server, leading to slow queries.",
      "explain": "Every database connection is a heavy OS process (especially in PostgreSQL). If you open 500 connections, the DB server spends all its time managing those connections and locking resources rather than executing queries. This is called connection thrashing. A small, optimized pool (e.g., 10-20 connections) actually performs better.",
      "example": "\"We once increased our HikariCP pool size to 200 to handle more traffic, but performance actually plummeted. The database CPU spiked to 100% just from managing connection context switches. We lowered the pool size back to 20, and the throughput ironically doubled because the DB could actually focus on running queries.\"",
      "summary10s": "Causes DB connection thrashing. Small connection pools (e.g., 10-20) are universally faster."
    }
  },
  {
    "id": "app-slow-even-when-cpu-low",
    "category": "Java",
    "question": "Why can an application be slow even when CPU usage is low?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The application is likely blocked waiting on external I/O, database queries, or a lock, rather than doing actual computations.",
      "explain": "Low CPU usage with slow performance indicates a bottleneck elsewhere. Threads might be waiting for a slow network API, a slow database query, reading a massive file from disk, or blocked behind a `synchronized` lock. Since they are just waiting (BLOCKED or WAITING state), they aren't using the CPU.",
      "example": "\"We had an API taking 5 seconds to respond, but server CPU was at 2%. Using a thread dump, I discovered that all worker threads were blocked waiting on a third-party payment gateway that was experiencing latency. The app was slow, but the CPU was perfectly fine because it was just waiting on I/O.\"",
      "summary10s": "Threads are in a WAITING or BLOCKED state, waiting on slow DBs, APIs, or locks."
    }
  },
  {
    "id": "exception-swallowed-silently",
    "category": "Java",
    "question": "What happens when an exception is swallowed silently?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The application enters an invalid state, but execution continues, making the root cause almost impossible to debug later.",
      "explain": "Swallowing an exception (catching it with an empty catch block or just logging without re-throwing) breaks the fail-fast principle. The program thinks the operation succeeded, but data might not have been saved or variables might be null. This leads to bizarre bugs (like NullPointerExceptions) much later in the code flow.",
      "example": "\"A developer caught an `IOException` during file processing and left the catch block empty. Later, the program threw a NullPointerException because the file data was missing. I spent hours debugging the NPE before realizing the actual error happened silently 10 steps earlier. Never swallow exceptions!\"",
      "summary10s": "Hides the root cause, causes bizarre cascading bugs later in the execution flow."
    }
  },
  {
    "id": "excessive-logging-impact-performance",
    "category": "Java",
    "question": "Why can excessive logging impact production performance?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Writing to a file is a slow I/O operation. Synchronous logging blocks the application thread until the log is written.",
      "explain": "If you log heavily (especially DEBUG or TRACE levels in production), every logging statement forces a thread to wait for disk I/O. Furthermore, generating complex log strings (like serializing large objects) consumes CPU and memory, triggering more Garbage Collection pauses.",
      "example": "\"In a high-throughput microservice, a developer accidentally left DEBUG logging on in production. The application's latency spiked by 400ms because hundreds of threads were bottlenecked trying to write massive JSON payloads to a single log file synchronously. Switching to INFO level and using AsyncAppender fixed it instantly.\"",
      "summary10s": "Disk I/O is slow. Synchronous logging blocks threads and creates string garbage."
    }
  },
  {
    "id": "investigate-random-api-latency",
    "category": "Java",
    "question": "How would you investigate random API latency in a Java service?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Check APM tools for DB/Network latency, review GC logs for \"Stop the World\" pauses, and check for thread pool exhaustion.",
      "explain": "If latency is random, it's usually one of three things: 1) Major Garbage Collection pauses freezing the JVM. 2) Intermittent slow database queries or connection pool exhaustion (threads waiting for a DB connection). 3) A noisy neighbor on the network or physical host.",
      "example": "\"Whenever I see random latency spikes, my first stop is the GC logs or an APM tool like New Relic. Once, an API would randomly take 3 seconds to respond. The GC logs showed that a 'Stop the World' full garbage collection was happening exactly at those times because we had a memory leak slowly filling the old generation.\"",
      "summary10s": "Look for GC 'Stop the World' pauses, DB connection pool contention, or slow external APIs."
    }
  },
  {
    "id": "10-minutes-to-debug-production-performance",
    "category": "Java",
    "question": "You have 10 minutes to debug a production Java performance issue. What's your first move?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "I immediately check monitoring dashboards (CPU, Memory, DB load) and take a Thread Dump and a Heap Dump before restarting the app.",
      "explain": "You must capture the state of the JVM while it's struggling. A Thread Dump (using `jstack`) will instantly tell me if threads are blocked on locks, waiting for a database connection, or stuck in an infinite loop. A Heap Dump (using `jmap`) lets me analyze memory leaks offline.",
      "example": "\"My absolute first move is checking Grafana to see if CPU or Memory is spiking. If CPU is fine but the app is unresponsive, I immediately run `jstack` to capture a thread dump. Usually, it instantly reveals that 200 threads are BLOCKED waiting for a response from a down downstream service, telling me exactly where to look.\"",
      "summary10s": "Check metrics, capture a Thread Dump (for blocked threads), and capture a Heap Dump."
    }
  },
  {
    "id": "java-equals-vs-equals-method",
    "category": "Java",
    "question": "== vs equals()",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "== compares object references (memory address); equals() compares logical/content equality.",
      "explain": "== — true only if both variables point to the exact same object\nequals() — default is same as ==, but classes like String override it to compare actual content\nCustom classes must override equals() to define what \"equal\" means for them",
      "example": "\"== checks if two references point to the exact same object in memory. equals() is meant for logical equality — String overrides it to compare actual character content instead of memory address. For my own custom classes, I override equals() when I need two different objects to be considered equal based on their field values, like two Employee objects with the same ID.\"",
      "summary10s": "== compares references, equals() compares content (if overridden)."
    }
  },
  {
    "id": "find-second-highest-salary-streams",
    "category": "Java Coding",
    "question": "Find second-highest salary using Streams",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Sort in descending order, skip the first, and get the next one.",
      "explain": "Use distinct() to handle possible duplicate top salaries, then sort descending, skip one, and take the first.",
      "example": "\"I'd extract just the salaries, apply distinct() to handle duplicate top salaries correctly, sort them in descending order, skip the first one, and take the next — that gives me the second-highest. Using distinct() is important, otherwise two employees with the same highest salary would break the logic.\"",
      "summary10s": "distinct() + sorted(reverseOrder) + skip(1) + findFirst() = second-highest."
    }
  },
  {
    "id": "java-hashset-vs-treeset",
    "category": "Java",
    "question": "HashSet vs TreeSet",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "HashSet gives fast, unordered unique elements; TreeSet gives sorted unique elements.",
      "explain": "HashSet — backed by HashMap, O(1) average lookup, no ordering guarantee\nTreeSet — backed by a Red-Black Tree, keeps elements sorted, O(log n) operations\nTreeSet requires elements to be Comparable or a Comparator provided",
      "example": "\"HashSet gives me fast, average O(1) lookups but no guaranteed order. TreeSet keeps elements sorted automatically, backed by a Red-Black Tree, but operations are O(log n), slightly slower. I use HashSet by default for uniqueness, and switch to TreeSet only when I actually need the elements sorted, like maintaining a leaderboard.\"",
      "summary10s": "HashSet = fast, unordered. TreeSet = sorted, O(log n)."
    }
  },
  {
    "id": "bean-vs-component",
    "category": "Spring Boot",
    "question": "@Bean vs @Component",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "@Component is for classes you write; @Bean is for objects you configure manually, often from external libraries.",
      "explain": "@Component — class-level, auto-detected via component scanning\n@Bean — method-level, used inside @Configuration classes, gives more control",
      "example": "\"@Component is a class-level annotation Spring auto-detects through component scanning. @Bean is used inside a @Configuration class on a method, giving more manual control — especially useful for registering a bean for a third-party class where I can't add annotations directly.\"",
      "summary10s": "@Component = your class, @Bean = manual method-based registration."
    }
  },
  {
    "id": "synchronous-vs-asynchronous-communication",
    "category": "Microservices",
    "question": "Synchronous vs Asynchronous communication",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Synchronous waits for an immediate response; Asynchronous fires a message and continues without waiting.",
      "explain": "Sync — REST/gRPC, needed when an immediate response/result is required\nAsync — Kafka/RabbitMQ, decoupled, better for events that don't need instant handling\nAsync improves resilience — a slow consumer doesn't block the producer",
      "example": "\"Synchronous communication, like REST, waits for an immediate response, which is simple but tightly couples the caller to the callee's availability. Asynchronous communication, like Kafka, lets a service fire an event and move on, which decouples services and makes the system more resilient to a downstream service being slow or down. I use sync for direct queries and async for events like order status updates.\"",
      "summary10s": "Sync = REST/gRPC (waits), Async = Kafka/RabbitMQ (fire and continue)."
    }
  },
  {
    "id": "how-do-you-handle-service-failure",
    "category": "Microservices",
    "question": "How do you handle service failure?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Use timeouts, retries with backoff, circuit breakers, and fallback responses.",
      "explain": "Set explicit timeouts so a slow service doesn't hang the caller\nRetry with exponential backoff for transient failures\nCircuit breaker (Resilience4j) to stop calling a consistently failing service, with a fallback",
      "example": "\"I handle service failure with a layered approach — set explicit timeouts so a slow downstream call doesn't hang the caller, retry transient failures with exponential backoff, and use a circuit breaker like Resilience4j to stop hammering a service that's consistently failing, falling back to a default response or cached data instead.\"",
      "summary10s": "Timeouts + retry with backoff + circuit breaker + fallback response."
    }
  },
  {
    "id": "retry-vs-circuit-breaker",
    "category": "Microservices",
    "question": "Retry vs Circuit Breaker",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Retry attempts the same call again after failure; Circuit Breaker stops calling a failing service entirely for a while.",
      "explain": "Retry — good for transient, short-lived failures (network blip)\nCircuit Breaker — trips after repeated failures, blocks further calls temporarily, protects both caller and the struggling service\nOften used together: retry a few times, and if it keeps failing, the circuit breaker trips",
      "example": "\"Retry is for transient failures — I retry the same call a few times, usually with backoff, hoping it was just a temporary blip. Circuit Breaker is different — after a certain number of consistent failures, it 'trips' and stops calling that service entirely for a cooldown period, protecting both the caller from wasting resources and the struggling service from more load. I typically combine both — retry a few times, and if it keeps failing, let the circuit breaker take over.\"",
      "summary10s": "Retry = try again on transient failure, Circuit Breaker = stop calling after repeated failures."
    }
  },
  {
    "id": "maintaining-consistency-between-services",
    "category": "Microservices",
    "question": "Maintaining consistency between services",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Since each service has its own database, use event-driven patterns instead of shared transactions.",
      "explain": "Saga Pattern with compensating transactions\nEvent-driven updates via Kafka for eventual consistency\nIdempotent APIs + Outbox pattern to reliably publish events with DB changes",
      "example": "\"Since microservices don't share a database, I rely on the Saga Pattern with compensating transactions and publish events through Kafka to keep other services updated, accepting eventual consistency. I make sure APIs are idempotent so retries are safe, and use the Outbox pattern to reliably publish events alongside database changes.\"",
      "summary10s": "No shared DB → Saga + events + idempotent APIs + Outbox pattern."
    }
  },
  {
    "id": "sql-where-vs-having",
    "category": "SQL",
    "question": "WHERE vs HAVING",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "WHERE filters rows before grouping; HAVING filters groups after aggregation.",
      "explain": "WHERE — applied to individual rows, can't use aggregate functions (SUM, COUNT)\nHAVING — applied to grouped results, used with GROUP BY and aggregate functions\nWHERE runs first, then GROUP BY, then HAVING",
      "example": "\"WHERE filters individual rows before any grouping happens, and it can't reference aggregate functions like SUM or COUNT. HAVING filters after the GROUP BY has aggregated the data, so it's used specifically to filter based on aggregate results, like finding departments with an average salary above a certain threshold.\"",
      "summary10s": "WHERE filters rows before grouping, HAVING filters groups after aggregation."
    }
  },
  {
    "id": "sql-inner-join-vs-left-join",
    "category": "SQL",
    "question": "INNER JOIN vs LEFT JOIN",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "INNER JOIN returns only matching rows from both tables; LEFT JOIN returns all rows from the left table, with nulls for unmatched right-side data.",
      "explain": "INNER JOIN — only rows with a match in both tables\nLEFT JOIN — all rows from left table + matched data from right, NULL if no match\nChoose LEFT JOIN when you need to keep records even without a related match (e.g., customers with no orders)",
      "example": "\"INNER JOIN only returns rows where there's a match in both tables. LEFT JOIN returns every row from the left table regardless of whether there's a match, filling in NULLs for the right table's columns when there isn't one. I use LEFT JOIN when I need to preserve records that might not have a related row, like listing all customers even those with zero orders.\"",
      "summary10s": "INNER = only matches, LEFT = all from left table + matches, NULL if none."
    }
  },
  {
    "id": "sql-how-do-indexes-improve-performance",
    "category": "SQL",
    "question": "How do indexes improve performance?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Indexes let the database find rows quickly without scanning the entire table.",
      "explain": "Similar to a book's index — avoids a full table scan for filtered/sorted queries\nTypically implemented as B-Trees — lookup is O(log n) instead of O(n)\nTrade-off: speeds up reads, but slows down writes (index needs updating on every insert/update)",
      "example": "\"Indexes let the database jump directly to relevant rows instead of scanning the entire table, similar to how a book's index works. They're usually implemented as B-Trees, turning a lookup from O(n) into O(log n). The trade-off is that indexes add overhead on writes, since every insert or update also has to update the index, so I only index columns that are actually used frequently in WHERE or JOIN clauses.\"",
      "summary10s": "Avoids full table scan, O(log n) lookup via B-Tree — trade-off: slower writes."
    }
  },
  {
    "id": "what-is-join-fetch",
    "category": "Spring Boot",
    "question": "What is JOIN FETCH?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "JOIN FETCH tells JPQL to eagerly load an associated entity in the same query, avoiding a separate lazy-load query.",
      "explain": "Used inside @Query with JPQL: SELECT e FROM Employee e JOIN FETCH e.department\nOverrides the default LAZY fetch type for that specific query only\nThe most common fix for the N+1 problem",
      "example": "\"JOIN FETCH is a JPQL clause that tells Hibernate to load an associated entity eagerly within the same query, instead of triggering a separate lazy-load query later. I use it whenever I know I'll need the related data right away, like fetching employees along with their department in one go, which is my go-to fix for N+1 issues.\"",
      "summary10s": "JPQL clause — loads association in same query, main fix for N+1."
    }
  },
  {
    "id": "consumer-crashes-before-committing-offset",
    "category": "Microservices",
    "question": "Consumer crashes before committing offset",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The message gets reprocessed by another consumer, since Kafka thinks it was never successfully consumed.",
      "explain": "Offset commit marks a message as \"processed\" — if it crashes before committing, Kafka doesn't know it was handled\nOn rebalance, another consumer picks up from the last committed offset, reprocessing that message\nThis is why consumers should be designed to be idempotent — reprocessing is expected behavior, not an edge case",
      "example": "\"If a consumer crashes before committing the offset, Kafka has no record that the message was successfully processed, so after a rebalance, another consumer in the group picks up from the last committed offset and reprocesses that same message. This is exactly why I always design consumers to be idempotent — reprocessing a message should never cause duplicate side effects, like double-charging a payment.\"",
      "summary10s": "Uncommitted message gets reprocessed by another consumer — design for idempotency."
    }
  },
  {
    "id": "what-is-a-dead-letter-topic",
    "category": "Microservices",
    "question": "What is a Dead Letter Topic?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "A Dead Letter Topic (DLT) stores messages that repeatedly fail processing, so they don't block the main pipeline.",
      "explain": "After a set number of retries, a failing message is moved to a separate DLT instead of blocking the consumer\nAllows the main consumer to keep processing subsequent messages\nFailed messages in the DLT can be inspected, fixed, and reprocessed manually later",
      "example": "\"A Dead Letter Topic is where I route messages that fail processing repeatedly, after a set number of retries, instead of letting them block the entire consumer from moving forward. This way, the main pipeline keeps flowing, and I can inspect the failed messages in the DLT separately, fix the underlying issue, and reprocess them later without losing data.\"",
      "summary10s": "Failed messages moved here after retries exhausted — keeps main pipeline unblocked."
    }
  },
  {
    "id": "how-to-make-kafka-consumers-idempotent",
    "category": "Microservices",
    "question": "How to make Kafka consumers idempotent?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Track a unique identifier per message and skip processing if it's already been handled.",
      "explain": "Store processed message IDs (or business keys) in a DB with a unique constraint\nCheck-before-process, or use an upsert pattern instead of insert, so reprocessing doesn't create duplicates\nCombine business logic update + offset tracking atomically where possible",
      "example": "\"I make consumers idempotent by tracking a unique identifier for each message — like a transaction ID — in the database with a unique constraint. Before processing, I check if that ID has already been handled; if it has, I just skip it safely. For updates, I also design the operation to be an upsert rather than a blind insert, so even if the same message gets reprocessed, it doesn't create duplicate records.\"",
      "summary10s": "Unique message ID + DB constraint/check-before-process — safe reprocessing without duplicates."
    }
  },
  {
    "id": "common-http-status-codes",
    "category": "Spring Boot",
    "question": "Common HTTP status codes",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Status codes communicate the outcome of a request — success, client error, or server error.",
      "explain": "200 OK, 201 Created, 204 No Content — success\n400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity — client errors\n500 Internal Server Error, 503 Service Unavailable — server errors",
      "example": "\"I use 200 for a successful GET, 201 for a successful POST that creates a resource, and 204 when there's no content to return, like after a delete. For errors, 400 is a malformed request, 401 is unauthenticated, 403 is authenticated but not authorized, 404 is resource not found, and 422 is for a well-formed request that fails business validation. 500 is reserved for genuine unexpected server failures.\"",
      "summary10s": "2xx=success, 4xx=client error (400/401/403/404/422), 5xx=server error."
    }
  },
  {
    "id": "what-is-idempotency",
    "category": "Spring Boot",
    "question": "What is idempotency?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "An idempotent operation produces the same result no matter how many times it's repeated.",
      "explain": "GET, PUT, DELETE are naturally idempotent by REST convention\nPOST is NOT idempotent by default — repeating it creates duplicate resources\nAchieved for POST using an idempotency key that the server checks before processing",
      "example": "\"Idempotency means calling the same operation multiple times has the same effect as calling it once. GET, PUT, and DELETE are naturally idempotent by REST convention, but POST isn't — retrying a POST could create duplicate records. For critical POST operations like payments, I implement idempotency using a unique idempotency key that the server checks before processing, so a retried request doesn't cause a duplicate charge.\"",
      "summary10s": "Same result no matter how many times repeated — POST needs an idempotency key to achieve this."
    }
  },
  {
    "id": "how-to-handle-api-versioning",
    "category": "Spring Boot",
    "question": "How to handle API versioning?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Version APIs either through the URL path or a custom request header.",
      "explain": "URL versioning (/api/v1/orders) — simple, visible, gateway-friendly\nHeader versioning — cleaner URLs, but harder to test/discover\nMost teams prefer URL versioning for simplicity and discoverability",
      "example": "\"URL versioning, like /api/v1/orders, is simple, easy for clients to understand, and works well with API Gateways for routing. Header versioning keeps URLs clean but makes the API harder to explore directly. In my experience, most teams go with URL versioning for its simplicity and gateway-friendliness.\"",
      "summary10s": "URL versioning = simple & gateway-friendly; Header versioning = cleaner but harder to test."
    }
  },
  {
    "id": "process-vs-thread",
    "category": "Java",
    "question": "Process vs Thread",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Process is a running program, Thread is a smaller unit of execution inside a process.",
      "explain": "Process has its own memory space, isolated from other processes\nThreads share memory within same process — faster communication but risky\nProcess creation is expensive, thread creation is lightweight\nJVM runs as one process, your app can have many threads inside it",
      "example": "\"A process is an independent running program with its own memory. Threads live inside a process and share its memory. Threads are much lighter to create than processes. In Spring Boot my application is one JVM process and handles each request on a separate thread from Tomcat's thread pool.\"",
      "summary10s": "Process=own memory isolated, Thread=shared memory inside process, threads are lightweight."
    }
  },
  {
    "id": "mutex-vs-semaphore",
    "category": "Java",
    "question": "Mutex vs Semaphore",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Mutex allows one thread at a time, Semaphore allows N threads at a time.",
      "explain": "Mutex — binary lock, only owner can release it, for exclusive access\nSemaphore — counter-based, allows N concurrent accesses, for resource pooling\nMutex use case — protect single shared resource like a file write\nSemaphore use case — limit concurrent DB connections to 10",
      "example": "\"Mutex is like a single key to a room — only one thread enters at a time and only that thread can unlock. Semaphore is like a parking lot with N spaces — up to N threads can proceed simultaneously. I use Mutex for exclusive access to a single resource and Semaphore to limit concurrency like capping API calls to downstream service.\"",
      "summary10s": "Mutex=one at a time exclusive, Semaphore=N at a time counted."
    }
  },
  {
    "id": "condition-variables",
    "category": "Java",
    "question": "Condition Variables",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Condition variable lets a thread wait for a specific condition to become true.",
      "explain": "Thread acquires lock, checks condition, if not met calls await to release lock and wait\nAnother thread changes condition and calls signal or signalAll to wake waiting thread\nUsed in Producer-Consumer — consumer waits when queue empty, producer signals when item added\nIn Java — wait and notify on synchronized block, or Condition with ReentrantLock",
      "example": "\"Condition variables solve the problem of a thread that needs to wait for something to happen. Instead of busy-waiting in a loop, thread calls await which releases the lock and sleeps. When condition is met, another thread calls signal to wake it up. This is the foundation of Producer-Consumer pattern in Java.\"",
      "summary10s": "Thread waits on condition with await, another thread signals when condition met."
    }
  },
  {
    "id": "livelock",
    "category": "Java",
    "question": "Livelock",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Threads keep responding to each other but neither makes progress — like two people in a corridor stepping aside for each other.",
      "explain": "Different from deadlock — threads are not blocked, they are active\nBut they keep reacting to each other without doing real work\nCommon in retry logic — both back off and retry at same time repeatedly\nFix — add randomized backoff so threads do not retry in sync",
      "example": "\"Livelock is tricky because threads appear active but nothing gets done. Like two people in a narrow hallway both stepping aside in the same direction repeatedly. In code this happens with aggressive retry logic where both threads back off and retry simultaneously. Fix is adding randomized backoff so their retry timing differs.\"",
      "summary10s": "Livelock=active but no progress, threads react to each other, fix with random backoff."
    }
  },
  {
    "id": "reader-writer-problem",
    "category": "Java",
    "question": "Reader-Writer Problem",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Multiple readers can read simultaneously, but writer needs exclusive access.",
      "explain": "Multiple threads reading at same time is safe — no data changes\nOnly one writer at a time, and no readers while writing\nReadWriteLock in Java — readLock for readers, writeLock for writers\nImproves performance for read-heavy scenarios over full mutex",
      "example": "\"Reader-Writer lock allows multiple threads to read concurrently since reading does not change data. But when a write happens, it locks out all readers and other writers. In Java I use ReadWriteLock — I acquire readLock for all read operations and writeLock for updates. This is much better performance than synchronizing everything for a read-heavy cache.\"",
      "summary10s": "Multiple readers OK simultaneously, writer needs exclusive lock, use ReadWriteLock."
    }
  },
  {
    "id": "thread-safe-cache",
    "category": "Java",
    "question": "Thread-Safe Cache",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Cache that multiple threads can read and write safely without corruption.",
      "explain": "Use ConcurrentHashMap as base — thread-safe, no full lock\ncomputeIfAbsent for atomic check-then-put — prevents duplicate loading\nAdd eviction with Caffeine or Guava Cache for production use\nReadWriteLock if using regular HashMap — readers share, writer exclusive",
      "example": "\"For a thread-safe cache I use ConcurrentHashMap with computeIfAbsent. This atomically checks if key exists and loads value only if missing — no duplicate DB calls. For production I prefer Caffeine cache which is thread-safe and adds eviction, TTL, and max size. Never use plain HashMap with synchronized — too coarse and slow.\"",
      "summary10s": "ConcurrentHashMap + computeIfAbsent, or Caffeine for production with TTL and eviction."
    }
  },
  {
    "id": "threadpoolexecutor-internal-working",
    "category": "Java",
    "question": "ThreadPoolExecutor — Internal Working",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "ThreadPoolExecutor manages core threads, max threads, queue, and rejection policy — understanding all four is key.",
      "explain": "Core pool size — always kept alive even if idle\nMax pool size — maximum threads created under load\nWork queue — holds tasks when all core threads busy\nKeep alive time — how long extra threads above core size stay idle before termination\nRejection policy — what happens when queue full and max threads reached",
      "example": "\"ThreadPoolExecutor behavior is sequential — first fills core threads, then queues tasks, then creates threads up to max, then applies rejection policy. If I have core 10, max 20, queue 100 — first 10 requests get core threads, next 100 go to queue, next 10 create extra threads up to max 20, then rejection policy fires for anything beyond. Most common mistake is thinking max threads are created before queue fills — it is the opposite.\"",
      "summary10s": "Fill core threads → queue tasks → create up to max → reject. Queue fills before max threads created."
    }
  },
  {
    "id": "fork-join-framework",
    "category": "Java",
    "question": "Fork/Join Framework",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Divide big task into smaller subtasks recursively, process in parallel, merge results — work stealing keeps all cores busy.",
      "explain": "Extends ExecutorService — designed for divide and conquer recursive algorithms\nRecursiveTask — returns result, RecursiveAction — no result\nfork() — submit subtask to pool asynchronously\njoin() — wait for subtask to complete and get result\nWork stealing — idle threads steal tasks from busy thread's deque, maximizes CPU utilization",
      "example": "\"ForkJoinPool is designed for recursive divide-and-conquer. I extend RecursiveTask, check if work is small enough to compute directly or needs further splitting. fork() submits subtasks, join() collects results. The key innovation is work stealing — every thread has its own task deque, idle threads steal from busy ones keeping all CPU cores busy. Parallel streams use this pool internally.\"",
      "summary10s": "Extend RecursiveTask, fork() submits subtask, join() gets result, work stealing keeps all cores busy."
    }
  },
  {
    "id": "this-vs-super",
    "category": "Java",
    "question": "this vs super keyword",
    "frequency": 1,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "Difference between this and super"
    ],
    "answerSEE": {
      "simple": "this refers to the current class instance, super refers to the parent class instance.",
      "explain": "this is used to access current class variables/methods and avoid shadowing (when parameter name matches field name).\nsuper is used to access parent class variables/methods, especially when they are overridden in the child class.\nboth must be the first statement if used as constructors (this() or super()).",
      "example": "\"In a child class, if I override a method but still need the parent's logic, I call super.methodName(). I use this.fieldName to differentiate between a class field and a constructor parameter with the same name. Neither can be used in a static context.\"",
      "summary10s": "this = current class instance. super = parent class instance. Both cannot be used in static methods."
    }
  },
  {
    "id": "why-runtime-polymorphism-in-method-overriding",
    "category": "Java",
    "question": "Why runtime polymorphism is used in method overriding",
    "frequency": 1,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "Why use method overriding for runtime polymorphism?"
    ],
    "answerSEE": {
      "simple": "It allows a parent reference to call the correct child method dynamically at runtime.",
      "explain": "Instead of hardcoding behavior, you program to an interface or abstract class.\nThe JVM decides at runtime which overridden method to execute based on the actual object created, not the reference type.\nThis enables flexibility, Extensibility (Open-Closed principle), and clean code.",
      "example": "\"If I have an Animal reference pointing to a Dog object, calling animal.makeSound() will execute the Dog's overridden method. I use this heavily in Spring when injecting different service implementations — the framework decides the correct implementation at runtime without changing the caller's code.\"",
      "summary10s": "Method resolved at runtime based on actual object type. Enables loose coupling and extensibility."
    }
  },
  {
    "id": "sleep-vs-wait-in-multithreading",
    "category": "Java",
    "question": "Sleep vs Wait in multithreading",
    "frequency": 1,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "Difference between Thread.sleep() and Object.wait()"
    ],
    "answerSEE": {
      "simple": "sleep() pauses the thread and keeps the lock, wait() pauses and releases the lock.",
      "explain": "sleep() is a static method in Thread class. It pauses execution for a specific time and does NOT release any monitor locks.\nwait() is an instance method in Object class. It must be called from a synchronized block, and it RELEASES the lock so other threads can proceed.\nwait() requires notify() or notifyAll() to wake up.",
      "example": "\"I use wait() in Producer-Consumer scenarios where a thread needs to release the lock on a full queue so the consumer can take items. I use sleep() when I just want to pause execution for a fixed duration, like a polling interval, while holding onto my resources.\"",
      "summary10s": "sleep = Thread method, keeps lock. wait = Object method, releases lock, needs notify()."
    }
  },
  {
    "id": "what-is-aop-how-is-it-used",
    "category": "Spring Boot",
    "question": "AOP and how it was implemented in the project",
    "frequency": 1,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "Aspect Oriented Programming real-world use case"
    ],
    "answerSEE": {
      "simple": "AOP separates cross-cutting concerns (like logging or security) from the main business logic.",
      "explain": "AOP intercepts method calls using proxies.\nKey concepts: Aspect (the module), Advice (the action: Before, After, Around), Pointcut (expression defining where to apply), and JoinPoint (the actual method execution).\nKeeps business logic clean and DRY (Don't Repeat Yourself).",
      "example": "\"In my project, I implemented AOP for central logging and performance monitoring. I created an @Around advice that intercepts all controller methods, logs the incoming request, records the start time, proceeds with the method execution, and then logs the response time and status. This completely removed logging boilerplate from the controllers.\"",
      "summary10s": "AOP separates cross-cutting concerns. Implemented via @Around advice for central logging and metrics."
    }
  },
  {
    "id": "what-is-database-normalization",
    "category": "SQL",
    "question": "Normalization and its different types",
    "frequency": 1,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "What is normalization and forms of normalization"
    ],
    "answerSEE": {
      "simple": "Normalization organizes data to reduce redundancy and improve data integrity.",
      "explain": "1NF: Ensure atomic (indivisible) values in columns.\n2NF: Must be in 1NF, and all non-key columns depend on the entire primary key (removes partial dependency).\n3NF: Must be in 2NF, and non-key columns must not depend on other non-key columns (removes transitive dependency).\nBCNF: A stricter version of 3NF where every determinant must be a candidate key.",
      "example": "\"I use normalization to avoid data anomalies when updating or inserting records. For example, instead of storing Department Name and Location inside the Employee table (which repeats data), I extract it into a separate Department table and link it via a foreign key, achieving 3NF.\"",
      "summary10s": "Reduces redundancy. 1NF=atomic, 2NF=no partial dependency, 3NF=no transitive dependency."
    }
  },
  {
    "id": "view-vs-stored-procedure",
    "category": "SQL",
    "question": "View vs Stored Procedure",
    "frequency": 1,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "Difference between View and SP"
    ],
    "answerSEE": {
      "simple": "A View is a virtual table based on a query, a Stored Procedure is a compiled block of SQL logic.",
      "explain": "View: Used to simplify complex queries or restrict data access. Does not accept parameters (usually). Cannot perform DML operations (INSERT/UPDATE/DELETE) on multiple tables.\nStored Procedure: Accepts input/output parameters. Can contain business logic, loops, IF-ELSE conditions, and multiple DML statements. Pre-compiled for performance.",
      "example": "\"I use a View when I want to provide a simplified, read-only subset of joined tables to a reporting dashboard. I use a Stored Procedure for complex batch operations, like calculating end-of-month employee payrolls, because it encapsulates the logic and runs efficiently on the DB server.\"",
      "summary10s": "View = virtual table for reading/simplifying. SP = compiled script for business logic and updates."
    }
  },
  {
    "id": "coding-infix-to-postfix",
    "category": "Java Coding",
    "question": "Convert an Infix Expression to a Postfix Expression",
    "frequency": 1,
    "companies": [
      "Deloitte"
    ],
    "variations": [
      "Infix to postfix conversion code"
    ],
    "answerSEE": {
      "simple": "Use a Stack to hold operators and parentheses, outputting operands immediately based on operator precedence.",
      "explain": "Iterate through the string:\n- If operand (A-Z, 0-9), append to result.\n- If '(', push to stack.\n- If ')', pop from stack to result until '(' is found.\n- If operator (+, -, *, /), pop from stack to result while stack top has higher or equal precedence, then push current operator.\nFinally, pop all remaining operators from stack.",
      "example": "\"I would initialize a Stack for operators and a StringBuilder for the output. I evaluate operator precedence (e.g., * is higher than +). As I parse the expression, operands go straight to the builder. Operators push to the stack only if they have higher precedence than the top; otherwise, I pop the stack first. This guarantees O(N) time complexity.\"",
      "summary10s": "Stack for operators, append operands immediately. Pop stack based on precedence rules. O(N) complexity."
    }
  },
  {
    "id": "what-is-a-maven-build",
    "category": "DevOps",
    "question": "What is a Maven build?",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "A Maven build is the process of compiling, testing, and packaging a project based on rules defined in pom.xml.",
      "explain": "- Follows a defined lifecycle: validate → compile → test → package → verify → install → deploy\n- Dependencies and plugins are declared in pom.xml, Maven resolves and downloads them\n- Produces an artifact (jar/war) as the final output",
      "example": "\"A Maven build is the standardized process that takes my source code through compilation, testing, and packaging based on the pom.xml configuration. Maven follows a defined lifecycle — compile, test, package, and so on — and I can hook into any phase to run custom logic, like generating code coverage reports.\"",
      "summary10s": "\"pom.xml defines the lifecycle — compile → test → package → install.\""
    }
  },
  {
    "id": "what-does-mvn-clean-install-do",
    "category": "Other",
    "question": "What does `mvn clean install` do?",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "It deletes previous build artifacts, then compiles, tests, packages, and installs the project into the local repository.",
      "explain": "- `clean` — deletes the `target` directory (previous build output)\n- `install` — runs through the full lifecycle up to install, including compile, test, package\n- Installs the built jar into the local `.m2` repository so other local projects can depend on it",
      "example": "\"clean removes the target folder, wiping out any previous build artifacts, so I start fresh. install then runs through the whole lifecycle — compiling, running tests, packaging into a jar, and finally installing that jar into my local Maven repository, so other projects on my machine can use it as a dependency.\"",
      "summary10s": "\"clean = wipe old build, install = compile+test+package+install to local repo.\""
    }
  },
  {
    "id": "how-do-you-push-code-to-produc",
    "category": "DevOps",
    "question": "How do you push code to production?",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Through a CI/CD pipeline — code review, automated build/test, then deployment via a controlled release process.",
      "explain": "- Merge to main/release branch after PR review and passing CI checks (build, tests, code coverage)\n- CI/CD pipeline (Jenkins/GitLab CI) builds the artifact, runs automated tests, and deploys to staging first\n- Production deployment often gated by manual approval, then rolled out (blue-green/canary), monitored post-deploy",
      "example": "\"In my process, code goes through a pull request review, and CI runs the build, unit tests, and checks code coverage automatically. Once merged, the pipeline deploys to a staging environment first for validation, and production deployment usually needs a manual approval gate. We use a rolling or blue-green deployment strategy and monitor dashboards closely right after release.\"",
      "summary10s": "\"PR review → CI build/test → staging → approval-gated production deploy → monitor.\""
    }
  },
  {
    "id": "code-coverage-and-line-coverag",
    "category": "Java",
    "question": "Code coverage and line coverage",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Code coverage measures how much of the codebase is exercised by tests; line coverage is one specific metric — the percentage of executable lines run during tests.",
      "explain": "- Code coverage — umbrella term, includes line, branch, method coverage\n- Line coverage — percentage of individual lines executed at least once during test runs\n- Branch coverage — stricter, checks if all if/else paths were tested, not just that the line ran",
      "example": "\"Code coverage is a general term for how much of my code gets exercised by tests. Line coverage specifically measures what percentage of executable lines actually ran during test execution. It's a useful but imperfect metric — a line can be 'covered' without every branch or edge case actually being tested, which is why branch coverage is often tracked alongside it.\"",
      "summary10s": "\"Line coverage = % of lines executed by tests. Branch coverage is stricter (checks each path).\""
    }
  },
  {
    "id": "improving-code-coverage-when-b",
    "category": "Java",
    "question": "Improving code coverage when build fails",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Identify the untested classes/methods flagged by the coverage tool, then write targeted unit tests for those gaps.",
      "explain": "- Check the coverage report (JaCoCo) to find exactly which classes/lines are below threshold\n- Prioritize testing business logic and branches (if/else, exception paths) over trivial getters/setters\n- Avoid writing tests just to inflate the number — focus on meaningful assertions, not just execution",
      "example": "\"I'd check the JaCoCo report to see exactly which classes or methods are dragging the coverage below the required threshold, then write targeted unit tests for those specific gaps, especially uncovered branches like exception handling or conditional logic. I make sure the tests actually assert meaningful behavior rather than just executing lines to inflate the number, since that defeats the purpose of coverage as quality metric.\"",
      "summary10s": "\"Check JaCoCo report → target uncovered branches/logic → write meaningful, not inflated, tests.\""
    }
  },
  {
    "id": "verify-a-method-is-called-twic",
    "category": "Java",
    "question": "Verify a method is called twice in Mockito",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Use `verify(mock, times(2)).method()`.",
      "explain": "After invoking the code under test, call Mockito's `verify()` with the `times(2)` argument matcher on the mocked object.\nverify(mockService, times(2)).processOrder(any(Order.class));\n",
      "example": "\"I'd use Mockito's verify() with times(2) — like verify(mockService, times(2)).processOrder(order) — to assert that the method was called exactly twice during the test. If I just need 'at least once' or 'never', Mockito has atLeastOnce() and never() as well.\"",
      "summary10s": "\"`verify(mock, times(2)).method(...)` — asserts exact invocation count.\""
    }
  },
  {
    "id": "when-to-use-powermock",
    "category": "Java",
    "question": "When to use PowerMock",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "PowerMock is used when you need to mock static methods, constructors, or private methods, which plain Mockito can't do.",
      "explain": "- Mocking static/final methods and constructors (legacy code, utility classes)\n- Testing legacy code not designed with dependency injection in mind\n- Generally a last resort — modern Mockito (since 3.4+) can mock static methods directly for simpler cases",
      "example": "\"I'd reach for PowerMock when dealing with legacy code that has static method calls, private methods, or `new` object creation baked directly into the class, which standard Mockito can't intercept. That said, I try to avoid it where possible since it usually signals tightly coupled code — newer versions of Mockito can even mock static methods now, reducing the need for PowerMock in most cases.\"",
      "summary10s": "\"For mocking static methods/constructors/private methods — mostly for legacy, tightly-coupled code.\""
    }
  },
  {
    "id": "final-keyword-vs-final-variabl",
    "category": "Other",
    "question": "final keyword vs final variable",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "`final` is the keyword; a final variable is one specific use of it — a variable whose reference/value can't be reassigned after initialization.",
      "explain": "- `final` keyword can be applied to variables, methods, and classes\n- final variable — value/reference set once, cannot be reassigned (but object's internal state CAN still change if mutable)\n- final method — can't be overridden; final class — can't be extended",
      "example": "\"final is the keyword itself, and it has three uses — on a variable, a method, or a class. A final variable specifically means once assigned, I can't reassign it to point to something else — though if it's an object reference, the object's internal state can still be mutated. final methods can't be overridden by subclasses, and final classes can't be extended at all, like String.\"",
      "summary10s": "\"final = keyword (variable/method/class). Final variable = can't reassign after init.\""
    }
  },
  {
    "id": "debugging-and-fixing-outofmemo",
    "category": "Other",
    "question": "Debugging and fixing OutOfMemoryError",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Take a heap dump, analyze what's consuming memory, and fix the root cause — leak, undersized heap, or excessive allocation.",
      "explain": "- Take a heap dump (`jmap` or auto-dump on OOM) and analyze in Eclipse MAT\n- Look at the dominator tree to find what's retaining the most memory and why\n- Fix: remove leaking references, increase heap size if genuinely needed, or reduce object churn",
      "example": "\"I'd take a heap dump, ideally auto-generated at the moment of the OOM using -XX:+HeapDumpOnOutOfMemoryError, and analyze it in Eclipse MAT. I'd look at the dominator tree to find what's actually retaining the most memory and trace back the reference chain to find the leak — commonly a static collection or an unclosed resource. If it's genuinely a sizing issue rather than a leak, I'd adjust the heap size instead.\"",
      "summary10s": "\"Auto heap dump on OOM → analyze in MAT (dominator tree) → fix leak or heap sizing.\""
    }
  },
  {
    "id": "atomic-variables-in-java",
    "category": "Java",
    "question": "Atomic variables in Java",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Atomic variables (like AtomicInteger) provide thread-safe operations on a single variable without needing explicit locking.",
      "explain": "- Use CAS (Compare-And-Swap) internally instead of synchronized blocks\n- Common classes: `AtomicInteger`, `AtomicLong`, `AtomicBoolean`, `AtomicReference`\n- Ideal for simple counters/flags shared across threads without full lock overhead",
      "example": "\"Atomic variables like AtomicInteger use CAS operations internally to provide thread-safe updates without needing an explicit lock. I use them for simple shared counters, like tracking a request count across threads, since they're much lighter weight than wrapping a plain int with synchronized.\"",
      "summary10s": "\"CAS-based thread-safe variables — AtomicInteger, AtomicLong, etc. No lock needed.\""
    }
  },
  {
    "id": "volatile-vs-synchronized",
    "category": "Java",
    "question": "volatile vs synchronized",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "volatile only guarantees visibility of a single variable; synchronized guarantees both visibility and atomicity/mutual exclusion.",
      "explain": "- volatile — lightweight, no locking, only for visibility of reads/writes\n- synchronized — heavier, provides mutual exclusion, ensures compound operations are atomic\n- Use volatile for a simple flag, synchronized for anything requiring atomic read-modify-write",
      "example": "\"volatile is lightweight and only ensures visibility — other threads see the latest value, but it doesn't prevent two threads from acting on stale data simultaneously in a compound operation. synchronized is heavier but provides actual mutual exclusion, ensuring only one thread executes a critical section at a time, making compound operations atomic. I use volatile for simple flags and synchronized when I need real atomicity.\"",
      "summary10s": "\"volatile = visibility only. synchronized = visibility + atomicity/mutual exclusion.\""
    }
  },
  {
    "id": "avoiding-performance-issues-fr",
    "category": "Other",
    "question": "Avoiding performance issues from synchronization",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Keep synchronized blocks as small as possible, and prefer concurrent collections/atomic classes over broad locking.",
      "explain": "- Minimize the critical section — synchronize only the specific lines that need protection, not the whole method\n- Use `ConcurrentHashMap`, `CopyOnWriteArrayList`, or `Atomic` classes instead of manual synchronization where applicable\n- Consider `ReadWriteLock`/`StampedLock` for read-heavy workloads to allow concurrent reads",
      "example": "\"I keep synchronized blocks as small as possible, wrapping only the exact lines that touch shared state rather than the whole method, to minimize contention. Where possible, I prefer thread-safe collections like ConcurrentHashMap or Atomic classes, which use finer-grained locking internally. For read-heavy workloads, I'd consider a ReadWriteLock or StampedLock to let multiple readers proceed concurrently instead of blocking each other.\"",
      "summary10s": "\"Small critical sections + prefer concurrent collections/atomics + ReadWriteLock for read-heavy cases.\""
    }
  },
  {
    "id": "java-7-to-java-8-migration-cha",
    "category": "Java",
    "question": "Java 7 to Java 8 migration changes",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Migration mainly involves adopting lambda expressions, Streams, and Optional to replace verbose Java 7 patterns.",
      "explain": "- Replaced anonymous classes with lambda expressions for functional interfaces\n- Converted manual loops/collection processing to Streams API (filter, map, collect)\n- Replaced null checks with Optional; adopted the new java.time API instead of java.util.Date/Calendar",
      "example": "\"The main changes I made were replacing anonymous inner classes with lambda expressions wherever a functional interface was involved, and converting manual for-loops over collections into Streams pipelines using filter, map, and collect for cleaner, more declarative code. I also replaced null checks with Optional where appropriate, and moved from the old Date/Calendar API to the new java.time package for date handling.\"",
      "summary10s": "\"Anonymous classes → lambdas, manual loops → Streams, Date/Calendar → java.time, nulls → Optional.\""
    }
  },
  {
    "id": "different-ways-to-ensure-threa",
    "category": "Java",
    "question": "Different ways to ensure thread safety",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Use immutability, synchronization, concurrent collections, and atomic variables depending on the situation.",
      "explain": "- Immutability — no shared mutable state, inherently thread-safe\n- synchronized/Lock — for compound operations needing atomicity\n- Concurrent collections (ConcurrentHashMap) and Atomic classes for common shared-state scenarios\n- ThreadLocal — give each thread its own separate copy instead of sharing",
      "example": "\"My first choice is always immutability — if there's no shared mutable state, there's nothing to synchronize. Where mutable shared state is unavoidable, I use synchronized or Lock for compound operations, concurrent collections like ConcurrentHashMap for shared data structures, and Atomic classes for simple counters. ThreadLocal is another option when each thread genuinely needs its own separate copy of some state, like a per-thread date formatter.\"",
      "summary10s": "\"Immutability > concurrent collections/atomics > synchronized/Lock > ThreadLocal (per-thread copies).\""
    }
  },
  {
    "id": "why-doesn-t-hashtable-allow-nu",
    "category": "Java",
    "question": "Why doesn't Hashtable allow null keys/values?",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Because Hashtable can't distinguish between \"key not found\" and \"key found with a null value\" when synchronized methods return null for both cases.",
      "explain": "- `get()` returning null is ambiguous — could mean \"key doesn't exist\" or \"key exists with null value\"\n- Hashtable's original design (pre-Java 1.2) chose to disallow nulls entirely to avoid this ambiguity\n- HashMap later allowed null but requires `containsKey()` to disambiguate when needed",
      "example": "\"Hashtable disallows nulls because a get() call returning null would be ambiguous — you couldn't tell if the key genuinely doesn't exist, or if it exists but maps to a null value. Rather than deal with that ambiguity, the original Hashtable design just disallowed nulls entirely. HashMap, designed later, does allow one null key, but if you need to disambiguate, you'd still use containsKey() alongside get().\"",
      "summary10s": "\"Avoids ambiguity — null from get() could mean 'no key' or 'null value'. Hashtable just disallows both.\""
    }
  },
  {
    "id": "load-factor-in-hashmap",
    "category": "Java",
    "question": "Load factor in HashMap",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Load factor determines how full the HashMap can get before it resizes (doubles) its capacity.",
      "explain": "- Formula: resize triggers when `size > capacity * loadFactor`\n- Lower load factor — more space used, fewer collisions, faster lookups\n- Higher load factor — more space-efficient, but more collisions, slower lookups",
      "example": "\"Load factor is the threshold that determines when HashMap should resize — it triggers a resize once the number of entries exceeds capacity multiplied by the load factor. A lower load factor means more memory usage but fewer collisions and faster lookups, while a higher load factor is more space-efficient but leads to more collisions.\"",
      "summary10s": "\"Threshold for resizing — resize happens when size exceeds capacity × load factor.\""
    }
  },
  {
    "id": "what-does-default-load-factor",
    "category": "Other",
    "question": "What does default load factor 0.75 mean?",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "It means HashMap resizes once it's 75% full.",
      "explain": "- For an initial capacity of 16, resize triggers once entries exceed 12 (16 × 0.75)\n- 0.75 is chosen by Java as a balance between space efficiency and time performance (fewer collisions)\n- Resizing doubles the capacity and rehashes all existing entries",
      "example": "\"A default load factor of 0.75 means the HashMap resizes once it's 75% full — so for an initial capacity of 16, resizing kicks in once we have more than 12 entries. Java chose 0.75 as the sweet spot balancing memory usage against the increased collision rate that would come with a higher threshold. When it does resize, capacity doubles and all existing entries get rehashed into new buckets.\"",
      "summary10s": "\"Resizes at 75% capacity — Java's balance between memory use and collision rate.\""
    }
  },
  {
    "id": "union-vs-union-all",
    "category": "SQL",
    "question": "UNION vs UNION ALL",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "UNION combines results and removes duplicates; UNION ALL combines results and keeps duplicates.",
      "explain": "- UNION — performs a distinct operation internally, slower due to duplicate removal\n- UNION ALL — just concatenates results, faster since no dedup step\n- Both require the same number of columns with compatible types in each SELECT",
      "example": "\"UNION combines the results of two queries and removes duplicate rows, which means it does extra work internally to dedupe. UNION ALL just concatenates the results without removing duplicates, so it's faster. I default to UNION ALL whenever I know there won't be duplicates or I don't care about them, since it avoids that unnecessary overhead.\"",
      "summary10s": "\"UNION = combines + removes duplicates (slower). UNION ALL = combines, keeps duplicates (faster).\""
    }
  },
  {
    "id": "left-join-vs-right-join",
    "category": "SQL",
    "question": "LEFT JOIN vs RIGHT JOIN",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "LEFT JOIN keeps all rows from the left table; RIGHT JOIN keeps all rows from the right table, with NULLs for unmatched rows on the other side.",
      "explain": "- LEFT JOIN — all rows from left table, matched data (or NULL) from right\n- RIGHT JOIN — all rows from right table, matched data (or NULL) from left\n- RIGHT JOIN is rarely used in practice — same result achievable by swapping table order with LEFT JOIN",
      "example": "\"LEFT JOIN returns every row from the left table, filling in NULLs for the right table's columns if there's no match. RIGHT JOIN does the opposite — keeps all rows from the right table. In practice, I almost always use LEFT JOIN, since I can just swap the table order to achieve the same result as a RIGHT JOIN, and it's more readable and consistent for a team to stick to one convention.\"",
      "summary10s": "\"LEFT = keep all left table rows, RIGHT = keep all right table rows. Most teams stick to LEFT JOIN only.\""
    }
  },
  {
    "id": "when-to-use-left-join",
    "category": "SQL",
    "question": "When to use LEFT JOIN?",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Use LEFT JOIN when you need to keep all records from the primary table, even if there's no matching related record.",
      "explain": "- Example: listing all customers, including those who've placed zero orders\n- Unmatched rows show NULL for the joined table's columns\n- Useful for reporting \"what's missing\" — like finding records with no related entry",
      "example": "\"I use LEFT JOIN whenever I need to preserve every record from my main table regardless of whether there's a related match — like listing all customers even if some haven't placed any orders yet. It's also the standard way to find 'orphan' records, by joining and then filtering for where the right table's key is NULL.\"",
      "summary10s": "\"When you need to keep all rows from the main table, even those without a match.\""
    }
  },
  {
    "id": "find-records-in-one-table-with",
    "category": "Other",
    "question": "Find records in one table with no relationship to another",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "LEFT JOIN the two tables, then filter for rows where the joined table's key is NULL.",
      "explain": "Join Customer to Orders on customer_id, and filter for orders.customer_id IS NULL to find customers with no orders.",
      "example": "\"I'd do a LEFT JOIN from Customer to Orders, keeping all customers regardless of a match, and then filter WHERE orders.customer_id IS NULL — that isolates exactly the customers who don't have any matching order record. This is the standard pattern for finding 'orphan' or unrelated records between two tables.\"",
      "summary10s": "\"LEFT JOIN + WHERE right_table.key IS NULL = finds unrelated records.\""
    }
  },
  {
    "id": "handling-null-values-and-condi",
    "category": "SQL",
    "question": "Handling NULL values and conditional mapping in SQL",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Use `COALESCE`/`ISNULL` for NULL handling, and `CASE WHEN` for conditional mapping.",
      "explain": "- `COALESCE(column, 'default')` — returns the first non-null value, good for substituting a default\n- `CASE WHEN condition THEN value ... END` — for conditional logic in SELECT\n- `IS NULL`/`IS NOT NULL` — for filtering rows based on null status in WHERE",
      "example": "\"For NULL handling, I use COALESCE to substitute a default value when a column is null, like COALESCE(phone, 'Not Provided'). For conditional mapping, I use a CASE WHEN expression in the SELECT clause to translate values based on conditions. And when filtering, I always remember to use IS NULL or IS NOT NULL rather than = NULL, since equality comparisons with NULL don't work in SQL.\"",
      "summary10s": "\"COALESCE for null defaults, CASE WHEN for conditional logic, IS NULL for filtering.\""
    }
  },
  {
    "id": "mapping-values-like-a-apple-b",
    "category": "SQL",
    "question": "Mapping values like A→Apple, B→Banana in SQL",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Use a `CASE WHEN` expression in the SELECT clause.",
      "explain": "Write a CASE expression that checks the column value and returns the mapped result.",
      "example": "\"I'd use a CASE expression right in the SELECT clause — checking the column against each expected value and returning the mapped label, with an ELSE clause to handle anything unexpected. For a large number of mappings, I might instead join against a small lookup/reference table rather than hardcoding a long CASE statement.\"",
      "summary10s": "\"CASE WHEN 'A' THEN 'Apple' WHEN 'B' THEN 'Banana' ELSE ... END — or join a lookup table for many values.\""
    }
  },
  {
    "id": "removing-duplicates-in-sql",
    "category": "SQL",
    "question": "Removing duplicates in SQL",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Use `SELECT DISTINCT` for query results, or `ROW_NUMBER()` with a delete for removing actual duplicate rows from a table.",
      "explain": "- `SELECT DISTINCT` — for a query result, simplest for read-only dedup\n- For deleting actual duplicate rows: use `ROW_NUMBER() OVER (PARTITION BY duplicate_columns ORDER BY id)`, then delete where row number > 1\n- Alternative: `GROUP BY` all columns and keep `MIN(id)`, delete the rest",
      "example": "\"For just a query result, SELECT DISTINCT is the simplest way to remove duplicates. But if I actually need to delete duplicate rows from a table, I use ROW_NUMBER() partitioned by the columns that define a duplicate, ordered by ID, and then delete every row where that row number is greater than 1 — keeping just the first occurrence of each duplicate group.\"",
      "summary10s": "\"SELECT DISTINCT for query results; ROW_NUMBER() + delete row_num > 1 for actual table cleanup.\""
    }
  },
  {
    "id": "defining-relationships-in-hibe",
    "category": "Spring Boot",
    "question": "Defining relationships in Hibernate",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Relationships are defined using annotations like `@OneToMany`, `@ManyToOne`, `@OneToOne`, and `@ManyToMany` on entity fields.",
      "explain": "- Annotate the field representing the association, specify `mappedBy` on the non-owning side\n- Use `@JoinColumn` to specify the foreign key column name\n- Choose `FetchType` (LAZY/EAGER) and `CascadeType` based on the relationship's needs",
      "example": "\"I define relationships using annotations directly on the entity fields — @ManyToOne, @OneToMany, and so on. For a bidirectional relationship, I mark the non-owning side with mappedBy pointing to the owning side's field, and use @JoinColumn to specify the actual foreign key column. I'm also careful to set the right FetchType and CascadeType based on how that relationship should actually behave in my application.\"",
      "summary10s": "\"Annotate fields with @OneToMany/@ManyToOne etc., use mappedBy + @JoinColumn to define the FK.\""
    }
  },
  {
    "id": "types-of-relationships-in-hibe",
    "category": "Spring Boot",
    "question": "Types of relationships in Hibernate",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "There are four relationship types — One-to-One, One-to-Many, Many-to-One, and Many-to-Many.",
      "explain": "- `@OneToOne` — e.g., User and UserProfile\n- `@OneToMany`/`@ManyToOne` — e.g., Department and Employees (inverse pair)\n- `@ManyToMany` — e.g., Students and Courses, uses a join table",
      "example": "\"There are four relationship types. OneToOne, like a User and their UserProfile. OneToMany and ManyToOne are two sides of the same relationship, like a Department having many Employees, and each Employee belonging to one Department. And ManyToMany, like Students and Courses, where I typically need a join table to represent the association, sometimes as a proper entity itself if it needs extra fields.\"",
      "summary10s": "\"OneToOne, OneToMany/ManyToOne, ManyToMany — each mapped with corresponding annotations.\""
    }
  },
  {
    "id": "constructor-injection-vs-sette",
    "category": "Spring Boot",
    "question": "Constructor injection vs Setter injection",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Constructor injection provides dependencies at object creation time; Setter injection provides them after the object is created, via setter methods.",
      "explain": "- Constructor — dependencies are mandatory, supports immutability (final fields), fails fast if missing\n- Setter — dependencies are optional, can be changed after construction, but object can exist in a partially-initialized state\n- Constructor injection is generally preferred for required dependencies",
      "example": "\"Constructor injection provides all dependencies at the time the object is created, so they can be marked final and are guaranteed non-null — if something's missing, the app fails fast at startup. Setter injection allows dependencies to be optional and even changed later, but that means the object can exist in a partially-initialized state, which I generally try to avoid for genuinely required dependencies. I default to constructor injection unless a dependency is truly optional.\"",
      "summary10s": "\"Constructor = mandatory, immutable, fail-fast. Setter = optional, mutable, partial-init risk.\""
    }
  },
  {
    "id": "what-happens-if-you-don-t-use",
    "category": "Spring Boot",
    "question": "What happens if you don't use @Autowired?",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "If there's only one constructor, Spring still auto-injects it since Spring 4.3+ — but for multiple constructors or field/setter injection, @Autowired becomes necessary.",
      "explain": "- Single-constructor class — Spring implicitly uses it for injection, @Autowired is optional\n- Multiple constructors — Spring needs `@Autowired` to know which one to use for injection\n- Field/setter injection without `@Autowired` — the field simply stays null, no automatic injection happens",
      "example": "\"If a class has only one constructor, Spring 4.3+ automatically uses it for dependency injection even without @Autowired — I don't strictly need the annotation there. But if there are multiple constructors, or I'm using field or setter injection, Spring needs @Autowired to know what to inject and where — without it, the field would just stay null.\"",
      "summary10s": "\"Single constructor: works without @Autowired since 4.3+. Multiple constructors/field injection: @Autowired required.\""
    }
  },
  {
    "id": "constructor-injection-without",
    "category": "Spring Boot",
    "question": "Constructor injection without @Autowired",
    "frequency": 1,
    "companies": [
      "Accenture"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "If a class has exactly one constructor, Spring automatically uses it for injection without needing @Autowired.",
      "explain": "- Spring 4.3+ implicit constructor injection rule applies only when there's a single constructor\n- No annotation needed on the constructor at all in this case\n- If there are multiple constructors, one must be explicitly marked `@Autowired`",
      "example": "\"If my class has just one constructor, I don't need to annotate it with @Autowired at all — Spring automatically detects and uses that single constructor for injection, since 4.3. I actually prefer this cleaner style in most of my classes, and I only add @Autowired explicitly when there are multiple constructors and I need to tell Spring which one to use.\"",
      "summary10s": "\"Single constructor → Spring auto-injects it, no @Autowired needed.\""
    }
  },
  {
    "id": "java-oops-concepts-real-world",
    "category": "Java",
    "question": "Explain OOPs concepts with real-world examples",
    "frequency": 1,
    "companies": [
      "Zensar Technologies"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Object-Oriented Programming revolves around four main concepts: Encapsulation, Abstraction, Inheritance, and Polymorphism.",
      "explain": "Encapsulation hides data (like a capsule); Abstraction hides implementation details (like a TV remote); Inheritance promotes code reuse (like parent-child traits); Polymorphism allows one interface to take multiple forms (like a person acting as a father, employee, and son).",
      "example": "\"In a real-world scenario, I think of Abstraction like driving a car—I know how to steer and brake, but I don't need to know the engine's internal workings. Encapsulation is like a bank account where my balance is private and only modified through specific methods like deposit(). Inheritance is like an 'Employee' class inheriting common fields from a 'Person' class, and Polymorphism is an 'Animal' interface where both 'Dog' and 'Cat' implement makeNoise() differently.\"",
      "summary10s": "Encapsulation (hide data), Abstraction (hide complexity), Inheritance (reuse code), Polymorphism (many forms)."
    }
  },
  {
    "id": "java-string-stringbuffer-stringbuilder",
    "category": "Java",
    "question": "Difference between String, StringBuffer, and StringBuilder",
    "frequency": 1,
    "companies": [
      "Zensar Technologies"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "String is immutable. StringBuffer and StringBuilder are mutable, but StringBuffer is thread-safe while StringBuilder is not.",
      "explain": "String creates a new object on every modification. StringBuffer is synchronized (slower but safe for multithreading). StringBuilder is not synchronized (faster, best for single-threaded string manipulations).",
      "example": "\"When I need a string that won't change, I just use String. If I'm building a complex string in a loop, I use StringBuilder because it's fast and avoids creating multiple objects in memory. I only use StringBuffer if I'm doing string manipulation across multiple threads, which is quite rare nowadays.\"",
      "summary10s": "String = immutable. StringBuilder = mutable/fast. StringBuffer = mutable/thread-safe."
    }
  },
  {
    "id": "java-immutability-importance",
    "category": "Java",
    "question": "Why is Immutability important in Java?",
    "frequency": 1,
    "companies": [
      "Zensar Technologies"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Immutable objects are inherently thread-safe, prevent accidental state changes, and can be safely used as keys in a HashMap.",
      "explain": "Once an immutable object is created, its state cannot change. This eliminates synchronization issues in concurrent programming, makes the code easier to reason about, and ensures the hash code remains constant (crucial for HashMaps).",
      "example": "\"I love using immutable objects, especially for configuration classes or data transfer objects (DTOs), because they are thread-safe out of the box—multiple threads can read them without any locks. It also guarantees that if I use the object as a HashMap key, its hash code won't change over time, which prevents memory leaks or 'lost' map entries.\"",
      "summary10s": "Thread-safe out of the box, safe as HashMap keys, no accidental mutations."
    }
  },
  {
    "id": "java-synchronization-handling",
    "category": "Java",
    "question": "How do you handle Synchronization in Multithreading?",
    "frequency": 1,
    "companies": [
      "Zensar Technologies"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Synchronization is handled using the synchronized keyword, ReentrantLocks, or concurrent collections.",
      "explain": "We can synchronize at the method level or block level (preferred for better performance). Alternatively, the java.util.concurrent package provides advanced tools like Locks, CountDownLatch, and thread-safe collections like ConcurrentHashMap.",
      "example": "\"When I need to prevent race conditions, my first choice is usually synchronized blocks over synchronized methods, so I only lock the critical section of the code and maintain performance. For more complex scenarios, I use ReentrantLock which gives me more control, like trying to acquire a lock without blocking indefinitely. Also, I heavily rely on ConcurrentHashMap instead of synchronizing entire collections.\"",
      "summary10s": "Use synchronized blocks for critical sections, ReentrantLocks for advanced control, or ConcurrentHashMap."
    }
  },
  {
    "id": "sql-joins-types",
    "category": "SQL",
    "question": "Joins and Their Types",
    "frequency": 1,
    "companies": [
      "Zensar Technologies"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Joins combine rows from two or more tables based on a related column. Types include INNER, LEFT, RIGHT, and FULL OUTER joins.",
      "explain": "INNER JOIN returns only matching rows. LEFT JOIN returns all from the left table and matched from the right. RIGHT JOIN returns all from the right and matched from the left. FULL OUTER JOIN returns all rows when there is a match in either table.",
      "example": "\"In a reporting dashboard, I often use an INNER JOIN to fetch employees who have an assigned department. But if I need a list of all employees regardless of whether they're assigned to a department yet, I use a LEFT JOIN with the employee table on the left, which returns NULLs for the missing department data.\"",
      "summary10s": "INNER (matches only), LEFT (all left + matches), RIGHT (all right + matches), FULL (everything)."
    }
  },
  {
    "id": "sql-acid-properties",
    "category": "SQL",
    "question": "ACID Properties in Databases",
    "frequency": 1,
    "companies": [
      "Zensar Technologies"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "ACID stands for Atomicity, Consistency, Isolation, and Durability, ensuring reliable transaction processing.",
      "explain": "Atomicity (all or nothing), Consistency (valid state before and after), Isolation (concurrent transactions don't interfere), and Durability (committed data is saved permanently even if power fails).",
      "example": "\"I think of ACID properties during a bank transfer. Atomicity ensures both the deduction and addition happen together—if one fails, both rollback. Consistency ensures account balances don't go negative if not allowed. Isolation ensures another transaction reading the balance doesn't see partial states. Durability guarantees that once the transfer says 'success', the money is safe even if the server crashes.\"",
      "summary10s": "Atomicity (all/nothing), Consistency (valid state), Isolation (no interference), Durability (permanent)."
    }
  },
  {
    "id": "coding-detect-cycle-linked-list",
    "category": "Java Coding",
    "question": "Detect Cycle in a Linked List",
    "frequency": 1,
    "companies": [
      "Zensar Technologies"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Use Floyd's Cycle-Finding Algorithm (Tortoise and Hare approach) with a slow and fast pointer.",
      "explain": "Initialize two pointers, slow moving one step and fast moving two steps. If there is a cycle, the fast pointer will eventually meet the slow pointer. If the fast pointer reaches null, there's no cycle.",
      "example": "\"To detect a cycle efficiently without extra memory, I use the slow and fast pointer technique. I move the slow pointer by one node and the fast pointer by two nodes. If they ever point to the same node, it means a cycle exists. This runs in O(N) time and uses O(1) space, making it much better than storing visited nodes in a HashSet.\"",
      "summary10s": "Slow pointer (1 step) + Fast pointer (2 steps). If they meet, there's a cycle."
    }
  },
  {
    "id": "coding-longest-palindrome-substring",
    "category": "Java Coding",
    "question": "Find the Longest Palindrome Substring",
    "frequency": 1,
    "companies": [
      "Zensar Technologies"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Use the 'Expand Around Center' approach to find the longest palindrome efficiently.",
      "explain": "Iterate through the string, treating each character (and the gap between characters) as the center of a potential palindrome. Expand outwards as long as characters match. Keep track of the maximum length found.",
      "example": "\"The most practical way to solve this in an interview is the 'Expand Around Center' method. For each character in the string, I expand outwards to check for both odd-length and even-length palindromes. It has O(N^2) time complexity and O(1) space, which is easier to implement and explain than complex algorithms like Manacher's.\"",
      "summary10s": "Iterate characters, treat each as a center, and expand outwards to check for palindromes."
    }
  },
  {
    "id": "java-try-with-resources-exceptions",
    "category": "Java",
    "question": "Explain Try-with-Resources. What happens if both try and close() throw exceptions?",
    "frequency": 1,
    "companies": [
      "EPAM"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Try-with-resources automatically closes resources. If both try block and close() throw, the try block exception is thrown and the close() exception is suppressed.",
      "explain": "Introduced in Java 7, it guarantees that resources implementing AutoCloseable are closed at the end of the statement. If an exception is thrown in the try block, and another exception is thrown while closing the resource, the first exception propagates, and the second one is added to it as a 'suppressed' exception (accessible via getSuppressed()).",
      "example": "\"I use try-with-resources whenever I deal with files, database connections, or streams to avoid writing messy finally blocks. In a scenario where both my main read logic and the automatic close() method throw exceptions, Java is smart enough to throw the main read exception. The close() exception isn't lost though—it's attached as a suppressed exception so I can still log it.\"",
      "summary10s": "Auto-closes AutoCloseable resources. try exception wins; close() exception is suppressed."
    }
  },
  {
    "id": "java-stream-api-internal-working",
    "category": "Java",
    "question": "How does Java 8 Stream API work internally?",
    "frequency": 1,
    "companies": [
      "EPAM"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Streams use a pipeline of intermediate operations (lazy) and a terminal operation (eager) to process data in a single pass without storing it.",
      "explain": "Internally, a Stream is composed of a Spliterator (source), a chain of Sink objects (operations), and a terminal operation. Intermediate operations are lazy and simply build a pipeline of operations. When the terminal operation is invoked, data is pulled through the pipeline in a single pass (fusion).",
      "example": "\"Think of a Stream as an assembly line. When I add intermediate operations like filter() or map(), I'm just setting up the machines on the line—no data moves yet. It's only when I call a terminal operation like collect() or forEach() that the data starts flowing through all the machines in one single pass. This lazy evaluation avoids unnecessary processing.\"",
      "summary10s": "Pipeline of lazy intermediate ops (Sinks) executed in a single pass upon a terminal op."
    }
  },
  {
    "id": "coding-flatmap-nested-list",
    "category": "Java Coding",
    "question": "Write a Java 8 program using flatMap() to flatten a nested list",
    "frequency": 1,
    "companies": [
      "EPAM"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Use stream().flatMap(List::stream).collect(Collectors.toList()) on the nested list.",
      "explain": "flatMap() transforms each element into a stream of its own, and then flattens all those streams into a single stream. It's perfect for converting List<List<Integer>> into List<Integer>.",
      "example": "\"If I have a List of Lists, say List<List<Integer>> nestedList, I can flatten it into a single list by calling nestedList.stream(), then chaining .flatMap(List::stream), and finally collecting it with .collect(Collectors.toList()). It's a clean, functional one-liner that replaces nested for-loops.\"",
      "summary10s": "nestedList.stream().flatMap(List::stream).collect(Collectors.toList());"
    }
  },
  {
    "id": "coding-unique-triplets-3sum",
    "category": "Java Coding",
    "question": "Find all unique triplets whose sum equals a given target",
    "frequency": 1,
    "companies": [
      "EPAM"
    ],
    "variations": [
      "Given an array, find all unique triplets whose sum equals a given target."
    ],
    "answerSEE": {
      "simple": "Sort the array, iterate through it, and use a two-pointer approach (left and right) for the remaining elements.",
      "explain": "First, sort the array. Then loop through each element (i). For each element, set a left pointer at i+1 and a right pointer at the end. Check the sum of these three. If it matches the target, add it to the result and skip duplicates for both i and the pointers to ensure unique triplets.",
      "example": "\"This is the classic 3Sum problem. I'd first sort the array, which takes O(N log N). Then I iterate through the array. For each number, I use the two-pointer technique on the rest of the array. The trick to keeping the triplets unique without using a Set is to explicitly skip adjacent duplicate numbers in my loops. The overall time complexity is O(N^2).\"",
      "summary10s": "Sort array -> Iterate i -> Two pointers (left=i+1, right=end) -> Skip duplicates. O(N^2)."
    }
  },
  {
    "id": "coding-merge-sort-implementation",
    "category": "Java Coding",
    "question": "Implement Merge Sort and explain its time and space complexity",
    "frequency": 1,
    "companies": [
      "EPAM"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Merge Sort divides the array in half recursively until single elements remain, then merges them back in sorted order.",
      "explain": "Time Complexity: O(N log N) in all cases (Best, Average, Worst) because it always divides the array completely and merges. Space Complexity: O(N) because it requires a temporary array during the merge phase.",
      "example": "\"To implement Merge Sort, I write a recursive function that splits the array into two halves until the sub-arrays have a size of 1. Then, I write a merge function that takes two sorted halves and combines them using a temporary array. It guarantees O(N log N) time, making it great for large datasets, though the O(N) space overhead makes Quicksort preferred for in-place sorting.\"",
      "summary10s": "Divide and conquer. Time: O(N log N) always. Space: O(N) for temp array."
    }
  },
  {
    "id": "coding-highest-paid-employee-per-department",
    "category": "Java Coding",
    "question": "Find the highest-paid employee from each department using Streams",
    "frequency": 1,
    "companies": [
      "EPAM"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Use Collectors.groupingBy() on department, and Collectors.maxBy() comparing salary.",
      "explain": "The pipeline looks like: employees.stream().collect(Collectors.groupingBy(Employee::getDepartment, Collectors.maxBy(Comparator.comparing(Employee::getSalary)))).",
      "example": "\"This is a classic stream aggregation problem. I would stream the list of employees and use the groupingBy collector. The first argument to groupingBy is the department name, and the second argument is a downstream collector—I'd use maxBy combined with a Comparator comparing the employees' salaries. This returns a Map<String, Optional<Employee>>.\"",
      "summary10s": "groupingBy(Employee::getDept, maxBy(Comparator.comparing(Employee::getSalary)))"
    }
  },
  {
    "id": "coding-process-large-concurrenthashmap",
    "category": "Java Coding",
    "question": "Process a large ConcurrentHashMap using multiple threads safely",
    "frequency": 1,
    "companies": [
      "EPAM"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Use the built-in parallel operations of ConcurrentHashMap, such as forEach() or search() with a parallelism threshold.",
      "explain": "ConcurrentHashMap in Java 8 introduced bulk concurrent operations (forEach, search, reduce) that accept a parallelismThreshold. If the map size exceeds this threshold, the operation executes in parallel using the common ForkJoinPool.",
      "example": "\"If I need to process a huge ConcurrentHashMap, I don't manually create threads. I use its built-in bulk parallel methods. For instance, I can call map.forEach(parallelismThreshold, (key, value) -> process(key, value)). If I set the threshold to 1, it will forcefully use multiple threads from the ForkJoinPool to process the entries concurrently, fully abstracting the thread safety away.\"",
      "summary10s": "Use map.forEach(parallelismThreshold, action) to automatically leverage the ForkJoinPool."
    }
  },
  {
    "id": "devops-migrate-on-premise-to-cloud",
    "category": "DevOps",
    "question": "How would you migrate a Java application from on-premise to Cloud?",
    "frequency": 1,
    "companies": [
      "EPAM"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Assess the app, dockerize it, choose a migration strategy (Lift-and-Shift vs Refactor), and set up CI/CD to deploy to a managed cloud service like AWS ECS/EKS.",
      "explain": "The process generally involves: 1. Assessment (dependencies, state, db). 2. Containerization (creating a Dockerfile). 3. Database migration (using tools like AWS DMS). 4. Re-platforming (using managed services instead of self-hosted). 5. CI/CD pipeline setup. 6. Cutover and monitoring.",
      "example": "\"I'd start by making the application 12-factor compliant—moving configurations to environment variables and externalizing state like sessions to Redis. Then, I'd dockerize the Java app. For the actual migration, if time is short, I'd do a 'Lift and Shift' to a managed service like AWS Elastic Beanstalk or ECS. Finally, I'd migrate the on-prem database to a managed RDS instance using a database migration service to minimize downtime.\"",
      "summary10s": "Externalize state (12-factor) -> Dockerize -> Migrate DB -> Deploy to ECS/EKS -> Setup CI/CD."
    }
  },
  {
    "id": "microservices-design-high-availability",
    "category": "Microservices",
    "question": "How would you design microservices for high availability?",
    "frequency": 1,
    "companies": [
      "EPAM"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Run multiple instances across different availability zones, use load balancers, implement circuit breakers, and decouple services asynchronously.",
      "explain": "High availability (HA) requires removing single points of failure. This involves redundancy (multiple instances/DB replicas), failover mechanisms, graceful degradation (circuit breakers/fallbacks), and asynchronous communication (Kafka/RabbitMQ) so a failed downstream service doesn't block upstream services.",
      "example": "\"To ensure HA, I deploy my Spring Boot microservices as multiple replicas across at least two Availability Zones behind an API Gateway and Load Balancer. I use Resilience4j for circuit breaking so a failing service degrades gracefully instead of causing cascading failures. Finally, I heavily rely on Kafka for inter-service communication—if a service goes down, messages just queue up safely until it recovers.\"",
      "summary10s": "Redundancy (Multi-AZ) + Load Balancing + Circuit Breakers + Asynchronous messaging (Kafka)."
    }
  },
  {
    "id": "microservices-handle-failures-between-services",
    "category": "Microservices",
    "question": "How would you handle failures between two microservices?",
    "frequency": 1,
    "companies": [
      "EPAM"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Use Retries for temporary glitches, Circuit Breakers to prevent cascading failures, and Fallback methods for graceful degradation.",
      "explain": "When Service A calls Service B, B might fail or timeout. A should first implement a short Retry mechanism. If B continues to fail, a Circuit Breaker opens to stop sending traffic to B, giving it time to recover. During this time, A should return a Fallback response (like cached data or a default value).",
      "example": "\"If my Order service calls the Inventory service synchronously, I wrap that Feign client call with Resilience4j. I configure a Retry for network blips. If the Inventory service goes down completely, the Circuit Breaker trips to OPEN. Instead of throwing a 500 error to the user, my Fallback method kicks in—perhaps accepting the order into a 'pending' state queue to be processed later when Inventory is back online.\"",
      "summary10s": "Retry (transient errors) -> Circuit Breaker (prevent overload) -> Fallback (graceful degradation)."
    }
  },
  {
    "id": "microservices-distributed-transactions",
    "category": "Microservices",
    "question": "How would you handle distributed transactions?",
    "frequency": 1,
    "companies": [
      "EPAM"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Avoid them if possible. If required, use the Saga pattern with compensating transactions.",
      "explain": "Traditional ACID transactions (like 2-Phase Commit) lock resources and don't scale in microservices. The Saga pattern breaks the transaction into local transactions. If one step fails, compensating transactions are triggered to undo the previous steps.",
      "example": "\"I avoid 2-Phase Commits because they create severe bottlenecks. Instead, I use the Saga pattern, usually orchestrated. For example, in an e-commerce checkout, the Order service creates a 'PENDING' order and sends an event. The Payment service charges the card. If the Inventory service then fails to reserve items, it publishes a failure event, which triggers the Payment service to issue a refund and the Order service to mark the order as 'CANCELLED' (these are the compensating transactions).\"",
      "summary10s": "Use the Saga Pattern. Break into local transactions and use compensating transactions on failure."
    }
  },
  {
    "id": "microservices-monitor-troubleshoot-production",
    "category": "Microservices",
    "question": "How would you monitor and troubleshoot a production microservices application?",
    "frequency": 1,
    "companies": [
      "EPAM"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Use centralized logging, distributed tracing, and metrics dashboards.",
      "explain": "Troubleshooting distributed systems requires three pillars of observability: Logs (ELK/EFK stack), Traces (Zipkin/Jaeger with Spring Cloud Sleuth/Micrometer Tracing), and Metrics (Prometheus + Grafana).",
      "example": "\"When an issue happens in production, my first stop is Grafana to check Prometheus metrics like CPU, memory, and error rates. If I see a spike, I copy the Trace ID of a failed request from the logs. Because I use Micrometer Tracing, that Trace ID is propagated across all microservices. I paste it into Jaeger to visually see exactly which service in the chain failed or caused the latency bottleneck. Then I check the centralized ELK logs for that specific Trace ID to see the exact stack trace.\"",
      "summary10s": "Centralized Logs (ELK), Distributed Tracing (Jaeger + Trace ID), Metrics (Prometheus + Grafana)."
    }
  },
  {
    "id": "what-is-rest-what-are-the-prin",
    "category": "System Design",
    "question": "What is REST? What are the principles of REST?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "REST is an architectural style for designing networked applications based on resources, using standard HTTP methods.",
      "explain": "REST stands for REpresentational State Transfer. Its main principles are:\n1. Client-Server separation\n2. Statelessness (server doesn't store client state)\n3. Cacheability\n4. Uniform Interface (using standard HTTP methods like GET/POST)\n5. Layered System\n6. Code on demand (optional)",
      "example": "\"REST is a set of rules for building web APIs. The core idea is treating everything as a resource identified by a URI. The most important principles I keep in mind while designing APIs are statelessness—meaning every request must contain all info needed to process it—and using the uniform interface of standard HTTP methods instead of custom actions.\"",
      "summary10s": "Resource-based architecture. Key principles: stateless, client-server, uniform interface."
    }
  },
  {
    "id": "rest-vs-soap-what-are-the-diff",
    "category": "System Design",
    "question": "REST vs SOAP — what are the differences?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "REST is an architectural style that uses HTTP and lightweight formats like JSON. SOAP is a strict protocol that relies exclusively on XML.",
      "explain": "REST: Architectural style, uses JSON/XML/plain text, stateless, works over HTTP, lightweight, easier to scale.\nSOAP: Strict protocol, only uses XML, requires WSDL contract, has built-in security (WS-Security) and ACID compliance, heavier.",
      "example": "\"REST is flexible and lightweight, usually sending JSON over HTTP, making it perfect for public APIs and modern microservices. SOAP is a rigid, heavier XML-based protocol. I've only used SOAP when integrating with legacy enterprise systems or when we needed its strict WS-Security standards, but otherwise, REST is my default choice.\"",
      "summary10s": "REST = lightweight style, JSON. SOAP = strict protocol, XML, built-in security."
    }
  },
  {
    "id": "what-is-the-difference-between",
    "category": "System Design",
    "question": "What is the difference between REST API and RESTful API?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "There is no strict technical difference; 'REST' is the architectural concept, and 'RESTful' describes an API that implements REST principles.",
      "explain": "REST (REpresentational State Transfer) is the set of constraints and principles defined by Roy Fielding.\nRESTful is an adjective describing an API or web service that adheres to those REST constraints.",
      "example": "\"In practice, they mean the same thing. REST is the architectural style itself, and RESTful is the adjective used to describe a service that actually follows those rules. If I build an API that is stateless, uses standard HTTP methods, and has a uniform interface, I call it a RESTful API.\"",
      "summary10s": "REST = the architecture/concept. RESTful = an API that implements REST."
    }
  },
  {
    "id": "what-are-the-http-methods-expl",
    "category": "System Design",
    "question": "What are the HTTP methods? Explain GET, POST, PUT, PATCH, DELETE.",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "They are verbs used to perform actions on resources: GET (read), POST (create), PUT (replace), PATCH (update partially), DELETE (remove).",
      "explain": "GET: Retrieve a resource.\nPOST: Create a new resource.\nPUT: Replace an entire resource.\nPATCH: Partially update a resource.\nDELETE: Remove a resource.",
      "example": "\"These map to CRUD operations. I use GET to fetch data, POST to create new records, and DELETE to remove them. For updates, I use PUT if I'm replacing the entire object, or PATCH if I'm just sending a few fields to update, like changing a user's status.\"",
      "summary10s": "GET=read, POST=create, PUT=replace full, PATCH=update partial, DELETE=remove."
    }
  },
  {
    "id": "what-is-the-difference-between-1",
    "category": "System Design",
    "question": "What is the difference between PUT and PATCH?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "PUT replaces the entire resource. PATCH partially updates the resource.",
      "explain": "If an object has 5 fields and you want to update 1:\n- PUT requires you to send all 5 fields. If you miss 4, they get overwritten to null.\n- PATCH only requires sending the 1 field you want to change.",
      "example": "\"PUT is meant to replace the whole resource. If a User has a name and email, and I only want to update the name using PUT, I still have to send the email in the payload. With PATCH, I only send the name, making the payload smaller and preventing accidental overwrites of fields I didn't mean to touch.\"",
      "summary10s": "PUT = full replace. PATCH = partial update."
    }
  },
  {
    "id": "is-get-idempotent-what-does-id",
    "category": "System Design",
    "question": "Is GET idempotent? What does idempotency mean?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Yes, GET is idempotent. Idempotency means making the same request multiple times yields the same result on the server.",
      "explain": "An operation is idempotent if executing it once has the same effect as executing it multiple times. GET just reads data without changing the server's state, so calling it 100 times leaves the server in the exact same state as calling it once.",
      "example": "\"Idempotency means repeating a request doesn't change the outcome on the server. GET is definitely idempotent because it only retrieves data. If I call GET /users/1 five times, the database state remains exactly the same. This makes it safe for clients to retry GET requests if a network timeout occurs.\"",
      "summary10s": "Idempotent = repeating request gives same server state. GET is idempotent (read-only)."
    }
  },
  {
    "id": "which-http-methods-are-safe-an",
    "category": "System Design",
    "question": "Which HTTP methods are safe and which are idempotent?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Safe methods (GET, HEAD, OPTIONS) do not modify data. Idempotent methods (GET, PUT, DELETE) leave the server in the same state no matter how many times they run.",
      "explain": "Safe: Don't change server state (GET, HEAD, OPTIONS). All safe methods are idempotent.\nIdempotent but not safe: Change state, but doing it multiple times has the same effect as once (PUT, DELETE).\nNeither: POST, PATCH (usually).",
      "example": "\"Safe methods like GET don't modify the database at all. Idempotent methods like PUT or DELETE do modify the database, but retrying them is harmless—deleting a record twice just means the second time it's already gone. POST is neither safe nor idempotent, because retrying a POST usually creates a duplicate record.\"",
      "summary10s": "Safe = read-only (GET). Idempotent = safe to retry (GET, PUT, DELETE)."
    }
  },
  {
    "id": "what-are-http-status-codes",
    "category": "System Design",
    "question": "What are HTTP status codes?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "They are standard numbers returned by the server to indicate the result of a request: 2xx (Success), 3xx (Redirect), 4xx (Client Error), 5xx (Server Error).",
      "explain": "1xx: Informational\n2xx: Success (200 OK, 201 Created)\n3xx: Redirection (301 Moved Permanently)\n4xx: Client Error (400 Bad Request, 401 Unauthorized, 404 Not Found)\n5xx: Server Error (500 Internal Server Error, 503 Service Unavailable)",
      "example": "\"Status codes tell the client what happened without parsing the body. I commonly use 200 for success, 201 when a POST creates a resource, 400 when the client sends bad data, 401 for auth failures, 404 if not found, and 500 when our code throws an unhandled exception.\"",
      "summary10s": "2xx = success. 4xx = client messed up. 5xx = server crashed."
    }
  },
  {
    "id": "how-do-you-create-a-rest-api-i",
    "category": "Spring Boot",
    "question": "How do you create a REST API in Spring Boot?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "By creating a class annotated with @RestController and defining methods mapped to HTTP verbs using @GetMapping, @PostMapping, etc.",
      "explain": "You add the spring-boot-starter-web dependency. Then create a Controller class marked with @RestController (which combines @Controller and @ResponseBody). Map endpoints using @RequestMapping or specific annotations like @GetMapping. Return domain objects or DTOs, and Spring automatically serializes them to JSON.",
      "example": "\"I start by annotating a class with @RestController. Then I write methods to handle endpoints, annotating them with @GetMapping or @PostMapping. I usually accept incoming data via @RequestBody or @PathVariable, process it using an injected service layer, and return a ResponseEntity containing my DTO, which Jackson automatically converts into JSON.\"",
      "summary10s": "Annotate class with @RestController, map methods with @GetMapping/@PostMapping, return objects."
    }
  },
  {
    "id": "difference-between-controller",
    "category": "Spring Boot",
    "question": "Difference between @Controller and @RestController.",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "@RestController is simply @Controller combined with @ResponseBody. It automatically converts returned objects into JSON/XML.",
      "explain": "@Controller is traditionally used in Spring MVC to return HTML views (like JSP or Thymeleaf). The returned string resolves to a view name.\n@RestController skips the view resolver. It writes the returned object directly to the HTTP response body in JSON/XML format.",
      "example": "\"If I use @Controller, Spring thinks I'm trying to render a web page template, so returning 'user' will look for a user.html file. I use @RestController for building APIs because it automatically applies @ResponseBody to all methods, telling Spring to convert my Java objects straight into JSON and send them back to the client.\"",
      "summary10s": "@RestController = @Controller + @ResponseBody. Use for APIs to return JSON instead of HTML."
    }
  },
  {
    "id": "difference-between-requestmapp",
    "category": "Spring Boot",
    "question": "Difference between @RequestMapping, @GetMapping, @PostMapping, etc.",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "@RequestMapping is the generic annotation to map a URL, while @GetMapping and @PostMapping are specialized shortcuts for specific HTTP methods.",
      "explain": "@RequestMapping(value=\"/users\", method=RequestMethod.GET) is the long form.\n@GetMapping(\"/users\") is the exact same thing but shorter and more readable.\nIntroduced in Spring 4.3 to reduce boilerplate.",
      "example": "\"@RequestMapping is the base annotation, but honestly, I almost never use it at the method level anymore. I use @GetMapping, @PostMapping, and @PutMapping because they are cleaner and more expressive. I do still use @RequestMapping at the class level to define the base path for all endpoints in the controller.\"",
      "summary10s": "@GetMapping is just a clean shortcut for @RequestMapping(method = GET)."
    }
  },
  {
    "id": "how-does-requestbody-work-inte",
    "category": "Spring Boot",
    "question": "How does @RequestBody work internally?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "@RequestBody tells Spring to deserialize the incoming HTTP request body (usually JSON) into a Java object using an HttpMessageConverter.",
      "explain": "When a request arrives, Spring's DispatcherServlet sees the @RequestBody annotation. It checks the request's Content-Type header (e.g., application/json). It then finds a matching HttpMessageConverter (like MappingJackson2HttpMessageConverter) to map the JSON payload into your Java DTO.",
      "example": "\"When I put @RequestBody before a method parameter, Spring intercepts the incoming HTTP request, reads the JSON payload, and uses Jackson (the default HttpMessageConverter) to deserialize that JSON into my Java DTO class. It essentially maps JSON fields to Java properties automatically.\"",
      "summary10s": "Deserializes HTTP request body JSON into a Java object using Jackson/HttpMessageConverter."
    }
  },
  {
    "id": "how-does-pathvariable-work",
    "category": "Spring Boot",
    "question": "How does @PathVariable work?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "@PathVariable extracts values from the URI path itself, like capturing '123' from '/users/123'.",
      "explain": "You define a template variable in the mapping, like @GetMapping(\"/users/{id}\"). Then use @PathVariable(\"id\") Long id as a method argument to bind that piece of the URL to the variable.",
      "example": "\"I use @PathVariable when the data is part of the resource URL. For example, if I have an endpoint /users/{id}, I use @PathVariable to grab that 'id' value so I can look up that specific user in the database. It's the standard RESTful way to identify specific resources.\"",
      "summary10s": "Extracts dynamic values directly from the URL path (e.g., /users/{id})."
    }
  },
  {
    "id": "how-does-requestparam-work",
    "category": "Spring Boot",
    "question": "How does @RequestParam work?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "@RequestParam extracts values from the query string of a URL, like capturing 'active' from '/users?status=active'.",
      "explain": "It binds request parameters (query params or form data) to method arguments. It allows specifying whether the param is required and providing a defaultValue.",
      "example": "\"While @PathVariable identifies a resource, I use @RequestParam for filtering, sorting, or pagination. For instance, in an endpoint like /users?page=2&size=10, I use @RequestParam to extract 'page' and 'size'. I usually set required=false or provide a defaultValue so the API doesn't break if the client omits them.\"",
      "summary10s": "Extracts values from the URL query string (e.g., ?page=1)."
    }
  },
  {
    "id": "what-happens-internally-when-a",
    "category": "Spring Boot",
    "question": "What happens internally when a JWT request reaches your API?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The JWT filter intercepts it, extracts the token, verifies the signature, and sets the authenticated user in the SecurityContext.",
      "explain": "1. Client sends request with `Authorization: Bearer <token>`.\n2. OncePerRequestFilter intercepts the request.\n3. Extracts the token.\n4. Uses the secret key to verify the signature (ensuring it wasn't tampered with) and checks expiration.\n5. Extracts username/roles from claims.\n6. Creates a UsernamePasswordAuthenticationToken and stores it in SecurityContextHolder.\n7. Request proceeds to the controller.",
      "example": "\"When a request arrives, my custom OncePerRequestFilter catches it. It grabs the Bearer token from the header and uses my secret key to verify the signature and ensure it hasn't expired. If it's valid, I extract the user's ID and roles from the token claims, build an Authentication object, and inject it into the SecurityContextHolder. Then the controller can safely process the request.\"",
      "summary10s": "Filter extracts token → verifies signature/expiration → sets user in SecurityContext."
    }
  },
  {
    "id": "where-should-jwt-be-stored-on",
    "category": "System Design",
    "question": "Where should JWT be stored on the client side?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "In an HttpOnly, Secure cookie to protect against XSS, or in memory. Avoid localStorage due to XSS vulnerability.",
      "explain": "If stored in localStorage, any malicious JavaScript (XSS attack) can read the token and steal the session. If stored in an HttpOnly cookie, JavaScript cannot access it, preventing XSS. However, cookies require CSRF protection.",
      "example": "\"The safest place is an HttpOnly, Secure cookie. If I store it in localStorage, it's vulnerable to Cross-Site Scripting (XSS) because any rogue script on the page can read it. An HttpOnly cookie hides the token from JavaScript entirely. If I can't use cookies, I store it in a closure in memory, but that means the user has to re-login if they refresh the page.\"",
      "summary10s": "HttpOnly Secure cookies (prevents XSS) or in-memory. Avoid localStorage."
    }
  },
  {
    "id": "what-aspects-of-spring-have-yo",
    "category": "Spring Boot",
    "question": "What aspects of Spring have you worked on other than REST APIs?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Mention other Spring ecosystem components you have experience with, like Spring Data JPA, Spring Security, Spring Batch, or Spring Cloud.",
      "explain": "REST APIs are built using Spring Web (Spring MVC). Other common aspects include:\n- Spring Data JPA for database interactions.\n- Spring Security for authentication and authorization.\n- Spring AOP for cross-cutting concerns like logging.\n- Spring Boot Actuator for health checks and metrics.\n- Spring Batch for bulk data processing.",
      "example": "\"While I spend a lot of time building REST APIs with Spring Web, I heavily use Spring Data JPA for my database layer and Spring Security with JWT for protecting endpoints. In my last project, I also set up Spring Boot Actuator to expose health metrics to Prometheus, and I've written scheduled cron jobs using Spring's @Scheduled annotation.\"",
      "summary10s": "Mention Spring Data JPA, Security, Actuator, AOP, or Scheduling."
    }
  },
  {
    "id": "why-did-you-use-native-queries",
    "category": "Spring Boot",
    "question": "Why did you use Native Queries?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Native queries are used for performance optimization or to access database-specific features not supported by JPQL.",
      "explain": "Sometimes ORM-generated queries are inefficient for complex reports. Native queries allow using DB-specific features like Window Functions, CTEs (Common Table Expressions), or specialized data types (JSONB in PostgreSQL, spatial data).",
      "example": "\"I used a Native Query recently because I needed to use a PostgreSQL-specific window function to calculate a rolling average. JPQL doesn't support that syntax natively. I also drop down to Native Queries when Hibernate generates a very inefficient, highly-nested SQL query for a complex report, so I can write optimized raw SQL instead.\"",
      "summary10s": "Used for DB-specific features (Window functions/JSON) or complex performance tuning."
    }
  },
  {
    "id": "how-do-you-perform-joins-in-jp",
    "category": "Spring Boot",
    "question": "How do you perform joins in JPA?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "By mapping relationships with annotations like @OneToMany and navigating them in JPQL, or by using explicit JOIN clauses in @Query.",
      "explain": "If entities are properly mapped, you can just do `SELECT e FROM Employee e JOIN e.department d`. You can also use FETCH JOIN to prevent the N+1 problem by pulling the related data in a single query.",
      "example": "\"If I have my entities mapped with @ManyToOne, I can just write a JPQL query like 'SELECT u FROM User u JOIN u.roles r'. To avoid the N+1 problem, I usually change that to 'JOIN FETCH u.roles' so Hibernate retrieves both the user and their roles in a single database round-trip instead of executing separate queries later.\"",
      "summary10s": "Use JPQL 'JOIN' navigating entity relationships. Use 'JOIN FETCH' to avoid N+1."
    }
  },
  {
    "id": "explain-the-n-1-query-problem",
    "category": "Spring Boot",
    "question": "Explain the N+1 Query Problem.",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "It happens when an ORM executes 1 query to fetch a list of parent entities, and then N additional queries to fetch their lazy-loaded children.",
      "explain": "If you query 100 Authors, and then loop through to get each Author's Books, Hibernate executes 1 query for the authors, and 100 separate queries for the books (101 total). This destroys database performance.",
      "example": "\"The N+1 problem is a massive performance killer. It occurs when I fetch a list of parent records, say 50 Users, and then loop through them to access their lazy-loaded Addresses. Hibernate fires 1 query for the users, and 50 more for the addresses. I fix this by using a 'JOIN FETCH' in JPQL or an @EntityGraph so it all comes back in one single query.\"",
      "summary10s": "1 query for parents + N queries for children = bad performance. Fix with JOIN FETCH."
    }
  },
  {
    "id": "what-is-auditing",
    "category": "Spring Boot",
    "question": "What is Auditing?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Auditing is tracking who created or modified an entity and when.",
      "explain": "In Spring Data JPA, you enable this with @EnableJpaAuditing and use annotations like @CreatedDate, @LastModifiedDate, @CreatedBy, and @LastModifiedBy on entity fields. Spring automatically populates these timestamps and user details when saving.",
      "example": "\"Auditing keeps a track record of data changes. I use Spring Data JPA's auditing features so I don't have to manually set timestamps. I just add @CreatedDate and @LastModifiedDate to my base entity, add @EnableJpaAuditing on a config class, and Spring automatically populates those fields every time a record is inserted or updated.\"",
      "summary10s": "Auto-tracking creation/modification times and users using @CreatedDate / @LastModifiedDate."
    }
  },
  {
    "id": "if-placeorder-internally-calls",
    "category": "Spring Boot",
    "question": "If placeOrder() internally calls makePayment() within the same class and both methods are annotated with @Transactional, how many transactions will be created and why?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Only one transaction is created because self-invocation bypasses the Spring AOP proxy.",
      "explain": "Spring's @Transactional works via AOP proxies. When an external caller calls placeOrder(), the proxy starts a transaction. When placeOrder() calls makePayment() internally (this.makePayment()), the call happens directly on the instance, bypassing the proxy. Therefore, makePayment()'s @Transactional is completely ignored.",
      "example": "\"Only one transaction is created. Because Spring uses AOP proxies for @Transactional, the proxy only intercepts calls coming from outside the class. When placeOrder() makes an internal call to this.makePayment(), it bypasses the proxy entirely, so the @Transactional annotation on makePayment() is simply ignored.\"",
      "summary10s": "One. Self-invocation bypasses the Spring AOP proxy, ignoring the second annotation."
    }
  },
  {
    "id": "what-is-transaction-propagatio",
    "category": "Spring Boot",
    "question": "What is transaction propagation?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Propagation determines how a method handles joining or creating transactions when called by another transactional method.",
      "explain": "It defines the boundary of the transaction. Default is REQUIRED (join existing transaction, or create new if none). Other common ones are REQUIRES_NEW (suspend current, create fresh transaction) and SUPPORTS (execute in transaction if one exists, else non-transactional).",
      "example": "\"Propagation decides if a method joins an existing transaction or starts a new one. The default is REQUIRED, meaning it joins the caller's transaction. I use REQUIRES_NEW when I need a piece of code to commit regardless of the main transaction—like writing to an audit log table even if the main business process rolls back.\"",
      "summary10s": "Rules for transaction boundaries. Default: REQUIRED (joins existing). REQUIRES_NEW (starts fresh)."
    }
  },
  {
    "id": "explain-the-complete-spring-se",
    "category": "Spring Boot",
    "question": "Explain the complete Spring Security authentication flow.",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "A request is intercepted by a filter, authenticated by an AuthenticationManager using a UserDetailsService, and the result is stored in the SecurityContext.",
      "explain": "1. Request hits `UsernamePasswordAuthenticationFilter`.\n2. Filter delegates to `AuthenticationManager`.\n3. Manager calls `AuthenticationProvider`.\n4. Provider uses `UserDetailsService` to load the user from the DB and checks the password.\n5. On success, an `Authentication` object is saved in the `SecurityContextHolder`.",
      "example": "\"When a user logs in, the request hits an authentication filter which creates an unauthenticated token and passes it to the AuthenticationManager. The manager delegates to an AuthenticationProvider, which uses my custom UserDetailsService to fetch the user from the database. It verifies the password, and if correct, saves the authenticated user details into the SecurityContextHolder.\"",
      "summary10s": "Filter -> AuthManager -> AuthProvider -> UserDetailsService -> DB -> SecurityContext."
    }
  },
  {
    "id": "who-generates-the-jwt-token-do",
    "category": "Spring Boot",
    "question": "Who generates the JWT token? Does Spring Security generate JWT automatically?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The developer generates the JWT token. Spring Security does NOT generate it automatically.",
      "explain": "Spring Security handles the authentication flow, but it has no built-in mechanism to generate JWTs. You must use a library like `jjwt` (Java JWT) to manually create the token after a successful login, sign it with your secret key, and return it to the client.",
      "example": "\"Spring Security doesn't generate JWTs out of the box. Once Spring Security successfully authenticates a user's credentials, I write custom logic to generate the token. I use the 'jjwt' library to build the token, add claims like the username and roles, sign it with an HMAC secret key, and return it in the HTTP response.\"",
      "summary10s": "Developer generates it manually (usually with jjwt library). Spring Security doesn't do it."
    }
  },
  {
    "id": "access-token-vs-refresh-token",
    "category": "System Design",
    "question": "Access Token vs Refresh Token.",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The Access Token is a short-lived token used to access APIs. The Refresh Token is a long-lived token used only to get a new Access Token.",
      "explain": "Access Tokens are sent with every request, so they are vulnerable to theft. Making them short-lived (e.g., 15 mins) minimizes the window of attack. Refresh Tokens are stored securely and used only when the Access Token expires to fetch a fresh one without forcing the user to log in again.",
      "example": "\"The Access Token is what the client sends in the Authorization header to hit my APIs. I keep its lifespan very short, like 15 minutes, for security. When it expires, the client sends the long-lived Refresh Token to a specific /refresh endpoint. My server validates it against the database and issues a brand new Access Token.\"",
      "summary10s": "Access = short-lived, used for API calls. Refresh = long-lived, used to get new Access tokens."
    }
  },
  {
    "id": "why-does-the-refresh-token-hav",
    "category": "System Design",
    "question": "Why does the Refresh Token have a longer expiry than the Access Token?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "To balance security and user experience. Short access tokens limit damage if stolen, while long refresh tokens keep users logged in without re-entering passwords.",
      "explain": "If an access token is intercepted, it is only valid for a few minutes. Since it's sent on every request, the risk is higher. The refresh token is rarely sent over the network. If the refresh token is revoked on the server, the attacker loses access once the short-lived access token expires.",
      "example": "\"It's a security compromise. Access tokens are sent with every single request, increasing their chance of being intercepted, so we make them expire quickly. Refresh tokens are only sent once every 15 minutes. By keeping access tokens short, we limit the time an attacker can use a stolen token, while the long refresh token ensures the real user doesn't have to keep typing their password.\"",
      "summary10s": "Access tokens are sent often (high risk) so they expire fast. Refresh tokens provide seamless UX."
    }
  },
  {
    "id": "what-happens-when-the-access-t",
    "category": "System Design",
    "question": "What happens when the Access Token expires?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The server returns a 401 Unauthorized, and the client uses the Refresh Token to silently request a new Access Token.",
      "explain": "When the API returns 401, the frontend catches the error, transparently makes a request to the `/refresh-token` endpoint using the Refresh Token, receives a new Access Token, and retries the original failed API request.",
      "example": "\"When the Access Token expires, my Spring Boot API throws an expired token exception and returns a 401 Unauthorized. On the frontend, an Axios interceptor catches that 401, pauses the failed request, and uses the Refresh Token to silently fetch a new Access Token. It then replaces the old token and retries the original request, so the user never notices anything.\"",
      "summary10s": "API returns 401. Client intercepts it, uses refresh token to get a new access token, and retries."
    }
  },
  {
    "id": "why-does-spring-security-use-f",
    "category": "Spring Boot",
    "question": "Why does Spring Security use Filters instead of Interceptors?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Because security must be applied before the request even reaches the Spring MVC DispatcherServlet.",
      "explain": "If security relied on Interceptors, the request would have already entered the Spring context. Using Filters ensures malicious or unauthenticated requests are rejected at the Servlet container level, protecting the entire application.",
      "example": "\"Spring Security relies on a chain of Filters because security needs to act as the absolute first line of defense. A Filter intercepts the HTTP request before it even reaches Spring's DispatcherServlet. If they used Interceptors, a malicious request would make it all the way into the Spring MVC context before being blocked, which is too late.\"",
      "summary10s": "Filters block requests before they enter Spring MVC. Security must be the first line of defense."
    }
  },
  {
    "id": "how-are-partitions-assigned-to",
    "category": "Microservices",
    "question": "How are partitions assigned to consumers?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The Group Coordinator assigns them evenly using a partition assignment strategy (like Range or RoundRobin).",
      "explain": "When consumers join a group, a Group Coordinator (one of the brokers) elects a Group Leader. The Leader calculates the partition assignments (e.g., matching partitions to consumers) and sends it back to the Coordinator, which notifies the consumers.",
      "example": "\"Kafka handles this automatically through a Group Coordinator. When my microservices start up, they join the consumer group. One consumer becomes the leader and decides the assignment—typically using a RoundRobin or Range strategy. It ensures that if there are 4 partitions and 2 consumers, they get 2 partitions each.\"",
      "summary10s": "Group Coordinator balances them using a strategy like RoundRobin."
    }
  },
  {
    "id": "what-happens-if-there-are-more",
    "category": "Microservices",
    "question": "What happens if there are more consumers than partitions?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The extra consumers will sit idle and do nothing.",
      "explain": "A single partition can only be consumed by ONE consumer in a given group at a time. If you have 3 partitions and 5 consumers, 3 consumers will process data, and 2 will sit completely idle.",
      "example": "\"If I have 4 partitions but scale my microservice up to 6 instances in the same consumer group, 2 of those instances will just sit idle. A partition can only be read by one consumer in a group to guarantee ordering. Those extra instances only become useful if one of the active consumers crashes, at which point Kafka will reassign a partition to an idle one.\"",
      "summary10s": "Extra consumers sit idle. 1 partition = max 1 consumer per group."
    }
  },
  {
    "id": "what-happens-when-a-consumer-i",
    "category": "Microservices",
    "question": "What happens when a consumer in a Consumer Group fails?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Kafka triggers a 'Rebalance' and reassigns its partitions to the remaining healthy consumers in the group.",
      "explain": "Consumers send periodic heartbeats to the Group Coordinator. If a heartbeat is missed, the Coordinator assumes the consumer died, removes it from the group, and halts processing briefly to redistribute all partitions among the surviving consumers.",
      "example": "\"If one of my Payment microservice instances crashes, it stops sending heartbeats to the Kafka Group Coordinator. Kafka notices this timeout, drops it from the group, and triggers a Rebalance. The partitions that were assigned to the dead instance are quickly handed over to the remaining healthy instances, so message processing continues.\"",
      "summary10s": "Missed heartbeat triggers a Rebalance. Partitions are shifted to surviving consumers."
    }
  },
  {
    "id": "how-does-github-copilot-work",
    "category": "Other",
    "question": "How does GitHub Copilot work?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "It acts as an AI pair programmer by analyzing your current file's context and sending it to a Large Language Model (OpenAI's Codex) to predict the next lines of code.",
      "explain": "It reads the code, comments, and open tabs in your IDE, constructs a prompt, and sends it to the cloud. The LLM processes the patterns and returns synthesized code suggestions.",
      "example": "\"Copilot uses a large language model behind the scenes. When I write a comment or a method signature, my IDE plugin gathers that context—along with nearby code and even other open tabs—and sends it to the model. The AI then predicts the most logical code to follow and returns it as a ghost-text suggestion. It's essentially an extremely advanced auto-complete.\"",
      "summary10s": "Sends IDE context to an LLM to predict and suggest the next lines of code."
    }
  },
  {
    "id": "what-is-an-llm-large-language",
    "category": "Other",
    "question": "What is an LLM (Large Language Model)?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "It's an AI model trained on massive amounts of text data to understand and generate human-like language based on probability.",
      "explain": "LLMs like GPT-4 use deep neural networks (Transformers) to predict the next word in a sequence. By processing billions of parameters, they learn grammar, coding syntax, and complex reasoning patterns.",
      "example": "\"An LLM is a massive AI model built on Transformer architecture. It's trained on terabytes of internet data, including open-source code. At its core, it's just predicting the next most probable word or token based on the prompt it's given, but because of its sheer scale, it exhibits complex reasoning and code-generation abilities.\"",
      "summary10s": "Massive AI trained on text/code to predict the next token, mimicking understanding."
    }
  },
  {
    "id": "how-would-you-design-an-ai-bas",
    "category": "System Design",
    "question": "How would you design an AI-based code generation application?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "I'd use an IDE plugin for the frontend, a backend API to format the context, and integrate with an LLM API for code generation.",
      "explain": "Frontend: VS Code/IntelliJ plugin to capture context (cursor position, comments, imports).\nBackend: An API gateway that sanitizes inputs, enforces rate limiting, and constructs the prompt using Retrieval-Augmented Generation (RAG) to inject local codebase knowledge.\nModel: A fast LLM endpoint to generate the code completion.",
      "example": "\"I would build an IDE plugin that listens to keystrokes and gathers context, like the current file and imported libraries. It sends this to a secure backend API. The backend could use RAG (Retrieval-Augmented Generation) to search the company's internal codebase for similar patterns, append that to the prompt, and send it to an LLM like GPT-4. The backend then streams the generated code back to the IDE.\"",
      "summary10s": "IDE plugin gathers context -> Backend adds local codebase info (RAG) -> LLM generates code."
    }
  },
  {
    "id": "do-you-think-ai-will-change-so",
    "category": "Other",
    "question": "Do you think AI will change software development?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Yes, it shifts developers from writing boilerplate code to focusing on system design, architecture, and complex business logic.",
      "explain": "AI speeds up typing, debugging, and writing unit tests. However, it still requires humans to understand the business requirements, design the macro-architecture, and review the AI's output for security and edge cases.",
      "example": "\"Absolutely. It's already acting as an incredible accelerator. Instead of spending hours writing boilerplate CRUD endpoints or standard unit tests, AI generates it in seconds. This allows me to spend my time on what actually matters: designing scalable architectures, understanding complex business requirements, and reviewing code for security flaws.\"",
      "summary10s": "Yes, automates boilerplate so devs can focus on architecture and business logic."
    }
  },
  {
    "id": "will-ai-replace-software-devel",
    "category": "Other",
    "question": "Will AI replace software developers?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "No, AI is a tool that augments developers, much like high-level programming languages replaced assembly code.",
      "explain": "AI lacks context regarding business strategy, user experience, and real-world edge cases. It requires strict supervision. Developers will transition into 'AI supervisors' and systems engineers.",
      "example": "\"I don't believe it will replace developers, but developers who use AI will replace those who don't. AI is fantastic at writing isolated functions, but it lacks the domain knowledge to architect an entire enterprise system or sit in a meeting and figure out what a client actually wants. Our job will evolve from purely writing syntax to reviewing AI output and orchestrating systems.\"",
      "summary10s": "No. It's an assistant. Devs who use AI will replace devs who don't."
    }
  },
  {
    "id": "why-do-you-perform-code-review",
    "category": "Other",
    "question": "Why do you perform Code Reviews?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "To catch bugs early, ensure code quality, share knowledge, and maintain consistency across the codebase.",
      "explain": "Code reviews act as a gatekeeper. They prevent bad design, security flaws, and performance issues from reaching production. They also spread domain knowledge so no single developer becomes a bottleneck.",
      "example": "\"I perform code reviews to catch mistakes before they hit production, but honestly, knowledge sharing is just as important. When I review a junior dev's code, it's a mentoring opportunity. When a senior reviews my code, I learn new patterns. It also ensures that if I go on vacation, at least one other person understands the feature I just built.\"",
      "summary10s": "Catches bugs, ensures maintainability, and spreads knowledge across the team."
    }
  },
  {
    "id": "what-do-you-check-during-a-cod",
    "category": "Other",
    "question": "What do you check during a Code Review?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "I check business logic correctness, code readability, performance, test coverage, and security flaws.",
      "explain": "Key areas:\n1. Logic: Does it meet the requirement?\n2. Readability: Naming conventions, clean code.\n3. Performance: N+1 query issues, optimal loops.\n4. Tests: Are there unit tests for edge cases?\n5. Security: Input validation, proper auth checks.",
      "example": "\"First, I verify the logic actually satisfies the Jira ticket. Then I look for performance traps, like doing a database query inside a loop (N+1 problem) or missing indexes. I check readability—if a method is 200 lines long, I ask them to refactor it. Finally, I ensure there is adequate unit test coverage and no hardcoded secrets or SQL injection vulnerabilities.\"",
      "summary10s": "Logic correctness, readability, performance (no N+1), test coverage, and security."
    }
  },
  {
    "id": "java-hashmap-vs-concurrenthashmap",
    "category": "Java",
    "question": "\"HashMap\" vs \"ConcurrentHashMap\"?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "HashMap is not thread-safe; ConcurrentHashMap allows safe concurrent access by locking at a granular level.",
      "explain": "HashMap can cause infinite loops or data corruption under concurrent updates. ConcurrentHashMap solves this by dividing the map into segments (or using CAS and node-level locks in Java 8+) so multiple threads can read and write simultaneously without locking the entire map.",
      "example": "\"If I have multiple threads updating a shared cache, using HashMap is dangerous and could corrupt the data structure. I'd use ConcurrentHashMap because it allows safe parallel modifications and is much more scalable than wrapping a normal map with Collections.synchronizedMap(), which locks the whole map on every operation.\"",
      "summary10s": "HashMap = not thread-safe. ConcurrentHashMap = thread-safe, scalable, locks only specific nodes instead of the whole map."
    }
  },
  {
    "id": "java-out-of-memory-error",
    "category": "Java",
    "question": "What happens when a Java application gets \"OutOfMemoryError\"?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The JVM cannot allocate the required memory, meaning the application is either leaking memory or needs a higher heap limit.",
      "explain": "An OOM error happens when the JVM runs out of heap space or GC overhead limit is exceeded. It usually crashes the affected thread. To fix it, you need to analyze heap usage, check garbage collection behavior, find objects retained in memory unnecessarily, and look for memory leaks using heap dumps.",
      "example": "\"When I see an OutOfMemoryError, I first check if the heap size is just too small for the traffic. If it's appropriately sized, I suspect a memory leak. I would trigger a heap dump, load it into a tool like Eclipse MAT, and look for objects that shouldn't be retained, like unclosed database connections or static collections growing indefinitely.\"",
      "summary10s": "JVM is out of memory. Fix by checking heap limits or analyzing a heap dump for memory leaks."
    }
  },
  {
    "id": "system-design-api-suddenly-slow",
    "category": "System Design",
    "question": "Your API suddenly becomes slow. What do you check?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "I would check application metrics, database queries, external API calls, and resource utilization like CPU or memory.",
      "explain": "Slow APIs are often caused by external bottlenecks rather than code. You should check if database queries are missing indexes or taking too long, if third-party services are timing out, if the connection pool is exhausted, or if the JVM is spending too much time in Garbage Collection.",
      "example": "\"First, I'd check our APM tools like Datadog or New Relic to find where the time is being spent. If it's a database issue, I'll look for slow queries or lock contention. If it's an external service, I'll check its response times. If both are fine, I'd look at the server's CPU, memory, GC logs, and thread pools to see if the application itself is starved for resources.\"",
      "summary10s": "Check APM for bottlenecks: slow DB queries, external API timeouts, thread pool exhaustion, or high GC pauses."
    }
  },
  {
    "id": "system-design-db-connection-pool-exhausted",
    "category": "System Design",
    "question": "What happens if the database connection pool is exhausted?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "New requests wait for a connection until they timeout, causing the application to become unresponsive.",
      "explain": "When all connections are busy, new threads are blocked waiting for a connection to become available. If this wait exceeds the timeout, the app throws an exception. This is usually caused by slow queries, unclosed connections, long-running transactions, or simply an undersized pool during traffic spikes.",
      "example": "\"If the pool is exhausted, users start seeing timeouts because requests can't get a database connection. To resolve it, I'd first check for connection leaks—where code forgot to close a connection. Then I'd look for long-running transactions holding connections open unnecessarily. Only after ruling those out would I consider just increasing the pool size.\"",
      "summary10s": "Requests queue up and timeout. Caused by connection leaks, slow queries, or long transactions holding connections."
    }
  },
  {
    "id": "system-design-blindly-increase-timeouts",
    "category": "System Design",
    "question": "Why shouldn't you blindly increase API timeouts?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Increasing timeouts keeps threads occupied longer, which can quickly exhaust your application's resources and cause cascading failures.",
      "explain": "If a downstream service is slow, increasing the timeout means your application waits longer, tying up a thread and memory for each request. Under high traffic, this will exhaust your thread pool or connection pool, bringing down your entire application even if the original issue was external.",
      "example": "\"If I blindly increase a timeout from 5 to 30 seconds, and the downstream service is hanging, my application will quickly use up all its threads waiting. This leads to thread pool exhaustion, meaning my app can't serve *any* requests, even the healthy ones. Instead of increasing timeouts, I'd investigate why it's slow or implement a circuit breaker to fail fast.\"",
      "summary10s": "Longer timeouts = threads held longer = thread pool exhaustion = cascading failure. Use circuit breakers instead."
    }
  },
  {
    "id": "spring-boot-global-exception-handling",
    "category": "Spring Boot",
    "question": "How do you handle exceptions globally in Spring Boot?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Use the @ControllerAdvice annotation along with @ExceptionHandler to catch exceptions across the entire application and return consistent error responses.",
      "explain": "Instead of using try-catch blocks in every controller, you define a global advice class. This class intercepts exceptions thrown anywhere in the request lifecycle and maps them to standard HTTP status codes and uniform JSON error payloads.",
      "example": "\"I create a class annotated with @ControllerAdvice and define methods with @ExceptionHandler for specific exceptions, like ResourceNotFoundException. This allows me to centralize error handling, ensuring every API returns a consistent JSON structure with an error code, message, and timestamp, rather than dumping a raw stack trace to the client.\"",
      "summary10s": "@ControllerAdvice + @ExceptionHandler to centralize error logic and return standard JSON error payloads."
    }
  },
  {
    "id": "system-design-concurrent-updates",
    "category": "System Design",
    "question": "Two requests update the same record simultaneously. How do you handle it?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "You can handle it using Optimistic Locking (version column) or Pessimistic Locking (database row lock).",
      "explain": "In Optimistic Locking, you add a version field; if the version changed since the read, the update fails and the user is prompted. In Pessimistic Locking, you use SELECT ... FOR UPDATE to lock the row at the database level so the second request waits until the first one completes.",
      "example": "\"For high-concurrency systems where collisions are rare, I use Optimistic Locking by adding an @Version column in JPA; the second update will throw an OptimisticLockException. If collisions are frequent and I want to serialize the updates, I use Pessimistic Locking by applying a database-level lock, though this can hurt performance.\"",
      "summary10s": "Optimistic locking (@Version, fail on collision) for rare conflicts. Pessimistic locking (DB row lock) for frequent conflicts."
    }
  },
  {
    "id": "microservices-downstream-failing",
    "category": "Microservices",
    "question": "A downstream service is failing repeatedly. What would you implement?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Implement a Circuit Breaker pattern with retries and fallbacks to prevent cascading failures.",
      "explain": "If a downstream service is struggling, sending more requests will only make it worse and tie up your own resources. A circuit breaker detects the failures, \"opens\" to block further calls, and returns a fast error or fallback response until the service recovers.",
      "example": "\"I would wrap the call using a library like Resilience4j to implement a Circuit Breaker. If the error rate crosses a threshold, the circuit opens and immediately returns a cached or default fallback response instead of making the network call. I'd also add limited retries with exponential backoff for transient network blips.\"",
      "summary10s": "Circuit Breaker (fail fast) + Fallback (default response) + Retries with exponential backoff."
    }
  },
  {
    "id": "java-encapsulation-getters-setters",
    "category": "Java",
    "question": "If Java supports encapsulation, why do we still need getters and setters?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Getters and setters enforce encapsulation by hiding internal state and providing a controlled gateway to access or modify it.",
      "explain": "Encapsulation is about hiding data, but you still need a way to interact with it. Getters and setters allow you to add validation, logging, or transform the data before returning it, without changing the external API of the class.",
      "example": "\"I use getters and setters so I can control how fields are mutated. For example, in a BankAccount class, the setter for balance can ensure the amount is not negative before updating the internal variable, which wouldn't be possible if the field was public.\"",
      "summary10s": "Fields = hidden state. Getters/setters = controlled, validated access to that state."
    }
  },
  {
    "id": "java-abstraction-vs-encapsulation",
    "category": "Java",
    "question": "What is the real difference between abstraction and encapsulation?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Abstraction hides complexity (what it does), while encapsulation hides internal state (how it does it).",
      "explain": "Abstraction is achieved using abstract classes or interfaces to expose only necessary features. Encapsulation is achieved using access modifiers (like private) to restrict direct access to the object's data, bundling data and methods together safely.",
      "example": "\"When I use a CoffeeMachine interface with a brew() method, that's abstraction—I don't need to know how it brews. But when the CoffeeMachine class keeps its waterLevel and temperature variables private and only modifiable via specific methods, that's encapsulation protecting the internal state.\"",
      "summary10s": "Abstraction = hiding implementation details. Encapsulation = hiding and protecting data."
    }
  },
  {
    "id": "java-multiple-inheritance-interfaces",
    "category": "Java",
    "question": "Why does Java support multiple interfaces but not multiple class inheritance?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "To prevent the Diamond Problem, where a class inherits conflicting implementations from multiple parent classes.",
      "explain": "If a class inherits from two parent classes that have the same method, the compiler doesn't know which one to execute. Interfaces (before Java 8) only had method signatures without bodies, so there was no conflict. Even with default methods, Java forces the implementing class to resolve the conflict.",
      "example": "\"I explain it with the Diamond Problem. If class D extends B and C, and both implement print(), calling d.print() is ambiguous. Since interfaces only define contracts (methods to implement), inheriting the same contract twice is perfectly fine because the child class provides the single implementation.\"",
      "summary10s": "Prevents Diamond Problem. Interfaces only pass contracts, not conflicting implementations."
    }
  },
  {
    "id": "java-parent-reference-child-object",
    "category": "Java",
    "question": "What happens when you write: Parent p = new Child();",
    "frequency": 1,
    "companies": [],
    "variations": [
      "If a parent reference points to a child object, which methods and fields can you access?"
    ],
    "answerSEE": {
      "simple": "This is upcasting. The reference determines what you can call at compile time, but the object type determines the method executed at runtime.",
      "explain": "The compiler looks at the Parent class. You can only call methods declared in Parent. However, due to polymorphism, if the Child overrides a method, the Child's version is executed at runtime (Dynamic Method Dispatch). Note: Fields are NOT polymorphic; they are resolved based on the reference type.",
      "example": "\"When I do `Animal a = new Dog();`, I can only call `a.eat()` if `eat()` is defined in Animal. If I try to call `a.bark()`, it won't compile. But if both have `eat()`, the Dog's `eat()` method is called at runtime because the actual object in memory is a Dog.\"",
      "summary10s": "Compile time: checked by reference type. Runtime: executed by actual object type. Fields are NOT polymorphic."
    }
  },
  {
    "id": "java-runtime-vs-compiletime-polymorphism",
    "category": "Java",
    "question": "Why is method overriding runtime polymorphism while overloading is compile-time polymorphism?",
    "frequency": 1,
    "companies": [],
    "variations": [
      "What is compile-time binding vs runtime binding?"
    ],
    "answerSEE": {
      "simple": "Overloading is resolved by the compiler based on method signatures, while overriding is resolved by the JVM at runtime based on the actual object type.",
      "explain": "In overloading (compile-time/static binding), the compiler knows exactly which method to call because the parameter lists are different. In overriding (runtime/dynamic binding), the method signatures are identical, so the JVM must wait until runtime to see what actual object is instantiated in memory to call the right method.",
      "example": "\"If I have two `print(int)` and `print(String)` methods, the compiler knows immediately which one I mean based on the argument. That's compile-time. But if a parent and child both have a `draw()` method, and I pass the object to a function as a Parent reference, only the JVM at runtime knows if it's actually pointing to a Child object.\"",
      "summary10s": "Overloading: different params, compiler decides. Overriding: identical signatures, JVM decides based on object in heap."
    }
  },
  {
    "id": "java-override-private-method",
    "category": "Java",
    "question": "Why can’t a private method be overridden?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Because private methods are not inherited by child classes, they are invisible outside their own class.",
      "explain": "Overriding requires the child class to inherit the parent's method and replace its implementation. Since private methods are tightly encapsulated and hidden from subclasses, the subclass doesn't even know the method exists. If you write a matching method in the child, it's just a brand new method.",
      "example": "\"I can't override a private method because overriding is an inheritance concept. The child class can't inherit private members. If I write a method with the same name in the child class, the compiler treats it as a completely separate, unrelated method, not an override.\"",
      "summary10s": "No inheritance = no overriding. Private methods are hidden from subclasses."
    }
  },
  {
    "id": "java-override-final-method",
    "category": "Java",
    "question": "Why can’t a final method be overridden?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The \"final\" keyword explicitly tells the compiler that the method's implementation is complete and locked.",
      "explain": "When you mark a method as final, you are restricting polymorphism for that specific behavior. It ensures that the core logic of the method cannot be altered or broken by subclasses, which is crucial for security and consistent behavior in framework design.",
      "example": "\"I use final methods when designing base classes where a specific workflow must be strictly followed. For example, in a Template Method pattern, the main orchestrating method should be final so that child classes can't ruin the core execution sequence, they can only override the specific steps.\"",
      "summary10s": "\"Final\" locks the method. It prevents subclasses from altering critical or secure behavior."
    }
  },
  {
    "id": "java-default-constructor",
    "category": "Java",
    "question": "If a class has a parameterized constructor, what happens to the default constructor?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The compiler no longer provides a no-argument default constructor automatically.",
      "explain": "Java only provides a default (no-arg) constructor if you write NO constructors at all. The moment you define a parameterized constructor, the compiler assumes you want strict control over how the object is instantiated and steps back.",
      "example": "\"If I define `public User(String name)`, and then try to do `new User();`, I'll get a compile error. Because I provided a specific way to build a User, Java stops generating the free default constructor. I'd have to explicitly write `public User() {}` if I still want to allow empty creation.\"",
      "summary10s": "The compiler stops generating the free no-arg constructor the second you write any constructor yourself."
    }
  },
  {
    "id": "java-abstract-class-constructors",
    "category": "Java",
    "question": "Can an abstract class have constructors, fields, and concrete methods? Why?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Yes. It needs them because it acts as a base class sharing state and common logic with its subclasses.",
      "explain": "An abstract class can't be instantiated directly, but its subclasses are. When a subclass is instantiated, it calls `super()`. The abstract class needs a constructor to initialize its own fields. It can have concrete methods to provide default behavior that multiple subclasses can reuse.",
      "example": "\"I frequently use abstract classes to hold shared state. If I have an abstract `Vehicle` class, it can have a `speed` field, a constructor to set the speed, and a concrete `startEngine()` method. The subclasses (`Car`, `Bike`) just inherit this common logic and state while only overriding the specific abstract methods like `drive()`.\"",
      "summary10s": "Yes. It holds shared state (fields) and common behavior (concrete methods) for subclasses to inherit."
    }
  },
  {
    "id": "java-variable-hiding",
    "category": "Java",
    "question": "If parent and child have a variable with the same name, which one is accessed?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The variable accessed depends strictly on the reference type, not the object type, because variables are not polymorphic.",
      "explain": "Variables in Java do not participate in overriding; they are hidden (Variable Hiding). The compiler resolves field access at compile time based on the declared type of the reference variable. There is no dynamic dispatch for fields.",
      "example": "\"If Parent and Child both have `int x`, and I do `Parent p = new Child(); print(p.x);`, it will print the Parent's `x`. To get the Child's `x`, I would have to cast it: `((Child)p).x`. This is why we usually make fields private and use polymorphic getter methods instead.\"",
      "summary10s": "Variables don't override, they hide. The compiler checks the reference type, ignoring the actual runtime object."
    }
  },
  {
    "id": "java-overload-return-type",
    "category": "Java",
    "question": "Can you overload a method by changing only its return type?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "No, the compiler will throw an error because the return type is not part of the method signature.",
      "explain": "In Java, a method signature consists only of the method name and the parameter list. If two methods have the same name and parameters but different return types, the compiler can't determine which one you meant to call, especially if you ignore the return value.",
      "example": "\"If I write `int calculate()` and `double calculate()`, it won't compile. If I just write `calculate();` in my code without assigning the result to a variable, the compiler has absolutely no way to know which version of the method to execute. That's why parameter lists MUST differ.\"",
      "summary10s": "No. Method signature = name + parameters. Return type doesn't count, leading to compiler ambiguity."
    }
  },
  {
    "id": "java-polymorphism-without-inheritance",
    "category": "Java",
    "question": "Can you achieve polymorphism without inheritance?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Yes, through interfaces and method overloading.",
      "explain": "While overriding requires inheritance or interface implementation (dynamic polymorphism), you can achieve compile-time polymorphism through method overloading in a single class. You can also implement multiple unrelated interfaces to achieve polymorphic behavior without strict class inheritance.",
      "example": "\"I achieve polymorphism all the time without class inheritance by using Interfaces. If `Car` and `Person` both implement a `Movable` interface, I can treat them polymorphically in a list of `Movable` objects. I also use method overloading, which is a form of compile-time polymorphism inside a single class.\"",
      "summary10s": "Yes. Method overloading (compile-time) and Interfaces (runtime) provide polymorphism without class extension."
    }
  },
  {
    "id": "system-design-oop-payment-system",
    "category": "System Design",
    "question": "In a payment system with CardPayment, UPIPayment and CashPayment, where would you use abstraction, encapsulation and polymorphism?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Abstraction defines the Payment interface; Encapsulation hides the card details; Polymorphism processes the payment dynamically.",
      "explain": "Abstraction: A `Payment` interface with a `process()` method hides the complex integration details. Encapsulation: The `CardPayment` class keeps the CVV and card number private, exposing only safe methods. Polymorphism: A checkout service calls `payment.process()`, and the JVM dynamically routes it to UPI, Card, or Cash based on the actual object.",
      "example": "\"I would create a `PaymentProcessor` interface (Abstraction). The `UPIPayment` class implements it and keeps the user's PIN fully private (Encapsulation). When a user checks out, my `CheckoutService` accepts any `PaymentProcessor` and just calls `.process()`—the JVM uses Polymorphism to automatically execute the correct gateway logic without me writing if-else statements.\"",
      "summary10s": "Abstraction = Payment interface. Encapsulation = hiding PIN/CVV. Polymorphism = calling process() dynamically."
    }
  },
  {
    "id": "js-character-frequency",
    "category": "JS Coding",
    "question": "Find the occurrence/frequency of characters in an array/string.",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Iterate through the string or array and use an object or Map to keep track of character counts.",
      "explain": "You can create a frequency map using a standard for-loop or the reduce array method. For each character, if it exists in the map, you increment its count; otherwise, you set its count to 1.",
      "example": "\"I usually convert the string to an array and use the reduce method. For example: str.split('').reduce((acc, char) => { acc[char] = (acc[char] || 0) + 1; return acc; }, {}). This is clean, creates a single object map, and executes in O(n) time complexity since we only iterate through the string once.\"",
      "summary10s": "Use a frequency map object with reduce. Time complexity is O(n)."
    }
  },
  {
    "id": "java-constructors-inherited",
    "category": "Java",
    "question": "Can a constructor be inherited? Why or why not?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "No, constructors are not inherited; each class must define its own constructors.",
      "explain": "Inheritance allows child classes to inherit fields and methods, but constructors are specific to creating an instance of that exact class. A child class can call the parent's constructor using super(), but it does not inherit the parent's constructor as a callable method.",
      "example": "\"If a Parent has a Parent(String name) constructor, the Child does not automatically get a Child(String name) constructor. I have to explicitly write the Child constructor and call super(name).\"",
      "summary10s": "Constructors build specific classes. They are not inherited; they are invoked via super()."
    }
  },
  {
    "id": "java-constructors-overridden",
    "category": "Java",
    "question": "Why can’t constructors be overridden?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Overriding implies replacing an inherited behavior, but since constructors aren't inherited, they can't be overridden.",
      "explain": "Overriding is a runtime polymorphism concept for inherited methods. Since constructors are never inherited by the subclass, there is nothing to override. Subclasses create their own constructors and simply chain back to the parent's constructor.",
      "example": "\"You can't override a constructor for the same reason you can't inherit it. Overriding means providing a new implementation for an existing inherited method. Since constructors belong exclusively to the class they construct, the concept of overriding simply doesn't apply to them.\"",
      "summary10s": "No inheritance means no overriding. Constructors are unique to their class."
    }
  },
  {
    "id": "java-abstract-class-final",
    "category": "Java",
    "question": "Can an abstract class be final? Explain the contradiction.",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "No, it causes a compile-time error because \"abstract\" and \"final\" have contradictory purposes.",
      "explain": "An abstract class is designed to be incomplete and must be extended by a subclass to provide concrete implementations. The \"final\" keyword prevents a class from being extended. Therefore, an abstract final class would be impossible to use.",
      "example": "\"If I write final abstract class Animal, the compiler stops me immediately. abstract means 'please extend me to finish my implementation', while final means 'do not extend me'. You can't ask for both.\"",
      "summary10s": "Abstract = must be extended. Final = cannot be extended. They contradict each other."
    }
  },
  {
    "id": "java-interface-multiple-inheritance",
    "category": "Java",
    "question": "Why does Java allow an interface to extend multiple interfaces?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Because interfaces traditionally only inherit contracts (method signatures), not state or conflicting concrete implementations.",
      "explain": "The main issue with multiple class inheritance is the Diamond Problem—inheriting conflicting state or method bodies. Since interfaces don't hold instance state, extending multiple interfaces just combines their method signatures into a larger contract. If there's a conflict with default methods, the implementing class resolves it.",
      "example": "\"If SmartDevice extends Phone and Camera interfaces, it just means anything implementing SmartDevice must provide both phone and camera behaviors. There's no conflicting state like fields or constructors being inherited, so multiple inheritance of interfaces is safe.\"",
      "summary10s": "Interfaces pass down contracts, not state. Multiple contracts don't create ambiguity."
    }
  },
  {
    "id": "java-overriding-visibility",
    "category": "Java",
    "question": "Why does changing a method’s visibility during overriding have restrictions?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "You cannot reduce the visibility of an overridden method because it would break the contract established by the parent class.",
      "explain": "If a parent class promises that a method is public, polymorphism allows you to use a child object via a parent reference. If the child could make that method private, calling it through the parent reference would suddenly be illegal, breaking the Liskov Substitution Principle.",
      "example": "\"If Animal has a public eat() method, Dog cannot override it and make it private. If it could, Animal a = new Dog(); a.eat(); would break polymorphism because the compiler thinks eat() is public, but the actual object hid it.\"",
      "summary10s": "You can only maintain or increase visibility (e.g., protected -> public). Reducing it breaks polymorphism."
    }
  },
  {
    "id": "java-overriding-exceptions",
    "category": "Java",
    "question": "Can an overriding method throw a broader checked exception than the parent method?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "No, it can only throw the same exception, narrower subclasses of that exception, or no exception at all.",
      "explain": "This is another rule to protect polymorphism. If a parent method declares it throws IOException, any code calling it via a parent reference only handles IOException. If a child overrides it and throws Exception (a broader exception), the existing try-catch blocks would fail to catch it, crashing the program.",
      "example": "\"If my parent's readFile() throws FileNotFoundException, my overridden method can throw FileNotFoundException, nothing at all, but NOT Exception. Unchecked exceptions (RuntimeExceptions) don't have this restriction because they aren't explicitly caught by the compiler.\"",
      "summary10s": "No broader checked exceptions. It breaks existing try-catch blocks written for the parent reference."
    }
  },
  {
    "id": "java-covariant-return-type",
    "category": "Java",
    "question": "What is a covariant return type, and why is it useful?",
    "frequency": 1,
    "companies": [],
    "variations": [
      "Why can a child class return a more specific type when overriding a method?"
    ],
    "answerSEE": {
      "simple": "It allows an overriding method to return a more specific subclass type than the parent method's return type.",
      "explain": "Before Java 5, overriding methods had to return the exact same type. Covariant return types allow a child class to return a narrower, more specific type. This is useful because it removes the need for clients to explicitly cast the returned object when they know they are working with the child class.",
      "example": "\"If Animal has a method Animal clone(), the Dog class can override it as Dog clone(). This is incredibly useful because if I call dog.clone(), I get a Dog directly without having to cast the result from Animal to Dog.\"",
      "summary10s": "Overriding methods can return a narrower subtype. Saves you from writing explicit type casts."
    }
  },
  {
    "id": "java-overridable-method-in-constructor",
    "category": "Java",
    "question": "Why is calling an overridable method from a constructor considered dangerous?",
    "frequency": 1,
    "companies": [],
    "variations": [
      "If a parent class constructor calls an overridable method, what potential problem can occur?"
    ],
    "answerSEE": {
      "simple": "The overridden method in the child class will execute before the child's constructor has finished initializing its fields.",
      "explain": "When a parent constructor runs, the child constructor hasn't started yet. If the parent constructor calls a method that the child overrides, the child's overridden method executes immediately. If that method relies on fields initialized in the child's constructor, they will still be null or zero, causing NullPointerExceptions or logical errors.",
      "example": "\"I once spent hours debugging an issue where a parent constructor called init(). The child class overrode init() to use a config object it initializes in its own constructor. But because the parent constructor ran first, it called the child's init() before config was set, throwing a NullPointerException.\"",
      "summary10s": "The child's method runs before the child's constructor. Any uninitialized child fields will be null/zero."
    }
  },
  {
    "id": "java-liskov-substitution",
    "category": "System Design",
    "question": "What does Liskov Substitution Principle actually mean in a Java inheritance hierarchy?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Objects of a superclass should be replaceable with objects of a subclass without breaking the application.",
      "explain": "If Child extends Parent, you should be able to pass a Child into any method expecting a Parent and the program should still behave correctly. The subclass must honor the contracts of the superclass—it shouldn't throw unexpected exceptions, reduce visibility, or change the fundamental semantics of overridden methods.",
      "example": "\"The classic violation is a Square inheriting from Rectangle. If a method expects a Rectangle, changes its width to 5 and height to 10, it expects the area to be 50. But a Square forces width and height to be equal, so changing the height to 10 changes the width to 10, making the area 100. This breaks the expected behavior, violating LSP.\"",
      "summary10s": "Subclasses must perfectly stand in for parent classes without breaking expectations or contracts."
    }
  },
  {
    "id": "java-multiple-types-interfaces",
    "category": "Java",
    "question": "Can an object belong to multiple types in Java? Explain using interfaces.",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Yes, an object can have multiple types based on the class it extends and the interfaces it implements.",
      "explain": "While a class can only extend one parent class, it can implement multiple interfaces. When an object is instantiated, it simultaneously belongs to its own class type, its parent class type, and every interface type it implements. You can use a reference of any of these types to point to the object.",
      "example": "\"If my Smartphone class extends Computer and implements Camera and Phone, a Smartphone object is a Computer, a Camera, and a Phone all at once. I can pass it to a method expecting a Camera, and it will work perfectly.\"",
      "summary10s": "Yes. An object's type includes its class, superclasses, and all implemented interfaces."
    }
  },
  {
    "id": "java-object-identity-vs-state",
    "category": "Java",
    "question": "What is the difference between object identity and object state?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Identity is who the object is (memory address), while state is what the object contains (field values).",
      "explain": "Object identity refers to the actual physical object in the heap, typically compared using the == operator (do these two references point to the exact same memory location?). Object state refers to the data inside the fields, typically compared using the .equals() method (do these two distinct objects hold the same values?).",
      "example": "\"If I create two User objects with the name 'Alice', their state is identical, so user1.equals(user2) should return true. However, their identity is different because they are two separate objects occupying different spaces in memory, so user1 == user2 is false.\"",
      "summary10s": "Identity (==) checks if it's the exact same memory location. State (.equals()) checks if the values inside match."
    }
  },
  {
    "id": "system-design-oop-bird-hierarchy",
    "category": "System Design",
    "question": "You have Bird, FlyingBird, and Penguin. How would you design the hierarchy so that a penguin doesn’t violate the expected behavior of a flying bird?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Make Bird the base class without a fly() method, and have only FlyingBird implement flying capabilities.",
      "explain": "If Bird has a fly() method, then Penguin (which is a Bird) inherits it, forcing it to throw an exception or do nothing, which violates the Liskov Substitution Principle. Instead, Bird should only have common behaviors like eat(). Then create a FlyingBird interface or subclass that adds fly(), which Eagle implements but Penguin does not.",
      "example": "\"I would define a base Bird class with eat() and sleep(). Then, I'd create an interface called Flyable with a fly() method. A Sparrow extends Bird and implements Flyable. A Penguin simply extends Bird. This way, you never accidentally tell a Penguin to fly, completely avoiding the LSP violation.\"",
      "summary10s": "Base Bird has no fly(). Only flying birds implement a Flyable interface. Prevents LSP violations."
    }
  },
  {
    "id": "microservices-async-communication",
    "category": "Microservices",
    "question": "How microservices communicate with each other in asynchronous way.",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "They communicate using message brokers like Kafka or RabbitMQ, sending events instead of waiting for direct HTTP responses.",
      "explain": "In asynchronous communication, the calling service sends a message to a queue or topic and immediately continues its work. The receiving service picks up the message at its own pace. This decouples the services and prevents cascading failures if one service is slow or down.",
      "example": "\"If a user places an order, the Order Service publishes an 'OrderCreated' event to a Kafka topic and immediately returns a success response to the user. The Inventory Service and Email Service consume that event independently in the background to update stock and send a confirmation email.\"",
      "summary10s": "Use message brokers (Kafka/RabbitMQ) to publish and consume events. It decouples services and improves resilience."
    }
  },
  {
    "id": "spring-boot-internal-flow",
    "category": "Spring Boot",
    "question": "Explain the internal flow of a Spring Boot application.",
    "frequency": 1,
    "companies": [],
    "variations": [
      "Spring boot flow."
    ],
    "answerSEE": {
      "simple": "The request hits the Tomcat server, passes through filters to the DispatcherServlet, gets routed to a Controller, processes business logic in a Service, and returns a response.",
      "explain": "When a request comes in, the embedded Tomcat container receives it. It passes through any Filter chains (like Security). The DispatcherServlet then acts as the front controller, finding the right @RestController using HandlerMappings. The Controller calls a @Service (business logic), which talks to a @Repository (DB). The result is converted to JSON via HttpMessageConverters and sent back.",
      "example": "\"When a client calls my /users API, the DispatcherServlet intercepts it and routes it to UserController based on the URL. The controller delegates to UserService to fetch data from UserRepository. The returned User object is automatically serialized into JSON by Jackson and sent back to the client.\"",
      "summary10s": "Request -> Filters -> DispatcherServlet -> Controller -> Service -> Repository -> JSON Response."
    }
  },
  {
    "id": "java-split-work-threads",
    "category": "Java",
    "question": "How can we split work between threads and collect them.",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "You can use CompletableFuture, an ExecutorService with Callables, or the ForkJoinPool to run tasks in parallel and merge their results.",
      "explain": "The modern approach is using CompletableFuture, which allows you to spawn multiple asynchronous tasks and combine them using methods like allOf(). Alternatively, you can submit Callable tasks to an ExecutorService and wait on their Future objects, or use parallel streams for collection processing.",
      "example": "\"I usually use CompletableFuture. If I need to fetch user details and their recent orders simultaneously, I start two CompletableFutures using supplyAsync(). Then I use CompletableFuture.allOf() to wait for both to finish, and combine the results into a single DTO. It's much cleaner than manually managing CountDownLatches or Thread.join().\"",
      "summary10s": "Use CompletableFuture.supplyAsync() to run in parallel, and allOf() to wait and collect the results."
    }
  },
  {
    "id": "java-immutable-class-creation",
    "category": "Java",
    "question": "How to create immutable class.",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Make the class final, make all fields private and final, initialize them via a constructor, and do not provide setters.",
      "explain": "To ensure true immutability, the class must be declared final so it can't be extended. All fields must be private and final. If the class contains mutable objects (like arrays or Dates), you must perform deep copies in the constructor and return clones in the getters so the internal state can't be modified from the outside.",
      "example": "\"I declare the class as final. I make all fields private and final. If one of my fields is a java.util.Date (which is mutable), I don't just assign it in the constructor; I create a new Date object using the passed value. And in the getter, I return a clone of that Date. Or even better, I just use Java 14 Records which do this automatically for immutable state.\"",
      "summary10s": "Class final, fields private final, no setters, and deep copy any mutable objects in constructors and getters."
    }
  },
  {
    "id": "java-process-vs-thread",
    "category": "Java",
    "question": "What is the difference between a Process and a Thread?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "A process is an independent program in execution with its own memory, while a thread is a lightweight unit of execution within a process that shares memory.",
      "explain": "Processes are heavyweight, isolated by the OS, and communicate via IPC. Threads are lightweight, live inside a process, share the same heap memory, and context-switching between them is much faster.",
      "example": "\"Opening two tabs in Chrome creates two separate processes. But downloading a file while scrolling a webpage in the same tab uses two threads inside the same process.\"",
      "summary10s": "Process = heavy, isolated memory. Thread = light, shared memory."
    }
  },
  {
    "id": "java-thread-vs-runnable",
    "category": "Java",
    "question": "What is the difference between Thread and Runnable?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Thread is a class you extend, while Runnable is an interface you implement.",
      "explain": "Because Java only supports single class inheritance, implementing Runnable is preferred because it frees up your class to extend another class. Extending Thread tightly couples your task to the thread lifecycle.",
      "example": "\"I always implement Runnable. If my Worker class extends Thread, it can't extend any other class. By implementing Runnable, my Worker can still extend a BaseWorker class, and I can pass it to an ExecutorService easily.\"",
      "summary10s": "Implement Runnable to save your single inheritance. Extend Thread only if you are overriding thread behavior."
    }
  },
  {
    "id": "java-runnable-vs-callable",
    "category": "Java",
    "question": "What is the difference between Runnable and Callable?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Runnable cannot return a result or throw checked exceptions, while Callable can do both.",
      "explain": "Runnable's run() method has a void return type. Callable's call() method returns a generic Future and declares \"throws Exception\", making it ideal for tasks where you need the result back or need to handle checked exceptions gracefully.",
      "example": "\"If I just need a thread to clean up log files in the background, I use Runnable. If I need a thread to query a database and return the user details, I use Callable so I can get the result via a Future.\"",
      "summary10s": "Runnable = void, no checked exceptions. Callable = returns a result (Future), can throw exceptions."
    }
  },
  {
    "id": "java-thread-states",
    "category": "Java",
    "question": "What are the different states of a Thread in Java?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "A thread can be NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, or TERMINATED.",
      "explain": "NEW is before start(). RUNNABLE is executing or ready to execute. BLOCKED is waiting for a monitor lock. WAITING is waiting indefinitely for another thread (like wait()). TIMED_WAITING is waiting for a specified time (like sleep()). TERMINATED means it has finished.",
      "example": "\"If I create a thread, it's NEW. When I call start(), it becomes RUNNABLE. If it tries to enter a synchronized block that another thread holds, it moves to BLOCKED. Once it finishes its run() method, it becomes TERMINATED.\"",
      "summary10s": "6 states: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED."
    }
  },
  {
    "id": "java-start-vs-run",
    "category": "Java",
    "question": "What is the difference between start() and run()?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "start() creates a new thread and then calls run(), while calling run() directly just executes the code in the current thread.",
      "explain": "The start() method asks the JVM to allocate a new thread stack and transition the thread to the RUNNABLE state. If you call run() directly, it behaves like a normal method call, executing synchronously on the main thread, defeating the purpose of multithreading.",
      "example": "\"A classic interview mistake is writing `thread.run()`. It compiles and works, but it completely blocks the main thread. You must call `thread.start()` to actually spin up a new concurrent execution path.\"",
      "summary10s": "start() = new thread. run() = normal synchronous method call."
    }
  },
  {
    "id": "java-sleep-wait-join",
    "category": "Java",
    "question": "What is the difference between sleep(), wait(), and join()?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "sleep() pauses a thread without releasing locks, wait() pauses and releases locks, and join() waits for another thread to finish.",
      "explain": "Thread.sleep() simply pauses execution. Object.wait() is used in inter-thread communication inside synchronized blocks—it releases the lock so other threads can work. thread.join() blocks the current thread until the target thread completes.",
      "example": "\"If I want my main thread to wait until a worker thread is done, I use `worker.join()`. If I want a thread to pause for 1 second, I use `sleep(1000)`. If a consumer thread needs to wait for a producer to add items to a queue, it uses `wait()`, releasing the queue lock so the producer can actually add the item.\"",
      "summary10s": "sleep = pause (keeps lock). wait = wait for signal (releases lock). join = wait for thread to die."
    }
  },
  {
    "id": "java-sync-method-vs-block",
    "category": "Java",
    "question": "What is the difference between synchronized method and synchronized block?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "A synchronized method locks the entire object, while a block only locks a specific piece of code, improving performance.",
      "explain": "When you synchronize a whole method, no other thread can access any synchronized methods on that object. A synchronized block allows you to lock only the critical section of the code and even choose a specific monitor object to lock on, reducing thread contention.",
      "example": "\"If I have a 100-line method but only 2 lines modify a shared counter, I won't synchronize the whole method because it hurts throughput. I'll wrap only those 2 lines in a `synchronized(this)` block.\"",
      "summary10s": "Method = locks whole object. Block = locks specific lines, better performance."
    }
  },
  {
    "id": "java-sync-vs-lock",
    "category": "Java",
    "question": "What is the difference between synchronized and Lock?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Synchronized is implicit and block-structured, while Lock (like ReentrantLock) provides explicit locking with advanced features like fairness and tryLock.",
      "explain": "Synchronized blocks automatically release locks when exiting or throwing an exception. Lock interfaces require you to manually call lock() and unlock() (usually in a finally block), but give you superpowers: you can check if a lock is available (tryLock), interrupt waiting threads, and use fair lock policies.",
      "example": "\"I use synchronized for simple thread safety because it's less error-prone. But if I need a thread to give up after trying to get a lock for 5 seconds without blocking forever, I use a Lock with `tryLock(5, TimeUnit.SECONDS)`.\"",
      "summary10s": "Synchronized = easy, automatic unlock. Lock = manual, features like tryLock() and fairness."
    }
  },
  {
    "id": "java-volatile",
    "category": "Java",
    "question": "What is volatile in Java?",
    "frequency": 1,
    "companies": [],
    "variations": [
      "What is the difference between volatile and synchronized?"
    ],
    "answerSEE": {
      "simple": "The volatile keyword ensures that changes to a variable are immediately visible to all threads by reading/writing directly to main memory instead of CPU caches.",
      "explain": "It prevents thread caching issues (visibility) but does NOT provide atomicity. Synchronized provides both visibility and atomicity. If multiple threads increment a volatile counter, you will still get race conditions.",
      "example": "\"I use volatile for boolean flags, like `volatile boolean keepRunning = true;`. When another thread sets it to false, the worker thread sees it instantly. But for a counter (`count++`), I use synchronized or AtomicInteger, because volatile doesn't stop two threads from reading the same value simultaneously.\"",
      "summary10s": "Volatile fixes visibility (CPU cache). Synchronized fixes visibility AND atomicity (race conditions)."
    }
  },
  {
    "id": "java-submit-vs-execute",
    "category": "Java",
    "question": "What is the difference between submit() and execute()?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "execute() is for Runnables and returns nothing; submit() can take Runnables or Callables and returns a Future.",
      "explain": "If you use execute(), unhandled exceptions will print a stack trace to the console and kill the thread. If you use submit(), exceptions are swallowed and captured inside the returned Future, only thrown when you call future.get().",
      "example": "\"I always use submit(), even for Runnables. If I use execute() and the task throws an exception, it crashes the thread silently in the background. With submit(), I can inspect the Future later to see if it succeeded or failed.\"",
      "summary10s": "execute = void, crashes thread on exception. submit = returns Future, catches exception in Future."
    }
  },
  {
    "id": "java-future",
    "category": "Java",
    "question": "What is a Future in Java?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "A Future represents the result of an asynchronous computation that may not have finished yet.",
      "explain": "When you submit a Callable to an ExecutorService, it immediately returns a Future. You can continue doing other work, and later call future.get() to retrieve the actual result. However, get() is blocking.",
      "example": "\"I use Future like a restaurant buzzer. I submit my order (task) and get a buzzer (Future). I can go sit down, and when I call buzzer.get(), I either get my food or I'm forced to wait until it's ready.\"",
      "summary10s": "A placeholder for a result that will be available in the future. Calling get() blocks."
    }
  },
  {
    "id": "java-stack-vs-heap",
    "category": "Java",
    "question": "What is the difference between Stack and Heap memory?",
    "frequency": 1,
    "companies": [],
    "variations": [
      "What is stored in Stack and Heap?",
      "What is the difference between a process stack and Java Heap?"
    ],
    "answerSEE": {
      "simple": "Heap stores all objects and is shared across threads. Stack stores local variables and method calls, and each thread gets its own isolated stack.",
      "explain": "When you write `User u = new User();`, the reference `u` is stored on the Stack, but the actual `User` object is created in the Heap. The Heap is managed by the Garbage Collector. The Stack is automatically popped when a method finishes.",
      "example": "\"If two threads execute the same method, they each get their own Stack with their own local variables, making local variables inherently thread-safe. But if both threads access a static object or shared instance, they are pointing to the same object in the Heap, requiring synchronization.\"",
      "summary10s": "Stack = local variables, per thread. Heap = objects, shared globally, GC managed."
    }
  },
  {
    "id": "java-reference-types",
    "category": "Java",
    "question": "What are Strong, Weak, Soft, and Phantom References?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "They determine how eager the Garbage Collector is to delete an object.",
      "explain": "Strong: Normal objects, never GC'd if referenced. Soft: GC'd only if the JVM is desperately running out of memory (good for caches). Weak: GC'd immediately on the next GC cycle if no strong references exist. Phantom: Used for pre-mortem cleanup scheduling instead of finalize().",
      "example": "\"If I build an in-memory image cache, I use SoftReferences. This way, the JVM keeps the images in memory normally, but if the server is about to throw an OutOfMemoryError, the GC will automatically clear my cache to save the application.\"",
      "summary10s": "Strong = never die. Soft = die on OOM. Weak = die on next GC. Phantom = for cleanup."
    }
  },
  {
    "id": "java-minor-vs-major-gc",
    "category": "Java",
    "question": "What is the difference between minor GC and major/full GC?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Minor GC cleans the Young Generation, while Major/Full GC cleans the Old Generation and takes much longer.",
      "explain": "Most objects die young. Minor GC runs frequently on the Young Generation (Eden space) and is very fast. Objects that survive multiple minor GCs get promoted to the Old Generation. When the Old gen fills up, a Major GC occurs, which is heavily \"Stop The World\" and causes noticeable application pauses.",
      "example": "\"If I see short, frequent GC logs, that's just minor GC doing its job. If my API suddenly hangs for 2 seconds, it's likely a Major GC. To fix it, I investigate why so many short-lived objects are being promoted to the Old Generation, effectively clogging it up.\"",
      "summary10s": "Minor = Young Gen, fast. Major = Old Gen, slow, causes \"Stop the World\" pauses."
    }
  },
  {
    "id": "java-classloader-jre-jdk",
    "category": "Java",
    "question": "What are ClassLoader, JRE, and JDK?",
    "frequency": 1,
    "companies": [],
    "variations": [
      "What is the role of the JVM?"
    ],
    "answerSEE": {
      "simple": "JDK is the full development kit, JRE is the runtime environment, JVM executes the code, and ClassLoader loads classes into memory.",
      "explain": "JDK contains the compiler (javac) + JRE. JRE contains the JVM + standard libraries. JVM is the engine that actually interprets bytecode into machine code. The ClassLoader is a subsystem of the JVM that finds and loads .class files dynamically at runtime.",
      "example": "\"To write code, I install the JDK. To run the server in production, I only technically need the JRE (though modern containers often just use JDKs). When I run my app, the JVM starts up, and the ClassLoader reads my .class files from the filesystem and injects them into the JVM's memory.\"",
      "summary10s": "JDK = Development. JRE = Runtime. JVM = Execution engine. ClassLoader = loads classes into JVM."
    }
  },
  {
    "id": "java-throw-vs-throws",
    "category": "Java",
    "question": "What is the difference between throw and throws?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "throw is used to actually throw an exception object, while throws is used in a method signature to declare what it might throw.",
      "explain": "\"throw\" is followed by an instance (e.g., `throw new Exception()`). \"throws\" is followed by a class name in the method signature (e.g., `void run() throws Exception`), warning the caller that they need to handle it.",
      "example": "\"If the user input is invalid, I use `throw new IllegalArgumentException()`. Because it's a RuntimeException, I don't strictly need `throws`, but if it was checked, my method signature would have to be `public void process() throws IOException`.\"",
      "summary10s": "throw = action (throw new Exception). throws = warning in method signature."
    }
  },
  {
    "id": "java-try-without-catch",
    "category": "Java",
    "question": "Can we have try without catch?",
    "frequency": 1,
    "companies": [],
    "variations": [
      "Can we have multiple catch blocks?",
      "What happens if an exception occurs inside a finally block?"
    ],
    "answerSEE": {
      "simple": "Yes, a try block can exist without a catch block as long as it has a finally block, or if it is a try-with-resources block.",
      "explain": "You can have `try { ... } finally { ... }`. If an exception occurs, the finally block runs, but the exception is still propagated up the stack because it wasn't caught. Also, if a finally block throws an exception, it overrides any exception thrown by the try block, which is dangerous.",
      "example": "\"I often use try-finally when dealing with locks: `lock.lock(); try { doWork(); } finally { lock.unlock(); }`. I don't catch exceptions here because I want the caller to handle them, but I absolutely must ensure the lock is released regardless of success or failure.\"",
      "summary10s": "Yes, try-finally is valid. Used for cleanup when you want the exception to still bubble up."
    }
  },
  {
    "id": "java-exception-vs-error",
    "category": "Java",
    "question": "What is the difference between Exception and Error?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Exceptions are recoverable conditions caused by your application, while Errors are unrecoverable conditions caused by the JVM.",
      "explain": "Both extend Throwable. Exceptions (like SQLException) can be caught and handled. Errors (like OutOfMemoryError or StackOverflowError) represent catastrophic JVM failures that your application generally should not attempt to catch.",
      "example": "\"If a database connection drops, I get a SQLException. I can catch it and retry. If I write infinite recursion, I get a StackOverflowError. I can't realistically catch that and recover because the JVM's memory is fundamentally broken at that point.\"",
      "summary10s": "Exception = App issues, recoverable. Error = JVM issues, unrecoverable (OOM, StackOverflow)."
    }
  },
  {
    "id": "java-coding-create-multiple-threads",
    "category": "Java",
    "question": "How would you create multiple threads in Java?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "You can implement Runnable or use an ExecutorService thread pool.",
      "explain": "Instead of manually looping `new Thread(task).start()`, you should use an ExecutorService like `Executors.newFixedThreadPool(10)` and submit tasks to it to reuse threads and save resource overhead.",
      "example": "\"I never create raw threads in production with `new Thread()`. I instantiate an `ExecutorService` with a fixed pool size. Then I use a for-loop to `submit()` my Runnable tasks into the pool, letting Java manage the thread lifecycle and queuing.\"",
      "summary10s": "Don't use new Thread(). Use ExecutorService (thread pools) to submit tasks."
    }
  },
  {
    "id": "java-coding-thread-safe-counter",
    "category": "Java",
    "question": "How would you implement a thread-safe counter?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Use the AtomicInteger class or a synchronized method.",
      "explain": "Using a volatile `int count` is NOT thread-safe for increments because `count++` is read-modify-write (not atomic). You must use `AtomicInteger.incrementAndGet()` which uses hardware-level CAS (Compare-And-Swap), or wrap the increment in a synchronized block.",
      "example": "\"I would define `private AtomicInteger count = new AtomicInteger(0);`. When threads need to increment, they call `count.incrementAndGet()`. It's entirely thread-safe, lock-free, and much faster than using synchronized blocks for simple counters.\"",
      "summary10s": "Use AtomicInteger (CAS, lock-free) or synchronized blocks. Volatile is not enough for counters."
    }
  },
  {
    "id": "java-coding-completablefuture-exceptions",
    "category": "Java",
    "question": "How would you handle exceptions in CompletableFuture?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Use exceptionally(), handle(), or whenComplete() methods chained to the future.",
      "explain": "Because CompletableFuture runs asynchronously, standard try-catch blocks won't catch its exceptions. You chain `.exceptionally(ex -> fallbackValue)` to recover from errors and return a default value, or `.handle((result, ex) -> ...)` to process both successes and failures.",
      "example": "\"If I'm making an async HTTP call to fetch a user, I chain `.exceptionally(ex -> new User(\"Default\"))`. If the network call fails, the pipeline automatically intercepts the exception, logs it, and returns the default user so my application doesn't crash.\"",
      "summary10s": "Chain .exceptionally() for recovery/fallback, or .handle() for dealing with result/exception simultaneously."
    }
  },
  {
    "id": "behavioral-angular-version-responsibility",
    "category": "Other",
    "question": "Which Angular version have you used most recently? What did you personally build with it, and which parts were your responsibility versus the team's?",
    "frequency": 1,
    "companies": [
      "OctoWelocity"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "State the version (e.g., Angular 16+), describe a core feature you built, and clearly separate your code from the team's.",
      "explain": "The interviewer is probing for hands-on experience versus passive participation. You must be able to clearly articulate boundaries, like \"I built X, my teammate built Y.\" This proves you actually wrote code.",
      "example": "\"I recently used Angular 16. The team was building a unified Dashboard; my specific responsibility was building the real-time charting component using WebSockets and RxJS, while the rest of the team handled the authentication guard and standard CRUD layouts.\"",
      "summary10s": "Be specific. Claim ownership of a specific technical feature, not just the whole app."
    }
  },
  {
    "id": "behavioral-angular-tricky-debugging",
    "category": "Other",
    "question": "Tell me about a tricky Angular issue you debugged involving change detection, forms, routing, or API integration. How did you identify the root cause?",
    "frequency": 1,
    "companies": [
      "OctoWelocity"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Describe a scenario where a view didn't update (often a reference vs mutation issue) and how you traced it using Angular tools.",
      "explain": "The interviewer wants to see your debugging methodology. Did you use Angular DevTools? Do you understand the difference between mutating an object and replacing its reference, especially with OnPush?",
      "example": "\"I had a bug where a chart wasn't updating. We were using OnPush. I used Angular DevTools and realized the parent was pushing data into an array using `.push()` instead of creating a new array reference. I fixed it by using the spread operator `[...oldArray, newItem]`, which triggered change detection instantly.\"",
      "summary10s": "Pick a reference vs mutation bug. Explain the tool you used and the fix."
    }
  },
  {
    "id": "behavioral-typescript-journey",
    "category": "Other",
    "question": "When did you start using TypeScript seriously in a professional environment? Has your TypeScript usage been continuous since then?",
    "frequency": 1,
    "companies": [
      "OctoWelocity"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Provide a timeline and highlight how your usage evolved from basic typing to leveraging advanced generics and strict mode.",
      "explain": "They want to know your depth of experience. Proving continuous growth by mentioning strict mode, utility types, or complex interfaces shows maturity beyond just using \"any\".",
      "example": "\"I started using it seriously 4 years ago with Angular 8. Initially, I just used basic interfaces, but my usage has evolved continuously. Now, I heavily rely on strict mode, generics, and utility types like Partial and Record to enforce compile-time safety across our state management.\"",
      "summary10s": "Show a timeline and a progression in skill from basic types to advanced generics."
    }
  },
  {
    "id": "behavioral-typescript-prevent-bug",
    "category": "Other",
    "question": "Tell me about a time TypeScript helped you prevent a bug, or when a type mismatch caused a real issue. How did you identify and fix it?",
    "frequency": 1,
    "companies": [
      "OctoWelocity"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Describe a scenario where a backend API contract changed, and TypeScript immediately flagged the errors at compile time.",
      "explain": "The core value of TS is compile-time safety. A classic example is a refactored property name or a field becoming nullable, which TS forces you to null-check before it crashes in production.",
      "example": "\"The backend team changed a user ID from a number to a UUID string. Because we used strictly typed interfaces, the moment I pulled the new types, TypeScript highlighted 15 places where we were trying to do math on the ID or pass it to a number-only component. We fixed them in minutes before even running the app.\"",
      "summary10s": "Compile-time safety prevents runtime crashes. API contract changes are the best example."
    }
  },
  {
    "id": "angular-api-integration-error-handling",
    "category": "Angular",
    "question": "Walk me through how you integrate a REST API in Angular. What error handling do you implement in the service vs the component?",
    "frequency": 1,
    "companies": [
      "OctoWelocity"
    ],
    "variations": [
      "Walk me through your actual error-handling flow."
    ],
    "answerSEE": {
      "simple": "Services handle HTTP calls and global error catching; components subscribe, handle UI state (spinners), and display user-friendly messages.",
      "explain": "A clean architecture separates concerns. The service uses HttpClient, handles retries, and uses catchError to log the raw error. The component subscribes, updates a loading flag, and binds the data or a generic error message to the template.",
      "example": "\"In my service, I call `this.http.get()`, pipe a `retry(2)`, and use `catchError` to log the HTTP error to Datadog, throwing a generic string. In the component, I set `isLoading = true`, subscribe, and on success update the UI. On error, I set the error string to a template variable and turn off the spinner.\"",
      "summary10s": "Service = HTTP, Retries, Global Logging. Component = Subscriptions, Spinners, UI alerts."
    }
  },
  {
    "id": "behavioral-tricky-api-integration",
    "category": "Other",
    "question": "In one of your projects, tell me about a specific API integration that was tricky. What made it difficult, and what did you personally do to make it work?",
    "frequency": 1,
    "companies": [
      "OctoWelocity"
    ],
    "variations": [
      "In your financial dashboard project, what was the hardest part for you personally?"
    ],
    "answerSEE": {
      "simple": "Describe a scenario involving complex RxJS orchestration, like dependent API calls or race conditions.",
      "explain": "The interviewer is digging for complex async challenges. Merging multiple streams, handling token refresh loops, or parallel requests are great examples of advanced integration.",
      "example": "\"In a financial dashboard, the hardest part was loading a user's portfolio. I had to fetch the user profile, then use that ID to fetch 5 different asset classes simultaneously. Initially, it was a mess of nested subscriptions. I fixed it by using `switchMap` for the profile and `forkJoin` for the 5 parallel requests, making the code clean and stable.\"",
      "summary10s": "Highlight an RxJS challenge (e.g., nested subscriptions) and how you fixed it with operators like forkJoin/switchMap."
    }
  },
  {
    "id": "angular-service-state-management",
    "category": "Angular",
    "question": "How did you structure the state in your Angular service? What changed in the components after you moved to that approach?",
    "frequency": 1,
    "companies": [
      "OctoWelocity"
    ],
    "variations": [],
    "answerSEE": {
      "simple": "Use a private BehaviorSubject to hold state and expose it as a public Observable. Components become purely reactive.",
      "explain": "This is the \"Service with a Subject\" pattern. It avoids heavy libraries like NgRx for medium apps. Components no longer fetch and store data locally; they use the async pipe to read directly from the service's observable stream.",
      "example": "\"I structured state using a private `BehaviorSubject` for the user cart, and exposed a public `cart$` Observable. When I moved to this approach, the components became incredibly dumb. They just used `*ngFor='let item of cartService.cart$ | async'`. I didn't have to manually pass data between sibling components anymore.\"",
      "summary10s": "Private BehaviorSubject + Public Observable. Components become reactive via the async pipe."
    }
  },
  {
    "id": "dsa-move-negatives",
    "category": "JS Coding",
    "question": "Move all negative elements to one side of array, given array includes zero as well.",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Use a Two Pointer approach similar to the partition step in QuickSort.",
      "explain": "You keep a pointer `left` at the beginning. As you iterate through the array with `right`, whenever you encounter a negative number, you swap it with the `left` pointer and increment `left`. This partitions the array in-place in O(N) time and O(1) space.",
      "example": "\"I would use the QuickSort partition technique. I initialize `j = 0`. I loop through the array with `i`. If `arr[i] < 0`, I swap `arr[i]` with `arr[j]` and do `j++`. By the end of the loop, all negatives are packed at the front.\"",
      "summary10s": "Two pointers (Partition logic). Swap negatives to the front. O(N) time, O(1) space."
    }
  },
  {
    "id": "dsa-min-max-array",
    "category": "JS Coding",
    "question": "Minimum and maximum in array.",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Initialize min and max to the first element, then do a linear scan through the array to update them.",
      "explain": "You can find both in a single pass. For each element, compare it against the current min and current max. This takes O(N) time. To optimize the exact number of comparisons, you can compare in pairs (Tournament Method), reducing comparisons from 2N to 1.5N.",
      "example": "\"For standard arrays, a single pass keeping track of `min` and `max` is O(N) and perfectly fine. If the interviewer wants the absolute minimum number of comparisons, I'd implement the pairwise comparison method to achieve 3N/2 comparisons.\"",
      "summary10s": "Linear scan to track both. O(N) time, O(1) space."
    }
  },
  {
    "id": "dsa-sliding-window-min-max",
    "category": "Java Coding",
    "question": "Minimum/maximum subarray of size k.",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Use the Sliding Window technique.",
      "explain": "For fixed size K, calculate the sum of the first K elements. Then, slide the window by adding the next element and subtracting the element that falls out of the window. Keep track of the min/max sum seen so far. This turns an O(N*K) brute force approach into O(N).",
      "example": "\"I use a sliding window. I first sum indices 0 through K-1. That's my initial window sum. Then, from index K to the end, I add the current element and subtract the element at `i - K`. I use `Math.max()` to keep track of the highest sum.\"",
      "summary10s": "Sliding window pattern. Add the incoming element, subtract the outgoing element. O(N) time."
    }
  },
  {
    "id": "dsa-kth-largest-element",
    "category": "JS Coding",
    "question": "Kth largest element from array.",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Use a Min-Heap of size K, or use the QuickSelect algorithm.",
      "explain": "Sorting takes O(N log N). A better approach is using a PriorityQueue (Min-Heap) of size K. Add elements to it, and if it exceeds size K, pop the smallest. At the end, the root is the Kth largest. This takes O(N log K). The absolute fastest average time is QuickSelect at O(N).",
      "example": "\"I usually implement a Min-Heap of size K. As I iterate through the array, I add to the heap. If the heap size exceeds K, I poll it. By the end, the Kth largest element is sitting at the root of the heap. It's clean and takes O(N log K).\"",
      "summary10s": "Min-Heap of size K (O(N log K)) or QuickSelect (O(N) average)."
    }
  },
  {
    "id": "dsa-kth-most-frequent",
    "category": "Java Coding",
    "question": "Kth most frequent numbers or words.",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Count frequencies using a HashMap, then use a Min-Heap or Bucket Sort to find the top K.",
      "explain": "First, iterate the array to build a frequency map. Then, you can either put the entries into a Min-Heap (sorted by frequency) keeping size K, which takes O(N log K). Or, use Bucket Sort where the index is the frequency, achieving O(N) time.",
      "example": "\"I build a frequency map first. For guaranteed O(N) time, I create an array of lists (buckets) where the index represents the frequency. I populate the buckets, then iterate backwards from the highest frequency to grab the top K elements.\"",
      "summary10s": "HashMap for counts -> Bucket Sort array for O(N), or Min-Heap for O(N log K)."
    }
  },
  {
    "id": "dsa-longest-consecutive-sequence",
    "category": "JS Coding",
    "question": "Length of longest consecutive subsequence.",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Put all elements in a HashSet, then look for the start of sequences.",
      "explain": "Add everything to a Set. Iterate through the array. If `set.contains(num - 1)`, it's NOT the start of a sequence, so skip it. If it is the start, keep checking `num + 1` in the set to count the length. This guarantees O(N) time because you only build sequences from their absolute start.",
      "example": "\"I use a HashSet. I iterate the array, and if `!set.contains(num - 1)`, I know I'm at the start of a sequence. I then do a while loop checking if `set.contains(num + 1)`, incrementing my count. This ensures O(N) time complexity instead of O(N log N) sorting.\"",
      "summary10s": "HashSet. Only count upward if `num - 1` doesn't exist. O(N) time."
    }
  },
  {
    "id": "dsa-all-possible-subsequences",
    "category": "Java Coding",
    "question": "Find all possible subsequences of string.",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Use a recursive Backtracking (pick / don't pick) approach.",
      "explain": "For every character in the string, you have two choices: include it in the current subsequence or don't. You recursively call both options and build the subsequences. Time complexity is O(2^N).",
      "example": "\"I use recursion. At each index, I make two recursive calls: one where I append the current character to my building string, and one where I skip it. When my index reaches the length of the string, I add the built string to my result list.\"",
      "summary10s": "Recursion (Backtracking). Pick vs Don't Pick at each index. O(2^N) time."
    }
  },
  {
    "id": "dsa-container-with-most-water",
    "category": "JS Coding",
    "question": "Container with most water problem.",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Use a Two Pointer approach (left and right edges), always moving the pointer with the smaller height inward.",
      "explain": "Start pointers at the extreme ends. The area is `min(height[L], height[R]) * width`. To maximize area, you must find taller lines, so you move the pointer that has the smaller height inward. Repeat until pointers cross. This takes O(N) time.",
      "example": "\"I place a left pointer at 0 and a right pointer at the end. I calculate the area and update my max. Since the width is shrinking, the only way to get a larger area is to find a taller height, so I increment the left pointer if it's shorter, or decrement the right if it's shorter.\"",
      "summary10s": "Two Pointers (ends). Area = min(H[L], H[R]) * width. Move the shorter pointer inward. O(N)."
    }
  },
  {
    "id": "java-classnotfound-vs-noclassdef",
    "category": "Java",
    "question": "Difference: ClassNotFoundException vs NoClassDefFoundError",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "ClassNotFoundException occurs when you explicitly try to load a class that doesn't exist. NoClassDefFoundError occurs when a class was present during compilation but is missing at runtime.",
      "explain": "ClassNotFound is a checked exception thrown by Class.forName() when the string class name isn't in the classpath. NoClassDef is an Error thrown by the JVM when it tries to link a class (e.g., executing `new User()`) and the User.class file, which existed when you compiled, has been deleted or moved.",
      "example": "\"If I use Reflection `Class.forName(\"com.mysql.Driver\")` and forget the JAR, I get ClassNotFoundException. But if I compile my code with `User.java`, then delete `User.class` and run the app, the JVM throws NoClassDefFoundError when it hits `new User()`.\"",
      "summary10s": "ClassNotFound = Reflection failed (checked). NoClassDefFound = Compiled class missing at runtime (Error)."
    }
  },
  {
    "id": "java-class-modifiers",
    "category": "Java",
    "question": "Can a class be static, final, or private?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "A top-level class can only be public or package-private (and final). Only nested/inner classes can be static or private.",
      "explain": "Top-level classes cannot be static because \"static\" implies belonging to a class, and a top-level class belongs to a package. They can be final to prevent inheritance. Nested classes CAN be private (hidden from outside) and static (doesn't need an instance of the outer class to be instantiated).",
      "example": "\"I frequently use private static inner classes for helper data structures, like a `Node` class inside a `LinkedList`. But a normal top-level class can never be marked static or private; the compiler will block it.\"",
      "summary10s": "Top-level: public, final, default. Nested: can be static, private, protected."
    }
  },
  {
    "id": "java-oop-vs-scripting",
    "category": "Java",
    "question": "OOP vs scripting languages",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "OOP languages (like Java) are compiled, strongly typed, and architecture-driven. Scripting languages (like Python/JS) are interpreted, dynamically typed, and script-driven.",
      "explain": "Java requires you to define classes, compile to bytecode, and run on a VM. It enforces strict contracts making it great for massive enterprise apps. Scripting languages are interpreted line-by-line, allow duck-typing, and are optimized for fast development and automation.",
      "example": "\"If I need a quick script to parse a CSV, I use Python because I don't need to set up a whole class structure. But for a banking backend, I use Java OOP because the compiler catches type errors before they ever reach production.\"",
      "summary10s": "OOP = Compiled, strict types, complex architecture. Scripting = Interpreted, dynamic, fast prototyping."
    }
  },
  {
    "id": "java-exception-hierarchy-root",
    "category": "Java",
    "question": "What is the superclass of all exceptions?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The superclass of all exceptions and errors in Java is java.lang.Throwable.",
      "explain": "Throwable sits at the very top of the hierarchy. It splits into two main branches: Exception (recoverable conditions like IOException or RuntimeException) and Error (unrecoverable JVM crashes like OutOfMemoryError).",
      "example": "\"When you write `catch (Exception e)`, you are actually catching a subclass of Throwable. You could write `catch (Throwable t)` to catch literally anything, including OutOfMemoryErrors, but that's an anti-pattern because you can't recover from JVM crashes.\"",
      "summary10s": "Throwable is the root. It splits into Exception and Error."
    }
  },
  {
    "id": "java-exception-propagation",
    "category": "Java",
    "question": "What is Exception propagation?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "It is the process of an exception moving up the method call stack until it finds a catch block.",
      "explain": "When an exception is thrown inside a method, if it isn't caught there, the JVM passes it to the calling method. This continues up the stack trace. Unchecked exceptions propagate automatically, while checked exceptions must be explicitly propagated using the `throws` keyword.",
      "example": "\"If Method A calls Method B, and Method B calls Method C, and C throws a RuntimeException, the exception drops out of C, then B, then A, until it hits my global @ControllerAdvice catch block. It bubbles up the stack automatically.\"",
      "summary10s": "Exceptions bubble up the call stack from the child method to the parent caller until caught."
    }
  },
  {
    "id": "java-autoboxing",
    "category": "Java",
    "question": "What is AutoBoxing?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "AutoBoxing is the automatic conversion the compiler makes between primitive types and their corresponding object wrapper classes.",
      "explain": "Before Java 5, you had to manually convert `int` to `Integer` to put it in a Collection (like an ArrayList). Now, the compiler does it automatically (Autoboxing: int -> Integer) and reverses it (Unboxing: Integer -> int) to save you boilerplate code.",
      "example": "\"I can write `List<Integer> list = new ArrayList<>(); list.add(5);`. Under the hood, the compiler converts 5 to `Integer.valueOf(5)`. That's autoboxing. Be careful though, autoboxing inside a large loop creates thousands of hidden objects, hurting performance.\"",
      "summary10s": "Compiler automatically converts primitives (int) to objects (Integer) and vice versa."
    }
  },
  {
    "id": "java-lambdas-usefulness",
    "category": "Java",
    "question": "Lambda functions and why they are useful",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Lambdas are anonymous, short blocks of code that take parameters and return a value. They make code concise and enable functional programming.",
      "explain": "Before Java 8, passing behavior to a method required bulky Anonymous Inner Classes. Lambdas allow you to pass functions as arguments directly. This is the entire foundation of the Streams API, allowing declarative data processing.",
      "example": "\"Instead of writing a 5-line anonymous `Comparator` class to sort a list of users, I just write `users.sort((u1, u2) -> u1.age - u2.age)`. It reduces boilerplate and makes the intent immediately obvious.\"",
      "summary10s": "Concise syntax for passing behavior as data. The backbone of Java Streams."
    }
  },
  {
    "id": "java-interface-constructors",
    "category": "Java",
    "question": "Why interfaces cannot have constructors?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Because interfaces do not have instance state (instance variables) to initialize.",
      "explain": "A constructor's sole purpose is to initialize the state of an object in memory. Since interfaces can only have abstract methods (and static/default ones) and public static final constants, they have no mutable instance state. Therefore, a constructor would be entirely useless.",
      "example": "\"When I create a `Vehicle` interface, I can't instantiate it directly with `new Vehicle()`. It just defines a contract. Since there are no instance fields like `speed` or `color` stored in the interface itself, there is nothing for a constructor to build or initialize.\"",
      "summary10s": "Constructors initialize state. Interfaces have no instance state, so they don't need constructors."
    }
  },
  {
    "id": "java-for-loop-vs-foreach",
    "category": "Java",
    "question": "Performance: for-loop vs for-each",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "A standard for-loop is slightly faster for Arrays and ArrayLists, but for-each is safer and works perfectly with all Iterables like LinkedList.",
      "explain": "A standard `for (int i=0)` is highly optimized by the JVM for index-based arrays. A `for-each` loop uses an Iterator object under the hood, which adds slight overhead. However, for a `LinkedList`, a standard for-loop using `.get(i)` is O(N^2) disaster, while for-each remains O(N).",
      "example": "\"I almost exclusively use for-each because it prevents off-by-one errors and keeps the code clean. The nanosecond performance hit of creating an Iterator is irrelevant in 99% of business apps. But if I'm iterating a LinkedList, I MUST use for-each to maintain O(N) time complexity.\"",
      "summary10s": "For-loop is slightly faster for arrays. For-each is cleaner, prevents index bugs, and prevents O(N^2) disasters in LinkedLists."
    }
  },
  {
    "id": "java-coding-threads-sequence",
    "category": "Java Coding",
    "question": "Code using 5 threads printing in sequence",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Use wait() and notifyAll() with a shared lock and a state variable to control whose turn it is.",
      "explain": "To make threads print sequentially (e.g., T1 prints 1, T2 prints 2, T3 prints 3), they must share a lock object and a counter. Inside a synchronized block, each thread checks if `counter % 5 == threadId`. If not, it calls `wait()`. If it is, it prints, increments the counter, and calls `notifyAll()`.",
      "example": "\"I would create a shared `AtomicInteger turn` or a simple `int` with a lock. Thread 0 checks if `turn % 5 == 0`. It prints, sets turn to 1, and calls `lock.notifyAll()`. All waiting threads wake up, but only Thread 1's condition will pass, ensuring strict sequence.\"",
      "summary10s": "Synchronized block with a shared counter. `while (turn != myId) wait(); print(); turn++; notifyAll();`"
    }
  },
  {
    "id": "system-design-why-patterns",
    "category": "System Design",
    "question": "Why design patterns are needed, and how to invent one",
    "frequency": 1,
    "companies": [],
    "variations": [
      "Patterns you know and how to invent one"
    ],
    "answerSEE": {
      "simple": "Design patterns provide proven, standardized solutions to common software design problems, creating a shared vocabulary for developers.",
      "explain": "They prevent reinventing the wheel. If you say \"Factory Pattern,\" every developer instantly knows the architecture. You don't really \"invent\" a pattern; patterns emerge organically when developers realize a specific structural solution keeps solving a recurring problem across different architectures.",
      "example": "\"I use Singleton, Builder, Factory, and Strategy frequently. I wouldn't try to 'invent' a pattern on purpose. If I solve a highly specific architectural problem today, and 5 years from now I realize thousands of developers adopted my exact blueprint because it solves a universal problem... that's how a pattern is born.\"",
      "summary10s": "They are proven blueprints for common problems. Patterns aren't invented; they emerge from repeated success."
    }
  },
  {
    "id": "spring-boot-what-and-why",
    "category": "Spring Boot",
    "question": "What is Spring Boot and why it’s popular",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Spring Boot is an extension of the Spring framework that provides auto-configuration and embedded servers to build production-ready apps instantly.",
      "explain": "Standard Spring required massive XML files and manual Tomcat deployment. Spring Boot uses opinionated defaults (@EnableAutoConfiguration), starters (like spring-boot-starter-web) to manage dependencies, and embeds Tomcat directly inside a runnable JAR file.",
      "example": "\"In 2014, setting up a Spring MVC app took 3 days of configuring XML and deploying WAR files. With Spring Boot, I go to Spring Initializr, download a ZIP, type `public static void main`, run it, and I have a live web server on port 8080 in 10 seconds. That's why it won the market.\"",
      "summary10s": "Auto-configuration, dependency starters, and embedded Tomcat. No more XML or WAR files."
    }
  },
  {
    "id": "spring-controller-vs-restcontroller",
    "category": "Spring Boot",
    "question": "@Controller vs @RestController",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "@RestController is simply a combination of @Controller and @ResponseBody.",
      "explain": "@Controller is traditionally used for MVC apps returning HTML views (like Thymeleaf). If you return a string, Spring looks for a view template. @RestController guarantees that every method returns data (JSON/XML) directly into the HTTP response body, bypassing the view resolver.",
      "example": "\"If I use @Controller and return 'home', Spring tries to render `home.html`. But because I build backend APIs, I exclusively use @RestController. This tells Spring that when I return a User object, it should pass it to Jackson to serialize into JSON directly to the client.\"",
      "summary10s": "@RestController = @Controller + @ResponseBody. Returns JSON instead of HTML views."
    }
  },
  {
    "id": "spring-mock-vs-injectmocks",
    "category": "Spring Boot",
    "question": "@Mock vs @InjectMocks",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "@Mock creates a fake object, while @InjectMocks creates a real instance of the class being tested and injects the @Mocks into it.",
      "explain": "In unit testing with Mockito, you want to test one specific class (Service) in isolation. You use @Mock to create fake versions of its dependencies (Repositories). You use @InjectMocks on the Service itself so Mockito knows to inject the fake repositories into the real service.",
      "example": "\"When testing `UserService`, I declare `@Mock UserRepository repo;` and `@InjectMocks UserService service;`. This creates a real `UserService` but hands it my fake, controllable repository, allowing me to test the service's business logic without hitting a real database.\"",
      "summary10s": "@Mock = fake dependency. @InjectMocks = the real class being tested that receives the fakes."
    }
  },
  {
    "id": "java-list-set-map",
    "category": "Java",
    "question": "List vs Set vs Map (when to use which)",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "List allows duplicates and keeps order. Set denies duplicates. Map stores Key-Value pairs.",
      "explain": "Use List (ArrayList) when you need an ordered sequence and index-based access. Use Set (HashSet) when you need to ensure uniqueness and fast lookup for existence. Use Map (HashMap) when you need to look up a specific value based on a unique key.",
      "example": "\"If I'm returning a feed of posts, I use a List to maintain chronological order. If I'm tracking user IDs that have liked a post, I use a Set so I don't count the same user twice. If I'm caching user profiles by their ID, I use a Map for O(1) lookups.\"",
      "summary10s": "List = ordered, duplicates. Set = unique, unordered. Map = key-value dictionary."
    }
  },
  {
    "id": "java-hashcode-generation",
    "category": "Java",
    "question": "How hashCode is generated",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The default Object hashCode() is typically a conversion of the object's internal memory address into an integer.",
      "explain": "However, you should always override it in data classes. A good hashCode implementation combines the hashes of the object's fields (using prime numbers like 31 to avoid collisions) to generate a mathematically distributed integer representing the object's state.",
      "example": "\"If I have a `User(int id, String name)` class, I override `hashCode()` using `Objects.hash(id, name)`. This ensures that two distinct User objects with the exact same data produce the same hash code, which is an absolute requirement if I want to use them as keys in a HashMap.\"",
      "summary10s": "Default: memory address. Overridden: mathematical combination of object fields (state) to distribute evenly."
    }
  },
  {
    "id": "java-streams-api-basics",
    "category": "Java",
    "question": "What Streams API is, Ways to create Streams, Streams vs Collections",
    "frequency": 1,
    "companies": [],
    "variations": [
      "What Streams API is",
      "Ways to create Streams",
      "Streams vs Collections"
    ],
    "answerSEE": {
      "simple": "Streams API allows functional-style, declarative operations on data. Collections store data; Streams process data.",
      "explain": "A Collection is an in-memory data structure. A Stream is a pipeline that pulls data from a collection, transforms it, and produces a result without modifying the original source. You can create streams via `list.stream()`, `Arrays.stream(arr)`, or `Stream.of(...)`.",
      "example": "\"Instead of writing a bulky for-loop with if-statements to filter and uppercase a list of strings, I just write `list.stream().filter(s -> s.length() > 3).map(String::toUpperCase).collect(Collectors.toList())`. It tells Java WHAT to do, not HOW to do it.\"",
      "summary10s": "Collections = Data Storage. Streams = Data Processing Pipeline (declarative and non-mutating)."
    }
  },
  {
    "id": "java-streams-intermediate-terminal",
    "category": "Java",
    "question": "Intermediate vs terminal operations",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Intermediate operations return another Stream (lazy execution), while Terminal operations return a non-stream result (triggering execution).",
      "explain": "Methods like filter(), map(), and sorted() are intermediate. They do absolutely nothing until a terminal operation is called. Methods like collect(), count(), and forEach() are terminal. Once a terminal operation executes, the stream pipeline is consumed and cannot be reused.",
      "example": "\"If I write `list.stream().filter(...)` and stop there, the filter never actually runs. The Stream is lazy. It only processes the data when I add `.collect(Collectors.toList())` at the very end. The terminal operation pulls the data through the intermediate pipeline.\"",
      "summary10s": "Intermediate (map/filter) = Lazy, returns Stream. Terminal (collect/count) = Triggers execution, returns result."
    }
  },
  {
    "id": "java-streams-exception-handling",
    "category": "Java",
    "question": "Exception handling in Streams",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Checked exceptions inside lambda functions cause compile errors and must be handled with try-catch blocks or wrapper methods.",
      "explain": "Functional interfaces like `Function` or `Predicate` do not declare `throws Exception`. If you call a method inside `.map()` that throws an IOException, you can't just add `throws` to the parent method. You are forced to write an ugly try-catch block inside the lambda, or write a wrapper utility to catch and rethrow it as a RuntimeException.",
      "example": "\"When doing `stream.map(file -> read(file))`, if `read()` throws IOException, it breaks the stream compilation. I either put a `try { return read(file); } catch(e) { throw new RuntimeException(e); }` inside the map, or I use a custom SneakyThrows wrapper to keep the pipeline clean.\"",
      "summary10s": "Lambdas don't allow checked exceptions. You must try-catch them inside the lambda or wrap them as RuntimeExceptions."
    }
  },
  {
    "id": "java-sequential-vs-parallel-streams",
    "category": "Java",
    "question": "Sequential vs parallel streams",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Sequential streams process elements one by one on a single thread. Parallel streams split the work across multiple threads using the ForkJoinPool.",
      "explain": "You can convert any stream using `.parallelStream()`. It chunks the data and processes it concurrently. However, it introduces multithreading overhead and uses the common JVM thread pool. It should only be used for CPU-intensive tasks on massive datasets, otherwise, it's actually slower.",
      "example": "\"I rarely use parallel streams for simple math or DB calls because the overhead of splitting and merging threads makes it slower than sequential. I only use `parallelStream()` if I have a massive list of images and need to apply a heavy CPU filter to all of them simultaneously.\"",
      "summary10s": "Sequential = single thread. Parallel = ForkJoinPool multithreading. Use parallel only for massive CPU-bound tasks."
    }
  },
  {
    "id": "java-concurrent-modification",
    "category": "Java",
    "question": "What exactly happens if you modify a collection while iterating over it?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "You get a ConcurrentModificationException.",
      "explain": "Java collections use a fast-fail iterator. It keeps a `modCount` (modification count). If you use a for-each loop and structurally modify the list (like `list.remove()`) without using the Iterator's own remove method, the `modCount` mismatches and throws the exception immediately to prevent undefined behavior.",
      "example": "\"If I write `for(String s : list) { if(s.equals(\"X\")) list.remove(s); }`, it crashes. Instead, I should use `Iterator.remove()` or just use Java 8's `list.removeIf(s -> s.equals(\"X\"))`.\"",
      "summary10s": "Modifying via the collection object instead of the iterator throws ConcurrentModificationException."
    }
  },
  {
    "id": "java-lock-exception",
    "category": "Java",
    "question": "What happens to a lock if an exception is thrown inside a thread?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "If using a `synchronized` block, the lock is automatically released. If using `ReentrantLock`, it is NOT released unless you put `unlock()` in a `finally` block.",
      "explain": "This is a huge trap. The JVM inherently guarantees that any exit from a `synchronized` block (normal or exception) releases the intrinsic lock. But `ReentrantLock` is just a Java object. If an exception skips your `lock.unlock()` line, the lock is held forever, causing a deadlock for all other threads.",
      "example": "\"I always wrap `ReentrantLock` logic like this: `lock.lock(); try { ... } finally { lock.unlock(); }`. If a NullPointerException occurs inside the try, the finally block guarantees the lock is released.\"",
      "summary10s": "Synchronized releases automatically. ReentrantLock requires explicit unlock() in a finally block."
    }
  },
  {
    "id": "java-optional-antipattern",
    "category": "Java",
    "question": "When should you use \"Optional\", and when does it become an anti-pattern?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Use Optional as a return type to indicate a value might be missing. It becomes an anti-pattern when used as a class field or method parameter.",
      "explain": "Optional was designed specifically to prevent NullPointerExceptions on return values (like `repository.findById()`). However, `Optional` itself is an object. If you use it as a class field, it breaks Serialization. If you use it as a method parameter, you force callers to wrap variables in `Optional.of()`, creating unnecessary garbage collection overhead.",
      "example": "\"I return `Optional<User>` from my service. But I NEVER write `public void setName(Optional<String> name)`. I just pass a normal String and do a null check, avoiding the object creation overhead.\"",
      "summary10s": "Good: Return types. Bad: Class fields (not Serializable) and Method parameters (overhead)."
    }
  },
  {
    "id": "java-record-vs-class",
    "category": "Java",
    "question": "When would you use a Java \"record\" instead of a standard \"class\", and what are its limitations?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Use records for immutable data carriers (DTOs). The limitation is they cannot extend other classes and their fields cannot be modified.",
      "explain": "Introduced in Java 14, `record` automatically generates constructors, getters, equals, hashCode, and toString. It eliminates boilerplate for DTOs. However, because they implicitly extend `java.lang.Record`, Java's single-inheritance rule means they cannot extend any other class. Also, all fields are `final`.",
      "example": "\"Instead of writing a 50-line Lombok `@Data` class for an API response, I just write `public record UserDto(String name, int age) {}`. It is perfect for mapping JSON, but I can't use it as a JPA Entity because Hibernate requires a no-args constructor and mutable fields.\"",
      "summary10s": "Records are immutable, boilerplate-free DTOs. They cannot be inherited from or mutated."
    }
  },
  {
    "id": "java-memory-leak-gc",
    "category": "Java",
    "question": "How can a Java application still have a memory leak despite having a Garbage Collector?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Memory leaks in Java happen when you accidentally keep strong references to objects you no longer need.",
      "explain": "The GC only destroys objects that are unreachable (no active references). If you put objects into a static `HashMap` (like a custom cache) and never remove them, the GC assumes they are still in use because the static map holds a strong reference to them. Eventually, the heap fills up and throws OutOfMemoryError.",
      "example": "\"I once created a static `List<User>` to track active sessions. When users logged out, I forgot to remove them from the list. Even though the sessions were dead, the static list held strong references, preventing the GC from cleaning them up. The server crashed after a few hours.\"",
      "summary10s": "GC only cleans unreferenced objects. Caching objects in static collections without eviction causes leaks."
    }
  },
  {
    "id": "behavioral-tell-me-about-yourself",
    "category": "Other",
    "question": "Can you tell me about yourself?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Give a brief summary of your current role, your core tech stack, and a highlight of a recent challenging project.",
      "explain": "Interviewers use this to gauge your communication skills and set the tone. Don't recite your resume. Focus on what you are doing right now, what you excel at (e.g., Spring Boot microservices), and what you are looking for in your next role.",
      "example": "\"I'm a full-stack developer with 4 years of experience, primarily focused on Java, Spring Boot, and Angular. Recently, I led the migration of a monolithic payment system into microservices, which reduced our deployment time by 50%. I'm looking for a role where I can continue building scalable backends.\"",
      "summary10s": "Keep it to 90 seconds. Present role, core skills, recent big win, and what you want next."
    }
  },
  {
    "id": "behavioral-frontend-backend-balance",
    "category": "Other",
    "question": "Your experience seems to be more frontend-focused. Are you comfortable working on the backend?",
    "frequency": 1,
    "companies": [],
    "variations": [
      "How much hands-on experience do you have in Java and Spring Boot?",
      "How would you rate yourself out of 10 in Angular and Java?",
      "Are you looking to explore backend development more?"
    ],
    "answerSEE": {
      "simple": "Acknowledge your frontend strength, but immediately pivot to concrete backend projects you've delivered.",
      "explain": "Full-stack developers often get pigeonholed. You must prove you aren't just a UI developer who occasionally writes a simple CRUD endpoint. Rate yourself honestly (e.g., Angular 8/10, Java 7/10) but emphasize your desire and capability to tackle complex backend architecture.",
      "example": "\"While my recent title was frontend-heavy, I am completely comfortable on the backend. In my last project, I personally designed the Spring Boot REST APIs, configured Spring Security with JWTs, and wrote the Hibernate entity mappings. I rate myself an 8 in Angular and a solid 7 in Java, and I am highly motivated to take on deeper backend architectural challenges.\"",
      "summary10s": "Own your frontend skills, but prove your backend competence with specific technical examples."
    }
  },
  {
    "id": "microservices-circuit-breaker-annotation-level",
    "category": "Microservices",
    "question": "At what level would you apply the Circuit Breaker annotation?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Apply it at the client level (the method making the external HTTP/Feign call).",
      "explain": "You don't apply `@CircuitBreaker` on the controller that receives the request. You apply it on the Service or FeignClient method that *calls* the external microservice. This ensures that if the external service fails, the circuit opens exactly where the call is being made, immediately triggering the fallback method.",
      "example": "\"I apply `@CircuitBreaker(name = \"inventoryService\", fallbackMethod = \"defaultInventory\")` directly on the `getInventory()` method inside my service class, which uses `RestTemplate` to call the Inventory Microservice.\"",
      "summary10s": "Apply it on the method that executes the outbound external network call."
    }
  },
  {
    "id": "microservices-retry-vs-timeout",
    "category": "Microservices",
    "question": "How do Retry and Socket Timeout work? If both Retry and Circuit Breaker are implemented, which one executes first?",
    "frequency": 1,
    "companies": [],
    "variations": [
      "If both Retry and Circuit Breaker are implemented, which one executes first?"
    ],
    "answerSEE": {
      "simple": "Timeout aborts a hanging call. Retry attempts the call again. Retry executes BEFORE the Circuit Breaker opens.",
      "explain": "A Socket Timeout kills the connection if the server doesn't respond in X seconds. A Retry will then try the call again. The Circuit Breaker wraps the Retry. If the call fails 3 times (due to Retry exhaustion), the Circuit Breaker records a failure. Once failures cross a threshold, the Circuit Breaker opens.",
      "example": "\"If I have `@Retry` and `@CircuitBreaker` on a method, Resilience4j executes the Retry first. If my service is down, it retries 3 times. All 3 fail. The Circuit Breaker counts that as 1 failed execution. If the next few requests also fail, the Circuit Breaker opens, and subsequent requests bypass the Retry entirely and go straight to the fallback.\"",
      "summary10s": "Timeout kills hanging calls. Retry tries again. Circuit Breaker wraps Retry and opens after consecutive failures."
    }
  },
  {
    "id": "microservices-database-consistency",
    "category": "Microservices",
    "question": "How do you maintain database consistency across different microservices?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Use the Saga Pattern (Choreography or Orchestration) with asynchronous events.",
      "explain": "You cannot use traditional ACID transactions (like `@Transactional`) across multiple microservices because they have separate databases (Database-per-service). Instead, you use the Saga pattern. If Microservice A succeeds but Microservice B fails, B publishes a failure event, and A listens to it to execute a \"compensating transaction\" (a rollback).",
      "example": "\"I maintain consistency using Choreography Saga. The Order Service creates an order and emits an `OrderCreated` event to Kafka. The Payment Service listens, charges the card, and emits `PaymentFailed`. The Order Service listens for `PaymentFailed` and marks the order as CANCELED. This ensures eventual consistency.\"",
      "summary10s": "Use the Saga pattern with compensating transactions and an event broker (Kafka/RabbitMQ)."
    }
  },
  {
    "id": "spring-disable-autoconfig",
    "category": "Spring Boot",
    "question": "If you want to disable a specific Spring Boot auto-configuration, how would you do it?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Use the `exclude` attribute on the `@SpringBootApplication` annotation.",
      "explain": "Spring Boot automatically configures beans based on your classpath. If you don't want it to (e.g., you added a database dependency but want to manually configure the DataSource), you can exclude the specific AutoConfiguration class.",
      "example": "\"I just go to my main class and write `@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})`. Now Spring won't try to automatically connect to a database on startup.\"",
      "summary10s": "Use `@SpringBootApplication(exclude = {ClassName.class})`."
    }
  },
  {
    "id": "spring-multiple-exception-handlers",
    "category": "Spring Boot",
    "question": "What happens if there are multiple exception handler methods for the same exception? How does Spring determine which handler to invoke?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Spring throws an `IllegalStateException` at startup if you define the exact same exception twice in the same advice class. Otherwise, it picks the most specific subclass.",
      "explain": "If you have `@ExceptionHandler(Exception.class)` and `@ExceptionHandler(NullPointerException.class)`, and a NPE occurs, Spring traverses the exception hierarchy and picks the most specific match (NPE). If you define two identical handlers in the same class, the app won't even start.",
      "example": "\"Spring uses ExceptionDepthComparator. It checks the inheritance tree. NullPointerException is closer to the thrown exception than the generic Exception class, so it routes to the NPE handler. If I accidentally write `@ExceptionHandler(RuntimeException.class)` on two different methods in my ControllerAdvice, Spring crashes on boot.\"",
      "summary10s": "Spring uses ExceptionDepthComparator to find the closest matching subclass in the exception hierarchy."
    }
  },
  {
    "id": "java-coding-reverse-array-streams",
    "category": "Java Coding",
    "question": "Can you solve the array reversal using Java Streams?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Yes, by streaming IntStream indices in reverse order, but it's an anti-pattern for this problem.",
      "explain": "Streams are designed for forward-processing pipelines. They don't have a native `.reverse()` for primitives. To reverse an array `arr`, you have to generate an `IntStream` from `arr.length - 1` down to 0, and map those indices to the array elements.",
      "example": "\"I can do it using `IntStream.rangeClosed(1, arr.length).map(i -> arr[arr.length - i]).toArray();`. However, I would tell the interviewer that using a standard two-pointer while loop is much more readable and performant because Streams add unnecessary boxing and object creation overhead here.\"",
      "summary10s": "Use `IntStream` to map indices backward. Note that a classic 2-pointer loop is better."
    }
  },
  {
    "id": "java-coding-second-repeated-char",
    "category": "Java Coding",
    "question": "Given \"String str = 'programming'\", find the second repeated character. How would it scale to millions of chars?",
    "frequency": 1,
    "companies": [],
    "variations": [
      "How would your solution work if the string contained millions of characters?",
      "Where exactly in your program are you checking whether a character is duplicated?",
      "What is the time and space complexity of your solution?"
    ],
    "answerSEE": {
      "simple": "Use a LinkedHashMap to store characters and their frequencies, then iterate to find the second one with a count > 1.",
      "explain": "A `LinkedHashMap` maintains insertion order. You iterate the string and build the frequency map (O(N) time). Then, you iterate the map's entry set. The first time you see a value > 1, you skip it. The second time you see a value > 1, you return that key. For millions of characters, this is highly scalable because the Space Complexity is bounded by the alphabet size (O(1) space, max 256 or 65k entries).",
      "example": "\"I iterate the string: `map.put(c, map.getOrDefault(c, 0) + 1)`. Then I loop the map. I keep a `repeatedCount`. When `entry.getValue() > 1`, I increment `repeatedCount`. If `repeatedCount == 2`, I return `entry.getKey()`. Time is O(N). Space is O(1) because a character map never exceeds the fixed character set, even for millions of chars.\"",
      "summary10s": "LinkedHashMap keeps order. Build frequencies (O(N)). Find the 2nd char with count > 1. Space is O(1) bounded by character set."
    }
  },
  {
    "id": "js-coding-2nd-largest-no-inbuilt",
    "category": "JS Coding",
    "question": "Find the 2nd largest element in an array without using any javascript inbuilt method.",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Iterate through the array while keeping track of the `largest` and `secondLargest` numbers.",
      "explain": "Instead of using `.sort()`, you use a single `for` loop. Initialize both variables to `-Infinity`. If the current number is greater than `largest`, update `secondLargest` to `largest`, then update `largest`. If the number is between `secondLargest` and `largest`, just update `secondLargest`. This achieves O(N) time and O(1) space.",
      "example": "\"I initialize `max1` and `max2` to `-Infinity`. I loop: `if (arr[i] > max1) { max2 = max1; max1 = arr[i]; } else if (arr[i] > max2 && arr[i] != max1) { max2 = arr[i]; }`. It's highly efficient and avoids sorting overhead.\"",
      "summary10s": "Track `max1` and `max2` in a single O(N) loop. Avoid `.sort()` for better performance."
    }
  },
  {
    "id": "js-coding-rotate-array",
    "category": "JS Coding",
    "question": "Rotate the given array clockwise. Input [1,2,3,4,5,6] -> Output [5,6,1,2,3,4].",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Reverse the whole array, then reverse the first K elements, then reverse the remaining elements.",
      "explain": "While you can use `.splice()` and `.unshift()`, doing it in-place using the three-reversal method is the algorithmic golden standard (O(N) time, O(1) space). First, calculate `k = k % arr.length`. Reverse the entire array. Reverse the elements from `0` to `k-1`. Finally, reverse from `k` to the end.",
      "example": "\"To rotate clockwise by 2, I reverse everything: `[6,5,4,3,2,1]`. Then reverse the first 2: `[5,6,4,3,2,1]`. Then reverse the rest: `[5,6,1,2,3,4]`. I would write a small helper function `reverse(arr, start, end)` to do this cleanly.\"",
      "summary10s": "Use the three-step reversal algorithm for an O(N) time, in-place O(1) space solution."
    }
  },
  {
    "id": "js-coding-string-compression",
    "category": "JS Coding",
    "question": "Compress consecutive repeated characters by replacing them with the character followed by its count (aabbb → a2b3).",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Iterate through the string, count identical adjacent characters, and append the character and count to a result string.",
      "explain": "Use a `for` loop. Keep a `count` variable. Compare `str[i]` with `str[i+1]`. If they are the same, increment `count`. If they are different, append `str[i] + count` to your result string and reset `count` to 1. This runs in O(N) time.",
      "example": "\"I loop from `i=0` to length. If `str[i] === str[i+1]`, I do `count++`. Otherwise, I do `res += str[i] + count; count = 1;`. In JS, string concatenation is fine, but in Java, you'd absolutely need a StringBuilder.\"",
      "summary10s": "Single O(N) loop. Compare `str[i]` with `str[i+1]`. Append and reset count when they differ."
    }
  },
  {
    "id": "js-type-coercion-output",
    "category": "JavaScript",
    "question": "Find the output: console.log('a' + 'b' + 2); console.log('a' - 'b' + 2);",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The first outputs `\"ab2\"`. The second outputs `NaN`.",
      "explain": "In JavaScript, the `+` operator overloaded. If any operand is a string, it performs string concatenation (`\"a\" + \"b\" = \"ab\"`, `\"ab\" + 2 = \"ab2\"`). The `-` operator, however, strictly attempts numeric subtraction. It tries to convert \"a\" to a number, fails (resulting in `NaN`), and `NaN + 2` is still `NaN`.",
      "example": "\"This is classic JS type coercion. `+` favors strings, so it concatenates. `-` favors numbers, so it forces a numeric cast. Since 'a' isn't a number, it evaluates to `NaN` immediately.\"",
      "summary10s": "`+` favors string concatenation. `-` favors numeric math, triggering NaN for letters."
    }
  },
  {
    "id": "js-closure-output-tricky",
    "category": "JavaScript",
    "question": "Find the output: function outer() { var x = 1; function inner() { console.log(x); } x = 2; return inner; } outer()();",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The output is `2`.",
      "explain": "This tests closures and variable references. A closure does not capture the *value* of `x` at the moment the function is defined; it captures a *reference* to the memory location of `x`. Because `x` is reassigned to `2` before `inner` is returned and executed, `inner` reads the latest value: `2`.",
      "example": "\"Even though `x` was `1` when `inner` was declared, closures capture references, not snapshots. By the time `result()` is invoked, `outer` has already updated `x` to `2`. Therefore, it logs `2`.\"",
      "summary10s": "Closures capture variable references, not value snapshots. It logs the latest assigned value."
    }
  },
  {
    "id": "js-deep-vs-shallow-copy",
    "category": "JavaScript",
    "question": "What is the difference between deep copy vs shallow copy?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "A shallow copy copies top-level properties but shares nested object references. A deep copy creates a completely independent clone of all nested levels.",
      "explain": "If you use `Object.assign()` or the spread operator `...`, you get a shallow copy. If you change a nested array inside the copy, it affects the original. To get a deep copy, you historically used `JSON.parse(JSON.stringify(obj))`, but now you should use the native `structuredClone(obj)`.",
      "example": "\"If I have `obj = { a: 1, config: { dark: true } }`. A shallow copy `...obj` copies `a` by value, but `config` is copied by reference. Changing the copy's `config.dark` modifies the original. I use `structuredClone()` to prevent this.\"",
      "summary10s": "Shallow copy shares nested references. Deep copy duplicates everything. Use `structuredClone()`."
    }
  },
  {
    "id": "js-generator-function",
    "category": "JavaScript",
    "question": "What is a generator function in javascript and when to use it?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "A Generator is a function that can pause its execution and be resumed later, created using `function*` and the `yield` keyword.",
      "explain": "Unlike normal functions that run to completion, a generator returns an Iterator. Each time you call `.next()`, it executes until it hits a `yield`, pauses, and spits out a value. They are excellent for lazy evaluation, infinite data sequences, or managing complex asynchronous flows (like Redux Saga).",
      "example": "\"I write `function* idMaker() { let id = 1; while(true) yield id++; }`. Calling it doesn't crash with an infinite loop. It just gives me an iterator. Every time I call `gen.next().value`, I get the next ID lazily.\"",
      "summary10s": "`function*` + `yield`. Pauses execution. Perfect for lazy evaluation or complex async flows."
    }
  },
  {
    "id": "js-this-keyword-strict",
    "category": "JavaScript",
    "question": "What is the \"this\" keyword? How does it behave in strict mode and non-strict mode?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "`this` refers to the object that is currently calling the function. In strict mode, a standalone function's `this` is `undefined`; in non-strict, it defaults to the global `window` object.",
      "explain": "The value of `this` is determined at runtime by how a function is called, not where it is defined (unless it's an arrow function). If called as a method (`obj.func()`), `this` is `obj`. If called as a standalone function (`func()`), non-strict mode dangerously defaults `this` to the global object, while strict mode safely sets it to `undefined` to prevent global pollution.",
      "example": "\"If I write a normal function and `console.log(this)`, in sloppy mode it logs the `Window`. But if I add `\"use strict\";` at the top, it logs `undefined`. That's why strict mode is essential to catch context bugs.\"",
      "summary10s": "`this` is the calling context. Standalone functions default to `window` (sloppy) or `undefined` (strict)."
    }
  },
  {
    "id": "js-create-copy-object",
    "category": "JavaScript",
    "question": "What are the different ways to create and copy an object?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Create: Object literals `{}`, `Object.create()`, or the `new` keyword. Copy: Spread operator `...`, `Object.assign()`, or `structuredClone()`.",
      "explain": "For creation, `{}` is the most common. `Object.create(proto)` is used for prototypal inheritance. For copying, `...` and `Object.assign()` provide shallow copies (nested objects share references). `JSON.parse(JSON.stringify())` or the modern `structuredClone()` provide deep copies.",
      "example": "\"To create, I almost always use `{ name: 'John' }`. To copy it quickly, I use `const copy = { ...obj }`. But if the object has deep nesting, like an API response, I strictly use `structuredClone(obj)` to avoid reference mutation bugs.\"",
      "summary10s": "Create: `{}`, `new Class()`, `Object.create()`. Copy: `...` (shallow), `structuredClone()` (deep)."
    }
  },
  {
    "id": "js-double-vs-triple-equals",
    "category": "JavaScript",
    "question": "Difference between \"==\" and \"===\"?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "`==` checks for value equality with type coercion. `===` checks for both value and type equality strictly.",
      "explain": "When using `==`, JavaScript attempts to convert the types before comparing (e.g., `1 == \"1\"` becomes `1 == 1`, returning true). When using `===`, no conversion happens, so `1 === \"1\"` is immediately false because a number is not a string. You should almost exclusively use `===`.",
      "example": "\"If I write `0 == false`, it's true because of JS coercion rules. If I write `0 === false`, it's false because a Number is not a Boolean. Using `===` prevents massive bugs in conditional logic.\"",
      "summary10s": "`==` allows type coercion. `===` enforces strict type checking. Always use `===`."
    }
  },
  {
    "id": "typescript-type-vs-interface",
    "category": "Angular",
    "question": "Difference between Type and interface in TypeScript?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Interfaces are specifically for shaping objects and support declaration merging. Types can shape objects, but also define primitives, unions, and tuples.",
      "explain": "An `interface` is best for defining class contracts and standard object shapes. A `type` alias is more versatile—you can define `type Status = \"Pending\" | \"Done\"`. Interfaces can be re-declared to add new fields (declaration merging), while types cannot be changed once declared.",
      "example": "\"I strictly use `interface` for my API Data Transfer Objects (DTOs). But if I need a complex union, like `type ID = string | number`, I must use `type`. For normal objects, they are almost identical in modern TypeScript.\"",
      "summary10s": "Interfaces can be merged and are object-only. Types handle unions, primitives, and tuples."
    }
  },
  {
    "id": "angular-rxjs-subjects",
    "category": "Angular",
    "question": "What is the difference between Subject, BehaviorSubject, ReplaySubject?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Subject has no memory. BehaviorSubject remembers the 1 latest value. ReplaySubject remembers a specified number of past values.",
      "explain": "A `Subject` acts as both an Observable and Observer, but late subscribers miss previous emissions. A `BehaviorSubject` requires an initial value and immediately emits its current value to any new subscriber. A `ReplaySubject` can buffer and emit the last N values to late subscribers.",
      "example": "\"I use `BehaviorSubject` for User Authentication state because it needs an initial state (`null`) and any component that loads late needs to instantly know the current user. I use a plain `Subject` for a UI event like a 'close modal' trigger where history doesn't matter.\"",
      "summary10s": "Subject = No memory. BehaviorSubject = 1 initial/latest value. ReplaySubject = N past values."
    }
  },
  {
    "id": "angular-observable-vs-promise",
    "category": "Angular",
    "question": "Why angular use Observable instead of Promise?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Observables handle multiple values over time, can be cancelled, and provide powerful operators (like map/filter). Promises handle a single value and cannot be cancelled.",
      "explain": "A Promise resolves once (e.g., a basic fetch). An Observable is a continuous stream. In Angular, this is critical. If a user types in a search box, you need to emit multiple events, apply `debounceTime`, and cancel (`switchMap`) previous pending HTTP requests if the user keeps typing. Promises cannot do this.",
      "example": "\"If I use a Promise for a typeahead search and the user types fast, the backend gets hit 10 times and the UI might render an out-of-order response. With an Observable, I can pipe `debounceTime(300)` and `switchMap()`, ensuring I only make 1 request and auto-cancel stale ones.\"",
      "summary10s": "Observables emit multiple values, are cancelable (crucial for HTTP), and offer RxJS operators."
    }
  },
  {
    "id": "spring-aop-proxy-bypass",
    "category": "Spring Boot",
    "question": "Why does @Transactional (or @Async, @Cacheable) sometimes not work when one method calls another method in the same class?",
    "frequency": 1,
    "companies": [],
    "variations": [
      "Why does @Async sometimes execute synchronously even though the annotation is present?",
      "Why doesn’t @Cacheable work when the cached method is called from the same class?"
    ],
    "answerSEE": {
      "simple": "Because of the Spring AOP Proxy bypass.",
      "explain": "Spring applies annotations like `@Transactional`, `@Async`, and `@Cacheable` by wrapping your class in a proxy. The proxy intercepts incoming calls from outside the class to start the transaction or async thread. However, if Method A calls Method B from *inside the same class*, it uses the `this` reference, completely bypassing the proxy. The annotations on Method B are ignored.",
      "example": "\"If my `UserService.register()` calls `this.sendEmail()`, and `sendEmail()` is marked `@Async`, it will execute synchronously. To fix this, I either move `sendEmail()` to a different `@Service`, or self-inject the `UserService` to route the call back through the proxy.\"",
      "summary10s": "Annotations rely on proxies. Internal `this.` calls bypass the proxy, ignoring the annotation."
    }
  },
  {
    "id": "spring-bean-direct-call",
    "category": "Spring Boot",
    "question": "What happens when a @Bean method is called directly from another @Bean method?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "If the class is annotated with `@Configuration`, Spring intercepts the call and returns the existing singleton instead of executing the method again.",
      "explain": "Spring uses CGLIB to proxy `@Configuration` classes. When one `@Bean` method calls another, the proxy intercepts the call. If the bean already exists in the ApplicationContext, Spring returns it. If the class is just marked `@Component` (lite mode), the method actually runs again, creating a new instance, which is usually a bug.",
      "example": "\"Inside my `@Configuration`, if `authService()` calls `userRepository()`, Spring ensures it doesn't create a second `UserRepository`. It intercepts the call and returns the singleton. But if I forget `@Configuration`, it will instantiate the repository twice.\"",
      "summary10s": "`@Configuration` classes are proxied. Internal method calls return the singleton instead of creating a new object."
    }
  },
  {
    "id": "spring-prototype-in-singleton",
    "category": "Spring Boot",
    "question": "Why can injecting a prototype bean into a singleton create unexpected behavior?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The prototype bean becomes a singleton because it is only injected once during the singleton's creation.",
      "explain": "A singleton bean is instantiated exactly once during startup. If it requires a prototype bean, Spring injects a new instance *at that moment*. However, because the singleton is never recreated, it holds onto that exact same prototype instance forever, defeating the purpose of the prototype scope.",
      "example": "\"If my singleton `OrderService` has a prototype `PaymentProcessor`, every order will use the exact same `PaymentProcessor` instance. To fix this, I use `@Lookup` method injection, or inject the `ApplicationContext` (or `ObjectProvider`) to request a fresh prototype on every method call.\"",
      "summary10s": "Singletons are created once. The injected prototype is cached inside it forever. Use `@Lookup`."
    }
  },
  {
    "id": "spring-circular-dependencies",
    "category": "Spring Boot",
    "question": "Why can circular dependencies work in some Spring applications but fail in others?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Spring Boot 2.6 disabled circular dependencies by default. It also depends on whether you use Constructor Injection or Field/Setter Injection.",
      "explain": "If Bean A needs Bean B, and B needs A via Constructor Injection, it is mathematically impossible to instantiate either, and it fails immediately. Field/Setter injection used to work because Spring creates the empty objects first, then wires them. However, since Boot 2.6, even setter circular dependencies are banned by default to enforce better architecture.",
      "example": "\"If I see a circular dependency error on boot, it means Service A and Service B are too tightly coupled. I fix it by moving the shared logic into a new Service C. If I absolutely must bypass it temporarily, I can use `@Lazy` on one of the dependencies.\"",
      "summary10s": "Constructor injection circular deps always fail. Boot 2.6+ bans all circular deps. Fix by decoupling or `@Lazy`."
    }
  },
  {
    "id": "spring-transactional-readonly",
    "category": "Spring Boot",
    "question": "Why does @Transactional(readOnly = true) not necessarily prevent database writes?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "It sets the Hibernate FlushMode to MANUAL, but native SQL updates can still execute.",
      "explain": "`readOnly = true` is a hint. It tells Hibernate not to track entity changes (dirty checking), which saves massive CPU and memory. It also sets the JDBC connection to read-only *if the driver supports it*. However, if you execute a native `@Query(\"UPDATE...\")`, the database might still execute it depending on the JDBC driver implementation.",
      "example": "\"I always put `@Transactional(readOnly = true)` on `GET` methods. It stops Hibernate from doing dirty checking, boosting performance. But I know it won't magically stop a hardcoded JDBC `UPDATE` statement from firing unless the DB driver strictly enforces it.\"",
      "summary10s": "It optimizes performance by disabling Hibernate dirty checking, but native queries might still write."
    }
  },
  {
    "id": "spring-transactional-catch",
    "category": "Spring Boot",
    "question": "What happens if an exception is caught inside a @Transactional method?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "The transaction will COMMIT, not rollback.",
      "explain": "The Spring AOP Proxy wraps the method. It only triggers a rollback if the exception *escapes* the method and is caught by the proxy. If you wrap your code in a `try-catch` block inside the method and swallow the exception, the proxy thinks the method succeeded and commits the transaction.",
      "example": "\"If I write `try { saveUser(); } catch(Exception e) { log(e); }` inside a `@Transactional` method, and `saveUser` fails, the transaction still commits. To fix it, I must either rethrow a RuntimeException, or manually mark `TransactionAspectSupport.currentTransactionStatus().setRollbackOnly()`.\"",
      "summary10s": "If the exception doesn't escape the method, the proxy doesn't see it, and it commits."
    }
  },
  {
    "id": "spring-no-unique-bean",
    "category": "Spring Boot",
    "question": "What happens if two beans implement the same interface and neither has @Primary?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Spring throws a `NoUniqueBeanDefinitionException` during startup.",
      "explain": "When you `@Autowired` an interface, Spring looks for a concrete implementation in the ApplicationContext. If it finds exactly one, it injects it. If it finds two (e.g., `StripePayment` and `PaypalPayment`), it doesn't know which to pick. It crashes immediately unless you specify `@Qualifier` or `@Primary`.",
      "example": "\"If I inject `PaymentService`, and have two implementations, Spring crashes. I fix it by adding `@Qualifier(\"stripe\")` on the injection point, or by naming the variable `stripePaymentService` (Spring uses the variable name as a fallback qualifier).\"",
      "summary10s": "Throws `NoUniqueBeanDefinitionException`. Fix with `@Primary` or `@Qualifier`."
    }
  },
  {
    "id": "spring-multiple-datasources",
    "category": "Spring Boot",
    "question": "What happens when a Spring Boot application has multiple DataSource beans?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Auto-configuration backs off, and you must manually configure transaction managers and entity managers for both.",
      "explain": "Spring Boot's auto-configuration perfectly handles a single database. If you define a second `DataSource`, Spring doesn't know which one JPA should use. You must define a `@Primary` DataSource, and explicitly configure `LocalContainerEntityManagerFactoryBean` and `PlatformTransactionManager` for both databases, wiring them to specific packages.",
      "example": "\"When I added a read-replica database, I had to create a `PrimaryDBConfig` and a `ReplicaDBConfig`. I had to manually tell Hibernate which packages mapped to which DataSource, and mark the primary transaction manager with `@Primary` to prevent `NoUniqueBeanDefinitionException`.\"",
      "summary10s": "Auto-configuration breaks. You must manually define EntityManagers and mark one as `@Primary`."
    }
  },
  {
    "id": "spring-inject-interface",
    "category": "Spring Boot",
    "question": "What is actually happening when Spring injects an interface instead of the concrete implementation?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Spring injects a Proxy object that wraps the concrete implementation.",
      "explain": "Spring relies on proxies for features like Transactions, Security, and Caching. If your bean implements an interface, Spring creates a JDK Dynamic Proxy. If it doesn't, it creates a CGLIB proxy (subclass). When you inject the interface, you are receiving the proxy, not the raw object.",
      "example": "\"When I `@Autowired` my `UserService` interface, the object I get at runtime is actually a `Proxy$12`. When I call `.save()`, the proxy intercepts it, starts a transaction, calls the real `UserServiceImpl.save()`, and then commits the transaction.\"",
      "summary10s": "You get a JDK Dynamic Proxy. The proxy handles AOP logic (transactions/security) before calling the real object."
    }
  },
  {
    "id": "spring-depends-on",
    "category": "Spring Boot",
    "question": "Why can changing bean initialization order fix an issue without changing any business logic?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "Because some beans rely on implicit side effects (like static caches or database setups) created by other beans.",
      "explain": "If Bean A relies on a static variable populated by Bean B, Bean B MUST be initialized first. Since Spring initializes beans in an unpredictable order (unless explicitly wired), A might initialize before B and fail. You use `@DependsOn(\"beanB\")` on Bean A to force the correct order without directly injecting B.",
      "example": "\"My caching service crashed randomly on startup because it tried to read a static config loaded by the Database config. Since they weren't directly autowired, Spring loaded them randomly. Adding `@DependsOn(\"dbConfig\")` to the cache service fixed it permanently.\"",
      "summary10s": "Implicit side-effects cause startup race conditions. Fix using `@DependsOn`."
    }
  },
  {
    "id": "spring-requestbody-validation",
    "category": "Spring Boot",
    "question": "Why can @RequestBody validation work for one endpoint but appear to fail for another?",
    "frequency": 1,
    "companies": [],
    "variations": [],
    "answerSEE": {
      "simple": "You likely forgot the `@Valid` or `@Validated` annotation on the parameter, or you are nesting objects without `@Valid`.",
      "explain": "Just putting `@NotNull` inside your DTO doesn't trigger validation. You MUST put `@Valid` on the `@RequestBody` parameter in the controller. Furthermore, if your DTO contains another custom object (like `Address`), you must put `@Valid` on the `Address` field inside the DTO, otherwise nested validation is completely ignored.",
      "example": "\"My `CreateUser` endpoint worked, but my `UpdateUser` endpoint allowed null emails. I realized I forgot to prefix `@RequestBody UserDto dto` with `@Valid`. Also, the `dto.Address` fields weren't validating because I forgot `@Valid` on the `address` field inside the DTO.\"",
      "summary10s": "Must explicitly trigger it with `@Valid` on the controller parameter AND on any nested nested objects."
    }
  }
];

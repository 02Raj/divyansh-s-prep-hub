import { InterviewTopic } from './types';

export const javaTopics: InterviewTopic[] = [
  {
    id: 'java-oop-core',
    name: 'Object-Oriented Programming (OOP) Core',
    category: 'Java',
    difficulty: 'easy',
    description: 'OOPs organizes code into reusable objects and classes. It forms the foundation of Java through its four core pillars, providing maintainability and security.',
    bulletPoints: [
      'Encapsulation: Hides internal state, bundles data and methods together (e.g., private fields with getters/setters)',
      'Abstraction: Hides complex implementation details, showing only essential features (e.g., abstract classes, interfaces)',
      'Inheritance: Acquiring properties of a parent class to promote reusability (IS-A relationship)',
      'Polymorphism: One interface, multiple forms (Compile-time via Overloading, Runtime via Overriding)',
      'Composition (HAS-A) is often preferred over Inheritance (IS-A) as it provides better flexibility and loose coupling'
    ],
    codeExample: `// Encapsulation
class BankAccount {
    private double balance; // hidden state
    public void deposit(double amount) { this.balance += amount; }
}

// Inheritance & Polymorphism
abstract class Animal { abstract void sound(); } // Abstraction
class Dog extends Animal {
    @Override
    void sound() { System.out.println("Bark!"); } // Polymorphism
}`
  },
  {
    id: 'java-constructors',
    name: 'Constructors & Object Initialization',
    category: 'Java',
    difficulty: 'medium',
    description: 'Constructors initialize objects upon creation. They cannot be static, final, or abstract, and they have strict rules regarding chaining and Singleton design.',
    bulletPoints: [
      'Constructors must have the exact same name as the class and no return type',
      'If you do not define any constructor, Java provides a Default Constructor',
      'this() calls another constructor in the same class, super() calls the parent constructor (must be the first line)',
      'Constructors cannot be static (belong to objects, not classes) or final (cannot be overridden anyway)',
      'A Private Constructor prevents external instantiation, which is the core concept behind the Singleton Design Pattern',
      'Constructor Injection is preferred over Setter Injection because it guarantees the object is always in a valid state'
    ],
    codeExample: `public class DatabaseConnection {
    // 1. Singleton instance
    private static final DatabaseConnection INSTANCE = new DatabaseConnection();

    // 2. Private constructor prevents 'new DatabaseConnection()'
    private DatabaseConnection() {
        System.out.println("Initialized once.");
    }

    // 3. Global access point
    public static DatabaseConnection getInstance() {
        return INSTANCE;
    }
}`
  },
  {
    id: 'java-polymorphism',
    name: 'Polymorphism (Static vs Dynamic)',
    category: 'Java',
    difficulty: 'medium',
    description: 'Polymorphism allows methods to behave differently based on the object calling them. It occurs at both compile-time (Overloading) and runtime (Overriding).',
    bulletPoints: [
      'Method Overloading (Compile-Time): Same method name, different parameters in the same class',
      'Method Overriding (Runtime): Same method signature, inherited from a parent class, resolved dynamically based on the actual object type',
      'Runtime Polymorphism relies entirely on Overriding and Upcasting (Parent ref = new Child())',
      'Static methods can be overloaded but CANNOT be overridden (they are resolved at compile-time via Method Hiding)',
      'Constructors can be overloaded but CANNOT be overridden (they are not inherited)'
    ],
    codeExample: `class Calculator {
    // Overloading (Compile-Time)
    int add(int a, int b) { return a + b; }
    int add(int a, int b, int c) { return a + b + c; }
}

class Animal { void speak() { System.out.println("..."); } }
class Cat extends Animal { 
    @Override // Overriding (Runtime)
    void speak() { System.out.println("Meow"); } 
}

// Runtime Polymorphism in action
Animal myPet = new Cat(); 
myPet.speak(); // Output: Meow (determined at runtime)`
  },
  {
    id: 'java-abstraction',
    name: 'Abstraction (Abstract Classes & Interfaces)',
    category: 'Java',
    difficulty: 'medium',
    description: 'Abstraction hides implementation details. Java achieves this through Abstract Classes (partial abstraction) and Interfaces (contracts).',
    bulletPoints: [
      'Interface: Defines a strict contract (WHAT to do). Supports multiple inheritance. All methods are implicitly public abstract (before Java 8)',
      'Abstract Class: Defines partial implementation (WHAT + HOW). Can have state (fields) and constructors. Does not support multiple inheritance',
      'Even though you cannot instantiate an Abstract Class, it has a constructor to initialize state for its child classes',
      'Marker Interface: An empty interface (e.g., Serializable, Cloneable) used to tag a class for special JVM treatment',
      'Functional Interface: An interface with exactly ONE abstract method, heavily used with Lambda Expressions (e.g., Runnable)'
    ],
    codeExample: `// Functional Interface
@FunctionalInterface
interface PaymentGateway {
    void processPayment(double amount);
}

// Abstract Class
abstract class Vehicle {
    String type;
    Vehicle(String type) { this.type = type; } // Constructor for child classes
    abstract void start(); 
}

class Car extends Vehicle {
    Car() { super("4-Wheeler"); }
    @Override void start() { System.out.println("Vroom!"); }
}`
  },
  {
    id: 'java-strings',
    name: 'Strings & Memory Pool',
    category: 'Java',
    difficulty: 'medium',
    description: 'Strings are immutable objects in Java. Understanding how they are stored in the String Pool versus the Heap is critical for memory optimization.',
    bulletPoints: [
      'String Immutability: Once created, a String cannot be changed. This provides security, thread-safety, and allows caching',
      'String Pool: A special heap area. Literals (String s = "Hello") go here to reuse memory',
      'new String("Hello"): Bypasses the pool and forces creation of a brand new object in the general Heap',
      'String is immutable and slow for modifications (creates new objects). Use StringBuffer or StringBuilder for frequent changes',
      'StringBuffer: Mutable, Thread-Safe (synchronized methods), slower',
      'StringBuilder: Mutable, NOT Thread-Safe, much faster (best for single-threaded loops)'
    ],
    codeExample: `// String Pool vs Heap
String s1 = "Java";          // Goes to String Pool
String s2 = "Java";          // Reuses object from Pool
String s3 = new String("Java"); // Forces new object in Heap

System.out.println(s1 == s2);      // true (same reference)
System.out.println(s1 == s3);      // false (different reference)
System.out.println(s1.equals(s3)); // true (same content)

// Modifying efficiently
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World"); // Modifies in-place, no new objects`
  },
  {
    id: 'java-immutability',
    name: 'Object Copying & Immutability',
    category: 'Java',
    difficulty: 'medium',
    description: 'Immutability ensures an object state cannot change after creation. Understanding how references are copied (Shallow vs Deep) prevents nasty bugs.',
    bulletPoints: [
      'Shallow Copy: Copies only the top-level references. Nested objects point to the same memory. Changing one affects both',
      'Deep Copy: Creates completely new instances of all nested objects. 100% independent objects',
      'Immutability: An object that cannot be modified (e.g., String, Integer). Thread-safe by default without synchronization',
      'To make a class immutable: Mark class as final, make fields private and final, do not provide setters, and use deep copying for mutable fields in constructors/getters'
    ],
    codeExample: `// How to create an Immutable Class
public final class ImmutableStudent {
    private final int id;
    private final String name;
    
    public ImmutableStudent(int id, String name) {
        this.id = id;
        this.name = name; // String is already immutable, so direct assignment is safe
    }
    
    public int getId() { return id; }
    public String getName() { return name; }
    // No setters allowed!
}`
  },
  {
    id: 'java-exceptions',
    name: 'Exception Handling Deep Dive',
    category: 'Java',
    difficulty: 'medium',
    description: 'Exceptions disrupt normal program flow. Java forces handling of critical issues (Checked) while allowing runtime bugs (Unchecked) to crash gracefully.',
    bulletPoints: [
      'Hierarchy: Throwable is the root -> Error (System crashes) and Exception (Recoverable)',
      'Checked Exceptions (Compile-time): Must be caught or declared via "throws" (e.g., IOException, SQLException)',
      'Unchecked Exceptions (Runtime): Extend RuntimeException. Caused by bad logic (e.g., NullPointerException)',
      'throw: Used to manually trigger an exception. throws: Used in method signature to declare it',
      'finally: Block that ALWAYS runs (used to close DB/File connections), even if exceptions occur or "return" is called',
      'final vs finally vs finalize: final (constant), finally (exception cleanup), finalize (Garbage Collection callback)'
    ],
    codeExample: `// Custom Exception
class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) { super(message); }
}

public void findUser(String id) {
    // Try-with-resources (Auto-closes readers)
    try (BufferedReader br = new BufferedReader(new FileReader("users.txt"))) {
        if (id == null) throw new UserNotFoundException("Invalid ID");
    } catch (IOException e) {
        System.out.println("Checked exception caught: " + e.getMessage());
    } finally {
        System.out.println("This executes no matter what!");
    }
}`
  },
  {
    id: 'java-collections',
    name: 'Java Collections Framework',
    category: 'Java',
    difficulty: 'medium',
    description: 'A unified architecture for storing and manipulating groups of data efficiently using Lists, Sets, Maps, and Queues.',
    bulletPoints: [
      'List (Ordered, allows duplicates): ArrayList (Fast read, slow insert), LinkedList (Fast insert/delete, slow read)',
      'Set (Unordered, NO duplicates): HashSet (Fastest, no order), TreeSet (Sorted order), LinkedHashSet (Insertion order)',
      'Map (Key-Value pairs, unique keys): HashMap (Fastest, no order), TreeMap (Sorted by keys), ConcurrentHashMap (Thread-safe)',
      'Queue (FIFO): PriorityQueue (Sorted elements), LinkedList (Basic queue)',
      'Use equals() and hashCode() properly when putting custom objects into a HashSet or HashMap'
    ],
    codeExample: `// List operations
List<String> list = new ArrayList<>();
list.add("Java");

// Set (Automatic deduplication)
Set<Integer> uniqueIds = new HashSet<>(Arrays.asList(1, 1, 2, 3));
System.out.println(uniqueIds.size()); // 3

// Map (Key-Value)
Map<String, String> capitals = new HashMap<>();
capitals.put("India", "New Delhi");
capitals.put("Japan", "Tokyo");

for (Map.Entry<String, String> entry : capitals.entrySet()) {
    System.out.println(entry.getKey() + " -> " + entry.getValue());
}`
  },
  {
    id: 'java-streams',
    name: 'Java 8 Streams & Functional Interfaces',
    category: 'Java',
    difficulty: 'hard',
    description: 'Streams provide a declarative way to process collections of data. They use functional interfaces like Predicate, Function, and Consumer.',
    bulletPoints: [
      'Streams do NOT store data or modify the original collection. They process data through a pipeline',
      'Intermediate Operations (Lazy): filter(), map(), sorted(). They do not execute until a terminal operation is called',
      'Terminal Operations (Eager): collect(), forEach(), reduce(), count(). Calling this triggers the entire pipeline execution',
      'Predicate<T>: Takes input, returns boolean (used in filter)',
      'Function<T, R>: Takes input, returns a transformed output (used in map)',
      'Consumer<T>: Takes input, returns nothing (used in forEach)'
    ],
    codeExample: `List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");

// Stream Pipeline: Filter -> Map -> Collect
List<String> result = names.stream()
    .filter(name -> name.length() > 3)        // Predicate (Intermediate)
    .map(String::toUpperCase)                 // Function (Intermediate)
    .sorted()                                 // Intermediate
    .collect(Collectors.toList());            // Terminal

System.out.println(result); // [ALICE, CHARLIE, DAVID]

// Reduce example (sum numbers)
int sum = Stream.of(1, 2, 3, 4, 5)
    .reduce(0, (a, b) -> a + b); // 15`
  },
  {
    id: 'java-threads-basics',
    name: 'Multithreading & Concurrency Basics',
    category: 'Java',
    difficulty: 'hard',
    description: 'Multithreading allows multiple parts of a program to execute concurrently, utilizing multi-core processors efficiently.',
    bulletPoints: [
      'A Thread is a lightweight unit of execution. Java creates threads via the Thread class or Runnable interface',
      'Runnable is highly preferred because it implements an interface (allowing your class to extend another class) and separates the task from the thread object',
      'Thread Lifecycle: New -> Runnable -> Running -> Blocked/Waiting -> Terminated',
      'Race Conditions occur when two threads modify shared data simultaneously, leading to unpredictable results',
      'Synchronization (synchronized keyword) locks an object/method so only one thread can access it at a time, preventing race conditions'
    ],
    codeExample: `// 1. Implementing Runnable (Preferred approach)
Runnable task = () -> {
    for(int i=0; i<3; i++) {
        System.out.println(Thread.currentThread().getName() + " running");
    }
};

// 2. Starting threads
Thread t1 = new Thread(task, "Worker-1");
Thread t2 = new Thread(task, "Worker-2");

t1.start();
t2.start();

// Synchronization example to prevent race conditions
class Counter {
    private int count = 0;
    // Only one thread can enter this method at a time
    public synchronized void increment() { count++; }
}`
  },
  {
    id: 'java-advanced-concurrency',
    name: 'Advanced Concurrency & Thread Safety',
    category: 'Java',
    difficulty: 'hard',
    description: 'Modern Java applications rarely manage raw Threads. They use Thread Pools and concurrent utilities from java.util.concurrent for safety and scale.',
    bulletPoints: [
      'ExecutorService: Manages a Thread Pool. Reuses threads instead of spinning up new ones, saving immense CPU overhead',
      'CompletableFuture: Allows for non-blocking, asynchronous programming with powerful chaining (.thenApply, .thenAccept)',
      'Volatile Keyword: Ensures a variable is always read directly from main memory, not from a thread local CPU cache (Visibility guarantee, but not Atomic)',
      'Atomic Classes (e.g., AtomicInteger): Use CAS (Compare-And-Swap) under the hood to perform thread-safe math operations without locking (much faster than synchronized)',
      'ConcurrentHashMap: A highly optimized thread-safe map that locks only specific segments (buckets), not the entire map'
    ],
    codeExample: `// 1. ExecutorService (Thread Pool)
ExecutorService executor = Executors.newFixedThreadPool(2);
executor.submit(() -> System.out.println("Task executed efficiently"));
executor.shutdown();

// 2. Atomic Variables (Thread-safe without locks)
AtomicInteger safeCounter = new AtomicInteger(0);
safeCounter.incrementAndGet();

// 3. CompletableFuture (Async non-blocking)
CompletableFuture.supplyAsync(() -> {
    return "Fetched Data"; // Runs in background thread
}).thenApply(data -> {
    return data.toUpperCase();
}).thenAccept(result -> {
    System.out.println("Result: " + result);
});`
  },
  {
    id: 'java-garbage-collection',
    name: 'Garbage Collection & Memory',
    category: 'Java',
    difficulty: 'hard',
    description: 'Java manages memory automatically via the Garbage Collector (GC), freeing developers from manual memory deallocation. Understanding the Heap, Stack, and GC algorithms is crucial for performance tuning.',
    bulletPoints: [
      'Stack Memory: Stores local variables and method call frames. Fast, thread-safe, and self-clearing when a method ends',
      'Heap Memory: Stores all Objects. Shared across all threads. This is where Garbage Collection happens',
      'GC Process: Identifies unreferenced objects (Mark phase) and deletes them (Sweep phase) to free memory',
      'Metaspace (Replaced PermGen in Java 8): Stores class metadata. It grows dynamically using native memory',
      'Popular GC Algorithms: G1GC (default in Java 9+, balances throughput and pause times), ZGC (ultra-low latency)'
    ],
    codeExample: `public class MemoryExample {
    public static void main(String[] args) {
        int primitive = 10; // Stored in Stack Memory

        // 'user' reference is in Stack, but the actual Object is in Heap Memory
        User user = new User("Alice"); 
        
        user = null; // The object in Heap is now eligible for Garbage Collection
        
        // Suggest JVM to run GC (Not guaranteed to run instantly)
        System.gc(); 
    }
}`
  },
  {
    id: 'java-8-features',
    name: 'Java 8+ Modern Features',
    category: 'Java',
    difficulty: 'medium',
    description: 'Java 8 revolutionized the language by introducing functional programming concepts, making code cleaner and more expressive.',
    bulletPoints: [
      'Lambda Expressions: Short-hand syntax for implementing Functional Interfaces (reduces boilerplate code)',
      'Method References (::): A cleaner way to call a method using its name instead of a full lambda (e.g., System.out::println)',
      'Optional<T>: A container object that may or may not contain a non-null value. Prevents NullPointerException',
      'Default/Static Methods in Interfaces: Interfaces can now have method bodies without breaking implementing classes',
      'Streams API: Functional-style operations (map, filter, reduce) on collections'
    ],
    codeExample: `// 1. Optional (Avoiding NullPointerException)
Optional<String> optionalName = Optional.ofNullable(getName());
optionalName.ifPresent(name -> System.out.println("Hello " + name));

// 2. Default method in Interface
interface Vehicle {
    default void honk() { System.out.println("Beep beep!"); }
}

// 3. Lambda & Method Reference
List<String> list = Arrays.asList("A", "B", "C");
list.forEach(item -> System.out.println(item)); // Lambda
list.forEach(System.out::println);              // Method Reference`
  },
  {
    id: 'java-generics',
    name: 'Generics & Type Erasure',
    category: 'Java',
    difficulty: 'hard',
    description: 'Generics provide compile-time type safety and eliminate the need for casting. However, Java handles them uniquely at runtime using Type Erasure.',
    bulletPoints: [
      'Generics (<T>): Allow classes, interfaces, and methods to operate on specified types, catching errors at compile-time',
      'Type Erasure: To maintain backward compatibility, Java removes (erases) all generic type information at runtime. List<String> simply becomes List',
      'Because of Type Erasure, you cannot use primitive types (like int) with Generics; you must use wrapper classes (Integer)',
      'Wildcards: <?> (Unbounded - any type), <? extends Number> (Upper Bound - Number or its subclasses), <? super Integer> (Lower Bound - Integer or its superclasses)'
    ],
    codeExample: `// Generic Class Example
class Box<T> {
    private T item;
    public void set(T item) { this.item = item; }
    public T get() { return this.item; }
}

public class Main {
    public static void main(String[] args) {
        Box<String> stringBox = new Box<>();
        stringBox.set("Hello"); // Compile-time type safety

        // Wildcard Example: Accepts a List of Numbers (Integer, Double, etc.)
        List<? extends Number> numbers = Arrays.asList(1, 2.5, 3);
    }
}`
  },
  {
    id: 'java-design-patterns',
    name: 'Core Design Patterns in Java',
    category: 'Java',
    difficulty: 'hard',
    description: 'Design patterns are proven solutions to common software design problems. Knowing the most common ones is critical for senior roles.',
    bulletPoints: [
      'Singleton Pattern: Ensures a class has only one instance and provides a global point of access (e.g., Database Connection)',
      'Factory Pattern: Hides the creation logic of objects. The client asks the Factory for an object using a common interface',
      'Builder Pattern: Best for constructing complex objects step-by-step instead of using a constructor with 10 parameters',
      'Observer Pattern: A publish-subscribe model. When the subject\'s state changes, all registered observers are notified automatically'
    ],
    codeExample: `// Builder Pattern Example
class User {
    private String name;
    private int age;

    private User(Builder builder) {
        this.name = builder.name;
        this.age = builder.age;
    }

    public static class Builder {
        private String name;
        private int age;
        
        public Builder setName(String name) { this.name = name; return this; }
        public Builder setAge(int age) { this.age = age; return this; }
        
        public User build() { return new User(this); }
    }
}

// Usage
User user = new User.Builder().setName("Bob").setAge(30).build();`
  }
];

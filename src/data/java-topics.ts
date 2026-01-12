import { InterviewTopic } from './types';

export const javaTopics: InterviewTopic[] = [

    // Java Foundations (OOP Core)
  {
    id: 'java-oop',
    name: 'OOP Principles',
    category: 'Java',
    difficulty: 'easy',
    description: 'Object-Oriented Programming in Java is based on four main principles: Encapsulation, Inheritance, Polymorphism, and Abstraction. These form the foundation of Java programming.',
    bulletPoints: [
      'Encapsulation: Bundling data and methods, hiding internal state',
      'Inheritance: Creating new classes from existing ones',
      'Polymorphism: Same interface, different implementations',
      'Abstraction: Hiding complexity, showing only essentials'
    ],
    codeExample: `// Encapsulation
public class BankAccount {
    private double balance;
    
    public double getBalance() { return balance; }
    public void deposit(double amount) { balance += amount; }
}

// Inheritance & Polymorphism
abstract class Animal {
    abstract void makeSound();
}

class Dog extends Animal {
    @Override
    void makeSound() { System.out.println("Bark!"); }
}`
  },
     {
    id: 'java-oops-basics',
    name: 'OOPs Basics',
    category: 'Java',
    difficulty: 'easy',
    description:
      'OOPs (Object-Oriented Programming System) is a way of writing programs using objects. It organizes code into classes and objects, making it reusable, secure, and easier to manage.',
    bulletPoints: [
      'OOPs is based on objects and classes',
      'Helps in writing clean, structured, and modular code',
      'Makes applications easy to understand and manage',
      'Widely used in real-world software development'
    ],
    codeExample: `// Simple class and object example
class Car {
    String model;

    void drive() {
        System.out.println("Car is driving");
    }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car();
        car.model = "BMW";
        car.drive();
    }
}`
  },

  {
    id: 'java-why-oops-important',
    name: 'Why OOPs is Important',
    category: 'Java',
    difficulty: 'easy',
    description:
      'OOPs is important because it makes code more organized, reusable, secure, and easier to maintain. It uses real-world concepts like objects and classes, so programs become more logical and scalable.',
    bulletPoints: [
      'Reusability – Code once written can be reused (Inheritance)',
      'Maintainability – Easy to update and modify (Encapsulation)',
      'Security – Data hiding using Abstraction and Encapsulation',
      'Scalability – Large projects divided into small modules',
      'Real-world modeling – Objects represent real entities'
    ],
    codeExample: `// Reusability using inheritance
class Vehicle {
    void start() {
        System.out.println("Vehicle started");
    }
}

class Bike extends Vehicle {
    void ride() {
        System.out.println("Bike is riding");
    }
}`
  },

  {
    id: 'java-oops-four-pillars',
    name: 'Four Pillars of OOPs',
    category: 'Java',
    difficulty: 'easy',
    description:
      'The four pillars of OOPs are Encapsulation, Abstraction, Inheritance, and Polymorphism. Together, they make code reusable, secure, and easy to maintain.',
    bulletPoints: [
      'Encapsulation – Binding data and methods together in a class',
      'Abstraction – Hiding internal details and showing only essentials',
      'Inheritance – One class acquiring properties of another',
      'Polymorphism – One method behaving differently in different classes'
    ],
    codeExample: `// Encapsulation
class BankAccount {
    private double balance;

    public void deposit(double amount) {
        balance += amount;
    }

    public double getBalance() {
        return balance;
    }
}

// Abstraction
abstract class ATM {
    abstract void withdraw();
}

// Inheritance & Polymorphism
class MyATM extends ATM {
    @Override
    void withdraw() {
        System.out.println("Cash withdrawn");
    }
}`
  },

// Classes, Objects, Constructors , Memory Management
  {
  id: 'java-object-vs-class',
  name: 'Object Class vs Class Class in Java',
  category: 'Java',
  difficulty: 'easy',
  description:
    'In Java, Object is the root parent of all classes, while Class is used to get metadata and information about a class at runtime.',
  bulletPoints: [
    'Object is the topmost parent class in Java',
    'Every Java class implicitly extends Object',
    'Object provides common methods like toString(), equals(), hashCode(), getClass()',
    'Class represents metadata of a class at runtime',
    'Class is heavily used in Reflection API',
    'Frameworks like Spring and Hibernate rely on Class for dynamic behavior'
  ],
  codeExample: `// Object class example
class User {}

public class TestObject {
    public static void main(String[] args) {
        User u = new User();

        System.out.println(u.toString());   // from Object class
        System.out.println(u.getClass());   // returns Class object
    }
}

// Class class example
class TestClass {
    public static void main(String[] args) {
        Class<?> c = User.class;

        System.out.println(c.getName());    // class name
    }
}`
},

  {
    id: 'java-private-constructor',
    name: 'Private Constructor & Singleton',
    category: 'Java',
    difficulty: 'medium',
    description:
      'A constructor is made private when we want to restrict object creation from outside the class. It is mainly used in the Singleton design pattern.',
    bulletPoints: [
      'Stops other classes from creating objects',
      'Used to control instance creation',
      'Commonly used in Singleton pattern',
      'Ensures only one object exists'
    ],
    codeExample: `// Singleton example
public class Singleton {

    private static final Singleton instance = new Singleton();

    private Singleton() {
        // private constructor
    }

    public static Singleton getInstance() {
        return instance;
    }
}`
  },
   {
    id: 'java-constructors-basics',
    name: 'Java Constructors (2-Minute Interview Brief)',
    category: 'Java',
    difficulty: 'easy',
    description:
      'Constructors in Java are special methods used to initialize objects when they are created. They ensure that objects are created in a valid and usable state.',
    bulletPoints: [
      'Constructor name must be same as class name',
      'No return type is allowed (not even void)',
      'Automatically called when object is created using new',
      'If no constructor is defined, Java provides a default constructor',
      'If any constructor is defined, default constructor is NOT provided',
      'Supports constructor overloading',
      'this() calls another constructor in same class',
      'super() calls parent class constructor',
      'this() or super() must be the first line'
    ],
    codeExample: `// Default & Parameterized Constructor
class Employee {
    int id;
    String name;

    Employee() {
        System.out.println("Default constructor");
    }

    Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }
}`
  },
    {
    id: 'java-constructor-recursion',
    name: 'Constructor Calling Itself',
    category: 'Java',
    difficulty: 'easy',
    description:
      'Java does not allow a constructor to call itself directly or indirectly because it leads to infinite recursion.',
    bulletPoints: [
      'this() can call another constructor',
      'Constructor call chain must not form a loop',
      'Recursive constructor calls cause compile-time error'
    ],
    codeExample: `class Test {
    Test() {
        // this(); ❌ Not allowed (infinite recursion)
    }
}`
  },
  {
    id: 'java-constructor-keyword-rules',
    name: 'Why Constructor Cannot Be final, static, or abstract',
    category: 'Java',
    difficulty: 'easy',
    description:
      'A constructor cannot be final, static, or abstract because it must create objects, must have implementation, and is never inherited.',
    bulletPoints: [
      'final: constructors are never overridden, so final has no meaning',
      'static: constructors work with objects, static belongs to class',
      'abstract: constructors must have a body to initialize objects',
      'Abstract classes can have constructors, but constructors cannot be abstract'
    ],
    codeExample: `// Valid: abstract class with constructor
abstract class Shape {
    Shape() {
        System.out.println("Shape created");
    }
}`
  },
  {
    id: 'java-singleton-how-created',
    name: 'How Singleton Works with Private Constructor',
    category: 'Java',
    difficulty: 'easy',
    description:
      'Even with a private constructor, a Singleton object is created inside the class itself and returned using a public static method.',
    bulletPoints: [
      'Constructor is private, so no external object creation',
      'Class creates its own single instance',
      'Static method returns the same instance every time',
      'Ensures one global access point'
    ],
    codeExample: `Singleton obj1 = Singleton.getInstance();
Singleton obj2 = Singleton.getInstance();

// obj1 and obj2 point to same object`
  },
 {
    id: 'java-constructor-vs-setter-injection',
    name: 'Constructor vs Setter Injection',
    category: 'Java',
    difficulty: 'medium',
    description:
      'Constructor injection and setter injection are two ways to provide dependencies to a class.',
    bulletPoints: [
      'Constructor Injection: mandatory dependency, safer',
      'Ensures object is always in valid state',
      'Good for immutability',
      'Setter Injection: optional dependency',
      'More flexible but less safe for required dependencies'
    ],
    codeExample: `// Constructor Injection
class Service {
    private final Repository repo;

    Service(Repository repo) {
        this.repo = repo;
    }
}

// Setter Injection
class Service2 {
    private Repository repo;

    void setRepo(Repository repo) {
        this.repo = repo;
    }
}`
  },
{
  id: 'java-shallow-copy',
  name: 'Shallow Copy in Java',
  category: 'Java',
  difficulty: 'easy',
  description:
    'A shallow copy copies only the object reference, not the actual nested objects. Both objects point to the same memory location.',
  bulletPoints: [
    'Only top-level object reference is copied',
    'Nested objects are shared',
    'Changes in nested data affect both objects',
    'Very fast but unsafe for mutable objects',
    'Default assignment creates shallow copy'
  ],
  codeExample: `class Person {
    String name;
}

Person p1 = new Person();
p1.name = "Alex";

// Shallow copy (reference copy)
Person p2 = p1;

p2.name = "John";

System.out.println(p1.name); // John (changed for both)`
},
{
  id: 'java-deep-copy',
  name: 'Deep Copy in Java',
  category: 'Java',
  difficulty: 'medium',
  description:
    'A deep copy creates a completely new object along with copies of all nested objects, making both objects independent.',
  bulletPoints: [
    'Copies top-level object and nested objects',
    'Objects are fully independent',
    'Changes do not affect the original object',
    'Safer for mutable objects',
    'Slightly slower than shallow copy'
  ],
  codeExample: `class Person {
    String name;

    Person(String name) {
        this.name = name;
    }

    // Deep copy method
    Person deepCopy() {
        return new Person(new String(this.name));
    }
}

Person p1 = new Person("Alex");
Person p2 = p1.deepCopy();

p2.name = "John";

System.out.println(p1.name); // Alex (unchanged)`
},
{
  id: 'java-immutability-basics',
  name: 'Immutability in Java',
  category: 'Java',
  difficulty: 'medium',
  description:
    'An immutable class is a class whose object state cannot be changed after it is created. Once initialized, its fields remain constant.',
  bulletPoints: [
    'Object state cannot be changed after creation',
    'Thread-safe by default',
    'Safe to share between threads',
    'Prevents accidental or unintended changes',
    'Common example: String class'
  ],
  codeExample: `String s = "Hello";
s.concat(" World");
System.out.println(s); // Hello (unchanged)`
},
{
  id: 'java-immutability-why',
  name: 'Why Use Immutability',
  category: 'Java',
  difficulty: 'easy',
  description:
    'Immutability is used to create safer, thread-safe, and predictable objects.',
  bulletPoints: [
    'Thread-safe without synchronization',
    'Easy to reason about program behavior',
    'No side effects from shared references',
    'Improves security and reliability',
    'Used heavily in concurrent programming'
  ],
  codeExample: `// Immutable objects can be shared safely
String a = "Java";
String b = a; // safe sharing`
},
{
  id: 'java-how-to-make-immutable',
  name: 'How to Make a Class Immutable',
  category: 'Java',
  difficulty: 'medium',
  description:
    'To make a class immutable, certain design rules must be followed to prevent state modification.',
  bulletPoints: [
    'Declare class as final',
    'Make all fields private and final',
    'Do not provide setter methods',
    'Initialize all fields via constructor',
    'Use defensive copying for mutable fields'
  ],
  codeExample: `public final class Person {
    private final String name;

    public Person(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}`
},
{
  id: 'java-string-pool',
  name: 'String Pool in Java',
  category: 'Java',
  difficulty: 'easy',
  description:
    'String Pool is a special memory area inside the heap where Java stores String literals to optimize memory usage and improve performance.',
  bulletPoints: [
    'String Pool is part of heap memory',
    'Stores only String literals',
    'JVM reuses existing String objects from pool',
    'Prevents duplicate String objects',
    'Improves memory efficiency'
  ],
  codeExample: `String s1 = "Hello";
String s2 = "Hello";

System.out.println(s1 == s2); // true (same reference)`
},
{
  id: 'java-string-literal-vs-object',
  name: 'String Literal vs String Object',
  category: 'Java',
  difficulty: 'easy',
  description:
    'String literals are stored in the String Pool, while using new String() always creates a new object in heap memory.',
  bulletPoints: [
    'String literals are reused from String Pool',
    'new String() creates a new object every time',
    '== compares references, not values',
    'equals() compares actual content'
  ],
  codeExample: `String a = "Test";
String b = new String("Test");

System.out.println(a == b);      // false
System.out.println(a.equals(b)); // true`
},
{
  id: 'java-when-not-to-use-string-pool',
  name: 'When Not to Use String Pool',
  category: 'Java',
  difficulty: 'medium',
  description:
    'In some scenarios, using the String Pool is not recommended due to security and memory concerns.',
  bulletPoints: [
    'Avoid pooling sensitive data like passwords',
    'Pooled strings stay in memory for long time',
    'Too many unique strings can increase memory usage',
    'Use char[] for sensitive data like passwords'
  ],
  codeExample: `// Avoid this for passwords
String password = "secret123";

// Prefer this
char[] passwordChars = {'s','e','c','r','e','t'};`
},
{
  id: 'java-string-vs-stringbuffer',
  name: 'String vs StringBuffer',
  category: 'Java',
  difficulty: 'easy',
  description:
    'String is immutable, while StringBuffer is mutable and thread-safe, making it suitable for frequent string modifications in multithreaded environments.',
  bulletPoints: [
    'String is immutable',
    'StringBuffer is mutable',
    'StringBuffer is thread-safe',
    'String creates new object on every modification'
  ],
  codeExample: `String s = "Hello";
s.concat(" World"); // creates new object

StringBuffer sb = new StringBuffer("Hello");
sb.append(" World"); // modifies same object`
},
{
  id: 'java-stringbuilder-vs-stringbuffer',
  name: 'StringBuilder vs StringBuffer',
  category: 'Java',
  difficulty: 'easy',
  description:
    'StringBuilder is similar to StringBuffer but is not thread-safe, making it faster in single-threaded environments.',
  bulletPoints: [
    'StringBuilder is not thread-safe',
    'StringBuffer is thread-safe',
    'StringBuilder is faster',
    'Use StringBuilder in single-threaded code'
  ],
  codeExample: `StringBuilder sb = new StringBuilder();
sb.append("Java");

StringBuffer sbf = new StringBuffer();
sbf.append("Java");`
},
{
  id: 'java-when-to-use-stringbuffer',
  name: 'When to Use StringBuffer Instead of String',
  category: 'Java',
  difficulty: 'medium',
  description:
    'StringBuffer should be used when strings are modified frequently, especially inside loops or multithreaded environments.',
  bulletPoints: [
    'Avoids creating multiple String objects',
    'Improves performance in loops',
    'Thread-safe for concurrent access',
    'Efficient memory usage'
  ],
  codeExample: `StringBuffer sb = new StringBuffer();

for (int i = 0; i < 1000; i++) {
    sb.append(i);
}`
},
{
  id: 'java-why-string-immutable',
  name: 'Why String Is Immutable',
  category: 'Java',
  difficulty: 'easy',
  description:
    'String is immutable in Java to improve security, performance, caching, and thread safety.',
  bulletPoints: [
    'Improves security (no modification of sensitive data)',
    'Enables String Pool caching',
    'Thread-safe by default',
    'Improves performance and reliability'
  ],
  codeExample: `String s = "Java";
s = s.concat(" World"); // new object created`
},












  // Inheritance & Design
{
  id: 'java-inheritance-vs-composition',
  name: 'Inheritance vs Composition',
  category: 'Java',
  difficulty: 'medium',
  description:
    'Inheritance and Composition are two core OOP concepts. Inheritance represents an IS-A relationship, while Composition represents a HAS-A relationship. Choosing the right one is key to good design.',
  bulletPoints: [
    'Inheritance: child class acquires properties and behavior of parent class',
    'Represents an IS-A relationship (Dog is an Animal)',
    'Supports method overriding and runtime polymorphism',
    'Composition: one class contains another class object',
    'Represents a HAS-A relationship (Car has an Engine)',
    'Composition provides loose coupling and flexibility',
    'Inheritance creates tight coupling',
    'Modern OOP prefers Composition over Inheritance'
  ],
  codeExample: `// Inheritance example (IS-A)
class Animal {
    void eat() {
        System.out.println("Animal eats");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Dog barks");
    }
}

// Composition example (HAS-A)
class Engine {
    void start() {
        System.out.println("Engine starts");
    }
}

class Car {
    private Engine engine = new Engine();

    void drive() {
        engine.start();
        System.out.println("Car is moving");
    }
}`
},
 {
    id: 'java-abstract-class-constructor',
    name: 'Why Abstract Classes Have Constructors',
    category: 'Java',
    difficulty: 'medium',
    description:
      'Even though we cannot create objects of an abstract class, it can still have a constructor. The purpose of this constructor is to initialize common data for its subclasses.',
    bulletPoints: [
      'Abstract classes cannot be instantiated directly',
      'They can still have constructors',
      'Constructor initializes shared fields for child classes',
      'Parent (abstract) constructor always runs first',
      'Ensures base state is ready before child logic executes',
      'Constructors in abstract classes are meant for subclasses'
    ],
    codeExample: `abstract class Animal {
    String type;

    Animal() {
        this.type = "Mammal";
        System.out.println("Parent constructor: type initialized");
    }
}

class Dog extends Animal {
    Dog() {
        System.out.println("Child constructor: Dog created");
    }
}

public class Test {
    public static void main(String[] args) {
        new Dog();
    }
}

// Output:
// Parent constructor: type initialized
// Child constructor: Dog created`
  },


  // Polymorphism (Compile + Runtime)
  {
    id: 'java-polymorphism-basics',
    name: 'Polymorphism in Java',
    category: 'Java',
    difficulty: 'easy',
    description:
      'Polymorphism means one name, many forms. In Java, it allows the same method name to behave differently based on the object type or parameters passed.',
    bulletPoints: [
      'Polymorphism improves code flexibility and scalability',
      'Same method name can perform different actions',
      'Behavior depends on input (overloading) or object (overriding)',
      'Key concept of Object-Oriented Programming'
    ],
    codeExample: `// Polymorphism example
class Shape {
    void draw() {
        System.out.println("Drawing shape");
    }
}

class Circle extends Shape {
    @Override
    void draw() {
        System.out.println("Drawing circle");
    }
}

public class Main {
    public static void main(String[] args) {
        Shape s = new Circle(); // parent reference, child object
        s.draw(); // calls Circle's draw()
    }
}`
  },
  {
    id: 'java-method-overriding',
    name: 'Method Overriding',
    category: 'Java',
    difficulty: 'medium',
    description:
      'Method overriding occurs when a child class provides its own implementation of a method already defined in its parent class.',
    bulletPoints: [
      'Same method name and same parameters',
      'Requires inheritance',
      'Resolved at runtime',
      'Method call depends on object type'
    ],
    codeExample: `class Animal {
    void sound() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Dog barks");
    }
}`
  },

  {
    id: 'java-polymorphism-types',
    name: 'Types of Polymorphism',
    category: 'Java',
    difficulty: 'easy',
    description:
      'Java supports two types of polymorphism: Compile-time polymorphism and Runtime polymorphism.',
    bulletPoints: [
      'Compile-time Polymorphism → Method Overloading',
      'Runtime Polymorphism → Method Overriding',
      'Compile-time is resolved during compilation',
      'Runtime is resolved during execution'
    ],
    codeExample: `// Compile-time polymorphism (Overloading)
class Calculator {
    int add(int a, int b) {
        return a + b;
    }

    int add(int a, int b, int c) {
        return a + b + c;
    }
}`
  },
  
  {
    id: 'java-method-overloading',
    name: 'Method Overloading',
    category: 'Java',
    difficulty: 'easy',
    description:
      'Method overloading means having multiple methods with the same name but different parameter lists in the same class.',
    bulletPoints: [
      'Same method name, different parameters',
      'Return type alone cannot differentiate overloading',
      'Occurs in same class',
      'Resolved at compile time'
    ],
    codeExample: `class Printer {

    void print(String msg) {
        System.out.println(msg);
    }

    void print(int number) {
        System.out.println(number);
    }
}`
  },

  {
    id: 'java-overloading-vs-overriding',
    name: 'Overloading vs Overriding',
    category: 'Java',
    difficulty: 'easy',
    description:
      'Overloading and overriding are two different forms of polymorphism with different rules and behavior.',
    bulletPoints: [
      'Overloading → Compile-time, same class, different parameters',
      'Overriding → Runtime, parent-child, same signature',
      'Overloading improves readability',
      'Overriding provides dynamic behavior'
    ],
    codeExample: `// Overloading
int sum(int a, int b) { return a + b; }

// Overriding
@Override
void draw() { System.out.println("Child draw"); }`
  },

  {
    id: 'java-constructor-polymorphism',
    name: 'Constructors & Polymorphism',
    category: 'Java',
    difficulty: 'easy',
    description:
      'Constructors can be overloaded but cannot be overridden because they are not inherited.',
    bulletPoints: [
      'Constructor overloading is allowed',
      'Constructor overriding is NOT possible',
      'Constructors are bound to class name',
      'They are executed during object creation'
    ],
    codeExample: `class User {
    User() {}

    User(String name) {}
}`
  },
  {
    id: 'java-static-polymorphism',
    name: 'Static Methods & Polymorphism',
    category: 'Java',
    difficulty: 'medium',
    description:
      'Static methods can be overloaded but cannot be overridden. They follow method hiding instead of runtime polymorphism.',
    bulletPoints: [
      'Static methods belong to class, not object',
      'Can be overloaded',
      'Cannot be overridden',
      'Resolved at compile time'
    ],
    codeExample: `class Parent {
    static void show() {
        System.out.println("Parent");
    }
}

class Child extends Parent {
    static void show() {
        System.out.println("Child");
    }
}`
  },

  {
    id: 'java-runtime-polymorphism-why',
    name: 'Why Runtime Polymorphism Works Only with Overriding',
    category: 'Java',
    difficulty: 'easy',
    description:
      'Runtime polymorphism is possible only through method overriding because method execution depends on the object created at runtime.',
    bulletPoints: [
      'Parent reference can point to child object',
      'Method call resolved at runtime',
      'Based on actual object type',
      'Achieved using inheritance'
    ],
    codeExample: `Animal a = new Dog();
a.sound(); // Dog's method executes`
  },


  // Interfaces & Abstraction
{
  id: 'java-interface-vs-abstract',
  name: 'Interface vs Abstract Class',
  category: 'Java',
  difficulty: 'medium',
  description:
    'Interfaces and abstract classes are used to achieve abstraction in Java. Interfaces define contracts, while abstract classes provide partial implementation.',
  bulletPoints: [
    'Interface defines what to do (contract)',
    'Abstract class defines what + partial how',
    'Interface supports multiple inheritance',
    'Abstract class can have fields and constructors',
    'Use interface for unrelated classes',
    'Use abstract class for related classes'
  ],
  codeExample: `interface Payment {
    void pay();
}

abstract class Vehicle {
    int speed;
    abstract void move();
}`
},
{
  id: 'java-marker-interface',
  name: 'Marker Interface',
  category: 'Java',
  difficulty: 'easy',
  description:
    'A Marker Interface is an empty interface with no methods or fields. It is used to tag a class for special behavior by JVM or frameworks.',
  bulletPoints: [
    'Marker interface has no methods or fields',
    'Used to mark a class for special treatment',
    'JVM/framework checks marker and applies logic',
    'Provides metadata about a class',
    'Examples: Serializable, Cloneable, RandomAccess'
  ],
  codeExample: `class User implements Serializable {
    String name;
}`
},
{
  id: 'java-serializable-interface',
  name: 'Serializable Interface',
  category: 'Java',
  difficulty: 'easy',
  description:
    'Serializable is a marker interface that allows an object to be converted into a byte stream for storage or transfer.',
  bulletPoints: [
    'Serializable is a marker interface',
    'Used for object serialization',
    'Converts object into byte stream',
    'Required for file storage and network transfer',
    'Used in caching, messaging, and persistence'
  ],
  codeExample: `class Employee implements Serializable {
    int id;
    String name;
}`
},
{
  id: 'java-functional-interface',
  name: 'Functional Interface',
  category: 'Java',
  difficulty: 'easy',
  description:
    'A Functional Interface is an interface with exactly one abstract method. It is mainly used with lambda expressions.',
  bulletPoints: [
    'Contains exactly one abstract method',
    'Used for lambda expressions',
    '@FunctionalInterface annotation is optional but recommended',
    'Can have default and static methods',
    'Examples: Runnable, Callable, Comparator'
  ],
  codeExample: `@FunctionalInterface
interface Calculator {
    int add(int a, int b);
}

Calculator c = (a, b) -> a + b;`
},


  //  Collections & Streams
  {
    id: 'java-collections',
    name: 'Collections Framework',
    category: 'Java',
    difficulty: 'medium',
    description: 'The Java Collections Framework provides a set of interfaces and classes to store and manipulate groups of objects. It includes Lists, Sets, Maps, and Queues.',
    bulletPoints: [
      'ArrayList for dynamic arrays, LinkedList for frequent insertions',
      'HashSet for unique elements, TreeSet for sorted unique elements',
      'HashMap for key-value pairs, TreeMap for sorted keys',
      'Choose based on performance requirements and use case'
    ],
    codeExample: `// List
List<String> names = new ArrayList<>();
names.add("Divyansh");
names.add("John");

// Set
Set<Integer> uniqueNumbers = new HashSet<>();
uniqueNumbers.add(1);
uniqueNumbers.add(2);

// Map
Map<String, Integer> ages = new HashMap<>();
ages.put("Divyansh", 25);
ages.get("Divyansh"); // 25

// Stream operations
names.stream()
     .filter(n -> n.startsWith("D"))
     .map(String::toUpperCase)
     .forEach(System.out::println);`
  },
  {
    id: 'java-streams',
    name: 'Java Streams API',
    category: 'Java',
    difficulty: 'medium',
    description: 'Streams API (Java 8+) enables functional-style operations on collections. Streams are lazy, meaning computation is only performed when a terminal operation is invoked.',
    bulletPoints: [
      'Streams don\'t modify the source collection',
      'Intermediate operations are lazy (filter, map, sorted)',
      'Terminal operations trigger execution (collect, forEach, reduce)',
      'Parallel streams can improve performance for large datasets'
    ],
    codeExample: `List<Employee> employees = getEmployees();

// Filter and transform
List<String> highEarnerNames = employees.stream()
    .filter(e -> e.getSalary() > 50000)
    .map(Employee::getName)
    .sorted()
    .collect(Collectors.toList());

// Reduce
double totalSalary = employees.stream()
    .mapToDouble(Employee::getSalary)
    .sum();

// Grouping
Map<Department, List<Employee>> byDept = employees.stream()
    .collect(Collectors.groupingBy(Employee::getDepartment));`
  },
  //Exception Handling
  {
    id: 'java-exceptions',
    name: 'Exception Handling',
    category: 'Java',
    difficulty: 'easy',
    description: 'Exception handling in Java uses try-catch-finally blocks. Exceptions are categorized as checked (must be handled) and unchecked (runtime exceptions).',
    bulletPoints: [
      'Checked exceptions must be caught or declared',
      'Unchecked exceptions extend RuntimeException',
      'finally block always executes (cleanup code)',
      'try-with-resources auto-closes resources'
    ],
    codeExample: `// Traditional try-catch
try {
    readFile("data.txt");
} catch (FileNotFoundException e) {
    logger.error("File not found", e);
} catch (IOException e) {
    logger.error("IO Error", e);
} finally {
    cleanup();
}

// Try-with-resources
try (BufferedReader reader = new BufferedReader(
        new FileReader("data.txt"))) {
    String line = reader.readLine();
    process(line);
} catch (IOException e) {
    throw new DataProcessingException("Failed to read", e);
}`
  },
{
  id: 'java-exception-basics',
  name: 'What is an Exception',
  category: 'Java',
  difficulty: 'easy',
  description:
    'An exception is an unexpected event that occurs during program execution and disrupts the normal flow of the program. In Java, exceptions are represented as objects.',
  bulletPoints: [
    'Exception is an unexpected runtime event',
    'Disrupts normal program flow',
    'Represented as an object in Java',
    'Part of java.lang package'
  ],
  codeExample: `int a = 10 / 0; // ArithmeticException`
},
{
  id: 'java-types-of-exceptions',
  name: 'Types of Exceptions',
  category: 'Java',
  difficulty: 'easy',
  description:
    'Java exceptions are mainly divided into checked and unchecked exceptions based on when they are verified.',
  bulletPoints: [
    'Checked exceptions are checked at compile time',
    'Must be caught or declared using throws',
    'Unchecked exceptions occur at runtime',
    'Unchecked exceptions extend RuntimeException',
    'Usually caused by programming errors'
  ],
  codeExample: `// Checked Exception
void readFile() throws IOException {}

// Unchecked Exception
int a = 10 / 0; // ArithmeticException`
},
{
  id: 'java-exception-hierarchy',
  name: 'Exception Hierarchy',
  category: 'Java',
  difficulty: 'easy',
  description:
    'Java exception hierarchy defines how exceptions are structured under Object and Throwable.',
  bulletPoints: [
    'Object is the root class',
    'Throwable is parent of all errors and exceptions',
    'Error represents serious system problems',
    'Exception represents recoverable conditions',
    'RuntimeException represents unchecked exceptions'
  ],
  codeExample: `Object
 └── Throwable
      ├── Error
      └── Exception
           └── RuntimeException`
},
{
  id: 'java-try-catch-finally',
  name: 'try-catch-finally',
  category: 'Java',
  difficulty: 'easy',
  description:
    'The try-catch-finally block is used to handle exceptions and ensure resource cleanup.',
  bulletPoints: [
    'try contains risky code',
    'catch handles exceptions',
    'finally always executes',
    'Used for resource cleanup'
  ],
  codeExample: `try {
    int a = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Error occurred");
} finally {
    System.out.println("Cleanup");
}`
},
{
  id: 'java-try-catch-finally',
  name: 'try-catch-finally',
  category: 'Java',
  difficulty: 'easy',
  description:
    'The try-catch-finally block is used to handle exceptions and ensure resource cleanup.',
  bulletPoints: [
    'try contains risky code',
    'catch handles exceptions',
    'finally always executes',
    'Used for resource cleanup'
  ],
  codeExample: `try {
    int a = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Error occurred");
} finally {
    System.out.println("Cleanup");
}`
},
{
  id: 'java-throw-vs-throws',
  name: 'throw vs throws',
  category: 'Java',
  difficulty: 'easy',
  description:
    'throw and throws are used to handle exceptions explicitly in Java.',
  bulletPoints: [
    'throw is used to explicitly throw an exception',
    'throws declares possible exceptions',
    'throw is used inside method body',
    'throws is used in method signature'
  ],
  codeExample: `void test() throws IOException {
    throw new IOException("Error");
}`
},
{
  id: 'java-custom-exceptions',
  name: 'Custom Exceptions',
  category: 'Java',
  difficulty: 'medium',
  description:
    'Custom exceptions are user-defined exceptions used to represent application-specific errors.',
  bulletPoints: [
    'Extend Exception for checked exceptions',
    'Extend RuntimeException for unchecked exceptions',
    'Improve code readability',
    'Used for business logic errors'
  ],
  codeExample: `class MyException extends Exception {
    MyException(String msg) {
        super(msg);
    }
}`
},
{
  id: 'java-exception-propagation',
  name: 'Exception Propagation',
  category: 'Java',
  difficulty: 'medium',
  description:
    'Exception propagation means an exception moves up the call stack until it is handled.',
  bulletPoints: [
    'Exception propagates from called method to caller',
    'Stops when caught',
    'If not caught, program terminates'
  ],
  codeExample: `void m1() throws Exception {
    m2();
}

void m2() throws Exception {
    throw new Exception("Propagated");
}`
},
{
  id: 'java-finally-special-cases',
  name: 'finally Block Special Cases',
  category: 'Java',
  difficulty: 'medium',
  description:
    'The finally block usually executes always, but there are rare cases when it does not.',
  bulletPoints: [
    'finally executes even if return is present',
    'finally does NOT execute on System.exit()',
    'finally skipped if JVM crashes'
  ],
  codeExample: `try {
    System.exit(0);
} finally {
    System.out.println("Won't run");
}`
},
{
  id: 'java-final-vs-finally-vs-finalize',
  name: 'final vs finally vs finalize',
  category: 'Java',
  difficulty: 'easy',
  description:
    'final, finally, and finalize serve completely different purposes in Java.',
  bulletPoints: [
    'final prevents modification',
    'finally ensures cleanup',
    'finalize() is GC related (deprecated)'
  ],
  codeExample: `final int x = 10;`
},
{
  id: 'java-exception-best-practices',
  name: 'Exception Handling Best Practices',
  category: 'Java',
  difficulty: 'medium',
  description:
    'Best practices ensure clean, maintainable, and efficient exception handling.',
  bulletPoints: [
    'Catch specific exceptions first',
    'Avoid catching generic Exception',
    'Never leave catch block empty',
    'Use try-with-resources',
    'Do not use exceptions for normal flow'
  ],
  codeExample: `try (FileReader fr = new FileReader("a.txt")) {
    // use file
}`
},











  // 























  {
    id: 'java-static-polymorphism',
    name: 'Static Methods & Polymorphism',
    category: 'Java',
    difficulty: 'medium',
    description:
      'Static methods can be overloaded but cannot be overridden. They follow method hiding instead of runtime polymorphism.',
    bulletPoints: [
      'Static methods belong to class, not object',
      'Can be overloaded',
      'Cannot be overridden',
      'Resolved at compile time'
    ],
    codeExample: `class Parent {
    static void show() {
        System.out.println("Parent");
    }
}

class Child extends Parent {
    static void show() {
        System.out.println("Child");
    }
}`
  },



{
  id: 'java-multithreading-complete',
  name: 'Java Multithreading & Concurrency (Complete)',
  category: 'Java',
  difficulty: 'hard',
  description:
    'Multithreading in Java allows a program to perform multiple tasks concurrently. This topic covers threads, lifecycle, synchronization, memory visibility, thread safety, executors, and common concurrency interview questions.',
  bulletPoints: [
    // Basics
    'A thread is a lightweight unit of execution inside a process',
    'Multiple threads enable parallel and concurrent task execution',
    'Threads share the same memory, unlike processes',

    // Creating threads
    'Threads can be created by extending Thread or implementing Runnable',
    'Runnable is preferred because it supports inheritance and clean design',
    'Lambda expressions simplify Runnable implementation',

    // Lifecycle
    'Thread lifecycle states: New, Runnable, Running, Blocked, Waiting, Timed Waiting, Terminated',
    'start() moves thread to Runnable state',
    'run() contains execution logic',

    // Synchronization & safety
    'Synchronization ensures only one thread accesses shared data at a time',
    'Use synchronized blocks for fine-grained locking',
    'Use synchronized methods when entire method needs protection',
    'Improper synchronization leads to race conditions',

    // Locks & visibility
    'volatile ensures visibility but not atomicity',
    'Atomic classes provide atomic operations',
    'Locks like ReentrantLock offer advanced features like tryLock()',

    // Thread communication
    'wait(), notify(), notifyAll() are used for inter-thread communication',
    'These methods belong to Object, not Thread',

    // Thread pools & executors
    'ThreadPool reuses threads and improves performance',
    'ExecutorService manages thread lifecycle efficiently',
    'ForkJoinPool is optimized for divide-and-conquer tasks',

    // Design & challenges
    'Multithreading introduces challenges like deadlocks and starvation',
    'Composition of concurrency utilities is preferred over manual threads',
    'Good thread management improves performance and reliability'
  ],
  codeExample: `// Creating thread using Runnable (preferred)
Runnable task = () -> {
    System.out.println("Thread running: " + Thread.currentThread().getName());
};

Thread t = new Thread(task);
t.start();

// Synchronization example
class Counter {
    private int count = 0;

    synchronized void increment() {
        count++;
    }
}

// ThreadPool example
ExecutorService executor = Executors.newFixedThreadPool(2);
executor.submit(() -> System.out.println("Task 1"));
executor.submit(() -> System.out.println("Task 2"));
executor.shutdown();`
},




{
  id: 'java-thread-basics',
  name: 'Thread Basics',
  category: 'Java',
  difficulty: 'easy',
  description:
    'A thread is a lightweight unit of execution that allows a Java program to perform multiple tasks concurrently within the same process.',
  bulletPoints: [
    'Thread is a lightweight unit of execution',
    'Multiple threads run inside a single process',
    'Threads share the same memory space',
    'Used to improve performance and responsiveness'
  ],
  codeExample: `Thread t = new Thread(() -> {
    System.out.println("Thread running");
});
t.start();`
},
{
  id: 'java-creating-threads',
  name: 'Creating Threads in Java',
  category: 'Java',
  difficulty: 'easy',
  description:
    'Threads in Java can be created by extending the Thread class or by implementing the Runnable interface.',
  bulletPoints: [
    'Extend Thread and override run()',
    'Implement Runnable and pass it to Thread',
    'Runnable is preferred over Thread',
    'Supports better design and inheritance'
  ],
  codeExample: `Runnable task = () -> {
    System.out.println("Runnable thread running");
};

Thread t = new Thread(task);
t.start();`
},
{
  id: 'java-thread-synchronization',
  name: 'Thread Synchronization',
  category: 'Java',
  difficulty: 'medium',
  description:
    'Thread synchronization ensures that only one thread accesses shared data at a time to prevent race conditions.',
  bulletPoints: [
    'Prevents race conditions',
    'Ensures data consistency',
    'Achieved using synchronized keyword',
    'Can be applied on methods or blocks'
  ],
  codeExample: `class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++;
    }
}`
},
{
  id: 'java-executorservice',
  name: 'ExecutorService & Thread Pools',
  category: 'Java',
  difficulty: 'medium',
  description:
    'ExecutorService manages a pool of threads and executes tasks efficiently instead of creating threads manually.',
  bulletPoints: [
    'Manages thread lifecycle',
    'Reuses threads (thread pooling)',
    'Prevents creating too many threads',
    'Improves performance and scalability'
  ],
  codeExample: `ExecutorService executor = Executors.newFixedThreadPool(4);

executor.submit(() -> {
    System.out.println("Task executed");
});

executor.shutdown();`
},
{
  id: 'java-completablefuture',
  name: 'CompletableFuture (Async Programming)',
  category: 'Java',
  difficulty: 'hard',
  description:
    'CompletableFuture is used for asynchronous and non-blocking programming in Java.',
  bulletPoints: [
    'Supports async and non-blocking operations',
    'Allows chaining of tasks',
    'Better alternative to Future',
    'Used in reactive and async systems'
  ],
  codeExample: `CompletableFuture<String> future =
    CompletableFuture.supplyAsync(() -> "Data")
        .thenApply(data -> data.toUpperCase());

future.thenAccept(System.out::println);`
},{
  id: 'java-thread-safety',
  name: 'Thread Safety & Race Conditions',
  category: 'Java',
  difficulty: 'medium',
  description:
    'Thread safety ensures that shared data behaves correctly when accessed by multiple threads.',
  bulletPoints: [
    'Race condition occurs when threads update shared data simultaneously',
    'Synchronization ensures thread safety',
    'Atomic classes can be used',
    'Volatile ensures visibility but not atomicity'
  ],
  codeExample: `AtomicInteger count = new AtomicInteger(0);
count.incrementAndGet();`
}













];

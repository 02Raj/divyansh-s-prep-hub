import { InterviewTopic } from './types';

export const javaTopics: InterviewTopic[] = [
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
  {
    id: 'java-multithreading',
    name: 'Multithreading',
    category: 'Java',
    difficulty: 'hard',
    description: 'Multithreading allows concurrent execution of two or more parts of a program. Java provides built-in support for multithreaded programming through the Thread class and Runnable interface.',
    bulletPoints: [
      'Threads share the same memory space within a process',
      'synchronized keyword prevents race conditions',
      'ExecutorService manages thread pools efficiently',
      'CompletableFuture provides async programming support'
    ],
    codeExample: `// Using ExecutorService
ExecutorService executor = Executors.newFixedThreadPool(4);

CompletableFuture<String> future = CompletableFuture
    .supplyAsync(() -> fetchData(), executor)
    .thenApply(data -> processData(data))
    .thenApply(result -> formatResult(result));

future.thenAccept(System.out::println);

// Synchronized method
public synchronized void incrementCounter() {
    counter++;
}

executor.shutdown();`
  },
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
  }
];

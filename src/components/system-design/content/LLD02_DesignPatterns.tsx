import { SDTitle, SDHeading2, SDParagraph, SDList, RememberBlock, InterviewQuestion } from '../ui/SystemDesignUI';

export default function LLD02DesignPatterns() {
  return (
    <div className="max-w-4xl">
      <SDTitle>LLD-02: Top Design Patterns in Practice</SDTitle>
      
      <SDParagraph>
        Design Patterns are proven solutions to common problems in software design. In Spring Boot, many of these patterns are built directly into the framework. You need to know the top 5.
      </SDParagraph>

      <SDHeading2>1. Singleton Pattern</SDHeading2>
      <SDParagraph>
        <strong>What it is:</strong> Ensures a class has only ONE instance, and provides a global point of access to it.
      </SDParagraph>
      <SDList>
        <li><strong>Spring Boot Usage:</strong> Every `@Component`, `@Service`, or `@Repository` you create in Spring Boot is a Singleton by default! Spring creates one instance at startup and shares it across all HTTP requests.</li>
        <li><strong>Why:</strong> Creating a new Database Connection Pool or Service class for every single web request would crash the server. Reusing one instance is highly efficient.</li>
      </SDList>

      <SDHeading2>2. Factory Pattern</SDHeading2>
      <SDParagraph>
        <strong>What it is:</strong> Provides an interface for creating objects, but lets subclasses or logic decide which class to instantiate.
      </SDParagraph>
      <SDList>
        <li><strong>Real World Example:</strong> You are building a notification system. Depending on user preference, you need to send an Email, SMS, or Push Notification.</li>
        <li><strong>Implementation:</strong> Create a `NotificationFactory` class with a `getNotifier(String type)` method. If type is "SMS", it returns an `SmsNotifier` object. The client code doesn't need to know how the object is created.</li>
      </SDList>

      <SDHeading2>3. Builder Pattern</SDHeading2>
      <SDParagraph>
        <strong>What it is:</strong> Separates the construction of a complex object from its representation. It solves the "Telescoping Constructor" problem (a constructor with 15 parameters where you forget the order).
      </SDParagraph>
      <SDList>
        <li><strong>Spring Boot Usage:</strong> Heavily used in modern Java, especially with Lombok's `@Builder` annotation.</li>
        <li><strong>Example:</strong> `User.builder().firstName("John").lastName("Doe").age(30).build();`</li>
        <li><strong>Why:</strong> It makes object creation incredibly readable and allows you to create immutable objects easily.</li>
      </SDList>

      <SDHeading2>4. Strategy Pattern</SDHeading2>
      <SDParagraph>
        <strong>What it is:</strong> Defines a family of algorithms, encapsulates each one, and makes them interchangeable.
      </SDParagraph>
      <SDList>
        <li><strong>Real World Example:</strong> E-Commerce Payment system. You have Credit Card, PayPal, and Crypto.</li>
        <li><strong>Implementation:</strong> Create a `PaymentStrategy` interface with a `pay()` method. Create classes `CreditCardStrategy`, `PayPalStrategy` implementing it. At runtime, the user selects a payment method, and your code simply calls `strategy.pay()`. You don't need massive `if/else` or `switch` statements!</li>
      </SDList>

      <SDHeading2>5. Observer Pattern</SDHeading2>
      <SDParagraph>
        <strong>What it is:</strong> Defines a one-to-many dependency so that when one object changes state, all its dependents are notified automatically (Publish/Subscribe).
      </SDParagraph>
      <SDList>
        <li><strong>Spring Boot Usage:</strong> Spring's Application Events (`ApplicationEventPublisher` and `@EventListener`).</li>
        <li><strong>Example:</strong> When a new user registers (Publisher), you want to send a welcome email, create a default wallet, and log the metric. Instead of the `UserService` calling all three directly, it just fires a `UserRegisteredEvent`. Three separate classes (Observers) listen for that event and react. This keeps the code perfectly decoupled.</li>
      </SDList>

      <RememberBlock>
        Don't force patterns where they aren't needed. Implementing a massive Strategy and Factory pattern for a feature that only has one single use case is a violation of the KISS principle. Use patterns to solve pain points, not to show off.
      </RememberBlock>

      <InterviewQuestion 
        question="How does Spring Boot implement the Singleton Pattern, and is it thread-safe?"
        answer={
          <div>
            <p>Spring manages Singletons via its Inversion of Control (IoC) Container. When the application starts, Spring creates exactly one instance of your <code>@Service</code> and stores it in the ApplicationContext.</p>
            <p className="mt-2"><strong>Is it thread-safe?</strong> The Spring Container's creation of the bean is thread-safe. However, the Bean itself is <strong>only thread-safe if you keep it stateless</strong>. If you put a mutable variable (like <code>private int requestCount = 0;</code>) inside a Singleton <code>@Service</code>, multiple threads (HTTP requests) will modify it at the same time, causing race conditions. Singletons should rarely have mutable state!</p>
          </div>
        }
      />

    </div>
  );
}

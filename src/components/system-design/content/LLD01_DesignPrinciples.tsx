import { SDTitle, SDHeading2, SDParagraph, SDList, RememberBlock, InterviewQuestion, CommonMistake } from '../ui/SystemDesignUI';

export default function LLD01DesignPrinciples() {
  return (
    <div className="max-w-4xl">
      <SDTitle>LLD-01: Low-Level Design Principles (SOLID, DRY, KISS)</SDTitle>
      
      <SDParagraph>
        Low-Level Design (LLD) is about translating your High-Level architecture into clean, maintainable, and readable code. Before we talk about classes and databases, we must understand the core principles of writing good code.
      </SDParagraph>

      <SDHeading2>1. The SOLID Principles</SDHeading2>
      <SDParagraph>
        SOLID is the most important set of principles in Object-Oriented Programming. Interviewers love asking for real-world examples of these.
      </SDParagraph>

      <SDList>
        <li>
          <strong className="text-foreground">S - Single Responsibility Principle (SRP):</strong> 
          A class should have one, and only one, reason to change. 
          <br /><span className="text-muted-foreground">Example: A `UserService` should handle user logic. It should NOT contain code to send emails. Create a separate `EmailService` for that.</span>
        </li>
        <li>
          <strong className="text-foreground">O - Open/Closed Principle (OCP):</strong> 
          Classes should be open for extension, but closed for modification. 
          <br /><span className="text-muted-foreground">Example: If you have a `PaymentProcessor` that handles Credit Cards, and you want to add PayPal, you shouldn't modify the existing class. Instead, create an interface `PaymentStrategy` and implement a new `PayPalStrategy` class.</span>
        </li>
        <li>
          <strong className="text-foreground">L - Liskov Substitution Principle (LSP):</strong> 
          If a program uses a Base Class, it should be able to use any of its Subclasses without the program breaking.
          <br /><span className="text-muted-foreground">Example: If `Penguin` extends `Bird`, but `Bird` has a `fly()` method that `Penguin` overrides to throw an exception, you violated LSP. A Penguin is a bird, but it can't fly. Rethink the hierarchy (maybe `FlyingBird` vs `FlightlessBird`).</span>
        </li>
        <li>
          <strong className="text-foreground">I - Interface Segregation Principle (ISP):</strong> 
          Don't force a class to implement methods it doesn't use.
          <br /><span className="text-muted-foreground">Example: Instead of one massive `MultiFunctionPrinter` interface with `print()`, `scan()`, and `fax()`, create three separate interfaces. A basic printer only implements `Printable`.</span>
        </li>
        <li>
          <strong className="text-foreground">D - Dependency Inversion Principle (DIP):</strong> 
          High-level modules should not depend on low-level modules. Both should depend on abstractions (interfaces).
          <br /><span className="text-muted-foreground">Example: This is the core of Spring Boot's Dependency Injection (`@Autowired`). Your Controller depends on a `UserService` interface, not a specific database implementation.</span>
        </li>
      </SDList>

      <SDHeading2>2. DRY (Don't Repeat Yourself)</SDHeading2>
      <SDParagraph>
        Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.
      </SDParagraph>
      <SDList>
        <li>If you find yourself copying and pasting the exact same 10 lines of code into 3 different methods, extract it into a single helper method.</li>
        <li><strong>Warning:</strong> Don't take DRY too far. If two pieces of code look identical right now, but they represent two fundamentally different business concepts that will change independently in the future, it's better to keep them separate.</li>
      </SDList>

      <SDHeading2>3. KISS (Keep It Simple, Stupid)</SDHeading2>
      <SDParagraph>
        Most systems work best if they are kept simple rather than made complicated.
      </SDParagraph>
      <SDList>
        <li>Don't use a massive Kafka cluster if a simple database table works for your current scale.</li>
        <li>Don't write highly abstract, overly generic code if you only have one specific use case right now. Code should be readable by junior developers.</li>
      </SDList>

      <RememberBlock>
        "Premature optimization is the root of all evil." — Donald Knuth. Write clean, simple code first. Optimize it only when you have metrics proving it's a bottleneck.
      </RememberBlock>

      <InterviewQuestion 
        question="Can you explain the Single Responsibility Principle with a Spring Boot example?"
        answer={
          <div>
            <p>Imagine a <code>UserController</code> that handles HTTP requests. If inside that controller, I write JDBC SQL queries to fetch the user from the database, and then I write Java Mail code to send them a welcome email, I have violated SRP heavily.</p>
            <p className="mt-2">To fix it, the Controller should ONLY handle HTTP requests and JSON validation. It delegates to a <code>UserService</code> for business logic. The <code>UserService</code> delegates to a <code>UserRepository</code> for database access, and an <code>EmailService</code> for sending emails. Each class now has exactly one responsibility.</p>
          </div>
        }
      />

      <CommonMistake>
        Following DRY so blindly that you couple two unrelated parts of the system. For example, using the exact same Database Entity class as your API Response DTO. Yes, it saves you typing one class, but when the database schema changes, your API instantly breaks for all mobile clients!
      </CommonMistake>

    </div>
  );
}

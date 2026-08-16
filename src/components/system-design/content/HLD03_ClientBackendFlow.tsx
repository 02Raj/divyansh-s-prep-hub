import { SDTitle, SDHeading2, SDParagraph, SDList, RememberBlock, InterviewQuestion, AsciiDiagram } from '../ui/SystemDesignUI';

export default function HLD03ClientBackendFlow() {
  return (
    <div className="max-w-4xl">
      <SDTitle>HLD-03: Client → Backend Flow</SDTitle>
      
      <SDParagraph>
        How does a request actually travel from a user's browser down to the database in a modern Angular + Spring Boot application? Understanding this flow is the absolute core of High-Level Design.
      </SDParagraph>

      <AsciiDiagram diagram={`
[ 1. Angular UI Component ]
          | (User clicks "Save Profile")
          v
[ 2. Angular Service ]
          | (Formats data, calls HttpClient)
          v
[ 3. HTTP Interceptor ]
          | (Attaches JWT Token)
          v
==== ( INTERNET / NETWORK ) ====
          v
[ 4. Load Balancer / API Gateway ]
          | (Routes to healthy server)
          v
[ 5. Spring Boot Filter / Security ]
          | (Validates JWT Token)
          v
[ 6. Spring Boot Controller ]
          | (Validates JSON, maps to DTO)
          v
[ 7. Spring Boot Service ]
          | (Business Logic, Transactions)
          v
[ 8. Spring Boot Repository ]
          | (Generates SQL query)
          v
[ 9. PostgreSQL Database ]
      `} />

      <SDHeading2>Step-by-step Breakdown</SDHeading2>

      <SDList>
        <li>
          <strong className="text-foreground">1. Angular UI Component:</strong> 
          The user clicks a button. The component listens to the click event and gathers data from the form.
        </li>
        <li>
          <strong className="text-foreground">2. Angular Service:</strong> 
          The component passes the data to a service. The service uses Angular's <code>HttpClient</code> to make a POST request.
        </li>
        <li>
          <strong className="text-foreground">3. HTTP Interceptor:</strong> 
          Before the request leaves the browser, an Angular interceptor secretly catches it and attaches the user's Authentication Token (JWT) to the headers.
        </li>
        <li>
          <strong className="text-foreground">4. Load Balancer:</strong> 
          The request travels over the internet and hits your company's Load Balancer (like AWS ALB). The balancer looks for a Spring Boot server that isn't too busy and forwards the request.
        </li>
        <li>
          <strong className="text-foreground">5. Spring Security Filter:</strong> 
          The request enters Spring Boot. Before hitting your code, Spring Security checks the JWT token to ensure the user is logged in.
        </li>
        <li>
          <strong className="text-foreground">6. Controller:</strong> 
          The request hits your <code>@RestController</code>. The controller's only job is to receive the JSON, validate that fields aren't empty (using <code>@Valid</code>), and pass it down.
        </li>
        <li>
          <strong className="text-foreground">7. Service Layer:</strong> 
          The <code>@Service</code> contains the actual brain (business logic). It checks rules like "Does this user already exist?" or "Is this email valid?".
        </li>
        <li>
          <strong className="text-foreground">8. Repository:</strong> 
          The service calls a Spring Data JPA <code>@Repository</code>. The repository translates your Java command into a SQL <code>INSERT</code> or <code>UPDATE</code> statement.
        </li>
        <li>
          <strong className="text-foreground">9. Database:</strong> 
          The SQL executes. The success message travels all the way back up the chain to the Angular component, which shows a green "Profile Saved" toast message.
        </li>
      </SDList>

      <RememberBlock>
        A request always travels through layers. Never skip layers (e.g., a Controller should never talk directly to the Database, and an Angular Component should never make HTTP calls without a Service).
      </RememberBlock>

    </div>
  );
}

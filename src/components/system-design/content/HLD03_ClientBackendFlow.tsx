import { SDTitle, SDHeading2, SDParagraph, SDList, RememberBlock, InterviewQuestion, AsciiDiagram } from '../ui/SystemDesignUI';

export default function HLD03ClientBackendFlow() {
  return (
    <div className="max-w-4xl">
      <SDTitle>HLD-03: Client → Backend Flow</SDTitle>
      
      <SDParagraph>
        How does a request actually travel from a user's browser down to the database in a modern web application? Understanding this flow from DNS down to SQL is the absolute core of High-Level Design.
      </SDParagraph>

      <AsciiDiagram diagram={`
[ 1. User Browser / Mobile App ]
          | (Types url, DNS resolution)
          v
[ 2. CDN (Content Delivery Network) ]
          | (Serves static files, passes API calls)
          v
==== ( INTERNET ) ====
          v
[ 3. Load Balancer / API Gateway ]
          | (Routes to healthy backend server)
          v
[ 4. Spring Security Filter ]
          | (Validates JWT Token)
          v
[ 5. Spring Boot Controller ]
          | (Validates JSON, maps to DTO)
          v
[ 6. Spring Boot Service ]
          | (Business Logic, Transactions)
          v
[ 7. Spring Boot Repository ]
          | (Generates SQL query)
          v
[ 8. PostgreSQL Database ]
      `} />

      <SDHeading2>Step-by-step Breakdown</SDHeading2>

      <SDList>
        <li>
          <strong className="text-foreground">1. DNS Resolution:</strong> 
          The user types `api.myapp.com`. The browser asks a Domain Name System (DNS) server to translate that human-readable name into an IP address (like `192.168.1.1`).
        </li>
        <li>
          <strong className="text-foreground">2. CDN (Content Delivery Network):</strong> 
          If the user is requesting an image or a static file (like compiled Angular code), a CDN (like Cloudflare or AWS CloudFront) serves it from a server geographically close to the user, making it lightning fast. API calls bypass the CDN cache.
        </li>
        <li>
          <strong className="text-foreground">3. Load Balancer & Gateway:</strong> 
          The API request hits your Load Balancer (like AWS ALB), which forwards it to your API Gateway. The Gateway might check rate limits and then passes the request to an available Spring Boot server.
        </li>
        <li>
          <strong className="text-foreground">4. Spring Security Filter:</strong> 
          Before hitting your custom code, Spring Security intercepts the request. It checks the `Authorization` header for a valid JWT token to ensure the user is logged in.
        </li>
        <li>
          <strong className="text-foreground">5. Controller:</strong> 
          The request hits your `@RestController`. Its only job is to receive the JSON, validate that fields aren't empty (using `@Valid`), convert it into a DTO (Data Transfer Object), and pass it down.
        </li>
        <li>
          <strong className="text-foreground">6. Service Layer:</strong> 
          The `@Service` contains the actual brain (business logic). It executes rules like "Does this user already exist?" or "Process the payment." This layer is wrapped in a database Transaction.
        </li>
        <li>
          <strong className="text-foreground">7. Repository:</strong> 
          The service calls a Spring Data JPA `@Repository`. The repository translates your Java method (like `save()`) into a SQL `INSERT` or `UPDATE` statement.
        </li>
        <li>
          <strong className="text-foreground">8. Database:</strong> 
          The SQL executes. The success message travels all the way back up the chain to the client, which shows a green "Success" message to the user.
        </li>
      </SDList>

      <RememberBlock>
        A request always travels through layers. Never skip layers (e.g., a Controller should never talk directly to the Database, and an Angular Component should never make HTTP calls without an intermediate Service).
      </RememberBlock>
      
      <InterviewQuestion 
        question="What is the difference between a Forward Proxy and a Reverse Proxy?"
        answer={
          <div>
            <p><strong>Forward Proxy:</strong> Sits in front of the <strong>Client</strong>. (Example: A school blocks students from visiting Facebook. The proxy hides the client's IP from the internet).</p>
            <p className="mt-2"><strong>Reverse Proxy:</strong> Sits in front of the <strong>Server</strong>. (Example: A Load Balancer or API Gateway. It hides the backend servers' IPs from the internet and distributes traffic).</p>
          </div>
        }
      />

    </div>
  );
}

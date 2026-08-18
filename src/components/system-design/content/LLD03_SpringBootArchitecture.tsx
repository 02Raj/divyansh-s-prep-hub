import { SDTitle, SDHeading2, SDParagraph, SDList, RememberBlock, InterviewQuestion, AsciiDiagram } from '../ui/SystemDesignUI';

export default function LLD03SpringBootArchitecture() {
  return (
    <div className="max-w-4xl">
      <SDTitle>LLD-03: Spring Boot Architecture (Layered Design)</SDTitle>
      
      <SDParagraph>
        Spring Boot enforces a very specific, highly-structured way of writing backend code. The industry standard is the <strong>3-Tier Layered Architecture</strong>. Understanding this is mandatory for any Java developer.
      </SDParagraph>

      <AsciiDiagram diagram={`
[ Client (Angular/React/Mobile) ]
               |
               v (JSON)
+-----------------------------+
|      1. Controller Layer    | (@RestController)
|      (Routing, Validation)  |
+-----------------------------+
               | (DTOs)
               v
+-----------------------------+
|      2. Service Layer       | (@Service)
|     (Business Logic, TX)    |
+-----------------------------+
               | (Entities)
               v
+-----------------------------+
|      3. Repository Layer    | (@Repository)
|    (Database Interactions)  |
+-----------------------------+
               | (SQL)
               v
         [ Database ]
      `} />

      <SDHeading2>1. The Controller Layer (API)</SDHeading2>
      <SDParagraph>
        The outermost layer. It is the only layer that should know about HTTP (Headers, Status Codes, JSON).
      </SDParagraph>
      <SDList>
        <li><strong>Responsibility:</strong> Receive requests, validate input (`@Valid`), call the Service layer, and return HTTP responses (`ResponseEntity`).</li>
        <li><strong>Rule:</strong> NEVER put business logic (like calculating discounts or hashing passwords) in a controller.</li>
        <li><strong>Rule:</strong> Controllers should take DTOs (Data Transfer Objects) as input, never database Entities.</li>
      </SDList>

      <SDHeading2>2. The Service Layer (Business Logic)</SDHeading2>
      <SDParagraph>
        The heart of the application. This is where your actual programming skills are used.
      </SDParagraph>
      <SDList>
        <li><strong>Responsibility:</strong> Execute business rules. Check if a user exists, process a payment, trigger emails.</li>
        <li><strong>Transactions:</strong> This layer manages Database Transactions (`@Transactional`). If a payment succeeds but saving the order fails, the Service layer rolls everything back.</li>
        <li><strong>Rule:</strong> Services should not know about HTTP requests or UI constraints. They just take plain Java objects and return plain Java objects.</li>
      </SDList>

      <SDHeading2>3. The Repository Layer (Data Access)</SDHeading2>
      <SDParagraph>
        The layer that talks to the database. Usually implemented using Spring Data JPA.
      </SDParagraph>
      <SDList>
        <li><strong>Responsibility:</strong> Save, find, update, and delete Entities from the database.</li>
        <li><strong>Rule:</strong> Repositories should only deal with Entities (objects mapped directly to database tables).</li>
      </SDList>

      <SDHeading2>The Golden Rule: DTOs vs Entities</SDHeading2>
      <SDParagraph>
        The most common mistake juniors make is returning a Database Entity directly from a Controller. 
      </SDParagraph>
      <div className="bg-muted/30 p-6 rounded-lg border border-border my-4">
        <h4 className="font-semibold mb-2">Why you must use DTOs (Data Transfer Objects):</h4>
        <ul className="list-disc ml-6 space-y-2 text-sm text-muted-foreground">
          <li><strong>Security:</strong> An Entity might have `passwordHash`. If you return the Entity directly, you accidentally leak passwords to the frontend! A `UserResponseDTO` explicitly excludes the password.</li>
          <li><strong>Decoupling:</strong> If you rename a database column (changing the Entity), and you return Entities directly, your API response changes instantly, breaking mobile apps. DTOs act as a shield.</li>
          <li><strong>Performance:</strong> Entities often have lazy-loaded relationships (e.g., `User` has a list of `Orders`). Returning the Entity might accidentally trigger massive N+1 queries as Jackson tries to serialize the JSON.</li>
        </ul>
      </div>

      <RememberBlock>
        Flow of data: Controller takes a RequestDTO &rarr; Controller passes it to Service &rarr; Service converts DTO to Entity &rarr; Service saves Entity via Repository &rarr; Service converts Entity back to ResponseDTO &rarr; Controller returns ResponseDTO.
      </RememberBlock>

      <InterviewQuestion 
        question="Where should you put the @Transactional annotation, and why?"
        answer={
          <div>
            <p><strong>@Transactional should almost always be placed on the Service layer.</strong></p>
            <p className="mt-2">A single business operation (like "Checkout") often involves multiple database calls (e.g., creating an Order, deducting Inventory, saving a Payment record). If you put <code>@Transactional</code> on the Repository methods individually, each database call runs in its own transaction. If the inventory deducts successfully but the payment fails, the inventory is not rolled back!</p>
            <p className="mt-2">By putting it on the Service method, Spring wraps the ENTIRE business operation in one transaction. If anything fails, everything rolls back together.</p>
          </div>
        }
      />

    </div>
  );
}

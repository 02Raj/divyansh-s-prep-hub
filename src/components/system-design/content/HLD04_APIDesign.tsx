import { SDTitle, SDHeading2, SDParagraph, SDList, RememberBlock, InterviewQuestion, CommonMistake } from '../ui/SystemDesignUI';

export default function HLD04APIDesign() {
  return (
    <div className="max-w-4xl">
      <SDTitle>HLD-04: API Design (REST, GraphQL, gRPC)</SDTitle>
      
      <SDParagraph>
        An API (Application Programming Interface) is how different parts of a system talk to each other. During a system design interview, designing a clean, scalable API is a critical step. 
      </SDParagraph>

      <SDHeading2>1. API Paradigms</SDHeading2>
      
      <div className="space-y-6 mt-4">
        <div className="bg-muted/30 p-6 rounded-lg border border-border">
          <h4 className="font-semibold text-lg mb-2">REST (Representational State Transfer)</h4>
          <p className="text-muted-foreground text-sm mb-3">
            The industry standard. Uses standard HTTP methods (GET, POST, PUT, DELETE) and treats everything as a "Resource" (like a User or a Tweet).
          </p>
          <ul className="list-disc ml-6 space-y-1 text-sm text-muted-foreground">
            <li><strong>Pros:</strong> Simple, cacheable, heavily supported by all tools.</li>
            <li><strong>Cons:</strong> Over-fetching (getting more data than you need) or Under-fetching (needing multiple API calls to get all related data).</li>
            <li><strong>Example:</strong> `GET /api/v1/users/123`</li>
          </ul>
        </div>

        <div className="bg-muted/30 p-6 rounded-lg border border-border">
          <h4 className="font-semibold text-lg mb-2">GraphQL</h4>
          <p className="text-muted-foreground text-sm mb-3">
            Created by Facebook. Instead of multiple endpoints, there is only ONE endpoint. The client asks for exactly the fields it wants, and the server returns exactly that.
          </p>
          <ul className="list-disc ml-6 space-y-1 text-sm text-muted-foreground">
            <li><strong>Pros:</strong> No over/under-fetching. Great for mobile apps on slow networks.</li>
            <li><strong>Cons:</strong> Hard to cache at the network level. Can lead to complex, heavy queries hitting your database (the N+1 problem).</li>
            <li><strong>Example:</strong> <code>POST /graphql</code> with body <code>{"query { user(id: 123) { name, email } }"}</code></li>
          </ul>
        </div>

        <div className="bg-muted/30 p-6 rounded-lg border border-border">
          <h4 className="font-semibold text-lg mb-2">gRPC (Google Remote Procedure Call)</h4>
          <p className="text-muted-foreground text-sm mb-3">
            Uses HTTP/2 and Protocol Buffers (binary format instead of JSON). It feels like you are calling a local Java method, but it actually executes on another server.
          </p>
          <ul className="list-disc ml-6 space-y-1 text-sm text-muted-foreground">
            <li><strong>Pros:</strong> EXTREMELY fast. Payload is much smaller than JSON.</li>
            <li><strong>Cons:</strong> Hard to debug (it's binary, you can't just read it in Postman easily).</li>
            <li><strong>Use Case:</strong> Backend-to-Backend communication (Microservice A calling Microservice B). Not typically used for Frontend-to-Backend.</li>
          </ul>
        </div>
      </div>

      <SDHeading2>2. Designing a Good REST API</SDHeading2>
      <SDList>
        <li><strong>Use Nouns, not Verbs:</strong> `GET /users` (Good). `GET /getUsers` (Bad).</li>
        <li><strong>Plurals:</strong> `POST /users` (Good). `POST /user` (Bad).</li>
        <li><strong>Nesting:</strong> To get tweets for a specific user: `GET /users/123/tweets`. Don't nest deeper than two levels.</li>
        <li><strong>Versioning:</strong> Always version your APIs from day one: `api.myapp.com/v1/users`. When you make breaking changes, release `v2`.</li>
      </SDList>

      <SDHeading2>3. API Scalability Features</SDHeading2>
      <SDParagraph>
        If your API becomes popular, you must protect it from crashing.
      </SDParagraph>
      <SDList>
        <li>
          <strong className="text-foreground">Pagination:</strong> 
          Never return a list of 10,000 items. Use <strong>Cursor-based pagination</strong> (e.g., `?after=cursor123&limit=20`) instead of Offset-based pagination (`?page=500`), because Offset pagination gets extremely slow on large databases.
        </li>
        <li>
          <strong className="text-foreground">Rate Limiting:</strong> 
          Prevent abuse. Limit users to "100 requests per minute". Usually implemented in the API Gateway using a Redis cache (Token Bucket algorithm).
        </li>
        <li>
          <strong className="text-foreground">Idempotency:</strong> 
          If an API call fails due to a network timeout, the client will retry. If it's a "Charge Credit Card" API, a retry might charge the user twice! An API is <strong>Idempotent</strong> if calling it 1 time or 100 times has the exact same result. Use an `Idempotency-Key` header.
        </li>
      </SDList>

      <InterviewQuestion 
        question="When would you choose GraphQL over REST?"
        answer={
          <div>
            <p>I would choose GraphQL if I am building a mobile application where bandwidth is limited, and the UI has complex, nested data requirements (e.g., a Facebook feed showing a User, their Posts, and the Comments on those posts). GraphQL allows the client to fetch all of this in a single network request without over-fetching unneeded data.</p>
            <p className="mt-2">For a simple public API or a server-to-server integration, I would stick to REST because it's simpler and easier to cache.</p>
          </div>
        }
      />

      <CommonMistake>
        Using `GET` requests to modify data. `GET` should ONLY read data and must be "safe" to call multiple times. Never design an API like `GET /api/deleteUser?id=5`. Use `DELETE /api/users/5`.
      </CommonMistake>

    </div>
  );
}

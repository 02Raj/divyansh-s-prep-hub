import { SDTitle, SDHeading2, SDParagraph, SDList, RememberBlock, InterviewQuestion, AsciiDiagram } from '../ui/SystemDesignUI';

export default function HLD02Architecture() {
  return (
    <div className="max-w-4xl">
      <SDTitle>HLD-02: Architecture & Gateways</SDTitle>
      
      <SDParagraph>
        Architecture is about how we organize our code, deploy it, and route traffic to it. In modern development, you must understand how requests enter your system and how your backend is structured.
      </SDParagraph>

      <SDHeading2>1. The Entry Points: Load Balancers & API Gateways</SDHeading2>
      <SDParagraph>
        Before a request even touches your Spring Boot code, it passes through infrastructure layers to ensure security and scale.
      </SDParagraph>

      <SDHeading3>Load Balancer (LB)</SDHeading3>
      <SDParagraph>
        A Load Balancer distributes incoming traffic across multiple servers so no single server gets overwhelmed. If a server crashes, the LB routes traffic to the healthy ones. 
      </SDParagraph>

      <SDHeading3>API Gateway</SDHeading3>
      <SDParagraph>
        An API Gateway (like Spring Cloud Gateway or AWS API Gateway) is the single entry point for all clients. It handles cross-cutting concerns before they reach your microservices.
      </SDParagraph>
      <SDList>
        <li><strong>Authentication:</strong> Verifies the JWT token so your microservices don't have to.</li>
        <li><strong>Rate Limiting:</strong> Stops a single user from making too many requests (preventing DDoS).</li>
        <li><strong>Routing:</strong> Routes `/api/users` to the User Service and `/api/orders` to the Order Service.</li>
      </SDList>

      <SDHeading2>2. Monolith Architecture</SDHeading2>
      <SDParagraph>
        All backend code (users, orders, payments) is compiled into a single Spring Boot application (`.jar` or `.war`) and deployed to a single server instance.
      </SDParagraph>
      <AsciiDiagram diagram={`
[ User (Client) ]
       |
       v
[ Load Balancer ]
       |
       v
[ Spring Boot Monolith ]
(Users + Orders + Payments)
       |
       v
  [ Database ]
      `} />
      <div className="bg-muted/30 p-4 rounded-lg border border-border my-4">
        <ul className="list-disc ml-6 space-y-2 text-sm text-muted-foreground">
          <li><strong>Good For:</strong> Small apps, startup MVPs, small teams (1-3 devs).</li>
          <li><strong>Problem:</strong> Code becomes spaghetti. Any small change requires deploying the entire massive app.</li>
        </ul>
      </div>

      <SDHeading2>3. Modular Monolith</SDHeading2>
      <SDParagraph>
        Still a single Spring Boot application, but the code is strictly separated into logical modules (e.g., using Java packages or Maven multi-module builds). The `Orders` module cannot directly query the `Payments` database tables.
      </SDParagraph>
      <div className="bg-muted/30 p-4 rounded-lg border border-border my-4">
        <ul className="list-disc ml-6 space-y-2 text-sm text-muted-foreground">
          <li><strong>Good For:</strong> Growing apps, medium teams.</li>
          <li><strong>Use When:</strong> Best starting point for MOST products today. It gives clean boundaries without network overhead.</li>
        </ul>
      </div>

      <SDHeading2>4. Microservices Architecture</SDHeading2>
      <SDParagraph>
        Each domain (Users, Orders, Payments) is a completely separate Spring Boot application with its own database. They communicate over the network (REST, gRPC, or Kafka).
      </SDParagraph>
      <AsciiDiagram diagram={`
                 [ User (Client) ]
                        |
                 [ Load Balancer ]
                        |
                 [ API Gateway ]
                 /      |      \\
                /       |       \\
[ User Service ] [ Order Service ] [ Payment Service ]
       |                |                  |
  [ User DB ]      [ Order DB ]       [ Payment DB ]
      `} />
      <div className="bg-muted/30 p-4 rounded-lg border border-border my-4">
        <ul className="list-disc ml-6 space-y-2 text-sm text-muted-foreground">
          <li><strong>Good For:</strong> Huge scale, massive engineering teams (e.g., Netflix, Uber) where hundreds of devs need to work independently.</li>
          <li><strong>Problem:</strong> Extreme operational complexity. Network calls can fail. Data consistency across multiple databases (Distributed Transactions) is notoriously hard.</li>
        </ul>
      </div>

      <RememberBlock>
        Start simple. Identify the bottleneck. Introduce complexity (like Microservices) ONLY when needed. A Modular Monolith behind a Load Balancer is highly scalable and almost always the right starting choice.
      </RememberBlock>

      <InterviewQuestion 
        question="Why can a modular monolith be a better starting point than microservices?"
        answer={
          <div>
            <p>Microservices introduce a heavy "distributed system tax": network latency, difficult debugging, complex CI/CD pipelines, and distributed transactions.</p>
            <p className="mt-2 text-primary">"A modular monolith gives you clean code boundaries (like microservices) but without the network overhead. If one module eventually needs to scale independently, it's very easy to extract it into a microservice later."</p>
          </div>
        }
      />
    </div>
  );
}

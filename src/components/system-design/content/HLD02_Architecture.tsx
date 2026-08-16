import { SDTitle, SDHeading2, SDParagraph, RememberBlock, InterviewQuestion, AsciiDiagram } from '../ui/SystemDesignUI';

export default function HLD02Architecture() {
  return (
    <div className="max-w-4xl">
      <SDTitle>HLD-02: Architecture Types</SDTitle>
      
      <SDParagraph>
        Architecture is about how we organize our code and deploy it. In modern Angular + Spring Boot development, there are a few primary ways to structure the backend.
      </SDParagraph>

      <SDHeading2>1. Monolith</SDHeading2>
      <SDParagraph>
        All backend code (users, orders, payments) is compiled into a single Spring Boot application (`.jar` or `.war`) and deployed to a single server instance.
      </SDParagraph>
      <AsciiDiagram diagram={`
[ User (Angular) ]
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
          <li><strong>Problem:</strong> Code becomes spaghetti. Any change requires deploying the entire app.</li>
          <li><strong>Example:</strong> A simple internal employee directory app.</li>
        </ul>
      </div>

      <SDHeading2>2. Modular Monolith</SDHeading2>
      <SDParagraph>
        Still a single Spring Boot application, but the code is strictly separated into logical modules (e.g., using Java packages or Maven/Gradle multi-module builds). `Orders` code cannot directly call the `Payments` database.
      </SDParagraph>
      <div className="bg-muted/30 p-4 rounded-lg border border-border my-4">
        <ul className="list-disc ml-6 space-y-2 text-sm text-muted-foreground">
          <li><strong>Good For:</strong> Growing apps, medium teams.</li>
          <li><strong>Problem:</strong> Still single deployment. Requires discipline to not break module boundaries.</li>
          <li><strong>Use When:</strong> Best starting point for MOST products today.</li>
        </ul>
      </div>

      <SDHeading2>3. Microservices</SDHeading2>
      <SDParagraph>
        Each domain (Users, Orders, Payments) is a completely separate Spring Boot application with its own database. They communicate over the network (REST or Kafka).
      </SDParagraph>
      <AsciiDiagram diagram={`
                 [ User (Angular) ]
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
          <li><strong>Good For:</strong> Huge scale, massive engineering teams (e.g., Netflix, Uber).</li>
          <li><strong>Problem:</strong> Extreme operational complexity. Network calls can fail. Data consistency is hard.</li>
          <li><strong>Use When:</strong> Only when you have a strong reason (like needing to scale a specific part independently, or 100+ devs stepping on each other's toes).</li>
        </ul>
      </div>

      <RememberBlock>
        Start simple. Identify the bottleneck. Introduce complexity (like Microservices) ONLY when needed. A Modular Monolith is almost always the right starting choice.
      </RememberBlock>

      <InterviewQuestion 
        question="Why can a modular monolith be a better starting point than microservices?"
        answer={
          <div>
            <p>Microservices introduce a heavy "distributed system tax": network latency, difficult debugging, complex deployments, and distributed transactions.</p>
            <p className="mt-2 text-primary">"A modular monolith gives you clean code boundaries (like microservices) but without the network overhead. If one module eventually needs to scale independently, it's very easy to extract it into a microservice later."</p>
          </div>
        }
      />
    </div>
  );
}

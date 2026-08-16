import { SDTitle, SDHeading2, SDHeading3, SDParagraph, SDList, RememberBlock, InterviewQuestion, CommonMistake } from '../ui/SystemDesignUI';

export default function SystemDesignBasics() {
  return (
    <div className="max-w-4xl">
      <SDTitle>1. System Design Basics</SDTitle>
      
      <SDParagraph>
        System Design is the process of defining the architecture, components, modules, interfaces, and data for a system to satisfy specific requirements. It's about making choices that balance trade-offs.
      </SDParagraph>

      <RememberBlock>
        System Design is never about finding the "perfect" solution. It is about finding the "best trade-off" for your specific problem.
      </RememberBlock>

      <SDHeading2>Why System Design Matters</SDHeading2>
      <SDParagraph>
        When you build a small app, you don't need complex design. But when your app has millions of users, it can crash, become slow, or cost too much money. System Design prevents these failures by planning for scale before writing code.
      </SDParagraph>

      <SDHeading2>Core Concepts Explained Simply</SDHeading2>
      
      <div className="space-y-8 mt-6">
        <div>
          <SDHeading3>1. Functional Requirements</SDHeading3>
          <SDParagraph>
            <strong>Simple meaning:</strong> What the system MUST do. The core features.
          </SDParagraph>
          <SDParagraph>
            <strong>Real application example:</strong> "Users must be able to log in", "Users must be able to upload a profile picture."
          </SDParagraph>
        </div>

        <div>
          <SDHeading3>2. Non-functional Requirements</SDHeading3>
          <SDParagraph>
            <strong>Simple meaning:</strong> How WELL the system must do it. The quality of the system.
          </SDParagraph>
          <SDParagraph>
            <strong>Real application example:</strong> "The login API must respond in under 200 milliseconds", "The system must be highly available (99.99% uptime)."
          </SDParagraph>
        </div>

        <div>
          <SDHeading3>3. Scalability</SDHeading3>
          <SDParagraph>
            <strong>Simple meaning:</strong> Can the system handle more users without slowing down?
          </SDParagraph>
          <SDParagraph>
            <strong>Real application example:</strong> If Flipkart gets 10x more traffic during a Big Billion Days sale, the servers should automatically add more capacity instead of crashing.
          </SDParagraph>
        </div>

        <div>
          <SDHeading3>4. Availability</SDHeading3>
          <SDParagraph>
            <strong>Simple meaning:</strong> Is the system online right now? 
          </SDParagraph>
          <SDParagraph>
            <strong>Why we need it:</strong> If a payment gateway goes down, the company loses money every second.
          </SDParagraph>
        </div>

        <div>
          <SDHeading3>5. Reliability</SDHeading3>
          <SDParagraph>
            <strong>Simple meaning:</strong> Does the system do the right thing consistently?
          </SDParagraph>
          <SDParagraph>
            <strong>Real application example:</strong> If you transfer $100, the money should exactly leave your account and arrive in the other account. It should never randomly fail halfway.
          </SDParagraph>
        </div>
      </div>

      <SDHeading2>How to Think About a System</SDHeading2>
      <SDParagraph>
        Never jump straight to "Let's use Kafka and Microservices". Always follow this step-by-step thinking process:
      </SDParagraph>

      <div className="bg-muted/30 p-6 rounded-lg font-mono text-sm border border-border my-6">
        <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
          <li><strong className="text-foreground">Requirement:</strong> What are we building? (e.g., A food delivery app)</li>
          <li><strong className="text-foreground">Users / Actors:</strong> Who is using it? (Customer, Restaurant, Delivery Agent)</li>
          <li><strong className="text-foreground">Use Cases:</strong> What can they do? (Order food, Accept order, Update location)</li>
          <li><strong className="text-foreground">API / Interface:</strong> How do they communicate? (REST API for mobile app)</li>
          <li><strong className="text-foreground">Components:</strong> What backend parts do we need? (Order Service, Payment Service)</li>
          <li><strong className="text-foreground">Data:</strong> Where do we store it? (PostgreSQL for orders, Redis for active carts)</li>
          <li><strong className="text-foreground">Scale / Failure:</strong> What if a database crashes? (Add replicas)</li>
        </ol>
      </div>

      <InterviewQuestion 
        question="What is the difference between Scalability and Availability?"
        answer={
          <div>
            <p><strong>Scalability</strong> is about handling increased load. If traffic doubles, can you add more servers to handle it?</p>
            <p className="mt-2"><strong>Availability</strong> is about uptime. If a server crashes, does the system stay online for users?</p>
            <p className="mt-2 text-primary">"A system can be highly scalable but not highly available if it crashes frequently despite having lots of resources."</p>
          </div>
        }
      />

      <CommonMistake>
        Starting a design by picking technologies (like MongoDB or Kafka) before fully understanding the Functional and Non-functional requirements. Always define the problem first, then pick the technology that solves it.
      </CommonMistake>
    </div>
  );
}

import { SDTitle, SDHeading2, SDHeading3, SDParagraph, SDList, RememberBlock, InterviewQuestion, CommonMistake } from '../ui/SystemDesignUI';

export default function HLD01Requirements() {
  return (
    <div className="max-w-4xl">
      <SDTitle>HLD-01: Requirements Engineering</SDTitle>
      
      <SDParagraph>
        Before you draw a single box on a whiteboard or write a single line of code, you must understand exactly what you are building. The first step of High-Level Design (HLD) is breaking down the problem statement into concrete requirements.
      </SDParagraph>

      <SDHeading2>1. Functional Requirements</SDHeading2>
      <SDParagraph>
        These define the core features of the system. What must the system actually DO?
      </SDParagraph>
      
      <div className="bg-muted/30 p-6 rounded-lg border border-border my-4">
        <h4 className="font-semibold mb-2">Example: E-Commerce App</h4>
        <ul className="list-disc ml-6 space-y-1 text-sm text-muted-foreground">
          <li>Users must be able to search for products.</li>
          <li>Users must be able to add items to a cart.</li>
          <li>Users must be able to securely checkout and pay.</li>
          <li>Sellers must be able to add new products.</li>
        </ul>
      </div>

      <SDHeading2>2. Non-Functional Requirements</SDHeading2>
      <SDParagraph>
        These define the quality attributes of the system. How well, how fast, or how securely must the system perform its functions?
      </SDParagraph>

      <div className="bg-muted/30 p-6 rounded-lg border border-border my-4">
        <h4 className="font-semibold mb-2">Example: E-Commerce App</h4>
        <ul className="list-disc ml-6 space-y-1 text-sm text-muted-foreground">
          <li><strong>Performance:</strong> Product search must return results in under 200ms.</li>
          <li><strong>Availability:</strong> The checkout system must have 99.99% uptime.</li>
          <li><strong>Consistency:</strong> Inventory numbers must be strictly consistent (we cannot sell a product we don't have).</li>
          <li><strong>Security:</strong> All payments must be PCI compliant.</li>
        </ul>
      </div>

      <RememberBlock>
        Functional requirements drive the API design. Non-functional requirements drive the architecture (database choices, caching, scaling).
      </RememberBlock>

      <SDHeading2>3. Scale Assumptions & Constraints</SDHeading2>
      <SDParagraph>
        You need to know the scale of the system to choose the right architecture. A system for 100 internal employees looks very different from a system for 10 million public users.
      </SDParagraph>

      <SDHeading3>How to estimate scale:</SDHeading3>
      <SDList>
        <li><strong>Traffic:</strong> How many Daily Active Users (DAU)? How many requests per second (RPS)?</li>
        <li><strong>Data Volume:</strong> How much data are we generating per day? (Helps decide database storage limits).</li>
        <li><strong>Read/Write Ratio:</strong> Is this system read-heavy (like Twitter) or write-heavy (like a logging system)? This heavily influences database and caching choices.</li>
      </SDList>

      <InterviewQuestion 
        question="How do you handle ambiguous requirements in a system design interview?"
        answer={
          <div>
            <p><strong>Never assume. Ask clarifying questions.</strong> If the interviewer says "Design YouTube", you should ask:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>"Are we designing just the video watching part, or also the video uploading part?"</li>
              <li>"What is the expected daily active user count?"</li>
              <li>"Do we need to support live streaming?"</li>
            </ul>
            <p className="mt-2 text-primary">Your ability to scope down a massive problem into a manageable 45-minute design is a key signal interviewers look for.</p>
          </div>
        }
      />

      <CommonMistake>
        Jumping straight into designing the database schema or picking AWS services before clearly listing out the 3-4 core use cases (Functional Requirements). If you don't define the scope, you will try to design everything and fail to design anything well.
      </CommonMistake>

    </div>
  );
}

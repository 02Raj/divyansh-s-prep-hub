import { SDTitle, SDHeading2, SDHeading3, SDParagraph, SDList, RememberBlock, InterviewQuestion, CommonMistake } from '../ui/SystemDesignUI';

export default function HLD01Requirements() {
  return (
    <div className="max-w-4xl">
      <SDTitle>HLD-01: Requirements & Capacity</SDTitle>
      
      <SDParagraph>
        Before you draw a single box on a whiteboard or write a single line of code, you must understand exactly what you are building. The first step of High-Level Design (HLD) is breaking down the problem statement into concrete requirements and estimating the scale.
      </SDParagraph>

      <SDHeading2>1. Functional Requirements</SDHeading2>
      <SDParagraph>
        These define the core features of the system. What must the system actually DO? Keep it to 3-4 core use cases.
      </SDParagraph>
      
      <div className="bg-muted/30 p-6 rounded-lg border border-border my-4">
        <h4 className="font-semibold mb-2">Example: Designing Twitter (X)</h4>
        <ul className="list-disc ml-6 space-y-1 text-sm text-muted-foreground">
          <li>Users must be able to post a tweet.</li>
          <li>Users must be able to follow other users.</li>
          <li>Users must be able to view their home feed (tweets from people they follow).</li>
        </ul>
      </div>

      <SDHeading2>2. Non-Functional Requirements</SDHeading2>
      <SDParagraph>
        These define the quality attributes of the system. How well, how fast, or how securely must the system perform its functions?
      </SDParagraph>

      <div className="bg-muted/30 p-6 rounded-lg border border-border my-4">
        <h4 className="font-semibold mb-2">Example: Designing Twitter (X)</h4>
        <ul className="list-disc ml-6 space-y-1 text-sm text-muted-foreground">
          <li><strong>Performance:</strong> Generating the home feed must take less than 200ms.</li>
          <li><strong>Availability:</strong> The system must be highly available (99.99% uptime). It's okay if a tweet shows up 2 seconds late, but the site shouldn't crash.</li>
          <li><strong>Scalability:</strong> Must handle viral events (like the Super Bowl or Elections) gracefully.</li>
        </ul>
      </div>

      <RememberBlock>
        Functional requirements drive the API design. Non-functional requirements drive the architecture (database choices, caching, scaling).
      </RememberBlock>

      <SDHeading2>3. Capacity Estimation (Back-of-the-Envelope Math)</SDHeading2>
      <SDParagraph>
        You need to estimate the scale of the system to choose the right architecture. This proves you can design for reality, not just theory.
      </SDParagraph>

      <SDHeading3>Key Metrics to Estimate:</SDHeading3>
      <SDList>
        <li><strong>Traffic (RPS):</strong> How many Requests Per Second? (DAU * requests per user / 86400 seconds)</li>
        <li><strong>Storage:</strong> How much data are we saving per day? Per year? (Do we need sharding?)</li>
        <li><strong>Bandwidth:</strong> How much network traffic? (Important for streaming or image-heavy apps).</li>
      </SDList>

      <div className="bg-muted/30 p-6 rounded-lg border border-border my-4">
        <h4 className="font-semibold mb-2">Example Math: URL Shortener</h4>
        <ul className="list-disc ml-6 space-y-2 text-sm text-muted-foreground">
          <li><strong>Assumptions:</strong> 100 Million links generated per month. Read/Write ratio is 10:1 (1 Billion reads per month).</li>
          <li><strong>Write RPS:</strong> 100M / (30 days * 24h * 3600s) ≈ <strong>40 Requests/sec</strong>.</li>
          <li><strong>Read RPS:</strong> 1B / (30 days * 24h * 3600s) ≈ <strong>400 Requests/sec</strong>.</li>
          <li><strong>Storage:</strong> If 1 link = 500 bytes. 100M links * 500 bytes = <strong>50 GB / month</strong>. Over 5 years = 3 TB.</li>
          <li><strong>Conclusion:</strong> 40 RPS is very low (a single Spring Boot app handles this easily). But 3 TB over 5 years means we should pick a database that scales storage well, like Cassandra or Amazon DynamoDB, rather than keeping everything in memory.</li>
        </ul>
      </div>

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
        Jumping straight into designing the database schema or picking AWS services before clearly listing out the 3-4 core use cases and doing basic math. If you don't define the scope, you will try to design everything and fail to design anything well.
      </CommonMistake>

    </div>
  );
}

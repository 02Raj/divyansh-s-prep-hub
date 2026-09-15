import {
  SDTitle,
  SDHeading2,
  SDHeading3,
  SDParagraph,
  SDList,
  PlainEnglish,
  HLDvsLLD,
  RememberBlock,
  InterviewQuestion,
  CommonMistake,
  LevelBadge,
  NextLesson,
} from '../ui/SystemDesignUI';

export default function SystemDesignBasics() {
  return (
    <div className="max-w-4xl">
      <LevelBadge level="Beginner" />
      <SDTitle>Core ideas in simple English</SDTitle>

      <PlainEnglish>
        System design = <strong>plan how your application works</strong> when real users show up — not just on your laptop.
        You decide what features you need, how fast it must be, and what happens when something breaks.
      </PlainEnglish>

      <HLDvsLLD />

      <RememberBlock>
        There is no single perfect design. There is only the <strong>best trade-off</strong> for your users, team, and budget.
      </RememberBlock>

      <SDHeading2>Words you must know (easy definitions)</SDHeading2>

      <div className="space-y-8 mt-6">
        <div>
          <SDHeading3>Functional requirements</SDHeading3>
          <SDParagraph>
            <strong>What the app must do.</strong> Example: “User can sign in”, “User can place an order”.
          </SDParagraph>
        </div>

        <div>
          <SDHeading3>Non-functional requirements</SDHeading3>
          <SDParagraph>
            <strong>How well it must work.</strong> Example: “Page loads in under 2 seconds”, “Works 99.9% of the time”.
          </SDParagraph>
        </div>

        <div>
          <SDHeading3>Scalability</SDHeading3>
          <SDParagraph>
            Can you handle <strong>more users</strong> without the app dying? Usually by adding more servers (horizontal scale),
            not one giant server.
          </SDParagraph>
        </div>

        <div>
          <SDHeading3>Availability</SDHeading3>
          <SDParagraph>
            Is the app <strong>online</strong> when users need it? If one server crashes, others should still serve traffic.
          </SDParagraph>
        </div>

        <div>
          <SDHeading3>Reliability</SDHeading3>
          <SDParagraph>
            Does the app do the <strong>right thing every time</strong>? Pay ₹100 once → money moves once, not twice or zero.
          </SDParagraph>
        </div>
      </div>

      <SDHeading2>7-step habit (use in every interview)</SDHeading2>
      <SDParagraph>Do not jump to “Let’s use Kafka.” Walk through this list:</SDParagraph>

      <div className="bg-muted/30 p-6 rounded-lg font-mono text-sm border border-border my-6">
        <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
          <li>
            <strong className="text-foreground">Problem:</strong> What are we building?
          </li>
          <li>
            <strong className="text-foreground">Users:</strong> Who uses it?
          </li>
          <li>
            <strong className="text-foreground">Use cases:</strong> Top 3–4 actions
          </li>
          <li>
            <strong className="text-foreground">API:</strong> How client talks to server (REST, etc.)
          </li>
          <li>
            <strong className="text-foreground">Services:</strong> Which backend parts (order, payment…)
          </li>
          <li>
            <strong className="text-foreground">Data:</strong> Where data lives (SQL, cache…)
          </li>
          <li>
            <strong className="text-foreground">Failure & scale:</strong> Replicas, cache, queues
          </li>
        </ol>
      </div>

      <InterviewQuestion
        question="What is the difference between Scalability and Availability?"
        answer={
          <div>
            <p>
              <strong>Scalability</strong> = handling more load (more users, more requests).
            </p>
            <p className="mt-2">
              <strong>Availability</strong> = staying up when parts fail.
            </p>
            <p className="mt-2 text-primary">
              You can scale huge but still go down if you have no backup servers — so you need both.
            </p>
          </div>
        }
      />

      <CommonMistake>
        Picking MongoDB, Kafka, or microservices before you write requirements. Understand the problem first; then pick tools.
      </CommonMistake>

      <NextLesson title="HLD Step 1 — What are we building?" />
    </div>
  );
}

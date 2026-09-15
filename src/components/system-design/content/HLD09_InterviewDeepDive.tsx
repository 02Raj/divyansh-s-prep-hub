import {
  SDTitle,
  SDHeading2,
  SDParagraph,
  PlainEnglish,
  StepByStep,
  RememberBlock,
  InterviewQuestion,
  CommonMistake,
  LevelBadge,
  NextLesson,
} from '../ui/SystemDesignUI';

export default function HLD09InterviewDeepDive() {
  return (
    <div className="max-w-4xl">
      <LevelBadge level="Advanced" />
      <SDTitle>HLD Step 9 — Interview Deep Dive & Trade-offs</SDTitle>

      <PlainEnglish>
        Senior interviews are not “name every tool.” They check if you can <strong>compare options</strong>,{' '}
        <strong>admit limits</strong>, and <strong>fix bottlenecks</strong> when the interviewer pokes holes.
      </PlainEnglish>

      <SDHeading2>Phrases that sound professional (use these)</SDHeading2>
      <ul className="my-4 ml-6 list-disc space-y-2 text-muted-foreground">
        <li>“Let me clarify scope before I draw…”</li>
        <li>“I’ll start simple — monolith or modular monolith — and split only if scale forces it.”</li>
        <li>“Reads dominate, so I’ll add cache; writes are low, so one primary DB is fine for now.”</li>
        <li>“This is eventually consistent; for money I’d use a strong transaction on the ledger service.”</li>
        <li>“If this service fails, circuit breaker returns fallback and we retry async.”</li>
      </ul>

      <SDHeading2>When interviewer says “What if traffic 10×?”</SDHeading2>
      <StepByStep
        steps={[
          { title: 'Horizontal scale', body: 'More stateless app instances behind load balancer.' },
          { title: 'Cache', body: 'Redis for hot keys; CDN for static assets.' },
          { title: 'DB', body: 'Read replicas; then sharding if writes or size explode.' },
          { title: 'Async', body: 'Move non-critical work to queue; protect DB from spikes.' },
          { title: 'Degrade gracefully', body: 'Disable recommendations before dropping checkout.' },
        ]}
      />

      <SDHeading2>When interviewer says “Single point of failure?”</SDHeading2>
      <SDParagraph>
        Name it honestly: one DB, one region, one queue without mirror. Fix: multi-AZ replicas, health checks, automated
        failover, backups, chaos testing in staging.
      </SDParagraph>

      <SDHeading2>SQL vs NoSQL (simple rule)</SDHeading2>
      <SDParagraph>
        <strong>SQL</strong> when relationships and ACID matter (orders, payments, inventory).{' '}
        <strong>NoSQL</strong> when schema flexes, huge scale, or simple key-value access (session, feed cache, logs). Many
        systems use <strong>both</strong>.
      </SDParagraph>

      <InterviewQuestion
        question="Why not microservices on day one?"
        answer={
          <p>
            Microservices add network calls, deployment pain, and distributed debugging. For a new product, a{' '}
            <strong>modular monolith</strong> ships faster. Split when teams or scale block you — not because Netflix did it.
          </p>
        }
      />

      <CommonMistake>
        Drawing 12 microservices without data flow or storage numbers. Interviewers want one clear path through the system and
        one deep area — not a sticker chart of logos.
      </CommonMistake>

      <RememberBlock>
        End every design with: “If I had another week, I’d load-test, add tracing, and document failure modes.” That shows
        production mindset.
      </RememberBlock>
      <NextLesson title="LLD Step 1 — SOLID & clean code" />
    </div>
  );
}

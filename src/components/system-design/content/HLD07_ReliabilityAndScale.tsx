import {
  SDTitle,
  SDHeading2,
  SDHeading3,
  SDParagraph,
  SDList,
  PlainEnglish,
  StepByStep,
  RememberBlock,
  InterviewQuestion,
  AsciiDiagram,
  LevelBadge,
  NextLesson,
} from '../ui/SystemDesignUI';

export default function HLD07ReliabilityAndScale() {
  return (
    <div className="max-w-4xl">
      <LevelBadge level="Advanced" />
      <SDTitle>HLD Step 7 — Reliability, CAP & Modern Scaling</SDTitle>

      <PlainEnglish>
        So far you drew boxes. Now you answer: <strong>What breaks in real life?</strong> Servers die, networks lag, and two
        users click “Pay” at the same time. This lesson is about staying online and staying correct.
      </PlainEnglish>

      <SDHeading2>CAP theorem (simple version)</SDHeading2>
      <SDParagraph>
        In a distributed system (many servers), you can only fully guarantee <strong>two out of three</strong> at once during
        a network failure:
      </SDParagraph>
      <SDList>
        <li>
          <strong className="text-foreground">C — Consistency:</strong> every read sees the latest write
        </li>
        <li>
          <strong className="text-foreground">A — Availability:</strong> every request gets a response (even if not the newest
          data)
        </li>
        <li>
          <strong className="text-foreground">P — Partition tolerance:</strong> the system keeps working when network links
          break between data centers
        </li>
      </SDList>
      <RememberBlock>
        Real networks fail (P is non-optional in cloud). So you choose CP (strong consistency, may reject requests) or AP
        (always respond, data may be briefly stale). Most user-facing apps pick <strong>AP + eventual consistency</strong>{' '}
        for feeds and caches; banks pick <strong>CP</strong> for balances.
      </RememberBlock>

      <SDHeading2>Replication & read replicas</SDHeading2>
      <SDParagraph>
        One database is a single point of failure. You add a <strong>primary</strong> (writes) and{' '}
        <strong>replicas</strong> (reads).
      </SDParagraph>
      <AsciiDiagram
        diagram={`
[ App writes ] -----> [ Primary DB ]
                           |
            (async copy)   +-------> [ Read Replica 1 ]
                           +-------> [ Read Replica 2 ]

[ App reads ]  --------------------> [ Read Replica ]
      `}
      />

      <SDHeading2>Sharding (when one DB is not enough)</SDHeading2>
      <SDParagraph>
        <strong>Sharding</strong> splits data by a key (e.g. user_id). User 1–1M on shard A, 1M–2M on shard B. Use when storage
        or write load exceeds one machine — not on day one.
      </SDParagraph>

      <SDHeading2>Modern scaling checklist</SDHeading2>
      <StepByStep
        steps={[
          { title: 'Stateless app servers', body: 'Session in Redis/JWT — any pod can serve any request.' },
          { title: 'Cache hot reads', body: 'Redis in front of DB for profiles, product pages, config.' },
          { title: 'Async heavy work', body: 'Email, PDF, analytics → Kafka/SQS, return 202 Accepted.' },
          { title: 'Auto-scale', body: 'Kubernetes HPA on CPU/RPS; load balancer health checks.' },
          { title: 'Observe', body: 'Metrics + alerts before users complain.' },
        ]}
      />

      <InterviewQuestion
        question="How do you handle two users updating the same row at the same time?"
        answer={
          <p>
            Use <strong>optimistic locking</strong> (@Version in JPA), or <strong>pessimistic lock</strong> for critical money
            moves. Explain which you pick: version column for most CRUD; SELECT FOR UPDATE for wallet debit.
          </p>
        }
      />
      <NextLesson title="HLD Step 8 — Famous systems walkthrough" />
    </div>
  );
}

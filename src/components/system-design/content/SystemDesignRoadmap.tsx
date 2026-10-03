import {
  SDTitle,
  SDHeading2,
  SDParagraph,
  PlainEnglish,
  StepByStep,
  HLDvsLLD,
  RememberBlock,
  LevelBadge,
} from '../ui/SystemDesignUI';

export default function SystemDesignRoadmap() {
  return (
    <div className="max-w-4xl">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <LevelBadge level="Beginner" />
        <span className="text-sm text-muted-foreground">Start here — no prior system design needed</span>
      </div>
      <SDTitle>System Design Course — Start Here</SDTitle>

      <PlainEnglish>
        System design means: <strong>plan how your app works before you scale it</strong>. You answer two questions —
        “What do users need?” (features) and “What if millions of people use it?” (speed, uptime, cost). This course goes
        from zero to interview-ready in <strong>simple English</strong>, step by step.
      </PlainEnglish>

      <HLDvsLLD />

      <SDHeading2>How to use this course (read in order)</SDHeading2>
      <StepByStep
        steps={[
          {
            title: 'Basics + easy glossary',
            body: 'Learn the thinking habit first. Keep the 50-word glossary open whenever a term feels unfamiliar.',
          },
          {
            title: 'HLD track (Steps 1–11)',
            body: 'Requirements to production: APIs, data, cache, queues, reliability, DDIA essentials, observability, security, deployment, and recovery.',
          },
          {
            title: 'LLD track (Steps 0–8)',
            body: 'OOP modelling, SOLID, patterns, Spring layers, JPA, concurrency, DDD/hexagonal design, testing, and common interview blueprints.',
          },
          {
            title: 'Practice out loud',
            body: 'Pick one HLD and one LLD case. Explain requirements, design, failure, and trade-offs aloud—then use the resource page only for weak areas.',
          },
        ]}
      />

      <SDHeading2>What “modern” system design includes (2024–2026)</SDHeading2>
      <SDParagraph>
        Interviews still test fundamentals, but production systems almost always mix these ideas:
      </SDParagraph>
      <ul className="my-4 ml-6 list-disc space-y-2 text-muted-foreground">
        <li>
          <strong className="text-foreground">Cloud + containers</strong> — Docker images, Kubernetes pods, health checks
        </li>
        <li>
          <strong className="text-foreground">APIs</strong> — REST for most apps; gRPC inside services when speed matters
        </li>
        <li>
          <strong className="text-foreground">Data</strong> — SQL for money/orders; Redis for cache; Kafka for async events
        </li>
        <li>
          <strong className="text-foreground">Resilience</strong> — load balancers, circuit breakers, idempotent APIs, retries
        </li>
        <li>
          <strong className="text-foreground">Observability</strong> — logs, metrics, tracing (Actuator, Prometheus, Grafana)
        </li>
      </ul>

      <SDHeading2>45-minute interview map (memorize this flow)</SDHeading2>
      <StepByStep
        steps={[
          { title: 'Clarify (5 min)', body: 'Who uses it? Read or write heavy? How many users? Must it be real-time?' },
          { title: 'Requirements (5 min)', body: '3–4 features + 2–3 non-functional goals (latency, uptime).' },
          { title: 'Estimate (5 min)', body: 'Rough requests/sec and storage — order of magnitude is enough.' },
          { title: 'High-level diagram (10 min)', body: 'Client → LB/Gateway → services → DB/cache/queue.' },
          { title: 'Deep dive (15 min)', body: 'Pick 1–2 parts: feed, search, payments, or data model.' },
          { title: 'Trade-offs (5 min)', body: 'What you chose, what you skipped, and why.' },
        ]}
      />

      <RememberBlock>
        You are not graded on memorizing Kafka. You are graded on <strong>clear thinking</strong>, reasonable numbers, and
        honest trade-offs. Simple design that works beats a fancy diagram you cannot explain.
      </RememberBlock>

      <SDHeading2>Difficulty levels in the sidebar</SDHeading2>
      <SDParagraph>
        <LevelBadge level="Beginner" /> Basics and first HLD lessons &nbsp;
        <LevelBadge level="Intermediate" /> APIs, DB, cache, LLD Spring &nbsp;
        <LevelBadge level="Advanced" /> Case studies, sharding, class-design interviews
      </SDParagraph>
    </div>
  );
}

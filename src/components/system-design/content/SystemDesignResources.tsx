import { ExternalLink } from 'lucide-react';
import {
  LevelBadge,
  PlainEnglish,
  RememberBlock,
  SDHeading2,
  SDList,
  SDParagraph,
  SDTitle,
  StepByStep,
} from '../ui/SystemDesignUI';

const resources = [
  {
    title: 'Designing Data-Intensive Applications, 2nd Edition',
    url: 'https://www.oreilly.com/library/view/designing-data-intensive-applications/9781098119058/',
    level: 'Deep understanding',
    use: 'Read selected topics: requirements/trade-offs, data models, storage/indexes, replication, sharding, transactions, distributed failures, consistency, and streams.',
  },
  {
    title: 'Martin Kleppmann — talks and publications',
    url: 'https://martin.kleppmann.com/',
    level: 'Deep understanding',
    use: 'Use talks when a DDIA topic feels too abstract; return to the book for precise trade-offs.',
  },
  {
    title: 'Google Site Reliability Engineering book',
    url: 'https://sre.google/sre-book/table-of-contents/',
    level: 'Production',
    use: 'Focus on SLOs, error budgets, monitoring distributed systems, overload, incident response, and practical reliability.',
  },
  {
    title: 'Azure Architecture Center',
    url: 'https://learn.microsoft.com/en-us/azure/architecture/',
    level: 'Architecture patterns',
    use: 'Free reference architectures, cloud design patterns, technology choices, and well-architected trade-offs. Concepts transfer to other clouds.',
  },
  {
    title: 'System Design Primer',
    url: 'https://github.com/donnemartin/system-design-primer',
    level: 'Beginner + interview revision',
    use: 'Use for visual summaries, common components, questions, and quick revision—then verify details in primary documentation.',
  },
  {
    title: 'Spring Boot production-ready features',
    url: 'https://docs.spring.io/spring-boot/reference/actuator/',
    level: 'Java/Spring mapping',
    use: 'Health, metrics, tracing/observations, management endpoints, and production operations for Spring services.',
  },
  {
    title: 'Spring Modulith documentation',
    url: 'https://docs.spring.io/spring-modulith/reference/',
    level: 'Java architecture',
    use: 'Learn verifiable modular-monolith boundaries, application events, module tests, and documentation before jumping to microservices.',
  },
  {
    title: 'Microservices.io pattern catalog',
    url: 'https://microservices.io/patterns/',
    level: 'Distributed patterns',
    use: 'Saga, transactional outbox, API gateway, service discovery, database-per-service, CQRS, and their trade-offs.',
  },
  {
    title: 'Refactoring.Guru design patterns',
    url: 'https://refactoring.guru/design-patterns',
    level: 'LLD visual reference',
    use: 'Use the diagrams to learn intent and trade-offs. Do not force a pattern into every class design.',
  },
  {
    title: 'Testcontainers for Java',
    url: 'https://java.testcontainers.org/',
    level: 'Java testing',
    use: 'Integration-test Spring Boot with real PostgreSQL, Kafka, Redis, and other dependencies in disposable containers.',
  },
];

export default function SystemDesignResources() {
  return (
    <article>
      <div className="mb-4 flex flex-wrap gap-2"><LevelBadge level="Beginner" /><LevelBadge level="Advanced" /></div>
      <SDTitle>Trusted resources & what to learn from each</SDTitle>
      <PlainEnglish>
        Do not collect twenty resources. Complete this course once, practise designs aloud, and open an external resource only for the
        specific gap written below.
      </PlainEnglish>

      <div className="my-6 rounded-xl border border-blue-200 bg-blue-50 p-5 text-sm text-blue-950 dark:border-blue-900 dark:bg-blue-950/25 dark:text-blue-200">
        <strong>Book-name clarification:</strong> <em>Designing Data-Intensive Applications</em> has editions—the official second edition
        was published in February 2026. The popular <em>System Design Interview</em> series by Alex Xu is the one commonly sold as Volume 1
        and Volume 2.
      </div>

      <SDHeading2>DDIA: only the essentials you need first</SDHeading2>
      <StepByStep steps={[
        { title: 'Trade-offs & non-functional requirements', body: 'Reliability, scalability, maintainability, latency percentiles, load, and cloud/distributed costs.' },
        { title: 'Data models & storage', body: 'Relational/document choices, indexes, B-trees vs LSM-trees, OLTP vs analytics.' },
        { title: 'Replication & sharding', body: 'Lag, failover, partition keys, hot spots, and rebalancing.' },
        { title: 'Transactions & distributed failure', body: 'Isolation, race conditions, timeouts, clocks, partial failure, and safe retries.' },
        { title: 'Consistency & streams', body: 'Required read guarantees, consensus purpose, event logs, CDC, batch/stream processing, and derived views.' },
      ]} />
      <RememberBlock>
        First-time learner: do not begin by reading DDIA cover to cover. Learn one concept here, connect it to a Spring Boot project, then use the book to deepen that concept.
      </RememberBlock>

      <SDHeading2>Two learning paths</SDHeading2>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5 dark:border-emerald-900 dark:bg-emerald-950/20">
          <h3 className="font-semibold text-emerald-800 dark:text-emerald-300">First-time learner — 4 weeks</h3>
          <SDList>
            <li>Week 1: Roadmap, basics, requirements, request flow, API, database.</li>
            <li>Week 2: Cache, queue, reliability, data-intensive essentials.</li>
            <li>Week 3: LLD modelling, SOLID, patterns, Spring layers, JPA.</li>
            <li>Week 4: Case studies; explain one HLD and one LLD aloud every day.</li>
          </SDList>
        </div>
        <div className="rounded-xl border border-violet-200 bg-violet-50/60 p-5 dark:border-violet-900 dark:bg-violet-950/20">
          <h3 className="font-semibold text-violet-800 dark:text-violet-300">Experienced developer — 10-day revision</h3>
          <SDList>
            <li>Days 1–2: requirements, estimates, API/data decisions.</li>
            <li>Days 3–4: replication, sharding, transactions, consistency.</li>
            <li>Days 5–6: messaging, outbox, idempotency, resilience, SLOs.</li>
            <li>Days 7–8: DDD, hexagonal boundaries, concurrency, testing.</li>
            <li>Days 9–10: timed HLD + LLD mocks and trade-off review.</li>
          </SDList>
        </div>
      </div>

      <SDHeading2>Curated links</SDHeading2>
      <div className="grid gap-4">
        {resources.map(resource => (
          <a
            key={resource.url}
            href={resource.url}
            target="_blank"
            rel="noreferrer"
            className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50 hover:bg-muted/30"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="mb-2 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">{resource.level}</span>
                <h3 className="font-semibold text-foreground group-hover:text-primary">{resource.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{resource.use}</p>
                <code className="mt-3 block break-all text-xs text-muted-foreground">{resource.url}</code>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
            </div>
          </a>
        ))}
      </div>

      <SDHeading2>Final confidence checklist</SDHeading2>
      <SDParagraph>Before an interview, you should be able to do these without notes:</SDParagraph>
      <SDList>
        <li>Turn a vague prompt into functional requirements, NFRs, and rough numbers.</li>
        <li>Draw request flow and explain each component’s job.</li>
        <li>Choose SQL/NoSQL, cache, queue, replication, and partitioning from requirements.</li>
        <li>Explain consistency, idempotency, transaction boundaries, and failure handling.</li>
        <li>Define SLOs, observability, security, deployment, and disaster recovery.</li>
        <li>Model an LLD with invariants, responsibilities, patterns, concurrency, and tests.</li>
        <li>Map the design to controllers, services/use cases, domain objects, repositories, Kafka, Redis, and Actuator in Spring Boot.</li>
      </SDList>
    </article>
  );
}

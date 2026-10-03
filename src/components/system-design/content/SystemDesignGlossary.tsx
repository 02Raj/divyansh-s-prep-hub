import { LevelBadge, PlainEnglish, SDHeading2, SDTitle } from '../ui/SystemDesignUI';

const groups = [
  {
    title: 'Traffic & architecture',
    items: [
      ['Latency', 'Time taken by one request. Use percentiles, not only average.'],
      ['Throughput', 'Amount of work completed per second, such as requests/sec.'],
      ['Horizontal scaling', 'Add more machines or instances.'],
      ['Vertical scaling', 'Give one machine more CPU, memory, or disk.'],
      ['Load balancer', 'Spreads traffic across healthy service instances.'],
      ['API gateway', 'External entry point for routing and edge policies.'],
      ['CDN', 'Caches static or cacheable content near users.'],
      ['Stateless service', 'Any instance can handle the next request because durable session state is elsewhere.'],
      ['Modular monolith', 'One deployment with strongly separated internal business modules.'],
      ['Microservice', 'An independently owned and deployable service around a business capability.'],
    ],
  },
  {
    title: 'Data & correctness',
    items: [
      ['Index', 'Extra organized data that speeds selected queries but adds write/storage cost.'],
      ['Replication', 'Keep copies of the same data on multiple nodes.'],
      ['Sharding', 'Divide different data across multiple nodes.'],
      ['Transaction', 'A correctness boundary for a group of reads/writes.'],
      ['Isolation', 'Rules for what concurrent transactions can observe.'],
      ['Optimistic lock', 'Detect a conflicting update using a version and retry/reject.'],
      ['Pessimistic lock', 'Block competing access by locking the resource first.'],
      ['Strong consistency', 'Operations provide a defined latest/single-copy view.'],
      ['Eventual consistency', 'Copies can differ temporarily but converge later.'],
      ['Idempotency', 'Repeating the same logical operation has the same final effect.'],
    ],
  },
  {
    title: 'Cache, messaging & distributed systems',
    items: [
      ['Cache-aside', 'Application reads cache, then database on miss, then fills cache.'],
      ['Cache stampede', 'Many requests miss together and overload the source.'],
      ['Queue', 'Buffers work so producer and consumer do not need the same speed or availability.'],
      ['Event log', 'Ordered durable records that consumers read using positions/offsets.'],
      ['Consumer group', 'Consumers share partitions so a group processes records in parallel.'],
      ['Dead-letter queue', 'Parking place for messages that repeatedly fail processing.'],
      ['Saga', 'Distributed workflow using local transactions and compensating actions.'],
      ['Transactional outbox', 'Store state and an event record atomically, then publish the event later.'],
      ['Consensus', 'Nodes agree on one decision/order despite some failures.'],
      ['Split brain', 'Two partitions both believe they are allowed to act as leader.'],
    ],
  },
  {
    title: 'Reliability, operations & security',
    items: [
      ['Timeout', 'Maximum time allowed for one attempt.'],
      ['Retry', 'Repeat safe transient work with a limit, backoff, and jitter.'],
      ['Circuit breaker', 'Temporarily fail fast when a dependency is unhealthy.'],
      ['Bulkhead', 'Separate resource pools so one failure cannot consume everything.'],
      ['Rate limiter', 'Controls how much work a caller can create.'],
      ['SLI / SLO / SLA', 'Measured reliability / internal target / external promise.'],
      ['RPO / RTO', 'Acceptable data-loss window / acceptable recovery time.'],
      ['Observability', 'Understand internal state from metrics, logs, traces, and profiles.'],
      ['Authentication', 'Prove identity—who are you?'],
      ['Authorization', 'Check permission—what may you do?'],
    ],
  },
  {
    title: 'LLD & code design',
    items: [
      ['Entity', 'Object with identity and lifecycle.'],
      ['Value object', 'Immutable concept defined by its values, such as Money.'],
      ['Invariant', 'Business rule that must always remain true.'],
      ['Aggregate', 'Consistency boundary modified through one root.'],
      ['DTO', 'Data shape used to cross an API or application boundary.'],
      ['Cohesion', 'How strongly a class’s responsibilities belong together; higher is better.'],
      ['Coupling', 'How strongly parts depend on each other; reduce unnecessary coupling.'],
      ['Port and adapter', 'Core-owned interface and technology-specific implementation.'],
      ['Strategy pattern', 'Swap one business algorithm behind a common interface.'],
      ['State pattern', 'Behaviour changes according to explicit object state.'],
    ],
  },
];

export default function SystemDesignGlossary() {
  return (
    <article>
      <LevelBadge level="Beginner" />
      <SDTitle>System design glossary — 50 words in easy English</SDTitle>
      <PlainEnglish>
        Use this page whenever a lesson contains an unfamiliar word. Learn the one-line meaning first; depth will come from the examples.
      </PlainEnglish>
      {groups.map(group => (
        <section key={group.title}>
          <SDHeading2>{group.title}</SDHeading2>
          <div className="grid gap-3 sm:grid-cols-2">
            {group.items.map(([term, meaning]) => (
              <div key={term} className="rounded-lg border border-border bg-card p-4">
                <h3 className="font-semibold text-foreground">{term}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{meaning}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </article>
  );
}

import {
  AsciiDiagram,
  CodeMapping,
  CommonMistake,
  InterviewQuestion,
  LevelBadge,
  NextLesson,
  PlainEnglish,
  RememberBlock,
  SDHeading2,
  SDHeading3,
  SDList,
  SDParagraph,
  SDTitle,
  StepByStep,
} from '../ui/SystemDesignUI';

export default function HLD10DataIntensiveEssentials() {
  return (
    <article>
      <div className="mb-4 flex flex-wrap gap-2">
        <LevelBadge level="Intermediate" />
        <LevelBadge level="Advanced" />
      </div>
      <SDTitle>HLD Step 10 — Data-intensive systems, made simple</SDTitle>

      <PlainEnglish>
        A data system has one job: accept data, keep it safe, and return the correct data fast enough. The hard part is choosing
        what to sacrifice when data, users, machines, and failures grow.
      </PlainEnglish>

      <SDHeading2>The four questions behind every data decision</SDHeading2>
      <StepByStep
        steps={[
          { title: 'What is the access pattern?', body: 'Point lookup, range query, full-text search, graph traversal, analytics, or an event stream?' },
          { title: 'What must be correct?', body: 'Can a user see slightly old data, or can two people never book the same seat?' },
          { title: 'What is the load?', body: 'Reads/second, writes/second, data size, growth, hot keys, and peak traffic—not only averages.' },
          { title: 'What failure can we accept?', body: 'Define availability, data-loss tolerance (RPO), recovery time (RTO), and operational cost.' },
        ]}
      />

      <RememberBlock>
        Do not choose PostgreSQL, MongoDB, Kafka, or Redis first. Choose the required behaviour first; technology comes after it.
      </RememberBlock>

      <SDHeading2>1. OLTP vs analytics</SDHeading2>
      <div className="grid gap-4 md:grid-cols-2">
        <ConceptCard
          title="OLTP — run the product"
          body="Many small reads and writes: create order, update payment, fetch profile. Usually needs indexes, constraints, and short transactions."
          example="PostgreSQL/MySQL behind a Spring Boot API"
        />
        <ConceptCard
          title="OLAP — understand the product"
          body="Fewer but large scans: monthly revenue, user trends, BI dashboards. Column-oriented storage and pre-aggregation help."
          example="Warehouse/lake queried by analytics jobs"
        />
      </div>

      <CommonMistake>
        Running a huge analytics query on the same primary database that serves checkout traffic can slow the customer-facing path.
      </CommonMistake>

      <SDHeading2>2. What an index really does</SDHeading2>
      <SDParagraph>
        An index is extra organized data that makes some reads faster. The trade-off is more storage and more work on every write.
      </SDParagraph>
      <SDHeading3>B-tree vs LSM-tree — interview-level understanding</SDHeading3>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[620px] text-left text-sm">
          <thead className="bg-muted/60 text-foreground"><tr><th className="p-3">Choice</th><th className="p-3">Simple idea</th><th className="p-3">Usually strong at</th><th className="p-3">Cost</th></tr></thead>
          <tbody className="divide-y divide-border text-muted-foreground">
            <tr><td className="p-3 font-medium text-foreground">B-tree</td><td className="p-3">Update sorted pages in place</td><td className="p-3">Point/range reads, general OLTP</td><td className="p-3">Random writes, page splits</td></tr>
            <tr><td className="p-3 font-medium text-foreground">LSM-tree</td><td className="p-3">Append writes, merge sorted files later</td><td className="p-3">Heavy write throughput</td><td className="p-3">Compaction and read amplification</td></tr>
          </tbody>
        </table>
      </div>

      <SDParagraph>
        You normally do not select the internal tree directly. You select a database whose engine matches the workload, then validate
        it with production-like tests.
      </SDParagraph>

      <SDHeading2>3. Replication: copies for safety and reads</SDHeading2>
      <AsciiDiagram diagram={`Client writes
     |
  [Leader] -------- replication log --------> [Follower A]
     |                                        [Follower B]
  latest data                                  read copies`} />
      <SDList>
        <li><strong>Leader-follower:</strong> one leader accepts writes; followers copy its log.</li>
        <li><strong>Synchronous replication:</strong> safer before acknowledging, but increases latency and can reduce availability.</li>
        <li><strong>Asynchronous replication:</strong> faster, but a leader failure may lose the newest acknowledged-looking state.</li>
        <li><strong>Replication lag:</strong> a user writes, then reads from a follower and temporarily sees old data.</li>
      </SDList>
      <RememberBlock>
        Replication copies data; sharding divides data. They solve different problems and are often used together.
      </RememberBlock>

      <SDHeading2>4. Sharding: divide the data</SDHeading2>
      <SDParagraph>
        A shard owns only part of the dataset. A good shard key spreads traffic and keeps common queries on as few shards as possible.
      </SDParagraph>
      <SDList>
        <li><strong>Hash partitioning:</strong> spreads load well, but range queries become harder.</li>
        <li><strong>Range partitioning:</strong> makes ranges easy, but recent values can create a hot shard.</li>
        <li><strong>Directory/lookup:</strong> flexible mapping, but the directory becomes critical infrastructure.</li>
        <li><strong>Hot key:</strong> one celebrity, tenant, or product receives much more traffic than the rest.</li>
      </SDList>

      <InterviewQuestion
        question="How would you select a shard key for an order system?"
        answer={<>Start from the dominant queries. <strong>customerId</strong> keeps a customer’s orders together and distributes many customers, but order lookup needs a routing index if only orderId is known. I would measure tenant skew, plan rebalancing, and avoid a timestamp-only key because new writes would hit one shard.</>}
      />

      <SDHeading2>5. Transactions and isolation</SDHeading2>
      <SDParagraph>
        A transaction groups changes into one correctness boundary. Isolation defines which temporary effects concurrent transactions may see.
      </SDParagraph>
      <div className="grid gap-3 sm:grid-cols-2">
        <ConceptCard title="Atomicity" body="All changes commit, or none do." example="Debit and ledger entry stay together" />
        <ConceptCard title="Consistency" body="Application and database rules remain valid." example="Unique seat constraint is never broken" />
        <ConceptCard title="Isolation" body="Concurrent work behaves according to a chosen visibility guarantee." example="Prevent lost seat updates" />
        <ConceptCard title="Durability" body="Committed data survives the promised failures." example="Payment record survives restart" />
      </div>

      <SDHeading3>Isolation ladder</SDHeading3>
      <SDList>
        <li><strong>Read committed:</strong> blocks dirty reads; common default, but repeated reads can change.</li>
        <li><strong>Repeatable read / snapshot:</strong> a transaction sees a stable snapshot; write conflicts still need thought.</li>
        <li><strong>Serializable:</strong> strongest general isolation; simpler reasoning, potentially more aborts or coordination.</li>
      </SDList>
      <CommonMistake>
        “We used @Transactional, so every race condition is solved.” Transaction scope, isolation, constraints, and locking still decide correctness.
      </CommonMistake>

      <CodeMapping
        concept="Prevent two users from booking one seat"
        angular={<code>Show “booking…”; handle conflict response</code>}
        spring={<code>@Transactional + idempotency key + conflict mapping</code>}
        database={<code>UNIQUE(show_id, seat_id) or version/lock</code>}
      />

      <SDHeading2>6. Consistency: ask what the user must observe</SDHeading2>
      <SDList>
        <li><strong>Strong/linearizable read:</strong> after a successful write, later reads behave as if there is one latest copy.</li>
        <li><strong>Read-your-writes:</strong> the writer sees their own update even if other users may briefly see old data.</li>
        <li><strong>Eventual consistency:</strong> replicas may disagree now but converge when updates stop.</li>
        <li><strong>Causal ordering:</strong> effects should not appear before the events that caused them.</li>
      </SDList>
      <RememberBlock>
        “Consistent” is incomplete. Say exactly which guarantee a user flow requires and what latency/availability cost you accept.
      </RememberBlock>

      <SDHeading2>7. Events, streams, and derived data</SDHeading2>
      <AsciiDiagram diagram={`Order DB -- outbox/CDC --> Kafka log --> Inventory projection
                                      |-----> Search index
                                      |-----> Analytics store
                                      |-----> Notification worker`} />
      <SDParagraph>
        A durable event log lets several systems build their own derived views. This is powerful, but every consumer must handle retries,
        duplicates, ordering, schema evolution, and replay.
      </SDParagraph>
      <SDList>
        <li><strong>Transactional outbox:</strong> save business data and an event record in one local transaction; publish later.</li>
        <li><strong>Idempotent consumer:</strong> processing the same event twice gives the same final result.</li>
        <li><strong>CQRS:</strong> separate write and read models only when their needs are genuinely different.</li>
        <li><strong>Event sourcing:</strong> events are the source of truth; valuable in specific audit-heavy domains, not a default.</li>
      </SDList>

      <SDHeading2>8. Distributed systems: the minimum truth</SDHeading2>
      <PlainEnglish>
        Across machines, messages can be late, repeated, reordered, or lost; a machine can pause while looking alive. Timeouts tell you
        that you do not know the result—not necessarily that the work failed.
      </PlainEnglish>
      <SDList>
        <li>Use timeouts and bounded retries with backoff and jitter.</li>
        <li>Make retried operations idempotent.</li>
        <li>Use leases carefully; local wall clocks are not a perfect global truth.</li>
        <li>Consensus systems coordinate a single decision/order, but coordination adds latency and availability cost.</li>
      </SDList>

      <InterviewQuestion
        question="What is the most important lesson from DDIA for an application developer?"
        answer={<>There is no universally best database or architecture. I start with access patterns and required guarantees, then discuss the trade-offs among correctness, latency, availability, scale, maintainability, and cost. I also assume partial failure and design retries, idempotency, observability, and recovery explicitly.</>}
      />

      <NextLesson title="HLD Step 11 — Production-ready design" />
    </article>
  );
}

function ConceptCard({ title, body, example }: { title: string; body: string; example: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
      <p className="mt-3 text-xs text-primary"><strong>Example:</strong> {example}</p>
    </div>
  );
}

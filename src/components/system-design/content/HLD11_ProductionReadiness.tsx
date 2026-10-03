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

export default function HLD11ProductionReadiness() {
  return (
    <article>
      <div className="mb-4 flex flex-wrap gap-2"><LevelBadge level="Intermediate" /><LevelBadge level="Advanced" /></div>
      <SDTitle>HLD Step 11 — Production-ready design</SDTitle>
      <PlainEnglish>
        A diagram is not finished when requests work on a good day. A production design also explains failure, security,
        monitoring, deployment, recovery, and cost.
      </PlainEnglish>

      <SDHeading2>1. Convert “reliable” into numbers</SDHeading2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Term title="SLI" text="What we measure: successful-request ratio, p95 latency, freshness, or correctness." />
        <Term title="SLO" text="The target: for example, 99.9% successful checkout requests in 30 days." />
        <Term title="SLA" text="A customer-facing promise, often with contractual consequences." />
        <Term title="Error budget" text="The amount of unreliability allowed by the SLO; it balances release speed and stability." />
      </div>
      <RememberBlock>
        Average latency hides slow users. Discuss p50 for typical experience and p95/p99 for the slow tail.
      </RememberBlock>

      <SDHeading2>2. Resilience tools — each solves a different problem</SDHeading2>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-muted/60"><tr><th className="p-3">Tool</th><th className="p-3">Question it answers</th><th className="p-3">Safe rule</th></tr></thead>
          <tbody className="divide-y divide-border text-muted-foreground">
            <tr><td className="p-3 font-medium text-foreground">Timeout</td><td className="p-3">How long will one attempt wait?</td><td className="p-3">Set from latency budget, not a random large number.</td></tr>
            <tr><td className="p-3 font-medium text-foreground">Retry</td><td className="p-3">Should a transient failure get another attempt?</td><td className="p-3">Only bounded, idempotent work; add backoff and jitter.</td></tr>
            <tr><td className="p-3 font-medium text-foreground">Circuit breaker</td><td className="p-3">Should we temporarily stop calling an unhealthy dependency?</td><td className="p-3">Fail fast, then allow limited recovery probes.</td></tr>
            <tr><td className="p-3 font-medium text-foreground">Bulkhead</td><td className="p-3">Can one dependency consume every thread/connection?</td><td className="p-3">Separate and bound critical resource pools.</td></tr>
            <tr><td className="p-3 font-medium text-foreground">Rate limiter</td><td className="p-3">How much work may a caller create?</td><td className="p-3">Return clear limits and Retry-After where useful.</td></tr>
          </tbody>
        </table>
      </div>
      <CommonMistake>Retrying every failure three times can turn one overloaded dependency into four times the traffic.</CommonMistake>

      <CodeMapping
        concept="Bounded downstream call"
        angular={<code>Cancel stale request; show retry/fallback state</code>}
        spring={<code>HTTP timeout + Resilience4j retry/breaker/bulkhead</code>}
        database={<code>Bound connection pool + query timeout</code>}
      />

      <SDHeading2>3. Observability: find the broken user journey</SDHeading2>
      <AsciiDiagram diagram={`User request
   | traceId
[Gateway] ---> [Order Service] ---> [Payment Service]
                    |                     |
                 metrics               span/error
                    +------ logs --------+
                            |
                    dashboard + alert`} />
      <SDList>
        <li><strong>Metrics:</strong> trends and alerts—rate, errors, duration, saturation.</li>
        <li><strong>Logs:</strong> detailed events with structured fields and correlation IDs; never log secrets.</li>
        <li><strong>Traces:</strong> one request across services; show where latency and failure happened.</li>
        <li><strong>Profiles:</strong> CPU, allocation, locks, and hot code when metrics point inside the process.</li>
      </SDList>
      <SDParagraph>
        For Spring Boot, Actuator and Micrometer expose health, metrics, and observations. Keep metric labels low-cardinality;
        userId or orderId belongs in traces/logs, not a metric tag.
      </SDParagraph>

      <SDHeading2>4. Security is an architecture property</SDHeading2>
      <StepByStep steps={[
        { title: 'Identify assets and trust boundaries', body: 'Users, services, databases, admin paths, secrets, and external providers.' },
        { title: 'Authenticate and authorize', body: 'Verify identity, then enforce least privilege at APIs and data ownership boundaries.' },
        { title: 'Protect data', body: 'TLS in transit, encryption at rest, secret rotation, minimal retention, and redaction.' },
        { title: 'Limit abuse', body: 'Validation, rate limits, payload limits, safe errors, audit events, and dependency updates.' },
      ]} />
      <RememberBlock>
        A gateway can authenticate a token, but every service still owns authorization for its business data and actions.
      </RememberBlock>

      <SDHeading2>5. Safe deployment and schema evolution</SDHeading2>
      <SDHeading3>Deploy code</SDHeading3>
      <SDList>
        <li><strong>Rolling:</strong> replace instances gradually; old and new versions overlap.</li>
        <li><strong>Blue-green:</strong> prepare a full new environment, then switch traffic.</li>
        <li><strong>Canary:</strong> send a small percentage first and compare health metrics.</li>
        <li><strong>Feature flag:</strong> deploy code separately from enabling behaviour; remove stale flags later.</li>
      </SDList>
      <SDHeading3>Change database safely: expand → migrate → contract</SDHeading3>
      <StepByStep steps={[
        { title: 'Expand', body: 'Add a backward-compatible column/table/event field. Do not break old code.' },
        { title: 'Migrate', body: 'Deploy dual-compatible code and backfill in small observable batches.' },
        { title: 'Switch', body: 'Move reads/writes after validation; monitor errors and lag.' },
        { title: 'Contract', body: 'Remove the old path in a later release when no old instance or consumer depends on it.' },
      ]} />

      <SDHeading2>6. Disaster recovery</SDHeading2>
      <SDList>
        <li><strong>RPO:</strong> maximum data you can lose, measured in time.</li>
        <li><strong>RTO:</strong> maximum acceptable time to restore service.</li>
        <li><strong>Backup is not recovery:</strong> regularly restore and verify backups.</li>
        <li><strong>Multi-zone vs multi-region:</strong> different failure coverage, latency, consistency, and cost.</li>
      </SDList>

      <SDHeading2>7. Capacity and cost guardrails</SDHeading2>
      <SDList>
        <li>Load-test the important user journey, not an empty hello endpoint.</li>
        <li>Watch saturation: CPU, memory, threads, queues, connections, disk, and broker lag.</li>
        <li>Autoscaling reacts after a signal; keep headroom for sudden spikes.</li>
        <li>Every extra replica, region, cache, queue, and service has an operational cost.</li>
      </SDList>

      <InterviewQuestion
        question="How do you know a design is production-ready?"
        answer={<>I can state its SLO and capacity assumptions, identify failure domains and trust boundaries, bound downstream calls, trace a user request, deploy and roll back safely, restore data within RTO/RPO, and explain the cost. If those answers are missing, the happy-path diagram is not complete.</>}
      />
      <NextLesson title="LLD Step 0 — OOP modelling before classes" />
    </article>
  );
}

function Term({ title, text }: { title: string; text: string }) {
  return <div className="rounded-lg border border-border bg-card p-4"><h3 className="font-semibold text-primary">{title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p></div>;
}

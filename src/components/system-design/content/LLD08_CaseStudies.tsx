import {
  AsciiDiagram,
  CommonMistake,
  InterviewQuestion,
  LevelBadge,
  NextLesson,
  PlainEnglish,
  RememberBlock,
  SDHeading2,
  SDList,
  SDTitle,
  StepByStep,
} from '../ui/SystemDesignUI';

export default function LLD08CaseStudies() {
  return (
    <article>
      <LevelBadge level="Intermediate" />
      <SDTitle>LLD Step 8 — Common interview blueprints</SDTitle>
      <PlainEnglish>
        Do not memorize fifty class diagrams. Memorize a design method and a few reusable ideas: state machine, strategy,
        observer, allocation, ledger, and concurrency boundary.
      </PlainEnglish>

      <SDHeading2>One answer flow for every LLD prompt</SDHeading2>
      <StepByStep steps={[
        { title: 'Scope', body: 'Name the actors, core use cases, and what you will not design.' },
        { title: 'Rules', body: 'Write 3–5 invariants and important failure cases.' },
        { title: 'Model', body: 'Choose entities, value objects, states, and relationships.' },
        { title: 'Behaviour', body: 'Assign methods to the objects that own the rule; add interfaces only for variation.' },
        { title: 'Walk through', body: 'Execute one main use case using the proposed methods.' },
        { title: 'Pressure test', body: 'Discuss concurrent requests, persistence, extensibility, and tests.' },
      ]} />

      <SDHeading2>1. Parking lot</SDHeading2>
      <Blueprint
        useCases="Park vehicle, allocate compatible spot, issue ticket, calculate fee, exit."
        model="ParkingLot → Floor → Spot; Vehicle; Ticket; PricingStrategy; SpotAllocationStrategy."
        invariant="One active vehicle per spot; one active ticket per vehicle entry."
        concurrency="Reserve the spot with a lock/atomic database update before issuing the ticket."
        pattern="Strategy for pricing and allocation; state for spot/ticket lifecycle."
      />

      <SDHeading2>2. Elevator system</SDHeading2>
      <Blueprint
        useCases="Accept hall/car requests, select elevator, move, open/close doors."
        model="ElevatorController; Elevator; Request; Direction; ElevatorState; SchedulingStrategy."
        invariant="Doors do not open while moving; an elevator serves only valid floors."
        concurrency="Controller serializes state-changing commands per elevator; sensors publish events."
        pattern="State for elevator behaviour; Strategy for scheduling; Observer for sensors/display."
      />

      <SDHeading2>3. Splitwise / expense sharing</SDHeading2>
      <Blueprint
        useCases="Create group, add equal/exact/percentage expense, show balances, settle."
        model="User; Group; Expense; Split; Money; SplitStrategy; LedgerEntry."
        invariant="Split total equals expense total; money uses decimal/minor units, never double."
        concurrency="Write immutable ledger entries in one transaction; derive balances from entries."
        pattern="Strategy for split calculation; ledger for auditability."
      />

      <SDHeading2>4. BookMyShow / seat booking</SDHeading2>
      <Blueprint
        useCases="Search show, hold seats, pay, confirm or expire hold."
        model="Movie; Theatre; Show; ShowSeat; SeatHold; Booking; Payment."
        invariant="A show-seat has at most one active hold/confirmed booking."
        concurrency="Unique constraint or atomic conditional update; short hold TTL; idempotent payment callback."
        pattern="State machine for AVAILABLE → HELD → BOOKED; scheduler for expiry."
      />

      <SDHeading2>5. Notification service</SDHeading2>
      <Blueprint
        useCases="Send email/SMS/push, apply preference, retry failure, track status."
        model="Notification; Template; Recipient; Channel; ChannelSender; DeliveryAttempt."
        invariant="Same idempotency key must not create duplicate user-visible delivery."
        concurrency="Queue workers; bounded retries; DLQ; per-provider rate limit."
        pattern="Strategy for channel; Factory for sender; Observer/event for request intake."
      />

      <SDHeading2>6. In-memory LRU cache</SDHeading2>
      <Blueprint
        useCases="get and put in O(1), evict least recently used item at capacity."
        model="HashMap&lt;Key, Node&gt;; doubly linked list with head/tail sentinels."
        invariant="Every map entry has exactly one list node; most recent near head, least recent near tail."
        concurrency="Use one lock for correctness first; discuss segmented/concurrent designs only if required."
        pattern="Map gives lookup; list gives recency order."
      />

      <AsciiDiagram diagram={`Book seat flow

Controller -> BookingService -> ShowSeatRepository
                                 | atomic hold if AVAILABLE
                                 v
                              SeatHold(TTL)
                                 |
Payment callback (idempotent) ---+---> Booking CONFIRMED
Expiry worker ------------------------> seat AVAILABLE`} />

      <CommonMistake>
        Starting with controllers, repositories, and database tables before agreeing on rules. Framework classes do not replace a domain design.
      </CommonMistake>

      <RememberBlock>
        In a 45-minute LLD round, complete one use case deeply. A smaller coherent design beats twenty unfinished classes.
      </RememberBlock>

      <InterviewQuestion
        question="What makes an LLD answer senior-level?"
        answer={<>Clear scope, protected invariants, cohesive responsibilities, explicit extension points, and a walkthrough that includes failure and concurrency. I also explain why I did not add patterns or infrastructure that the requirements do not need.</>}
      />
      <NextLesson title="Resources — what to read next and why" />
    </article>
  );
}

function Blueprint({ useCases, model, invariant, concurrency, pattern }: { useCases: string; model: string; invariant: string; concurrency: string; pattern: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 text-sm">
      <dl className="grid gap-3 sm:grid-cols-[9rem_1fr]">
        <dt className="font-semibold text-foreground">Core use cases</dt><dd className="text-muted-foreground">{useCases}</dd>
        <dt className="font-semibold text-foreground">Main model</dt><dd className="text-muted-foreground">{model}</dd>
        <dt className="font-semibold text-foreground">Key invariant</dt><dd className="text-muted-foreground">{invariant}</dd>
        <dt className="font-semibold text-foreground">Concurrency</dt><dd className="text-muted-foreground">{concurrency}</dd>
        <dt className="font-semibold text-foreground">Reusable idea</dt><dd className="text-muted-foreground">{pattern}</dd>
      </dl>
    </div>
  );
}

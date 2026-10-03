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

export default function LLD07DDDHexagonalTesting() {
  return (
    <article>
      <div className="mb-4 flex flex-wrap gap-2"><LevelBadge level="Intermediate" /><LevelBadge level="Advanced" /></div>
      <SDTitle>LLD Step 7 — DDD, hexagonal architecture & testing</SDTitle>
      <PlainEnglish>
        Keep business rules in the centre. Web, database, Kafka, and external APIs are replaceable details around that centre.
      </PlainEnglish>

      <SDHeading2>1. DDD words you actually need</SDHeading2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Term name="Ubiquitous language" text="Developers and domain experts use the same business words in conversation and code." />
        <Term name="Bounded context" text="A boundary inside which a term and model have one precise meaning." />
        <Term name="Aggregate" text="A consistency boundary changed through one root object." />
        <Term name="Domain event" text="A past-tense business fact, such as OrderPaid, produced after a valid state change." />
      </div>
      <RememberBlock>
        DDD is not “create many folders.” Use it when business rules are complex enough that a clear domain model pays for itself.
      </RememberBlock>

      <SDHeading2>2. Aggregate example: Order</SDHeading2>
      <SDList>
        <li><strong>Aggregate root:</strong> Order is the only public entry to change its OrderItems.</li>
        <li><strong>Invariant:</strong> a cancelled order cannot be paid or shipped.</li>
        <li><strong>Transaction:</strong> update one aggregate in one local transaction where possible.</li>
        <li><strong>Other aggregate:</strong> Inventory owns stock; communicate through an application workflow or event.</li>
      </SDList>
      <CommonMistake>
        One enormous aggregate that loads customer, inventory, payment, delivery, and every order item makes transactions slow and services tightly coupled.
      </CommonMistake>

      <SDHeading2>3. Hexagonal architecture in one diagram</SDHeading2>
      <AsciiDiagram diagram={`        INBOUND ADAPTERS
 REST Controller   Kafka Consumer   Scheduler
          |             |             |
          +------ Application -------+
            --->  Use Cases  <---
                    |
               Domain Model
                    |
             OUTBOUND PORTS
          |          |           |
 JPA Adapter   Kafka Producer   Payment HTTP Adapter`} />
      <SDParagraph>
        A port is an interface owned by the inner application. An adapter implements that interface using a technology. Dependency arrows
        point inward, so the domain does not import Spring MVC, JPA, or Kafka types.
      </SDParagraph>

      <CodeMapping
        concept="Place one checkout use case"
        angular={<code>Checkout page calls POST /orders</code>}
        spring={<code>Controller → PlaceOrderUseCase → domain → ports</code>}
        database={<code>JpaOrderAdapter implements OrderRepositoryPort</code>}
      />

      <SDHeading2>4. Practical Spring Boot package structure</SDHeading2>
      <AsciiDiagram diagram={`order/
  domain/          Order, Money, OrderPaid, business rules
  application/     PlaceOrderUseCase, ports, transaction orchestration
  adapter/in/web/  OrderController, request/response DTOs
  adapter/in/kafka/OrderEventConsumer
  adapter/out/jpa/ JpaOrderAdapter, JPA entities
  adapter/out/http/PaymentClientAdapter`} />
      <SDParagraph>
        This is one option, not a law. For a simple CRUD service, feature-based controller/service/repository may be clearer. Architecture
        should remove real change pain, not advertise pattern names.
      </SDParagraph>

      <SDHeading2>5. Transaction and event boundary</SDHeading2>
      <StepByStep steps={[
        { title: 'Execute the domain change', body: 'Load the aggregate and call a method that validates its invariants.' },
        { title: 'Save state and outbox together', body: 'Write the aggregate and event record in the same local database transaction.' },
        { title: 'Publish asynchronously', body: 'A relay or CDC tool publishes the outbox event to Kafka.' },
        { title: 'Consume idempotently', body: 'The consumer records a message ID or uses an idempotent state transition before acknowledging.' },
      ]} />

      <SDHeading2>6. Test by boundary, not by annotation count</SDHeading2>
      <div className="space-y-3">
        <TestRow title="Domain unit test" body="No Spring. Prove invariants and state transitions quickly." />
        <TestRow title="Application test" body="Use fake/mock ports. Prove orchestration and failure decisions." />
        <TestRow title="Slice test" body="Use @WebMvcTest or @DataJpaTest for one adapter boundary." />
        <TestRow title="Integration test" body="Use Testcontainers for real PostgreSQL/Kafka behaviour, mappings, constraints, and transactions." />
        <TestRow title="Contract/end-to-end" body="Keep a small number for service contracts and critical user journeys." />
      </div>
      <RememberBlock>
        Mocking every internal class tests implementation details. Test observable behaviour and use real infrastructure at the boundaries where behaviour matters.
      </RememberBlock>

      <SDHeading2>7. When to keep simple vs go deeper</SDHeading2>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[620px] text-left text-sm">
          <thead className="bg-muted/60"><tr><th className="p-3">Situation</th><th className="p-3">Good starting design</th></tr></thead>
          <tbody className="divide-y divide-border text-muted-foreground">
            <tr><td className="p-3">Small CRUD service, little domain logic</td><td className="p-3">Feature packages with controller/service/repository</td></tr>
            <tr><td className="p-3">Complex rules and several external systems</td><td className="p-3">Domain model + application ports/adapters</td></tr>
            <tr><td className="p-3">Many teams need independent deployment</td><td className="p-3">First establish bounded contexts; split deployment only with evidence</td></tr>
            <tr><td className="p-3">Different read/write scale and models</td><td className="p-3">Consider CQRS selectively, not automatically</td></tr>
          </tbody>
        </table>
      </div>

      <InterviewQuestion
        question="Layered vs hexagonal architecture—which is better?"
        answer={<>Neither is universally better. Layered architecture is simpler for CRUD-heavy services. Hexagonal architecture pays off when business rules must stay independent of changing databases, frameworks, or integrations. I choose the smallest structure that protects the expected changes and remains testable.</>}
      />
      <NextLesson title="LLD Step 8 — Common interview blueprints" />
    </article>
  );
}

function Term({ name, text }: { name: string; text: string }) {
  return <div className="rounded-lg border border-border bg-card p-4"><h3 className="font-semibold text-primary">{name}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></div>;
}

function TestRow({ title, body }: { title: string; body: string }) {
  return <div className="rounded-lg border border-border bg-card p-4"><SDHeading3>{title}</SDHeading3><p className="text-sm text-muted-foreground">{body}</p></div>;
}

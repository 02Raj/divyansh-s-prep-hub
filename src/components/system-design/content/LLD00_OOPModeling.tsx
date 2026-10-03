import {
  AsciiDiagram,
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

export default function LLD00OOPModeling() {
  return (
    <article>
      <LevelBadge level="Beginner" />
      <SDTitle>LLD Step 0 — Think before creating classes</SDTitle>
      <PlainEnglish>
        LLD is not “add a class for every noun.” It is turning requirements into objects that protect rules and can change without
        breaking the whole codebase.
      </PlainEnglish>

      <SDHeading2>The repeatable 8-step LLD method</SDHeading2>
      <StepByStep steps={[
        { title: 'Clarify scope', body: 'Choose 3–5 use cases and explicitly say what is out of scope.' },
        { title: 'Find actors and actions', body: 'Who calls the system, and what can each actor do?' },
        { title: 'Write invariants', body: 'Rules that must always remain true, such as “a paid order cannot be paid twice.”' },
        { title: 'Find domain objects', body: 'Entities have identity; value objects are defined by their values.' },
        { title: 'Assign responsibility', body: 'Put each rule near the data it protects; avoid one giant manager class.' },
        { title: 'Define relationships', body: 'Prefer composition; choose one-to-one, one-to-many, and ownership deliberately.' },
        { title: 'Add extension points', body: 'Use interfaces where behaviour genuinely varies, not around every class.' },
        { title: 'Walk one use case', body: 'Run a happy path and one failure path, then discuss concurrency and testing.' },
      ]} />

      <SDHeading2>Entity vs value object vs service</SDHeading2>
      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Entity" body="Has stable identity and lifecycle." example="Order(id, status, items)" />
        <Card title="Value object" body="Defined by value; preferably immutable." example="Money(amount, currency)" />
        <Card title="Domain service" body="Rule that does not naturally belong to one entity." example="PricingPolicy.calculate(...)" />
      </div>
      <RememberBlock>
        A DTO carries data across a boundary. A domain object protects business meaning. They may look similar but have different jobs.
      </RememberBlock>

      <SDHeading2>Relationships without UML fear</SDHeading2>
      <AsciiDiagram diagram={`Order 1 -------- * OrderItem        one order owns many items
Order * -------- 1 Customer         many orders refer to one customer
CheckoutService ---> PaymentPort    service depends on an abstraction
CardPaymentAdapter --|> PaymentPort adapter implements the abstraction`} />
      <SDList>
        <li><strong>Association:</strong> one object knows another.</li>
        <li><strong>Composition:</strong> child belongs to the parent lifecycle; deleting the order deletes its items.</li>
        <li><strong>Inheritance:</strong> use only when every subtype is safely substitutable for the parent.</li>
        <li><strong>Dependency:</strong> a class temporarily uses another through a method or constructor.</li>
      </SDList>

      <CommonMistake>
        Deep inheritance trees make behaviour hard to predict. Start with composition plus a small interface such as PaymentStrategy.
      </CommonMistake>

      <SDHeading2>Worked mini-example: checkout</SDHeading2>
      <SDHeading3>Requirements</SDHeading3>
      <SDList>
        <li>Create an order from available products.</li>
        <li>Calculate price with a replaceable discount policy.</li>
        <li>Pay once; a failed payment must not mark the order paid.</li>
      </SDList>
      <AsciiDiagram diagram={`CheckoutApplicationService
   |-- OrderRepository
   |-- InventoryPort
   |-- PaymentPort
   '-- PricingPolicy

Order
   |-- List<OrderItem>
   |-- Money total
   '-- OrderStatus (CREATED, PAID, CANCELLED)`} />
      <SDParagraph>
        Order owns the state transition because it protects the rule. CheckoutApplicationService coordinates repository and external
        ports because one entity should not call HTTP or the database directly.
      </SDParagraph>

      <pre className="my-6 overflow-x-auto rounded-lg bg-zinc-950 p-4 text-sm leading-relaxed text-emerald-400"><code>{`public class Order {
  private OrderStatus status = CREATED;

  public void markPaid(PaymentReceipt receipt) {
    if (status != CREATED) throw new InvalidOrderState();
    this.status = PAID;
  }
}

public interface PaymentPort {
  PaymentReceipt charge(OrderId orderId, Money amount);
}`}</code></pre>

      <SDHeading2>How to speak during an LLD interview</SDHeading2>
      <InterviewQuestion
        question="Where do you begin when asked to design a system such as a parking lot?"
        answer={<>I first lock the scope and use cases. Then I write invariants, identify entities and value objects, assign responsibilities, and draw only the relationships needed for one main flow. After the flow works, I add extension points for varying behaviour and discuss persistence, concurrency, errors, and tests.</>}
      />

      <NextLesson title="LLD Step 1 — SOLID & clean code" />
    </article>
  );
}

function Card({ title, body, example }: { title: string; body: string; example: string }) {
  return <div className="rounded-lg border border-border bg-card p-4"><h3 className="font-semibold text-foreground">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{body}</p><code className="mt-3 block text-xs text-primary">{example}</code></div>;
}

import {
  SDTitle,
  SDHeading2,
  SDHeading3,
  SDParagraph,
  PlainEnglish,
  StepByStep,
  RememberBlock,
  InterviewQuestion,
  AsciiDiagram,
  LevelBadge,
} from '../ui/SystemDesignUI';

export default function LLD06ClassDesignWalkthrough() {
  return (
    <div className="max-w-4xl">
      <LevelBadge level="Advanced" />
      <SDTitle>LLD Step 6 — Class Design Walkthrough (Parking Lot)</SDTitle>

      <PlainEnglish>
        LLD interviews give a small world: parking lot, elevator, movie booking. You list{' '}
        <strong>nouns → classes</strong>, <strong>verbs → methods</strong>, and keep each class doing one job. You do not
        need perfect UML — you need clear names and sensible relationships.
      </PlainEnglish>

      <SDHeading2>Step-by-step method (any LLD question)</SDHeading2>
      <StepByStep
        steps={[
          { title: 'Actors & actions', body: 'Who uses the system? What can they do?' },
          { title: 'Nouns → classes', body: 'ParkingLot, Floor, Spot, Vehicle, Ticket, Payment (only if needed).' },
          { title: 'Relationships', body: 'Lot has many Floors; Floor has many Spots; Spot holds one Vehicle.' },
          { title: 'Core flows', body: 'park(), unpark(), findAvailableSpot(type).' },
          { title: 'Extensibility', body: 'Spot types: Compact, Large, Handicapped — strategy or enum + factory.' },
        ]}
      />

      <SDHeading2>Example: Multi-floor parking lot</SDHeading2>
      <SDHeading3>Requirements (typical)</SDHeading3>
      <SDParagraph>
        Cars, bikes, trucks need different spot sizes. User parks at entrance; system assigns spot; user pays on exit.
      </SDParagraph>

      <AsciiDiagram
        diagram={`
ParkingLot
  - id, name
  - floors: List<Floor>
  + findSpot(vehicleType): Spot
  + park(vehicle): Ticket
  + unpark(ticket): Money

Floor
  - levelNumber
  - spots: List<Spot>

Spot
  - id, type: COMPACT | LARGE | BIKE
  - isOccupied
  + canFit(vehicle): boolean

Vehicle
  - licensePlate, type

Ticket
  - id, entryTime, spotId, vehicleId
      `}
      />

      <SDHeading3>Design choices (say these in interview)</SDHeading3>
      <ul className="my-4 ml-6 list-disc space-y-2 text-muted-foreground">
        <li>
          <strong className="text-foreground">Single Responsibility:</strong> PaymentCalculator separate from ParkingLot
        </li>
        <li>
          <strong className="text-foreground">Open/Closed:</strong> new vehicle type = new Spot rules, not rewrite Lot
        </li>
        <li>
          <strong className="text-foreground">Thread safety:</strong> synchronize spot assignment or use ConcurrentHashMap for
          spot locks in multi-gate lot
        </li>
      </ul>

      <SDHeading2>Map to Spring Boot (backend dev interviews)</SDHeading2>
      <SDParagraph>
        Same ideas become: <strong>Controller</strong> (HTTP) → <strong>Service</strong> (park/unpark rules) →{' '}
        <strong>Repository</strong> (Spot, Ticket tables). DTOs for API; entities for JPA.
      </SDParagraph>

      <InterviewQuestion
        question="How is LLD different from HLD in one sentence?"
        answer={
          <p>
            HLD is <strong>which services and databases exist</strong>; LLD is <strong>which classes and methods implement one
            service</strong>.
          </p>
        }
      />

      <RememberBlock>
        Practice drawing one LLD problem per week on paper: 15 minutes classes, 10 minutes main flow, 5 minutes how you’d test
        it.
      </RememberBlock>
    </div>
  );
}

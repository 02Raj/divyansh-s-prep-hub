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
  NextLesson,
} from '../ui/SystemDesignUI';

export default function HLD08CaseStudies() {
  return (
    <div className="max-w-4xl">
      <LevelBadge level="Advanced" />
      <SDTitle>HLD Step 8 — Famous Systems (Step-by-Step)</SDTitle>

      <PlainEnglish>
        Interviewers reuse the same stories: URL shortener, chat, notifications, rate limiter. You do not need a perfect
        diagram — you need the <strong>same steps every time</strong>: clarify → requirements → estimate → draw → deep dive.
      </PlainEnglish>

      <SDHeading2>Template (use for any prompt)</SDHeading2>
      <StepByStep
        steps={[
          { title: 'Scope', body: '"Are we designing mobile + web? Approximate DAU?"' },
          { title: '3 features', body: 'Write only what matters for 45 minutes.' },
          { title: '2 quality goals', body: 'e.g. p99 &lt; 200ms read, 99.9% uptime.' },
          { title: 'Rough math', body: 'Writes/sec, reads/sec, GB/year — round numbers.' },
          { title: 'One diagram', body: 'Client → gateway → services → DB/cache/queue.' },
          { title: 'One hard topic', body: 'Feed, idempotency, or hot keys — go deep there.' },
        ]}
      />

      <SDHeading2>Case 1: URL shortener (Bitly-style)</SDHeading2>
      <SDHeading3>Features</SDHeading3>
      <SDParagraph>Create short link, redirect long URL, optional analytics click count.</SDParagraph>
      <SDHeading3>Design sketch</SDHeading3>
      <AsciiDiagram
        diagram={`
[ Mobile / Web ]
       |
       v
[ API Gateway ]
       |
       v
[ Shortener Service ] ----write----> [ SQL or NoSQL: short_code -> long_url ]
       |
       +----read hot codes----> [ Redis cache ]
       |
[ Redirect GET /{code} ] --> 302 to long URL
      `}
      />
      <RememberBlock>
        Reads are 10–100× writes → cache redirects. Generate short codes with base62 or hash + collision check. Idempotent
        create if client retries.
      </RememberBlock>

      <SDHeading2>Case 2: Chat / messaging (WhatsApp-lite)</SDHeading2>
      <SDParagraph>
        <strong>Hard parts:</strong> real-time delivery, online status, message order, group chats.
      </SDParagraph>
      <AsciiDiagram
        diagram={`
[ User A app ] <--WebSocket--> [ Chat Gateway ]
                                    |
                    +---------------+---------------+
                    v               v               v
            [ Message Service ] [ Presence ] [ Notification Service ]
                    |                               |
                    v                               v
              [ Message DB ]                  [ Push / Email ]
              (per conversation)              (offline users)
      `}
      />
      <SDParagraph>
        Store messages durably in DB; use WebSocket for online users; push notification when offline. For groups, fan-out on
        write or hybrid (small groups fan-out, large groups pull).
      </SDParagraph>

      <SDHeading2>Case 3: Notification system</SDHeading2>
      <SDParagraph>Email, SMS, push — high volume, can be delayed seconds.</SDParagraph>
      <SDParagraph>
        API accepts event → publish to <strong>queue</strong> → worker workers per channel → retry with backoff → dead-letter
        queue for failures. Template service for content; user preferences table for opt-out.
      </SDParagraph>

      <InterviewQuestion
        question="Design a rate limiter for public APIs."
        answer={
          <div className="space-y-2 text-sm">
            <p>
              <strong>Goal:</strong> max N requests per user/IP per minute.
            </p>
            <p>
              <strong>Approach:</strong> Redis token bucket or sliding window at API Gateway; return 429 Too Many Requests
              with Retry-After header.
            </p>
            <p>
              <strong>Scale:</strong> Redis cluster; limiter state is small and fast.
            </p>
          </div>
        }
      />
      <NextLesson title="HLD Step 9 — Interview deep dive" />
    </div>
  );
}

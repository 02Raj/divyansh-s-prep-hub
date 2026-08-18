import { SDTitle, SDHeading2, SDParagraph, SDList, RememberBlock, InterviewQuestion, AsciiDiagram } from '../ui/SystemDesignUI';

export default function HLD06CachingAndQueues() {
  return (
    <div className="max-w-4xl">
      <SDTitle>HLD-06: Caching & Message Queues</SDTitle>
      
      <SDParagraph>
        To make a system truly fast and resilient, databases aren't enough. You need Caching to speed up reads, and Message Queues to handle heavy writes asynchronously.
      </SDParagraph>

      <SDHeading2>1. Caching (Redis / Memcached)</SDHeading2>
      <SDParagraph>
        A Cache is a temporary data store that keeps data in RAM (Memory) instead of a Hard Drive. Reading from RAM is extremely fast (microseconds) compared to a database (milliseconds). Redis is the industry standard.
      </SDParagraph>

      <SDHeading3>Caching Strategies</SDHeading3>
      <SDList>
        <li>
          <strong className="text-foreground">Cache Aside (Lazy Loading):</strong> 
          The application checks the cache. If data is there (Cache Hit), return it. If not (Cache Miss), the application reads from the DB, saves it to the cache, and then returns it. Best for read-heavy systems.
        </li>
        <li>
          <strong className="text-foreground">Write Through:</strong> 
          Every time the application updates the DB, it also updates the cache at the exact same time. Ensures the cache is never stale, but slows down writes slightly.
        </li>
      </SDList>

      <SDHeading3>Cache Eviction (When cache is full)</SDHeading3>
      <SDParagraph>
        RAM is expensive. When the cache is full, we must delete old data to make room for new data. The most common algorithm is <strong>LRU (Least Recently Used)</strong> — delete the item that hasn't been accessed for the longest time. 
      </SDParagraph>

      <SDHeading2>2. Message Queues (Kafka / RabbitMQ)</SDHeading2>
      <SDParagraph>
        A Message Queue sits between two services. Instead of Service A calling Service B directly (Synchronous), Service A drops a message in the queue and moves on. Service B reads it whenever it's ready (Asynchronous).
      </SDParagraph>

      <AsciiDiagram diagram={`
[ User uploads Video ]
       |
[ Web Server ] ----> (Returns "Video is processing" instantly to User)
       |
       v (Publishes "VideoUploadedEvent" to Queue)
==============
[ KAFKA QUEUE ]
==============
       | (Subscribes to Queue)
       v
[ Heavy Processing Worker ]
(Takes 5 minutes to compress video)
      `} />

      <SDHeading3>Why use Message Queues?</SDHeading3>
      <SDList>
        <li><strong>Decoupling:</strong> If the Video Processing Worker crashes, the Web Server doesn't care. It keeps accepting uploads and dropping them in Kafka. When the Worker reboots, it picks up where it left off. No data is lost!</li>
        <li><strong>Spike Smoothing (Buffering):</strong> If 100,000 users upload a video on New Year's Eve, your processing servers would normally crash. With a queue, the queue just gets very long, and workers process it at their own safe speed.</li>
        <li><strong>Asynchronous Processing:</strong> Don't make the user stare at a loading spinner for 5 minutes. Tell them "We received it" instantly, and process it in the background.</li>
      </SDList>

      <RememberBlock>
        Kafka is an Event Streaming platform (keeps messages even after reading, great for big data and multiple consumers). RabbitMQ is a traditional Queue (message is deleted once read, great for simple task queues).
      </RememberBlock>

      <InterviewQuestion 
        question="How do you handle Cache Invalidation?"
        answer={
          <div>
            <p>"There are only two hard things in Computer Science: cache invalidation and naming things."</p>
            <p className="mt-2">To prevent users from seeing stale data, I would use a <strong>TTL (Time To Live)</strong> so cached data automatically expires after a set time (e.g., 5 minutes). For critical data, I would use the <strong>Write-Through</strong> strategy, or emit a Kafka event on database update that triggers a cache deletion.</p>
          </div>
        }
      />

    </div>
  );
}

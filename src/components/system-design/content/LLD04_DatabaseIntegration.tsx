import { SDTitle, SDHeading2, SDParagraph, SDList, RememberBlock, InterviewQuestion, CommonMistake } from '../ui/SystemDesignUI';

export default function LLD04DatabaseIntegration() {
  return (
    <div className="max-w-4xl">
      <SDTitle>LLD-04: Database Integration & JPA Best Practices</SDTitle>
      
      <SDParagraph>
        Connecting a Spring Boot app to a database is easy. Doing it efficiently at scale is hard. Low-Level Database Design focuses on Connection Pooling, the N+1 problem, and correct Transaction management.
      </SDParagraph>

      <SDHeading2>1. Connection Pooling (HikariCP)</SDHeading2>
      <SDParagraph>
        Opening a new connection to a PostgreSQL database is very slow (network handshake, authentication). If every user request opens a new connection, your database will crash under load.
      </SDParagraph>
      <SDList>
        <li><strong>The Solution:</strong> A Connection Pool. It creates a pool of (e.g., 20) database connections when the app starts and keeps them open.</li>
        <li><strong>How it works:</strong> A user request "borrows" a connection, executes SQL, and "returns" it to the pool instantly.</li>
        <li><strong>Spring Boot Default:</strong> HikariCP. It is incredibly fast. Never replace it unless you have a very specific reason.</li>
        <li><strong>Tuning:</strong> Set `spring.datasource.hikari.maximum-pool-size=20`. Don't set this to 1000! A pool size of 20-50 can handle thousands of concurrent users because connections are returned in milliseconds.</li>
      </SDList>

      <SDHeading2>2. The N+1 Query Problem</SDHeading2>
      <SDParagraph>
        This is the #1 reason Spring Boot apps run slowly in production. It happens when you use ORMs like Hibernate/JPA improperly.
      </SDParagraph>
      
      <div className="bg-muted/30 p-6 rounded-lg border border-border my-4">
        <h4 className="font-semibold mb-2">The Scenario:</h4>
        <p className="text-sm text-muted-foreground mb-2">You want to fetch a list of 10 Authors and their Books. You write:</p>
        <code className="text-sm bg-background p-2 block rounded">List&lt;Author&gt; authors = authorRepository.findAll();</code>
        
        <h4 className="font-semibold mt-4 mb-2">What Hibernate Does (The N+1 Problem):</h4>
        <ol className="list-decimal ml-6 space-y-1 text-sm text-muted-foreground">
          <li>Fires 1 query to get all 10 Authors: `SELECT * FROM author`</li>
          <li>Loops through the 10 authors, and fires a separate query to get books for EACH author: `SELECT * FROM book WHERE author_id = ?` (Runs 10 times!)</li>
          <li><strong>Total Queries: 1 + 10 = 11 queries.</strong> If you had 1000 authors, it would run 1001 queries. Your app will freeze!</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-2">The Solution (JOIN FETCH):</h4>
        <p className="text-sm text-muted-foreground">Force Hibernate to fetch everything in ONE query using a custom JPQL query:</p>
        <code className="text-sm bg-background p-2 block rounded mt-1">@Query("SELECT a FROM Author a JOIN FETCH a.books")</code>
      </div>

      <SDHeading2>3. FetchType: LAZY vs EAGER</SDHeading2>
      <SDList>
        <li><strong>EAGER:</strong> Every time you fetch the parent entity, it automatically fetches all child entities instantly. <strong>Avoid this!</strong> It leads to massive amounts of unused data being loaded into RAM.</li>
        <li><strong>LAZY (Default & Best Practice):</strong> It only fetches the child entities if you explicitly call the getter (e.g., `author.getBooks()`). Combined with `JOIN FETCH` when you know you need the data, LAZY fetching keeps your app fast and memory-efficient.</li>
      </SDList>

      <RememberBlock>
        Database calls are the most expensive part of your application. Always check your logs in development (set `spring.jpa.show-sql=true`) to ensure Hibernate isn't firing 50 hidden queries behind your back.
      </RememberBlock>

      <InterviewQuestion 
        question="What is the difference between @Transactional(readOnly = true) and a normal @Transactional?"
        answer={
          <div>
            <p>By default, <code>@Transactional</code> creates a read-write transaction. Hibernate has to keep a "snapshot" of all entities loaded in that transaction. If you change a setter, Hibernate automatically updates the database at the end (Dirty Checking).</p>
            <p className="mt-2">If you use <code>@Transactional(readOnly = true)</code>, you are telling Hibernate: "I am only reading data, I won't change anything." Hibernate turns off Dirty Checking. This saves a massive amount of RAM and CPU. Always use <code>readOnly = true</code> on your GET API services!</p>
          </div>
        }
      />

      <CommonMistake>
        Setting Hikari maximum-pool-size to 500 thinking it will make the app faster. CPU cores can only process a few threads at a time. A massive connection pool just causes context-switching overhead on the database server. A smaller pool (20-30) often yields higher throughput.
      </CommonMistake>

    </div>
  );
}

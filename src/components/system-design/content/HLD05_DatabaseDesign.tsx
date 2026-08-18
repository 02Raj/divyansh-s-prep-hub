import { SDTitle, SDHeading2, SDParagraph, SDList, RememberBlock, InterviewQuestion, AsciiDiagram } from '../ui/SystemDesignUI';

export default function HLD05DatabaseDesign() {
  return (
    <div className="max-w-4xl">
      <SDTitle>HLD-05: Database Design & Scaling</SDTitle>
      
      <SDParagraph>
        Choosing the right database and knowing how to scale it is often the most important decision in a System Design interview. Databases are usually the first thing to become a bottleneck.
      </SDParagraph>

      <SDHeading2>1. SQL vs NoSQL</SDHeading2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="bg-muted/30 p-5 rounded-lg border border-border">
          <h4 className="font-semibold text-lg mb-3 text-blue-500">SQL (Relational)</h4>
          <p className="text-sm mb-2 text-muted-foreground">PostgreSQL, MySQL, Oracle</p>
          <ul className="list-disc ml-5 space-y-1 text-sm text-muted-foreground">
            <li><strong>Structure:</strong> Tables with fixed schemas (Rows and Columns).</li>
            <li><strong>ACID:</strong> Strict data integrity. If a transaction fails, it rolls back entirely.</li>
            <li><strong>Relationships:</strong> Excellent at JOINs (e.g., fetching a User and all their Orders).</li>
            <li><strong>Scaling:</strong> Hard to scale horizontally (adding more machines). Usually scaled vertically (buying a bigger machine).</li>
            <li><strong>Use Case:</strong> Financial systems, e-commerce orders, inventory management.</li>
          </ul>
        </div>

        <div className="bg-muted/30 p-5 rounded-lg border border-border">
          <h4 className="font-semibold text-lg mb-3 text-green-500">NoSQL (Non-Relational)</h4>
          <p className="text-sm mb-2 text-muted-foreground">MongoDB, Cassandra, DynamoDB</p>
          <ul className="list-disc ml-5 space-y-1 text-sm text-muted-foreground">
            <li><strong>Structure:</strong> JSON Documents, Key-Value pairs, or Wide-Column. Flexible schema.</li>
            <li><strong>BASE:</strong> Eventually consistent. Fast, but you might read slightly stale data for a few milliseconds.</li>
            <li><strong>Relationships:</strong> Bad at JOINs. You usually duplicate data (Denormalization).</li>
            <li><strong>Scaling:</strong> Designed to scale horizontally easily across hundreds of cheap servers.</li>
            <li><strong>Use Case:</strong> Social media feeds, product catalogs, logs, real-time analytics.</li>
          </ul>
        </div>
      </div>

      <SDHeading2>2. Scaling the Database</SDHeading2>
      <SDParagraph>
        When your single database server is maxed out at 100% CPU, how do you fix it?
      </SDParagraph>

      <SDHeading3>Step 1: Vertical Scaling (Scale Up)</SDHeading3>
      <SDParagraph>
        Just buy a bigger server. Add more RAM, better CPU, faster SSDs. It's the easiest solution, requires zero code changes, but it has a hard hardware limit and is very expensive.
      </SDParagraph>

      <SDHeading3>Step 2: Read Replicas (Primary-Secondary Replication)</SDHeading3>
      <SDParagraph>
        Most web apps have 10x more READS than WRITES. So, we create copies of our database.
      </SDParagraph>
      <SDList>
        <li><strong>Primary DB:</strong> Handles all WRITES (INSERT, UPDATE, DELETE).</li>
        <li><strong>Secondary DBs (Replicas):</strong> Copies data from the Primary. Handles all READS (SELECT).</li>
        <li><strong>The Catch:</strong> Replication lag. It takes a few milliseconds for data to copy. A user might update their profile, refresh, and see the old profile for a split second.</li>
      </SDList>

      <SDHeading3>Step 3: Database Sharding (Scale Out)</SDHeading3>
      <SDParagraph>
        When you have too much data to fit on one hard drive (e.g., 50 Terabytes), you split the data across multiple database servers. This is called Sharding.
      </SDParagraph>
      <AsciiDiagram diagram={`
[ Application ]
       | (Hash user_id)
       v
-------------------------
| User ID 1 - 1000      | ---> [ Database Shard A ]
| User ID 1001 - 2000   | ---> [ Database Shard B ]
| User ID 2001 - 3000   | ---> [ Database Shard C ]
-------------------------
      `} />
      <SDParagraph>
        <strong>The Catch:</strong> Sharding is incredibly complex. If User 50 (Shard A) wants to see orders from User 1500 (Shard B), you can't use a simple SQL JOIN anymore. You have to query both databases and merge the results in your Java code. Avoid sharding until absolutely necessary.
      </SDParagraph>

      <SDHeading2>3. The CAP Theorem</SDHeading2>
      <SDParagraph>
        A fundamental rule of distributed systems. In the presence of a <strong>Network Partition (P)</strong> (servers lose connection to each other), you must choose between:
      </SDParagraph>
      <SDList>
        <li><strong>Consistency (C):</strong> Every read receives the most recent write. (System pauses to prevent stale reads).</li>
        <li><strong>Availability (A):</strong> Every request receives a response, but it might not be the most recent data.</li>
      </SDList>
      <SDParagraph>
        You can't have both. Relational databases usually choose CP (Consistency). NoSQL databases like Cassandra often choose AP (Availability).
      </SDParagraph>

      <InterviewQuestion 
        question="How would you design the database for an E-Commerce checkout vs a Twitter feed?"
        answer={
          <div>
            <p><strong>E-Commerce Checkout:</strong> I would use a Relational Database (SQL) because ACID compliance is mandatory. If a payment succeeds but inventory fails to deduct, we lose money. I need strict transactions.</p>
            <p className="mt-2"><strong>Twitter Feed:</strong> I would use a NoSQL Database (like Cassandra). It's a massive scale, read-heavy system where strict consistency doesn't matter. If I see a tweet 2 seconds later than someone else, nobody cares. Availability and Horizontal Scalability are the priorities.</p>
          </div>
        }
      />
    </div>
  );
}

import { InterviewTopic } from './types';

export const databaseTopics: InterviewTopic[] = [
  {
    id: 'sql-joins',
    name: 'SQL Joins',
    category: 'SQL',
    difficulty: 'medium',
    description: 'SQL Joins are used to combine rows from two or more tables based on a related column. Understanding different join types is crucial for effective database querying.',
    bulletPoints: [
      'INNER JOIN: Returns matching rows from both tables',
      'LEFT JOIN: All rows from left table + matching from right',
      'RIGHT JOIN: All rows from right table + matching from left',
      'FULL OUTER JOIN: All rows when there\'s a match in either table'
    ],
    codeExample: `-- INNER JOIN
SELECT orders.id, customers.name
FROM orders
INNER JOIN customers ON orders.customer_id = customers.id;

-- LEFT JOIN
SELECT customers.name, orders.id
FROM customers
LEFT JOIN orders ON customers.id = orders.customer_id;

-- Multiple JOINs
SELECT o.id, c.name, p.product_name
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN products p ON o.product_id = p.id
WHERE o.order_date > '2024-01-01';`
  },
  {
    id: 'sql-indexes',
    name: 'Database Indexes',
    category: 'SQL',
    difficulty: 'medium',
    description: 'Indexes are database structures that improve query performance by providing quick access to rows. They work like a book\'s index, allowing the database to find data without scanning every row.',
    bulletPoints: [
      'B-tree indexes are most common (balanced tree structure)',
      'Indexes speed up SELECT but slow down INSERT/UPDATE',
      'Composite indexes cover multiple columns',
      'Use EXPLAIN to analyze query execution plans'
    ],
    codeExample: `-- Create single column index
CREATE INDEX idx_customer_email ON customers(email);

-- Create composite index
CREATE INDEX idx_order_date_status ON orders(order_date, status);

-- Create unique index
CREATE UNIQUE INDEX idx_users_username ON users(username);

-- Analyze query
EXPLAIN ANALYZE
SELECT * FROM orders
WHERE customer_id = 123 AND status = 'pending';`
  },
  {
    id: 'sql-transactions',
    name: 'Transactions and ACID',
    category: 'SQL',
    difficulty: 'hard',
    description: 'Transactions ensure data integrity by grouping operations that must succeed or fail together. ACID properties (Atomicity, Consistency, Isolation, Durability) define transaction behavior.',
    bulletPoints: [
      'Atomicity: All operations succeed or all fail',
      'Consistency: Database remains in valid state',
      'Isolation: Concurrent transactions don\'t interfere',
      'Durability: Committed data survives system failures'
    ],
    codeExample: `-- Transaction example
BEGIN TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- Check for errors
IF @@ERROR <> 0
    ROLLBACK;
ELSE
    COMMIT;

-- Isolation levels
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
-- Options: READ UNCOMMITTED, READ COMMITTED, 
-- REPEATABLE READ, SERIALIZABLE`
  },
  {
    id: 'mongo-basics',
    name: 'MongoDB Fundamentals',
    category: 'MongoDB',
    difficulty: 'easy',
    description: 'MongoDB is a document-oriented NoSQL database that stores data in flexible, JSON-like documents. It provides high performance, high availability, and easy scalability.',
    bulletPoints: [
      'Documents are stored in BSON (Binary JSON) format',
      'Collections are analogous to tables in SQL',
      'No fixed schema - documents can have different fields',
      'Embedded documents reduce need for joins'
    ],
    codeExample: `// Insert document
db.users.insertOne({
  name: "Divyansh",
  email: "divyansh@example.com",
  skills: ["Java", "Spring Boot", "MongoDB"],
  address: {
    city: "Bangalore",
    country: "India"
  }
});

// Find documents
db.users.find({ "skills": "Java" });

// Update document
db.users.updateOne(
  { email: "divyansh@example.com" },
  { $push: { skills: "React" } }
);`
  },
  {
    id: 'mongo-aggregation',
    name: 'MongoDB Aggregation',
    category: 'MongoDB',
    difficulty: 'hard',
    description: 'The aggregation framework allows you to process data records and return computed results. It provides powerful operations for data transformation, grouping, and analysis.',
    bulletPoints: [
      '$match filters documents (like WHERE in SQL)',
      '$group aggregates values (like GROUP BY)',
      '$project shapes output documents',
      '$lookup performs left outer joins'
    ],
    codeExample: `// Aggregation pipeline
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: {
      _id: "$customerId",
      totalOrders: { $sum: 1 },
      totalSpent: { $sum: "$amount" },
      avgOrderValue: { $avg: "$amount" }
  }},
  { $sort: { totalSpent: -1 } },
  { $limit: 10 },
  { $lookup: {
      from: "customers",
      localField: "_id",
      foreignField: "_id",
      as: "customerInfo"
  }}
]);`
  }
];

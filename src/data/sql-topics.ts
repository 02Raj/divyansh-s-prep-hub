import { InterviewTopic } from './types';

export const sqlTopics: InterviewTopic[] = [
  // ==========================================
  // SECTION 1: Database Fundamentals
  // ==========================================
  {
    id: 'db-fundamentals',
    name: 'Database Fundamentals',
    category: 'SQL',
    difficulty: 'easy',
    description: 'A relational database stores data in tables (rows and columns) that are connected by relationships. PostgreSQL is a powerful, open-source object-relational database system (ORDBMS).',
    bulletPoints: [
      'Table: A collection of related data in rows and columns',
      'Primary Key: A column (or set of columns) that uniquely identifies each row in a table. Cannot be NULL',
      'Foreign Key: A column that links to the Primary Key of another table, creating a relationship (e.g., user_id in an orders table)',
      'Relationships: One-to-One, One-to-Many (most common), and Many-to-Many (requires a junction table)',
      'NULL: Represents missing or unknown data. It is NOT zero or an empty string'
    ],
    codeExample: `-- Creating tables with Primary and Foreign Keys
CREATE TABLE users (
    id SERIAL PRIMARY KEY, -- SERIAL in Postgres automatically increments
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Foreign Key links this order to a specific user
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);`
  },
  
  // ==========================================
  // SECTION 2: SQL Basics
  // ==========================================
  {
    id: 'sql-basics',
    name: 'SQL Basics & Filtering',
    category: 'SQL',
    difficulty: 'easy',
    description: 'Basic SQL involves retrieving and filtering data using SELECT, FROM, and WHERE clauses. PostgreSQL provides specific operators like ILIKE for case-insensitive matching.',
    bulletPoints: [
      'SELECT specifies columns, FROM specifies tables, WHERE filters rows based on conditions',
      'DISTINCT removes duplicate rows from the result set',
      'ORDER BY sorts results (ASC or DESC). LIMIT and OFFSET restrict the number of returned rows',
      '🐘 Postgres specific: ILIKE performs case-insensitive pattern matching (standard SQL uses LIKE which is case-sensitive)',
      'Use IS NULL or IS NOT NULL to check for nulls, NOT = NULL (which evaluates to unknown)'
    ],
    codeExample: `-- Retrieve unique cities
SELECT DISTINCT city FROM users;

-- Filter with comparison and logical operators
SELECT id, username, email 
FROM users 
WHERE status = 'ACTIVE' 
  AND (age BETWEEN 18 AND 30)
  AND email IS NOT NULL;

-- 🐘 Postgres ILIKE (case-insensitive matching)
SELECT * FROM users 
WHERE username ILIKE 'john%'; -- Matches 'John', 'john', 'JOHN'

-- Sorting and limiting
SELECT * FROM orders 
ORDER BY order_date DESC 
LIMIT 10 OFFSET 20; -- Get rows 21-30 (useful for basic pagination)`
  },

  // ==========================================
  // SECTION 3: SQL Execution Order
  // ==========================================
  {
    id: 'sql-execution-order',
    name: 'Logical SQL Execution Order',
    category: 'SQL',
    difficulty: 'medium',
    description: 'Understanding the logical execution order of a SQL query is crucial for interviews. It explains why you cannot use a SELECT alias in a WHERE clause.',
    bulletPoints: [
      '1. FROM (and JOINs): Gathers all the data',
      '2. WHERE: Filters individual rows',
      '3. GROUP BY: Aggregates rows into groups',
      '4. HAVING: Filters the grouped data',
      '5. SELECT: Picks the columns to return (Aliases are created here)',
      '6. DISTINCT: Removes duplicates',
      '7. ORDER BY: Sorts the results (Can use SELECT aliases here)',
      '8. LIMIT / OFFSET: Restricts the final output'
    ],
    codeExample: `-- Question: Why does this query fail?
-- SELECT department, COUNT(*) as total FROM employees WHERE total > 5 GROUP BY department;
-- Answer: Because WHERE runs BEFORE SELECT, so 'total' doesn't exist yet!

-- Correct way (using HAVING):
SELECT 
    department, 
    COUNT(*) as total_employees -- Alias created at step 5
FROM employees                  -- Runs 1st
WHERE status = 'ACTIVE'         -- Runs 2nd (Filters rows)
GROUP BY department             -- Runs 3rd (Groups rows)
HAVING COUNT(*) > 5             -- Runs 4th (Filters groups - cannot use alias here in standard SQL)
ORDER BY total_employees DESC;  -- Runs 7th (CAN use alias here)`
  },

  // ==========================================
  // SECTION 4: Data Modification
  // ==========================================
  {
    id: 'sql-data-modification',
    name: 'INSERT, UPDATE, DELETE & RETURNING',
    category: 'SQL',
    difficulty: 'easy',
    description: 'Modifying data safely requires understanding transaction boundaries and proper WHERE clauses. PostgreSQL provides the RETURNING clause to get the modified data instantly.',
    bulletPoints: [
      'Always use a WHERE clause with UPDATE and DELETE to avoid modifying the entire table',
      'DELETE vs TRUNCATE: DELETE removes rows one by one (logs each row, slower, can rollback). TRUNCATE empties the table instantly (faster, resets sequences)',
      'DELETE vs DROP: DELETE removes data, DROP removes the entire table structure from the database',
      '🐘 Postgres specific: The RETURNING clause allows you to return the values of inserted, updated, or deleted rows without a separate SELECT query'
    ],
    codeExample: `-- Multi-row INSERT with RETURNING (Postgres feature)
INSERT INTO users (username, email) 
VALUES 
    ('alice', 'alice@example.com'),
    ('bob', 'bob@example.com')
RETURNING id, username; -- Returns the newly generated IDs immediately

-- Safe UPDATE
UPDATE users 
SET status = 'INACTIVE' 
WHERE last_login < CURRENT_DATE - INTERVAL '1 year'
RETURNING id; -- See which users were updated

-- DELETE vs TRUNCATE
DELETE FROM orders WHERE status = 'CANCELLED'; -- Removes specific rows
TRUNCATE TABLE audit_logs; -- Instantly empties table, resets ID sequences, much faster for large tables`
  },

  // ==========================================
  // SECTION 5: Aggregate Functions
  // ==========================================
  {
    id: 'sql-aggregate-functions',
    name: 'Aggregate Functions (GROUP BY / HAVING)',
    category: 'SQL',
    difficulty: 'medium',
    description: 'Aggregate functions perform a calculation on a set of values and return a single value. They are typically used with GROUP BY.',
    bulletPoints: [
      'Common functions: COUNT(), SUM(), AVG(), MIN(), MAX()',
      'COUNT(*) counts all rows. COUNT(column_name) counts only non-NULL values in that column',
      'NULL behavior: Most aggregate functions (SUM, AVG, MIN, MAX) ignore NULL values',
      'GROUP BY organizes identical data into groups. Any column in SELECT not in an aggregate function MUST be in the GROUP BY clause',
      'HAVING filters groups AFTER aggregation, whereas WHERE filters rows BEFORE aggregation'
    ],
    codeExample: `-- Find departments with an average salary greater than 70000
SELECT 
    department_id,
    COUNT(*) as total_employees,
    AVG(salary) as average_salary,
    MAX(salary) as highest_salary
FROM employees
WHERE is_active = true              -- 1. Filter active employees only
GROUP BY department_id              -- 2. Group them by department
HAVING AVG(salary) > 70000;         -- 3. Filter departments based on aggregate

-- 🎯 Interview Q: How do you find duplicate emails?
SELECT email, COUNT(*) 
FROM users 
GROUP BY email 
HAVING COUNT(*) > 1;`
  },

  // ==========================================
  // SECTION 6: JOINs
  // ==========================================
  {
    id: 'sql-joins',
    name: 'SQL JOINs',
    category: 'SQL',
    difficulty: 'medium',
    description: 'JOINs combine rows from two or more tables based on a related column. Understanding the difference between JOIN types is a fundamental interview requirement.',
    bulletPoints: [
      'INNER JOIN (Default): Returns only rows where there is a match in BOTH tables',
      'LEFT JOIN: Returns ALL rows from the left table, and matching rows from the right. Unmatched right side becomes NULL',
      'RIGHT JOIN: Returns ALL rows from the right table, and matching rows from the left',
      'FULL OUTER JOIN: Returns all rows when there is a match in EITHER table',
      '⭐ Common mistake: Putting a left table condition in the WHERE clause of a LEFT JOIN turns it into an INNER JOIN. Put it in the ON clause instead'
    ],
    codeExample: `-- INNER JOIN: Get users who have placed orders
SELECT u.username, o.order_date
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN: Get ALL users, and their orders if they have any
SELECT u.username, o.order_date
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- 🎯 Interview Q: Find users who have NEVER placed an order
-- We use a LEFT JOIN and look for NULLs on the right side
SELECT u.username
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;`
  },

  // ==========================================
  // SECTION 7: Subqueries
  // ==========================================
  {
    id: 'sql-subqueries',
    name: 'Subqueries & IN vs EXISTS',
    category: 'SQL',
    difficulty: 'medium',
    description: 'A subquery is a query nested inside another query. They can return a single value, a list of values, or a derived table.',
    bulletPoints: [
      'Scalar subquery: Returns exactly one row and one column (e.g., getting the MAX value)',
      'Multi-row subquery: Returns a single column with multiple rows (used with IN or ANY)',
      'Correlated subquery: A subquery that references columns from the outer query. It executes once for EVERY row in the outer query (can be slow)',
      'IN vs EXISTS: IN compares against a list of values. EXISTS checks if the subquery returns ANY rows (evaluates to true/false)',
      '⭐ Performance: EXISTS is generally faster than IN when checking against a large dataset, as it stops searching upon finding the first match'
    ],
    codeExample: `-- Scalar Subquery: Find employees earning more than the company average
SELECT name, salary 
FROM employees 
WHERE salary > (SELECT AVG(salary) FROM employees);

-- IN vs EXISTS (Find customers with orders)
-- Using IN (Evaluates subquery fully, then compares)
SELECT name FROM customers 
WHERE id IN (SELECT customer_id FROM orders);

-- Using EXISTS (Faster for large tables, short-circuits on match)
-- Notice this is a Correlated Subquery (references 'c.id')
SELECT name FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.id
);`
  },

  // ==========================================
  // SECTION 8: CTEs
  // ==========================================
  {
    id: 'sql-ctes',
    name: 'Common Table Expressions (CTEs)',
    category: 'SQL',
    difficulty: 'medium',
    description: 'A CTE (defined using the WITH clause) provides a temporary result set that you can reference within a SELECT, INSERT, UPDATE, or DELETE statement. It vastly improves query readability.',
    bulletPoints: [
      'Improves readability compared to deeply nested subqueries (reads top-to-bottom instead of inside-out)',
      'Can be referenced multiple times in the main query',
      '🐘 Postgres specific: Prior to PG 12, CTEs were always materialized (evaluated separately). PG 12+ can inline them into the main query plan for better performance',
      'Recursive CTEs: Used for querying hierarchical data like org charts, category trees, or graph traversal'
    ],
    codeExample: `-- Using a CTE to simplify a complex query
-- 🎯 Goal: Find departments whose average salary is higher than the overall company average
WITH 
company_avg AS (
    SELECT AVG(salary) as overall_avg FROM employees
),
dept_avg AS (
    SELECT department_id, AVG(salary) as dept_average 
    FROM employees 
    GROUP BY department_id
)
SELECT d.department_id, d.dept_average
FROM dept_avg d
JOIN company_avg c ON d.dept_average > c.overall_avg;

-- Contrast this with the subquery approach which would be much harder to read!`
  },

  // ==========================================
  // SECTION 9: Window Functions
  // ==========================================
  {
    id: 'sql-window-functions',
    name: 'Window Functions (OVER, PARTITION BY)',
    category: 'SQL',
    difficulty: 'hard',
    description: 'Window functions perform calculations across a set of rows related to the current row, WITHOUT collapsing them into a single row like GROUP BY does. Essential for advanced interviews.',
    bulletPoints: [
      'OVER() defines the window. PARTITION BY divides rows into groups. ORDER BY sorts rows within the partition',
      'ROW_NUMBER(): Assigns a unique sequential integer to rows (1, 2, 3...)',
      'RANK(): Same as ROW_NUMBER but leaves gaps if there are ties (1, 2, 2, 4)',
      'DENSE_RANK(): Like RANK, but no gaps (1, 2, 2, 3)',
      'LAG() and LEAD(): Accesses data from the previous or next row in the window (perfect for comparing month-over-month changes)'
    ],
    codeExample: `-- 🔥 High-Priority Query Pattern: Top N per group
-- 🎯 Interview Q: Find the top 3 highest paid employees in EACH department

WITH RankedEmployees AS (
    SELECT 
        name,
        department_id,
        salary,
        DENSE_RANK() OVER (
            PARTITION BY department_id -- Reset rank for each department
            ORDER BY salary DESC       -- Highest salary gets rank 1
        ) as rank
    FROM employees
)
SELECT name, department_id, salary
FROM RankedEmployees
WHERE rank <= 3;

-- 🎯 Interview Q: Compare current month revenue to previous month
SELECT 
    month,
    revenue,
    LAG(revenue) OVER (ORDER BY month) as prev_month_revenue,
    revenue - LAG(revenue) OVER (ORDER BY month) as difference
FROM monthly_sales;`
  },

  // ==========================================
  // SECTION 10: Constraints & Database Design
  // ==========================================
  {
    id: 'sql-design-constraints',
    name: 'Database Design & Constraints',
    category: 'SQL',
    difficulty: 'medium',
    description: 'Database design (normalization) minimizes redundancy and ensures data integrity through constraints. Application-level validation is not enough; the database must enforce rules.',
    bulletPoints: [
      'Normalization: 1NF (atomic values), 2NF (remove partial dependencies), 3NF (remove transitive dependencies - "every non-key attribute must depend on the key, the whole key, and nothing but the key")',
      'Denormalization: Intentionally adding redundancy to improve read performance (often used in analytics/reporting)',
      'UNIQUE ensures column values are distinct. CHECK ensures values meet a specific condition (e.g., price > 0)',
      'Foreign Key Actions: ON DELETE CASCADE (deletes child rows if parent is deleted), ON DELETE RESTRICT (prevents deleting parent if child exists)',
      '⭐ Interview tip: Never trust application validation alone. Always use database constraints (NOT NULL, UNIQUE, FK) as the final line of defense against bad data'
    ],
    codeExample: `-- Creating a robust table with constraints
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT NOT NULL,
    
    -- CHECK constraint ensures data validity
    CONSTRAINT check_price_positive CHECK (price >= 0),
    
    -- Foreign Key ensuring referential integrity
    -- RESTRICT prevents deleting a category if products still belong to it
    CONSTRAINT fk_category 
        FOREIGN KEY(category_id) 
        REFERENCES categories(id) 
        ON DELETE RESTRICT
);`
  },

  // ==========================================
  // SECTION 11: Indexes
  // ==========================================
  {
    id: 'sql-indexes',
    name: 'Indexes & B-Trees',
    category: 'SQL',
    difficulty: 'hard',
    description: 'Indexes are data structures (typically B-Trees) that vastly improve read performance but slow down writes (INSERT/UPDATE/DELETE). Knowing how to use them is a Senior backend requirement.',
    bulletPoints: [
      'B-Tree Index: The default Postgres index. Best for equality (=) and range (<, >, BETWEEN) queries',
      'Composite Index: An index on multiple columns (e.g., INDEX(last_name, first_name)). Leftmost-prefix rule applies: it only works if you query by last_name, or last_name AND first_name. It will NOT work if you query ONLY by first_name',
      'Partial Index (🐘 Postgres): An index with a WHERE clause (e.g., index only ACTIVE users). Saves disk space and update overhead',
      'Over-indexing slows down inserts and updates because every index must be updated when the table data changes',
      'Indexes on Primary Keys and UNIQUE constraints are created automatically'
    ],
    codeExample: `-- Standard B-Tree Index (Speeds up WHERE email = '...')
CREATE INDEX idx_users_email ON users(email);

-- Composite Index (Leftmost Prefix Rule)
CREATE INDEX idx_users_name ON users(last_name, first_name);
-- Fast: WHERE last_name = 'Smith'
-- Fast: WHERE last_name = 'Smith' AND first_name = 'John'
-- Slow (Index not used): WHERE first_name = 'John'

-- 🐘 Postgres Partial Index (Highly optimized for specific queries)
-- 🎯 Use case: You frequently query unprocessed orders, which are only 5% of the table
CREATE INDEX idx_unprocessed_orders 
ON orders(created_at) 
WHERE status = 'UNPROCESSED';`
  },

  // ==========================================
  // SECTION 12: Query Optimization & EXPLAIN
  // ==========================================
  {
    id: 'sql-explain-optimization',
    name: 'Query Optimization & EXPLAIN ANALYZE',
    category: 'PostgreSQL',
    difficulty: 'hard',
    description: 'When a query is slow, you must use EXPLAIN to see the Query Planner\'s execution strategy. EXPLAIN shows estimates; EXPLAIN ANALYZE executes the query and shows actual timings.',
    bulletPoints: [
      'Sequential Scan (Seq Scan): Scans every row in the table. Bad for large tables, perfectly normal for very small tables',
      'Index Scan: Traverses the B-tree index, then fetches the row from the table heap. Fast for selective queries',
      'Index Only Scan: The requested columns are entirely contained in the index. Extremely fast as it skips reading the table heap',
      '🐘 EXPLAIN ANALYZE actually RUNS the query. Do NOT use it on an UPDATE/DELETE in production without wrapping it in a transaction block with ROLLBACK!',
      'If Postgres is doing a Seq Scan despite having an index, it means the query is fetching too many rows (low selectivity), making a sequential scan cheaper mathematically'
    ],
    codeExample: `-- 🎯 Scenario: "This query is slow. What do you do?"
-- 1. Prepend EXPLAIN ANALYZE to the query
EXPLAIN ANALYZE 
SELECT * FROM orders WHERE customer_id = 12345;

-- Expected Output Analysis:
-- -> Index Scan using idx_customer on orders (cost=0.42..8.44 rows=1 width=104) (actual time=0.015..0.016 rows=2 loops=1)
-- 
-- Key things to look for:
-- 1. Scan Type (Seq Scan vs Index Scan)
-- 2. "rows=" (estimated rows) vs "actual time=... rows=" (actual rows)
-- If estimate is 1000 but actual is 1, your table statistics are stale. Run ANALYZE on the table.

-- 🐘 Postgres Specific: Updating statistics manually
ANALYZE orders;`
  },

  // ==========================================
  // SECTION 13: Transactions & Isolation
  // ==========================================
  {
    id: 'sql-transactions-isolation',
    name: 'Transactions & Isolation Levels',
    category: 'SQL',
    difficulty: 'hard',
    description: 'Transactions group operations into an atomic unit (all succeed or all fail). Isolation levels control how concurrent transactions interact with each other.',
    bulletPoints: [
      'ACID: Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent safety), Durability (saved to disk)',
      'Dirty Read: Reading uncommitted data from another transaction. (Postgres NEVER allows this, even if asked)',
      'Read Committed (Postgres Default): A query only sees data committed BEFORE the query started. Prevents dirty reads',
      'Repeatable Read: A transaction sees a snapshot of the database from when the transaction started. Prevents non-repeatable reads (data changing while you read it twice)',
      'Serializable: Strictest level. Executes transactions concurrently but guarantees the result is the same as if run sequentially'
    ],
    codeExample: `-- 🎯 Scenario: Bank Transfer (Requires Atomicity)
BEGIN; -- Starts transaction

UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;

-- If application logic fails here, we ROLLBACK to undo the first update
-- If successful, we COMMIT to persist both updates permanently
COMMIT;

-- 🐘 Setting Isolation Level in Postgres
BEGIN ISOLATION LEVEL REPEATABLE READ;
SELECT balance FROM accounts WHERE id = 1;
-- Even if another transaction updates account 1 now, 
-- running the same SELECT again in this transaction will yield the same result.
COMMIT;`
  },

  // ==========================================
  // SECTION 14: MVCC & VACUUM
  // ==========================================
  {
    id: 'postgres-mvcc-vacuum',
    name: 'MVCC, VACUUM & ANALYZE',
    category: 'PostgreSQL',
    difficulty: 'hard',
    description: 'Multi-Version Concurrency Control (MVCC) is how Postgres handles concurrency. Instead of locking a row during an UPDATE, Postgres creates a new version of the row.',
    bulletPoints: [
      'MVCC: Readers do not block writers, and writers do not block readers. Each transaction sees a consistent "snapshot" of the data',
      'In Postgres, an UPDATE is effectively a DELETE of the old row + an INSERT of a new row version (tuple)',
      'Dead Tuples: The old row versions left behind after an UPDATE/DELETE. They take up disk space (table bloat) and slow down scans',
      'VACUUM: A maintenance process that sweeps the table and marks dead tuples as space available for future inserts',
      'ANALYZE: Gathers statistics about data distribution in the table so the Query Planner can make good decisions (e.g., Seq Scan vs Index Scan)'
    ],
    codeExample: `-- You rarely run these manually as the 'autovacuum' daemon handles it,
-- but in interviews, you must know what they do!

-- Reclaim space from dead tuples (does NOT lock the table)
VACUUM users;

-- Update planner statistics (does NOT lock the table)
ANALYZE users;

-- Do both at once
VACUUM ANALYZE users;

-- ⚠️ VACUUM FULL: Rewrites the entire table to reclaim disk space back to the OS.
-- WARNING: Locks the entire table exclusively. Never run during peak production!
VACUUM FULL users;`
  },

  // ==========================================
  // SECTION 15: JSONB
  // ==========================================
  {
    id: 'postgres-jsonb',
    name: 'JSONB Data Type',
    category: 'PostgreSQL',
    difficulty: 'medium',
    description: 'PostgreSQL has best-in-class support for JSON. JSONB stores data in a decomposed binary format, making it fast to process and indexable, unlike standard text-based JSON.',
    bulletPoints: [
      'JSON vs JSONB: Always use JSONB. It removes whitespace, does not preserve key order, but is vastly faster to query and supports indexing',
      'When to use: Perfect for unstructured data, dynamic user settings, or third-party API payloads where the schema changes constantly',
      'When NOT to use: Do not use it as a replacement for relational columns. If you frequently JOIN, aggregate, or filter by a field, make it a real column',
      'Operators: -> returns JSON object, ->> returns text. @> checks if left JSON contains right JSON',
      'Indexing: You can create a GIN index on a JSONB column to quickly search for keys or values within the JSON document'
    ],
    codeExample: `-- Creating a table with JSONB
CREATE TABLE user_settings (
    user_id INT PRIMARY KEY,
    preferences JSONB NOT NULL
);

INSERT INTO user_settings VALUES 
(1, '{"theme": "dark", "notifications": {"email": true, "sms": false}}');

-- Querying inside JSONB (->> returns text)
SELECT user_id 
FROM user_settings 
WHERE preferences->>'theme' = 'dark';

-- Deep querying (Extracting boolean value)
SELECT user_id 
FROM user_settings 
WHERE (preferences->'notifications'->>'email')::boolean = true;

-- 🐘 Creating a GIN index on the JSONB column for fast searching
CREATE INDEX idx_preferences ON user_settings USING GIN (preferences);`
  },

  // ==========================================
  // SECTION 16: Pagination
  // ==========================================
  {
    id: 'sql-pagination',
    name: 'Pagination (OFFSET vs Keyset)',
    category: 'SQL',
    difficulty: 'medium',
    description: 'Pagination is how you fetch large datasets in chunks (e.g., page 1, page 2). OFFSET pagination is simple but terrible for performance on large tables.',
    bulletPoints: [
      'LIMIT / OFFSET: Skips N rows, then returns M rows. Easy to implement but scanning the skipped rows gets slower as the OFFSET grows',
      'OFFSET 10000 LIMIT 20 requires the database to process and discard 10,000 rows before returning 20. Bad for performance!',
      'Keyset Pagination (Cursor Pagination): Remembers the last ID/Timestamp seen on the previous page, and asks for rows GREATER than that value',
      'Keyset pagination is extremely fast because it uses an index scan directly to the starting point, but you cannot easily jump to a specific page number (like "Page 50")',
      'Always use Keyset/Cursor pagination for infinite scrolling feeds or huge backend batch processing'
    ],
    codeExample: `-- ❌ Bad approach for large tables (OFFSET Pagination)
-- Jumping to page 500 (assuming 20 items per page)
SELECT id, name, created_at 
FROM products 
ORDER BY created_at DESC 
LIMIT 20 OFFSET 10000; -- DB scans and discards 10,000 rows!

-- ✅ Best approach for large tables (Keyset / Cursor Pagination)
-- Client passes the 'created_at' and 'id' of the LAST item they saw on page 499
SELECT id, name, created_at 
FROM products 
WHERE created_at < '2024-03-15 10:00:00' 
   OR (created_at = '2024-03-15 10:00:00' AND id < 5432) -- Tie-breaker
ORDER BY created_at DESC, id DESC 
LIMIT 20; -- Fast! Uses the index to jump instantly to the exact row.`
  },

  // ==========================================
  // SECTION 17: UPSERT
  // ==========================================
  {
    id: 'postgres-upsert',
    name: 'UPSERT (INSERT ... ON CONFLICT)',
    category: 'PostgreSQL',
    difficulty: 'medium',
    description: 'UPSERT handles the scenario: "Insert this row, but if it already exists, update it instead." It prevents race conditions compared to doing a SELECT followed by an INSERT/UPDATE.',
    bulletPoints: [
      'Postgres implementation uses INSERT ... ON CONFLICT',
      'Requires a UNIQUE constraint or PRIMARY KEY on the conflict column(s) to detect the collision',
      'DO NOTHING: Silently ignores the insert if a conflict occurs (great for idempotency)',
      'DO UPDATE SET: Updates the existing row with new values. The EXCLUDED keyword represents the new row that was attempted to be inserted',
      'Solves concurrency issues (two users inserting the same thing at the exact same millisecond)'
    ],
    codeExample: `-- 🎯 Scenario: Syncing users from an external system. 
-- Insert them, or update their name if they already exist based on email.

INSERT INTO users (email, name, last_login)
VALUES ('john@example.com', 'John Doe', CURRENT_TIMESTAMP)
ON CONFLICT (email) -- Requires a UNIQUE constraint on email!
DO UPDATE SET 
    name = EXCLUDED.name, -- EXCLUDED refers to 'John Doe'
    last_login = EXCLUDED.last_login;

-- Idempotency Example (Insert if not exists, otherwise ignore)
INSERT INTO tags (name)
VALUES ('java')
ON CONFLICT (name) 
DO NOTHING;`
  }
];

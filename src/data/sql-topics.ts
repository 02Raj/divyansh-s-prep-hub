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
    description: 'A relational database stores data in tables (rows and columns) connected by relationships. Understanding keys and relationships is the starting point.',
    bulletPoints: [
      'Table: A collection of related data organized in rows (records) and columns (fields)',
      'Primary Key: A column (or set of columns) that uniquely identifies each row. Cannot be NULL. One per table',
      'Foreign Key: A column that links to the Primary Key of another table, creating a relationship (e.g., user_id in orders table)',
      'Relationships: One-to-One, One-to-Many (most common, e.g., one user has many orders), Many-to-Many (requires a junction/join table)',
      'NULL: Represents missing or unknown data. It is NOT zero or empty string. Use IS NULL to check, NOT = NULL'
    ],
    codeExample: `-- Creating tables with Primary and Foreign Keys
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Foreign Key links this order to a specific user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ON DELETE CASCADE: If a user is deleted, all their orders are also deleted
-- ON DELETE RESTRICT: Prevents deleting a user if they have orders`
  },

  // ==========================================
  // SECTION 2: SQL Basics & Filtering
  // ==========================================
  {
    id: 'sql-basics',
    name: 'SQL Basics & Filtering',
    category: 'SQL',
    difficulty: 'easy',
    description: 'Basic SQL involves retrieving and filtering data using SELECT, FROM, WHERE, and ORDER BY. These are the building blocks of every SQL query.',
    bulletPoints: [
      'SELECT specifies columns, FROM specifies tables, WHERE filters rows based on conditions',
      'DISTINCT removes duplicate rows from the result set',
      'ORDER BY sorts results (ASC = ascending, DESC = descending). LIMIT restricts how many rows you get back',
      'LIKE for pattern matching: % matches any characters, _ matches exactly one character',
      'IN (value1, value2): Matches any value in the list. BETWEEN x AND y: Range check (inclusive)',
      'Use IS NULL or IS NOT NULL to check for nulls — never use = NULL (it always returns false)'
    ],
    codeExample: `-- Retrieve unique cities
SELECT DISTINCT city FROM users;

-- Filter with multiple conditions
SELECT id, username, email
FROM users
WHERE status = 'ACTIVE'
  AND age BETWEEN 18 AND 30
  AND email IS NOT NULL;

-- Pattern matching
SELECT * FROM users WHERE username LIKE 'john%';  -- Starts with 'john'
SELECT * FROM users WHERE email LIKE '%@gmail.com'; -- Gmail users

-- Sorting and limiting
SELECT * FROM orders
ORDER BY order_date DESC
LIMIT 10 OFFSET 20; -- Skip 20 rows, get next 10 (basic pagination)`
  },

  // ==========================================
  // SECTION 3: Data Modification (INSERT, UPDATE, DELETE)
  // ==========================================
  {
    id: 'sql-data-modification',
    name: 'INSERT, UPDATE, DELETE — Data Modification',
    category: 'SQL',
    difficulty: 'easy',
    description: 'Modifying data safely requires proper WHERE clauses. Know the difference between DELETE, TRUNCATE, and DROP — this is asked in almost every interview.',
    bulletPoints: [
      'INSERT INTO: Adds new rows. Can insert single or multiple rows at once',
      'UPDATE: Changes existing rows. ALWAYS use WHERE — without it, you update the ENTIRE table!',
      'DELETE: Removes specific rows. ALWAYS use WHERE — without it, you delete everything!',
      'DELETE vs TRUNCATE: DELETE removes rows one by one (can rollback, slow). TRUNCATE empties the entire table instantly (faster, resets auto-increment)',
      'DELETE vs DROP: DELETE removes data only. DROP removes the entire table (structure + data + indexes — gone forever)',
      'UPSERT: Insert if new, update if exists. MySQL: INSERT ... ON DUPLICATE KEY UPDATE. Postgres: INSERT ... ON CONFLICT DO UPDATE'
    ],
    codeExample: `-- Insert multiple rows
INSERT INTO users (username, email)
VALUES
    ('alice', 'alice@example.com'),
    ('bob', 'bob@example.com');

-- Safe UPDATE (always include WHERE!)
UPDATE users
SET status = 'INACTIVE'
WHERE last_login < DATE_SUB(CURRENT_DATE, INTERVAL 1 YEAR);

-- DELETE specific rows
DELETE FROM orders WHERE status = 'CANCELLED';

-- DELETE vs TRUNCATE vs DROP
DELETE FROM orders;     -- Slow, logged, can rollback
TRUNCATE TABLE orders;  -- Fast, resets auto-increment, can't rollback easily
DROP TABLE orders;      -- Table gone forever (structure + data + everything)`
  },

  // ==========================================
  // SECTION 4: SQL Execution Order
  // ==========================================
  {
    id: 'sql-execution-order',
    name: 'SQL Query Execution Order',
    category: 'SQL',
    difficulty: 'medium',
    description: 'SQL doesn\'t run in the order you write it. Understanding the logical execution order explains why you can\'t use a SELECT alias in WHERE. This is a favorite interview question.',
    bulletPoints: [
      '1. FROM (+ JOINs): Gathers all the data from tables',
      '2. WHERE: Filters individual rows (can\'t use aliases here — they don\'t exist yet!)',
      '3. GROUP BY: Groups rows together for aggregation',
      '4. HAVING: Filters groups (like WHERE but for groups)',
      '5. SELECT: Picks columns to return (aliases are created HERE)',
      '6. DISTINCT: Removes duplicates',
      '7. ORDER BY: Sorts results (CAN use aliases — they exist by now)',
      '8. LIMIT / OFFSET: Restricts final output'
    ],
    codeExample: `-- ❌ This FAILS! Why?
-- SELECT department, COUNT(*) as total
-- FROM employees
-- WHERE total > 5  -- ERROR: 'total' doesn't exist yet (WHERE runs before SELECT)
-- GROUP BY department;

-- ✅ Correct way (use HAVING to filter groups):
SELECT
    department,
    COUNT(*) as total_employees    -- Alias created at step 5
FROM employees                     -- Runs 1st
WHERE status = 'ACTIVE'            -- Runs 2nd (filters individual rows)
GROUP BY department                -- Runs 3rd (groups rows)
HAVING COUNT(*) > 5                -- Runs 4th (filters groups)
ORDER BY total_employees DESC;     -- Runs 7th (CAN use alias here)`
  },

  // ==========================================
  // SECTION 5: Aggregate Functions
  // ==========================================
  {
    id: 'sql-aggregate-functions',
    name: 'Aggregate Functions (GROUP BY / HAVING)',
    category: 'SQL',
    difficulty: 'medium',
    description: 'Aggregate functions calculate a single value from a set of rows. Used with GROUP BY to get summaries. WHERE filters rows, HAVING filters groups — know the difference!',
    bulletPoints: [
      'Common functions: COUNT(), SUM(), AVG(), MIN(), MAX()',
      'COUNT(*) counts ALL rows. COUNT(column) counts only non-NULL values in that column',
      'NULLs: Most aggregate functions (SUM, AVG, MIN, MAX) ignore NULL values automatically',
      'GROUP BY groups identical data together. Any column in SELECT that\'s not in an aggregate MUST be in GROUP BY',
      'WHERE filters BEFORE grouping (individual rows). HAVING filters AFTER grouping (group results)',
      'You can use multiple aggregate functions in the same query'
    ],
    codeExample: `-- Find departments with average salary > 70000
SELECT
    department_id,
    COUNT(*) as total_employees,
    AVG(salary) as average_salary,
    MAX(salary) as highest_salary
FROM employees
WHERE is_active = true              -- 1. Filter active employees FIRST
GROUP BY department_id              -- 2. Group by department
HAVING AVG(salary) > 70000;         -- 3. Keep only high-paying departments

-- 🎯 Interview Classic: Find duplicate emails
SELECT email, COUNT(*)
FROM users
GROUP BY email
HAVING COUNT(*) > 1;

-- 🎯 Interview Classic: Count users per city, show only cities with 5+ users
SELECT city, COUNT(*) as user_count
FROM users
GROUP BY city
HAVING COUNT(*) >= 5
ORDER BY user_count DESC;`
  },

  // ==========================================
  // SECTION 6: JOINs
  // ==========================================
  {
    id: 'sql-joins',
    name: 'SQL JOINs — The Complete Guide',
    category: 'SQL',
    difficulty: 'medium',
    description: 'JOINs combine rows from two or more tables based on a related column. Knowing the difference between JOIN types is a fundamental interview requirement.',
    bulletPoints: [
      'INNER JOIN: Returns ONLY rows that have a match in BOTH tables. Most common JOIN',
      'LEFT JOIN: Returns ALL rows from the left table + matching rows from right. Unmatched right side becomes NULL',
      'RIGHT JOIN: Returns ALL rows from right table + matching rows from left. Rarely used — just swap table positions and use LEFT JOIN',
      'FULL OUTER JOIN: Returns all rows from BOTH tables. NULLs where there\'s no match on either side',
      'CROSS JOIN: Every row from table A paired with every row from table B (Cartesian product). Rarely needed',
      '⭐ Common trap: Putting a right-table condition in WHERE of a LEFT JOIN converts it to an INNER JOIN. Put it in ON instead!'
    ],
    codeExample: `-- INNER JOIN: Only users who have placed orders
SELECT u.username, o.order_date
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN: ALL users + their orders (if any)
SELECT u.username, o.order_date
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;
-- Users with no orders will have NULL for order_date

-- 🎯 Interview Classic: Find users who NEVER placed an order
SELECT u.username
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL; -- Only rows where right side is NULL = no match

-- Self JOIN: Find employees and their managers
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;`
  },

  // ==========================================
  // SECTION 7: Subqueries
  // ==========================================
  {
    id: 'sql-subqueries',
    name: 'Subqueries & IN vs EXISTS',
    category: 'SQL',
    difficulty: 'medium',
    description: 'A subquery is a query inside another query. They can return a single value, a list, or a full table. Know when to use IN vs EXISTS for performance.',
    bulletPoints: [
      'Scalar subquery: Returns ONE value (e.g., getting the MAX salary)',
      'Multi-row subquery: Returns multiple values in one column. Used with IN, ANY, ALL',
      'Correlated subquery: References the outer query. Runs once per row in the outer query — can be slow',
      'IN: Compares against a list of values. EXISTS: Checks if the subquery returns ANY rows (true/false)',
      'Performance: EXISTS is usually faster for large datasets — it stops at the first match. IN loads all values into memory first'
    ],
    codeExample: `-- Scalar subquery: Employees earning above company average
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- IN: Find customers who have placed orders
SELECT name FROM customers
WHERE id IN (SELECT customer_id FROM orders);

-- EXISTS: Same result but usually faster for large tables
SELECT name FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.id
);
-- EXISTS stops at first match, IN loads all IDs into memory

-- 🎯 Interview: Find employees who earn the MAX salary
SELECT name, salary FROM employees
WHERE salary = (SELECT MAX(salary) FROM employees);`
  },

  // ==========================================
  // SECTION 8: CTEs (Common Table Expressions)
  // ==========================================
  {
    id: 'sql-ctes',
    name: 'CTEs (WITH Clause)',
    category: 'SQL',
    difficulty: 'medium',
    description: 'CTEs (WITH clause) create temporary named result sets within a query. They make complex queries readable and maintainable — no more deeply nested subqueries.',
    bulletPoints: [
      'CTE = temporary result set defined using WITH keyword. Exists only for that one query',
      'Much more readable than nested subqueries — reads top-to-bottom instead of inside-out',
      'Can be referenced multiple times in the main query (subqueries get duplicated)',
      'Recursive CTEs: Used for hierarchical data — org charts, category trees, graph traversal',
      'Think of CTE as creating a "temporary view" that lasts for just one query'
    ],
    codeExample: `-- CTE makes complex queries readable
-- 🎯 Goal: Find departments whose avg salary > company average
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
-- Clean, readable, top-to-bottom logic!

-- Recursive CTE: Employee hierarchy (who reports to whom)
WITH RECURSIVE org_chart AS (
    SELECT id, name, manager_id, 1 AS level
    FROM employees WHERE manager_id IS NULL  -- Start with CEO
    UNION ALL
    SELECT e.id, e.name, e.manager_id, oc.level + 1
    FROM employees e JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT * FROM org_chart ORDER BY level;`
  },

  // ==========================================
  // SECTION 9: Window Functions
  // ==========================================
  {
    id: 'sql-window-functions',
    name: 'Window Functions (OVER / PARTITION BY)',
    category: 'SQL',
    difficulty: 'hard',
    description: 'Window functions calculate across a set of rows related to the current row WITHOUT collapsing them (unlike GROUP BY). Essential for ranking and analytics questions.',
    bulletPoints: [
      'OVER() defines the window. PARTITION BY splits rows into groups. ORDER BY sorts within each group',
      'ROW_NUMBER(): Unique sequential number (1, 2, 3...). Always different, even for ties',
      'RANK(): Leaves gaps for ties (1, 2, 2, 4). DENSE_RANK(): No gaps (1, 2, 2, 3)',
      'LAG(): Value from the previous row. LEAD(): Value from the next row. Great for month-over-month comparisons',
      'Key difference from GROUP BY: Window functions keep ALL rows in the output. GROUP BY collapses rows into one per group'
    ],
    codeExample: `-- 🎯 Interview Classic: Top 3 highest paid employees per department
WITH RankedEmployees AS (
    SELECT
        name,
        department_id,
        salary,
        DENSE_RANK() OVER (
            PARTITION BY department_id -- Reset rank for each department
            ORDER BY salary DESC       -- Highest salary = rank 1
        ) as rank
    FROM employees
)
SELECT name, department_id, salary
FROM RankedEmployees
WHERE rank <= 3;

-- Compare current month revenue vs previous month
SELECT
    month,
    revenue,
    LAG(revenue) OVER (ORDER BY month) as prev_month,
    revenue - LAG(revenue) OVER (ORDER BY month) as growth
FROM monthly_sales;`
  },

  // ==========================================
  // SECTION 10: Nth Highest Salary (The #1 Asked Question)
  // ==========================================
  {
    id: 'sql-nth-highest-salary',
    name: 'Nth Highest Salary — Multiple Approaches',
    category: 'SQL',
    difficulty: 'hard',
    description: 'THE most asked SQL interview question. "Find the 2nd/3rd/Nth highest salary." Know at least 3 different approaches — interviewers keep pushing for alternatives.',
    bulletPoints: [
      'Approach 1: DENSE_RANK() Window Function — most elegant and handles duplicates correctly',
      'Approach 2: LIMIT + OFFSET — simple but only works for specific N, not dynamic. 2nd highest = LIMIT 1 OFFSET 1',
      'Approach 3: Subquery with COUNT(DISTINCT) — works everywhere, even in old SQL versions',
      'Why DENSE_RANK over RANK? If two people have the same highest salary, RANK skips the next number. DENSE_RANK doesn\'t',
      'Always clarify: "Should duplicate salaries count as the same rank?" This shows you think about edge cases'
    ],
    codeExample: `-- Approach 1: DENSE_RANK (Best — handles duplicates, works for any N)
WITH RankedSalaries AS (
    SELECT name, salary,
        DENSE_RANK() OVER (ORDER BY salary DESC) as rank
    FROM employees
)
SELECT name, salary FROM RankedSalaries WHERE rank = 5; -- 5th highest

-- Approach 2: LIMIT + OFFSET (Simple, good for small N)
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 4; -- Skip top 4, get the 5th

-- Approach 3: Subquery (Works in all SQL versions)
SELECT MAX(salary) as fifth_highest
FROM employees
WHERE salary < (
    SELECT MAX(salary) FROM employees WHERE salary < (
        SELECT MAX(salary) FROM employees WHERE salary < (
            SELECT MAX(salary) FROM employees WHERE salary < (
                SELECT MAX(salary) FROM employees
            )
        )
    )
);
-- Ugly but works! Shows you know multiple approaches

-- Approach 4: Correlated subquery (Dynamic N)
SELECT name, salary FROM employees e1
WHERE 4 = (
    SELECT COUNT(DISTINCT salary)
    FROM employees e2
    WHERE e2.salary > e1.salary
); -- Nth highest where N-1 salaries are greater`
  },

  // ==========================================
  // SECTION 11: Normalization
  // ==========================================
  {
    id: 'sql-normalization',
    name: 'Normalization (1NF, 2NF, 3NF)',
    category: 'SQL',
    difficulty: 'medium',
    description: 'Normalization organizes tables to reduce data redundancy and prevent anomalies (insert/update/delete problems). Know 1NF, 2NF, and 3NF — that\'s what interviews cover.',
    bulletPoints: [
      '1NF: Every cell has ONE atomic value (no lists, no arrays). Each row is unique. Example: Don\'t store "Java, Python" in one skills column',
      '2NF: Already in 1NF + no partial dependency. Every non-key column depends on the ENTIRE primary key (not just part of a composite key)',
      '3NF: Already in 2NF + no transitive dependency. Non-key columns depend ONLY on the primary key, not on other non-key columns',
      'Denormalization: Intentionally adding redundancy to improve READ performance. Common in analytics, reporting, and caching tables',
      'Simple rule: "Every non-key column must depend on the key, the whole key, and nothing but the key — so help me Codd"'
    ],
    codeExample: `-- ❌ NOT in 1NF (multiple values in one cell)
-- | id | name  | skills         |
-- | 1  | Alice | Java, Python   |  ← NOT atomic!

-- ✅ 1NF: Separate skills into rows or a junction table
-- | id | name  | skill  |
-- | 1  | Alice | Java   |
-- | 1  | Alice | Python |

-- ❌ NOT in 2NF (partial dependency on composite key)
-- Table: student_courses (student_id, course_id, student_name, grade)
-- student_name depends on student_id ONLY — not the full composite key

-- ✅ 2NF: Separate into two tables
-- students (student_id, student_name)
-- enrollments (student_id, course_id, grade)

-- ❌ NOT in 3NF (transitive dependency)
-- employees (id, name, department_id, department_name)
-- department_name depends on department_id, NOT on employee id

-- ✅ 3NF: Separate departments
-- employees (id, name, department_id)
-- departments (department_id, department_name)`
  },

  // ==========================================
  // SECTION 12: Database Design & Constraints
  // ==========================================
  {
    id: 'sql-design-constraints',
    name: 'Constraints & Data Integrity',
    category: 'SQL',
    difficulty: 'medium',
    description: 'Constraints enforce rules at the database level. Never rely only on application-level validation — the database should be the final line of defense against bad data.',
    bulletPoints: [
      'PRIMARY KEY: Uniquely identifies each row. Cannot be NULL. Automatically indexed',
      'UNIQUE: Ensures all values in a column are distinct (but allows NULL)',
      'NOT NULL: Column cannot contain NULL values',
      'CHECK: Ensures values meet a specific condition (e.g., price >= 0, age BETWEEN 0 AND 150)',
      'FOREIGN KEY: Links to another table\'s primary key. Enforces referential integrity (can\'t have orphan records)',
      'Never trust app validation alone. DB constraints are the safety net — they prevent bad data no matter how it enters the system'
    ],
    codeExample: `CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,          -- Unique product code
    price DECIMAL(10, 2) NOT NULL,
    category_id INT NOT NULL,

    -- CHECK ensures data validity at DB level
    CONSTRAINT check_price CHECK (price >= 0),

    -- FOREIGN KEY with RESTRICT — can't delete a category if products use it
    FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT
);

-- Without constraints, this bad data could sneak in:
-- INSERT INTO products (name, price) VALUES ('Widget', -50); -- ❌ Blocked by CHECK
-- INSERT INTO products (category_id) VALUES (999);           -- ❌ Blocked by FK`
  },

  // ==========================================
  // SECTION 13: Indexes
  // ==========================================
  {
    id: 'sql-indexes',
    name: 'Indexes — Speed Up Your Queries',
    category: 'SQL',
    difficulty: 'hard',
    description: 'Indexes are like a book\'s index — they help the database find data fast without scanning every row. But they slow down writes. Knowing when to index is a senior-level skill.',
    bulletPoints: [
      'B-Tree Index (default): Best for equality (=) and range (<, >, BETWEEN) queries. Used by MySQL, Postgres, Oracle',
      'Composite Index: Index on multiple columns. Follows leftmost-prefix rule — INDEX(a, b) works for WHERE a=? or WHERE a=? AND b=?, but NOT for WHERE b=? alone',
      'Covering Index: When ALL columns needed by a query are in the index. DB doesn\'t need to read the table at all — super fast',
      'Over-indexing hurts writes: Every INSERT/UPDATE/DELETE must update ALL indexes on that table',
      'Primary Key and UNIQUE constraints automatically create indexes. No need to create them manually',
      'Use EXPLAIN to check if your query is using an index (Index Scan) or scanning the full table (Full Table Scan)'
    ],
    codeExample: `-- Basic index on a frequently queried column
CREATE INDEX idx_users_email ON users(email);

-- Composite index (Leftmost Prefix Rule)
CREATE INDEX idx_users_name ON users(last_name, first_name);
-- ✅ Fast: WHERE last_name = 'Smith'
-- ✅ Fast: WHERE last_name = 'Smith' AND first_name = 'John'
-- ❌ Slow: WHERE first_name = 'John'  -- Leftmost column not used!

-- EXPLAIN shows how DB executes a query
EXPLAIN SELECT * FROM orders WHERE customer_id = 12345;
-- Look for: "type: ref" or "type: index" = good
-- Avoid:   "type: ALL" = full table scan = bad for large tables

-- When NOT to index:
-- 1. Small tables (< 1000 rows) — full scan is faster than index lookup
-- 2. Columns with low cardinality (e.g., gender with only M/F)
-- 3. Tables that are heavily inserted/updated`
  },

  // ==========================================
  // SECTION 14: Transactions & ACID
  // ==========================================
  {
    id: 'sql-transactions-isolation',
    name: 'Transactions, ACID & Isolation Levels',
    category: 'SQL',
    difficulty: 'hard',
    description: 'Transactions group operations into an atomic unit — either ALL succeed or ALL fail. ACID properties and isolation levels are critical for data consistency in real applications.',
    bulletPoints: [
      'ACID: Atomicity (all or nothing), Consistency (valid state before and after), Isolation (concurrent transactions don\'t interfere), Durability (committed data survives crashes)',
      'Dirty Read: Reading uncommitted data from another transaction. Prevented by READ COMMITTED and above',
      'Non-Repeatable Read: Same query returns different results within the same transaction. Prevented by REPEATABLE READ',
      'Phantom Read: New rows appear in repeated queries. Prevented by SERIALIZABLE',
      'Isolation Levels (least to most strict): READ UNCOMMITTED → READ COMMITTED (most common default) → REPEATABLE READ → SERIALIZABLE',
      'Higher isolation = more safety but worse performance. Most apps use READ COMMITTED'
    ],
    codeExample: `-- 🎯 Classic Interview Scenario: Bank Transfer
BEGIN TRANSACTION;

UPDATE accounts SET balance = balance - 500 WHERE id = 1; -- Debit
UPDATE accounts SET balance = balance + 500 WHERE id = 2; -- Credit

-- If credit fails, debit is also rolled back → money is safe!
COMMIT;  -- Both succeed → persist
-- or
ROLLBACK; -- Something failed → undo everything

-- Setting Isolation Level
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
BEGIN TRANSACTION;
SELECT balance FROM accounts WHERE id = 1; -- Returns 1000
-- Even if another transaction updates this account right now...
SELECT balance FROM accounts WHERE id = 1; -- Still returns 1000 (snapshot)
COMMIT;

-- 🎯 Interview Q: What isolation level would you use for financial transactions?
-- Answer: SERIALIZABLE for critical money transfers,
--         READ COMMITTED for most other operations (balance of safety + performance)`
  },

  // ==========================================
  // SECTION 15: Views & Stored Procedures
  // ==========================================
  {
    id: 'sql-views-stored-procedures',
    name: 'Views, Stored Procedures & Triggers',
    category: 'SQL',
    difficulty: 'medium',
    description: 'Views are saved queries that act like virtual tables. Stored Procedures are saved blocks of SQL logic. Both simplify complex operations and improve security.',
    bulletPoints: [
      'View: A saved SELECT query that acts as a virtual table. Data is not stored — it runs the query every time you access it',
      'Why Views? Simplify complex queries, restrict access to specific columns (security), provide a clean API layer over messy table structures',
      'Materialized View: Unlike regular views, this STORES the result. Much faster but data can be stale (needs manual/scheduled refresh)',
      'Stored Procedure: A block of SQL logic saved on the server. Accepts parameters, can contain IF/ELSE, loops, transactions',
      'Trigger: SQL code that runs automatically BEFORE or AFTER INSERT, UPDATE, or DELETE on a table. Great for audit logging'
    ],
    codeExample: `-- View: Simplify a complex query for reuse
CREATE VIEW active_employees AS
SELECT id, name, department, salary
FROM employees
WHERE status = 'ACTIVE' AND termination_date IS NULL;

-- Use it like a regular table
SELECT * FROM active_employees WHERE department = 'Engineering';

-- Stored Procedure: Reusable block of logic
DELIMITER //
CREATE PROCEDURE get_top_earners(IN dept_name VARCHAR(50), IN top_n INT)
BEGIN
    SELECT name, salary
    FROM employees
    WHERE department = dept_name
    ORDER BY salary DESC
    LIMIT top_n;
END //
DELIMITER ;

CALL get_top_earners('Engineering', 5); -- Get top 5 earners in Engineering

-- Trigger: Auto-log salary changes
CREATE TRIGGER salary_audit
AFTER UPDATE ON employees
FOR EACH ROW
    INSERT INTO salary_log (employee_id, old_salary, new_salary, changed_at)
    VALUES (OLD.id, OLD.salary, NEW.salary, NOW());`
  },

  // ==========================================
  // SECTION 16: Pagination (OFFSET vs Keyset)
  // ==========================================
  {
    id: 'sql-pagination',
    name: 'Pagination — OFFSET vs Keyset (Cursor)',
    category: 'SQL',
    difficulty: 'medium',
    description: 'Pagination fetches large datasets in chunks. OFFSET is simple but terrible for performance at scale. Keyset (cursor) pagination is the production-grade solution.',
    bulletPoints: [
      'OFFSET Pagination: LIMIT 20 OFFSET 1000 → DB scans and discards 1000 rows, then returns 20. Gets slower as page number grows',
      'Keyset (Cursor) Pagination: Remember the last item\'s ID/timestamp, query WHERE id > last_seen_id. Uses index — constant speed regardless of page',
      'OFFSET: Easy, allows jumping to page N directly. But slow at page 500+',
      'Keyset: Super fast at any page, but you can only go to next/previous — can\'t jump to page 50 directly',
      'Use OFFSET for admin panels with few pages. Use Keyset for feeds, infinite scroll, and any large dataset'
    ],
    codeExample: `-- ❌ OFFSET Pagination — slow for large page numbers
SELECT id, name, created_at
FROM products
ORDER BY created_at DESC
LIMIT 20 OFFSET 10000; -- DB scans 10,000 rows just to discard them!

-- ✅ Keyset Pagination — fast at any depth
-- Client sends the last_id from the previous page
SELECT id, name, created_at
FROM products
WHERE id < 5432              -- Start after the last item seen
ORDER BY id DESC
LIMIT 20;                    -- Uses index, jumps directly — instant!

-- For timestamp-based cursor (handles ties with a tiebreaker):
SELECT id, name, created_at
FROM products
WHERE created_at < '2024-03-15 10:00:00'
   OR (created_at = '2024-03-15 10:00:00' AND id < 5432)
ORDER BY created_at DESC, id DESC
LIMIT 20;`
  },

  // ==========================================
  // SECTION 17: Query Optimization
  // ==========================================
  {
    id: 'sql-query-optimization',
    name: 'Query Optimization & EXPLAIN',
    category: 'SQL',
    difficulty: 'hard',
    description: 'When a query is slow, use EXPLAIN to see the database\'s execution plan. This shows whether it\'s using an index or doing a full table scan.',
    bulletPoints: [
      'Full Table Scan (Seq Scan): Reads every row. Bad for large tables. If you see this, you likely need an index',
      'Index Scan: Uses the B-tree index to jump to the right rows. Fast for selective queries (returning few rows)',
      'EXPLAIN shows the estimated plan. EXPLAIN ANALYZE actually runs the query and shows real timings',
      'If DB does a full scan despite having an index: the query returns too many rows (low selectivity), or statistics are stale',
      'Common optimizations: Add indexes on WHERE/JOIN columns, avoid SELECT * (fetch only needed columns), use JOINs instead of correlated subqueries, limit result sets'
    ],
    codeExample: `-- "This query is slow. What do you do?"
-- Step 1: Run EXPLAIN to see execution plan
EXPLAIN SELECT * FROM orders WHERE customer_id = 12345;

-- What to look for:
-- ✅ "Index Scan" or "Index Only Scan" = Good, using index
-- ❌ "Full Table Scan" or "Seq Scan" = Bad, reading every row

-- Step 2: Add index on the filtered column
CREATE INDEX idx_orders_customer ON orders(customer_id);

-- Step 3: Run EXPLAIN again — verify it now uses the index

-- Common query anti-patterns to avoid:
-- ❌ SELECT * FROM orders;        -- Fetches ALL columns (wasteful)
-- ✅ SELECT id, status FROM orders; -- Fetch only what you need

-- ❌ WHERE YEAR(created_at) = 2024  -- Function on column kills index!
-- ✅ WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01'

-- ❌ WHERE name LIKE '%john%'     -- Leading wildcard can't use index
-- ✅ WHERE name LIKE 'john%'      -- Can use index (no leading wildcard)`
  }
];

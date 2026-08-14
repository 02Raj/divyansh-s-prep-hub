import { InterviewTopic } from './types';

export const mongodbTopics: InterviewTopic[] = [
  // ==========================================
  // SECTION 1: MongoDB Core Concepts
  // ==========================================
  {
    id: 'mongo-fundamentals',
    name: 'MongoDB Fundamentals & BSON',
    category: 'MongoDB',
    difficulty: 'easy',
    description: 'MongoDB is a NoSQL document database. Instead of tables and rows, it stores data in collections of flexible, JSON-like BSON documents. It is highly scalable and developer-friendly.',
    bulletPoints: [
      'Document Model: Data is stored in BSON (Binary JSON), which supports more data types (like Date and BinData) than standard JSON',
      'Collections vs Tables: A collection holds documents. Unlike SQL tables, collections do not enforce a rigid schema by default',
      'Flexible Schema: Documents in the same collection can have different fields (though schema validation can be applied)',
      'The _id field: Every document MUST have a unique _id field. If you do not provide one, MongoDB generates an ObjectId automatically',
      'No JOINs (mostly): MongoDB encourages embedding related data into a single document to avoid complex joins, improving read performance'
    ],
    codeExample: `// 🎯 Connecting and inserting a document
use myDatabase; // Switches to (or creates) the database

// Inserting a BSON document into the 'users' collection
db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  age: 30,
  skills: ["Node.js", "MongoDB", "React"],
  address: {
    city: "New York",
    zip: "10001"
  },
  createdAt: new Date() // BSON Date type
});`
  },

  // ==========================================
  // SECTION 2: Data Modeling
  // ==========================================
  {
    id: 'mongo-data-modeling',
    name: 'Data Modeling (Embedding vs Referencing)',
    category: 'MongoDB',
    difficulty: 'medium',
    description: 'The most important decision in MongoDB design is whether to embed data within a document or reference it (like a foreign key). Always design your schema around your queries.',
    bulletPoints: [
      'Embedding (Denormalization): Store related data in the same document. Best for One-to-Few relationships where data is read together',
      'Referencing (Normalization): Store the ObjectId of another document. Best for One-to-Many or Many-to-Many, especially when the related data changes frequently',
      '16MB Document Limit: A single BSON document cannot exceed 16MB. Never embed unbounded arrays (like a list of all user comments)',
      'Bucketing Pattern: Used for time-series or large 1-to-N relationships to group data into buckets, preventing the 16MB limit',
      'Schema Validation: Use $jsonSchema to enforce rules (e.g., email must be a string, age must be > 18) even in a "schema-less" DB'
    ],
    codeExample: `// ❌ Bad Design (Embedding unbounded array - will hit 16MB limit)
{
  _id: 1,
  title: "My Viral Post",
  comments: [ ... 100,000 comments ... ] 
}

// ✅ Good Design (Referencing - One-to-Many)
// Post Document
{ _id: ObjectId("post1"), title: "My Viral Post" }

// Comment Document (References the Post)
{ 
  _id: ObjectId("comment1"), 
  postId: ObjectId("post1"), 
  text: "Great post!" 
}

// Enforcing Schema Validation
db.createCollection("users", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["name", "email"],
         properties: {
            email: { bsonType: "string" },
            age: { bsonType: "int", minimum: 18 }
         }
      }
   }
});`
  },

  // ==========================================
  // SECTION 3: CRUD Operations
  // ==========================================
  {
    id: 'mongo-crud',
    name: 'Advanced CRUD & Operators',
    category: 'MongoDB',
    difficulty: 'medium',
    description: 'MongoDB provides powerful operators to query, update, and manipulate arrays within documents without retrieving the entire document.',
    bulletPoints: [
      'Query Operators: $eq, $gt, $lt, $in, $ne (Equality and Comparison)',
      'Logical Operators: $and, $or, $not (Combine multiple conditions)',
      'Update Operators: $set (update/add field), $unset (remove field), $inc (increment number)',
      'Array Operators: $push (add to array), $pull (remove from array), $addToSet (add only if unique)',
      'Upsert: An update operation with { upsert: true } will update the document if it exists, or insert it if it does not'
    ],
    codeExample: `-- 🎯 Interview Q: How do you safely increment a value and add an item to an array?

// Find user by email, increment login count, and push a new role
db.users.updateOne(
  { email: "admin@example.com" }, // Filter
  { 
    $inc: { loginCount: 1 },      // Atomically increments by 1
    $push: { roles: "SUPER_ADMIN" }, // Adds to array
    $set: { lastLogin: new Date() }  // Updates timestamp
  },
  { upsert: true } // If user doesn't exist, create them!
);

// Querying inside an array
// Find users who have BOTH "Java" and "MongoDB" skills
db.users.find({ skills: { $all: ["Java", "MongoDB"] } });`
  },

  // ==========================================
  // SECTION 4: Aggregation Pipeline
  // ==========================================
  {
    id: 'mongo-aggregation',
    name: 'Aggregation Pipeline',
    category: 'MongoDB',
    difficulty: 'hard',
    description: 'The Aggregation Pipeline processes data through multiple stages (like a factory assembly line) to transform and analyze it. It is much more powerful than simple find() queries.',
    bulletPoints: [
      '$match: Filters documents (Acts like WHERE in SQL). ALWAYS put this first to reduce the dataset and use indexes!',
      '$group: Groups documents by a specified key and performs calculations like $sum or $avg (Acts like GROUP BY in SQL)',
      '$project: Reshapes the document, including or excluding fields to save memory',
      '$lookup: Performs a Left Outer Join with another collection. Be careful: heavy use on large unindexed collections kills performance',
      '$sort, $skip, $limit: Used for pagination within the pipeline'
    ],
    codeExample: `// 🎯 Interview Scenario: Find the total revenue per user for completed orders
db.orders.aggregate([
  // Stage 1: Filter (Use indexes here!)
  { $match: { status: "COMPLETED" } },
  
  // Stage 2: Group by userId and calculate sum
  { $group: {
      _id: "$userId",
      totalSpent: { $sum: "$amount" },
      orderCount: { $sum: 1 }
  }},
  
  // Stage 3: Sort by highest spend
  { $sort: { totalSpent: -1 } },
  
  // Stage 4: Get only the top 5
  { $limit: 5 },
  
  // Stage 5: Join with users collection to get user details
  { $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "_id",
      as: "userDetails"
  }}
]);`
  },

  // ==========================================
  // SECTION 5: Indexing & Performance
  // ==========================================
  {
    id: 'mongo-indexing',
    name: 'Indexing & The ESR Rule',
    category: 'MongoDB',
    difficulty: 'hard',
    description: 'Indexes make queries fast by preventing Collection Scans (COLLSCAN). For senior roles, you must understand compound indexes and the ESR rule.',
    bulletPoints: [
      'Single Field Index: Speeds up queries on a single field. Sorting works in both directions automatically',
      'Compound Index: An index on multiple fields. The order of fields matters immensely!',
      'The ESR Rule (Equality, Sort, Range): When building compound indexes, put Equality fields first, Sort fields second, and Range ($gt, $lt) fields last',
      'Covered Query: A query where all requested fields are in the index. MongoDB returns results from memory without touching the actual document (Extremely fast)',
      'Explain Plan: Use .explain("executionStats") to see if a query is using an index (IXSCAN) or scanning the whole collection (COLLSCAN)'
    ],
    codeExample: `// Creating a Compound Index following the ESR Rule
// Scenario: We query orders by status (Equality), sort by date (Sort), and filter by price > 100 (Range)

db.orders.createIndex({ 
  status: 1,      // E - Equality first
  createdAt: -1,  // S - Sort second
  price: 1        // R - Range last
});

// Using explain() to diagnose a slow query
db.orders.find({ status: "PENDING" }).explain("executionStats");

// Look at the output for:
// "stage": "IXSCAN" (Good!) or "COLLSCAN" (Bad!)
// "totalDocsExamined" vs "nReturned" (If examined is 1000 but returned is 1, you need an index!)`
  },

  // ==========================================
  // SECTION 6: High Availability & Scaling
  // ==========================================
  {
    id: 'mongo-scaling',
    name: 'Replica Sets & Sharding',
    category: 'MongoDB',
    difficulty: 'hard',
    description: 'MongoDB achieves High Availability through Replica Sets and Horizontal Scaling through Sharding. Knowing the difference is crucial for system architecture interviews.',
    bulletPoints: [
      'Replica Set: A group of servers maintaining the same data set. Provides redundancy and automatic failover. Consists of 1 Primary (receives writes) and multiple Secondaries (replicate data)',
      'Read Preference: You can route read operations to secondary nodes to offload the primary, but you risk reading stale data (Eventual Consistency)',
      'Sharding: Distributes a massive database across multiple machines. Used when data exceeds the storage or RAM limits of a single server',
      'Shard Key: The field used to distribute data. A bad shard key leads to "Jumbo Chunks" (uneven data distribution). A good shard key has high cardinality (many unique values)',
      'Write Concern: Defines how many replica nodes must acknowledge a write before it is considered "successful" (e.g., w: "majority" ensures data is not lost on failover)'
    ],
    codeExample: `// 🎯 Interview Q: How do you ensure a write operation is absolutely safe and won't be lost?
// A: Use a Write Concern of "majority"

db.users.insertOne(
  { name: "Critical Data" },
  { writeConcern: { w: "majority", j: true, wtimeout: 5000 } }
);
// w: "majority" -> Must be saved to the majority of replica nodes
// j: true -> Must be written to the on-disk journal file
// wtimeout -> Fails if it takes longer than 5 seconds

// Routing a read to a Secondary node (for reporting/analytics)
db.analytics.find({}).readPref("secondary");`
  }
];

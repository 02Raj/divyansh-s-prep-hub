---
name: Ingest Interview Experience
description: Automatically triggers when the user pastes a LinkedIn post, interview experience, or a raw list of interview questions. Processes the text, formats answers in S-E-E format, deduplicates against existing questions, and updates real-interview-questions.ts.
---

# 🎯 Goal
Process raw interview experiences pasted by the user (e.g., from LinkedIn) and integrate them seamlessly into `src/data/real-interview-questions.ts` without duplication.

# 📋 Workflow

## 1. Analyze Input
- Read the raw text pasted by the user.
- Extract the list of questions asked.
- Extract the Company Name (if mentioned in the text).

## 2. Check for Duplicates & Order
- Read `src/data/real-interview-questions.ts`.
- Compare each extracted question semantically against the existing `realInterviewQuestions` array.
- **IF IT EXISTS (even if phrased slightly differently):**
  - **DO NOT** create a new object.
  - Increment the `frequency` counter by 1.
  - Append the `Company Name` to the `companies` array (if not already present).
  - Append the new phrasing to the `variations` array (if not already present).
  
- **IF IT IS NEW:**
  - Create a new `RealInterviewQuestion` object.
  - Categorize it properly (`Java`, `Spring Boot`, `Microservices`, `Angular`, `JavaScript`, `SQL`, `System Design`, `Java Coding`, `JS Coding`, `DevOps`). If a question does not fit into any of these main categories (e.g. general HR, generic networking, unrelated tools), place it in the `Other` category.
  - Set `frequency` to 1.
  - Add the `Company Name` (if any).
  - **Order Rule:** When inserting multiple new questions, always arrange them logically in sequence from **Basic to Advanced**. Do not insert advanced questions before the fundamental/basic ones within the same category.

## 3. Strict S-E-E Answer Formatting
For any NEW question, you MUST generate the `answerSEE` object following these strict rules. **(IMPORTANT: If the user provides questions that ALREADY have the S-E-E format written out, DO NOT rewrite them. Just ingest and use them exactly as provided).**
- **Simple (`simple`)**: 1-liner easy English.
- **Explain (`explain`)**: Detailed but conversational explanation (easy to remember).
- **Example (`example`)**: A first-person "Say it in interview" script enclosed in quotes (e.g., `"I use this when..."`).
- **10-Second Summary (`summary10s`)**: A short, catchy punchline (e.g., `Concept A = X. Concept B = Y.`).

*Rule: The total answer should take 1-2 minutes to speak. Avoid bookish language.*

## 4. Update and Verify
- Update `src/data/real-interview-questions.ts` cleanly.
- Run `npm run build` to ensure no TypeScript errors were introduced.
- Notify the user of what was updated (e.g., "Updated frequency for 2 questions. Added 1 new question").

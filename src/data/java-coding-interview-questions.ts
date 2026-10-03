export type CodingDifficulty = 'Basic' | 'Intermediate';
export type CodingPriority = 'Must Do' | 'Frequently Asked';

export interface JavaCodingQuestion {
  id: string;
  question: string;
  difficulty: CodingDifficulty;
  priority: CodingPriority;
  pattern: string;
}

export interface JavaCodingCategory {
  title: string;
  description: string;
  questions: JavaCodingQuestion[];
}

const item = (
  id: string,
  question: string,
  difficulty: CodingDifficulty,
  pattern: string,
  priority: CodingPriority = 'Frequently Asked',
): JavaCodingQuestion => ({ id, question, difficulty, pattern, priority });

export const javaCodingInterviewCategories: JavaCodingCategory[] = [
  {
    title: 'Arrays',
    description: 'Start here — these patterns repeat across most 8–12 LPA coding rounds.',
    questions: [
      item('array-reverse', 'Reverse an array in-place without using another array.', 'Basic', 'Two Pointers', 'Must Do'),
      item('array-second-largest', 'Find the second-largest element without sorting.', 'Basic', 'Single Pass', 'Must Do'),
      item('array-missing-number', 'Find the missing number from an array containing numbers 1 to N.', 'Basic', 'Sum / XOR', 'Must Do'),
      item('array-duplicates', 'Find duplicate elements in an integer array.', 'Basic', 'HashSet', 'Must Do'),
      item('array-move-zeroes', 'Move all zeroes to the end while keeping non-zero order unchanged.', 'Basic', 'Two Pointers', 'Must Do'),
      item('array-two-sum', 'Return indexes of two numbers whose sum equals a target.', 'Basic', 'HashMap', 'Must Do'),
      item('array-merge-sorted', 'Merge two sorted arrays into one sorted array.', 'Basic', 'Two Pointers'),
      item('array-rotate-k', 'Rotate an array by K positions.', 'Intermediate', 'Reverse / Modular Index', 'Must Do'),
      item('array-kadane', 'Find the maximum-sum contiguous subarray.', 'Intermediate', 'Kadane’s Algorithm', 'Must Do'),
      item('array-subarray-sum-k', 'Find or count subarrays whose sum equals K.', 'Intermediate', 'Prefix Sum + HashMap', 'Must Do'),
      item('array-three-sum', 'Find unique triplets whose sum is zero or a given target.', 'Intermediate', 'Sort + Two Pointers'),
      item('array-fixed-window', 'Find maximum or minimum sum of every subarray of size K.', 'Intermediate', 'Sliding Window'),
    ],
  },
  {
    title: 'Strings',
    description: 'The highest-return section for service-company and product-company screening rounds.',
    questions: [
      item('string-reverse', 'Reverse a String without using built-in reverse methods.', 'Basic', 'Two Pointers / StringBuilder', 'Must Do'),
      item('string-palindrome', 'Check whether a String is a palindrome.', 'Basic', 'Two Pointers', 'Must Do'),
      item('string-char-frequency', 'Count the frequency of every character in a String.', 'Basic', 'HashMap', 'Must Do'),
      item('string-first-non-repeat', 'Find the first non-repeating character.', 'Basic', 'LinkedHashMap / Frequency Array', 'Must Do'),
      item('string-anagram', 'Check whether two Strings are anagrams.', 'Basic', 'Frequency Count', 'Must Do'),
      item('string-reverse-words', 'Reverse the words in a sentence without reversing each word.', 'Basic', 'Split / Two Pointers', 'Must Do'),
      item('string-remove-duplicates', 'Remove duplicate characters while preserving their first occurrence.', 'Basic', 'LinkedHashSet'),
      item('string-longest-prefix', 'Find the longest common prefix among multiple Strings.', 'Intermediate', 'Vertical Scan'),
      item('string-rotation', 'Check whether one String is a rotation of another.', 'Basic', 'Concatenation', 'Must Do'),
      item('string-longest-unique', 'Find the longest substring without repeating characters.', 'Intermediate', 'Sliding Window + HashMap', 'Must Do'),
      item('string-compression', 'Compress repeated characters, for example aaabbc → a3b2c1.', 'Intermediate', 'Two Pointers'),
      item('string-longest-palindrome', 'Find the longest palindromic substring.', 'Intermediate', 'Expand Around Center'),
    ],
  },
  {
    title: 'HashMap, Collections & Java Streams',
    description: 'Very common in Java interviews because these test both logic and language fluency.',
    questions: [
      item('stream-list-duplicates', 'Find duplicate numbers in a List using Java Streams.', 'Basic', 'filter + HashSet', 'Must Do'),
      item('stream-second-highest', 'Find the second-highest number in a List using Streams.', 'Basic', 'distinct + sorted + skip', 'Must Do'),
      item('stream-first-non-repeat', 'Find the first non-repeating character using Java Streams.', 'Intermediate', 'groupingBy + LinkedHashMap', 'Must Do'),
      item('stream-group-employees', 'Group employees by department.', 'Basic', 'Collectors.groupingBy', 'Must Do'),
      item('stream-highest-salary', 'Find the highest-paid employee in every department.', 'Intermediate', 'groupingBy + maxBy', 'Must Do'),
      item('stream-sort-employees', 'Filter employees by salary and sort them by salary and name.', 'Basic', 'filter + Comparator', 'Must Do'),
      item('stream-list-to-map', 'Convert a List<Employee> to a Map and handle duplicate keys.', 'Intermediate', 'Collectors.toMap Merge Function'),
      item('stream-frequency-sort', 'Count word frequency and print words in descending frequency.', 'Intermediate', 'groupingBy + Sorting'),
      item('stream-flatten-list', 'Flatten a nested List<List<Integer>> into one List.', 'Basic', 'flatMap'),
      item('stream-top-n', 'Find the top N highest salaries or values.', 'Intermediate', 'sorted + limit / Heap'),
    ],
  },
  {
    title: 'Stack & Queue',
    description: 'Small set, but these exact patterns are repeatedly used in machine-coding screens.',
    questions: [
      item('stack-balanced-brackets', 'Check whether brackets in an expression are balanced.', 'Basic', 'Stack', 'Must Do'),
      item('stack-next-greater', 'Find the next greater element for every array element.', 'Intermediate', 'Monotonic Stack', 'Must Do'),
      item('stack-min-stack', 'Design a stack that returns the minimum element in O(1).', 'Intermediate', 'Auxiliary Stack'),
      item('stack-infix-postfix', 'Convert an infix expression to postfix.', 'Intermediate', 'Operator Stack'),
      item('queue-using-stacks', 'Implement a queue using two stacks.', 'Intermediate', 'Amortized Transfer', 'Must Do'),
      item('stack-using-queues', 'Implement a stack using queues.', 'Intermediate', 'Queue Rotation'),
      item('stack-sort', 'Sort a stack using one additional stack.', 'Intermediate', 'Insertion Sort Pattern'),
    ],
  },
  {
    title: 'Linked List',
    description: 'Prepare pointer movement clearly; interviewers usually ask for dry-run and complexity.',
    questions: [
      item('list-reverse', 'Reverse a singly linked list iteratively.', 'Basic', 'Three Pointers', 'Must Do'),
      item('list-middle', 'Find the middle node of a linked list.', 'Basic', 'Slow & Fast Pointers', 'Must Do'),
      item('list-cycle', 'Detect whether a linked list contains a cycle.', 'Intermediate', 'Floyd’s Cycle Detection', 'Must Do'),
      item('list-cycle-start', 'Find the node where a linked-list cycle begins.', 'Intermediate', 'Floyd’s Algorithm'),
      item('list-merge-sorted', 'Merge two sorted linked lists.', 'Basic', 'Two Pointers + Dummy Node', 'Must Do'),
      item('list-nth-from-end', 'Remove the Nth node from the end in one traversal.', 'Intermediate', 'Two Pointers'),
      item('list-palindrome', 'Check whether a linked list is a palindrome using O(1) extra space.', 'Intermediate', 'Middle + Reverse Half'),
    ],
  },
  {
    title: 'Searching & Sorting',
    description: 'Focus on explaining time complexity and why the chosen algorithm fits the input.',
    questions: [
      item('search-binary', 'Implement binary search iteratively and recursively.', 'Basic', 'Binary Search', 'Must Do'),
      item('search-first-last', 'Find the first and last occurrence of a target in a sorted array.', 'Intermediate', 'Modified Binary Search', 'Must Do'),
      item('search-rotated', 'Search an element in a rotated sorted array.', 'Intermediate', 'Modified Binary Search'),
      item('sort-zero-one-two', 'Sort an array containing only 0, 1, and 2 without library sorting.', 'Intermediate', 'Dutch National Flag', 'Must Do'),
      item('sort-merge', 'Implement merge sort and explain time and space complexity.', 'Intermediate', 'Divide and Conquer'),
      item('sort-custom-objects', 'Sort Employee objects by multiple fields with Comparator.', 'Basic', 'Comparator Chaining', 'Must Do'),
      item('search-kth-largest', 'Find the Kth-largest element in an unsorted array.', 'Intermediate', 'Min Heap / Quickselect'),
    ],
  },
  {
    title: 'Recursion & Basic Backtracking',
    description: 'Only the practical basics expected at this salary range—no graph or hard-DP overload.',
    questions: [
      item('recursion-factorial', 'Calculate factorial and explain the recursion base case.', 'Basic', 'Recursion Base Case'),
      item('recursion-fibonacci', 'Generate Fibonacci numbers using iteration and recursion; compare both.', 'Basic', 'Iteration vs Recursion'),
      item('recursion-subsequences', 'Print all subsequences of a String.', 'Intermediate', 'Choose / Not Choose'),
      item('recursion-permutations', 'Generate all permutations of a String with unique characters.', 'Intermediate', 'Backtracking'),
      item('recursion-combination-sum', 'Find combinations whose values add up to a target.', 'Intermediate', 'Backtracking + Pruning'),
    ],
  },
];

export const javaCodingQuestionCount = javaCodingInterviewCategories.reduce(
  (total, category) => total + category.questions.length,
  0,
);

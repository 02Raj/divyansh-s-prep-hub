import { InterviewTopic } from './types';

export const javascriptTopics: InterviewTopic[] = [
  {
    id: 'js-closures',
    name: 'Closures in JavaScript',
    category: 'JavaScript',
    difficulty: 'medium',
    description: 'A closure is a function that has access to variables from its outer (enclosing) scope, even after the outer function has returned. Closures are created every time a function is created, at function creation time.',
    bulletPoints: [
      'Closures allow data encapsulation and privacy',
      'They enable the module pattern in JavaScript',
      'Closures can cause memory leaks if not handled properly',
      'They are fundamental to callbacks and event handlers'
    ],
    codeExample: `function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount()); // 2`
  },
  {
    id: 'js-hoisting',
    name: 'Hoisting',
    category: 'JavaScript',
    difficulty: 'easy',
    description: 'Hoisting is JavaScript\'s default behavior of moving declarations to the top of their containing scope during compilation. Only declarations are hoisted, not initializations.',
    bulletPoints: [
      'var declarations are hoisted and initialized with undefined',
      'let and const are hoisted but not initialized (Temporal Dead Zone)',
      'Function declarations are fully hoisted',
      'Function expressions are not hoisted'
    ],
    codeExample: `console.log(x); // undefined (hoisted)
var x = 5;

console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;

hoistedFunction(); // Works!
function hoistedFunction() {
  console.log('I am hoisted');
}`
  },
  {
    id: 'js-event-loop',
    name: 'Event Loop',
    category: 'JavaScript',
    difficulty: 'hard',
    description: 'The Event Loop is a fundamental concept that enables JavaScript\'s asynchronous behavior. It continuously checks the call stack and task queue, executing callbacks when the stack is empty.',
    bulletPoints: [
      'JavaScript is single-threaded but can handle async operations',
      'Microtasks (Promises) have priority over macrotasks (setTimeout)',
      'The call stack must be empty for queue tasks to execute',
      'Understanding the event loop is crucial for debugging async code'
    ],
    codeExample: `console.log('1'); // Sync

setTimeout(() => console.log('2'), 0); // Macrotask

Promise.resolve().then(() => console.log('3')); // Microtask

console.log('4'); // Sync

// Output: 1, 4, 3, 2`
  },
  {
    id: 'js-promises',
    name: 'Promises and Async/Await',
    category: 'JavaScript',
    difficulty: 'medium',
    description: 'Promises represent the eventual completion (or failure) of an asynchronous operation. Async/await is syntactic sugar built on top of promises, making asynchronous code look and behave more like synchronous code.',
    bulletPoints: [
      'Promises have three states: pending, fulfilled, rejected',
      'async functions always return a Promise',
      'await can only be used inside async functions',
      'Error handling with try/catch works with async/await'
    ],
    codeExample: `// Promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('Data loaded'), 1000);
  });
};

// Async/Await
async function getData() {
  try {
    const result = await fetchData();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}`
  },
  {
    id: 'js-this-keyword',
    name: 'The "this" Keyword',
    category: 'JavaScript',
    difficulty: 'medium',
    description: 'The "this" keyword refers to the object that is executing the current function. Its value depends on how the function is called, not where it is defined.',
    bulletPoints: [
      'In a method, "this" refers to the owner object',
      'Alone, "this" refers to the global object',
      'In arrow functions, "this" inherits from the enclosing scope',
      'call(), apply(), and bind() can explicitly set "this"'
    ],
    codeExample: `const obj = {
  name: 'Divyansh',
  greet: function() {
    console.log(\`Hello, \${this.name}\`);
  },
  greetArrow: () => {
    console.log(\`Hello, \${this.name}\`); // undefined (inherits global this)
  }
};

obj.greet(); // Hello, Divyansh
obj.greetArrow(); // Hello, undefined`
  },
  {
    id: 'js-prototypes',
    name: 'Prototypes and Inheritance',
    category: 'JavaScript',
    difficulty: 'hard',
    description: 'JavaScript uses prototypal inheritance. Every object has a prototype from which it can inherit properties and methods. The prototype chain is how JavaScript looks up properties.',
    bulletPoints: [
      'All objects inherit from Object.prototype',
      '__proto__ is the actual object used in the lookup chain',
      'prototype is a property of constructor functions',
      'Object.create() creates objects with a specific prototype'
    ],
    codeExample: `function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(\`\${this.name} makes a sound\`);
};

function Dog(name) {
  Animal.call(this, name);
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  console.log(\`\${this.name} barks!\`);
};

const dog = new Dog('Rex');
dog.speak(); // Rex makes a sound
dog.bark();  // Rex barks!`
  }
];

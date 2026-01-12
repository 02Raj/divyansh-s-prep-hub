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
  },
  {
  id: 'js-array-methods',
  name: 'Array Methods',
  category: 'JavaScript',
  difficulty: 'easy',
  description: 'Array methods are built-in JavaScript functions used to perform operations like iteration, transformation, filtering, and reduction on arrays.',
  bulletPoints: [
    'map() is used to transform array elements',
    'filter() returns elements based on a condition',
    'reduce() reduces array to a single value',
    'forEach() iterates without returning a new array'
  ],
  codeExample: `const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2);
console.log(doubled);`
},

{
  id: 'js-callbacks',
  name: 'Callback in JavaScript',
  category: 'JavaScript',
  difficulty: 'easy',
  description: 'A callback is a function passed as an argument to another function and executed later, usually after an async task completes.',
  bulletPoints: [
    'Callbacks enable asynchronous behavior',
    'They are commonly used in timers and events',
    'Callback hell occurs with deeply nested callbacks',
    'Promises help avoid callback hell'
  ],
  codeExample: `setTimeout(() => {
  console.log('Executed later');
}, 1000);`
},

{
  id: 'js-call-apply-bind',
  name: 'call, apply and bind',
  category: 'JavaScript',
  difficulty: 'medium',
  description: 'call, apply, and bind are used to explicitly set the value of "this" inside a function.',
  bulletPoints: [
    'call() accepts arguments individually',
    'apply() accepts arguments as an array',
    'bind() returns a new function with fixed this',
    'Useful for function borrowing'
  ],
  codeExample: `function greet(city) {
  console.log(this.name + ' from ' + city);
}
const user = { name: 'Divyansh' };
greet.call(user, 'Delhi');`
},

{
  id: 'js-debounce-throttle',
  name: 'Debounce and Throttle',
  category: 'JavaScript',
  difficulty: 'medium',
  description: 'Debounce and throttle are performance optimization techniques used to control function execution frequency.',
  bulletPoints: [
    'Debounce delays execution until inactivity',
    'Throttle limits execution to fixed intervals',
    'Used in scroll and resize events',
    'Improves performance and UX'
  ],
  codeExample: `function debounce(fn, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}`
},

{
  id: 'js-deep-shallow-copy',
  name: 'Deep Copy and Shallow Copy',
  category: 'JavaScript',
  difficulty: 'medium',
  description: 'Shallow copy copies references, while deep copy duplicates all nested objects.',
  bulletPoints: [
    'Object.assign creates shallow copy',
    'Spread operator also creates shallow copy',
    'JSON.parse/stringify creates deep copy',
    'StructuredClone is modern deep copy'
  ],
  codeExample: `const obj = { a: 1, b: { c: 2 } };
const deep = JSON.parse(JSON.stringify(obj));`
},

{
  id: 'js-dom',
  name: 'Document Object Model (DOM)',
  category: 'JavaScript',
  difficulty: 'easy',
  description: 'DOM represents HTML as a tree structure that JavaScript can manipulate.',
  bulletPoints: [
    'DOM allows dynamic HTML updates',
    'Elements can be selected using querySelector',
    'Events are handled via DOM',
    'DOM manipulation impacts performance'
  ],
  codeExample: `document.querySelector('h1').innerText = 'Hello';`
},

{
  id: 'js-event-delegation',
  name: 'Event Delegation and Propagation',
  category: 'JavaScript',
  difficulty: 'medium',
  description: 'Event delegation uses bubbling to handle events efficiently.',
  bulletPoints: [
    'Event bubbling moves bottom to top',
    'Capturing moves top to bottom',
    'Delegation reduces event listeners',
    'Uses event.target'
  ],
  codeExample: `document.body.addEventListener('click', e => {
  console.log(e.target);
});`
},

{
  id: 'js-variables',
  name: 'Variable Declarations',
  category: 'JavaScript',
  difficulty: 'easy',
  description: 'JavaScript provides var, let, and const for variable declaration.',
  bulletPoints: [
    'var is function scoped',
    'let and const are block scoped',
    'const cannot be reassigned',
    'let avoids hoisting issues'
  ],
  codeExample: `let x = 10;
const y = 20;`
},

{
  id: 'js-es6',
  name: 'ES6 Features',
  category: 'JavaScript',
  difficulty: 'easy',
  description: 'ES6 introduced modern JavaScript syntax and features.',
  bulletPoints: [
    'Arrow functions simplify syntax',
    'Destructuring extracts values',
    'Spread operator expands data',
    'Template literals support interpolation'
  ],
  codeExample: `const name = 'JS';
console.log(\`Hello \${name}\`);`
}

];

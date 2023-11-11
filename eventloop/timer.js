const bar = (x) => console.log(`${x} : bar`);
const baz = () => console.log('baz');

const foo = (a) => {
  console.log('foo');
  setTimeout(function() {
    bar(a);
  }, 0);
  baz();
}

foo(2);
foo(1);

// // The event loop is a fundamental concept in Node.js, allowing it to perform non-blocking I/O operations. It is the mechanism that enables Node.js to execute callbacks asynchronously.

// setTimeout in the Event Loop:
// When setTimeout(callback, ms) is called, Node schedules the callback to be executed after at least ms milliseconds.
// Even with ms set to 0, the callback doesn't execute immediately but is placed in the timers phase's queue to be executed after the current script has completed and the event loop gets to the timers phase.
// Code Analysis of "eventloop/timer.js":
// Here's the provided code snippet:

// javascript
// Copy code
// const bar = (x) => console.log(`${x} : bar`);
// const baz = () => console.log('baz');

// const foo = (a) => {
//   console.log('foo');
//   setTimeout(function() {
//     bar(a);
//   }, 0);
//   baz();
// }

// foo(2);
// foo(1);
// Expected Order of Execution:
// foo(2) is called.
// Logs 'foo'.
// Schedules bar(2) to run after 0 milliseconds (placed in the timer queue).
// Calls baz(), logging 'baz'.
// foo(1) is called.
// Logs 'foo'.
// Schedules bar(1) to run after 0 milliseconds (placed in the timer queue).
// Calls baz(), logging 'baz'.
// After the call stack is clear (both calls to foo have completed), the event loop checks the timer queue.
// Executes bar(2), logging '2 : bar'.
// Executes bar(1), logging '1 : bar'.
// Expected Output:

// yaml
// Copy code
// foo
// baz
// foo
// baz
// 2 : bar
// 1 : bar
// Timers Phase Queue Callback Count:
// After the script is run, the timers phase queue will have two callbacks: the ones scheduled by foo(2) and foo(1).

// Quiz Questions:
// Coding: Modify the foo function to add another setTimeout call with a different callback and a delay of 100ms. What will be the order of execution now?

// MCQ on Event Loop: Which of the following statements is true about Node.js event loop?
// A) The event loop allows Node.js to perform only I/O-related non-blocking operations.
// B) The event loop can handle multiple operations at the same time.
// C) The event loop runs on multiple threads.
// D) The event loop executes callbacks from the timer queue only after the call stack is clear.

// Coding: Write a Node.js script using setTimeout to simulate a simple timer that counts down from 3 to 1 and then logs "Go!".

// MCQ on setTimeout: What happens if you set a negative number as the delay in setTimeout(callback, ms)?
// A) It throws an error.
// B) It is treated as 0.
// C) The callback is never executed.
// D) It sets an infinite delay.


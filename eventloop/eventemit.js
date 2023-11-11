const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
  constructor() {
    super();
    this.emit('event')
  }
}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});

// ### Understanding `process.nextTick()` and `setImmediate()` in Node.js

// Node.js offers various ways to control the order of execution of code, particularly with `process.nextTick()` and `setImmediate()`. Both are part of Node.js's event loop and non-blocking operations but serve different purposes.

// #### `process.nextTick()`:
// - `process.nextTick()` schedules a callback function to be invoked in the next iteration of the event loop.
// - It effectively puts the callback at the start of the event loop queue, allowing it to be executed immediately after the current operation completes, even before any I/O events or timers.
// - **Analogy**: Think of `process.nextTick()` as cutting in line at the front of a queue. No matter what's scheduled, it gets priority right after the current operation.

// #### `setImmediate()`:
// - `setImmediate()` schedules a callback to be executed in the check phase of the next event loop iteration.
// - It's similar to `setTimeout`, but with no delay, it gets executed after I/O events.
// - **Analogy**: `setImmediate()` is like setting an appointment for the earliest possible time after all current customers (I/O events) have been served.

// ### Analysis of "eventloop/tick_immediate.js" Script:

// Let's analyze the provided script:

// ```javascript
// let count = 0;
// setImmediate(() => {
//     console.log(`Run Immediately = ${count}`)
// });

// process.nextTick(() => {
//     count++;
//     console.log(`nextTick = ${count}`)
// });
// console.log(`main = ${count}`);
// ```

// #### Expected Order of Execution:

// 1. **Initial Execution**:
//    - `let count = 0;` initializes `count`.
//    - `console.log(`main = ${count}`);` logs `main = 0`.

// 2. **`process.nextTick()` Execution**:
//    - `process.nextTick(() => { ... });` schedules its callback to run immediately after the current operation. It increments `count` and logs `nextTick = 1`.

// 3. **`setImmediate()` Execution**:
//    - `setImmediate(() => { ... });` schedules its callback for the check phase of the next event loop iteration. It logs `Run Immediately = 1` (as `count` is now 1).

// **Expected Output**:
// ```
// main = 0
// nextTick = 1
// Run Immediately = 1
// ```

// ### Addressing the Additional Questions:

// 1. **Why doesn't `setTimeout` get executed?**
//    - The script does not include a `setTimeout` function call. If added, it would execute in the timers phase, which comes after the I/O callbacks and `setImmediate` in the event loop.

// 2. **Replacing `process.nextTick(cb)` with `setImmediate(cb)`**:
//    - If you replace `process.nextTick(cb)` with another `setImmediate(cb)`, the count increment and log statement will be moved to the check phase of the next event loop iteration. Both `setImmediate` callbacks will be executed after the initial `console.log`, potentially in a different order based on how they are queued.

// 3. **Event Emitter Script Not Logging**:
//    - In the `MyEmitter` class, the `emit('event')` call in the constructor occurs before the event listener is registered with `myEmitter.on('event', ...)`. To fix this, move the `emit('event')` call to after the listener is registered.
//    - **Fixed Script**:
//      ```javascript
//      const myEmitter = new MyEmitter();
//      myEmitter.on('event', () => {
//        console.log('an event occurred!');
//      });
//      myEmitter.emit('event');
//      ```

// ### Quiz Questions:

// 1. **MCQ on Execution Order**:
//    What is the execution order if `process.nextTick` and `setImmediate` are used together in a script?
//    A) `process.nextTick` first, then `setImmediate`.
//    B) `setImmediate` first, then `process.nextTick`.
//    C) Both execute simultaneously.
//    D) The order is unpredictable.

// 2. **MCQ on Event Emitter**:
//    Why is it important to set up event listeners before emitting events in Node.js?
//    A) To ensure the event loop captures the event.
//    B) To avoid missing the emitted events.
//    C) To optimize memory usage.
//    D) To prevent errors in asynchronous operations.

// 3. **MCQ on `setImmediate` vs. `setTimeout(0)`**:
//    Which statement is true about `setImmediate()` and `setTimeout(callback, 0)` in the context of the event loop?
//    A) `setImmediate()` is part of the poll phase, while `setTimeout(callback, 0)` is part of the check phase.
//    B) Both are executed in the same phase of the event loop.
//    C) `setTimeout(callback, 0)` can execute before `setImmediate()` if called in an

//  I/O cycle.
//    D) `setImmediate()` always executes before `setTimeout(callback, 0)` in the event loop.

// Feel free to answer these quiz questions, and let me know if you need further explanations or if there's another topic you want to explore!
const fs = require('fs');

function someAsyncOperation(callback) {
  fs.readFile('./data/test.txt', callback);
}

const timeoutScheduled = Date.now();

setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;

  console.log(`${delay}ms have passed since I was scheduled`);
}, 100);


// do someAsyncOperation which takes 95 ms to complete
someAsyncOperation(() => {
  const startCallback = Date.now();
  console.log('someAsyncOperation');
  // do something that will take 10ms...
  while (Date.now() - startCallback < 150) {
    // do nothing
  }
});

// To understand the behavior of the "eventloop/poll_timer.js" script, let's analyze it step by step.

// ### Original Script Analysis:

// Here's the provided script:

// ```javascript
// const fs = require('fs');

// function someAsyncOperation(callback) {
//   fs.readFile('./data/test.txt', callback);
// }

// const timeoutScheduled = Date.now();

// setTimeout(() => {
//   const delay = Date.now() - timeoutScheduled;
//   console.log(`${delay}ms have passed since I was scheduled`);
// }, 100);

// someAsyncOperation(() => {
//   const startCallback = Date.now();
//   console.log('someAsyncOperation');
//   while (Date.now() - startCallback < 10) {
//     // do nothing
//   }
// });
// ```

// #### Expected Order of Execution:

// 1. **Initial Setup**:
//    - `someAsyncOperation()` is called, which starts reading the file `test.txt` asynchronously.
//    - A `setTimeout` is scheduled to execute after 100ms.

// 2. **Event Loop Behavior**:
//    - The file read operation (`someAsyncOperation`) and the timeout are both asynchronous operations. Their callbacks will be executed once they are ready and the event loop gets to them.

// 3. **Callback Execution**:
//    - The `setTimeout` callback is supposed to execute approximately 100ms after it was scheduled.
//    - The file read callback (`someAsyncOperation`) is likely to execute before the `setTimeout` callback, as file reading is started first and the blocking operation inside it (the `while` loop) is set for 10ms.

// **Expected Output**:
// ```
// someAsyncOperation
// <approximately 100ms delay>ms have passed since I was scheduled
// ```

// #### Modifications and Their Effects:

// 1. **Changing the Blocking Duration in `someAsyncOperation`**:
//    - If you change the `while` loop condition to `< 150`, this means the callback for `someAsyncOperation` will block for about 150ms.
//    - This change will likely cause the `setTimeout` callback to execute first because `someAsyncOperation` is now blocking for longer than the timeout delay.

// 2. **Setting Timeout to 0**:
//    - If the timeout is set to `0`, it means the `setTimeout` callback is scheduled to be executed as soon as possible in the next tick of the event loop.
//    - However, if the `someAsyncOperation` callback takes longer due to the blocking `while` loop, the `setTimeout` callback may still execute after `someAsyncOperation`.

// ### Quiz Questions:

// 1. **Coding**: Modify the script to add another `setTimeout` with a delay of 50ms. What will be the order of execution with the original blocking duration (10ms) and the modified duration (150ms)?
   
// 2. **MCQ on Event Loop Behavior**: If a blocking operation in a callback exceeds the delay of a scheduled `setTimeout`, when does the `setTimeout` callback execute?
//    A) Immediately after the blocking operation.
//    B) Before the blocking operation starts.
//    C) Concurrently with the blocking operation.
//    D) After the blocking operation and the event loop reaches the timers phase.

// 3. **MCQ on Blocking Operations**: What is the impact of a long-running blocking operation in a callback on the Node.js event loop?
//    A) It speeds up the event loop.
//    B) It pauses the execution of the event loop.
//    C) It terminates the event loop.
//    D) It creates a new thread for the event loop.

// 4. **Coding**: Add a `setImmediate` call at the end of the script. Where will its callback be executed in relation to the `setTimeout` and `someAsyncOperation` callbacks?
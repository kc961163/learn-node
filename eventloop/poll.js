const fs = require('fs');

function someAsyncOperation() {
  fs.readFile('/path/to/file', function(err, data) {
    if (err) console.log('Read Error');
    else console.log('Data: ' + data);
  });
}

function foo() {
  console.log('foo');
}

someAsyncOperation();
foo();
console.log('done');

// ### Understanding the Poll Phase in Node.js Event Loop

// The poll phase of the Node.js event loop is crucial for handling I/O operations. Let's explore this concept with the provided code example.

// #### Analysis of "eventloop/poll.js":

// Here's the given code:

// ```javascript
// const fs = require('fs');

// function someAsyncOperation() {
//   fs.readFile('/path/to/file', function(err, data) {
//     if (err) console.log('Read Error');
//     else console.log('Data: ' + data);
//   });
// }

// function foo() {
//   console.log('foo');
// }

// someAsyncOperation();
// foo();
// console.log('done');
// ```

// #### Execution Order and Event Loop Phases:

// 1. **Immediate Execution**:
//    - The function `someAsyncOperation()` is called, initiating an asynchronous file read operation (`fs.readFile`). The callback function provided to `fs.readFile` is not executed immediately but is registered to be called once the file read is complete.
//    - `foo()` is called, logging `'foo'`.
//    - `console.log('done')` logs `'done'`.

// 2. **Poll Phase and Callbacks**:
//    - The callback function inside `fs.readFile` will be contained in the poll phase queue of the event loop.
//    - Once the file read operation completes, the event loop in the poll phase will execute the callback, logging either `'Read Error'` or `'Data: ...'` based on the success or failure of the file read.

// **Expected Output**:
// ```
// foo
// done
// Data: ... (or 'Read Error' if there's an error)
// ```

// ### Quiz Questions:

// 1. **Coding**: Add another `fs.readFile` operation to read a different file. What will be the order of execution now?
   
// 2. **MCQ on Event Loop Phases**: During which phase does Node.js execute tasks scheduled with `setImmediate()`?
//    A) Timers phase.
//    B) I/O callbacks phase.
//    C) Poll phase.
//    D) Check phase.

// 3. **MCQ on Asynchronous Behavior**: If an I/O operation takes a long time to complete, what is the impact on the Node.js application's responsiveness?
//    A) It becomes unresponsive until the operation completes.
//    B) It remains responsive to other operations.
//    C) It terminates the application.
//    D) It automatically moves the operation to a new thread.

// 4. **Coding**: Modify the script to include a `setTimeout` callback with a delay of `0`. Where in the event loop's execution order will this callback be executed?


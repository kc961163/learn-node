const fs = require("fs");

function moreWork() {
    console.log('more work');
}

fs.readFile("data/file.txt", (err, data) => {
  if (err) console.log(err.message);
  else console.log(data);
});
moreWork();

// Explanation:

// fs.readFile reads the contents of a file in an asynchronous manner. It doesn't block the execution of code that follows it.
// moreWork() is called immediately after fs.readFile is initiated, not waiting for the file read to complete.
// The callback provided to fs.readFile is executed once the file read operation is complete.
// Expected Output:

// css
// Copy code
// more work
// <content of file.txt>

// Quiz Questions:
// Coding: Modify the nonblocking.js file to also log a message before starting the fs.readFile operation. What will be the order of the messages logged?
// Conceptual: What could be the impact of using blocking operations in a Node.js application that receives a high number of requests?
// Coding: Write a simple example of a blocking operation other than file reading, like calculating a large Fibonacci number.
// Conceptual: In what scenarios might you intentionally choose a blocking operation over a non-blocking one?


// New Quiz Questions:
// Coding: Rewrite the Fibonacci example to use the fs.readFile non-blocking method to read a file that contains the number for which the Fibonacci sequence should be calculated.
// Conceptual: Why might it be a bad idea to perform heavy computations like Fibonacci calculations in the main thread of a Node.js application?
// Coding: If you had to perform a CPU-intensive task in Node.js, how might you approach it to avoid blocking the event loop?
// Conceptual: What are some strategies you might use in Node.js to handle blocking operations efficiently in a high-traffic web application?

// 3. Handling CPU-Intensive Tasks in Node.js
// For CPU-intensive tasks in Node.js, you can use:

// Worker Threads: Node.js supports multi-threading using worker threads. This allows you to offload heavy computations to a separate thread, keeping the main event loop free to handle other operations.

// Child Processes: Spawning a child process to handle heavy computation is another approach. Node.js can create child processes using modules like child_process, allowing these processes to run independently and utilize multiple cores.

// New Quiz Questions:
// Coding: Modify the worker thread example to pass the Fibonacci number to calculate from the main thread to the worker thread.
// Conceptual: In what scenario might you choose to use child processes over worker threads for CPU-intensive tasks?
// Coding: Write an example using the child_process module to calculate a Fibonacci number in a separate process.
// Conceptual: What are the advantages and disadvantages of using asynchronous I/O operations in a web server environment?

function resolveAfter2Seconds() {
  console.log("starting slow promise");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("slow");
      console.log("slow promise is done");
    }, 2000);
  });
}

function resolveAfter1Second() {
  console.log("starting fast promise");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("fast");
      console.log("fast promise is done");
    }, 1000);
  });
}

async function sequentialStart() {
  console.log("==SEQUENTIAL START==");

  // 1. Execution gets here almost instantly
  const slow = await resolveAfter2Seconds();
  console.log(slow); // 2. this runs 2 seconds after 1.

  const fast = await resolveAfter1Second();
  console.log(fast); // 3. this runs 3 seconds after 1.
}

async function concurrentStart() {
  console.log("==CONCURRENT START with await==");
  const slow = resolveAfter2Seconds(); // starts timer immediately
  const fast = resolveAfter1Second(); // starts timer immediately

  // 1. Execution gets here almost instantly
  console.log(await slow); // 2. this runs 2 seconds after 1.
  console.log(await fast); // 3. this runs 2 seconds after 1., immediately after 2., since fast is already resolved
}

function concurrentPromise() {
  console.log("==CONCURRENT START with Promise.all==");
  return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then(
    (messages) => {
      console.log(messages[0]); // slow
      console.log(messages[1]); // fast
    },
  );
}

async function parallel() {
  console.log("==PARALLEL with await Promise.all==");

  // Start 2 "jobs" in parallel and wait for both of them to complete
  await Promise.all([
    (async () => console.log(await resolveAfter2Seconds()))(),
    (async () => console.log(await resolveAfter1Second()))(),
  ]);
}

sequentialStart(); // after 2 seconds, logs "slow", then after 1 more second, "fast"

// wait above to finish
setTimeout(concurrentStart, 4000); // after 2 seconds, logs "slow" and then "fast"

// wait again
setTimeout(concurrentPromise, 7000); // same as concurrentStart

// wait again
setTimeout(parallel, 10000); // truly parallel: after 1 second, logs "fast", then after 1 more second, "slow"



// Let's break down the tasks and analyze each part of the question, starting with the rewrite of the `foo` function using async/await, followed by an explanation of the different asynchronous execution styles in `concurrency.js`.

// ### 1. Rewriting `foo` Using Async/Await:

// The provided `foo` function uses nested Promises with `setTimeout`. The goal is to rewrite it using async/await for better readability.

// #### Original `foo` Function:
// ```javascript
// function foo() {
//   new Promise((resolve) =>
//     setTimeout(() => resolve("1")),
//   ).then(res => {
//     console.log(res);
//     new Promise((resolve) =>
//       setTimeout(() => resolve("2")),
//     ).then(res => console.log(res));
//   });
// }
// foo();
// ```

// #### Rewritten `foo` Function with Async/Await:
// ```javascript
// async function foo() {
//   const waitFor = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//   await waitFor(0);
//   console.log("1");

//   await waitFor(0);
//   console.log("2");
// }
// foo();
// ```

// **Explanation**: 
// - The `waitFor` function is a utility that creates a Promise resolving after a given number of milliseconds.
// - We use `await` to pause execution until each timer resolves, simplifying the structure and improving readability.

// ### 2. Exploring Asynchronous Execution Styles in "asynchronous/concurrency.js":

// #### Sequential Execution (`sequentialStart`):
// - Executes promises one after the other.
// - Waits for the first promise (`resolveAfter2Seconds`) to resolve before starting the second (`resolveAfter1Second`).
// - Total execution time is the sum of all promises (3 seconds).

// #### Concurrent Execution with Await (`concurrentStart`):
// - Starts both promises concurrently but waits for them one after the other.
// - Since both promises start at the same time, the total execution time is determined by the slowest promise (2 seconds).
// - The `await` statements are separate, so it logs the results as they resolve.

// #### Concurrent Execution with `Promise.all` (`concurrentPromise`):
// - Similar to `concurrentStart`, but uses `Promise.all` to wait for all promises to resolve.
// - Logs results together after all promises have resolved.
// - Also takes 2 seconds in total, but logs both results simultaneously.

// #### Parallel Execution (`parallel`):
// - Executes promises in parallel using `Promise.all` and immediately-invoked async functions.
// - Each promise resolution is logged as soon as it completes.
// - The total execution time is determined by the slowest promise (2 seconds), but `fast` is logged after 1 second, followed by `slow` after another second.

// ### Quiz Questions:

// 1. **Coding**: Modify the `parallel` function to include error handling. What changes are needed?

// 2. **MCQ on Async/Await**:
//    What is the benefit of using async/await over traditional promise chaining?
//    A) Async/await automatically speeds up the execution of asynchronous tasks.
//    B) Async/await makes asynchronous code easier to read and write by using a synchronous-like flow.
//    C) Async/await eliminates the need for Promises.
//    D) Async/await executes all asynchronous operations in parallel.

// 3. **MCQ on Sequential Asynchronous Execution**:
//    In a sequential asynchronous execution pattern, what happens if the first async operation takes longer than expected?
//    A) Subsequent operations are canceled.
//    B) All operations are sped up to compensate.
//    C) Subsequent operations are delayed until the first one completes.
//    D) It has no impact on the timing of subsequent operations.

// 4. **MCQ on `Promise.all`**:
//    What happens if one of the promises passed to `Promise.all` rejects?
//    A) `Promise.all` waits for all other promises to either resolve or reject before rejecting.
//    B) `Promise.all` rejects immediately with the reason of the first promise that rejects.
//    C) `Promise.all` continues execution and ignores the rejection.
//    D) `Promise.all` retries the rejected promise.

// Feel free to answer these questions, and if you need more explanations or have other queries, let me know!
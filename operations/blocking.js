const fs = require("fs");

function moreWork() {
    console.log('more work');
}

try {
    const data = fs.readFileSync("data/file.txt"); // blocks here until file is read
    console.log(data);
    moreWork();
}
catch(err) {
    console.log(err.message);
}


// Explanation:

// fs.readFileSync reads the contents of a file in a synchronous manner. The execution of subsequent code (moreWork()) is blocked until the entire file is read.
// moreWork() is called only after console.log(data) has executed, which happens after the file is completely read.
// Expected Output:

// css
// Copy code
// <content of file.txt>
// more work

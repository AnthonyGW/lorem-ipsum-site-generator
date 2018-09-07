// Get user input
// Number of: paragraphs, sentences, words
// Print result

const router = require("./router.js");

// Create a webserver
const http = require("http");
const port = 3000;

http.createServer((request, response) => {
  router.index(request, response);
}).listen(port);

console.log(`Server running at http://localhost:${port}/`);

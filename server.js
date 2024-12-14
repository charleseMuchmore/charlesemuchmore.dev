// const express = require('express');
// const path = require('path');
// const app = express();

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.js'));
// });

// app.listen(9000);




const http = require('https');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World from Node.js!');
});

// const PORT = 443; // Choose your desired port
server.listen(() => {
  console.log(`Server running at http://charlesemuchmore.dev/`);
});

console.log("Server is live!");
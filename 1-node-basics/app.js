const http = require('http');
const routes = require('./routes');

console.log(routes.someText);

// function rqListener(req, res) {
// }

// http.createServer(rqListener);

// A better way to express the create server is
// http.createServer(function(req, res) {
    
// });

// Even better using an arrow function.
// http.createServer((req, res) => {
    
// });

const server = http.createServer(routes.handler);

server.listen(3000);
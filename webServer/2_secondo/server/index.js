const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

function requestHandler(req, res) {
    console.log(`Received request for ${req.url}`);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    // Stringify: from JS object to JSON string
    res.end(JSON.stringify({ message: 'Hello, World!' }));
}

const server = http.createServer(requestHandler);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
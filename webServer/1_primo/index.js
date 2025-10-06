const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

function requestHandler(req, res) {
    console.log(`Received request for ${req.url}`);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('X-Flag', 'flag{not_real_flag}');
    res.end('Hello, World!\n');
}

const server = http.createServer(requestHandler);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
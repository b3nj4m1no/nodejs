const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3000
};

function makeRequest() {
    const req = http.request(options, (res) => {
        let data = ''; 
        res.on('data', (chunk) => {
            data += chunk; // Collect data chunks
        });

        res.on('end', () => {
            // Parse: from JSON string to JS object
            const parsedData = JSON.parse(data);
            console.log('Response from server:', parsedData);
        });
    });

    req.on('error', (error) => {
        console.error('Error making request:', error);
    });

    req.end();
}

makeRequest();
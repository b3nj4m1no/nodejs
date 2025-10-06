const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Funzione per determinare il content type
function getContentType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        case '.png':
            return 'image/png';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.gif':
            return 'image/gif';
        case '.svg':
            return 'image/svg+xml';
        default:
            return 'text/plain';
    }
}

// Funzione per servire i file
function serveFile(res, filePath) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // File non trovato - 404
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`
                <!DOCTYPE html>
                <html lang="it">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>404 - Pagina non trovata</title>
                    <link rel="stylesheet" href="/css/style.css">
                </head>
                <body>
                    <div class="container">
                        <h1>404 - Pagina non trovata</h1>
                        <p>La risorsa richiesta non è stata trovata.</p>
                        <a href="/">Torna alla home</a>
                    </div>
                </body>
                </html>
            `);
        } else {
            const contentType = getContentType(filePath);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

// Creazione del server
const server = http.createServer((req, res) => {
    let url = req.url;
    
    // Rimuovi i parametri query se presenti
    url = url.split('?')[0];
    
    // Gestione della root (/)
    if (url === '/') {
        url = '/index.html';
    }
    
    let filePath;
    
    // Determina il percorso del file in base alla richiesta
    if (url.startsWith('/css/')) {
        filePath = path.join(__dirname, url);
    } else if (url.startsWith('/images/')) {
        filePath = path.join(__dirname, url);
    } else {
        // File HTML nella cartella public
        filePath = path.join(__dirname, 'public', url);
    }
    
    serveFile(res, filePath);
});

server.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});

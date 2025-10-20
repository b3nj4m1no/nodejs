const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// uso una mappa delle rotte per rendere difficile la scansione del file system
const routeMap = {
    '/': 'public/index.html',
    '/index.html': 'public/index.html',
    '/natura.html': 'public/natura.html',
    '/tecnologia.html': 'public/tecnologia.html',
    '/css/style.css': 'css/style.css'
};

// metto in cache tutti i file, solo per performance
// mi conviene farlo, solo perché i file sono pochi e piccoli
const fileCache = {};

// carico tutti i file all'avvio del server
function loadAllFiles() {
    Object.values(routeMap).forEach(filePath => {
        const fullPath = path.join(__dirname, filePath);
        try {
            fileCache[filePath] = fs.readFileSync(fullPath);
        } catch (err) {
            console.warn(`Impossibile caricare il file: ${filePath}`);
        }
    });
    
    // carico anche il file 404
    try {
        fileCache['404'] = fs.readFileSync(path.join(__dirname, 'public/404.html'));
    } catch (err) {
        console.warn('File 404.html non trovato');
    }
}

// servo il contenuto richiesto dalla rotta
function serveContent(res, route) {
    // controllo se la rotta posso servirla
    if (routeMap[route]) {
        const filePath = routeMap[route];
        const data = fileCache[filePath];
        
        if (data) {
            const contentType = getContentTypeFromRoute(route);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        } else {
            serve404(res);
        }
    } else {
        serve404(res);
    }
}

// errore 404
function serve404(res) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    if (fileCache['404']) {
        res.end(fileCache['404']);
    } else {
        res.end('<h1>404 - Pagina non trovata</h1><p>La risorsa richiesta non è stata trovata.</p><a href="/">Torna alla home</a>');
    }
}

// determino il content type dalla rotta
function getContentTypeFromRoute(route) {
    if (route.endsWith('.html') || route === '/') {
        return 'text/html';
    } else if (route.endsWith('.css')) {
        return 'text/css';
    } else if (route.endsWith('.js')) {
        return 'text/javascript';
    } else if (route.endsWith('.png')) {
        return 'image/png';
    } else if (route.endsWith('.jpg') || route.endsWith('.jpeg')) {
        return 'image/jpeg';
    } else if (route.endsWith('.gif')) {
        return 'image/gif';
    } else if (route.endsWith('.svg')) {
        return 'image/svg+xml';
    } else {
        return 'text/plain';
    }
}

// creo il server
const server = http.createServer((req, res) => {
    let url = req.url;
    
    // rimuovo le query strings
    url = url.split('?')[0];
    
    // cerco di evitare un po' di attacchi basici
    url = url.replace(/\\/g, '/'); // normalizzo gli slash
    url = url.replace(/\.\./g, ''); // rimuovo tentativi di directory traversal

    console.log(`Richiesta ricevuta: ${url}`);
    
    // servo il contenuto basandomi sulla mappa delle rotte
    serveContent(res, url);
});

// carico tutti i files in cache
loadAllFiles();

server.listen(PORT, () => {
    console.log(`Server sicuro in esecuzione su http://localhost:${PORT}`);
    console.log('Route disponibili:', Object.keys(routeMap));
});

const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    rainbow: ['\x1b[31m', '\x1b[33m', '\x1b[32m', '\x1b[36m', '\x1b[34m', '\x1b[35m']
};

const getRandomEmoji = () => {
    const emojis = ['🚀', '🌟', '🎉', '🔥', '⚡', '🌈', '🎯', '💎', '🎨', '🌺'];
    return emojis[Math.floor(Math.random() * emojis.length)];
};

const getRandomColor = () => {
    return colors.rainbow[Math.floor(Math.random() * colors.rainbow.length)];
};

const logWithStyle = (message, color = colors.cyan) => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`${color}[${timestamp}] ${getRandomEmoji()} ${message}${colors.reset}`);
};

const generateRandomQuote = () => {
    const quotes = [
        "La vita è come il codice: meglio se ben commentata! 💻",
        "Ogni bug è un'opportunità di crescita! 🐛✨",
        "Il caffè è il carburante dei programmatori! ☕",
        "Coding is poetry in motion! 🎭",
        "Debug today, deploy tomorrow! 🚢"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
};

const createSparkleAnimation = () => {
    let sparkles = '';
    for (let i = 0; i < 10; i++) {
        sparkles += Math.random() > 0.5 ? '✨' : '🌟';
    }
    return sparkles;
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;
    
    logWithStyle(`🌍 Richiesta ricevuta: ${path}`, getRandomColor());
    
    if (path === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>🎨 Server Stravagante</title>
                <style>
                    body { 
                        background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
                        background-size: 400% 400%;
                        animation: gradientShift 4s ease infinite;
                        font-family: 'Arial', sans-serif;
                        text-align: center;
                        color: white;
                        padding: 50px;
                    }
                    @keyframes gradientShift {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    h1 { font-size: 3em; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }
                    .emoji { font-size: 2em; animation: bounce 2s infinite; }
                    @keyframes bounce {
                        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                        40% { transform: translateY(-30px); }
                        60% { transform: translateY(-15px); }
                    }
                </style>
            </head>
            <body>
                <h1>🎪 Benvenuto nel Server Stravagante! 🎪</h1>
                <div class="emoji">${createSparkleAnimation()}</div>
                <p>Test UTF-8: èùòàì 🇮🇹</p>
                <p><strong>Quote del giorno:</strong> ${generateRandomQuote()}</p>
                <p>🔗 Prova: <a href="/contact" style="color: yellow;">/contact</a> | 
                   <a href="/about" style="color: yellow;">/about</a> | 
                   <a href="/magic" style="color: yellow;">/magic</a> |
                   <a href="/time" style="color: yellow;">/time</a></p>
            </body>
            </html>
        `);
    } 
    
    else if (path === '/contact') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        const contactData = {
            email: 'contact@stravagante.dev',
            telefono: '+39 123 456 7890',
            social: {
                github: '🐙 github.com/stravagante',
                linkedin: '💼 linkedin.com/in/stravagante',
                twitter: '🐦 @stravagante_dev'
            },
            messaggio: `${getRandomEmoji()} Contattaci per progetti stravaganti!`,
            ultimoAccesso: new Date().toISOString(),
            visite: Math.floor(Math.random() * 1000) + 1
        };
        res.end(JSON.stringify(contactData, null, 2));
    } 
    
    else if (path === '/about') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>🎭 About Us - Stravagante Team</title>
                <style>
                    body { 
                        background: #1a1a2e;
                        color: #eee;
                        font-family: 'Courier New', monospace;
                        padding: 20px;
                        line-height: 1.6;
                    }
                    .container { max-width: 800px; margin: 0 auto; }
                    .glow { text-shadow: 0 0 10px #00ffff; }
                    .typewriter {
                        overflow: hidden;
                        border-right: .15em solid orange;
                        white-space: nowrap;
                        margin: 0 auto;
                        letter-spacing: .15em;
                        animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite;
                    }
                    @keyframes typing {
                        from { width: 0 }
                        to { width: 100% }
                    }
                    @keyframes blink-caret {
                        from, to { border-color: transparent }
                        50% { border-color: orange; }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1 class="glow typewriter">🚀 Chi Siamo - Team Stravagante</h1>
                    <p>🎯 Siamo un team di sviluppatori che crede che il codice debba essere non solo funzionale, ma anche <strong>STRAVAGANTE</strong>!</p>
                    <h2>🛠️ Le nostre specialità:</h2>
                    <ul>
                        <li>💻 Sviluppo web innovativo</li>
                        <li>🎨 UI/UX creative e fuori dagli schemi</li>
                        <li>🚀 Performance optimization</li>
                        <li>🎭 Codice che fa sorridere</li>
                    </ul>
                    <p class="glow">${generateRandomQuote()}</p>
                    <p><em>Ultimo aggiornamento: ${new Date().toLocaleDateString('it-IT')}</em></p>
                </div>
            </body>
            </html>
        `);
    }
    
    else if (path === '/magic') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        const magicNumber = Math.floor(Math.random() * 100) + 1;
        const magicResponse = {
            "teatro": "🎭 Endpoint Magico Attivato!",
            numeroMagico: magicNumber,
            fortunaCookie: magicNumber > 50 ? "Oggi sarà una giornata fantastica! ✨" : "Fai attenzione alle sorprese! 🎲",
            incantesimo: `Abracadabra-${Math.random().toString(36).substring(7)}`,
            stelleCadenti: "🌟".repeat(Math.floor(Math.random() * 5) + 1),
            timestamp: Date.now()
        };
        res.end(JSON.stringify(magicResponse, null, 2));
    }
    
    else if (path === '/time') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>⏰ Orologio Stravagante</title>
                <style>
                    body { 
                        background: black;
                        color: #00ff00;
                        font-family: 'Courier New', monospace;
                        text-align: center;
                        padding: 50px;
                    }
                    .clock { 
                        font-size: 4em; 
                        text-shadow: 0 0 20px #00ff00;
                        animation: pulse 2s infinite;
                    }
                    @keyframes pulse {
                        0% { opacity: 1; }
                        50% { opacity: 0.5; }
                        100% { opacity: 1; }
                    }
                </style>
            </head>
            <body>
                <h1>⏰ Tempo Stravagante</h1>
                <div class="clock">${new Date().toLocaleTimeString('it-IT')}</div>
                <p>📅 ${new Date().toLocaleDateString('it-IT', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })}</p>
                <p>🌍 Timestamp Unix: ${Math.floor(Date.now() / 1000)}</p>
                <p>⚡ Millisecondi dall'epoca: ${Date.now()}</p>
            </body>
            </html>
        `);
    }
    
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>🚫 404 - Pagina Non Trovata</title>
                <style>
                    body { 
                        background: #2c3e50;
                        color: #ecf0f1;
                        font-family: Arial, sans-serif;
                        text-align: center;
                        padding: 50px;
                    }
                    .error-code { 
                        font-size: 8em; 
                        color: #e74c3c;
                        text-shadow: 3px 3px 6px rgba(0,0,0,0.7);
                        animation: shake 0.5s infinite;
                    }
                    @keyframes shake {
                        0% { transform: translate(1px, 1px) rotate(0deg); }
                        10% { transform: translate(-1px, -2px) rotate(-1deg); }
                        20% { transform: translate(-3px, 0px) rotate(1deg); }
                        30% { transform: translate(3px, 2px) rotate(0deg); }
                        40% { transform: translate(1px, -1px) rotate(1deg); }
                        50% { transform: translate(-1px, 2px) rotate(-1deg); }
                        60% { transform: translate(-3px, 1px) rotate(0deg); }
                        70% { transform: translate(3px, 1px) rotate(-1deg); }
                        80% { transform: translate(-1px, -1px) rotate(1deg); }
                        90% { transform: translate(1px, 2px) rotate(0deg); }
                        100% { transform: translate(1px, -2px) rotate(-1deg); }
                    }
                </style>
            </head>
            <body>
                <div class="error-code">404</div>
                <h1>🚫 Oops! Pagina Non Trovata</h1>
                <p>🎭 Sembra che tu abbia trovato un angolo inesplorato del nostro server stravagante!</p>
                <p>🏠 <a href="/" style="color: #3498db;">Torna alla Home</a></p>
                <p>🎲 Percorso richiesto: <code>${path}</code></p>
            </body>
            </html>
        `);
        logWithStyle(`❌ 404 - Pagina non trovata: ${path}`, colors.red);
    }
});

server.listen(port, hostname, () => {
    console.clear();
    console.log(`
${colors.rainbow[0]}╔══════════════════════════════════════╗${colors.reset}
${colors.rainbow[1]}║        🎪 SERVER STRAVAGANTE 🎪      ║${colors.reset}
${colors.rainbow[2]}║                                      ║${colors.reset}
${colors.rainbow[3]}║  🚀 Server attivo su:                ║${colors.reset}
${colors.rainbow[4]}║     http://${hostname}:${port}/           ║${colors.reset}
${colors.rainbow[5]}║                                      ║${colors.reset}
${colors.rainbow[0]}║  🌟 Endpoints disponibili:           ║${colors.reset}
${colors.rainbow[1]}║     /        - Home stravagante      ║${colors.reset}
${colors.rainbow[2]}║     /contact - Contatti JSON         ║${colors.reset}
${colors.rainbow[3]}║     /about   - Chi siamo             ║${colors.reset}
${colors.rainbow[4]}║     /magic   - Magia JSON            ║${colors.reset}
${colors.rainbow[5]}║     /time    - Orologio live         ║${colors.reset}
${colors.rainbow[0]}╚══════════════════════════════════════╝${colors.reset}
    `);
    
    logWithStyle('🎉 Server stravagante avviato con successo!', colors.green);
    logWithStyle(`🌈 Preparati per un'esperienza di sviluppo colorata!`, colors.magenta);
});
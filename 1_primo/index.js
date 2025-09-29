// Async/Await e Callback
// Esempio di lettura di un file in modo asincrono usando async/await

const fs = require('fs').promises;

async function leggiFile() {
  console.log('Inizio lettura file...');
  try {
    // await blocca l'esecuzione finché non viene letto il file
    const data = await fs.readFile('ciao.txt', 'utf8');
    console.log('Contenuto del file: ', data);
  } catch (err) {
    console.error('Errore nella lettura del file:', err);
  }
  console.log('Fine lettura file.');
}

leggiFile();
const fs = require('fs').promises;
const path = require('path');

async function getTextFiles(folderPath) {
    try {
        const files = await fs.readdir(folderPath);
        // console.log('Files in directory: ', files);
        return files;
    } catch (error) {
        throw new Error(error.message);
    }
}

function chooseRandomFile(files) {
    const randomIndex = Math.floor(Math.random() * files.length);
    return files[randomIndex];
}

async function readFileContent(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        return content;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function main() {
    try {
        const dataFolder = path.join(__dirname, 'data');
        
        const textFiles = await getTextFiles(dataFolder);
        console.log(`Trovati ${textFiles.length} file di testo:`, textFiles);
        
        const randomFile = chooseRandomFile(textFiles);
        console.log(`File scelto: ${randomFile}`);
        
        const filePath = path.join(dataFolder, randomFile);
        const content = await readFileContent(filePath);
        
        console.log(`Contenuto del file: ${randomFile}`);
        console.log(content);
        
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

main();
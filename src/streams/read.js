import { createReadStream } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'node:process';

const read = async () => {
    const sourceFolder = 'files';
    const fileToRead = 'fileToRead.txt';

    const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	const folderPath = path.join(__dirname, sourceFolder);
	const filePath = path.join(folderPath, fileToRead);

    const readStream = createReadStream(filePath);

    readStream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });

    readStream.on('end', () => {
        console.log('\nFile reading complete.');
    });

    readStream.on('error', (err) => {
        console.error('Error reading file:', err);
    });
};

await read();
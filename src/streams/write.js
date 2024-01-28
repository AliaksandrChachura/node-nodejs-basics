import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'node:process';

const write = async () => {
    const sourceFolder = 'files';
    const fileToWrite = 'fileToWrite.txt';

    const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	const folderPath = path.join(__dirname, sourceFolder);
	const filePath = path.join(folderPath, fileToWrite);

    const fileHandle = await fs.open('fileToWrite.txt', 'w');

    process.stdin.on('data', async (chunk) => {
        await fileHandle.write(chunk);
    });

    process.stdin.on('end', async () => {
        await fileHandle.close();
        console.log('Writing to file completed.');
    });
};

await write();
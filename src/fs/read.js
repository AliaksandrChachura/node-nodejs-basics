import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
    const sourceFolder = 'files';
    const readFile = 'fileToRead.txt';

    const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

    const readFilePath = path.join(__dirname, sourceFolder, readFile);

    try {
        await fs.access(readFilePath);
        const contents = await fs.readFile(readFilePath, { encoding: 'utf8' });
        console.log(contents);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw new Error(`FS operation failed: ${error.message}`);
        }
    }
};

await read();
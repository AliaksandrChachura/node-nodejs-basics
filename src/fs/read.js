import * as fs from 'node:fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readFilePath = resolve(__dirname, sourceFolder, readFile);

const sourceFolder = 'files';
const readFile = 'fileToRead.txt';

const read = async () => {
    

    try {
        await fs.access(readFilePath);
        const contents = await fs.readFile(
            readFilePath,
            { encoding: 'utf8' }
        );
        console.log(contents);
    } catch (error) {
        throw new Error(`FS operation failed: ${error.message}`);
    }
};

await read();
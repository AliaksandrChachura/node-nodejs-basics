import { access, readFile as readFileFs } from 'node:fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceFolder = 'files';
const readFile = 'fileToRead.txt';

const readFilePath = resolve(__dirname, sourceFolder, readFile);


const read = async () => {
    

    try {
        await access(readFilePath);
        const contents = await readFileFs(
            readFilePath,
            { encoding: 'utf8' }
        );
        console.log(contents);
    } catch {
        throw new Error(`FS operation failed`);
    }
};

await read();
import * as fs from 'node:fs/promises';
import { dirname, resolve} from 'path';
import { fileURLToPath } from 'url';

const sourceFolder = 'files';
const sourceFile = 'fileToRemove.txt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
    const removeFilePath = resolve(__dirname, sourceFolder, sourceFile);

    try {
        await fs.rm(removeFilePath);
    } catch (error) {
        throw new Error(`FS operation failed`);
    }
};

await remove();
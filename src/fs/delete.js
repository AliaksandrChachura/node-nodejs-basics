import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const remove = async () => {
    const sourceFolder = 'files';
    const sourceFile = 'fileToRemove.txt';

    const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

    const removeFilePath = path.join(__dirname, sourceFolder, sourceFile);

    try {
        await fs.access(removeFilePath);
        await fs.rm(removeFilePath);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error(`FS operation failed`);
        } else {
            throw new Error(`FS operation failed`);
        }
    }
};

await remove();
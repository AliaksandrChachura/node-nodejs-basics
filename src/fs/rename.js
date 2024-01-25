import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const rename = async () => {
    const sourceFolder = 'files';
    const sourceFile = 'wrongFilename.txt';
    const destinationFile = 'properFilename.md';

    const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

    const wrongFilePath = path.join(__dirname, sourceFolder, sourceFile);
    const properFilePath = path.join(__dirname, sourceFolder, destinationFile); 

    try {
        await fs.access(wrongFilePath);
        try {
            await fs.access(properFilePath, fs.constants.F_OK);
            throw new Error('FS operation failed');
        } catch (error) {
            if (error.code === 'ENOENT') {
                await fs.rename(wrongFilePath, properFilePath);
            } else {
                throw new Error(`FS operation failed`);
            }
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw new Error('FS operation failed');
        }
    }
};

await rename();
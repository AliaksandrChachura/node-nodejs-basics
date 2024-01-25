import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const copy = async () => {
    const sourceFolder = 'files';
    const destinationFolder = 'files_copy';

    const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	const sourceFolderPath = path.join(__dirname, sourceFolder);
    const destinationFolderPath = path.join(__dirname, destinationFolder);

    try {
        await fs.stat(sourceFolderPath);
    } catch (error) {
        throw new Error('FS operation failed');
    }

    try {
        await fs.mkdir(destinationFolderPath);
    } catch (error) {
        throw new Error('FS operation failed');
    }

    const files = await fs.readdir(sourceFolderPath);

    
    files.forEach((file) => {
        const srcPath = path.join(sourceFolderPath, file);
        const destPath = path.join(destinationFolderPath, file);

        fs.copyFile(srcPath, destPath);
    });
};

await copy();
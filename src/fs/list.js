import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const list = async () => {
    const sourceFolder = 'files';

    const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

    const folderPath = path.join(__dirname, sourceFolder);

    try {
        await fs.access(folderPath);
        const filenames = await fs.readdir(folderPath);
        console.log(filenames);
        
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await list();
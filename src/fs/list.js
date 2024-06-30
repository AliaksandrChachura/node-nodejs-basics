import * as fs from 'node:fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';


const sourceFolder = 'files';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const folderPath = resolve(__dirname, sourceFolder);

const list = async () => {

    try {
        const filenames = await fs.readdir(folderPath);
        console.log(filenames);
        
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await list();
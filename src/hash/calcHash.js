import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const calculateHash = async () => {
    const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	const folderPath = path.join(__dirname, 'files');
	const filePath = path.join(folderPath, 'fileToCalculateHashFor.txt');

    try {
        const data = await fs.readFile(filePath);

        const { createHash } = await import('node:crypto');
        const hash = createHash('sha256');

        hash.update(data);

        const hashResult = hash.digest('hex');

        console.log('Hash of the file:', hashResult);
    } catch (error) {
        console.error('Error reading or hashing the file:', error);
    }
};

await calculateHash();
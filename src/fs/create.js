import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const create = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	const folderPath = path.join(__dirname, 'files');
	const filePath = path.join(folderPath, 'fresh.txt');
	const fileContent = 'I am fresh and young';

	try {
		await fs.access(filePath);
		throw new Error('FS operation failed');
	} catch (error) {
		if (error.code === 'ENOENT') {
			try {
					await fs.mkdir(folderPath, { recursive: true });

					await fs.writeFile(filePath, fileContent);

					console.log('File created successfully:', filePath);
			} catch (error) {
				throw new Error('FS operation failed');
			}
	} else {
		throw new Error('FS operation failed');
	}
	}
};

await create();
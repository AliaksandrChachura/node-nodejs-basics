import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import {
    createReadStream,
    createWriteStream,
} from 'node:fs';
import { rm } from 'node:fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const compress = async () => {
    const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);
    
    const sourceFolder = 'files';
    const folderPath = resolve(__dirname, sourceFolder);
    
    const decompressedFilePath = resolve(folderPath, 'fileToCompress.txt');
    const compressedFilePath = resolve(folderPath, 'archive.gz');

    const gzip = createGzip();
    const source = createReadStream(decompressedFilePath);
    const destination = createWriteStream(compressedFilePath);

    pipeline(source, gzip, destination, async (err) => {
        if (err) {
          console.error('An error occurred:', err);
          process.exitCode = 1;
        }
        
        try {
            await rm(decompressedFilePath);
            console.log('Compression successful. Decompressed file removed.');
        } catch (removeError) {
            console.error('Error removing decompressed file:', removeError);
            process.exitCode = 1;
        }
    });
    
};

await compress();
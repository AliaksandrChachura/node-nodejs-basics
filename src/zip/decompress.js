import { gunzip } from 'node:zlib';
import {
    readFile,
    writeFile,
} from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

const decompress = async () => {
    const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
    
    const sourceFolder = 'files';
    const folderPath = path.join(__dirname, sourceFolder);
    
    const compressedFilePath = path.join(folderPath, 'archive.gz');
    const decompressedFilePath = path.join(folderPath, 'fileToCompress.txt');

    readFile(compressedFilePath, (err, compressedData) => {
        if (err) {
            console.error(`Error reading compressed file "archive.gz": ${err}`);
            return;
        }
    
        gunzip(compressedData, (err, decompressedData) => {
            if (err) {
                console.error(`Error decompressing data: ${err}`);
                return;
            }
    
            writeFile(decompressedFilePath, decompressedData.toString('base64'), (err) => {
                if (err) {
                    console.error(`Error writing decompressed file fileToCompress.txt: ${err}`);
                    return;
                }
                console.log(`File "archive.gz" decompressed and saved as "fileToCompress.txt"`);
            });
        });
    });
};

await decompress();
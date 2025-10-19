import { createGzip } from 'node:zlib';
import {
    createReadStream,
    createWriteStream,
} from 'node:fs';
import { rm } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceFolder = 'files';
const folderPath = resolve(__dirname, sourceFolder);

const compress = async () => {
    const source = resolve(folderPath, "fileToCompress.txt");
    const destination = resolve(folderPath, "archive.gz");
    try {
         await pipeline(
            createReadStream(source, { flag: 'r' }),
            createGzip(),
            createWriteStream(destination /* , { flag: 'wx' } */)
        );

        await rm(source);
    } catch (err) {
        if (err.code === "EEXIST") {
            console.error('The file already exists');
        } else if (err.code === "ENOENT") {
            console.error('The file does not exist');
        } else {
            throw err;
        }
    }
};

await compress();
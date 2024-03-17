import { createGzip } from 'node:zlib';
import {
    createReadStream,
    createWriteStream,
} from 'node:fs';
import { rm } from 'node:fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceFolder = 'files';
const folderPath = resolve(__dirname, sourceFolder);

const compress = async () => {
    createReadStream(resolve(folderPath, "fileToCompress.txt"))
        .pipe(createGzip())
        .pipe(createWriteStream(resolve(folderPath, "archive.gz")))
        .on("finish", async () => {
        await rm(resolve(folderPath, `fileToCompress.txt`));
        console.log("Compression done!");
    }); 
};

await compress();
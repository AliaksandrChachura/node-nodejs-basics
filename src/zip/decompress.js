import{
    createReadStream,
    createWriteStream
} from "fs";
import { createGunzip } from 'node:zlib';
import { rm } from "fs/promises";
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';



const decompress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const sourceFolder = 'files';
    const folderPath = resolve(__dirname, sourceFolder);

    createReadStream(resolve(folderPath, "archive.gz"))
        .pipe(createGunzip())
        .pipe(createWriteStream(resolve(folderPath, "fileToCompress.txt")))
        .on("finish", async () => {
            await rm(resolve(folderPath, `archive.gz`));
            console.log("Decompression done!");
    });
};

await decompress();

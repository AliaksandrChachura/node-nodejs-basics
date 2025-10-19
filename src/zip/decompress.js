import{
    createReadStream,
    createWriteStream
} from "fs";
import { createGunzip } from 'node:zlib';
import { rm } from "fs/promises";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const sourceFolder = 'files';
const folderPath = resolve(__dirname, sourceFolder);

const decompress = async () => {
    const source = resolve(folderPath, "archive.gz");
    const destination = resolve(folderPath, "fileToCompress.txt");
    
    try {
        const pipelineAsync = promisify(pipeline);
        await pipelineAsync(
            createReadStream(source),
            createGunzip(),
            createWriteStream(destination)
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

await decompress();

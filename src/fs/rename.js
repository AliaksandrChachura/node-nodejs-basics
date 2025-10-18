import { readdir, rename } from 'node:fs/promises';
import { fileURLToPath } from 'url';
import {dirname, resolve} from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const sourceFolder = 'files';
const sourceFile = 'wrongFilename.txt';
const destinationFile = 'properFilename.md';

const rename = async () => {
    try {
        const data = await readdir(resolve(__dirname, sourceFolder));

        if (data.includes(destinationFile)) {
            throw new Error("FS operation failed");
        }

        await rename(
            resolve(__dirname, sourceFolder, sourceFile),
            resolve(__dirname, sourceFolder, destinationFile)
        );

        console.log("File successfully renamed");
    } catch {
        throw new Error("FS operation failed");
    }
};

await rename();
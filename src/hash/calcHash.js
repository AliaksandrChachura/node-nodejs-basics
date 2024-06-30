import * as fs from 'fs/promises';
import * as crypto from "node:crypto";
import { Transform } from "node:stream";
import {createReadStream} from "node:fs";
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
    const dataStream = createReadStream(resolve(__dirname, "files", "fileToCalculateHashFor.txt"));
    const hashSum = crypto.createHash("sha256");

    const hashStream = new Transform({
        transform(chunk, encoding, callback) {
            console.log(chunk);
            hashSum.update(chunk);
            callback(null);
        },
        flush(callback) {
            const hex = hashSum.digest("hex");
            console.log(hex);
            callback(null, hex);
        }
    });

  dataStream.pipe(hashStream).pipe(process.stdout);
};

await calculateHash();
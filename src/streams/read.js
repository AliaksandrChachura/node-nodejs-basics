import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createReadStream } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)


const read = async () => {
    const filePath = resolve(__dirname, "files", "fileToRead.txt");
    console.log("File content:");
    const stream = createReadStream(filePath, { encoding: "utf-8" });
    stream.pipe(process.stdout);
    return new Promise((resolve, reject) => {
        stream.on("end", () => {
            console.log("\n____ End of file content ____");
            resolve();
        });
        stream.on("error", reject);
    })
};

await read();
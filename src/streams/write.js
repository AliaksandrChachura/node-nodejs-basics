import { createWriteStream } from "fs";
import { dirname, resolve} from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
    const writable = createWriteStream(
        resolve(__dirname, "files", "fileToWrite.txt"),
        { flags: "a" }
    );
    process.stdout.write("Enter data:\n");
    process.stdin.on("data", (data) => {
        writable.write(data);
        process.stdout.write(
        "Data saved to filetowrite.txt\nYou can enter some more data:\n"
        );
    });
};

await write();
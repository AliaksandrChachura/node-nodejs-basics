import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
  const filePath = resolve(__dirname, "files", "fileToCalculateHashFor.txt");
  const hash = createHash("sha256");
  const stream = createReadStream(filePath);

  return new Promise((resolve, reject) => {
    stream.on("data", chunk => hash.update(chunk));
    stream.on("end", () => {
      const result = hash.digest("hex");
      console.log("SHA256 Hash:", result);
      resolve(result);
    });
    stream.on("error", reject);
  });
};

await calculateHash();
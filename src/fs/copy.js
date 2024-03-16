import * as fs from 'node:fs/promises';
import {dirname, resolve} from "node:path";
import { fileURLToPath } from 'node:url';

const copy = async () => {
    const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);

    const sourceFolder = 'files';
    const destinationFolder = 'files_copy';

    try {
        const files = await fs.readdir(resolve(__dirname, sourceFolder));
        await fs.mkdir(resolve(__dirname, destinationFolder), {
          recursive: false
        });
    
        const copyPromises = files.map(file =>
          fs.copyFile(
            resolve(__dirname, "files", `${file}`),
            resolve(__dirname, "files_copy", `${file}`),
            fs.constants.COPYFILE_EXCL
          )
        );
    
        await Promise.all(copyPromises);
    
        console.log("Files successfully copied");
      } catch (e) {
        throw new Error("FS operation failed");
      }
};

await copy();
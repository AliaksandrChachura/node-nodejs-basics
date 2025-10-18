import { readdir, mkdir, copyFile, constants} from 'node:fs/promises';
import { dirname, resolve } from "node:path";
import { fileURLToPath } from 'node:url';

const copy = async () => {
    const __filename = fileURLToPath(import.meta.url);
	  const __dirname = dirname(__filename);

    const sourceFolder = 'files';
    const destinationFolder = 'files_copy';

    try {
        const files = await readdir(resolve(__dirname, sourceFolder));
        await mkdir(resolve(__dirname, destinationFolder), {
          recursive: false
        });
    
        const copyPromises = files.map(file =>
          copyFile(
            resolve(__dirname, "files", `${file}`),
            resolve(__dirname, "files_copy", `${file}`),
            constants.COPYFILE_EXCL
          )
        );
    
        await Promise.all(copyPromises);
    
        console.log("Files successfully copied");
      } catch {
        throw new Error("FS operation failed");
      }
};

await copy();
import fs from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const create = async () => {

	try {
		await fs.appendFile(
				resolve(__dirname, "files", "fresh.txt"),
				"I am fresh and young",
				{
						flag: "ax"
				}
		);
		console.log("File successfully created");
	} catch (e) {
			throw new Error("FS operation failed");
	}
};

await create();
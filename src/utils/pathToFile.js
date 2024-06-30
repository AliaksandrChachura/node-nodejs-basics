import path from 'path';
import { pathToFolder } from './index.js';

const pathToFile = (folderName, fileName) => {

	return path.join(pathToFolder(folderName), fileName);
}; 

export { pathToFile };

import path from 'path';
import { __dirname } from './index.js';

const pathToFolder = (folderName) => {
 
	return path.join(__dirname(), folderName);
};

export { pathToFolder };

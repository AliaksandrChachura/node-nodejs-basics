import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
import { cpus } from 'node:os';
import {fileURLToPath} from "url";
import { dirname, resolve } from "path";

const FIRST_ARG = 10;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createWorker = async (workerData) => {
  return new Promise((res, rej) => {
    const worker = new Worker(resolve(__dirname, "worker.js"), { workerData });
    worker.on('message', (result) => {
      res(result);
    });
    worker.on("error", rej);
    worker.on("exit", code => {
      if (code !== 0) {
        rej(new Error(`stopped with ${code} exit code`));
      }
    });
  });
};

const createWorkers = async (numWorkers) => {
  const workers = [];
  for (let i = 0; i < numWorkers; i++) {
    const data = 10 + i;
    const result = await createWorker(data);
    workers.push(result);
  }
  return workers;
};

const performCalculations = async () => {
  console.log(await createWorkers(numCores));
    if (isMainThread) {
        const numCores = cpus().length;
        const workers = await createWorkers(numCores);
    
        console.log(workers);
    }
};

await performCalculations();
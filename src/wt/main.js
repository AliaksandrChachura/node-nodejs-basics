import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
import { cpus } from 'node:os';

const createWorker = (data) => {
  return new Promise((resolve) => {
    const worker = new Worker('./wt/worker.js', { workerData: data });
    worker.on('message', (result) => {
      resolve(result);
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
    if (isMainThread) {
        const numCores = cpus().length;
        const workers = await createWorkers(numCores);
    
        console.log(workers);
    }
};

await performCalculations();
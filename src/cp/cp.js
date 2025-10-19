import { fork } from "child_process";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const spawnChildProcess = async (args) => {
    const child = fork(resolve(__dirname, "files", "script.js"), [
        ...args.slice(2)
    ], {
        silent: true
    });
    
    console.log(`Master process PID: ${process.pid}`);
    console.log(`Child process PID: ${child.pid}`);
    
    process.stdin.pipe(child.stdin);
    
    child.stdout.pipe(process.stdout);
    
    child.stderr.pipe(process.stderr);
    
    child.on("message", (message) => {
        console.log("Message from child:", message.toString());
    });
    
    child.on("exit", (code) => {
        console.log(`Child process exited with code ${code}`);
    });
};

spawnChildProcess( process.argv);

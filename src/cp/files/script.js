const args = process.argv.slice(2);

console.log(`Total number of arguments is ${args.length}`);
console.log(`Arguments: ${JSON.stringify(args)}`);

const echoInput = (chunk) => {
    console.log("child", process.pid);
    const chunkStringified = chunk.toString();
    if (chunkStringified.includes('CLOSE')) process.exit(0);
    process.stdout.write(`Received from master process: ${chunk.toString()}\n`);
    process.send("Hi from child process! I like your input!\nThis time it's:\n" + `${chunkStringified} =)`);
};

process.stdin.on('data', echoInput);

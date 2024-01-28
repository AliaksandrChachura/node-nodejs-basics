import { Transform } from 'stream';

const reverseTransformStream = new Transform({
    transform(chunk, encoding, callback) {
      this.push(chunk.toString().split('').reverse().join(''));
      callback();
    }
});

const transform = async () => {
    console.log(process.stdin.data);
    process.stdin.pipe(reverseTransformStream).pipe(process.stdout);
};

await transform();
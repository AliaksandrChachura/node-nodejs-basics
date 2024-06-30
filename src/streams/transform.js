import { Transform } from 'stream';
import { pipeline } from "stream/promises";

const transform = async () => {
  const reverseTransformStream = new Transform({
    transform(chunk, encoding, callback) {
      this.push(chunk.toString().split('').reverse().join(''));
      callback();
    }
  });

  try {
    await pipeline(process.stdin, reverseTransformStream, process.stdout);
  } catch (e) {
    console.log(e);
  }
};

await transform();

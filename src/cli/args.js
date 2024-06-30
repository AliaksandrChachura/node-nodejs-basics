const parseArgs = () => {
    const args = process.argv.slice(2);
    console.log(args);

    const result = args.reduce((sum, curr, i, arr) => {
        if (curr.startsWith("--")) {
          return sum + `${curr.slice(2)} is ${arr[i + 1]}, `;
        }
    
        return sum + "";
      }, "");
    
      console.log(result.slice(0, result.length - 2));
};

parseArgs();
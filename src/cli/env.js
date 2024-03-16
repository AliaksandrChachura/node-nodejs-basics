const parseEnv = () => {
    const formattedOutput = Object.entries(process.env)
        .filter(item => item[0]
        .startsWith("RSS_"))
        .map(([key, value]) => `RSS_${key}=${value}`)
        .join('; ');

    process.stdout.write(formattedOutput);

    if (formattedOutput.length < 1) {
        console.log("No environment variables with the prefix 'RSS_' found.");
    }
};

parseEnv();
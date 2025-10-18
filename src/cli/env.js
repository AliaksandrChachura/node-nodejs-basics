const parseEnv = () => {
    const rssEntries = Object.entries(process.env)
        .filter(item => item[0].startsWith("RSS_"));
        

    if (rssEntries.length < 1) {
        console.log("No environment variables with the prefix 'RSS_' found.");
    }

    const formattedOutput = rssEntries 
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');

    process.stdout.write(formattedOutput);

    
};

parseEnv();
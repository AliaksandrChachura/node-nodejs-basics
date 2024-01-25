const parseEnv = () => {
    const rssVariables = {};
    
    for (const key in process.env) {
        if (key.startsWith("RSS_")) {
            rssVariables[key] = process.env[key];
        }
    }

    if (Object.keys(rssVariables).length > 0) {
        const formattedOutput = Object.entries(rssVariables).map(([key, value]) => `RSS_${key}=${value}`).join('; ');
        console.log(formattedOutput);
    } else {
        console.log("No environment variables with the prefix 'RSS_' found.");
    }
};

parseEnv();
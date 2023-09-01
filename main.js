const { crawlPage } = require('./crawl');

async function main() {
    const args = process.argv.slice(2);

    if (args.length !== 1) {
        console.error("Incorrect command. Please enter: npm run start BASE_URL");
        process.exit(1);
    }

    const baseURL = args[0];

    console.log(`Crawler is starting at the url: ${baseURL}`);

    const pages = await crawlPage(baseURL, baseURL, {});

    console.log(pages);
}

main();
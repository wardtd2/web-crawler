import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";

async function main() {
    let baseURL;
    if (process.argv.length === 3) {
        baseURL = process.argv[2];
        console.log(`Your designated base URL is: ${baseURL}`);
    } else {
        console.log("Incorrect number of arguments. Exiting...");
        return;
    }
    
    const pages = await crawlPage(baseURL);
    printReport(pages);


}

main();
import { crawlPage } from "./crawl.js";

function main() {
    let baseURL;
    if (process.argv.length === 3) {
        baseURL = process.argv[2];
        console.log(`Your designated base URL is: ${baseURL}`);
    } else {
        console.log("Incorrect number of arguments. Exiting...");
        return;
    }
    
    crawlPage(baseURL);


}

main();
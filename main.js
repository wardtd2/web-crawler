import { crawlPage } from "./crawl.js";

function main() {
    if (process.argv.length === 3) {
        console.log(`Your designated base URL is: ${process.argv[2]}`);
    } else {
        console.log("Incorrect number of arguments. Exiting...");
        return;
    }
    const baseURL = process.argv[2];
    crawlPage(baseURL);


}

main();
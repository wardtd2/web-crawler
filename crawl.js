import { JSDOM } from 'jsdom';

function normalizeURL(urlString) {
    const url = new URL(urlString);
    let path = url.pathname;
    
    if (path.charAt(path.length - 1) === '/') {
        path = path.slice(0, -1);
    }

    return `${url.hostname}${path}`;
}


function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody, {
        url: baseURL,
    });
    const anchors = dom.window.document.querySelectorAll('a');
    const urls = []
    for (const anchor of anchors) {
        urls.push(anchor.href)
    }
    return urls;
}


async function crawlPage(currentURL) {
    let response;
    try {
         response = await fetch(currentURL);
    } catch (err) {
        console.log(`Unable to process request. Error provided: ${err.message}`)
        return;
    }

    if (response.status >= 400) {
        console.log(`Page responded with error code ${response.status}: ${response.statusText}`);
        return;
    }
    const contentType = response.headers.get('Content-Type')
    console.log(contentType);
    if (!contentType || !contentType.includes('text/html')) {
        console.log(`Requested URL was not html, and was instead ${contentType}`);
        return;
    }
    const body = await response.text();
    console.log(body);

    
   
}

export { normalizeURL, getURLsFromHTML, crawlPage };
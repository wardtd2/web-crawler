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
    const urls = [];
    for (const anchor of anchors) {
        urls.push(anchor.href);
    }
    return urls;
}


async function fetchPageContent(url) {
    let response;
    const requestURL = `https://${url}`
    try {
         response = await fetch(requestURL);
    } catch (err) {
        console.log(`Unable to process request. Error provided: ${err.message}`);
        return;
    }

    if (response.status >= 400) {
        console.log(`Page responded with error code ${response.status}: ${response.statusText}`);
        return;
    }
    const contentType = response.headers.get('Content-Type');
    if (!contentType || !contentType.includes('text/html')) {
        console.log(`Requested URL: ${url} was not html, and was instead ${contentType}`);
        return;
    }
    return await response.text();
}


async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    const base = new URL(baseURL);
    const current = new URL(currentURL);
    if (base.hostname !== current.hostname) {
        return pages;
    }

    const normalizedURL = normalizeURL(currentURL);
    
    if(Object.keys(pages).includes(normalizedURL)) {
        pages[normalizedURL]++;
        return pages;
    }

    pages[normalizedURL] = 1;
    const pageContent = await fetchPageContent(normalizedURL);
    
    const urlsList = getURLsFromHTML(pageContent, baseURL);
    
    for (const url of urlsList){
        pages = await crawlPage(baseURL, url, pages);
    }

    return pages;
    
   
}

export { normalizeURL, getURLsFromHTML, crawlPage };
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

export { normalizeURL, getURLsFromHTML };
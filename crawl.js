function normalizeURL(urlString) {
    const url = new URL(urlString);
    let path = url.pathname;
    
    if (path.charAt(path.length - 1) === '/') {
        path = path.slice(0, -1);
    }

    return `${url.hostname}${path}`;
}


function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    const urls = dom.window.document.querySelectorAll('a');
    console.log(urls);
    return urls;
}

export { normalizeURL, getURLsFromHTML };
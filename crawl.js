const { URL } = require('url');
const { JSDOM } = require('jsdom');

async function crawlPage(baseURL, currentURL, pages) {
    try {
        const baseDomain = new URL(baseURL).hostname;
        const currentDomain = new URL(currentURL).hostname;

        if (baseDomain !== currentDomain) {
            return pages;
        }

        const normalizedCurrentURL = normalizeURL(currentURL);

        if (pages[normalizedCurrentURL]) {
            pages[normalizedCurrentURL].count++;
            return pages;
        }

        pages[normalizedCurrentURL] = {
            count: currentURL === baseURL ? 0 : 1,
        };

        console.log('Crawling:', currentURL);
        const { default: fetch } = await import('node-fetch');
        const response = await fetch(baseURL)

        if (!response.ok) {
            console.error(`Error: HTTP status ${response.status} ${response.statusText}`);
            return pages;
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('text/html')) {
            console.error('Error: Response content-type is not text/html');
            return pages;
        }

        const htmlBody = await response.text();

        const links = getURLsFromHTML(htmlBody, currentURL);

        for (const link of links) {
            pages = await crawlPage(baseURL, link, pages);
        }

        return pages;
    } catch (error) {
        console.error('Error:', error);
        return pages;
    }
}

function normalizeURL(url_string) {
    try {
        const parsedUrl = new URL(url_string);

        const domain = parsedUrl.hostname;
        let path = parsedUrl.pathname || '/';

        path = path.endsWith('/') ? path.slice(0, -1) : path;

        return domain + path;
    } catch (error) {
        console.error('Error parsing URL:', error);
        return url_string;
    }
}

function getURLsFromHTML(htmlBody, baseURL) {
    try {
        const dom = new JSDOM(htmlBody);

        const document = dom.window.document;

        const anchorTags = document.querySelectorAll('a');

        const links = Array.from(anchorTags).map((a) => {
            const href = a.getAttribute('href');
            if (href) {
                const resolvedURL = new URL(href, baseURL);
                return resolvedURL.href;
            }
            return null;
        }).filter(Boolean);

        return links;
    } catch (error) {
        console.error('Error extracting links from HTML:', error);
        return [];
    }
}

module.exports = {
    crawlPage,
    normalizeURL,
    getURLsFromHTML
}
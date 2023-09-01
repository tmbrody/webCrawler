const { test, expect } = require('@jest/globals');
const { normalizeURL } = require('./crawl.js');
const { getURLsFromHTML } = require('./crawl.js');

test('Checks "not_a_url" url path', () => {
    expect(normalizeURL('not_a_url')).toBe("not_a_url");
});

test('Checks "http://" url path', () => {
    expect(normalizeURL('http://')).toBe("http://");
});

test('Checks "https://boot.dev" url path', () => {
    expect(normalizeURL('http://boot.dev')).toBe("boot.dev");
});

test('Checks "http://boot.dev/path" url path', () => {
    expect(normalizeURL('http://boot.dev/path')).toBe("boot.dev/path");
});

test('Checks "ftp://boot.dev/path" url path', () => {
    expect(normalizeURL('ftp://boot.dev/path')).toBe("boot.dev/path");
});

test('Checks "https://blog.boot.dev/path/" url path', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe("blog.boot.dev/path");
});

test('Checks "https://blog.boot.dev/path" url path', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toBe("blog.boot.dev/path");
});

test('Checks "http://blog.boot.dev/path/" url path', () => {
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe("blog.boot.dev/path");
});

test('Checks "http://blog.boot.dev/path" url path', () => {
    expect(normalizeURL('http://blog.boot.dev/path')).toBe("blog.boot.dev/path");
});

test('Checks "https://blog.boot.dev/path/?param1=value1&param2=value2" url path', () => {
    expect(normalizeURL('https://blog.boot.dev/path/?param1=value1&param2=value2')).toBe("blog.boot.dev/path");
});

test('Checks "https://blog.boot.dev/path?param1=value1&param2=value2" url path', () => {
    expect(normalizeURL('https://blog.boot.dev/path?param1=value1&param2=value2')).toBe("blog.boot.dev/path");
});

test('Checks https://blog.boot.dev:8080/path/ url path', () => {
    expect(normalizeURL('https://blog.boot.dev:8080/path/')).toBe("blog.boot.dev/path");
});

test('Checks https://blog.boot.dev:8080/path url path', () => {
    expect(normalizeURL('https://blog.boot.dev:8080/path')).toBe("blog.boot.dev/path");
});

test('Checks "https://blog.boot.dev/path/#section1" url path', () => {
    expect(normalizeURL('https://blog.boot.dev/path/#section1')).toBe("blog.boot.dev/path");
});

test('Checks "https://blog.boot.dev/path#section1" url path', () => {
    expect(normalizeURL('https://blog.boot.dev/path#section1')).toBe("blog.boot.dev/path");
});

test('Checks "https://username.password@boot.dev/path" url path', () => {
    expect(normalizeURL('https://username.password@boot.dev/path')).toBe("boot.dev/path");
});

test('Checks "https://boot.dev/%20path%20with%20spaces" url path', () => {
    expect(normalizeURL('https://boot.dev/%20path%20with%20spaces')).toBe("boot.dev/%20path%20with%20spaces");
});

const htmlBody = `
    <html lang="en-Us">
        <body>
            <a href="">Link 1</a>
            <a href="/">Link 2</a>
            <a href=" ">Link 3</a>
            <a href="not_a_url">Link 4</a>
            <a href="path/to/page">Link 5</a>
            <a href="https://boot.dev">Link 6</a>
            <a href="/path/to/page/">Link 7</a>
            <a href="/path/to/page">Link 8</a>
            <a href="https://blog.boot.dev">Link 9</a>
            <a href="http://blog.boot.dev/path">Link 10</a>
            <a href="http://blog.boot.dev/path/">Link 11</a>
            <a href="https://blog.boot.dev/path/">Link 12</a>
        </body>
    </html>
`;

const baseURL = 'https://www.boot.dev';

expectedValues = [
    'https://www.boot.dev/',
    'https://www.boot.dev/',
    'https://www.boot.dev/not_a_url',
    'https://www.boot.dev/path/to/page',
    'https://boot.dev/',
    'https://www.boot.dev/path/to/page/',
    'https://www.boot.dev/path/to/page',
    'https://blog.boot.dev/',
    'http://blog.boot.dev/path',
    'http://blog.boot.dev/path/',
    'https://blog.boot.dev/path/'
  ];

test('Checks all url paths in the anchor tags of an html document', () => {
    expect(getURLsFromHTML(htmlBody, baseURL)).toStrictEqual(expectedValues);
});

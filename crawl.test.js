
import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

test('Converts https://blog.boot.dev/path/ to blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});


test('Converts https://blog.boot.dev/path to blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
});


test('Converts http://blog.boot.dev/path/ to blog.boot.dev/path', () => {
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});


test('Converts http://blog.boot.dev/path to blog.boot.dev/path', () => {
    expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path');
});


test('Retrives a single URL from the provided html', () => {
    const html = '<html><body><a href="https://blog.boot.dev/path"><span>Go to Boot.dev</span></a></body></html>';
    const baseURL = 'https://blog.boot.dev'
    const expected = ['https://blog.boot.dev/path'];
    expect(getURLsFromHTML(html, baseURL)).toStrictEqual(expected);
});


test('Converts relative URL to absolute', () => {
    const html = '<html><body><a href="/games/path/"><span>Go to Boot.dev</span></a></body></html>';
    const baseURL = 'https://blog.boot.dev'
    const expected = ['https://blog.boot.dev/games/path/'];
    expect(getURLsFromHTML(html, baseURL)).toStrictEqual(expected);
});


test('Retrieves multiple URLs from HTML', () => {
    const html = `<html><body><a href="/games/path/"><span>Go to Boot.dev</span></a><a href="/games/patha/"><span>Go to Boot.dev</span></a>
    <a href="http://blog.boot.dev/path"><span>Go to Boot.dev</span></a>
    <a href="https://blog.boot.dev/path/banana"><span>Go to Boot.dev</span></a>
    </body></html>`;
    const baseURL = 'https://blog.boot.dev'
    const expected = ['https://blog.boot.dev/games/path/', 'https://blog.boot.dev/games/patha/', 'http://blog.boot.dev/path', 'https://blog.boot.dev/path/banana'];
    expect(getURLsFromHTML(html, baseURL)).toStrictEqual(expected);
});
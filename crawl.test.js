
import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";

test('Converts https://blog.boot.dev/path/ to blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path/').toBe('blog.boot.dev/path'))
});
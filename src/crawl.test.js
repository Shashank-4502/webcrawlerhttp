const { normalizeURL, getURLsFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://blog.boot.dev/path";
  const output = normalizeURL(input);
  expect(output).toEqual("blog.boot.dev/path");
});
test("normalizeURL strip ends with the slash", () => {
  const input = "https://blog.boot.dev/path/";
  const output = normalizeURL(input);
  expect(output).toEqual("blog.boot.dev/path");
});
test("normalizeURL strip capitals", () => {
  const input = "https://BLOG.boot.dev/path/";
  const output = normalizeURL(input);
  expect(output).toEqual("blog.boot.dev/path");
});
test("normalizeURL strip strtip http", () => {
  const input = "https://BLOG.boot.dev/path/";
  const output = normalizeURL(input);
  expect(output).toEqual("blog.boot.dev/path");
});
test("getURLsFromHTML absolute urls", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="https://blog.boot.dev/path/">
      Boot dev Blog
      </a>
    </body>
  </html>
  `;
  const inputBaseUrl = "https://blog.boot.dev/";
  const output = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
  const expectedValue = ["https://blog.boot.dev/path/"];
  expect(output).toEqual(expectedValue);
});
test("getURLsFromHTML relative and absolute urls", () => {
  const inputHTMLBody = `
  <html>
    <body>
    <a href="https://blog.boot.dev/path1/">
      Boot dev Blog path 1
      </a>
      <a href="/path2/">
      Boot dev Blog path 2
      </a>
    </body>
  </html>
  `;
  const inputBaseUrl = "https://blog.boot.dev";
  const output = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
  const expectedValue = [
    "https://blog.boot.dev/path1/",
    "https://blog.boot.dev/path2/",
  ];
  expect(output).toEqual(expectedValue);
});
test("getURLsFromHTML relative urls", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="/path/">
      Boot dev Blog
      </a>
    </body>
  </html>
  `;
  const inputBaseUrl = "https://blog.boot.dev";
  const output = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
  const expectedValue = ["https://blog.boot.dev/path/"];
  expect(output).toEqual(expectedValue);
});
test("getURLsFromHTML invalid urls", () => {
  const inputHTMLBody = `
  <html>
    <body>
    <a href="invalid">
      Invalid URL
      </a>
    </body>
  </html>
  `;
  const inputBaseUrl = "https://blog.boot.dev";
  const output = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
  const expectedValue = [];
  expect(output).toEqual(expectedValue);
});

const { normalizeURL } = require("./crawl.js");
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

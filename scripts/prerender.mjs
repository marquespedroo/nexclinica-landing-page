import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);
const rootDir = path.resolve(currentDir, '..');
const distDir = path.join(rootDir, 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');
const ssrEntryPath = path.join(rootDir, 'dist-ssr', 'entry-server.js');

const { render } = await import(pathToFileURL(ssrEntryPath).href);
const renderedMarkup = await render();

const linkTagPattern = /<link\b[^>]*>/g;
const headTags = renderedMarkup.match(linkTagPattern)?.join('') ?? '';
const appHtml = renderedMarkup.replace(linkTagPattern, '');

let html = await readFile(indexHtmlPath, 'utf8');
html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

if (headTags) {
  html = html.replace('</head>', `  ${headTags}\n</head>`);
}

await writeFile(indexHtmlPath, html);

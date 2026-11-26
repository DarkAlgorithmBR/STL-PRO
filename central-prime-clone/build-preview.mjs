import fs from 'node:fs/promises';

// Build a classic script so file:// previews need no server or dependencies.
const project = new URL('./', import.meta.url);
const assets = new URL('dist/assets/', project);
const {hero} = await import('./src/content.js');
const vendor = await fs.readFile(new URL('vendor-react-WHN_XIgS.js', assets), 'utf8');
const vendorExport = 'export{mh as R,dh as c,yh as j,eh as r};';
if (!vendor.includes(vendorExport)) throw new Error('Exportação do runtime não encontrada.');
const runtime = vendor.replace(vendorExport, 'return {r:eh,j:yh,R:mh,c:dh};');

let components = await fs.readFile(new URL('custom-components.js', assets), 'utf8');
components = components.replace(/^import .*?;\r?\n/, 'const {r:React,j:jsx}=runtime;\n')
  .replace("import {hero} from '../../src/content.js';", `const hero=${JSON.stringify(hero)};`)
  .replaceAll('export function ', 'function ')
  .replace("src:'./assets/plan_showcase.webp'", "src:new URL('plan_showcase.webp',assetBase).href");

let app = await fs.readFile(new URL('app.js', assets), 'utf8');
app = app.replace(/^import .*?;\r?\n/, '')
  .replace('import{r as x,j as e,R as D,c as M}from"./vendor-react-WHN_XIgS.js";', 'const {r:x,j:e,R:D,c:M}=runtime;const {PricePlans,VideoSlot,AccessibleFaq,RefreshedHero}=components;')
  .replace(/"\/assets\/([^"\r\n]+)"/g, (_, file) => `new URL(${JSON.stringify(file)},assetBase).href`)
  .replace(/export\{j as B,O as C,y as t\};?\s*$/, '');

const bundle = `/* Local preview: open index.html directly in your browser. */\n(function(){\n'use strict';\nconst assetBase=new URL('./',document.currentScript.src);\nconst runtime=(function(){${runtime}\n})();\nconst components=(function(){${components}\nreturn {PricePlans,VideoSlot,AccessibleFaq,RefreshedHero};\n})();\n(function(){${app}\n})();\n})();\n`;
if (/\bimport\s*\(|\bimport\s*\{|\bexport\s*\{/.test(bundle)) throw new Error('Ainda há módulos no bundle local.');
await fs.writeFile(new URL('page.bundle.js', assets), bundle);

let html = await fs.readFile(new URL('dist/index.html', project), 'utf8');
html = html.replace('<script type="module" src="./assets/app.js"></script>', '<script defer src="./assets/page.bundle.js"></script>');
await fs.writeFile(new URL('dist/index.html', project), html);
const relocate = prefix => html.replace(/((?:href|src)=")\.\//g, `$1${prefix}`);
await fs.writeFile(new URL('index.html', project), relocate('./dist/'));
await fs.writeFile(new URL('../index.html', project), relocate('./central-prime-clone/dist/'));
console.log('Index pronto na pasta principal, na pasta do projeto e no pacote de hospedagem.');

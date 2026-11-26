import {optimizeCro} from './src/cro-transform.mjs';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {replacements,bonusDescriptions} from './src/content.js';

const project = new URL('./',import.meta.url);
const assets = new URL('dist/assets/',project);
const baseline = new URL('src/reference-page.js',project);
try { await fs.access(baseline); } catch { await fs.copyFile(new URL('app.js',assets),baseline); }
let app = await fs.readFile(baseline,'utf8');
const beforeImageRefs = [...app.matchAll(/"(\/assets\/[^"\r\n]+\.webp)"/g)].map(m=>m[1]);

function replaceRequired(from,to){
  if(!app.includes(from)) throw new Error(`Texto não encontrado: ${from.slice(0,70)}`);
  app=app.replaceAll(from,to);
}

// Only the hero's inner content is rebuilt. Its place, video and anchor stay.
const heroStart=app.indexOf('e.jsxs("section",{id:"hero"');
const heroEnd=app.indexOf(',e.jsxs("section",{id:"produtos"',heroStart);
if(heroStart<0||heroEnd<0) throw new Error('Hero não encontrado.');
app=app.slice(0,heroStart)+'e.jsx(RefreshedHero,{})'+app.slice(heroEnd);
app=app.replace('import {PricePlans,VideoSlot,AccessibleFaq}', 'import {PricePlans,VideoSlot,AccessibleFaq,RefreshedHero}');

for(const [oldText,newText] of replacements){
  if(oldText===newText)continue;
  replaceRequired(JSON.stringify(oldText),JSON.stringify(newText));
}
let count=0;
app=app.replace(/desc:"((?:\\.|[^"\\])*)"/g,()=>`desc:${JSON.stringify(bonusDescriptions[count++])}`);
if(count!==20)throw new Error(`Contagem inesperada de bônus: ${count}`);
app=app.replace('"não pelo catálogo inteiro."}),"”"', '"não pelo catálogo inteiro."})');
// Remove decorative emojis from tags while preserving each image and its name.
app=app.replace(/tag:"([^"]+)"/g,(_,value)=>`tag:${JSON.stringify(value.replace(/^[^A-Za-zÀ-ÿ]+/u,'').replace('MAIS VENDIDO','COLEÇÃO').replace('POPULAR','COLEÇÃO'))}`);

const palette={
  '000000':'17191d','0066ff':'ffb547','00d4ff':'ffd18b','00ff66':'ffb547',
  '00e64d':'ffb547','00d964':'ffb547','00b853':'b56b00','00a850':'a65f00',
  '009e47':'a65f00','008d42':'a65f00','00853d':'9e5900','009747':'ffb547',
  '007a36':'874d00','1a1c1f':'23272e','111419':'22262c'
};
function theme(source){
  return source.replace(/#([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})(?![0-9a-f])/gi,(match,digits)=>{
    let value=digits.toLowerCase();
    if(value.length===3||value.length===4)value=[...value].map(c=>c+c).join('');
    return palette[value.slice(0,6)]?'#'+palette[value.slice(0,6)]+value.slice(6):match;
  }).replace(/rgba?\(0,\s*102,\s*255/g,'rgba(255, 181, 71')
    .replace(/rgba?\(0,\s*255,\s*102/g,'rgba(255, 181, 71')
    .replace(/boxShadow:"[^"]*"/g,'boxShadow:"none"')
    .replace(/textShadow:"[^"]*"/g,'textShadow:"none"');
}
app=theme(app);
// Current identity and video-free layout. Original source remains archived.
app=app.replaceAll('Central Prime 3D™','Acervo Maker STL').replaceAll('Central Prime 3D','Acervo Maker STL').replaceAll('Central Prime','Acervo Maker STL');
replaceRequired('e.jsx(J,{}),','');

const afterImageRefs = [...app.matchAll(/"(\/assets\/[^"\r\n]+\.webp)"/g)].map(m=>m[1]);
if(JSON.stringify(beforeImageRefs)!==JSON.stringify(afterImageRefs))throw new Error('As referências das imagens mudaram.');
// Keep originals intact; apply only the image substitutions selected for this page.
const selectedImages=JSON.parse(await fs.readFile(new URL('src/selected-images.json',project),'utf8'));
for(const image of selectedImages){
  await fs.access(new URL(image.file,assets));
  replaceRequired(JSON.stringify('/assets/'+image.original),JSON.stringify('/assets/'+image.file));
}
app=optimizeCro(app);
await fs.writeFile(new URL('app.js',assets),app);
const originalCss=await fs.readFile(new URL('reference/original.css',project),'utf8');
await fs.writeFile(new URL('original.css',assets),theme(originalCss));

const inventory=JSON.parse((await fs.readFile(new URL('pagina-de-vendas/inventario-imagens-antes.json',project),'utf8')).replace(/^\uFEFF/,''));
for(const image of inventory){
  const hash=createHash('sha256').update(await fs.readFile(new URL(image.path,assets))).digest('hex');
  if(hash.toUpperCase()!==image.sha256)throw new Error(`Imagem alterada: ${image.path}`);
}
const build=spawnSync(process.execPath,['build-preview.mjs'],{cwd:project,stdio:'inherit'});
if(build.status!==0)process.exit(build.status||1);
console.log(`Reformulação aplicada. ${inventory.length} imagens preservadas, 20 bônus sincronizados.`);

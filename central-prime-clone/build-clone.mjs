import fs from 'node:fs/promises';

const root = new URL('./', import.meta.url);
let app = await fs.readFile(new URL('reference/original.js', root), 'utf8');
function cut(start, end, replacement) {
  const from = app.indexOf(start);
  const to = app.indexOf(end, from);
  if (from < 0 || to < 0) throw new Error(`Trecho não encontrado: ${start}`);
  app = app.slice(0, from) + replacement + app.slice(to);
}

// Preserve the reference's visual components and carousels. Replace only the
// checkout, video, FAQ accessibility and offer components with editable ones.
cut('const __vite__mapDeps=', 'import{r as x', '');
cut('const P=(function()', ',L=[', 'const O={premium:"#oferta"}');
cut('H=(t,a)=>', ';function k(', 'H=()=>{},y=()=>{}');
cut('J=({src:t', ',Z=({images:t', 'J=()=>e.jsx(VideoSlot,{slot:"areaMembros",title:"Vídeo da área de membros",ratio:"854 / 480"})');
cut('se=({onOpenBasicModal:t})', ',te=()=>', 'se=()=>e.jsx(PricePlans,{bonuses:j,bonusNames:ee})');
cut('te=()=>', ';function re()', 'te=()=>e.jsx(AccessibleFaq,{items:$})');
cut('function re(){const', 'return e.jsxs("div",{className:"min-h-screen', 'function re(){const n=s=>{s.preventDefault();document.getElementById("oferta")?.scrollIntoView({behavior:"smooth",block:"start"})};');
cut('e.jsxs("div",{className:"mt-10 mx-auto w-full max-w-[360px] relative"', ',e.jsx("p",{className:"mt-10 text-base', 'e.jsx(VideoSlot,{slot:"principal",title:"Vídeo de apresentação",ratio:"9 / 16",portrait:!0})');
app = app.replace('e.jsx(J,{src:"https://i.imgur.com/fxPFHOn.mp4",poster:"/assets/area_membros_new_poster.webp",title:"Área de Membros VIP — Central Prime 3D"})', 'e.jsx(J,{})');
app = app.replace('e.jsx(se,{onOpenBasicModal:()=>a(!0)})', 'e.jsx(se,{})');
app = app.replace(',t&&e.jsx(x.Suspense,{fallback:null,children:e.jsx(ae,{isOpen:t,onClose:()=>a(!1)})})', '');
app = app.replaceAll('#oferta-3990', '#oferta');
app = app.replace('href:O.premium,target:"_blank",rel:"noreferrer",onClick:()=>y("Plano Vitalício Completo - CTA Final R$ 57,90",57.9)', 'href:"#oferta",onClick:n');
app = app.replaceAll('ACESSO PREMIUM', 'SEU ACESSO').replaceAll('Acesso Premium', 'Acesso Completo');
app = app.replaceAll(' ↓', '');
app = 'import {PricePlans,VideoSlot,AccessibleFaq} from "./custom-components.js";\n' + app;
for (const forbidden of ['.mp4', 'appdigitalhub', 'SpecialOfferModal', '57,90', '27,90', '10,90', 'fbq']) {
  if (app.includes(forbidden)) throw new Error(`Referência antiga ainda presente: ${forbidden}`);
}
await fs.mkdir(new URL('dist/assets/', root), {recursive:true});
await fs.writeFile(new URL('dist/assets/app.js', root), app);
await fs.copyFile(new URL('reference/original.css', root), new URL('dist/assets/original.css', root));
console.log('Página adaptada: dois planos, dois espaços vazios para vídeo e arquivos locais.');

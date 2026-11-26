import { r as React, j as jsx } from './vendor-react-WHN_XIgS.js';
import {hero} from '../../src/content.js';

const {jsx: el, jsxs: els} = jsx;
const config = window.PAGE_CONFIG || {};
const baseFeatures = [
  'Mais de 150 mil STL organizados por categoria',
  'Acesso vitalício para explorar no seu ritmo',
  'Coleções de diferentes nichos para o seu catálogo',
  'Download dos modelos pela biblioteca online',
];
const money = new Intl.NumberFormat('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2});

function safeUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.href : '';
  } catch { return ''; }
}

export function VideoSlot(){ return null; }

export function RefreshedHero(){
  return els('section',{id:'hero',className:'hero-section',children:[
    el('div',{className:'hero-brand',children:hero.badge}),
    els('h1',{children:[hero.intro,' ',el('span',{className:'hero-emphasis',children:hero.emphasis}),' ',hero.ending]}),
    el('p',{className:'hero-subtitle',children:hero.subheadline}),
    el('a',{href:'#produtos',className:'primary-cta',children:hero.cta}),
    el('ul',{className:'hero-benefits',children:hero.bullets.map(text=>els('li',{children:[el('span',{'aria-hidden':true,children:'✓'}),text]},text))}),
    el('p',{className:'hero-access',children:'Mais de 150 mil STL · 20 coleções bônus no Pro'})
  ]});
}

function PriceCard({kind, bonuses, bonusNames, onUnavailable}) {
  const [expanded, setExpanded] = React.useState(false);
  const isPro = kind === 'pro';
  const plan = config.planos?.[kind] || {nome:isPro ? 'Pro' : 'Básico', preco:isPro ? 37 : 10};
  const checkout = safeUrl(plan.checkoutUrl);
  const visibleBonuses = expanded ? bonuses : bonuses.slice(0,6);
  const features = isPro
    ? [...baseFeatures, ...visibleBonuses.map(b => `Bônus ${b.id}: ${bonusNames[b.id] || b.title}`), '14 dias de garantia para conhecer o conteúdo'].map(text => ({text, included:true}))
    : [
        {text:'Pack com mais de 150 mil STL organizados por categoria', included:true},
        {text:'Acesso à biblioteca por 3 meses', included:true},
        {text:'Acesso vitalício', included:false},
        ...visibleBonuses.map(b => ({text:`Bônus ${b.id}: ${bonusNames[b.id] || b.title}`, included:false}))
      ];
  const buttonProps = {
    className:'plan-cta',
    children:`Quero o plano ${plan.nome}`,
    ...(checkout ? {href:checkout} : {type:'button', onClick:onUnavailable})
  };
  return els('article', {
    id:`plano-${kind}`, className:`plan-card ${isPro ? 'plan-pro' : 'plan-basic'}`,
    'aria-labelledby':`title-${kind}`,
    children:[
      isPro && el('div', {className:'plan-badge',children:'Biblioteca + 20 bônus'}),
      el('div',{className:'plan-eyebrow',children:isPro?'Acesso vitalício':'Acesso por 3 meses'}),
      el('h3',{id:`title-${kind}`,children:`Plano ${plan.nome}`}),
      el('p',{className:'plan-subtitle',children:isPro?`A biblioteca completa e ${bonuses.length} bônus incluídos`:'Pack de 150 mil STL para explorar durante 3 meses'}),
      els('div',{className:'acervo-plan-cover',children:[el('span',{className:'acervo-cover-brand',children:'ACERVO MAKER STL'}),els('strong',{children:['150 mil',el('span',{children:'modelos STL'})]}),el('p',{children:isPro?'Biblioteca + 20 bônus · Acesso vitalício':'Seu próximo projeto começa aqui · 3 meses'})]}),
      els('div',{className:'plan-price-box',children:[
        el('span',{className:'plan-payment-label',children:'PAGAMENTO ÚNICO'}),
        els('p',{className:'plan-price',children:[el('span',{children:'R$'}),money.format(plan.preco)]}),
        el('p',{className:'plan-payment-note',children:'à vista • Sem mensalidades'})
      ]}),
      el('ul',{id:`beneficios-${kind}`,className:'plan-features',children:features.map(({text,included},i)=>els('li',{className:included?'feature-included':'feature-unavailable','aria-label':included?undefined:`${text} — exclusivo do Pro`,children:[el('span',{'aria-hidden':true,children:included?'✓':'×'}),el('span',{children:text})]},i))}),
      !isPro && el('p',{className:'plan-excluded-note',children:'Itens apagados são exclusivos do Pro.'}),
      el('button',{type:'button',className:'plan-expand','aria-expanded':expanded,'aria-controls':`beneficios-${kind}`,onClick:()=>setExpanded(v=>!v),children:expanded?'Ocultar lista completa de bônus':isPro?'Ver todos os 20 bônus inclusos':'Ver os 20 bônus exclusivos do Pro'}),
      el(checkout?'a':'button',buttonProps),
      el('p',{className:'plan-guarantee',children:'Pagamento único · Garantia de 14 dias'})
    ]
  });
}

export function PricePlans({bonuses,bonusNames}) {
  const dialog = React.useRef(null);
  return els('section',{id:'oferta',className:'pricing-section px-4 py-20 max-w-6xl mx-auto scroll-mt-16 perf-section',children:[
    els('h2',{className:'text-3xl md:text-5xl font-black text-center',children:['Escolha seu acesso. ',el('span',{className:'gradient-text',children:'Explore sua próxima coleção.'})]}),
    el('p',{className:'mt-4 text-center text-white/70',children:'Básico: pack de 150 mil STL por 3 meses. Pro: acesso vitalício à biblioteca e todos os 20 bônus.'}),
    el('div',{className:'pricing-grid',children:['basico','pro'].map(kind=>el(PriceCard,{kind,bonuses,bonusNames,onUnavailable:()=>dialog.current?.showModal()},kind))}),
    els('dialog',{ref:dialog,className:'checkout-dialog','aria-labelledby':'checkout-message',onClick:event=>{if(event.target===dialog.current)dialog.current.close()},children:[
      el('h3',{id:'checkout-message',children:'Compra indisponível no momento'}),
      el('p',{children:'Tente novamente em breve.'}),
      el('button',{type:'button',onClick:()=>dialog.current.close(),children:'Voltar aos planos'})
    ]})
  ]});
}

export function AccessibleFaq({items}) {
  return els('section',{id:'duvidas',className:'px-4 py-20 max-w-3xl mx-auto perf-section',children:[
    els('h2',{className:'text-3xl md:text-5xl font-black text-center text-white',children:['Antes de começar, ',el('span',{className:'gradient-text',children:'tire suas dúvidas.'})]}),
    el('div',{className:'faq-list',children:items.map(item=>els('details',{className:'faq-item',children:[el('summary',{children:item.question}),el('p',{children:item.answer})]},item.id))})
  ]});
}

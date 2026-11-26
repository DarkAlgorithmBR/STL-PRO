const quote=JSON.stringify;
const text=(tag,value)=>`e.jsx(${quote(tag)},{children:${quote(value)}})`;
const cta=(label='QUERO MEU ACERVO STL')=>`e.jsx("a",{href:"#oferta",onClick:n,className:"primary-cta",children:${quote(label)}})`;
const section=(id,title,body)=>`e.jsxs("section",{id:${quote(id)},className:"cro-section perf-section",children:[${text('h2',title)},${body.join(',')}]})`;
export function optimizeCro(app){
 const edits=[
 ['Seu próximo produto','Veja o que você poderá produzir'],['pode começar aqui.','com sua impressora 3D'],
 ['Colecionáveis, peças para o setup e objetos temáticos: veja algumas das possibilidades para selecionar sua próxima impressão.','De pequenos chaveiros a colecionáveis detalhados, descubra milhares de projetos para dar vida às suas próximas impressões.'],
 ['Olhe para as peças pensando no público que você quer atender. Depois, escolha uma para testar.','Escolha uma peça e imagine sua próxima impressão.'],
 ['Uma biblioteca.','Milhares de projetos'],['Vários caminhos para o seu catálogo.','para os mais variados nichos de impressão 3D'],
 ['Explore decoração, colecionáveis, acessórios e peças temáticas. Você escolhe qual linha combina com a sua produção.','Decoração, colecionáveis, acessórios gamer, peças articuladas e miniaturas. Encontre os modelos que combinam com seus próximos projetos.'],
 ['Antes de produzir,','Descubra novas possibilidades'],['observe como as peças são apresentadas.','para o seu catálogo de impressão 3D'],
 ['As referências de marketplaces ajudam a observar fotos, usos e tipos de produto. Use esses exemplos como ponto de partida para a sua pesquisa.','Luminárias, colecionáveis, acessórios e peças decorativas são exemplos de produtos anunciados nos grandes marketplaces.'],
 ['Compare as possibilidades com o público e o preço que fazem sentido para você.','Para imprimir por hobby ou desenvolver novas linhas de produtos: pesquise, experimente e amplie suas possibilidades.'],
 ['As referências ilustram produtos e apresentações. As vendas dependem da execução, do preço, da divulgação e da demanda.','Exemplos de produtos anunciados no mercado. A comercialização depende das licenças dos modelos e das condições de produção e venda.'],
 ['Mais categorias para explorar.','E no plano Pro você ainda desbloqueia'],['Todos os 20 bônus incluídos no plano Pro.','20 coleções extras de projetos STL!'],
 ['Veja as mensagens sobre','Confira as mensagens sobre'],['a experiência com a biblioteca.','a experiência com a biblioteca.'],
 ['Encontre novas possibilidades','Esses são apenas alguns dos milhares'],['para a sua próxima impressão.','de projetos disponíveis no acervo'],
 ['Observe os formatos, os detalhes e as aplicações. Escolha um modelo, prepare no fatiador e veja como ele se encaixa no seu catálogo.','Colecionáveis, miniaturas e peças úteis: qual será sua próxima impressão?'],
 ['Explore com a garantia de','Você tem 14 dias para conhecer'],['14 dias.','o Acervo Maker STL'],
 [' para conhecer a Acervo Maker STL, explorar as categorias, baixar os arquivos e testar os modelos na sua impressora.',' para explorar as categorias, baixar os arquivos e conhecer os modelos disponíveis.'],
 ['Sua próxima peça pode começar','Sua próxima grande criação começa'],['com uma escolha hoje.','no Acervo Maker STL'],
 ['Descubra uma biblioteca de STL que amplia seu catálogo de impressão 3D, sem precisar modelar cada peça do zero.','Mais de 150 mil arquivos, milhares de possibilidades e 20 coleções extras no plano Pro. Tudo para aproveitar ainda mais sua impressora 3D.'],
 ['Pagamento único · Garantia de 14 dias','A partir de R$ 10,00 • Pagamento único • Garantia de 14 dias.'],
 ['Quero acessar a biblioteca','QUERO MEU ACERVO STL']
 ];
 for(const [a,b] of edits)app=app.replaceAll(quote(a),quote(b));
 app=app.replace('className:"rounded-2xl overflow-hidden p-4 flex gap-4 items-center transition-all duration-300 hover:scale-[1.02]"','className:`bonus-card ${[3,4,6,11,12].includes(s.id)?"bonus-featured":""}`');
 const begin=app.indexOf('children:[e.jsx(RefreshedHero,{}),')+10;
 let depth=0,q='',escaped=false,from=begin,end=-1,parts=[];
 for(let i=begin;i<app.length;i++){const c=app[i];if(q){if(escaped)escaped=false;else if(c==='\\')escaped=true;else if(c===q)q='';continue}if('"\'`'.includes(c)){q=c;continue}if('([{'.includes(c))depth++;else if(')]}'.includes(c)){if(c===']'&&depth===0){parts.push(app.slice(from,i));end=i;break}depth--}else if(c===','&&depth===0){parts.push(app.slice(from,i));from=i+1}}
 if(parts.length!==15)throw Error('Estrutura CRO inesperada');
 parts[2]=section('problema','Chega de perder mais tempo procurando arquivos do que imprimindo.',[
 text('p','Você encontra uma peça interessante, abre várias abas, salva alguns modelos e, quando percebe, ainda nem começou a imprimir.'),text('p','Com o Acervo Maker STL, você encontra mais de 150 mil arquivos reunidos em uma única biblioteca, organizados por categorias.'),text('p','Escolha o que deseja imprimir, prepare o arquivo no seu fatiador e dê vida ao seu próximo projeto.'),text('strong','Menos tempo procurando. Mais possibilidades para imprimir.'),cta()]);
 const demo=section('area','Veja o Acervo Maker STL por dentro',[
 text('p','Uma biblioteca organizada para encontrar, baixar e preparar seus próximos projetos de impressão 3D.'),
 'e.jsx("img",{src:"/assets/library-full.png",alt:"Área de membros do Acervo Maker STL com categorias e modelos disponíveis",className:"library-real",width:1817,height:935,loading:"lazy"})',
 text('p','Captura real da área de membros: categorias, modelos e opções de download.'),cta('QUERO ACESSAR A BIBLIOTECA')]);
 const steps=section('como-funciona','Do arquivo à impressão em 3 passos',[
 'e.jsx("div",{className:"cro-steps",children:'+JSON.stringify([
 ['1','Escolha seu modelo','Acesse a biblioteca e encontre o projeto que deseja imprimir.'],['2','Baixe e prepare','Abra o STL no seu fatiador e configure para sua impressora.'],['3','Dê vida ao projeto','Envie o arquivo preparado para sua impressora e comece a produzir.']])+'.map(([number,title,body])=>e.jsxs("article",{children:[e.jsx("span",{className:"step-number",children:number}),e.jsx("h3",{children:title}),e.jsx("p",{children:body})]},number))}' + ')',cta()]);
 parts[5]=parts[5].replace('children:"QUERO MEU ACERVO STL"','children:"QUERO O ACERVO COM TODOS OS BÔNUS"');
 const order=[parts[0],parts[1],parts[2],parts[3],demo,parts[4],parts[5],steps,parts[7],parts[9],parts[10],parts[11],parts[12],parts[13],parts[14]];
 return app.slice(0,begin)+order.join(',')+app.slice(end);
}

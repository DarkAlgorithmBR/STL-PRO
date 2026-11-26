# Direção visual proposta

Status: proposta registrada antes de codificar. A página atual ainda não foi alterada.

Leitura de design: página de vendas de uma biblioteca de modelos STL para donos de impressoras 3D, com linguagem técnica acessível e foco nos produtos, preservando a estrutura atual por pedido explícito e adotando grafite, âmbar e superfícies claras.

## Dials

- Variação visual: 4/10.
- Movimento: 3/10, mantendo carrosséis e respeitando movimento reduzido.
- Densidade: 5/10, mantendo a sequência comercial e quantidade de imagens.

## Antes

- Fundo preto, azul elétrico/ciano nos títulos e contornos; verde neon nos CTAs.
- Brilho externo em muitos cards, botões, imagens e textos.
- Títulos em caixa-alta e pesos muito altos; corpo com pequenas variações de tamanho.
- Cantos entre 12 e 24 px, com moldura de celular específica para depoimentos.
- Larguras de leitura e grades diferentes conforme a seção; dois planos responsivos.

## Proposta

- Fundo grafite: #17191D.
- Superfície secundária: #22262C.
- Cor de ação e destaque: âmbar #FFB547.
- Texto principal claro: #F6F7F9.
- Texto secundário: #BCC3CD.
- Card claro de destaque: #F4F5F7 com texto #181B20.
- Texto de botões âmbar: #17191D, a confirmar por cálculo de contraste.
- Bordas discretas e sombras contidas, eliminando halos neon repetidos.
- Mesmas galerias, imagens, enquadramentos e proporções. Nada de filtros que alterem os arquivos ou recortes novos.
- Harmonizar títulos e corpo, preservando leitura e quebras responsivas.

## Preservação

82 imagens WebP catalogadas com tamanho e SHA-256 em inventario-imagens-antes.json. Total: 1.273.256 bytes.

Preservar imagens de modelos, mosaico GTA, bônus, referências, depoimentos, mockup da biblioteca e selo de garantia. Preservar também favicon, salvo alteração explícita futura, pois o pedido é manter todas as imagens.

Preservar os IDs hero, produtos, problema, categorias, provas, bonus, area, depoimentos, objecao, galeria-modelos, oferta, plano-basico, plano-pro, garantia, duvidas, vturb-principal e vturb-areaMembros.

Preservar config.js, preços, ausência de checkout real e os dois encaixes de vídeo. Preservar o index.html de abertura direta e atualizar o bundle local ao implementar.

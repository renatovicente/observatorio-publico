# Observatório Público — Flávio Bolsonaro

[Português](https://obpub.org/) · [English](https://obpub.org/en/)

Public documentary archive in Portuguese and English, with sources, procedural outcomes, defense responses and an explicit editorial severity ordering.

Website estático em português e inglês, com pesquisa documental encerrada em 27/10/2026. Inclui apenas ações, investigações e pedidos de apuração dirigidos contra Flávio Bolsonaro, nas esferas criminal, eleitoral, cível e parlamentar. Casos encerrados permanecem com seus desfechos documentados. Ações propostas por ele e menções contextuais ficam fora do acervo. O acervo não é uma certidão judicial nem promete exaustividade. A versão inglesa traduz a mesma edição; sua criação não representa uma nova pesquisa factual.

## Executar

```sh
node build-data.mjs
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Abra http://127.0.0.1:4173 para português e http://127.0.0.1:4173/en/ para inglês. Não há dependências de build. O seletor PT/EN mantém a âncora da página; links de fichas usam o mesmo ID nos dois idiomas.

## Manutenção

O método de atualização está em [`skills/atualizar-observatorio-flavio/SKILL.md`](skills/atualizar-observatorio-flavio/SKILL.md), com os mesmos critérios para execuções locais e na nuvem.

Edite `build-data.mjs` e as traduções correspondentes em `translations/en.mjs`. Cada ficha contém papel da pessoa, situação, data da última informação localizada, resumo, histórico, posição da defesa, limitações e fontes com links. A contagem de fichas não é contagem de crimes ou de processos independentes.

`node build-data.mjs` gera `dist/data.json` e chama `build-locales.mjs` para gerar `dist/data.en.json`. O segundo gerador conserva IDs, datas, números processuais e URLs; só os campos editoriais são traduzidos. Nomes de fontes e identificadores processuais continuam no idioma original. Cada ficha traduzida tem o hash SHA-256 do seu registro português revisado em `translations/en-source-hashes.json`. Se o original mudar, o build bloqueia a versão inglesa até sua revisão. Depois de revisar a tradução, atualize somente o hash da ficha correspondente, calculado com `createHash('sha256').update(JSON.stringify(record)).digest('hex')` sobre o registro em `dist/data.json`, e execute o build novamente. Não atualize hashes em lote para contornar traduções desatualizadas. Novas fichas exigem tradução e hash; remoções exigem retirada nos dois arquivos.

A interface está em `dist/index.html` e `dist/en/index.html`; mantenha datas editoriais e textos equivalentes nos dois arquivos. `dist/app.js` compartilha comportamento e traduz rótulos, mensagens, datas e metadados de exportação conforme o idioma do documento. Os rótulos das fontes são traduzidos, mas os documentos externos permanecem no idioma original. O tema Noite e cobre é compartilhado em `dist/styles.css`.

O GitHub Pages publica somente os arquivos de `dist/`. O acervo não realiza pesquisa automática, coleta de dados pessoais ou chamadas a serviços externos em tempo de execução.

## Ordenação editorial por gravidade

A lista de casos abre por gravidade potencial, em ordem decrescente. `dist/severity.mjs` define cinco faixas, suas justificativas em português e inglês e a classificação de cada ID: recursos públicos/crimes financeiros; integridade institucional/eleitoral; informação/honra/transparência; direitos e obrigações civis; comparecimento a ato processual. Essa avaliação editorial usa o objeto descrito na ficha, não estima pena, culpabilidade ou chance de condenação. Pedidos com fatos pouco individualizados não recebem automaticamente a gravidade de imputações feitas a terceiros. Arquivamentos e decisões favoráveis continuam expostos.

Casos na mesma faixa empatam em gravidade e aparecem pela data do último registro, do mais recente ao mais antigo; o ID resolve datas iguais. A faixa e sua justificativa estão na interface. Novas fichas exigem classificação bilíngue nesse módulo; a validação bloqueia IDs sem classificação ou classificações sem ficha. Os dados factuais e seus hashes de tradução continuam independentes dessa ordem editorial.

O usuário pode escolher outras ordens na lista de casos. Linha do tempo e biblioteca de fontes têm ordenação cronológica própria; o site preserva a preferência de cada visualização durante a sessão. A exportação inclui a ordem editorial por gravidade e sua justificativa, junto dos registros completos.

## Verificação

`node validate.mjs` verifica estrutura, links, identificadores, datas e conteúdo mínimo das fichas, além da paridade entre português e inglês. Execute também `node --check dist/app.js`. A interface oferece busca sem distinção de acentos, filtros de natureza/situação, ordenação, linha do tempo, biblioteca de fontes, links diretos, exportação JSON e impressão de fichas nos dois idiomas.

## Atualização semanal

Uma tarefa no ChatGPT Cloud está programada para segundas-feiras às 9h no fuso `America/Sao_Paulo`, a partir de 02/11/2026, usando a skill deste repositório e a conexão GitHub. Ela pesquisa e valida mudanças antes de publicá-las nas duas versões. O agendamento não altera as datas dos fatos nem garante novas informações em toda execução.

## Publicação no GitHub Pages

O workflow `.github/workflows/pages.yml` gera e valida os dados em português e inglês, confere a classificação editorial e publica `dist/` a cada atualização de `main`. Também pode ser executado manualmente em Actions. A publicação depende de todas as validações passarem; traduções desatualizadas bloqueiam o build.

Nas configurações do repositório, a origem de Pages é **GitHub Actions**. Os links e recursos usam caminhos relativos para funcionar na raiz de `obpub.org`, na subpágina `/en/` e no endereço anterior do GitHub Pages. Este repositório contém o código e os dados necessários ao site público; os documentos externos continuam nos sites de origem.

## Domínio próprio

O domínio canônico é `obpub.org`, configurado em Settings → Pages. O DNS permanece na Hostinger, com quatro registros A em `@` (`185.199.108.153`, `185.199.109.153`, `185.199.110.153` e `185.199.111.153`) e um CNAME em `www` para `renatovicente.github.io`. A configuração de domínio fica no GitHub Pages; com publicação por Actions, um arquivo `CNAME` não é necessário.

Preserve o domínio e a proteção HTTPS nas atualizações de conteúdo. A automação semanal carrega a skill deste repositório; links antigos de `renatovicente.github.io/observatorio-publico/` devem acompanhar o redirecionamento para o domínio próprio.

# Observatório Público — Flávio Bolsonaro e Lula

[Português](https://obpub.org/) · [English](https://obpub.org/en/)

Public documentary archive in Portuguese and English, with sources, procedural outcomes, defense responses and an explicit editorial severity ordering.

Website estático em português e inglês, com pesquisa documental encerrada em 27/10/2026. Possui duas abas independentes. A de Flávio Bolsonaro reúne ações, investigações e pedidos de apuração dirigidos contra ele. A de Lula reúne somente processos e investigações efetivamente instaurados contra Luiz Inácio Lula da Silva, excluindo casos de parentes, aliados e simples pedidos sem instauração confirmada. Casos encerrados ficam preservados nas fontes de manutenção e não são exibidos no site. Ações propostas pelas próprias pessoas e menções contextuais ficam fora dos respectivos acervos. O acervo não é uma certidão judicial nem promete exaustividade. A versão inglesa traduz a mesma edição; sua criação não representa uma nova pesquisa factual.

## Executar

```sh
node build-data.mjs
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Abra http://127.0.0.1:4173 para português e http://127.0.0.1:4173/en/ para inglês. Não há dependências de build. A aba de Lula usa `?pessoa=lula`; Flávio é a aba padrão. O seletor PT/EN mantém a pessoa selecionada e a âncora da página; links de fichas usam o mesmo ID nos dois idiomas.

## Manutenção

O método de atualização está em [`skills/atualizar-observatorio-flavio/SKILL.md`](skills/atualizar-observatorio-flavio/SKILL.md), com os mesmos critérios para execuções locais e na nuvem.

Para Flávio, edite `build-data.mjs` e `translations/en.mjs`. Para Lula, edite `records/lula.mjs` e `translations/lula.en.mjs`. Cada ficha contém papel da pessoa, situação, data da última informação localizada, resumo, histórico, posição da defesa, limitações e fontes com links. A contagem de fichas não é contagem de crimes ou de processos independentes.

`node build-data.mjs` gera os pares `dist/data.json` / `dist/data.en.json` (Flávio) e `dist/data.lula.json` / `dist/data.lula.en.json` (Lula), chamando `build-locales.mjs` para as traduções. O segundo gerador conserva IDs, datas, números processuais e URLs; só os campos editoriais são traduzidos. Nomes de fontes e identificadores processuais continuam no idioma original. Cada ficha traduzida tem o hash SHA-256 do seu registro português revisado em `translations/en-source-hashes.json` ou `translations/lula-en-source-hashes.json`, conforme a pessoa. Se o original mudar, o build bloqueia a versão inglesa até sua revisão. Depois de revisar a tradução, atualize somente o hash da ficha correspondente, calculado com `createHash('sha256').update(JSON.stringify(record)).digest('hex')` sobre o registro no JSON português da pessoa, e execute o build novamente. Não atualize hashes em lote para contornar traduções desatualizadas. Novas fichas exigem tradução e hash; remoções exigem retirada nos dois arquivos.

Busca, contagens, fontes, cronologia e exportação usam apenas a pessoa selecionada. Ao mudar de aba, os filtros são limpos e a lista volta à ordem por gravidade.

A interface está em `dist/index.html` e `dist/en/index.html`; mantenha datas editoriais e textos equivalentes nos dois arquivos. `dist/dossiers.mjs` define nomes, arquivos, escopos, data de pesquisa por pessoa e rotas. `dist/app.js` compartilha comportamento e traduz rótulos, mensagens, datas e metadados de exportação conforme o idioma do documento. Os rótulos das fontes são traduzidos, mas os documentos externos permanecem no idioma original. O tema Noite e cobre é compartilhado em `dist/styles.css`.

O GitHub Pages publica somente os arquivos de `dist/`. O acervo não realiza pesquisa automática, coleta de dados pessoais ou chamadas a serviços externos em tempo de execução.

## Ordenação editorial por gravidade

A lista de casos abre por gravidade potencial, em ordem decrescente. `dist/severity.mjs` define cinco faixas, suas justificativas em português e inglês e a classificação de cada ID: recursos públicos/crimes financeiros; integridade institucional/eleitoral; informação/honra/transparência; direitos e obrigações civis; comparecimento a ato processual. Essa avaliação editorial usa o objeto descrito na ficha, não estima pena, culpabilidade ou chance de condenação. Pedidos com fatos pouco individualizados não recebem automaticamente a gravidade de imputações feitas a terceiros. Arquivamentos e decisões favoráveis são preservados nas fontes de manutenção e retirados da exibição.

Casos na mesma faixa empatam em gravidade e aparecem pela data do último registro, do mais recente ao mais antigo; o ID resolve datas iguais. A faixa e sua justificativa estão na interface. As justificativas de Lula ficam em `dist/lula-severity.mjs`, importado pelo módulo comum. Novas fichas exigem classificação bilíngue; a validação bloqueia IDs sem classificação ou classificações sem ficha nas fontes de manutenção. Os dados factuais e seus hashes de tradução continuam independentes dessa ordem editorial.

O usuário pode escolher outras ordens na lista de casos. Linha do tempo e biblioteca de fontes têm ordenação cronológica própria; o site preserva a preferência de cada visualização durante a sessão. A exportação inclui a ordem editorial por gravidade e sua justificativa, junto dos registros completos.

## Recorte visível, cores e contagens

O site exibe **somente casos em andamento, investigações e condenações/sanções sem encerramento documentado na última informação localizada**. Encerrados, arquivados, trancados, anulados, prescritos, absolvidos, julgados improcedentes e pedidos sem instauração confirmada ficam fora da interface, busca, cronologia, biblioteca e exportação. Preserve os históricos nas fontes editáveis para auditoria e futuras verificações; não os reintroduza visualmente sem nova evidência de reabertura.

`dist/case-status.mjs` define `caseDisposition` e `countedCases`, que aplica o recorte pessoal antes de qualquer visualização. Há exceção por ID para a condenação de Chico Buarque reformada em recurso, ainda classificada genericamente como `decisao`. Mudanças no desfecho exigem revisar a elegibilidade. A validação bloqueia texto de exceção desatualizado. Não interprete a ausência de notícia posterior como confirmação do trânsito ou de andamento atual: mantenha as limitações visíveis.

As cores refletem **gravidade editorial**, não resultado processual: maior intensidade/saturação de vermelho para faixas mais graves, tons mais suaves para as demais. Os cinco tons estão em `dist/styles.css` e são usados nos cartões, etiquetas e contadores. O total por pessoa e os totais por faixa abrangem exatamente as fichas visíveis. Sua soma deve coincidir; fontes e números de processos não são contagem de crimes. A exportação usa o mesmo recorte e mantém os metadados da faixa. O seletor PT/EN deve preservar pessoa e ficha.


## Verificação

`node validate.mjs` verifica estrutura, links, identificadores, datas e conteúdo mínimo das fichas, além da paridade entre português e inglês. Execute também `node --check dist/app.js` e `node --test tests/*.test.mjs` (links antigos, troca de pessoa, idioma e parâmetros). A interface oferece busca sem distinção de acentos, filtros de natureza/situação, ordenação, linha do tempo, biblioteca de fontes, links diretos, exportação JSON e impressão de fichas nos dois idiomas.

A skill contém uma tabela de transições processuais: aberturas e avanços atualizam a ficha; encerramentos a retiram de todas as visualizações; reaberturas só reincluem mediante deferimento confirmado. Gravidade e fase processual são avaliadas separadamente.

## Atualização semanal

Uma tarefa no ChatGPT Cloud está programada para segundas-feiras às 9h no fuso `America/Sao_Paulo`, a partir de 02/11/2026, usando a skill deste repositório e a conexão GitHub. O prompt original dessa tarefa cobre Flávio Bolsonaro. A inclusão da aba de Lula não comprova que o prompt hospedado tenha sido ampliado; até sua alteração explícita, trate a atualização de Lula como sob demanda. A skill suporta ambos os dossiês e mantém as duas versões linguísticas em cada execução. O agendamento não altera as datas dos fatos nem garante novas informações em toda execução.

## Publicação no GitHub Pages

O workflow `.github/workflows/pages.yml` gera e valida os dados em português e inglês, confere a classificação editorial e publica `dist/` a cada atualização de `main`. Também pode ser executado manualmente em Actions. A publicação depende de todas as validações passarem; traduções desatualizadas bloqueiam o build.

Nas configurações do repositório, a origem de Pages é **GitHub Actions**. Os links e recursos usam caminhos relativos para funcionar na raiz de `obpub.org`, na subpágina `/en/` e no endereço anterior do GitHub Pages. Este repositório contém o código e os dados necessários ao site público; os documentos externos continuam nos sites de origem.

## Domínio próprio

O domínio canônico é `obpub.org`, configurado em Settings → Pages. O DNS permanece na Hostinger, com quatro registros A em `@` (`185.199.108.153`, `185.199.109.153`, `185.199.110.153` e `185.199.111.153`) e um CNAME em `www` para `renatovicente.github.io`. A configuração de domínio fica no GitHub Pages; com publicação por Actions, um arquivo `CNAME` não é necessário.

Preserve o domínio e a proteção HTTPS nas atualizações de conteúdo. A automação semanal carrega a skill deste repositório; links antigos de `renatovicente.github.io/observatorio-publico/` devem acompanhar o redirecionamento para o domínio próprio.

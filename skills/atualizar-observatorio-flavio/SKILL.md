---
name: atualizar-observatorio-flavio
description: Atualizar o Observatório Público sobre Flávio Bolsonaro com pesquisa documental, versões equivalentes em português e inglês, ordenação editorial por gravidade e publicação no GitHub Pages. Use para manter ou corrigir este acervo específico; não para monitoramento automático sem pedido do usuário.
---

# Atualizar o Observatório Público

Atualize o acervo documental em português e inglês de ações, investigações e pedidos de apuração dirigidos contra Flávio Bolsonaro. Mantenha as duas versões equivalentes e a ordem padrão da maior para a menor gravidade potencial. Preserve a distinção entre alegação, investigação, decisão e situação processual. A skill define o método de atualização. Pode ser executada sob demanda ou por uma automação autorizada; sua execução, por si só, não cria agendamento.

## Recorte solicitado pelo usuário

Inclua somente procedimentos em que Flávio seja investigado, denunciado, réu, representado ou alvo direto de pedido de apuração. Exclua fichas de ações propostas por ele, de medidas em seu favor e de investigações de terceiros em que seja apenas citado, beneficiário alegado ou testemunha. Uma representação contra ele por fato próprio pode entrar, mesmo se tiver sido testemunha no procedimento de origem.

Preserve casos arquivados e decisões favoráveis ou reformadas dentro dos procedimentos contra ele. Se uma ficha misturar ação contra Flávio com ação proposta por ele, mantenha apenas a primeira e não transfira o desfecho de um processo para o outro. Menções contextuais podem explicar uma ficha elegível, mas não justificam ficha própria. Uma mudança futura de vínculo exige nova evidência; não reintroduza registros excluídos apenas por já terem existido no acervo.

## Identificar o projeto

- Repositório canônico: `https://github.com/renatovicente/observatorio-publico`, branch `main`.
- Site público: `https://renatovicente.github.io/observatorio-publico/`.
- Inglês: `https://renatovicente.github.io/observatorio-publico/en/`.
- Skill portátil: `skills/atualizar-observatorio-flavio/` no mesmo repositório, incluindo referências e script de inspeção.
- Fontes editáveis: `build-data.mjs`, `translations/en.mjs` e `dist/severity.mjs`; os dois JSONs de fichas são gerados.

Leia o `README.md`, o gerador e o estado do Git. Use um checkout atualizado do repositório canônico, inclusive em ambiente temporário na nuvem. Não dependa de caminhos, arquivos ou credenciais do computador do usuário. Se a skill não estiver instalada, leia sua versão em `main` pelo conector GitHub ou pelo repositório público, com os recursos relativos necessários.

O destino padrão é o GitHub Pages acima. A cópia anterior no Sites só deve ser atualizada quando também for solicitada; nesse caso, leia `.openai/hosting.json` no checkout específico e confirme a identidade com `get_site`. Um vínculo de agendamento com o Site anterior não muda o destino explícito do prompt. Não crie um novo Site nem altere sua audiência para recuperar acesso.

Use `scripts/inspect_site.py <checkout>` desta skill para inventariar as duas versões, referências, datas editoriais, cobertura de hashes e arquivos de gravidade. Ele só lê arquivos: não executa os módulos nem confirma traduções, hashes ou critérios. Leia [references/data-model.md](references/data-model.md) ao editar fichas, traduções, datas ou classificação.

## Pesquisar mudanças

Para uma atualização geral, parta do acervo existente e da data da edição. Verifique os registros em tramitação, pedidos e fichas com desfecho desconhecido; procure também novos casos e mudanças em decisões anteriores. Para correção ou atualização de caso específico, limite a pesquisa ao pedido.

Se o pedido tratar apenas de tradução, apresentação ou ordenação, trabalhe sobre os fatos já documentados. Não anuncie nova pesquisa factual nem avance a data do levantamento por causa dessa edição.

Pesquise a web e abra as fontes relevantes. Priorize decisões, andamento processual e documentos de STF, STJ, TSE, TREs, TJs, Ministério Público e Senado. Use jornalismo identificado para complementar documentos indisponíveis ou sigilosos. Agregadores servem como pistas; verifique a origem antes de incorporá-la. Diferencie data do fato, da decisão e da publicação. Atualização técnica de uma página não é nova movimentação judicial.

Para cada mudança candidata, determine:

- Qual procedimento e qual vínculo pessoal foram documentados: investigado, denunciado, réu, testemunha, autor, beneficiário ou apenas citado.
- Qual ato efetivamente ocorreu e quando: requerimento, abertura, recebimento de denúncia, decisão, recurso, arquivamento ou trânsito em julgado.
- Qual fonte sustenta cada alegação e qual resposta da defesa foi encontrada. Se não houver resposta localizada, registre essa limitação sem inferir concordância.

Preserve resultados favoráveis e desfavoráveis. Arquivamento, absolvição, rejeição da denúncia, prescrição e nulidade de provas têm fundamentos diferentes. Multa eleitoral ou indenização cível não é condenação criminal. Petição no Conselho de Ética não equivale a procedimento admitido. Pedido de reabertura ou de prorrogação não comprova deferimento.

Não transfira a Flávio investigações de parentes, assessores ou parceiros. Não converta relação contextual em investigação nominal sem suporte. Os casos Dark Horse, Willer Tomaz, financiamento imobiliário BRB e Abin têm vínculos distintos; confira cada um. Registros existentes são pontos de partida, não fatos imutáveis. Não conclua que um processo terminou porque a busca deixou de encontrá-lo.

## Atualizar conteúdo e datas

Edite `build-data.mjs` e a tradução correspondente em `translations/en.mjs`. Preserve `id` de fichas existentes: ele sustenta os links `#caso=...` nos dois idiomas. Acrescente casos independentes sem duplicar o mesmo fato sob nomes diferentes; mantenha distinções necessárias entre procedimentos. Não remova históricos para esconder reformas de decisões: acrescente o novo marco e reescreva resumo e situação atual.

Mantenha textos sintéticos e originais, com links diretos para as fontes. O mesmo link pode servir a várias fichas; contagens de fichas não representam quantidade de crimes. Não invente números processuais, datas, trânsito em julgado ou defesa. Use os campos de limitação para incertezas reais, especialmente quando a evidência for apenas reportagem.

`updated` é a data do último registro substantivo localizado para a ficha; não avance todas as fichas para a data da consulta. Uma notícia posterior pode documentar decisão anterior: a data do evento continua sendo a da decisão.

A edição inicial tem datas fixas em `dist/index.html`, `dist/en/index.html`, `dist/app.js`, `validate.mjs` e `README.md`. Atualize metadados de pesquisa de forma coerente e seletiva nos dois idiomas, sem substituir datas históricas em massa. Use a data efetiva da pesquisa no fuso `America/Sao_Paulo`. Se a revisão cobrir só parte do acervo, identifique-a como parcial nas duas versões; não anuncie revisão integral. Se não houver mudança sustentada, relate a verificação e preserve a data dos fatos; só publique se houver alteração real de conteúdo ou de metadados justificados.

## Manter português e inglês equivalentes

Traduza título, resumo, situação, papel, detalhes, defesa, limitações, eventos, rótulos e notas das fontes. Preserve URLs, nomes dos publicadores, datas, IDs e números processuais; documentos externos continuam no idioma original. Não converta denúncia rejeitada em condenação, petição em procedimento admitido ou sanção cível/eleitoral em condenação criminal.

`node build-data.mjs` gera `dist/data.json` e chama `build-locales.mjs`, que gera `dist/data.en.json`. Não edite os JSONs gerados como fonte de manutenção. Quando o original mudar, revise a tradução e atualize **somente os hashes dos registros revisados** em `translations/en-source-hashes.json`, conforme o fluxo da referência. Não regenere todos os hashes para silenciar uma divergência. Se apenas a tradução mudar, o hash do original permanece igual.

Toda inclusão ou remoção deve manter o mesmo conjunto de IDs no original, nas traduções, nos hashes e na classificação de gravidade. Eventos e fontes traduzidos precisam corresponder aos originais na mesma ordem. Não publique uma versão atualizada com a outra desatualizada.

Mantenha o seletor PT/EN, os links da mesma ficha entre idiomas e a paleta Noite e cobre. Ao alterar a interface, atualize os dois HTMLs e os textos compartilhados em `dist/app.js`, incluindo busca, filtros, situações vazias/erros, cronologia, fontes, exportação e impressão.

## Manter a ordenação por gravidade

`dist/severity.mjs` guarda cinco faixas editoriais e uma justificativa em português e inglês por ficha. Preserve a ordem decrescente: recursos públicos/crimes financeiros; integridade institucional/eleitoral; informação/honra/transparência; obrigações/direitos civis; comparecimento a ato processual.

Classifique pelo impacto potencial do objeto explicitamente descrito na ficha. A faixa não é escala legal, estimativa de pena, chance de condenação ou conclusão de culpa. Não atribua crimes de terceiros a pedidos vagos nem classifique compra em espécie como prova de crime. Arquivamento ou condenação, por si só, não altera o objeto: preserve o desfecho visível e só reveja a faixa quando houver razão substantiva sustentada ou novo critério solicitado pelo usuário.

Dentro da faixa há empate em gravidade; desempate pela data do último registro, da mais recente para a mais antiga, e depois pelo ID. A ordem deve ser idêntica nos dois idiomas. A lista de casos abre por gravidade; as alternativas de ordenação permanecem disponíveis. Linha do tempo e biblioteca de fontes conservam ordenação cronológica própria. Mantenha os critérios na interface, a justificativa na ficha e os metadados de gravidade na exportação.

Revise a classificação de fichas novas ou cujo objeto mudou; mantenha justificativas bilíngues específicas. A classificação fica separada dos dados factuais: uma edição apenas de gravidade não exige mudar datas dos fatos nem hashes das traduções.

## Validar e publicar

Execute no checkout:

```sh
node build-data.mjs
node validate.mjs
node --check dist/app.js
node --check dist/severity.mjs
node --check translations/en.mjs
```

O build bloqueia traduções cujo original mudou. O validador confere paridade entre idiomas, referências, cronologia, cobertura de gravidade e desempates. Também contém limite inicial de data (`2026-10-27`) e expectativas históricas de situações e posições. Quando novas evidências ou inclusões alterarem essas expectativas, ajuste-as ao estado revisado, nos dois idiomas. Preserve as verificações estruturais; não descarte um fato verificado apenas para satisfazer uma asserção histórica, nem remova checagens indiscriminadamente para obter sucesso.

Inspecione o diff e confira fontes, papéis, situações, cronologia, datas, traduções e justificativas alteradas. Validação sintática não confirma fatos nem equivalência semântica. Para mudanças de interface ou ordenação, confira nos dois idiomas: ordem padrão decrescente, filtros, retorno de outras visualizações, alternativas de ordem, critérios, troca de idioma na mesma ficha e apresentação responsiva, em uma prévia local ou no site publicado, conforme os recursos do ambiente. Preserve arquivamentos e decisões favoráveis na revisão visual. Para ajustes apenas editoriais, uma checagem direcionada às fichas modificadas nos dois idiomas basta. Não apresente verificações não executadas como aprovadas.

Para publicar no GitHub Pages, leia [references/github-publication.md](references/github-publication.md). Envie uma revisão completa e coerente para `renatovicente/observatorio-publico`, em `main`, e confirme o resultado do workflow de Pages correspondente ao commit. A atualização do conteúdo e sua publicação estão autorizadas quando a tarefa solicitar manutenção do site, inclusive no agendamento; respeite pedidos de rascunho ou revisão. Não publique traduções incompletas ou mudanças sem fontes.

Se uma atualização do Site anterior também tiver sido solicitada, leia `sites:sites`, confirme identidade e audiência com `get_site` e siga o fluxo de site existente. Preserve credenciais apenas em memória/stdin e confirme a implantação terminal; não trate o sucesso de um destino como prova de publicação no outro. Em falha, mantenha o trabalho e os identificadores da operação para retomada, sem criar duplicatas.

Ao terminar, informe as URLs das duas versões, quantidade de fichas novas/alteradas, principais mudanças sustentadas, paridade dos idiomas, eventuais mudanças de faixa, data e alcance da revisão, validação realizada e lacunas. Se nenhuma mudança factual tiver sido comprovada, diga isso diretamente.

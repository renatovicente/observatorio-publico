---
name: atualizar-observatorio-flavio
description: Atualizar o Observatório Público sobre Flávio Bolsonaro e Lula, em abas separadas, com pesquisa documental, versões equivalentes em português e inglês, ordenação editorial por gravidade e publicação no GitHub Pages. Use para manter ou corrigir este acervo específico; não para monitoramento automático sem pedido do usuário.
---

# Atualizar o Observatório Público

Atualize os dossiês documentais em português e inglês de Flávio Bolsonaro e de Luiz Inácio Lula da Silva (Lula), em abas separadas. Mantenha as duas versões equivalentes e a ordem padrão da maior para a menor gravidade potencial. Preserve a distinção entre alegação, investigação, decisão e situação processual. A skill define o método de atualização. Pode ser executada sob demanda ou por uma automação autorizada; sua execução, por si só, não cria agendamento.

## Recorte solicitado pelo usuário

**Flávio Bolsonaro:** inclua somente procedimentos em que Flávio seja investigado, denunciado, réu, representado ou alvo direto de pedido de apuração. Exclua fichas de ações propostas por ele, de medidas em seu favor e de investigações de terceiros em que seja apenas citado, beneficiário alegado ou testemunha. Uma representação contra ele por fato próprio pode entrar, mesmo se tiver sido testemunha no procedimento de origem.

Preserve casos arquivados e decisões favoráveis ou reformadas nas fontes de manutenção, retirando-os do recorte visível. Se uma ficha misturar ação contra Flávio com ação proposta por ele, mantenha apenas a primeira e não transfira o desfecho de um processo para o outro. Menções contextuais podem explicar uma ficha elegível, mas não justificam ficha própria. Uma mudança futura de vínculo exige nova evidência; não reintroduza registros excluídos apenas por já terem existido no acervo.

**Lula:** inclua somente processos e investigações efetivamente instaurados contra o próprio Luiz Inácio Lula da Silva. Exclua parentes, aliados, pessoas jurídicas sem vínculo processual pessoal comprovado, simples menções e pedidos sem instauração confirmada. Uma denúncia rejeitada pode integrar ficha de investigação formal anterior, desde que esse vínculo seja comprovado. O usuário pediu exibição restrita a casos abertos ou com condenação/sanção sem encerramento documentado. Preserve históricos encerrados e seus fundamentos nas fontes editáveis, sem exibi-los ou contá-los.

Nunca transfira fatos ou desfechos entre pessoas ou entre procedimentos. A troca de aba deve separar fichas, contagens, filtros, cronologia, fontes e download. Preserve o filtro pessoal nos links PT/EN e nos links diretos. IDs novos de Lula começam por `lula-`; IDs existentes de Flávio não mudam.

Uma atualização geral sem pessoa especificada cobre os dois dossiês. Uma execução ou agendamento cujo prompt nomeia somente Flávio continua limitada a Flávio; a presença de Lula no site não amplia automaticamente o agendamento. Não anuncie cobertura semanal de Lula sem verificar ou atualizar o prompt hospedado com autorização.

## Identificar o projeto

- Repositório canônico: `https://github.com/renatovicente/observatorio-publico`, branch `main`.
- Site público: `https://obpub.org/`.
- Inglês: `https://obpub.org/en/`.
- Skill portátil: `skills/atualizar-observatorio-flavio/` no mesmo repositório, incluindo referências e script de inspeção.
- Flávio: `build-data.mjs`, `translations/en.mjs` e justificativas em `dist/severity.mjs`.
- Lula: `records/lula.mjs`, `translations/lula.en.mjs` e `dist/lula-severity.mjs`.
- Os quatro JSONs de fichas são gerados. `dist/dossiers.mjs` define arquivos, nomes, escopos e datas de pesquisa por pessoa; a aba de Lula usa `?pessoa=lula`.

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

Não transfira a nenhuma das pessoas investigações de parentes, assessores ou parceiros. Não converta relação contextual em investigação nominal sem suporte. Os casos Dark Horse, Willer Tomaz, financiamento imobiliário BRB e Abin têm vínculos distintos; confira cada um. Registros existentes são pontos de partida, não fatos imutáveis. Não conclua que um processo terminou porque a busca deixou de encontrá-lo.

## Atualizar conteúdo e datas

Edite as fontes correspondentes à pessoa: `build-data.mjs` / `translations/en.mjs` para Flávio; `records/lula.mjs` / `translations/lula.en.mjs` para Lula. Preserve `id` de fichas existentes: ele sustenta os links `#caso=...` nos dois idiomas. Acrescente casos independentes sem duplicar o mesmo fato sob nomes diferentes; mantenha distinções necessárias entre procedimentos. Não remova históricos para esconder reformas de decisões: acrescente o novo marco e reescreva resumo e situação atual.

Mantenha textos sintéticos e originais, com links diretos para as fontes. O mesmo link pode servir a várias fichas; contagens de fichas não representam quantidade de crimes. Não invente números processuais, datas, trânsito em julgado ou defesa. Use os campos de limitação para incertezas reais, especialmente quando a evidência for apenas reportagem.

`updated` é a data do último registro substantivo localizado para a ficha; não avance todas as fichas para a data da consulta. Uma notícia posterior pode documentar decisão anterior: a data do evento continua sendo a da decisão.

A edição inicial tem datas fixas em `dist/index.html`, `dist/en/index.html`, `dist/dossiers.mjs`, `validate.mjs` e `README.md`. Atualize metadados de pesquisa de forma coerente e seletiva nos dois idiomas, sem substituir datas históricas em massa. Use a data efetiva da pesquisa no fuso `America/Sao_Paulo`. Se a revisão cobrir só parte do acervo, identifique-a como parcial nas duas versões; não anuncie revisão integral. Se não houver mudança sustentada, relate a verificação e preserve a data dos fatos; só publique se houver alteração real de conteúdo ou de metadados justificados.

## Manter português e inglês equivalentes

Traduza título, resumo, situação, papel, detalhes, defesa, limitações, eventos, rótulos e notas das fontes. Preserve URLs, nomes dos publicadores, datas, IDs e números processuais; documentos externos continuam no idioma original. Não converta denúncia rejeitada em condenação, petição em procedimento admitido ou sanção cível/eleitoral em condenação criminal.

`node build-data.mjs` gera os dados portugueses e chama `build-locales.mjs`: Flávio usa `dist/data.json` / `dist/data.en.json`; Lula usa `dist/data.lula.json` / `dist/data.lula.en.json`. Não edite os JSONs gerados como fonte de manutenção. Quando o original mudar, revise a tradução e atualize **somente os hashes dos registros revisados** em `translations/en-source-hashes.json` (Flávio) ou `translations/lula-en-source-hashes.json` (Lula), conforme o fluxo da referência. Não regenere todos os hashes para silenciar uma divergência. Se apenas a tradução mudar, o hash do original permanece igual.

Toda inclusão ou remoção deve manter o mesmo conjunto de IDs no original, nas traduções, nos hashes e na classificação de gravidade. Eventos e fontes traduzidos precisam corresponder aos originais na mesma ordem. Não publique uma versão atualizada com a outra desatualizada.

Mantenha o seletor PT/EN, os links da mesma ficha entre idiomas e a paleta Noite e cobre. Ao alterar a interface, atualize os dois HTMLs e os textos compartilhados em `dist/app.js`, incluindo busca, filtros, situações vazias/erros, cronologia, fontes, exportação e impressão.

## Manter a ordenação por gravidade

`dist/severity.mjs` guarda cinco faixas editoriais, as justificativas de Flávio e importa as de Lula de `dist/lula-severity.mjs`. Cada ficha tem justificativa em português e inglês. Preserve a ordem decrescente: recursos públicos/crimes financeiros; integridade institucional/eleitoral; informação/honra/transparência; obrigações/direitos civis; comparecimento a ato processual.

Classifique pelo impacto potencial do objeto explicitamente descrito na ficha. A faixa não é escala legal, estimativa de pena, chance de condenação ou conclusão de culpa. Não atribua crimes de terceiros a pedidos vagos nem classifique compra em espécie como prova de crime. Arquivamento ou condenação, por si só, não altera o objeto: preserve o desfecho documentado e aplique o recorte visível e só reveja a faixa quando houver razão substantiva sustentada ou novo critério solicitado pelo usuário.

Dentro da faixa há empate em gravidade; desempate pela data do último registro, da mais recente para a mais antiga, e depois pelo ID. A ordem deve ser idêntica nos dois idiomas. A lista de casos abre por gravidade; as alternativas de ordenação permanecem disponíveis. Linha do tempo e biblioteca de fontes conservam ordenação cronológica própria. Mantenha os critérios na interface, a justificativa na ficha e os metadados de gravidade na exportação.

Revise a classificação de fichas novas ou cujo objeto mudou; mantenha justificativas bilíngues específicas. A classificação fica separada dos dados factuais: uma edição apenas de gravidade não exige mudar datas dos fatos nem hashes das traduções.

## Recorte visível, cores e contagens

O site exibe **somente casos em andamento, investigações e condenações/sanções sem encerramento documentado na última informação localizada**. Encerrados, arquivados, trancados, anulados, prescritos, absolvidos, julgados improcedentes e pedidos sem instauração confirmada ficam fora da interface, busca, cronologia, biblioteca e exportação. Preserve os históricos nas fontes editáveis para auditoria e futuras verificações; não os reintroduza visualmente sem nova evidência de reabertura.

`dist/case-status.mjs` define `caseDisposition` e `countedCases`, que aplica o recorte pessoal antes de qualquer visualização. Há exceção por ID para a condenação de Chico Buarque reformada em recurso, ainda classificada genericamente como `decisao`. Mudanças no desfecho exigem revisar a elegibilidade. A validação bloqueia texto de exceção desatualizado. Não interprete a ausência de notícia posterior como confirmação do trânsito ou de andamento atual: mantenha as limitações visíveis.

As cores refletem **gravidade editorial**, não resultado processual: maior intensidade/saturação de vermelho para faixas mais graves, tons mais suaves para as demais. Os cinco tons estão em `dist/styles.css` e são usados nos cartões, etiquetas e contadores. O total por pessoa e os totais por faixa abrangem exatamente as fichas visíveis. Sua soma deve coincidir; fontes e números de processos não são contagem de crimes. A exportação usa o mesmo recorte e mantém os metadados da faixa. O seletor PT/EN deve preservar pessoa e ficha.


## Reclassificar a cada execução semanal

A cada execução autorizada, aplique os critérios atuais desta skill, inclusive o recorte visível e as cores por gravidade. Uma ficha não mantém sua visibilidade apenas porque apareceu na edição anterior. Respeite o alcance do prompt do agendamento: esta skill não altera sozinha quais pessoas estão incluídas nele.

1. Pesquise novos andamentos dos registros visíveis e confirme a data e o alcance pessoal da decisão. Procure também novos procedimentos elegíveis e reaberturas formalmente deferidas de históricos; pedido de reabertura não basta.
2. Compare o que aconteceu com a situação anterior. Atualize `status`, `role`, `state`, `summary`, `details`, `defense`, `limit`, eventos e fontes quando houver mudança sustentada. Use a data da movimentação/publicação substantiva em `updated`, não a data da execução em todas as fichas.
3. Aplique a tabela abaixo. Decisão parcial, liminar, recurso e decisão final são coisas distintas. Não transfira a Lula ou Flávio o resultado de corréu, parente ou processo relacionado.
4. Revise `dist/case-status.mjs`, inclusive exceções por ID, para a ficha passar ao grupo correto. Revise a justificativa e a faixa de gravidade somente se o objeto/impacto potencial documentado mudar. Denúncia recebida, recurso ou condenação não aumentam a faixa automaticamente.
5. Atualize a tradução correspondente e somente o hash do original revisado. Gere as quatro listas, valide paridade, elegibilidade, faixas e contagens. Confira no navegador as duas abas e os dois idiomas: nenhuma ficha encerrada deve aparecer em casos, busca, cronologia, biblioteca, link direto ou download. Inclua a revisão mobile abaixo, pois novos títulos, situações e resumos também podem afetar o layout.
6. Publique fontes, traduções, hashes, classificação e dados gerados no mesmo commit. Confirme o workflow do commit e a versão pública. Relate objetivamente as entradas, saídas e mudanças de situação/faixa, sem chamar quantidade de fichas de quantidade de crimes. Não anuncie reclassificações ou publicação não verificadas.

| Movimentação confirmada | Classificação e exibição |
| --- | --- |
| Pedido sem abertura/admissão comprovada | `pedido`; fora da página e das contagens. |
| Inquérito aberto, denúncia recebida ou ação admitida | `investigacao`; mostrar com papel e etapa precisos, se o alvo for a própria pessoa. |
| Diligência, indiciamento, recurso ou liminar em procedimento que continua | Manter visível; atualizar etapa. Negativa de medida cautelar não equivale a improcedência ou encerramento da ação. |
| Condenação ou sanção vigente, sem encerramento documentado | `decisao`; mostrar e contar. Distinguir criminal, eleitoral e cível, informar recurso e ausência de trânsito confirmado quando pertinente. |
| Arquivamento, trancamento, prescrição, absolvição, improcedência ou rejeição que encerre o procedimento pessoal | `encerrado`; retirar imediatamente da interface e de todas as contagens e exportações. Manter desfecho e fontes no histórico de manutenção. |
| Condenação afastada/anulada, sem procedimento remanescente documentado | Retirar da exibição; usar `encerrado` quando houver encerramento ou exceção editorial verificada para decisão favorável. Atualizar/remover exceções antigas quando o fato mudar. |
| Anulação apenas parcial, transferência ou repetição de ato, com procedimento ainda aberto | Não tratar como encerramento total. Exibir somente o objeto remanescente comprovado e explicar o alcance da decisão. |
| Reabertura efetivamente deferida | Reclassificar como `investigacao` e reincluir com fonte e data; mera solicitação permanece sem efeito na visibilidade. |
| Informação contraditória, autos sigilosos ou desfecho não confirmado | Expor a limitação, manter apenas o último estado documentado e buscar fonte melhor; não inventar encerramento, trânsito ou andamento atual. |

As contagens são derivadas dos dados filtrados, nunca preenchidas manualmente. O total da aba deve coincidir com a soma das cinco faixas; as ordens e os tons devem ser os mesmos em português e inglês. O tom mais intenso de vermelho corresponde à faixa mais grave, independentemente do resultado ou fase processual.

## Preservar a qualidade no mobile

A leitura em celular faz parte da manutenção semanal, inclusive quando só os dados mudam. Preserve os ajustes responsivos de `dist/styles.css` nas duas línguas e abas; textos novos devem se adaptar ao espaço disponível, sem reduzir a fonte ou esconder informações para caber.

- Mantenha os resumos, a metodologia e os textos das fichas legíveis sem zoom: a referência atual é 15 px no mobile. Campos de busca e seletores usam 16 px; controles de navegação, filtros e ações têm área de toque de pelo menos 44 px de altura. Os links PT/EN têm área mínima de 44 × 44 px.
- Abas de visualização e categorias devem permanecer inteiras e acessíveis, quebrando em linhas quando necessário. Evite rolagem horizontal da página, sobreposição, reticências ou cortes em títulos, situação, contagens e fontes. Não use `overflow-x:hidden` para mascarar conteúdo que excede a tela.
- Em telas estreitas, mantenha os dados das fichas em uma coluna, texto e links longos com quebra adequada e o botão de fechar acessível durante a rolagem. Preserve as contagens por gravidade e a paleta Noite e cobre com os tons de vermelho já definidos.
- Em cada atualização semanal, inspecione no navegador os cartões e fichas alterados em português e inglês a 320 e 390 px de largura, incluindo um título ou situação longo. Quando houver mudança de interface, confira também 430 px, uma largura de tablet (768 px) e desktop (1280 px), nas duas abas pessoais. Verifique busca, filtros, troca de idioma, abertura/fechamento da ficha e acesso à cronologia, fontes e metodologia conforme as áreas afetadas.
- Corrija problemas encontrados antes de publicar e confira uma tela mobile representativa no site público após o deploy. Registre as larguras e verificações efetivamente realizadas. Se o ambiente não oferecer navegador ou ajuste de viewport, informe a limitação; validação de HTML ou dados, por si só, não comprova qualidade visual. Não declare teste em aparelho físico quando só houver simulação de largura.

## Validar e publicar

Execute no checkout:

```sh
node build-data.mjs
node validate.mjs
node --check dist/app.js
node --check dist/severity.mjs
node --check translations/en.mjs
node --check translations/lula.en.mjs
node --check dist/dossiers.mjs
node --check dist/lula-severity.mjs
node --check dist/case-status.mjs
node --test tests/*.test.mjs
```

O build bloqueia traduções cujo original mudou. O validador confere paridade entre idiomas, referências, cronologia, cobertura de gravidade e desempates. Também contém limite inicial de data (`2026-10-27`) e expectativas históricas de situações e posições. Quando novas evidências ou inclusões alterarem essas expectativas, ajuste-as ao estado revisado, nos dois idiomas. Preserve as verificações estruturais; não descarte um fato verificado apenas para satisfazer uma asserção histórica, nem remova checagens indiscriminadamente para obter sucesso.

Inspecione o diff e confira fontes, papéis, situações, cronologia, datas, traduções e justificativas alteradas. Validação sintática não confirma fatos nem equivalência semântica. Para mudanças de interface ou ordenação, confira nas duas abas e nos dois idiomas: isolamento pessoal das fichas, contagens e exportação, preservação de pessoa/ficha ao trocar idioma, navegação por teclado e histórico, ordem padrão decrescente, filtros, retorno de outras visualizações, alternativas de ordem, critérios, troca de idioma na mesma ficha e apresentação responsiva, em uma prévia local ou no site publicado, conforme os recursos do ambiente. Na revisão visual, confirme que arquivamentos, absolvições, anulações, prescrições e decisões de improcedência não são exibidos. Para ajustes apenas editoriais, uma checagem direcionada às fichas modificadas nos dois idiomas basta. Não apresente verificações não executadas como aprovadas.

Para publicar no GitHub Pages, leia [references/github-publication.md](references/github-publication.md). Envie uma revisão completa e coerente para `renatovicente/observatorio-publico`, em `main`, e confirme o resultado do workflow de Pages correspondente ao commit. A atualização do conteúdo e sua publicação estão autorizadas quando a tarefa solicitar manutenção do site, inclusive no agendamento; respeite pedidos de rascunho ou revisão. Não publique traduções incompletas ou mudanças sem fontes.

Se uma atualização do Site anterior também tiver sido solicitada, leia `sites:sites`, confirme identidade e audiência com `get_site` e siga o fluxo de site existente. Preserve credenciais apenas em memória/stdin e confirme a implantação terminal; não trate o sucesso de um destino como prova de publicação no outro. Em falha, mantenha o trabalho e os identificadores da operação para retomada, sem criar duplicatas.

Ao terminar, informe as URLs das duas versões, quantidade de fichas novas/alteradas, principais mudanças sustentadas, paridade dos idiomas, eventuais mudanças de faixa, data e alcance da revisão, validação realizada e lacunas. Se nenhuma mudança factual tiver sido comprovada, diga isso diretamente.

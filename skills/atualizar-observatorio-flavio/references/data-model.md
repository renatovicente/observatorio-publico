# Mapa do acervo e datas

Este mapa descreve a implementação e o recorte definido pelo usuário em 27/10/2026: duas abas pessoais, Flávio e Lula. O recorte de Lula exige processo ou investigação efetivamente instaurado contra ele próprio; não inclui parentes ou pedidos sem abertura confirmada. Confira o código atual antes de aplicar instruções que dependam de sua estrutura.

## Arquivos

| Arquivo | Função |
| --- | --- |
| `build-data.mjs` | Fonte editável; usa `add({...})`, helpers `S(...)` para fontes e `E(...)` para eventos, além de listas que geram fichas. |
| `dist/data.json` | Lista de fichas em português, gerada por `node build-data.mjs`. |
| `translations/en.mjs` | Traduções editoriais por ID, com eventos e fontes na mesma ordem do original. |
| `translations/en-source-hashes.json` | SHA-256 do registro português revisado que fundamenta cada tradução. |
| `build-locales.mjs` | Chamado ao final de `build-data.mjs`; valida traduções/hashes e gera a lista inglesa. |
| `dist/data.en.json` | Lista gerada em inglês, com IDs, datas, URLs e metadados factuais preservados. |
| `dist/index.html`, `dist/en/index.html` | Páginas PT e EN: estrutura, datas, metodologia, seletor de idioma e rodapé. |
| `dist/app.js` | Módulo compartilhado; busca, filtros, rótulos PT/EN, fichas, fontes, cronologia e exportação. Usa a data da pessoa definida em `dist/dossiers.mjs` nos metadados e no nome do download. |
| `dist/severity.mjs` | Faixas, justificativas PT/EN por ID, `severityFor` e comparador comum `compareCaseSeverity`. |
| `dist/styles.css` | Paleta Noite e cobre e apresentação compartilhada, incluindo impressão. |
| `validate.mjs` | Estrutura, cronologia, paridade PT/EN e classificação; inclui expectativas históricas revisáveis. |
| `README.md` | Execução e contexto da edição. |
| `.github/workflows/pages.yml` | Validação e publicação automática de `dist/` no GitHub Pages em pushes para `main`. |
| `.openai/hosting.json` | Apenas na cópia anterior do Sites: identidade e configuração; preservar campos se esse destino for solicitado. |

## Arquivos adicionais para Lula e navegação

| Arquivo | Função |
| --- | --- |
| `records/lula.mjs` | Lista editável de fichas portuguesas contra Lula. |
| `translations/lula.en.mjs` | Traduções por ID de Lula, no mesmo contrato de Flávio. |
| `translations/lula-en-source-hashes.json` | Hashes dos originais de Lula semanticamente revisados. |
| `dist/data.lula.json`, `dist/data.lula.en.json` | Dados gerados de Lula, sem misturar registros de Flávio. |
| `dist/lula-severity.mjs` | Justificativas bilíngues de Lula; importadas por `severity.mjs`. |
| `dist/dossiers.mjs` | Metadados e data de pesquisa por pessoa; arquivos dos dois idiomas e regras de URL. |
| `tests/dossiers.test.mjs` | Regressões de links antigos, mudança de pessoa e idioma. |

As mesmas regras de tradução, hash e validação abaixo se aplicam ao par de arquivos da pessoa selecionada. A classificação comum cobre exatamente os IDs dos dois dossiês. O validador também exige IDs de Lula com prefixo `lula-` e rejeita estado `pedido` nesse dossiê. Papéis históricos como `Ex-réu` são aceitos quando o encerramento está documentado.

## Ficha

Campos obrigatórios atuais: `id`, `title`, `category`, `court`, `state`, `status`, `role`, `updated`, `summary`, `details`, `defense`, `limit`, `events`, `sources`. `identifier` é opcional.

- `category`: `Criminal`, `Eleitoral`, `Cível` ou `Parlamentar` em português; `Criminal`, `Electoral`, `Civil` ou `Parliamentary` em inglês. O gerador faz esse mapeamento. Fichas de mero contexto foram excluídas a pedido do usuário.
- `state`: `investigacao`, `decisao`, `encerrado` ou `pedido`. É um filtro editorial; não substitui a descrição precisa em `status` e `role`.
- `updated`: data ISO `AAAA-MM-DD` do último registro substantivo localizado, não da última execução da skill.
- `events`: objetos `{date, title, text}`, em ordem cronológica dentro da ficha. Não coloque evento posterior a `updated`.
- `sources`: objetos `{publisher, date, title, url, type, note}`. `note` pode ser vazio. `date` corresponde à publicação ou documento, e pode diferir da data do evento.
- `type`: `official` para documento/notícia institucional; `press` para reportagem. Agência Brasil é jornalismo público e está marcada `press`. Uma cópia de documento em site privado não vira fonte institucional; descreva a reprodução em `note`.
- `identifier`: número copiado de fonte verificável e associado ao procedimento correto. Não use números de recurso, inquérito e ação como se fossem intercambiáveis.

Os helpers do original são `S(publisher, date, title, url, type='press', note='')` e `E(date, title, text)`. O frontend espera uma lista de fichas em cada JSON, sem envelope. O módulo usa `dossiers[person].files[language]`, resolvido em relação ao próprio módulo, e o idioma do HTML para os rótulos. `?pessoa=lula` seleciona Lula; sem esse parâmetro, Flávio. IDs de fichas `lula-…` também selecionam Lula; os links antigos de Flávio permanecem válidos. Preserve esse contrato salvo mudança coordenada e testada do consumidor.

## Fluxo de tradução e hashes

`translations/en.mjs` fornece os campos editoriais `title`, `court`, `status`, `role`, `summary`, `details`, `defense`, `limit`, `identifier` quando há texto a traduzir, além de `events` e `sources`. Eventos traduzidos contêm apenas `title`/`text`; fontes, apenas `title`/`note`. O gerador mescla datas, URLs, publicadores e tipos a partir do original. Verifique o alinhamento por posição: contagens iguais não garantem que duas fontes ou eventos não foram trocados.

Para uma alteração factual:

1. Edite o original e a tradução correspondente; inclua ou revise a classificação quando necessário. Rode `node build-data.mjs` para gerar o português atual. Se o original mudou, a etapa inglesa pode parar com o erro esperado de hash divergente; isso não é um build concluído.
2. Leia o novo `dist/data.json` e revise semanticamente os registros traduzidos alterados. Depois da revisão, atualize somente suas entradas em `translations/en-source-hashes.json`. A fórmula exata em Node é `createHash('sha256').update(JSON.stringify(record)).digest('hex')`, usando cada objeto português gerado. Não use uma serialização com chaves reordenadas ou calcule sobre o texto do arquivo inteiro. Não atualize IDs não revisados para contornar o bloqueio.
3. Rode novamente `node build-data.mjs` e as validações. Resolva qualquer erro além da divergência esperada; não publique o JSON inglês antigo deixado por uma geração interrompida.

Uma mudança exclusiva de tradução não modifica o hash do original. Inclusão exige original, tradução, hash revisado e classificação; remoção exige retirar o ID dos quatro conjuntos. Mantenha as explicações de defesa, ausência de condenação, reforma de decisão e limitações com o mesmo sentido nos dois idiomas. As notas e os rótulos das fontes são traduzidos; os documentos vinculados não.

## Recorte visível, cores e contagens

O site exibe **somente casos em andamento, investigações e condenações/sanções sem encerramento documentado na última informação localizada**. Encerrados, arquivados, trancados, anulados, prescritos, absolvidos, julgados improcedentes e pedidos sem instauração confirmada ficam fora da interface, busca, cronologia, biblioteca e exportação. Preserve os históricos nas fontes editáveis para auditoria e futuras verificações; não os reintroduza visualmente sem nova evidência de reabertura.

`dist/case-status.mjs` define `caseDisposition` e `countedCases`, que aplica o recorte pessoal antes de qualquer visualização. Há exceção por ID para a condenação de Chico Buarque reformada em recurso, ainda classificada genericamente como `decisao`. Mudanças no desfecho exigem revisar a elegibilidade. A validação bloqueia texto de exceção desatualizado. Não interprete a ausência de notícia posterior como confirmação do trânsito ou de andamento atual: mantenha as limitações visíveis.

As cores refletem **gravidade editorial**, não resultado processual: maior intensidade/saturação de vermelho para faixas mais graves, tons mais suaves para as demais. Os cinco tons estão em `dist/styles.css` e são usados nos cartões, etiquetas e contadores. O total por pessoa e os totais por faixa abrangem exatamente as fichas visíveis. Sua soma deve coincidir; fontes e números de processos não são contagem de crimes. A exportação usa o mesmo recorte e mantém os metadados da faixa. O seletor PT/EN deve preservar pessoa e ficha.


## Estrutura da gravidade editorial

`severityBands` lista as faixas em ordem decrescente, com `id`, `rank`, `label.{pt,en}` e `description.{pt,en}`. Os valores atuais são `financial:5`, `institutional:4`, `information:3`, `civil:2`, `procedural:1`. São posições ordinais, não pontos de risco ou uma escala penal.

`recordSeverity` mapeia cada ID para `{band, reason:{pt,en}}`. `severityFor` reúne a faixa e a justificativa. `compareCaseSeverity` compara rank decrescente, depois `updated` decrescente e por último ID crescente. Uma ficha nova não deve ficar com a classificação ausente, embora o comparador tenha tolerância para dados incompletos; o validador exige cobertura exata.

O frontend mantém `sorts.cases='severity'`, com preferências independentes de cronologia e fontes. O painel de critérios explica as faixas e os empates; a ficha traz sua justificativa. A exportação ordena os registros por gravidade e acrescenta `editorialOrder` e `editorialSeverity` no idioma escolhido. Não grave essa classificação dentro dos JSONs factuais só para reordenar a interface: isso mudaria os hashes sem necessidade.

A numeração visível dos cartões indica sua posição na lista, não a identidade permanente. Preserve os IDs e a âncora `#caso=...` nas duas rotas. Mantenha scripts como módulos, pois `app.js` importa `severity.mjs`.

## Datas que precisam permanecer coerentes

Na edição inicial, a data geral aparece nestes pontos:

1. `dist/index.html`: cartão “Pesquisa concluída em”, texto metodológico “até DD/MM/AAAA” e rodapé “Edição de DD.MM.AAAA”.
2. `dist/en/index.html`: “Research completed on”, “through” e “Edition of”, com dia/mês por extenso em inglês/ano correspondentes à mesma edição.
3. `dist/dossiers.mjs`: `researchedAt` por pessoa. A exportação em `dist/app.js` usa esse valor e o slug pessoal dinamicamente.
4. `validate.mjs`: limite máximo permitido para datas de fontes, fatos e fichas.
5. `README.md`: data do levantamento.

O script de inspeção mostra divergências entre os formatos que reconhece, paridade dos metadados factuais entre os JSONs e cobertura dos IDs no arquivo de hashes. Ele não recalcula hashes, não executa `en.mjs` ou `severity.mjs` e não avalia o significado das traduções. Use o build e `validate.mjs` para atualidade dos hashes e cobertura/comparação de gravidade. Se a arquitetura mudar, inspecione os campos atuais em vez de forçar o formato antigo. Nenhuma dessas checagens confirma que todas as fichas foram pesquisadas novamente.

## Expectativas editoriais no validador inicial

Há asserções específicas para `rachadinhas-alerj`, `chico-buarque` e o prefixo `etica-pce` nos dois idiomas, além do papel processual compatível com o recorte contra Flávio. Há também expectativas sobre os primeiros e o último registro na ordenação por gravidade. São retratos da edição inicial, não instruções para manter permanentemente aqueles resultados ou posições. Uma decisão comprovada ou nova ficha pode exigir revisão das asserções correspondentes. Preserve as checagens gerais de IDs, datas, referências, paridade, cobertura e desempates.

## Escopo da revisão

Não converta uma checagem pontual em alegação de cobertura integral. Se atualizar uma só ficha, mantenha explícitos o corte do levantamento original e a data da revisão pontual. Se pesquisar novamente o conjunto, registre a data geral real, sem mudar datas de decisões antigas. Trânsito em julgado exige confirmação própria; ausência de notícia de recurso não basta.

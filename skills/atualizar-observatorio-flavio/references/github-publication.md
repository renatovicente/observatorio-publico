# Publicação no GitHub Pages e execução na nuvem

Destino: `renatovicente/observatorio-publico`, branch `main`. Publicação: `https://obpub.org/` e subpágina `en/`. O workflow `.github/workflows/pages.yml` gera e valida as duas versões antes de publicar `dist/`.

## Acesso sem depender do computador

Leia o repositório público e esta skill pela conexão GitHub disponível na execução. Um checkout temporário na nuvem serve para pesquisa, edição e validação. Ler um repositório público não comprova permissão de escrita: confira a conexão autenticada e os recursos de escrita antes de prometer uma publicação. Não copie credenciais do computador, não grave tokens no repositório e não suponha que a autenticação local de `gh` exista na nuvem.

Quando o conector GitHub estiver disponível, prefira suas operações de arquivos/objetos Git para publicar. Para uma revisão de vários arquivos, use blobs, árvore e commit com o HEAD atual como pai, e avance `main` por fast-forward, verificando o HEAD esperado. Não force a referência nem sobrescreva trabalho concorrente. Uma rejeição por mudança do HEAD exige reler e reconciliar o conteúdo antes de tentar novamente. Um Git autenticado no ambiente também pode enviar o mesmo commit completo; não invente credenciais.

O conjunto publicado deve conter fontes, traduções revisadas, hashes, classificação e dados gerados coerentes. Evite uma sequência de commits parciais que dispare Pages com português e inglês incompatíveis. Se não houver acesso de escrita ou execução para as validações, preserve as alterações preparadas e informe o bloqueio, sem anunciar atualização concluída.

## Validação e confirmação

Execute o build e as checagens indicadas em `SKILL.md`. Revise o diff e inclua os JSONs gerados no mesmo commit das fontes. O workflow também executa `git diff --exit-code` nos dois JSONs: ele falha se os dados publicados não corresponderem às fontes.

Após atualizar `main`, localize a execução de `pages.yml` cujo `head_sha` corresponda ao commit enviado. Confirme sucesso de build e deploy; em falha, leia o diagnóstico, corrija o problema e verifique a nova execução. Confira as rotas PT/EN e os dados das fichas alteradas no endereço público. Não afirme que um simples push já atualizou o site. Preserve URLs, seletor de idiomas, âncoras e caminhos relativos compatíveis com a raiz de `obpub.org` e `/en/`.

## Execução semanal

A tarefa agendada deve invocar `$atualizar-observatorio-flavio` ou carregar `skills/atualizar-observatorio-flavio/SKILL.md` de `main`, e indicar o repositório público como destino. Mantenha a pesquisa limitada ao recorte da skill e não altere a cadência ou crie outro agendamento durante a atualização. Uma execução sem novidades verificadas não exige commit vazio nem avanço das datas dos fatos. Relate mudanças relevantes, falhas ou necessidade de ação; preserve a preferência de notificações do usuário.

A confirmação de criação do agendamento só comprova que ele foi salvo. Não a apresente como uma atualização semanal já executada.

## Domínio próprio

Preserve `obpub.org` na configuração de Pages e a proteção HTTPS. O DNS é administrado na Hostinger; atualizações editoriais não exigem mudar DNS ou domínio. Se um prompt antigo citar `renatovicente.github.io/observatorio-publico/`, acompanhe o redirecionamento e confirme a publicação em `https://obpub.org/` e `https://obpub.org/en/`. O repositório e a branch continuam iguais. A publicação usa Actions, portanto não depende de arquivo `CNAME` no artefato.

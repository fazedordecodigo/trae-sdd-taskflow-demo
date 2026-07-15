# Prompts para SDD no TRAE AI

## Prompt 1 — Criar e revisar a especificação

Cole o conteúdo abaixo no TRAE iniciando pelo comando `/spec`.

```text
/spec

Analise o repositório atual antes de responder. Estamos no projeto TaskFlow Lite, uma aplicação web em JavaScript moderno, HTML e CSS, sem dependências externas. O projeto já permite criar, concluir e excluir tarefas, persiste dados no localStorage e possui testes com o runner nativo do Node.js.

OBJETIVO DA FEATURE
Adicionar filtros por status para que a pessoa usuária consiga visualizar rapidamente todas as tarefas, apenas as pendentes ou apenas as concluídas.

VALOR PARA O USUÁRIO
Como pessoa usuária do TaskFlow Lite, quero filtrar minhas tarefas por status para focar no trabalho que ainda precisa ser feito ou revisar o que já concluí.

ESCOPO FUNCIONAL OBRIGATÓRIO
1. Exibir três opções de filtro: “Todas”, “Pendentes” e “Concluídas”.
2. “Todas” deve ser o filtro inicial.
3. Cada opção deve exibir a quantidade correspondente calculada sobre o conjunto completo de tarefas, independentemente do filtro ativo; as contagens devem atualizar após criar, concluir, reabrir ou excluir uma tarefa.
4. Ao selecionar um filtro, a lista deve mudar imediatamente, sem recarregar a página.
5. A filtragem deve preservar a ordem atual das tarefas.
6. Trocar o filtro não pode alterar, remover, reordenar nem persistir novamente as tarefas.
7. O filtro selecionado não deve ser salvo no localStorage; ao recarregar a página, “Todas” volta a ser o filtro ativo.
8. Quando o resultado do filtro estiver vazio, mostrar uma mensagem contextual:
   - Todas: “Nenhuma tarefa por aqui”;
   - Pendentes: “Nenhuma tarefa pendente”;
   - Concluídas: “Nenhuma tarefa concluída”.
9. O controle deve usar elementos `button`, funcionar por teclado e expor programaticamente qual opção está ativa por meio de `aria-pressed`.

RESTRIÇÕES TÉCNICAS
- Não adicionar bibliotecas, frameworks, ferramentas de build ou dependências npm.
- Manter JavaScript em módulos ES.
- Manter a persistência existente e a chave atual do localStorage.
- Colocar a regra de filtragem em função pura, separada da manipulação do DOM.
- Não modificar APIs existentes sem necessidade.
- Evitar refatorações que não sejam necessárias para a feature.
- Manter o estilo visual atual e o layout responsivo.

QUALIDADE E VALIDAÇÃO
- Criar testes unitários com node:test para a lógica de filtros e contagens.
- Cobrir: todas, pendentes, concluídas, contagens, preservação da ordem e ausência de mutação do array original.
- Preservar todos os testes já existentes.
- A implementação final deve passar em `npm run check` e `npm run smoke`.

FORA DO ESCOPO
- Busca textual.
- Ordenação manual.
- Categorias, prioridades ou prazos.
- Sincronização com API ou backend.
- Persistência do filtro selecionado.

ENTREGA DESTA ETAPA
Nesta primeira etapa, NÃO altere arquivos e NÃO implemente código. Produza uma especificação contendo:
1. resumo e objetivo;
2. requisitos funcionais e não funcionais;
3. critérios de aceite numerados e testáveis;
4. casos de borda;
5. fora do escopo;
6. proposta técnica por arquivo, sem escrever a implementação completa;
7. estratégia de testes;
8. riscos, suposições e dúvidas em aberto;
9. matriz de rastreabilidade ligando cada critério de aceite ao teste ou validação correspondente.

Se encontrar conflito com o código atual, descreva o conflito. Se algo continuar ambíguo, apresente a suposição e peça uma decisão antes de implementar.
```

---

## Prompt 2 — Implementar a especificação aprovada

Use após revisar e aprovar a spec gerada.

```text
/spec

A especificação da feature “Filtros por status” foi revisada e está aprovada. Implemente-a no repositório atual respeitando integralmente os critérios de aceite, o fora do escopo e as restrições técnicas definidos na spec.

MODO DE EXECUÇÃO
1. Antes de editar, recapitule em até 8 linhas os critérios que orientarão a implementação.
2. Faça alterações pequenas e focadas; não refatore código sem relação direta com a feature.
3. Mantenha a lógica de filtragem em função pura e testável, separada do DOM.
4. Atualize a interface com os três filtros, contagens, estado ativo acessível e empty states contextuais.
5. Adicione os testes unitários previstos.
6. Execute `npm run check` e `npm run smoke`.
7. Se algum comando falhar, diagnostique e corrija antes de concluir.

RELATÓRIO FINAL OBRIGATÓRIO
- arquivos criados e alterados;
- decisões técnicas tomadas;
- resultado dos comandos de validação;
- matriz “critério de aceite → evidência no código ou teste”;
- qualquer risco ou limitação remanescente.

Não declare a feature concluída se algum critério de aceite não estiver atendido ou se os comandos de validação falharem.
```

## Prompt 3 — Auditoria final contra a spec

```text
/spec

Audite a implementação atual da feature “Filtros por status” contra a especificação aprovada.

Não altere arquivos nesta etapa. Gere uma tabela com:
- critério de aceite;
- status: atendido, parcialmente atendido ou não atendido;
- evidência objetiva no arquivo ou teste;
- correção necessária, quando aplicável.

Também confirme os resultados de `npm run check` e `npm run smoke`, verifique se houve mudança fora do escopo e destaque qualquer regressão potencial.
```

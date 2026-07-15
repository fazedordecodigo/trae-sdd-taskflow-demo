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

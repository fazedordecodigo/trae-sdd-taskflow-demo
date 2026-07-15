# Checklist da spec esperada

Use este documento para revisar, ao vivo, a resposta produzida pelo `/spec`.

## Requisitos essenciais

- [ ] Existem exatamente três filtros: Todas, Pendentes e Concluídas.
- [ ] Todas é o estado inicial.
- [ ] Os filtros exibem contagens derivadas do conjunto completo de tarefas.
- [ ] A filtragem não modifica o array original nem a persistência.
- [ ] A ordem das tarefas é preservada.
- [ ] O filtro não é persistido.
- [ ] Há empty state específico para cada filtro.
- [ ] O estado ativo é perceptível visualmente e por tecnologia assistiva.
- [ ] Não há novas dependências.
- [ ] A lógica de domínio é separada do DOM.

## Critérios de aceite mínimos

1. Dadas tarefas pendentes e concluídas, “Todas” exibe todas na ordem original.
2. Ao selecionar “Pendentes”, somente tarefas com `completed === false` são exibidas.
3. Ao selecionar “Concluídas”, somente tarefas com `completed === true` são exibidas.
4. Cada filtro mostra a contagem correta, independentemente do filtro ativo.
5. Trocar filtros não altera as tarefas persistidas.
6. Recarregar a página restaura “Todas”.
7. Resultado vazio mostra a mensagem contextual correta.
8. Botões de filtro funcionam via teclado e expõem o estado ativo.
9. Testes existentes e novos passam.
10. O smoke test da aplicação passa.

## Sinais de uma spec fraca

- Critérios genéricos como “o filtro deve funcionar”.
- Ausência de regras sobre persistência, ordem ou mutação.
- Mistura de requisitos com implementação detalhada demais.
- Inclusão de busca, prioridade ou backend fora do escopo.
- Ausência de plano de testes e comandos de validação.

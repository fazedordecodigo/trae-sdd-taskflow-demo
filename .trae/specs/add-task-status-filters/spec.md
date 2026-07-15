# Filtros de Status das Tarefas Spec

## Resumo e objetivo
Adicionar um controle de filtros por status em TaskFlow Lite para permitir que a pessoa usuária visualize rapidamente todas as tarefas, apenas as pendentes ou apenas as concluídas. A solução deve preservar a arquitetura atual sem dependências externas, manter a persistência existente das tarefas e separar a regra de filtragem da manipulação do DOM.

## Why
Hoje a aplicação permite criar, concluir, reabrir e excluir tarefas, mas sempre exibe a coleção completa. Isso dificulta foco operacional e revisão do que já foi concluído, especialmente quando a lista cresce.

## What Changes
- Adicionar três filtros de status com botões: `Todas`, `Pendentes` e `Concluídas`.
- Tornar `Todas` o filtro inicial em toda carga da página.
- Exibir contagens por filtro calculadas sobre o conjunto completo de tarefas, independentemente do filtro ativo.
- Aplicar a filtragem imediatamente na UI sem recarregar a página.
- Exibir empty states contextuais conforme o filtro ativo.
- Manter a lógica de filtragem em função pura e testável, separada do DOM.
- Preservar a persistência atual das tarefas em `localStorage`, sem salvar o filtro ativo.

## Impact
- Affected specs: gerenciamento de tarefas, renderização da lista, acessibilidade do controle de filtro, persistência local.
- Affected code: `index.html`, `src/main.js`, `src/domain/tasks.js`, `src/styles.css`, `tests/tasks.test.js`, potencialmente `scripts/smoke.mjs`.

## Requisitos funcionais
1. A interface deve exibir exatamente três filtros: `Todas`, `Pendentes` e `Concluídas`.
2. O filtro inicial da página deve ser `Todas`.
3. Cada filtro deve mostrar sua respectiva quantidade calculada com base no conjunto completo de tarefas.
4. As contagens devem atualizar após criar, concluir, reabrir ou excluir uma tarefa.
5. Ao selecionar um filtro, a lista visível deve ser atualizada imediatamente sem recarregar a página.
6. A filtragem deve preservar a ordem atual das tarefas.
7. Trocar o filtro não pode alterar o array fonte, reordenar tarefas, remover tarefas nem disparar nova persistência.
8. O filtro selecionado não deve ser salvo em `localStorage`; ao recarregar a página, `Todas` volta a ser o ativo.
9. Quando o resultado filtrado estiver vazio, a interface deve exibir a mensagem contextual correta:
   - `Todas`: `Nenhuma tarefa por aqui`
   - `Pendentes`: `Nenhuma tarefa pendente`
   - `Concluídas`: `Nenhuma tarefa concluída`
10. O controle de filtros deve usar elementos `button`, permitir operação por teclado e expor o estado ativo por `aria-pressed`.

## Requisitos não funcionais
1. Não adicionar bibliotecas, frameworks, ferramentas de build ou dependências npm.
2. Manter JavaScript em módulos ES.
3. Manter a chave atual de persistência: `taskflow-lite.tasks.v1`.
4. Manter a lógica de filtragem em função pura, separada da manipulação do DOM.
5. Preservar o estilo visual atual e o layout responsivo.
6. Preservar os testes existentes e adicionar testes unitários com `node:test`.
7. A implementação final deve passar em `npm run check` e `npm run smoke`.

## Critérios de aceite
1. Dado um conjunto misto de tarefas pendentes e concluídas, quando a página carrega, então o filtro ativo é `Todas`, `aria-pressed="true"` aparece apenas nesse botão e a lista mostra todas as tarefas na ordem original.
2. Dado um conjunto misto de tarefas, quando a pessoa usuária ativa `Pendentes`, então apenas tarefas com `completed === false` permanecem visíveis, sem alteração na ordem original.
3. Dado um conjunto misto de tarefas, quando a pessoa usuária ativa `Concluídas`, então apenas tarefas com `completed === true` permanecem visíveis, sem alteração na ordem original.
4. Dado qualquer filtro ativo, quando tarefas são criadas, concluídas, reabertas ou excluídas, então os rótulos/contagens de `Todas`, `Pendentes` e `Concluídas` refletem o conjunto completo atualizado.
5. Dado que a pessoa usuária troca entre filtros, então a operação não altera o array original de tarefas, não reordena itens e não chama persistência apenas por troca de filtro.
6. Dado um recarregamento completo da página, quando tarefas já existem no `localStorage`, então `Todas` volta a ser o filtro ativo.
7. Dado que o filtro ativo não possui resultados, quando a UI renderiza a lista, então a mensagem contextual correspondente é exibida.
8. Dado o controle de filtros, quando a pessoa usuária navega por teclado e aciona um botão, então o filtro muda corretamente e o estado ativo fica disponível por `aria-pressed`.
9. Dado o conjunto de testes automatizados, quando `npm run check` e `npm run smoke` são executados após a implementação, então ambos finalizam com sucesso.

## Casos de borda
- Lista vazia com filtro inicial `Todas` deve exibir `Nenhuma tarefa por aqui`.
- Lista sem tarefas pendentes deve exibir `Nenhuma tarefa pendente` ao ativar `Pendentes`.
- Lista sem tarefas concluídas deve exibir `Nenhuma tarefa concluída` ao ativar `Concluídas`.
- Criar uma nova tarefa enquanto `Concluídas` estiver ativo não deve forçar mudança de filtro; a contagem de `Pendentes` aumenta e a lista filtrada pode continuar vazia.
- Reabrir a única tarefa concluída enquanto `Concluídas` estiver ativo deve produzir empty state contextual imediato.
- Concluir a única tarefa pendente enquanto `Pendentes` estiver ativo deve produzir empty state contextual imediato.
- Excluir a última tarefa visível de um filtro deve preservar o filtro ativo e mostrar o empty state correto.
- Filtro desconhecido em função pura deve fazer fallback previsível para `Todas` ou ser rejeitado explicitamente; a decisão deve ser consistente e coberta por teste.

## Fora do escopo
- Busca textual.
- Ordenação manual.
- Categorias, prioridades ou prazos.
- Sincronização com API ou backend.
- Persistência do filtro selecionado.

## Proposta técnica por arquivo
### `index.html`
- Inserir uma nova região de filtros na seção `task-panel`, preferencialmente próxima ao título da lista.
- Estruturar o controle com três `button[type="button"]`, cada um com rótulo textual e contagem visível.
- Manter semântica acessível para leitura de estado ativo com `aria-pressed`.
- Ajustar o empty state para permitir texto contextual controlado por script, reaproveitando a estrutura existente sempre que possível.

### `src/domain/tasks.js`
- Adicionar uma função pura para filtrar tarefas por status, preservando ordem e sem mutação.
- Adicionar, se necessário, um helper puro para obter as contagens usadas pelos filtros, reutilizando ou expandindo `getTaskStats`.
- Definir um contrato simples para os filtros permitidos (`all`, `pending`, `completed` ou equivalente) e tratamento de valor desconhecido.

### `src/main.js`
- Introduzir estado efêmero de filtro ativo em memória, inicializado como `Todas`.
- Separar explicitamente o conjunto completo (`tasks`) da lista derivada a ser renderizada.
- Recalcular contagens, lista filtrada, `aria-pressed` e empty state em toda renderização.
- Garantir que troca de filtro apenas chame `render()`, sem `repository.save(...)`.
- Manter os fluxos existentes de criar, alternar e excluir tarefas, apenas ajustando a composição com o filtro ativo.

### `src/styles.css`
- Adicionar estilos para o grupo de filtros, incluindo estado ativo, hover e foco visível.
- Preservar aparência atual do produto e responsividade existente.
- Garantir contraste e affordance visual suficientes para distinguir o botão ativo.

### `tests/tasks.test.js`
- Adicionar testes unitários para a função pura de filtragem cobrindo:
  - `Todas`, `Pendentes` e `Concluídas`;
  - preservação da ordem;
  - ausência de mutação do array original;
  - comportamento para filtro desconhecido;
  - consistência das contagens, caso a regra fique em helper puro.

### `scripts/smoke.mjs`
- Avaliar extensão mínima do smoke test para validar presença dos controles de filtro no HTML servido e evitar regressão estrutural simples.

## Estratégia de testes
1. Testes unitários no domínio com `node:test` para a regra de filtragem e contagens.
2. Regressão dos testes atuais de criação, alternância, remoção, sanitização e persistência.
3. Validação sintática e de suíte completa com `npm run check`.
4. Validação smoke com `npm run smoke`.
5. Verificação manual complementar no navegador para:
   - mudança imediata da lista sem reload;
   - atualização de contagens após criar, concluir, reabrir e excluir;
   - `aria-pressed` e operação por teclado;
   - empty states contextuais.

## Conflitos com o código atual
- `src/main.js` hoje renderiza sempre `tasks.map(createTaskElement)`, sem conceito de lista derivada por filtro.
- `persistAndRender()` é o caminho central de atualização da UI; será necessário impedir que troca de filtro entre nesse fluxo, ou haveria persistência indevida.
- O empty state atual é único e estático (`Nenhuma tarefa por aqui` + texto auxiliar), em desacordo com as três mensagens contextuais exigidas.
- `index.html` não possui hoje uma região de filtros nem elementos com `aria-pressed`.
- `src/domain/tasks.js` ainda não contém função pura de filtragem, embora a arquitetura atual já favoreça esse encaixe.

## ADDED Requirements
### Requirement: Filtragem por status na lista de tarefas
O sistema SHALL permitir que a pessoa usuária visualize tarefas por status usando os filtros `Todas`, `Pendentes` e `Concluídas`, sem alterar o conjunto persistido de tarefas.

#### Scenario: Carregamento inicial
- **WHEN** a página é carregada
- **THEN** o filtro ativo é `Todas`
- **AND** todas as tarefas são exibidas na ordem atual
- **AND** o filtro ativo não depende de valor persistido previamente

#### Scenario: Filtrar pendentes
- **WHEN** a pessoa usuária ativa `Pendentes`
- **THEN** apenas tarefas não concluídas são exibidas
- **AND** a ordem original é preservada

#### Scenario: Filtrar concluídas
- **WHEN** a pessoa usuária ativa `Concluídas`
- **THEN** apenas tarefas concluídas são exibidas
- **AND** a ordem original é preservada

### Requirement: Contagens independentes do filtro ativo
O sistema SHALL exibir contagens por filtro derivadas do conjunto completo de tarefas, e não apenas da lista visível.

#### Scenario: Atualização após mutação de tarefa
- **WHEN** uma tarefa é criada, concluída, reaberta ou excluída
- **THEN** as contagens de `Todas`, `Pendentes` e `Concluídas` são recalculadas sobre o conjunto completo

### Requirement: Empty state contextual por filtro
O sistema SHALL exibir uma mensagem contextual quando o resultado do filtro ativo estiver vazio.

#### Scenario: Sem tarefas concluídas
- **WHEN** o filtro ativo é `Concluídas` e nenhuma tarefa concluída existe
- **THEN** a interface exibe `Nenhuma tarefa concluída`

#### Scenario: Sem tarefas pendentes
- **WHEN** o filtro ativo é `Pendentes` e nenhuma tarefa pendente existe
- **THEN** a interface exibe `Nenhuma tarefa pendente`

## MODIFIED Requirements
### Requirement: Renderização da lista de tarefas
A renderização da lista passa a depender de uma coleção derivada do filtro ativo, enquanto operações de criar, alternar e excluir continuam operando sobre o conjunto completo e persistido de tarefas.

## REMOVED Requirements
- Nenhum requisito removido nesta mudança.

## Riscos, suposições e dúvidas em aberto
### Riscos
- Misturar estado de filtro com persistência pode gerar gravações indevidas em `localStorage`.
- Atualizações de contagem e empty state podem divergir se a renderização usar fontes de dados diferentes.
- Alterações de UI podem quebrar responsividade ou foco visível se os estilos forem acoplados demais ao layout atual.

### Suposições
- O filtro ativo existirá apenas em memória no `main.js`.
- As contagens mostradas nos botões representarão sempre o conjunto completo de tarefas.
- A ordem atual das tarefas continua sendo a ordem do array `tasks`, já influenciada hoje por inserção no topo.
- O suporte por teclado será atendido por botões nativos acionáveis por `Tab` e `Enter`/`Space`, sem necessidade de atalhos customizados.

### Dúvidas em aberto
- O texto de `#task-summary` deve continuar resumindo apenas tarefas pendentes do conjunto completo, ou deve refletir a lista filtrada visível? Como isso não está no escopo funcional obrigatório, a proposta assume manter o comportamento atual baseado no conjunto completo para evitar mudança colateral.
- No empty state contextual, apenas o título principal precisa variar ou o parágrafo de apoio também deve mudar? A proposta assume que a mensagem obrigatória é o texto principal e que o subtítulo pode permanecer estável, salvo decisão em contrário.

## Matriz de rastreabilidade
| Critério de aceite | Validação proposta |
|---|---|
| CA1 | Teste unitário da função de filtragem para `Todas` + verificação manual de `aria-pressed` inicial + possível checagem estrutural no smoke |
| CA2 | Teste unitário para `Pendentes` preservando ordem + verificação manual da UI |
| CA3 | Teste unitário para `Concluídas` preservando ordem + verificação manual da UI |
| CA4 | Testes unitários de contagens/estatísticas + verificação manual após criar, concluir, reabrir e excluir |
| CA5 | Teste unitário de não mutação + revisão do fluxo em `main.js` para garantir que troca de filtro não chama persistência + verificação manual |
| CA6 | Verificação manual com reload da página e inspeção do contrato em `main.js` para reinicialização em `Todas` |
| CA7 | Verificação manual dos três empty states + eventual teste unitário do helper de mensagem contextual, se criado |
| CA8 | Verificação manual por teclado e inspeção dos botões com `aria-pressed` + possível smoke estrutural |
| CA9 | Execução de `npm run check` e `npm run smoke` na fase de implementação |

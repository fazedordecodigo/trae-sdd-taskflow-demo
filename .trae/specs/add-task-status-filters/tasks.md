# Tasks
- [x] Task 1: Validar decisões pendentes da spec e alinhar o contrato final da feature.
  - [x] Confirmar a regra para `#task-summary` durante filtros.
  - [x] Confirmar se o subtítulo do empty state também deve variar ou apenas a mensagem principal.

- [x] Task 2: Preparar a base de domínio para filtragem por status.
  - [x] Adicionar função pura de filtragem em `src/domain/tasks.js`.
  - [x] Definir tratamento previsível para filtro desconhecido.
  - [x] Garantir reutilização ou extensão das contagens existentes sem mutação do array original.

- [x] Task 3: Atualizar a interface para exibir e controlar os filtros.
  - [x] Inserir os três botões de filtro em `index.html`.
  - [x] Gerenciar estado efêmero do filtro em `src/main.js`.
  - [x] Renderizar lista derivada, contagens e empty state contextual sem persistir o filtro.
  - [x] Ajustar estilos em `src/styles.css` preservando layout, responsividade e foco visível.

- [x] Task 4: Cobrir a feature com testes e validação final.
  - [x] Adicionar testes unitários em `tests/tasks.test.js` para filtros, contagens, ordem e não mutação.
  - [x] Ajustar `scripts/smoke.mjs` se necessário para validar a estrutura mínima dos filtros.
  - [x] Executar `npm run check`.
  - [x] Executar `npm run smoke`.

- [x] Task 5: Reforçar o acionamento por teclado dos filtros e revalidar o critério de acessibilidade.
  - [x] Garantir ativação explícita dos filtros por `Enter` e `Space` no `src/main.js`.
  - [x] Reexecutar validação automatizada e validação no navegador para o critério de teclado.

# Task Dependencies
- Task 2 depends on Task 1.
- Task 3 depends on Task 1 and Task 2.
- Task 4 depends on Task 2 and Task 3.
- Task 5 depends on Task 3 and feeds Task 4 verification.

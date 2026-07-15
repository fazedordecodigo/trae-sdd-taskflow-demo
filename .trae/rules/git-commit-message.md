---
alwaysApply: true
scene: git_message
---

Escreva as mensagens de commit seguindo as regras do commit semântico:
- Utilize inglês para as mensagens de commit.
- Utilize o formato "type(scope): subject" para as mensagens de commit.
- type: tipo de alteração (feat, fix, refactor, etc.).
- scope: escopo da alteração (componente, arquivo, etc.).
- subject: descrição concisa da alteração.
- body: descrição mais detalhada da alteração, se necessário.
- footer: informações adicionais, se necessário.
- references: referências a issues ou pull requests relacionadas, se necessário.
- Types:
  - break: indica se a alteração quebraria o código existente.
  - docs: indica se a alteração alteraria a documentação.
  - style: indica se a alteração alteraria o estilo do código, mas não alteraria o comportamento.
  - refactor: indica se a alteração refatoraria o código, mas não alteraria o comportamento.
  - test: indica se a alteração adicionaria testes unitários.
  - chore: indica se a alteração não alteraria o código existente ou seu comportamento, mas for necessário para a implementação da feature.
  - revert: indica se a alteração reverte uma alteração anterior.
  - perf: indica se a alteração melhora a performância do código.
  - fix: indica se a alteração corrigiu um problema.
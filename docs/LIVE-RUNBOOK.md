# Runbook da demonstração ao vivo

## Duração sugerida: 20 a 25 minutos

### 1. Mostrar o baseline — 3 min

```bash
npm run check
npm run smoke
npm run dev
```

Demonstre criação, conclusão, exclusão e persistência. Mostre que ainda não existem filtros.

### 2. Gerar a spec — 5 min

Abra `docs/TRAE-SDD-PROMPT.md` e use o Prompt 1 com `/spec`.

Enquanto a IA trabalha, destaque:

- contexto do repositório;
- valor para o usuário;
- regras explícitas;
- fora do escopo;
- gate de aprovação antes do código.

### 3. Revisar a spec — 4 min

Compare a resposta com `docs/EXPECTED-SPEC-CHECKLIST.md`.

Perguntas úteis para o público:

- O filtro deve ser persistido?
- As contagens representam o total ou apenas o resultado visível?
- O que acontece quando não há tarefas no filtro?
- Como uma pessoa usando teclado identifica o filtro ativo?

### 4. Implementar — 7 a 10 min

Use o Prompt 2. Acompanhe o diff por arquivo e evite aceitar alterações fora do escopo.

### 5. Validar — 3 min

```bash
npm run check
npm run smoke
```

Teste manualmente:

1. Todas exibe as três tarefas iniciais.
2. Pendentes exibe duas.
3. Concluídas exibe uma.
4. Marcar uma tarefa altera as contagens imediatamente.
5. Excluir a última tarefa de um filtro mostra o empty state correto.
6. Recarregar a página volta para Todas.

### 6. Auditoria — 2 min

Use o Prompt 3 e mostre a matriz de rastreabilidade.

## Plano B

Se a implementação da IA falhar ou o tempo acabar:

```bash
git stash -u
git switch reference-solution
npm run check
npm run smoke
npm run dev
```

## Reset entre ensaios

```bash
git switch main
git reset --hard starter-v1
git clean -fd
git switch -C demo/live
```

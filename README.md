# TaskFlow Lite — Demo SDD com TRAE AI

Boilerplate pequeno, visual e **sem dependências externas**, preparado para uma demonstração ao vivo de **Spec-Driven Development (SDD)** usando o fluxo `/spec` do TRAE AI.

Link da Live: [TaskFlow Lite — Demo SDD com TRAE AI](https://youtube.com/live/vRA8v1FMm_g)

## Feature da demonstração

Implementar **filtros por status** na lista de tarefas:

- Todas;
- Pendentes;
- Concluídas.

A feature é simples o suficiente para uma Live, mas permite mostrar requisitos, critérios de aceite, acessibilidade, lógica de domínio, testes automatizados e validação final contra a especificação.

## Pré-requisito

- Node.js 20 ou superior.

Não é necessário executar `npm install`: o projeto utiliza apenas APIs nativas do navegador e do Node.js.

## Executar

```bash
npm run check
npm run smoke
npm run dev
```

Abra `http://127.0.0.1:4173`.

## Arquivos importantes

- `docs/TRAE-SDD-PROMPT.md`: prompts prontos para criar a spec e implementar a feature;
- `docs/LIVE-RUNBOOK.md`: roteiro operacional da demonstração;
- `docs/EXPECTED-SPEC-CHECKLIST.md`: referência para revisar a spec produzida pela IA;
- `docs/VALIDATION-REPORT.md`: evidências de validação do boilerplate, da solução e dos prompts.

## Branches de segurança

- `main`: boilerplate inicial, sem a feature;
- `reference-solution`: implementação completa e testada;
- tag `starter-v1`: ponto limpo para reiniciar a demonstração.

Para abrir a solução de referência:

```bash
git switch reference-solution
npm run check
npm run smoke
```

Para reiniciar a Live:

```bash
git switch main
git reset --hard starter-v1
git clean -fd
```

> A branch de referência é um plano B. Durante a apresentação, trabalhe na `main` ou crie uma branch como `demo/live`.

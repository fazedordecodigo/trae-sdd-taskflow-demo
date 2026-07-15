# AGENTS.md

## MODO DE EXECUÇÃO
1. Antes de editar, recapitule em até 8 linhas os critérios que orientarão a implementação.
2. Faça alterações pequenas e focadas; não refatore código sem relação direta com a feature.
3. Mantenha a lógica de filtragem em função pura e testável, separada do DOM.
4. Atualize a interface com os três filtros, contagens, estado ativo acessível e empty states contextuais.
5. Adicione os testes unitários previstos.
6. Execute `npm run check` e `npm run smoke`.
7. Se algum comando falhar, diagnostique e corrija antes de concluir.

## RESTRIÇÕES TÉCNICAS
- Não adicionar bibliotecas, frameworks, ferramentas de build ou dependências npm.
- Manter JavaScript em módulos ES.
- Manter a persistência existente e a chave atual do localStorage.
- Colocar a regra de filtragem em função pura, separada da manipulação do DOM.
- Não modificar APIs existentes sem necessidade.
- Evitar refatorações que não sejam necessárias para a feature.
- Manter o estilo visual atual e o layout responsivo.

## QUALIDADE E VALIDAÇÃO
- Criar testes unitários com node:test para a lógica de filtros e contagens.
- Cobrir: todas, pendentes, concluídas, contagens, preservação da ordem e ausência de mutação do array original.
- Preservar todos os testes já existentes.
- A implementação final deve passar em `npm run check` e `npm run smoke`.

## RELATÓRIO FINAL OBRIGATÓRIO
- arquivos criados e alterados;
- decisões técnicas tomadas;
- resultado dos comandos de validação;
- matriz “critério de aceite → evidência no código ou teste”;
- qualquer risco ou limitação remanescente.

Não declare a feature concluída se algum critério de aceite não estiver atendido ou se os comandos de validação falharem.
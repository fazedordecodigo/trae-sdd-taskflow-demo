import test from 'node:test';
import assert from 'node:assert/strict';

import {
  createTask,
  getTaskStats,
  removeTask,
  sanitizeTasks,
  toggleTask,
} from '../src/domain/tasks.js';

const TASKS = [
  { id: '1', title: 'Primeira', completed: false, createdAt: '2026-01-01T00:00:00.000Z' },
  { id: '2', title: 'Segunda', completed: true, createdAt: '2026-01-02T00:00:00.000Z' },
];

test('createTask normaliza o título e cria uma tarefa pendente', () => {
  const task = createTask('  Escrever a spec  ', {
    id: 'fixed-id',
    createdAt: '2026-01-01T10:00:00.000Z',
  });

  assert.deepEqual(task, {
    id: 'fixed-id',
    title: 'Escrever a spec',
    completed: false,
    createdAt: '2026-01-01T10:00:00.000Z',
  });
});

test('createTask rejeita título vazio', () => {
  assert.throws(() => createTask('   '), /título da tarefa é obrigatório/i);
});

test('toggleTask altera somente a tarefa selecionada e preserva a entrada', () => {
  const originalSnapshot = structuredClone(TASKS);
  const result = toggleTask(TASKS, '1');

  assert.equal(result[0].completed, true);
  assert.equal(result[1], TASKS[1]);
  assert.deepEqual(TASKS, originalSnapshot);
});

test('removeTask remove a tarefa sem modificar o array original', () => {
  const result = removeTask(TASKS, '1');

  assert.deepEqual(result.map((task) => task.id), ['2']);
  assert.equal(TASKS.length, 2);
});

test('getTaskStats calcula total, pendentes e concluídas', () => {
  assert.deepEqual(getTaskStats(TASKS), {
    total: 2,
    pending: 1,
    completed: 1,
  });
});

test('sanitizeTasks ignora registros inválidos e normaliza campos', () => {
  const result = sanitizeTasks([
    TASKS[0],
    null,
    { id: '', title: 'Sem id' },
    { id: '3', title: '  Normalizada  ', completed: 'sim', createdAt: 'data-inválida' },
  ]);

  assert.equal(result.length, 2);
  assert.equal(result[1].title, 'Normalizada');
  assert.equal(result[1].completed, false);
  assert.match(result[1].createdAt, /^\d{4}-\d{2}-\d{2}T/);
});

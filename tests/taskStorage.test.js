import test from 'node:test';
import assert from 'node:assert/strict';

import { createTaskStorage, TASK_STORAGE_KEY } from '../src/infrastructure/taskStorage.js';

class MemoryStorage {
  #data = new Map();

  getItem(key) {
    return this.#data.has(key) ? this.#data.get(key) : null;
  }

  setItem(key, value) {
    this.#data.set(key, String(value));
  }

  removeItem(key) {
    this.#data.delete(key);
  }
}

const TASK = {
  id: 'task-1',
  title: 'Validar armazenamento',
  completed: false,
  createdAt: '2026-01-01T00:00:00.000Z',
};

test('repositório retorna array vazio quando não há dados', () => {
  const repository = createTaskStorage(new MemoryStorage());
  assert.deepEqual(repository.load(), []);
});

test('repositório salva e recupera tarefas válidas', () => {
  const repository = createTaskStorage(new MemoryStorage());

  repository.save([TASK]);

  assert.deepEqual(repository.load(), [TASK]);
});

test('repositório se recupera de JSON inválido', () => {
  const storage = new MemoryStorage();
  storage.setItem(TASK_STORAGE_KEY, '{json inválido');

  const repository = createTaskStorage(storage);
  assert.deepEqual(repository.load(), []);
});

test('clear remove o conteúdo persistido', () => {
  const repository = createTaskStorage(new MemoryStorage());
  repository.save([TASK]);
  repository.clear();

  assert.deepEqual(repository.load(), []);
});

import { sanitizeTasks } from '../domain/tasks.js';

export const TASK_STORAGE_KEY = 'taskflow-lite.tasks.v1';

/**
 * @param {Storage} storage
 * @param {string} [key]
 */
export function createTaskStorage(storage, key = TASK_STORAGE_KEY) {
  if (!storage) {
    throw new TypeError('Uma implementação de Storage é obrigatória.');
  }

  return {
    load() {
      try {
        const serialized = storage.getItem(key);
        return serialized ? sanitizeTasks(JSON.parse(serialized)) : [];
      } catch {
        return [];
      }
    },

    save(tasks) {
      const normalized = sanitizeTasks(tasks);
      storage.setItem(key, JSON.stringify(normalized));
      return normalized;
    },

    clear() {
      storage.removeItem(key);
    },
  };
}

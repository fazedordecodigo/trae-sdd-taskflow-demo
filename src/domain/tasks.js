/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {boolean} completed
 * @property {string} createdAt
 */

function generateId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function toIsoDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

/**
 * Cria uma tarefa válida a partir de um título informado pelo usuário.
 *
 * @param {string} title
 * @param {{ id?: string, createdAt?: string | Date }} [options]
 * @returns {Task}
 */
export function createTask(title, options = {}) {
  const normalizedTitle = String(title ?? '').trim();

  if (!normalizedTitle) {
    throw new TypeError('O título da tarefa é obrigatório.');
  }

  return {
    id: options.id ?? generateId(),
    title: normalizedTitle,
    completed: false,
    createdAt: toIsoDate(options.createdAt ?? new Date()),
  };
}

/**
 * Alterna o status de uma tarefa sem modificar o array original.
 *
 * @param {Task[]} tasks
 * @param {string} taskId
 * @returns {Task[]}
 */
export function toggleTask(tasks, taskId) {
  return tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task,
  );
}

/**
 * Remove uma tarefa sem modificar o array original.
 *
 * @param {Task[]} tasks
 * @param {string} taskId
 * @returns {Task[]}
 */
export function removeTask(tasks, taskId) {
  return tasks.filter((task) => task.id !== taskId);
}

/**
 * @param {Task[]} tasks
 * @returns {{ total: number, pending: number, completed: number }}
 */
export function getTaskStats(tasks) {
  const completed = tasks.reduce((count, task) => count + Number(task.completed), 0);

  return {
    total: tasks.length,
    pending: tasks.length - completed,
    completed,
  };
}

/**
 * Normaliza dados externos, como um payload recuperado do localStorage.
 * Registros inválidos são ignorados para impedir que a UI quebre.
 *
 * @param {unknown} value
 * @returns {Task[]}
 */
export function sanitizeTasks(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((candidate) => {
    if (!candidate || typeof candidate !== 'object') {
      return [];
    }

    const id = typeof candidate.id === 'string' ? candidate.id.trim() : '';
    const title = typeof candidate.title === 'string' ? candidate.title.trim() : '';

    if (!id || !title) {
      return [];
    }

    return [
      {
        id,
        title,
        completed: candidate.completed === true,
        createdAt: toIsoDate(candidate.createdAt ?? new Date()),
      },
    ];
  });
}

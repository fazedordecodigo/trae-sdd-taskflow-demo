import {
  createTask,
  filterTasksByStatus,
  getTaskStats,
  normalizeTaskStatusFilter,
  removeTask,
  TASK_STATUS_FILTERS,
  toggleTask,
} from './domain/tasks.js';
import { createTaskStorage } from './infrastructure/taskStorage.js';

const taskForm = document.querySelector('#task-form');
const taskTitleInput = document.querySelector('#task-title');
const taskError = document.querySelector('#task-error');
const taskList = document.querySelector('#task-list');
const emptyState = document.querySelector('#empty-state');
const emptyStateTitle = document.querySelector('#empty-state-title');
const taskSummary = document.querySelector('#task-summary');
const totalCount = document.querySelector('#total-count');
const pendingCount = document.querySelector('#pending-count');
const completedCount = document.querySelector('#completed-count');
const taskStatusFilters = document.querySelector('#task-status-filters');
const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
const filterCountElements = {
  [TASK_STATUS_FILTERS.ALL]: document.querySelector('[data-filter-count="all"]'),
  [TASK_STATUS_FILTERS.PENDING]: document.querySelector('[data-filter-count="pending"]'),
  [TASK_STATUS_FILTERS.COMPLETED]: document.querySelector('[data-filter-count="completed"]'),
};

const repository = createTaskStorage(window.localStorage);
const starterTasks = [
  createTask('Revisar o problema antes de pedir código', {
    id: 'starter-1',
    createdAt: '2026-01-15T12:00:00.000Z',
  }),
  {
    ...createTask('Transformar regras em critérios de aceite', {
      id: 'starter-2',
      createdAt: '2026-01-15T12:05:00.000Z',
    }),
    completed: true,
  },
  createTask('Executar a validação automatizada', {
    id: 'starter-3',
    createdAt: '2026-01-15T12:10:00.000Z',
  }),
];

let tasks = repository.load();
let activeTaskFilter = TASK_STATUS_FILTERS.ALL;

if (tasks.length === 0) {
  tasks = repository.save(starterTasks);
}

function formatCreatedAt(isoDate) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(isoDate));
}

function createTaskElement(task) {
  const item = document.createElement('li');
  item.className = `task-card${task.completed ? ' completed' : ''}`;
  item.dataset.taskId = task.id;

  const checkbox = document.createElement('input');
  checkbox.className = 'task-toggle';
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.setAttribute('aria-label', `Marcar “${task.title}” como ${task.completed ? 'pendente' : 'concluída'}`);

  const content = document.createElement('div');
  content.className = 'task-content';

  const title = document.createElement('span');
  title.className = 'task-title';
  title.textContent = task.title;

  const meta = document.createElement('small');
  meta.className = 'task-meta';
  meta.textContent = `Criada em ${formatCreatedAt(task.createdAt)}`;

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.type = 'button';
  deleteButton.dataset.action = 'delete';
  deleteButton.setAttribute('aria-label', `Excluir “${task.title}”`);
  deleteButton.textContent = '×';

  content.append(title, meta);
  item.append(checkbox, content, deleteButton);
  return item;
}

function getEmptyStateTitle(filter) {
  switch (filter) {
    case TASK_STATUS_FILTERS.PENDING:
      return 'Nenhuma tarefa pendente';
    case TASK_STATUS_FILTERS.COMPLETED:
      return 'Nenhuma tarefa concluída';
    case TASK_STATUS_FILTERS.ALL:
    default:
      return 'Nenhuma tarefa por aqui';
  }
}

function updateFilterControls(stats) {
  filterCountElements[TASK_STATUS_FILTERS.ALL].textContent = String(stats.total);
  filterCountElements[TASK_STATUS_FILTERS.PENDING].textContent = String(stats.pending);
  filterCountElements[TASK_STATUS_FILTERS.COMPLETED].textContent = String(stats.completed);

  filterButtons.forEach((button) => {
    button.setAttribute(
      'aria-pressed',
      String(button.dataset.filter === activeTaskFilter),
    );
  });
}

function render() {
  const stats = getTaskStats(tasks);
  const visibleTasks = filterTasksByStatus(tasks, activeTaskFilter);

  totalCount.textContent = String(stats.total);
  pendingCount.textContent = String(stats.pending);
  completedCount.textContent = String(stats.completed);
  taskSummary.textContent = `${stats.pending} ${stats.pending === 1 ? 'tarefa pendente' : 'tarefas pendentes'}`;
  updateFilterControls(stats);
  emptyStateTitle.textContent = getEmptyStateTitle(activeTaskFilter);

  taskList.replaceChildren(...visibleTasks.map(createTaskElement));
  emptyState.hidden = visibleTasks.length > 0;
}

function persistAndRender(nextTasks) {
  tasks = repository.save(nextTasks);
  render();
}

function showTaskError(message = '') {
  taskError.textContent = message;
  taskTitleInput.setAttribute('aria-invalid', String(Boolean(message)));
}

function applyTaskFilter(nextFilter) {
  const normalizedFilter = normalizeTaskStatusFilter(nextFilter);

  if (normalizedFilter === activeTaskFilter) {
    return;
  }

  activeTaskFilter = normalizedFilter;
  render();
}

function isFilterActivationKey(event) {
  return (
    event.key === 'Enter'
    || event.key === ' '
    || event.key === 'Space'
    || event.key === 'Spacebar'
    || event.code === 'Enter'
    || event.code === 'Space'
  );
}

function handleFilterButtonKeydown(event) {
  if (!isFilterActivationKey(event)) {
    return;
  }

  event.preventDefault();
  applyTaskFilter(event.currentTarget.dataset.filter);
}

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  try {
    const newTask = createTask(taskTitleInput.value);
    persistAndRender([newTask, ...tasks]);
    taskForm.reset();
    showTaskError();
    taskTitleInput.focus();
  } catch (error) {
    showTaskError(error instanceof Error ? error.message : 'Não foi possível criar a tarefa.');
  }
});

taskTitleInput.addEventListener('input', () => showTaskError());

taskStatusFilters.addEventListener('click', (event) => {
  const filterButton = event.target.closest('[data-filter]');

  if (!filterButton) {
    return;
  }

  applyTaskFilter(filterButton.dataset.filter);
});

filterButtons.forEach((button) => {
  button.addEventListener('keydown', handleFilterButtonKeydown);
});

taskList.addEventListener('change', (event) => {
  const checkbox = event.target.closest('.task-toggle');
  const item = checkbox?.closest('[data-task-id]');

  if (checkbox && item) {
    persistAndRender(toggleTask(tasks, item.dataset.taskId));
  }
});

taskList.addEventListener('click', (event) => {
  const deleteButton = event.target.closest('[data-action="delete"]');
  const item = deleteButton?.closest('[data-task-id]');

  if (deleteButton && item) {
    persistAndRender(removeTask(tasks, item.dataset.taskId));
  }
});

render();

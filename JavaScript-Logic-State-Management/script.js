const STORAGE_KEY = 'taskflow-tasks';
let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let activeFilter = 'all';

const form = document.querySelector('#task-form');
const input = document.querySelector('#new-task');
const list = document.querySelector('#task-list');
const template = document.querySelector('#task-template');
const count = document.querySelector('#task-count');
const emptyState = document.querySelector('#empty-state');
const clearCompleted = document.querySelector('#clear-completed');
const filters = document.querySelector('.filters');

function saveTasks() { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }
function visibleTasks() { return tasks.filter(task => activeFilter === 'all' || (activeFilter === 'active' ? !task.completed : task.completed)); }
function render() {
  list.replaceChildren();
  visibleTasks().forEach(task => {
    const item = template.content.firstElementChild.cloneNode(true);
    item.dataset.id = task.id;
    const checkbox = item.querySelector('.toggle-task');
    checkbox.checked = task.completed;
    item.querySelector('.task-text').textContent = task.text;
    item.classList.toggle('is-completed', task.completed);
    list.append(item);
  });
  const remaining = tasks.filter(task => !task.completed).length;
  count.textContent = `${remaining} ${remaining === 1 ? 'task' : 'tasks'} remaining`;
  emptyState.hidden = visibleTasks().length > 0;
  clearCompleted.hidden = !tasks.some(task => task.completed);
}
form.addEventListener('submit', event => { event.preventDefault(); const text = input.value.trim(); if (!text) return; tasks.unshift({ id: crypto.randomUUID(), text, completed: false }); saveTasks(); input.value = ''; render(); input.focus(); });
filters.addEventListener('click', event => { const button = event.target.closest('[data-filter]'); if (!button) return; activeFilter = button.dataset.filter; filters.querySelectorAll('button').forEach(item => { const selected = item === button; item.classList.toggle('is-active', selected); item.setAttribute('aria-pressed', selected); }); render(); });
list.addEventListener('change', event => { if (!event.target.matches('.toggle-task')) return; const task = tasks.find(item => item.id === event.target.closest('.task-item').dataset.id); task.completed = event.target.checked; saveTasks(); render(); });
list.addEventListener('click', event => { const item = event.target.closest('.task-item'); if (!item) return; const task = tasks.find(entry => entry.id === item.dataset.id); if (event.target.closest('.delete-task')) tasks = tasks.filter(entry => entry.id !== task.id); if (event.target.closest('.edit-task')) { const nextText = prompt('Edit task', task.text); if (nextText !== null && nextText.trim()) task.text = nextText.trim(); } saveTasks(); render(); });
clearCompleted.addEventListener('click', () => { tasks = tasks.filter(task => !task.completed); saveTasks(); render(); });
render();

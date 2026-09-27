const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const emptyMessage = document.querySelector('#empty-message');
const taskCount = document.querySelector('#task-count');
const voiceButton = document.querySelector('#voice-button');
const voiceStatus = document.querySelector('#voice-status');

let tasks = JSON.parse(localStorage.getItem('daily-tasks') || '[]');

function saveTasks() {
  localStorage.setItem('daily-tasks', JSON.stringify(tasks));
}

function addTask(text) {
  const cleanText = text.trim();
  if (!cleanText) return false;

  tasks.push({ id: Date.now(), text: cleanText, completed: false });
  saveTasks();
  renderTasks();
  return true;
}

function getTaskNumber(command) {
  const numberWords = { one: 1, two: 2, three: 3, four: 4, five: 5 };
  const number = Number(command);
  return Number.isInteger(number) ? number : numberWords[command];
}

function handleVoiceCommand(transcript) {
  const command = transcript.trim();
  const addMatch = command.match(/^add\s+(.+)/i);
  const doneMatch = command.match(/^(?:done|complete|finish)\s+(\w+)/i);

  if (addMatch && addTask(addMatch[1])) {
    voiceStatus.textContent = `Added task: ${addMatch[1].trim()}`;
    return true;
  }

  if (doneMatch) {
    const taskNumber = getTaskNumber(doneMatch[1].toLowerCase());
    const task = tasks[taskNumber - 1];
    if (taskNumber && task) {
      task.completed = true;
      saveTasks();
      renderTasks();
      voiceStatus.textContent = `Completed task ${taskNumber}.`;
      return true;
    }
    voiceStatus.textContent = 'That task number does not exist.';
    return true;
  }

  return false;
}

function renderTasks() {
  todoList.innerHTML = '';
  tasks.forEach((task) => {
    const item = document.createElement('li');
    item.className = `todo-item${task.completed ? ' completed' : ''}`;
    item.innerHTML = `
      <button class="check-button" type="button" aria-label="Mark task complete"></button>
      <span class="task-text"></span>
      <button class="delete-button" type="button" aria-label="Delete task" title="Delete task">×</button>
    `;
    item.querySelector('.task-text').textContent = task.text;
    item.querySelector('.check-button').addEventListener('click', () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });
    item.querySelector('.delete-button').addEventListener('click', () => {
      tasks = tasks.filter((currentTask) => currentTask.id !== task.id);
      saveTasks();
      renderTasks();
    });
    todoList.append(item);
  });

  const remainingTasks = tasks.filter((task) => !task.completed).length;
  taskCount.textContent = `${remainingTasks} ${remainingTasks === 1 ? 'task' : 'tasks'} left`;
  emptyMessage.hidden = tasks.length > 0;
}

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;

  addTask(text);
  todoInput.value = '';
  todoInput.focus();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  voiceButton.addEventListener('click', () => {
    recognition.start();
    voiceButton.classList.add('is-listening');
    voiceStatus.textContent = 'Listening...';
  });

  recognition.addEventListener('result', (event) => {
    const transcript = event.results[0][0].transcript;
    if (!handleVoiceCommand(transcript)) {
      todoInput.value = transcript;
      voiceStatus.textContent = 'Voice task ready. Press Add task.';
    }
    todoInput.focus();
  });

  recognition.addEventListener('end', () => voiceButton.classList.remove('is-listening'));
  recognition.addEventListener('error', () => {
    voiceButton.classList.remove('is-listening');
    voiceStatus.textContent = 'Voice input was unavailable. You can type your task instead.';
  });
} else {
  voiceButton.disabled = true;
  voiceButton.title = 'Voice input is not supported in this browser';
  voiceStatus.textContent = 'Voice input is not supported in this browser.';
}

renderTasks();
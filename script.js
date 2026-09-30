let tasks = [
  { id: 1, text: '完成作業1', completed: false },
  { id: 2, text: '買衛生紙', completed: false },
  { id: 3, text: '領包裹', completed: true }
];

let currentFilter = 'all';

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const errorMsg = document.getElementById('error-msg');
const taskList = document.getElementById('task-list');
const stats = document.getElementById('stats');
const filterBtns = document.querySelectorAll('.filter-btn');

// 新增任務
form.addEventListener('submit', function (event) {
  event.preventDefault(); 

  const text = input.value.trim(); 

  // 空白任務不新增
  if (text === '') {
    errorMsg.textContent = '請輸入任務名稱';
    return;
  }

  errorMsg.textContent = '';
  tasks.push({ id: Date.now(), text: text, completed: false });
  input.value = '';
  render();
});

// 完成 / 取消完成
function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  task.completed = !task.completed;
  render();
}

// 刪除任務
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  render();
}

// 篩選
filterBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    currentFilter = btn.dataset.filter; // 讀取 data-filter 的值

    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    render();
  });
});

function getFilteredTasks() {
  if (currentFilter === 'active') {
    return tasks.filter(t => !t.completed);
  }
  if (currentFilter === 'completed') {
    return tasks.filter(t => t.completed);
  }
  return tasks;
}

// 統計
function updateStats() {
  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;
  const undone = total - done;
  stats.textContent = `共 ${total} 項　未完成 ${undone} 項　已完成 ${done} 項`;
}

// 更新畫面
function render() {
  taskList.innerHTML = ''; 

  getFilteredTasks().forEach(function (task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    if (task.completed) {
      li.classList.add('completed');
    }

    const label = document.createElement('label');
    label.className = 'task-label';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(task.id));

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '刪除';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    label.appendChild(checkbox);
    label.appendChild(span);
    li.appendChild(label);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  updateStats();
}

render();
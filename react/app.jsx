 const { useState } = React;

function App() {
  // 任務資料：用 useState 保存，改變時 React 會自動更新畫面
  const [tasks, setTasks] = useState([
    { id: 1, text: '完成作業1', completed: false },
    { id: 2, text: '買衛生紙', completed: false },
    { id: 3, text: '領包裹', completed: true }
  ]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  // 新增
  function handleSubmit(event) {
    event.preventDefault();
    const text = input.trim();
    if (text === '') {
      setError('請輸入任務名稱');
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: text, completed: false }]);
    setInput('');
    setError('');
  }

  // 完成 / 取消完成
  function toggleTask(id) {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  }

  // 刪除
  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  return (
    <>
      <header>
        <h1>任務管理器 Task Manager</h1>
      </header>

      <main>
        <section className="add-section">
          <form onSubmit={handleSubmit}>
            <label htmlFor="task-input">新增任務：</label>
            <div className="input-group">
              <input
                type="text"
                id="task-input"
                placeholder="輸入任務名稱"
                value={input}
                onChange={e => setInput(e.target.value)}
              />
              <button type="submit" id="add-btn">新增</button>
            </div>
            <p className="error-msg">{error}</p>
          </form>
        </section>

        <section className="list-section">
          <h2 className="list-title">任務清單：</h2>
          <ul className="task-list">
            {tasks.map(task => (
              <li
                key={task.id}
                className={task.completed ? 'task-item completed' : 'task-item'}
              >
                <label className="task-label">
                  <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className="task-text">{task.text}</span>
                </label>
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                  刪除
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
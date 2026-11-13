import { useEffect, useMemo, useState } from 'react';
import StatCard from './components/StatCard.jsx';
import TaskForm from './components/TaskForm.jsx';
import TaskItem from './components/TaskItem.jsx';

const STORAGE_KEY = 'campusflow-tasks-v1';

function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function makeId() {
  // A unique enough ID for a single-browser task list.
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

const filters = ['All', 'Pending', 'Completed'];

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // The app still works if browser storage is unavailable.
    }
  }, [tasks]);

  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.length - completed;
  const progress = tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);

  const visibleTasks = useMemo(() => {
    return tasks
      .filter((task) => filter === 'All' || (filter === 'Completed' ? task.completed : !task.completed))
      .sort((a, b) => Number(a.completed) - Number(b.completed) || a.deadline.localeCompare(b.deadline));
  }, [tasks, filter]);

  const upcomingTasks = useMemo(() => {
    return tasks
      .filter((task) => !task.completed)
      .sort((a, b) => a.deadline.localeCompare(b.deadline))
      .slice(0, 3);
  }, [tasks]);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });

  function addTask(title, deadline) {
    setTasks((previous) => [{ id: makeId(), title, deadline, completed: false }, ...previous]);
  }

  function toggleTask(id) {
    setTasks((previous) => previous.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
  }

  function deleteTask(id) {
    setTasks((previous) => previous.filter((task) => task.id !== id));
  }

  function updateTask(id, title, deadline) {
    setTasks((previous) => previous.map((task) => task.id === id ? { ...task, title, deadline } : task));
  }

  function clearCompleted() {
    setTasks((previous) => previous.filter((task) => !task.completed));
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">✓</span>
          <span>Campus<span className="brand-accent">Flow</span></span>
        </div>
        <span className="topbar-label">Student productivity dashboard</span>
      </header>

      <main className="page-container">
        <div className="welcome-heading">
          <div>
            <p className="eyebrow">YOUR WORKSPACE</p>
            <h1>Stay on top of your day.</h1>
            <p className="subheading">A simple space to plan tasks, stay focused, and make progress.</p>
          </div>
          <div className="today-label">◷ {currentDate}</div>
        </div>

        <section className="hero-card" aria-label="Your task progress">
          <div className="hero-content">
            <p className="hero-kicker">YOUR PROGRESS</p>
            <h2>Small steps, big results.</h2>
            <p>Keep going! Every completed task brings you closer to your goals.</p>
            <div className="progress-meta">
              <span>{completed} of {tasks.length} tasks completed</span>
              <strong>{progress}%</strong>
            </div>
            <div
              className="progress-track"
              role="progressbar"
              aria-label="Tasks completed"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="hero-decoration" aria-hidden="true"><span>✓</span></div>
        </section>

        <section className="stats-grid" aria-label="Task statistics">
          <StatCard label="Total tasks" value={tasks.length} symbol="▦" color="purple" />
          <StatCard label="Pending tasks" value={pending} symbol="◷" color="amber" />
          <StatCard label="Completed tasks" value={completed} symbol="✓" color="green" />
        </section>

        <div className="content-grid">
          <section className="main-panel" aria-labelledby="task-section-heading">
            <div className="section-heading">
              <div>
                <p className="eyebrow">ORGANIZE YOUR WORK</p>
                <h2 id="task-section-heading">My tasks</h2>
              </div>
              <span className="section-count">{tasks.length} total</span>
            </div>

            <TaskForm onAddTask={addTask} />

            <div className="list-header">
              <div className="filter-tabs" role="group" aria-label="Filter tasks">
                {filters.map((name) => (
                  <button
                    key={name}
                    type="button"
                    className={`filter-tab ${filter === name ? 'active' : ''}`}
                    onClick={() => setFilter(name)}
                    aria-pressed={filter === name}
                  >
                    {name}
                  </button>
                ))}
              </div>
              <button className="clear-button" type="button" onClick={clearCompleted} disabled={completed === 0}>
                Clear completed
              </button>
            </div>

            {visibleTasks.length > 0 ? (
              <ul className="task-list">
                {visibleTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onUpdate={updateTask}
                  />
                ))}
              </ul>
            ) : (
              <div className="empty-state">
                <span className="empty-icon" aria-hidden="true">✦</span>
                <h3>{tasks.length === 0 ? 'Your task list is ready!' : 'Nothing to show here'}</h3>
                <p>{tasks.length === 0 ? 'Add your first task above to get started.' : 'Try another filter, or add a new task.'}</p>
              </div>
            )}
          </section>

          <aside className="sidebar">
            <section className="sidebar-card" aria-labelledby="upcoming-heading">
              <div className="sidebar-card-header">
                <div className="side-icon">◷</div>
                <h2 id="upcoming-heading">Coming up</h2>
              </div>
              {upcomingTasks.length > 0 ? (
                <ol className="upcoming-list">
                  {upcomingTasks.map((task) => (
                    <li key={task.id}>
                      <span className="upcoming-dot" aria-hidden="true" />
                      <div>
                        <p>{task.title}</p>
                        <span>{new Date(`${task.deadline}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="sidebar-empty">No pending deadlines. Add a task to plan your next step.</p>
              )}
            </section>
            <section className="sidebar-card tip-card" aria-labelledby="tip-heading">
              <div className="sidebar-card-header">
                <div className="side-icon side-icon-tip">✦</div>
                <h2 id="tip-heading">Focus tip</h2>
              </div>
              <p>Break big assignments into smaller tasks. Completing one at a time makes progress easier to track.</p>
            </section>
          </aside>
        </div>
        <footer className="footer">Made with React · Your tasks are stored in this browser</footer>
      </main>
    </div>
  );
}

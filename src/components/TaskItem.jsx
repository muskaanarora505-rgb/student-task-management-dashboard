import { useState } from 'react';

function formatDeadline(deadline) {
  return new Date(`${deadline}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function localDateString() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export default function TaskItem({ task, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);
  const [draftDeadline, setDraftDeadline] = useState(task.deadline);
  const [error, setError] = useState('');

  const overdue = !task.completed && task.deadline < localDateString();

  function startEditing() {
    setDraftTitle(task.title);
    setDraftDeadline(task.deadline);
    setError('');
    setEditing(true);
  }

  function handleSave(event) {
    event.preventDefault();
    if (!draftTitle.trim() || !draftDeadline) {
      setError('Both fields are required.');
      return;
    }
    onUpdate(task.id, draftTitle.trim(), draftDeadline);
    setEditing(false);
  }

  return (
    <li className={`task-item ${task.completed ? 'task-item-done' : ''}`}>
      {editing ? (
        <form className="edit-form" onSubmit={handleSave}>
          <input
            aria-label="Edit task name"
            maxLength={100}
            value={draftTitle}
            onChange={(event) => setDraftTitle(event.target.value)}
            autoFocus
          />
          <input
            aria-label="Edit deadline"
            type="date"
            value={draftDeadline}
            onChange={(event) => setDraftDeadline(event.target.value)}
          />
          <div className="edit-actions">
            <button className="button button-primary button-small" type="submit">Save</button>
            <button className="button button-muted button-small" type="button" onClick={() => setEditing(false)}>Cancel</button>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
        </form>
      ) : (
        <>
          <button
            type="button"
            className={`complete-button ${task.completed ? 'is-complete' : ''}`}
            aria-label={task.completed ? `Mark ${task.title} pending` : `Mark ${task.title} completed`}
            aria-pressed={task.completed}
            onClick={() => onToggle(task.id)}
          >
            {task.completed ? '✓' : ''}
          </button>
          <div className="task-description">
            <p className="task-title">{task.title}</p>
            <div className="task-meta">
              <span className="task-date">◷ {formatDeadline(task.deadline)}</span>
              {overdue && <span className="status-pill status-overdue">Overdue</span>}
              {task.completed && <span className="status-pill status-done">Completed</span>}
            </div>
          </div>
          <div className="task-actions">
            <button type="button" className="icon-button" onClick={startEditing} aria-label={`Edit ${task.title}`} title="Edit task">✎</button>
            <button type="button" className="icon-button icon-button-danger" onClick={() => onDelete(task.id)} aria-label={`Delete ${task.title}`} title="Delete task">×</button>
          </div>
        </>
      )}
    </li>
  );
}

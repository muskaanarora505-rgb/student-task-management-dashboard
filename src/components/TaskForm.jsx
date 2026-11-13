import { useState } from 'react';

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !deadline) {
      setError('Please enter a task name and a deadline.');
      return;
    }

    onAddTask(title.trim(), deadline);
    setTitle('');
    setDeadline('');
    setError('');
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-field form-field-title">
        <label htmlFor="task-title">Task name</label>
        <input
          id="task-title"
          maxLength={100}
          placeholder="e.g. Finish React assignment"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setError('');
          }}
        />
      </div>
      <div className="form-field form-field-date">
        <label htmlFor="task-deadline">Deadline</label>
        <input
          id="task-deadline"
          type="date"
          value={deadline}
          onChange={(event) => {
            setDeadline(event.target.value);
            setError('');
          }}
        />
      </div>
      <button className="button button-primary add-button" type="submit">
        <span aria-hidden="true">+</span> Add task
      </button>
      {error && <p className="form-error" role="alert">{error}</p>}
    </form>
  );
}

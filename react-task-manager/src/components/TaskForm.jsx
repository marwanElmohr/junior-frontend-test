import { useEffect, useState } from 'react';
import { Plus, Save } from 'lucide-react';

const priorities = ['High', 'Medium', 'Low'];

export function TaskForm({ editingTask, onCancel, onSubmit }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');

  useEffect(() => {
    setTitle(editingTask?.title ?? '');
    setPriority(editingTask?.priority ?? 'Medium');
  }, [editingTask]);

  const submitTask = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    onSubmit({ title, priority });
    setTitle('');
    setPriority('Medium');
  };

  return (
    <form className="task-form" onSubmit={submitTask}>
      <label className="field">
        <span>Task</span>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Add a focused, actionable task"
        />
      </label>

      <label className="field">
        <span>Priority</span>
        <select value={priority} onChange={(event) => setPriority(event.target.value)}>
          {priorities.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <div className="form-actions">
        {editingTask ? (
          <button className="secondary-button" type="button" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
        <button className="primary-button" type="submit">
          {editingTask ? <Save size={18} /> : <Plus size={18} />}
          {editingTask ? 'Save task' : 'Add task'}
        </button>
      </div>
    </form>
  );
}

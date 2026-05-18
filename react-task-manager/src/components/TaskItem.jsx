import { Check, Pencil, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTask } from '../redux/tasksSlice.js';

export function TaskItem({ task, onEdit }) {
  const dispatch = useDispatch();

  return (
    <article className={task.completed ? 'task-item completed' : 'task-item'}>
      <button
        aria-label={task.completed ? 'Mark task incomplete' : 'Mark task complete'}
        className="check-button"
        onClick={() => dispatch(toggleTask(task.id))}
        title={task.completed ? 'Mark incomplete' : 'Mark complete'}
        type="button"
      >
        {task.completed ? <Check size={18} /> : null}
      </button>

      <div className="task-copy">
        <h3>{task.title}</h3>
        <span className={`priority-badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
      </div>

      <div className="task-actions">
        <button aria-label="Edit task" onClick={() => onEdit(task)} title="Edit task" type="button">
          <Pencil size={18} />
        </button>
        <button
          aria-label="Delete task"
          onClick={() => dispatch(deleteTask(task.id))}
          title="Delete task"
          type="button"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </article>
  );
}

import { useMemo, useState } from 'react';
import { BarChart3, BriefcaseBusiness, ClipboardCheck, LogOut, Moon, UserRound } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { TaskFilters } from './components/TaskFilters.jsx';
import { TaskForm } from './components/TaskForm.jsx';
import { TaskItem } from './components/TaskItem.jsx';
import { addTask, editTask } from './redux/tasksSlice.js';

const priorities = ['High', 'Medium', 'Low'];

export default function App() {
  const dispatch = useDispatch();
  const { items, filter } = useSelector((state) => state.tasks);
  const [editingTask, setEditingTask] = useState(null);

  const visibleTasks = useMemo(
    () => (filter === 'All' ? items : items.filter((task) => task.priority === filter)),
    [filter, items],
  );
  const visiblePriorities = filter === 'All' ? priorities : priorities.filter((item) => item === filter);

  const completedCount = items.filter((task) => task.completed).length;
  const completionRate = items.length ? Math.round((completedCount / items.length) * 100) : 0;

  const submitTask = ({ title, priority }) => {
    dispatch(addTask({ title, priority }));
  };

  const submitEditedTask = ({ title, priority }) => {
    dispatch(editTask({ id: editingTask.id, title, priority }));
    setEditingTask(null);
  };

  return (
    <main className="app-shell">
      <nav className="top-nav" aria-label="Application navigation">
        <div className="brand">
          <BriefcaseBusiness size={22} />
          <strong>MyPM</strong>
        </div>
        <div />
        <div className="nav-actions">
          <button aria-label="Toggle theme" className="icon-button" type="button">
            <Moon size={18} />
          </button>
          <span className="avatar" aria-hidden="true">
            <UserRound size={16} />
          </span>
          <strong>admin</strong>
          <button className="logout-button" type="button">
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </nav>

      <section className="workspace">
        <header className="app-header">
          <div>
            <h1>Project Management Tool</h1>
            <p>Tool</p>
          </div>
          <div className="header-mark" aria-hidden="true">
            <ClipboardCheck size={32} />
          </div>
        </header>

        <section className="stats-grid" aria-label="Task summary">
          <div className="stat-card">
            <span>Total tasks</span>
            <strong>{items.length}</strong>
          </div>
          <div className="stat-card">
            <span>Completed</span>
            <strong>{completedCount}</strong>
          </div>
          <div className="stat-card accent">
            <span>Progress</span>
            <strong>{completionRate}%</strong>
          </div>
        </section>

        <section className="control-panel">
          <TaskForm onSubmit={submitTask} />
          <TaskFilters />
        </section>

        <section className="task-list" aria-label="Tasks">
          <div className="list-heading">
            <div>
              <p className="eyebrow">Current queue</p>
              <h2>{filter === 'All' ? 'All priorities' : `${filter} priority`}</h2>
            </div>
            <span>
              <BarChart3 size={16} />
              {visibleTasks.length} shown
            </span>
          </div>

          {visibleTasks.length ? (
            <div className="priority-board">
              {visiblePriorities.map((priority) => {
                const priorityTasks = items.filter((task) => task.priority === priority);

                return (
                  <section className={`priority-column ${priority.toLowerCase()}`} key={priority}>
                    <div className="priority-column-header">
                      <h3>{priority}</h3>
                      <span>{priorityTasks.length}</span>
                    </div>

                    {priorityTasks.length ? (
                      priorityTasks.map((task) => (
                        <TaskItem key={task.id} task={task} onEdit={setEditingTask} />
                      ))
                    ) : (
                      <div className="column-empty">Drop tasks here</div>
                    )}
                  </section>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <ClipboardCheck size={42} />
              <h3>No tasks match this filter.</h3>
              <p>Add a task or switch priorities to get your list moving again.</p>
            </div>
          )}
        </section>
      </section>

      {editingTask ? (
        <div className="edit-overlay" role="presentation">
          <section className="edit-card" aria-label="Edit task">
            <div className="edit-card-header">
              <div>
                <p className="eyebrow">Edit task</p>
                <h2>Update the selected task</h2>
              </div>
            </div>
            <TaskForm
              editingTask={editingTask}
              onCancel={() => setEditingTask(null)}
              onSubmit={submitEditedTask}
            />
          </section>
        </div>
      ) : null}
    </main>
  );
}

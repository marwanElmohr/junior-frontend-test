import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/tasksSlice.js';

const filters = ['All', 'High', 'Medium', 'Low'];

export function TaskFilters() {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.tasks.filter);

  return (
    <div className="filter-group" aria-label="Filter tasks by priority">
      {filters.map((filter) => (
        <button
          className={currentFilter === filter ? 'filter-pill active' : 'filter-pill'}
          key={filter}
          onClick={() => dispatch(setFilter(filter))}
          type="button"
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

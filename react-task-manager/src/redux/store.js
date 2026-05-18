import { configureStore } from '@reduxjs/toolkit';
import tasksReducer, { initialState } from './tasksSlice.js';

const STORAGE_KEY = 'professional-task-manager/tasks';

const loadTasks = () => {
  try {
    const serializedTasks = localStorage.getItem(STORAGE_KEY);
    const parsedTasks = serializedTasks ? JSON.parse(serializedTasks) : undefined;

    if (!parsedTasks || !Array.isArray(parsedTasks.items)) {
      return initialState;
    }

    return {
      items: parsedTasks.items,
      filter: parsedTasks.filter ?? 'All',
    };
  } catch {
    return initialState;
  }
};

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState: {
    tasks: loadTasks(),
  },
});

store.subscribe(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState().tasks));
});

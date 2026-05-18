import { createSlice, nanoid } from '@reduxjs/toolkit';

export const initialState = {
  items: [
    {
      id: nanoid(),
      title: 'Prepare product backlog review',
      priority: 'High',
      completed: false,
    },
    {
      id: nanoid(),
      title: 'Send weekly progress summary',
      priority: 'Medium',
      completed: true,
    },
    {
      id: nanoid(),
      title: 'Archive completed design notes',
      priority: 'Low',
      completed: false,
    },
  ],
  filter: 'All',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare({ title, priority }) {
        return {
          payload: {
            id: nanoid(),
            title: title.trim(),
            priority,
            completed: false,
          },
        };
      },
    },
    editTask(state, action) {
      const task = state.items.find((item) => item.id === action.payload.id);

      if (task) {
        task.title = action.payload.title.trim();
        task.priority = action.payload.priority;
      }
    },
    deleteTask(state, action) {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },
    toggleTask(state, action) {
      const task = state.items.find((item) => item.id === action.payload);

      if (task) {
        task.completed = !task.completed;
      }
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { addTask, editTask, deleteTask, toggleTask, setFilter } = tasksSlice.actions;

export default tasksSlice.reducer;

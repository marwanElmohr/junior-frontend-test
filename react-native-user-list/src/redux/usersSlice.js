import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CACHE_KEY } from './cache';

const PAGE_SIZE = 5;
const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

const transformUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  address: `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`,
});

export const hydrateUsers = createAsyncThunk('users/hydrate', async () => {
  const cachedUsers = await AsyncStorage.getItem(CACHE_KEY);
  return cachedUsers ? JSON.parse(cachedUsers) : [];
});

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (page) => {
  let response;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      response = await fetch(
        `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${PAGE_SIZE}`,
      );
      break;
    } catch (error) {
      if (attempt === 1) {
        throw error;
      }

      await wait(700);
    }
  }

  if (!response.ok) {
    throw new Error('Unable to fetch users');
  }

  const users = await response.json();
  return users.map(transformUser);
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    page: 1,
    searchTerm: '',
    status: 'idle',
    error: null,
    hasMore: true,
  },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrateUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.page = action.payload.length ? Math.ceil(action.payload.length / PAGE_SIZE) + 1 : 1;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        const knownIds = new Set(state.items.map((user) => user.id));
        const newUsers = action.payload.filter((user) => !knownIds.has(user.id));

        state.items.push(...newUsers);
        state.page += 1;
        state.status = 'succeeded';
        state.hasMore = action.payload.length === PAGE_SIZE;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerm } = usersSlice.actions;

export default usersSlice.reducer;

import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { CACHE_KEY } from './cache';
import usersReducer from './usersSlice';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  predicate: (action, currentState, previousState) =>
    currentState.users.items !== previousState.users.items,
  effect: async (action, listenerApi) => {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(listenerApi.getState().users.items));
  },
});

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

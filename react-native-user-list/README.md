# React Native User List

Expo user directory built with Redux Toolkit, `FlatList`, API pagination, search, transformed addresses, and AsyncStorage caching for offline support.

## Run

```bash
npm install
npm run start
```

## Features

- Fetches users from `https://jsonplaceholder.typicode.com/users`.
- Stores fetched users in Redux and caches them in AsyncStorage.
- Displays reusable `UserCard` rows with name, email, and combined address.
- Search by user name.
- Paginated loading with an optimized `FlatList`.

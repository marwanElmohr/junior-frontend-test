import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { store } from './src/redux/store';
import { UserDirectoryScreen } from './src/screens/UserDirectoryScreen';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="dark" />
      <UserDirectoryScreen />
    </Provider>
  );
}

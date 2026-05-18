import { useCallback, useEffect, useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { UserCard } from '../components/UserCard';
import { fetchUsers, hydrateUsers, setSearchTerm } from '../redux/usersSlice';

export function UserDirectoryScreen() {
  const dispatch = useDispatch();
  const { items, page, searchTerm, status, error, hasMore } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(hydrateUsers()).then((result) => {
      if (!result.payload?.length) {
        dispatch(fetchUsers(1));
      }
    });
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return items;
    }

    return items.filter((user) => user.name.toLowerCase().includes(normalizedSearch));
  }, [items, searchTerm]);

  const loadMore = useCallback(() => {
    if (status !== 'loading' && hasMore) {
      dispatch(fetchUsers(page));
    }
  }, [dispatch, hasMore, page, status]);

  const renderUser = useCallback(({ item }) => <UserCard user={item} />, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.kicker}>Redux user directory</Text>
          <Text style={styles.title}>Find the right contact fast.</Text>
          <Text style={styles.subtitle}>{items.length} cached users available offline</Text>
        </View>

        <TextInput
          accessibilityLabel="Search users by name"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(value) => dispatch(setSearchTerm(value))}
          placeholder="Search by name"
          placeholderTextColor="#8A95A8"
          style={styles.search}
          value={searchTerm}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderUser}
          contentContainerStyle={styles.listContent}
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          removeClippedSubviews
          windowSize={7}
          ListEmptyComponent={
            status === 'loading' ? null : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>No users found</Text>
                <Text style={styles.emptyCopy}>Try a different name or load more users.</Text>
              </View>
            )
          }
          ListFooterComponent={
            <View style={styles.footer}>
              {status === 'loading' ? <ActivityIndicator color="#124D68" /> : null}
              {hasMore ? (
                <TouchableOpacity
                  activeOpacity={0.84}
                  disabled={status === 'loading'}
                  onPress={loadMore}
                  style={[styles.loadButton, status === 'loading' && styles.disabledButton]}
                >
                  <Text style={styles.loadButtonText}>Load more</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.endCopy}>All available users are loaded.</Text>
              )}
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EEF2F6',
  },
  screen: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  header: {
    paddingBottom: 18,
  },
  kicker: {
    color: '#667085',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 8,
    color: '#111827',
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 38,
  },
  subtitle: {
    marginTop: 10,
    color: '#667085',
    fontSize: 15,
    fontWeight: '600',
  },
  search: {
    height: 50,
    paddingHorizontal: 16,
    marginBottom: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D4DCE8',
    backgroundColor: '#FFFFFF',
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    marginBottom: 10,
    color: '#A43C2B',
    fontWeight: '700',
  },
  listContent: {
    paddingBottom: 26,
  },
  emptyState: {
    paddingVertical: 38,
    alignItems: 'center',
  },
  emptyTitle: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '800',
  },
  emptyCopy: {
    marginTop: 6,
    color: '#667085',
    fontSize: 14,
  },
  footer: {
    minHeight: 96,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  loadButton: {
    width: '100%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#124D68',
  },
  disabledButton: {
    opacity: 0.5,
  },
  loadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  endCopy: {
    color: '#667085',
    fontWeight: '700',
  },
});

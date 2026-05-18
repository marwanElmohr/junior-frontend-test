import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const UserCard = memo(function UserCard({ user }) {
  const initials = user.name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('');

  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.address}>{user.address}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 14,
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4E9F1',
    shadowColor: '#172033',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#124D68',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  content: {
    flex: 1,
  },
  name: {
    color: '#111827',
    fontSize: 17,
    fontWeight: '800',
  },
  email: {
    marginTop: 3,
    color: '#1B5E73',
    fontSize: 14,
    fontWeight: '700',
  },
  address: {
    marginTop: 8,
    color: '#667085',
    fontSize: 14,
    lineHeight: 20,
  },
});

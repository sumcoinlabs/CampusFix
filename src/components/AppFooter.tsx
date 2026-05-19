import React from 'react';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppState } from '../context/AppStateContext';

export function AppFooter() {
  const { currentUser, logout } = useAppState();

  if (!currentUser) {
    return null;
  }

  function signOut() {
    logout();
    router.replace('/' as never);
  }

  const isStaff = currentUser.role === 'staff';

  return (
    <View style={styles.footer}>
      <Text style={styles.roleLabel}>
        Signed in as {currentUser.name} • {isStaff ? 'Staff Admin' : 'Resident'}
      </Text>

      <Pressable style={styles.logoutButton} onPress={signOut}>
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 26,
    paddingTop: 18,
    borderTopColor: '#e2e8f0',
    borderTopWidth: 1,
  },
  roleLabel: {
    color: '#64748b',
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
  },
  logoutButton: {
    backgroundColor: '#fee2e2',
    borderColor: '#fecaca',
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
  },
  logoutText: {
    color: '#b91c1c',
    fontWeight: '900',
    fontSize: 15,
  },
});

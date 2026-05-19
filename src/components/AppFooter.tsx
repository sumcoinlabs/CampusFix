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

      <View style={styles.navGrid}>
        <Pressable style={styles.navButton} onPress={() => router.push('/dashboard' as never)}>
          <Text style={styles.navText}>Dashboard</Text>
        </Pressable>

        {!isStaff ? (
          <Pressable style={styles.navButton} onPress={() => router.push('/report' as never)}>
            <Text style={styles.navText}>Report</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.navButton} onPress={() => router.push('/staff' as never)}>
            <Text style={styles.navText}>Staff Queue</Text>
          </Pressable>
        )}

        <Pressable style={styles.navButton} onPress={() => router.push('/requests' as never)}>
          <Text style={styles.navText}>Requests</Text>
        </Pressable>

        <Pressable style={styles.navButton} onPress={() => router.push('/walkthrough' as never)}>
          <Text style={styles.navText}>Walkthrough</Text>
        </Pressable>

        <Pressable style={styles.logoutButton} onPress={signOut}>
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </View>
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
  navGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  navButton: {
    flexGrow: 1,
    minWidth: '45%',
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 14,
    padding: 13,
    alignItems: 'center',
  },
  navText: {
    color: '#334155',
    fontWeight: '900',
  },
  logoutButton: {
    flexGrow: 1,
    minWidth: '45%',
    backgroundColor: '#fee2e2',
    borderColor: '#fecaca',
    borderWidth: 1,
    borderRadius: 14,
    padding: 13,
    alignItems: 'center',
  },
  logoutText: {
    color: '#b91c1c',
    fontWeight: '900',
  },
});

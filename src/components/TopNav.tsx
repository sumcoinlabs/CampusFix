import React from 'react';
import { router, usePathname } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAppState } from '../context/AppStateContext';

type NavItem = {
  label: string;
  route: string;
  primary?: boolean;
};

export function TopNav() {
  const { currentUser, logout } = useAppState();
  const pathname = usePathname();

  if (!currentUser) {
    return null;
  }

  const isStaff = currentUser.role === 'staff';

  function signOut() {
    logout();
    router.replace('/' as never);
  }

  const navItems: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard' },
    isStaff
      ? { label: 'Staff Queue', route: '/staff' }
      : { label: 'New Request', route: '/report' },
    { label: 'Requests', route: '/requests' },
    { label: 'Walkthrough', route: '/walkthrough' },
    { label: 'Activity', route: '/activity' },
  ];

  function isActive(route: string) {
    if (route === '/dashboard') {
      return pathname === '/dashboard';
    }

    if (route === '/report') {
      return pathname === '/report' || pathname === '/duplicate' || pathname === '/confirmation';
    }

    if (route === '/requests') {
      return pathname === '/requests' || pathname === '/request-detail';
    }

    return pathname === route;
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.navRow}
      >
        {navItems.map((item) => {
          const active = isActive(item.route);

          return (
            <Pressable
              key={item.route}
              style={[
                styles.navButton,
                active && styles.activeButton,
              ]}
              onPress={() => router.push(item.route as never)}
            >
              <Text
                style={[
                  styles.navText,
                  active && styles.activeText,
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}

        <Pressable style={styles.logoutButton} onPress={signOut}>
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </ScrollView>

      <View style={styles.roleCard}>
        <Text style={styles.roleTitle}>Current Role</Text>
        <Text style={styles.roleText}>
          You are signed in as {currentUser.name} in the {isStaff ? 'Staff Admin' : 'Resident'} workspace.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  navRow: {
    gap: 8,
    paddingBottom: 12,
  },
  navButton: {
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  navText: {
    color: '#334155',
    fontWeight: '900',
    fontSize: 13,
  },
  activeButton: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  activeText: {
    color: '#ffffff',
  },
  logoutButton: {
    backgroundColor: '#fee2e2',
    borderColor: '#fecaca',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  logoutText: {
    color: '#b91c1c',
    fontWeight: '900',
    fontSize: 13,
  },
  roleCard: {
    backgroundColor: '#eff6ff',
    borderColor: '#bfdbfe',
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
  },
  roleTitle: {
    color: '#1d4ed8',
    fontWeight: '900',
    fontSize: 15,
  },
  roleText: {
    color: '#334155',
    marginTop: 4,
    fontWeight: '700',
    lineHeight: 20,
  },
});

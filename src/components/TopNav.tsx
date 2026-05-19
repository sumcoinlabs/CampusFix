import React from 'react';
import { router, usePathname } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAppState } from '../context/AppStateContext';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme/design';

type NavItem = {
  label: string;
  route: string;
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
    { label: 'Demo Tools', route: '/demo-tools' },
    { label: 'Architecture', route: '/architecture' },
  ];

  function isActive(route: string) {
    if (route === '/dashboard') return pathname === '/dashboard';

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
      <View style={styles.navShell}>
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
                style={[styles.navItem, active && styles.navItemActive]}
                onPress={() => router.push(item.route as never)}
              >
                <Text style={[styles.navText, active && styles.navTextActive]}>
                  {item.label}
                </Text>
                {active ? <View style={styles.activeLine} /> : null}
              </Pressable>
            );
          })}
        </ScrollView>

        <Pressable style={styles.logoutAction} onPress={signOut}>
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </View>

      <View style={styles.roleStrip}>
        <Text style={styles.roleText}>
          {isStaff ? 'Staff Admin' : 'Resident'} workspace
        </Text>
        <Text style={styles.roleDivider}>•</Text>
        <Text style={styles.userText}>{currentUser.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.section,
  },
  navShell: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.xxl,
    padding: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  navRow: {
    gap: spacing.xs,
    alignItems: 'center',
    paddingRight: spacing.sm,
  },
  navItem: {
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    position: 'relative',
  },
  navItemActive: {
    backgroundColor: colors.blueSoft,
  },
  navText: {
    color: colors.textMuted,
    fontWeight: fontWeight.black,
    fontSize: fontSize.sm,
  },
  navTextActive: {
    color: colors.blueText,
  },
  activeLine: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    bottom: 4,
    height: 3,
    borderRadius: radius.pill,
    backgroundColor: colors.blue,
  },
  logoutAction: {
    backgroundColor: colors.redSoft,
    borderColor: colors.redBorder,
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  logoutText: {
    color: colors.redText,
    fontWeight: fontWeight.black,
    fontSize: fontSize.sm,
  },
  roleStrip: {
    marginTop: spacing.sm,
    backgroundColor: colors.page,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  roleText: {
    color: colors.blueText,
    fontWeight: fontWeight.black,
    fontSize: fontSize.sm,
  },
  roleDivider: {
    color: colors.textLight,
    fontWeight: fontWeight.black,
  },
  userText: {
    color: colors.textMuted,
    fontWeight: fontWeight.bold,
    fontSize: fontSize.sm,
  },
});

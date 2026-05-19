import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UserRole } from '../types';

type Props = {
  role: UserRole;
};

export function RoleBanner({ role }: Props) {
  const isStaff = role === 'staff';

  return (
    <View style={[styles.banner, isStaff ? styles.staff : styles.resident]}>
      <Text style={styles.label}>{isStaff ? 'Staff Workspace' : 'Resident Workspace'}</Text>
      <Text style={styles.text}>
        {isStaff
          ? 'Manage incoming requests, assignments, internal notes, and public updates.'
          : 'Submit issues, follow existing reports, and track status updates.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  staff: {
    backgroundColor: '#ecfeff',
    borderColor: '#67e8f9',
  },
  resident: {
    backgroundColor: '#eff6ff',
    borderColor: '#bfdbfe',
  },
  label: {
    fontWeight: '900',
    color: '#0f172a',
    fontSize: 16,
  },
  text: {
    marginTop: 5,
    color: '#334155',
    lineHeight: 20,
  },
});

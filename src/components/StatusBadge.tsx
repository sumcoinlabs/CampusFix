import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { RequestStatus } from '../types';

type Props = {
  status: RequestStatus;
};

export function StatusBadge({ status }: Props) {
  const style =
    status === 'Resolved'
      ? styles.resolved
      : status === 'In Progress'
      ? styles.progress
      : status === 'Assigned'
      ? styles.assigned
      : styles.submitted;

  return (
    <View style={[styles.badge, style]}>
      <Text style={styles.text}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  submitted: {
    backgroundColor: '#64748b',
  },
  assigned: {
    backgroundColor: '#2563eb',
  },
  progress: {
    backgroundColor: '#d97706',
  },
  resolved: {
    backgroundColor: '#16a34a',
  },
});

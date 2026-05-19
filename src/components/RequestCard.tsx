import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CampusRequest } from '../types';
import { StatusBadge } from './StatusBadge';

type Props = {
  request: CampusRequest;
  onPress?: () => void;
};

export function RequestCard({ request, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.topRow}>
        <Text style={styles.id}>{request.id}</Text>
        <StatusBadge status={request.status} />
      </View>

      <Text style={styles.title}>{request.title}</Text>
      <Text style={styles.meta}>{request.category} • {request.location}</Text>
      <Text style={styles.description}>{request.description}</Text>

      <View style={styles.bottomRow}>
        <Text style={styles.small}>Priority: {request.priority}</Text>
        <Text style={styles.small}>{request.followers} following</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  id: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748b',
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  meta: {
    marginTop: 5,
    fontSize: 14,
    color: '#475569',
    fontWeight: '600',
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
  bottomRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  small: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '600',
  },
});

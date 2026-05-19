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

      <View style={styles.detailGrid}>
        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>Priority</Text>
          <Text style={styles.detailValue}>{request.priority}</Text>
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>Assigned</Text>
          <Text style={styles.detailValue}>{request.assignee}</Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <Text style={styles.small}>{request.followers} following</Text>
        <Text style={styles.small}>Target: {request.targetResolution}</Text>
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
    fontWeight: '900',
    color: '#111827',
  },
  meta: {
    marginTop: 5,
    fontSize: 14,
    color: '#475569',
    fontWeight: '700',
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
  detailGrid: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 10,
  },
  detailBox: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    padding: 10,
  },
  detailLabel: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  detailValue: {
    color: '#111827',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 3,
  },
  bottomRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  small: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '700',
  },
});

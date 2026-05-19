import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBadge } from '../components/StatusBadge';
import { useAppState } from '../context/AppStateContext';
import { UserRole } from '../types';

export default function RequestDetailScreen() {
  const { id, role } = useLocalSearchParams<{ id?: string; role?: UserRole }>();
  const {
    requests,
    assignToMe,
    updateStatus,
    addPublicUpdate,
    addInternalNote,
  } = useAppState();

  const request = requests.find((item) => item.id === id) || requests[0];
  const isStaff = role === 'staff';

  if (!request) {
    return (
      <View style={styles.empty}>
        <Text>No request found.</Text>
      </View>
    );
  }

  const publicUpdates = request.updates.filter((update) => update.visibility === 'Public');
  const internalUpdates = request.updates.filter((update) => update.visibility === 'Internal');

  function staffAction(action: 'assign' | 'progress' | 'resolved' | 'public' | 'internal') {
    if (action === 'assign') assignToMe(request.id);
    if (action === 'progress') updateStatus(request.id, 'In Progress');
    if (action === 'resolved') updateStatus(request.id, 'Resolved');
    if (action === 'public') addPublicUpdate(request.id, 'Facilities posted a new public progress update.');
    if (action === 'internal') addInternalNote(request.id, 'Internal staff note added for coordination.');
    router.replace({ pathname: '/request-detail', params: { id: request.id, role: 'staff' } } as never);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.id}>{request.id}</Text>
      <Text style={styles.heading}>{request.title}</Text>

      <View style={styles.statusRow}>
        <StatusBadge status={request.status} />
        <Text style={styles.priority}>{request.priority} Priority</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Category</Text>
        <Text style={styles.value}>{request.category}</Text>
        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>{request.location}</Text>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{request.description}</Text>
        <Text style={styles.label}>Assigned To</Text>
        <Text style={styles.value}>{request.assignee}</Text>
        <Text style={styles.label}>Target Resolution</Text>
        <Text style={styles.value}>{request.targetResolution}</Text>
      </View>

      {isStaff ? (
        <View style={styles.actions}>
          <Text style={styles.actionsTitle}>Functional Staff Actions</Text>
          <View style={styles.actionGrid}>
            <Pressable style={styles.actionButton} onPress={() => staffAction('assign')}><Text style={styles.actionText}>Assign to Me</Text></Pressable>
            <Pressable style={styles.actionButton} onPress={() => staffAction('progress')}><Text style={styles.actionText}>Mark In Progress</Text></Pressable>
            <Pressable style={styles.actionButton} onPress={() => staffAction('public')}><Text style={styles.actionText}>Post Public Update</Text></Pressable>
            <Pressable style={styles.actionButton} onPress={() => staffAction('internal')}><Text style={styles.actionText}>Add Internal Note</Text></Pressable>
            <Pressable style={styles.resolveButton} onPress={() => staffAction('resolved')}><Text style={styles.resolveText}>Mark Resolved</Text></Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.followBox}>
          <Text style={styles.followTitle}>{request.followers} people are following this request</Text>
          <Text style={styles.followText}>Public users see public updates only.</Text>
        </View>
      )}

      <View style={styles.updatesBox}>
        <Text style={styles.timelineTitle}>Public Updates</Text>
        {publicUpdates.map((update) => (
          <View key={update.id} style={styles.updateItem}>
            <Text style={styles.updateMeta}>{update.author} • {update.createdAt}</Text>
            <Text style={styles.updateText}>{update.message}</Text>
          </View>
        ))}
      </View>

      {isStaff ? (
        <View style={styles.internalBox}>
          <Text style={styles.internalTitle}>Internal Staff Notes</Text>
          {internalUpdates.length ? internalUpdates.map((update) => (
            <View key={update.id} style={styles.updateItem}>
              <Text style={styles.updateMeta}>{update.author} • {update.createdAt}</Text>
              <Text style={styles.updateText}>{update.message}</Text>
            </View>
          )) : <Text style={styles.updateText}>No internal notes yet.</Text>}
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  empty: { padding: 20 },
  container: { padding: 20, paddingBottom: 40 },
  id: { color: '#64748b', fontWeight: '900', fontSize: 13 },
  heading: { marginTop: 6, fontSize: 28, fontWeight: '900', color: '#111827', lineHeight: 34 },
  statusRow: { marginTop: 14, flexDirection: 'row', alignItems: 'center', gap: 10 },
  priority: { color: '#334155', fontWeight: '800' },
  card: { marginTop: 20, backgroundColor: '#ffffff', borderRadius: 20, padding: 18, borderColor: '#e5e7eb', borderWidth: 1 },
  label: { color: '#64748b', fontSize: 12, fontWeight: '900', textTransform: 'uppercase', marginTop: 12 },
  value: { color: '#111827', fontSize: 16, fontWeight: '700', marginTop: 4, lineHeight: 22 },
  actions: { marginTop: 18, backgroundColor: '#ecfeff', borderRadius: 20, padding: 18, borderColor: '#67e8f9', borderWidth: 1 },
  actionsTitle: { fontSize: 18, fontWeight: '900', color: '#164e63', marginBottom: 12 },
  actionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  actionButton: { width: '48%', backgroundColor: '#ffffff', borderColor: '#a5f3fc', borderWidth: 1, borderRadius: 14, padding: 12 },
  actionText: { color: '#155e75', fontWeight: '900', textAlign: 'center' },
  resolveButton: { width: '100%', backgroundColor: '#16a34a', borderRadius: 14, padding: 12 },
  resolveText: { color: '#ffffff', fontWeight: '900', textAlign: 'center' },
  followBox: { marginTop: 18, backgroundColor: '#eff6ff', borderRadius: 20, padding: 18, borderColor: '#bfdbfe', borderWidth: 1 },
  followTitle: { color: '#1d4ed8', fontWeight: '900', fontSize: 16 },
  followText: { marginTop: 6, color: '#334155', lineHeight: 21 },
  timelineTitle: { fontWeight: '900', color: '#111827', fontSize: 18, marginBottom: 10 },
  updatesBox: { marginTop: 18, backgroundColor: '#ffffff', borderRadius: 20, padding: 18, borderColor: '#e5e7eb', borderWidth: 1 },
  internalBox: { marginTop: 18, backgroundColor: '#fff7ed', borderRadius: 20, padding: 18, borderColor: '#fed7aa', borderWidth: 1 },
  internalTitle: { color: '#9a3412', fontWeight: '900', fontSize: 18, marginBottom: 10 },
  updateItem: { paddingTop: 10, borderTopColor: '#e5e7eb', borderTopWidth: 1, marginTop: 10 },
  updateMeta: { color: '#64748b', fontWeight: '900', fontSize: 12 },
  updateText: { color: '#334155', marginTop: 5, lineHeight: 21, fontWeight: '700' },
});

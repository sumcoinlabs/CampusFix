import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBadge } from '../components/StatusBadge';
import { useAppState } from '../context/AppStateContext';
import { UserRole } from '../types';
import { AppFooter } from '../components/AppFooter';
import { PageBrand } from '../components/PageBrand';

export default function RequestDetailScreen() {
  const { id, role } = useLocalSearchParams<{ id?: string; role?: UserRole }>();
  const {
    requests,
    assignToMe,
    updateStatus,
    addPublicUpdate,
    addInternalNote,
  } = useAppState();

  const [publicMessage, setPublicMessage] = useState('');
  const [internalMessage, setInternalMessage] = useState('');
  const [lastAction, setLastAction] = useState('');

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

  function refreshStaffDetail() {
    router.replace({
      pathname: '/request-detail',
      params: { id: request.id, role: 'staff' },
    } as never);
  }

  function handleAssign() {
    assignToMe(request.id);
    setLastAction('Request assigned to you.');
    refreshStaffDetail();
  }

  function handleProgress() {
    updateStatus(request.id, 'In Progress');
    setLastAction('Request marked in progress.');
    refreshStaffDetail();
  }

  function handleResolved() {
    updateStatus(request.id, 'Resolved');
    setLastAction('Request marked resolved.');
    refreshStaffDetail();
  }

  function handlePublicUpdate() {
    const cleanMessage = publicMessage.trim();

    if (!cleanMessage) {
      setLastAction('Type a public update before posting.');
      return;
    }

    addPublicUpdate(request.id, cleanMessage);
    setPublicMessage('');
    setLastAction('Public update posted.');
    refreshStaffDetail();
  }

  function handleInternalNote() {
    const cleanMessage = internalMessage.trim();

    if (!cleanMessage) {
      setLastAction('Type an internal note before adding.');
      return;
    }

    addInternalNote(request.id, cleanMessage);
    setInternalMessage('');
    setLastAction('Internal staff note added.');
    refreshStaffDetail();
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageBrand title="Request Detail" subtitle="View request information, updates, notes, and staff actions." />
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
          <Text style={styles.actionsTitle}>Staff Actions</Text>

          {lastAction ? (
            <View style={styles.actionNotice}>
              <Text style={styles.actionNoticeText}>{lastAction}</Text>
            </View>
          ) : null}

          <View style={styles.actionGrid}>
            <Pressable style={styles.actionButton} onPress={handleAssign}>
              <Text style={styles.actionText}>Assign to Me</Text>
            </Pressable>

            <Pressable style={styles.actionButton} onPress={handleProgress}>
              <Text style={styles.actionText}>Mark In Progress</Text>
            </Pressable>

            <Pressable style={styles.resolveButton} onPress={handleResolved}>
              <Text style={styles.resolveText}>Mark Resolved</Text>
            </Pressable>
          </View>

          <View style={styles.updateComposer}>
            <Text style={styles.composerTitle}>Post Public Update</Text>
            <Text style={styles.composerHelp}>
              Visible to residents following this request.
            </Text>
            <TextInput
              style={styles.textArea}
              multiline
              value={publicMessage}
              onChangeText={setPublicMessage}
              placeholder="Example: Maintenance is on site and replacement parts have been ordered."
            />
            <Pressable style={styles.composerButton} onPress={handlePublicUpdate}>
              <Text style={styles.composerButtonText}>Post Public Update</Text>
            </Pressable>
          </View>

          <View style={styles.updateComposer}>
            <Text style={styles.composerTitle}>Add Internal Note</Text>
            <Text style={styles.composerHelp}>
              Staff-only note for coordination and follow-up.
            </Text>
            <TextInput
              style={styles.textArea}
              multiline
              value={internalMessage}
              onChangeText={setInternalMessage}
              placeholder="Example: Call vendor before 3 PM. Check shutoff valve near room 614."
            />
            <Pressable style={styles.internalButton} onPress={handleInternalNote}>
              <Text style={styles.internalButtonText}>Add Internal Note</Text>
            </Pressable>
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
          {internalUpdates.length ? (
            internalUpdates.map((update) => (
              <View key={update.id} style={styles.updateItem}>
                <Text style={styles.updateMeta}>{update.author} • {update.createdAt}</Text>
                <Text style={styles.updateText}>{update.message}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.updateText}>No internal notes yet.</Text>
          )}
        </View>
      ) : null}
          <AppFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  empty: {
    padding: 20,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  id: {
    color: '#64748b',
    fontWeight: '900',
    fontSize: 13,
  },
  heading: {
    marginTop: 6,
    fontSize: 28,
    fontWeight: '900',
    color: '#111827',
    lineHeight: 34,
  },
  statusRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  priority: {
    color: '#334155',
    fontWeight: '800',
  },
  card: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    borderColor: '#e5e7eb',
    borderWidth: 1,
  },
  label: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    marginTop: 12,
  },
  value: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
    lineHeight: 22,
  },
  actions: {
    marginTop: 18,
    backgroundColor: '#ecfeff',
    borderRadius: 20,
    padding: 18,
    borderColor: '#67e8f9',
    borderWidth: 1,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#164e63',
    marginBottom: 12,
  },
  actionNotice: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderColor: '#a5f3fc',
    borderWidth: 1,
  },
  actionNoticeText: {
    color: '#155e75',
    fontWeight: '900',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderColor: '#a5f3fc',
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
  },
  actionText: {
    color: '#155e75',
    fontWeight: '900',
    textAlign: 'center',
  },
  resolveButton: {
    width: '100%',
    backgroundColor: '#16a34a',
    borderRadius: 14,
    padding: 12,
  },
  resolveText: {
    color: '#ffffff',
    fontWeight: '900',
    textAlign: 'center',
  },
  updateComposer: {
    marginTop: 16,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 14,
    borderColor: '#a5f3fc',
    borderWidth: 1,
  },
  composerTitle: {
    color: '#164e63',
    fontWeight: '900',
    fontSize: 16,
  },
  composerHelp: {
    color: '#475569',
    marginTop: 4,
    marginBottom: 10,
    fontWeight: '700',
  },
  textArea: {
    minHeight: 90,
    backgroundColor: '#f8fafc',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    fontSize: 15,
    color: '#111827',
    textAlignVertical: 'top',
  },
  composerButton: {
    marginTop: 10,
    backgroundColor: '#2563eb',
    borderRadius: 14,
    padding: 13,
    alignItems: 'center',
  },
  composerButtonText: {
    color: '#ffffff',
    fontWeight: '900',
  },
  internalButton: {
    marginTop: 10,
    backgroundColor: '#0f172a',
    borderRadius: 14,
    padding: 13,
    alignItems: 'center',
  },
  internalButtonText: {
    color: '#ffffff',
    fontWeight: '900',
  },
  followBox: {
    marginTop: 18,
    backgroundColor: '#eff6ff',
    borderRadius: 20,
    padding: 18,
    borderColor: '#bfdbfe',
    borderWidth: 1,
  },
  followTitle: {
    color: '#1d4ed8',
    fontWeight: '900',
    fontSize: 16,
  },
  followText: {
    marginTop: 6,
    color: '#334155',
    lineHeight: 21,
  },
  timelineTitle: {
    fontWeight: '900',
    color: '#111827',
    fontSize: 18,
    marginBottom: 10,
  },
  updatesBox: {
    marginTop: 18,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    borderColor: '#e5e7eb',
    borderWidth: 1,
  },
  internalBox: {
    marginTop: 18,
    backgroundColor: '#fff7ed',
    borderRadius: 20,
    padding: 18,
    borderColor: '#fed7aa',
    borderWidth: 1,
  },
  internalTitle: {
    color: '#9a3412',
    fontWeight: '900',
    fontSize: 18,
    marginBottom: 10,
  },
  updateItem: {
    paddingTop: 10,
    borderTopColor: '#e5e7eb',
    borderTopWidth: 1,
    marginTop: 10,
  },
  updateMeta: {
    color: '#64748b',
    fontWeight: '900',
    fontSize: 12,
  },
  updateText: {
    color: '#334155',
    marginTop: 5,
    lineHeight: 21,
    fontWeight: '700',
  },
});

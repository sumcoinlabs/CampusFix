import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { mockRequests } from '../data/mockRequests';
import { StatusBadge } from '../components/StatusBadge';

export default function RequestDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const request = mockRequests.find((item) => item.id === id) || mockRequests[0];

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

        <Text style={styles.label}>Reported By</Text>
        <Text style={styles.value}>{request.reportedBy}</Text>
      </View>

      <View style={styles.timeline}>
        <Text style={styles.timelineTitle}>Status Timeline</Text>
        <Text style={styles.timelineItem}>✓ Submitted by campus user</Text>
        <Text style={styles.timelineItem}>✓ Routed to Facilities</Text>
        <Text style={styles.timelineItem}>• Assigned to maintenance staff</Text>
        <Text style={styles.timelineItemMuted}>• Resolution update pending</Text>
      </View>

      <View style={styles.note}>
        <Text style={styles.noteTitle}>Demo Feature</Text>
        <Text style={styles.noteText}>
          {request.followers} people are following this request instead of creating duplicate reports.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  timeline: {
    marginTop: 18,
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    padding: 18,
    borderColor: '#e2e8f0',
    borderWidth: 1,
  },
  timelineTitle: {
    fontWeight: '900',
    color: '#111827',
    fontSize: 18,
    marginBottom: 10,
  },
  timelineItem: {
    color: '#334155',
    fontWeight: '700',
    marginTop: 8,
  },
  timelineItemMuted: {
    color: '#94a3b8',
    fontWeight: '700',
    marginTop: 8,
  },
  note: {
    marginTop: 18,
    backgroundColor: '#eff6ff',
    borderRadius: 20,
    padding: 18,
    borderColor: '#bfdbfe',
    borderWidth: 1,
  },
  noteTitle: {
    color: '#1d4ed8',
    fontWeight: '900',
    fontSize: 16,
  },
  noteText: {
    marginTop: 6,
    color: '#334155',
    lineHeight: 21,
  },
});

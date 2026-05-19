import React from 'react';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { mockRequests } from '../data/mockRequests';
import { RequestCard } from '../components/RequestCard';

export default function StaffQueueScreen() {
  const openRequests = mockRequests.filter((request) => request.status !== 'Resolved');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Staff Queue</Text>
      <Text style={styles.subheading}>
        A simple work-order view for maintenance staff to prioritize and update requests.
      </Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>2</Text>
          <Text style={styles.statLabel}>Open</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>1</Text>
          <Text style={styles.statLabel}>High Priority</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
      </View>

      {openRequests.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          onPress={() => router.push({ pathname: '/request-detail', params: { id: request.id } })}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111827',
  },
  subheading: {
    marginTop: 8,
    marginBottom: 18,
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: '#2563eb',
  },
  statLabel: {
    marginTop: 3,
    color: '#64748b',
    fontWeight: '800',
    fontSize: 12,
  },
});

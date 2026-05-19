import React, { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RequestCard } from '../components/RequestCard';
import { useAppState } from '../context/AppStateContext';
import { AppFooter } from '../components/AppFooter';
import { PageBrand } from '../components/PageBrand';

const filters = ['All', 'High Priority', 'Assigned', 'New', 'Resolved'];

export default function StaffQueueScreen() {
  const { requests } = useAppState();
  const [filter, setFilter] = useState('All');

  const filtered = requests.filter((request) => {
    if (filter === 'High Priority') return request.priority === 'High';
    if (filter === 'Assigned') return request.status === 'Assigned' || request.status === 'In Progress';
    if (filter === 'New') return request.status === 'Submitted';
    if (filter === 'Resolved') return request.status === 'Resolved';
    return true;
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageBrand title="Staff Queue" subtitle="Review, assign, update, and resolve incoming work orders." />
      <Text style={styles.heading}>Staff Queue</Text>
      <Text style={styles.subheading}>
        Staff actions on request detail now update local app state.
      </Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{requests.filter((r) => r.status !== 'Resolved').length}</Text>
          <Text style={styles.statLabel}>Open</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{requests.filter((r) => r.priority === 'High').length}</Text>
          <Text style={styles.statLabel}>High Priority</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{requests.reduce((sum, r) => sum + r.followers, 0)}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
        {filters.map((item) => (
          <Pressable key={item} style={[styles.filterChip, filter === item && styles.filterChipActive]} onPress={() => setFilter(item)}>
            <Text style={[styles.filterText, filter === item && styles.filterTextActive]}>{item}</Text>
          </Pressable>
        ))}
            <AppFooter />
    </ScrollView>

      {filtered.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          onPress={() => router.push({ pathname: '/request-detail', params: { id: request.id, role: 'staff' } } as never)}
        />
      ))}
          <AppFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  heading: { fontSize: 28, fontWeight: '900', color: '#111827' },
  subheading: { marginTop: 8, marginBottom: 18, fontSize: 15, color: '#475569', lineHeight: 22 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 18 },
  statCard: { flex: 1, backgroundColor: '#ffffff', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: '#e5e7eb' },
  statNumber: { fontSize: 24, fontWeight: '900', color: '#2563eb' },
  statLabel: { marginTop: 3, color: '#64748b', fontWeight: '800', fontSize: 12 },
  filterRow: { gap: 8, paddingBottom: 14 },
  filterChip: { backgroundColor: '#ffffff', borderColor: '#e5e7eb', borderWidth: 1, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 9 },
  filterChipActive: { backgroundColor: '#0f172a', borderColor: '#0f172a' },
  filterText: { color: '#334155', fontWeight: '800' },
  filterTextActive: { color: '#ffffff' },
});

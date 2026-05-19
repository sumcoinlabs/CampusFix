import React, { useState } from 'react';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppFooter } from '../components/AppFooter';
import { PageBrand } from '../components/PageBrand';
import { RequestCard } from '../components/RequestCard';
import { PriorityFilter, RequestFilters, StatusFilter } from '../components/RequestFilters';
import { useAppState } from '../context/AppStateContext';
import { filterRequests } from '../utils/filterRequests';

export default function StaffQueueScreen() {
  const { requests } = useAppState();
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('All');

  const filteredRequests = filterRequests(requests, searchText, statusFilter, priorityFilter);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageBrand
        title="Staff Queue"
        subtitle="Review, assign, update, and resolve incoming work orders."
      />

      <Text style={styles.heading}>Staff Queue</Text>
      <Text style={styles.subheading}>
        Search and filter active work orders, then open a request to assign, update, or resolve it.
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

      <RequestFilters
        searchText={searchText}
        setSearchText={setSearchText}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        resultCount={filteredRequests.length}
      />

      {filteredRequests.length ? (
        filteredRequests.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            onPress={() =>
              router.push({
                pathname: '/request-detail',
                params: { id: request.id, role: 'staff' },
              } as never)
            }
          />
        ))
      ) : (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>No matching work orders</Text>
          <Text style={styles.emptyText}>Try clearing the search text or changing the filters.</Text>
        </View>
      )}

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
  emptyBox: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 18,
    borderColor: '#e5e7eb',
    borderWidth: 1,
    marginBottom: 16,
  },
  emptyTitle: {
    color: '#111827',
    fontWeight: '900',
    fontSize: 17,
  },
  emptyText: {
    color: '#64748b',
    marginTop: 6,
    fontWeight: '700',
    lineHeight: 20,
  },
});

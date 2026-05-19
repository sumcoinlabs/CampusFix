import React, { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppFooter } from '../components/AppFooter';
import { PageBrand } from '../components/PageBrand';
import { RequestCard } from '../components/RequestCard';
import { PriorityFilter, RequestFilters, StatusFilter } from '../components/RequestFilters';
import { useAppState } from '../context/AppStateContext';
import { filterRequests } from '../utils/filterRequests';
import { TopNav } from '../components/TopNav';
import { StateMessage } from '../components/StateMessage';

export default function MyRequestsScreen() {
  const { requests } = useAppState();
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('All');

  const filteredRequests = filterRequests(requests, searchText, statusFilter, priorityFilter);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TopNav />
      <PageBrand
        title="My Requests"
        subtitle="Track submitted and followed requests with public updates."
      />

      <Text style={styles.heading}>My Requests</Text>
      <Text style={styles.subheading}>
        This list updates when you submit or follow a request.
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>{requests.length} Local Requests</Text>
        <Text style={styles.infoText}>Data persists locally on this device/browser.</Text>
      </View>

      <Pressable style={styles.createButton} onPress={() => router.push('/report' as never)}>
        <Text style={styles.createButtonText}>Create New Request</Text>
      </Pressable>

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
                params: { id: request.id, role: 'resident' },
              } as never)
            }
          />
        ))
      ) : (
        <StateMessage
          title="No matching requests"
          message="Try clearing the search text or changing the filters."
          variant="empty"
        />
      )}

      <AppFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  heading: { fontSize: 28, fontWeight: '900', color: '#111827' },
  subheading: { marginTop: 8, marginBottom: 16, fontSize: 15, color: '#475569', lineHeight: 22 },
  infoBox: { backgroundColor: '#eff6ff', borderColor: '#bfdbfe', borderWidth: 1, borderRadius: 18, padding: 16, marginBottom: 18 },
  infoTitle: { color: '#1d4ed8', fontWeight: '900', fontSize: 16 },
  infoText: { color: '#334155', marginTop: 6, lineHeight: 20 },
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
  createButton: {
    backgroundColor: '#2563eb',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
  },
  emptyText: {
    color: '#64748b',
    marginTop: 6,
    fontWeight: '700',
    lineHeight: 20,
  },
});

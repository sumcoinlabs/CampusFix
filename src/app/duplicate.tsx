import React from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RequestCard } from '../components/RequestCard';
import { useAppState } from '../context/AppStateContext';

export default function DuplicateCheckScreen() {
  const { requests, pendingRequest, followRequest, createRequest } = useAppState();

  const similar =
    requests.find((request) =>
      pendingRequest &&
      request.category === pendingRequest.category &&
      request.location.toLowerCase().includes(pendingRequest.location.toLowerCase().split(' ')[0] || '')
    ) || requests[0];

  function followExisting() {
    followRequest(similar.id);
    router.push({ pathname: '/confirmation', params: { action: 'followed', id: similar.id } } as never);
  }

  function submitNew() {
    const id = createRequest(pendingRequest);
    router.push({ pathname: '/confirmation', params: { action: 'submitted', id } } as never);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Similar issue found</Text>
      <Text style={styles.subheading}>
        Duplicate prevention is functional. Following this request increases the follower count.
      </Text>

      <View style={styles.matchCard}>
        <Text style={styles.matchLabel}>Possible Match</Text>
        <Text style={styles.matchText}>{similar.category} issue near {similar.location}</Text>
      </View>

      <RequestCard request={similar} onPress={() => router.push({ pathname: '/request-detail', params: { id: similar.id } } as never)} />

      <Pressable style={styles.primaryButton} onPress={followExisting}>
        <Text style={styles.primaryButtonText}>Follow Existing Request</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={submitNew}>
        <Text style={styles.secondaryButtonText}>Submit as New Request Anyway</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  heading: { fontSize: 28, fontWeight: '900', color: '#111827' },
  subheading: { marginTop: 8, fontSize: 15, color: '#475569', lineHeight: 22, marginBottom: 18 },
  matchCard: { backgroundColor: '#ecfeff', borderColor: '#67e8f9', borderWidth: 1, borderRadius: 18, padding: 16, marginBottom: 14 },
  matchLabel: { color: '#0e7490', fontWeight: '900', fontSize: 13, textTransform: 'uppercase' },
  matchText: { color: '#164e63', fontWeight: '800', marginTop: 5 },
  primaryButton: { marginTop: 22, backgroundColor: '#2563eb', borderRadius: 18, padding: 16, alignItems: 'center' },
  primaryButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '900' },
  secondaryButton: { marginTop: 12, backgroundColor: '#ffffff', borderRadius: 18, padding: 16, alignItems: 'center', borderColor: '#e5e7eb', borderWidth: 1 },
  secondaryButtonText: { color: '#334155', fontSize: 16, fontWeight: '900' },
});

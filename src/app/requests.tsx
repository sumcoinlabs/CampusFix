import React from 'react';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { RequestCard } from '../components/RequestCard';
import { useAppState } from '../context/AppStateContext';
import { AppFooter } from '../components/AppFooter';

export default function MyRequestsScreen() {
  const { requests } = useAppState();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>My Requests</Text>
      <Text style={styles.subheading}>
        This list updates when you submit or follow a request.
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>{requests.length} Local Requests</Text>
        <Text style={styles.infoText}>Data persists locally on this device/browser.</Text>
      </View>

      {requests.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          onPress={() => router.push({ pathname: '/request-detail', params: { id: request.id, role: 'resident' } } as never)}
        />
      ))}
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
});

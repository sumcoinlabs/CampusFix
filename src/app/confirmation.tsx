import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppFooter } from '../components/AppFooter';

export default function ConfirmationScreen() {
  const { action, id } = useLocalSearchParams<{ action?: string; id?: string }>();
  const followed = action === 'followed';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.successCircle}>
        <Text style={styles.check}>✓</Text>
      </View>

      <Text style={styles.heading}>{followed ? 'Following request' : 'Request submitted'}</Text>
      <Text style={styles.subheading}>
        {followed
          ? `Follower count increased for ${id}. You will see public updates in My Requests.`
          : `${id} was added to My Requests and the Staff Queue.`}
      </Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Functional Phase 1 Complete</Text>
        <Text style={styles.summaryItem}>✓ Data persists locally with AsyncStorage</Text>
        <Text style={styles.summaryItem}>✓ New requests update lists</Text>
        <Text style={styles.summaryItem}>✓ Staff actions update request state</Text>
        <Text style={styles.summaryItem}>✓ Public/internal updates are separated</Text>
      </View>

      <Pressable style={styles.primaryButton} onPress={() => router.push('/requests' as never)}>
        <Text style={styles.primaryButtonText}>View My Requests</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={() => router.push('/dashboard' as never)}>
        <Text style={styles.secondaryButtonText}>Back to Dashboard</Text>
      </Pressable>
          <AppFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40, alignItems: 'center' },
  successCircle: { height: 86, width: 86, borderRadius: 43, backgroundColor: '#16a34a', alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  check: { color: '#ffffff', fontWeight: '900', fontSize: 48 },
  heading: { marginTop: 24, fontSize: 28, fontWeight: '900', color: '#111827', textAlign: 'center' },
  subheading: { marginTop: 10, fontSize: 16, color: '#475569', lineHeight: 23, textAlign: 'center' },
  summaryCard: { marginTop: 24, width: '100%', backgroundColor: '#ffffff', borderRadius: 22, padding: 18, borderColor: '#e5e7eb', borderWidth: 1 },
  summaryTitle: { fontSize: 18, fontWeight: '900', color: '#111827', marginBottom: 8 },
  summaryItem: { color: '#334155', fontWeight: '700', marginTop: 8, lineHeight: 20 },
  primaryButton: { width: '100%', marginTop: 22, backgroundColor: '#2563eb', borderRadius: 18, padding: 16, alignItems: 'center' },
  primaryButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '900' },
  secondaryButton: { width: '100%', marginTop: 12, backgroundColor: '#ffffff', borderRadius: 18, padding: 16, alignItems: 'center', borderColor: '#e5e7eb', borderWidth: 1 },
  secondaryButtonText: { color: '#334155', fontSize: 16, fontWeight: '900' },
});

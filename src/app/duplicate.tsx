import React from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { mockRequests } from '../data/mockRequests';
import { RequestCard } from '../components/RequestCard';

export default function DuplicateCheckScreen() {
  const similar = mockRequests[0];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Similar issue found</Text>
      <Text style={styles.subheading}>
        CampusFix can reduce duplicate work orders by letting people follow an existing request.
      </Text>

      <RequestCard request={similar} onPress={() => router.push({ pathname: '/request-detail', params: { id: similar.id } })} />

      <View style={styles.explainer}>
        <Text style={styles.explainerTitle}>Why this matters</Text>
        <Text style={styles.explainerText}>
          Instead of creating five separate reports for the same broken lights, users can follow one request and receive updates.
          Staff gets cleaner data, and users know the issue is already being handled.
        </Text>
      </View>

      <Pressable style={styles.primaryButton} onPress={() => router.push('/requests')}>
        <Text style={styles.primaryButtonText}>Follow Existing Request</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={() => router.push('/requests')}>
        <Text style={styles.secondaryButtonText}>Submit as New Request Anyway</Text>
      </Pressable>
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
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
    marginBottom: 18,
  },
  explainer: {
    backgroundColor: '#fefce8',
    borderColor: '#fde68a',
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    marginTop: 4,
  },
  explainerTitle: {
    fontWeight: '900',
    color: '#854d0e',
    fontSize: 16,
  },
  explainerText: {
    marginTop: 6,
    color: '#713f12',
    lineHeight: 21,
  },
  primaryButton: {
    marginTop: 22,
    backgroundColor: '#2563eb',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
  },
  secondaryButton: {
    marginTop: 12,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    borderColor: '#e5e7eb',
    borderWidth: 1,
  },
  secondaryButtonText: {
    color: '#334155',
    fontSize: 16,
    fontWeight: '900',
  },
});

import React from 'react';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { mockRequests } from '../data/mockRequests';
import { RequestCard } from '../components/RequestCard';

export default function MyRequestsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>My Requests</Text>
      <Text style={styles.subheading}>
        Track request status from submission through resolution.
      </Text>

      {mockRequests.map((request) => (
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
});

import React from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RequestCard } from '../components/RequestCard';
import { useAppState } from '../context/AppStateContext';

function normalizeWords(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length >= 3 && !['the', 'and', 'for', 'near', 'floor', 'room'].includes(word));
}

function getDuplicateScore(newIssueLocation: string, existingLocation: string) {
  const newWords = normalizeWords(newIssueLocation);
  const existingWords = normalizeWords(existingLocation);

  if (!newWords.length || !existingWords.length) return 0;

  const matches = newWords.filter((word) => existingWords.includes(word));
  return matches.length / Math.max(newWords.length, existingWords.length);
}

export default function DuplicateCheckScreen() {
  const { requests, pendingRequest, followRequest, createRequest } = useAppState();

  const scoredMatches = requests
    .map((request) => {
      const categoryMatch = pendingRequest?.category === request.category;
      const locationScore = pendingRequest ? getDuplicateScore(pendingRequest.location, request.location) : 0;
      const score = categoryMatch ? locationScore : 0;

      return { request, score, categoryMatch, locationScore };
    })
    .filter((item) => item.score >= 0.5)
    .sort((a, b) => b.score - a.score);

  const bestMatch = scoredMatches[0];
  const hasStrongMatch = Boolean(bestMatch);

  function followExisting() {
    if (!bestMatch) return;

    followRequest(bestMatch.request.id);
    router.push({
      pathname: '/confirmation',
      params: { action: 'followed', id: bestMatch.request.id },
    } as never);
  }

  function submitNew() {
    const id = createRequest(pendingRequest);
    router.push({
      pathname: '/confirmation',
      params: { action: 'submitted', id },
    } as never);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>
        {hasStrongMatch ? 'Similar issue found' : 'No strong duplicate found'}
      </Text>

      <Text style={styles.subheading}>
        {hasStrongMatch
          ? 'CampusFix found an existing request with the same category and a close location match.'
          : 'No existing request appears to match this category and location closely enough.'}
      </Text>

      {pendingRequest ? (
        <View style={styles.pendingCard}>
          <Text style={styles.pendingLabel}>New Report</Text>
          <Text style={styles.pendingTitle}>{pendingRequest.title}</Text>
          <Text style={styles.pendingText}>{pendingRequest.category} • {pendingRequest.location}</Text>
          <Text style={styles.pendingText}>{pendingRequest.description}</Text>
        </View>
      ) : null}

      {hasStrongMatch ? (
        <>
          <View style={styles.matchCard}>
            <Text style={styles.matchLabel}>Possible Match</Text>
            <Text style={styles.matchText}>
              Category matched. Location similarity: {Math.round(bestMatch.score * 100)}%.
            </Text>
          </View>

          <RequestCard
            request={bestMatch.request}
            onPress={() =>
              router.push({
                pathname: '/request-detail',
                params: { id: bestMatch.request.id },
              } as never)
            }
          />

          <Pressable style={styles.primaryButton} onPress={followExisting}>
            <Text style={styles.primaryButtonText}>Follow Existing Request</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={submitNew}>
            <Text style={styles.secondaryButtonText}>Submit as New Request Anyway</Text>
          </Pressable>
        </>
      ) : (
        <>
          <View style={styles.noMatchCard}>
            <Text style={styles.noMatchTitle}>Ready to submit</Text>
            <Text style={styles.noMatchText}>
              This looks like a new issue, so it can be added to My Requests and the Staff Queue.
            </Text>
          </View>

          <Pressable style={styles.primaryButton} onPress={submitNew}>
            <Text style={styles.primaryButtonText}>Submit New Request</Text>
          </Pressable>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  heading: { fontSize: 28, fontWeight: '900', color: '#111827' },
  subheading: { marginTop: 8, fontSize: 15, color: '#475569', lineHeight: 22, marginBottom: 18 },
  pendingCard: { backgroundColor: '#ffffff', borderColor: '#e5e7eb', borderWidth: 1, borderRadius: 18, padding: 16, marginBottom: 14 },
  pendingLabel: { color: '#64748b', fontWeight: '900', fontSize: 12, textTransform: 'uppercase' },
  pendingTitle: { color: '#111827', fontWeight: '900', fontSize: 18, marginTop: 6 },
  pendingText: { color: '#334155', fontWeight: '700', marginTop: 6, lineHeight: 20 },
  matchCard: { backgroundColor: '#ecfeff', borderColor: '#67e8f9', borderWidth: 1, borderRadius: 18, padding: 16, marginBottom: 14 },
  matchLabel: { color: '#0e7490', fontWeight: '900', fontSize: 13, textTransform: 'uppercase' },
  matchText: { color: '#164e63', fontWeight: '800', marginTop: 5 },
  noMatchCard: { backgroundColor: '#f0fdf4', borderColor: '#86efac', borderWidth: 1, borderRadius: 18, padding: 16, marginBottom: 14 },
  noMatchTitle: { color: '#166534', fontWeight: '900', fontSize: 18 },
  noMatchText: { color: '#166534', fontWeight: '700', marginTop: 6, lineHeight: 20 },
  primaryButton: { marginTop: 22, backgroundColor: '#2563eb', borderRadius: 18, padding: 16, alignItems: 'center' },
  primaryButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '900' },
  secondaryButton: { marginTop: 12, backgroundColor: '#ffffff', borderRadius: 18, padding: 16, alignItems: 'center', borderColor: '#e5e7eb', borderWidth: 1 },
  secondaryButtonText: { color: '#334155', fontSize: 16, fontWeight: '900' },
});

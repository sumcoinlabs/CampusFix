import React from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppFooter } from '../components/AppFooter';
import { PageBrand } from '../components/PageBrand';
import { useAppState } from '../context/AppStateContext';

const residentSteps = [
  'Continue as Resident or create a local resident demo account.',
  'Open Report Issue and enter a title, category, location, description, and priority.',
  'Run the duplicate check to see whether a similar request already exists.',
  'Follow the existing request or submit a new request.',
  'Confirm the request appears in My Requests.',
];

const staffSteps = [
  'Log out and continue as Staff Admin.',
  'Open the Staff Queue and find the submitted request.',
  'Assign the request to yourself or another staff owner.',
  'Mark the request in progress.',
  'Post a public update visible to residents.',
  'Add an internal staff note for private coordination.',
  'Mark the request resolved and confirm dashboard metrics update.',
];

export default function WalkthroughScreen() {
  const { currentUser } = useAppState();
  const isStaff = currentUser?.role === 'staff';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageBrand
        title="Demo Walkthrough"
        subtitle="A guided path for reviewing the full CampusFix request workflow."
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>What this demo proves</Text>
        <Text style={styles.bodyText}>
          CampusFix demonstrates a functional local request-management workflow: intake,
          duplicate reduction, staff triage, public updates, internal notes, status changes,
          and persistent local data.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Resident Flow</Text>
        {residentSteps.map((step, index) => (
          <View key={step} style={styles.stepRow}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}

        <Pressable style={styles.primaryButton} onPress={() => router.push('/report' as never)}>
          <Text style={styles.primaryButtonText}>Start Resident Flow</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Staff Admin Flow</Text>
        {staffSteps.map((step, index) => (
          <View key={step} style={styles.stepRow}>
            <View style={styles.stepNumberDark}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}

        <Pressable style={styles.darkButton} onPress={() => router.push('/staff' as never)}>
          <Text style={styles.primaryButtonText}>Open Staff Queue</Text>
        </Pressable>
      </View>

      <View style={styles.noteCard}>
        <Text style={styles.noteTitle}>Current Role</Text>
        <Text style={styles.bodyText}>
          You are signed in as {currentUser?.name || 'Demo User'} in the{' '}
          {isStaff ? 'Staff Admin' : 'Resident'} workspace.
        </Text>
      </View>

      <AppFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    borderColor: '#e5e7eb',
    borderWidth: 1,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 21,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 10,
  },
  bodyText: {
    color: '#475569',
    lineHeight: 22,
    fontWeight: '700',
  },
  stepRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberDark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: 13,
  },
  stepText: {
    flex: 1,
    color: '#334155',
    fontWeight: '700',
    lineHeight: 21,
  },
  primaryButton: {
    marginTop: 18,
    backgroundColor: '#2563eb',
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
  },
  darkButton: {
    marginTop: 18,
    backgroundColor: '#0f172a',
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: 15,
  },
  noteCard: {
    backgroundColor: '#eff6ff',
    borderColor: '#bfdbfe',
    borderWidth: 1,
    borderRadius: 20,
    padding: 18,
    marginBottom: 4,
  },
  noteTitle: {
    color: '#1d4ed8',
    fontWeight: '900',
    fontSize: 17,
    marginBottom: 6,
  },
});

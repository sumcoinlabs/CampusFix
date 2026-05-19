import React from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function LoginScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.logo}>CampusFix</Text>
        <Text style={styles.tagline}>Two-sided facilities request workflow</Text>
        <Text style={styles.heroText}>
          A clean-room Expo / React Native demo showing resident issue reporting,
          duplicate reduction, public status updates, and staff queue management.
        </Text>
      </View>

      <View style={styles.loginCard}>
        <Text style={styles.sectionTitle}>Demo Accounts</Text>
        <Text style={styles.sectionText}>
          Choose a role to see how the same request system supports both public users and internal staff.
        </Text>

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push({ pathname: '/dashboard', params: { role: 'resident' } } as never)}
        >
          <Text style={styles.primaryButtonText}>Continue as Resident</Text>
          <Text style={styles.buttonSubtext}>Report issues and follow updates</Text>
        </Pressable>

        <Pressable
          style={styles.darkButton}
          onPress={() => router.push({ pathname: '/dashboard', params: { role: 'staff' } } as never)}
        >
          <Text style={styles.primaryButtonText}>Continue as Staff Admin</Text>
          <Text style={styles.buttonSubtext}>Manage queue, notes, and status</Text>
        </Pressable>
      </View>

      <View style={styles.note}>
        <Text style={styles.noteTitle}>Demo Scope</Text>
        <Text style={styles.noteText}>
          This project uses mock data only. No CivicPlus code, branding, customer data, or private systems are used.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  hero: {
    backgroundColor: '#0f172a',
    borderRadius: 26,
    padding: 24,
    marginBottom: 18,
  },
  logo: {
    color: '#ffffff',
    fontSize: 38,
    fontWeight: '900',
  },
  tagline: {
    color: '#93c5fd',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 6,
  },
  heroText: {
    color: '#cbd5e1',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 14,
  },
  loginCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 18,
    borderColor: '#e5e7eb',
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111827',
  },
  sectionText: {
    color: '#475569',
    marginTop: 6,
    lineHeight: 21,
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  darkButton: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    padding: 16,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
  },
  buttonSubtext: {
    color: '#dbeafe',
    marginTop: 4,
    fontWeight: '700',
  },
  note: {
    backgroundColor: '#f8fafc',
    borderRadius: 18,
    padding: 16,
    borderColor: '#e2e8f0',
    borderWidth: 1,
    marginTop: 18,
  },
  noteTitle: {
    color: '#111827',
    fontWeight: '900',
  },
  noteText: {
    color: '#475569',
    marginTop: 5,
    lineHeight: 20,
  },
});

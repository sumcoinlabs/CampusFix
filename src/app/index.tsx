import React from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

function HomeButton({ title, subtitle, route }: { title: string; subtitle: string; route: string }) {
  return (
    <Pressable style={styles.buttonCard} onPress={() => router.push(route as never)}>
      <Text style={styles.buttonTitle}>{title}</Text>
      <Text style={styles.buttonSubtitle}>{subtitle}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.logo}>CampusFix</Text>
        <Text style={styles.tagline}>Facility requests made simple.</Text>
        <Text style={styles.heroText}>
          A clean-room React Native demo for reporting issues, reducing duplicates,
          tracking request status, and helping staff manage work orders.
        </Text>
      </View>

      <View style={styles.alertCard}>
        <Text style={styles.alertLabel}>Campus Notice</Text>
        <Text style={styles.alertTitle}>Parking Lot B lighting repair is underway</Text>
        <Text style={styles.alertText}>
          Maintenance has assigned the issue and updates are available for anyone following the request.
        </Text>
      </View>

      <HomeButton
        title="Report an Issue"
        subtitle="Submit a facility problem with location and category."
        route="/report"
      />

      <HomeButton
        title="My Requests"
        subtitle="Track submitted, assigned, in-progress, and resolved items."
        route="/requests"
      />

      <HomeButton
        title="Staff Queue"
        subtitle="View open work orders by status and priority."
        route="/staff"
      />
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
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
  },
  logo: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '900',
  },
  tagline: {
    color: '#93c5fd',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 4,
  },
  heroText: {
    color: '#cbd5e1',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 14,
  },
  alertCard: {
    backgroundColor: '#eff6ff',
    borderColor: '#bfdbfe',
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  alertLabel: {
    color: '#2563eb',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  alertTitle: {
    color: '#1e3a8a',
    fontSize: 17,
    fontWeight: '900',
    marginTop: 6,
  },
  alertText: {
    color: '#334155',
    marginTop: 6,
    lineHeight: 20,
  },
  buttonCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  buttonTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#111827',
  },
  buttonSubtitle: {
    marginTop: 5,
    color: '#475569',
    fontSize: 14,
    lineHeight: 20,
  },
});

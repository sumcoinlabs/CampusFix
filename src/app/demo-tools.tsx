import React, { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppFooter } from '../components/AppFooter';
import { PageBrand } from '../components/PageBrand';
import { StateMessage } from '../components/StateMessage';
import { TopNav } from '../components/TopNav';
import { useAppState } from '../context/AppStateContext';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme/design';

export default function DemoToolsScreen() {
  const { requests, notifications, resetDemo, seedDemoRequests, clearActivity } = useAppState();
  const [message, setMessage] = useState('');

  function handleSeed() {
    seedDemoRequests();
    setMessage('Additional demo requests were added to the local dataset.');
  }

  function handleClearActivity() {
    clearActivity();
    setMessage('Activity log was cleared.');
  }

  function handleReset() {
    resetDemo();
    router.replace('/' as never);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TopNav />

      <PageBrand
        title="Demo Tools"
        subtitle="Reset, seed, and manage the local demo data used by CampusFix."
      />

      {message ? (
        <StateMessage title="Demo tools updated" message={message} variant="success" />
      ) : null}

      <View style={styles.summaryGrid}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{requests.length}</Text>
          <Text style={styles.summaryLabel}>Local Requests</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{notifications.length}</Text>
          <Text style={styles.summaryLabel}>Activity Items</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Seed Demo Requests</Text>
        <Text style={styles.cardText}>
          Adds extra sample work orders so the dashboard, filters, staff queue, and request cards have more data to review.
        </Text>

        <Pressable style={styles.primaryButton} onPress={handleSeed}>
          <Text style={styles.primaryButtonText}>Seed Demo Requests</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Clear Activity Log</Text>
        <Text style={styles.cardText}>
          Clears local activity notifications while leaving request data intact.
        </Text>

        <Pressable style={styles.secondaryButton} onPress={handleClearActivity}>
          <Text style={styles.secondaryButtonText}>Clear Activity Log</Text>
        </Pressable>
      </View>

      <View style={styles.dangerCard}>
        <Text style={styles.dangerTitle}>Reset Demo Data</Text>
        <Text style={styles.dangerText}>
          Resets local requests, accounts, pending requests, and activity back to the initial demo state.
        </Text>

        <Pressable style={styles.dangerButton} onPress={handleReset}>
          <Text style={styles.dangerButtonText}>Reset Demo Data</Text>
        </Pressable>
      </View>

      <AppFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    paddingBottom: 40,
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.section,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.xxl,
    padding: spacing.section,
  },
  summaryValue: {
    color: colors.blue,
    fontSize: 30,
    fontWeight: fontWeight.black,
  },
  summaryLabel: {
    color: colors.textMuted,
    fontWeight: fontWeight.black,
    marginTop: 4,
  },
  card: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.xxl,
    padding: spacing.section,
    marginBottom: spacing.section,
  },
  cardTitle: {
    color: colors.text,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.black,
  },
  cardText: {
    color: colors.textMuted,
    fontWeight: fontWeight.semibold,
    lineHeight: 21,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.blue,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.white,
    fontWeight: fontWeight.black,
  },
  secondaryButton: {
    backgroundColor: colors.page,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.textMuted,
    fontWeight: fontWeight.black,
  },
  dangerCard: {
    backgroundColor: colors.redSoft,
    borderColor: colors.redBorder,
    borderWidth: 1,
    borderRadius: radius.xxl,
    padding: spacing.section,
    marginBottom: spacing.section,
  },
  dangerTitle: {
    color: colors.redText,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.black,
  },
  dangerText: {
    color: colors.redText,
    fontWeight: fontWeight.semibold,
    lineHeight: 21,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  dangerButton: {
    backgroundColor: colors.red,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
  },
  dangerButtonText: {
    color: colors.white,
    fontWeight: fontWeight.black,
  },
});

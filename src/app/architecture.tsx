import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppFooter } from '../components/AppFooter';
import { PageBrand } from '../components/PageBrand';
import { StateMessage } from '../components/StateMessage';
import { TopNav } from '../components/TopNav';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme/design';

function ArchitectureCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.bulletRow}>
      <View style={styles.bulletDot} />
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

export default function ArchitectureScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TopNav />

      <PageBrand
        title="Architecture Notes"
        subtitle="How the CampusFix demo is structured today and how it could evolve into a backend-backed app."
      />

      <StateMessage
        title="Backend-ready local demo"
        message="CampusFix currently uses local state and AsyncStorage for speed, portability, and easy review. The workflow logic is separated so it can be swapped for real APIs later."
        variant="info"
      />

      <ArchitectureCard title="Current Demo Architecture">
        <Bullet>Expo / React Native provides the cross-platform app shell for iOS, Android, and web.</Bullet>
        <Bullet>Expo Router handles screen navigation and route organization.</Bullet>
        <Bullet>React Context manages the active user, requests, notifications, and workflow state.</Bullet>
        <Bullet>AsyncStorage persists local demo data across refreshes and app restarts.</Bullet>
        <Bullet>Mock data seeds the request workflow without requiring a backend.</Bullet>
      </ArchitectureCard>

      <ArchitectureCard title="Service Layer">
        <Text style={styles.pathText}>src/services/requestService.ts</Text>

        <Bullet>Builds new request objects from form input.</Bullet>
        <Bullet>Handles follow-existing-request behavior.</Bullet>
        <Bullet>Handles staff assignment.</Bullet>
        <Bullet>Handles status updates.</Bullet>
        <Bullet>Handles public updates and internal notes.</Bullet>
        <Bullet>Calculates request metrics for dashboard and staff views.</Bullet>
      </ArchitectureCard>

      <ArchitectureCard title="Why this matters">
        <Bullet>Screens are not directly tied to a database implementation.</Bullet>
        <Bullet>The demo can remain local while still reflecting production-style architecture.</Bullet>
        <Bullet>Future backend calls can replace service functions without redesigning every screen.</Bullet>
        <Bullet>The same workflow could be backed by Supabase, Firebase, or a custom REST API.</Bullet>
      </ArchitectureCard>

      <ArchitectureCard title="Production Backend Path">
        <View style={styles.stepBox}>
          <Text style={styles.stepTitle}>Phase 1: Local Demo</Text>
          <Text style={styles.stepText}>React Context + AsyncStorage + local service functions.</Text>
        </View>

        <View style={styles.stepBox}>
          <Text style={styles.stepTitle}>Phase 2: Backend Auth</Text>
          <Text style={styles.stepText}>Replace local demo accounts with real auth and role-based permissions.</Text>
        </View>

        <View style={styles.stepBox}>
          <Text style={styles.stepTitle}>Phase 3: Cloud Data</Text>
          <Text style={styles.stepText}>Persist requests, updates, attachments, and staff assignments in a database.</Text>
        </View>

        <View style={styles.stepBox}>
          <Text style={styles.stepTitle}>Phase 4: Device + Notification Features</Text>
          <Text style={styles.stepText}>Add photo upload, device location, and push notifications for status updates.</Text>
        </View>
      </ArchitectureCard>

      <ArchitectureCard title="Suggested Backend Tables">
        <Text style={styles.codeText}>users</Text>
        <Text style={styles.codeText}>requests</Text>
        <Text style={styles.codeText}>request_updates</Text>
        <Text style={styles.codeText}>request_followers</Text>
        <Text style={styles.codeText}>attachments</Text>
        <Text style={styles.codeText}>notifications</Text>
      </ArchitectureCard>

      <AppFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    paddingBottom: 40,
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
    marginBottom: spacing.md,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.blue,
    marginTop: 7,
  },
  bulletText: {
    flex: 1,
    color: colors.textMuted,
    fontWeight: fontWeight.semibold,
    lineHeight: 21,
  },
  pathText: {
    backgroundColor: colors.page,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    color: colors.text,
    fontWeight: fontWeight.black,
    marginBottom: spacing.md,
  },
  stepBox: {
    backgroundColor: colors.page,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  stepTitle: {
    color: colors.text,
    fontWeight: fontWeight.black,
    fontSize: fontSize.lg,
  },
  stepText: {
    color: colors.textMuted,
    fontWeight: fontWeight.semibold,
    lineHeight: 20,
    marginTop: 4,
  },
  codeText: {
    backgroundColor: colors.navy,
    color: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
    fontWeight: fontWeight.black,
  },
});

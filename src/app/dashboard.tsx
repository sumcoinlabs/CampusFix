import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { dashboardMetrics, mockRequests } from '../data/mockRequests';
import { MetricCard } from '../components/MetricCard';
import { RequestCard } from '../components/RequestCard';
import { RoleBanner } from '../components/RoleBanner';
import { UserRole } from '../types';

function HomeButton({ title, subtitle, route }: { title: string; subtitle: string; route: string }) {
  return (
    <Pressable style={styles.buttonCard} onPress={() => router.push(route as never)}>
      <Text style={styles.buttonTitle}>{title}</Text>
      <Text style={styles.buttonSubtitle}>{subtitle}</Text>
    </Pressable>
  );
}

export default function DashboardScreen() {
  const params = useLocalSearchParams<{ role?: UserRole }>();
  const role: UserRole = params.role === 'staff' ? 'staff' : 'resident';
  const featured = mockRequests[0];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <RoleBanner role={role} />

      <View style={styles.hero}>
        <Text style={styles.logo}>CampusFix</Text>
        <Text style={styles.tagline}>
          {role === 'staff' ? 'Operational dashboard' : 'Facility requests made simple'}
        </Text>
        <Text style={styles.heroText}>
          Request intake, duplicate reduction, status tracking, and staff workflow in one cross-platform demo.
        </Text>
      </View>

      <View style={styles.metricsGrid}>
        <MetricCard label="Open Requests" value={dashboardMetrics.openRequests} helper="Active items needing review" />
        <MetricCard label="Resolved This Week" value={dashboardMetrics.resolvedThisWeek} helper="Completed work orders" />
        <MetricCard label="Duplicates Avoided" value={dashboardMetrics.duplicateReportsAvoided} helper="Users followed existing reports" />
        <MetricCard label="Avg. Response" value={dashboardMetrics.avgResponseTime} helper="Mock service-level metric" />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Most Active Issue</Text>
        <Text style={styles.sectionSub}>High visibility request with multiple followers</Text>
      </View>

      <RequestCard
        request={featured}
        onPress={() => router.push({ pathname: '/request-detail', params: { id: featured.id, role } } as never)}
      />

      {role === 'resident' ? (
        <>
          <HomeButton title="Report an Issue" subtitle="Submit a facility problem with category, location, urgency, and photo placeholder." route="/report" />
          <HomeButton title="My Requests" subtitle="Track submitted, assigned, in-progress, and resolved items." route="/requests" />
        </>
      ) : (
        <>
          <HomeButton title="Open Staff Queue" subtitle="Review active work orders, priorities, assignments, and internal notes." route="/staff" />
          <HomeButton title="View Resident Experience" subtitle="Check how residents follow public updates and avoid duplicate submissions." route="/requests" />
        </>
      )}
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
    marginBottom: 16,
  },
  logo: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '900',
  },
  tagline: {
    color: '#93c5fd',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 4,
  },
  heroText: {
    color: '#cbd5e1',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 14,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111827',
  },
  sectionSub: {
    color: '#64748b',
    marginTop: 4,
    fontWeight: '700',
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

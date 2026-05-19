import React from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppFooter } from '../components/AppFooter';
import { MetricCard } from '../components/MetricCard';
import { PageBrand } from '../components/PageBrand';
import { RequestCard } from '../components/RequestCard';
import { TopNav } from '../components/TopNav';
import { useAppState } from '../context/AppStateContext';
import { getRequestMetrics } from '../services/requestService';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme/design';

function QuickAction({
  title,
  subtitle,
  route,
  variant = 'default',
}: {
  title: string;
  subtitle: string;
  route: string;
  variant?: 'default' | 'primary';
}) {
  return (
    <Pressable
      style={[styles.quickAction, variant === 'primary' && styles.quickActionPrimary]}
      onPress={() => router.push(route as never)}
    >
      <Text style={[styles.quickActionTitle, variant === 'primary' && styles.quickActionTitlePrimary]}>
        {title}
      </Text>
      <Text style={[styles.quickActionSubtitle, variant === 'primary' && styles.quickActionSubtitlePrimary]}>
        {subtitle}
      </Text>
    </Pressable>
  );
}

export default function DashboardScreen() {
  const { currentUser, requests, notifications } = useAppState();

  const role = currentUser?.role || 'resident';
  const isStaff = role === 'staff';
  const metrics = getRequestMetrics(requests);

  const needsAttention = requests
    .filter((request) => request.status !== 'Resolved')
    .sort((a, b) => {
      const priorityRank = { High: 3, Medium: 2, Low: 1 };
      return priorityRank[b.priority] - priorityRank[a.priority];
    })
    .slice(0, 2);

  const recentActivity = notifications.slice(0, 3);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TopNav />

      <PageBrand
        title="Dashboard"
        subtitle="Live local metrics, recent activity, and workflow shortcuts."
      />

      <View style={styles.overviewCard}>
        <View>
          <Text style={styles.overviewEyebrow}>Operational Overview</Text>
          <Text style={styles.overviewTitle}>
            {isStaff ? 'Manage campus requests from intake to resolution.' : 'Track facility requests from report to resolution.'}
          </Text>
        </View>

        <View style={styles.overviewBadge}>
          <Text style={styles.overviewBadgeText}>
            {isStaff ? 'Staff View' : 'Resident View'}
          </Text>
        </View>
      </View>

      <View style={styles.metricsGrid}>
        <MetricCard label="Open Requests" value={metrics.open} helper="Active items needing review" />
        <MetricCard label="High Priority" value={metrics.highPriority} helper="Requires faster staff attention" />
        <MetricCard label="Resolved" value={metrics.resolved} helper="Completed local work orders" />
        <MetricCard label="Followers" value={metrics.followers} helper="Duplicate reports avoided" />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.sectionTitle}>Needs Attention</Text>
            <Text style={styles.sectionSubtitle}>Open requests sorted by priority.</Text>
          </View>

          <Pressable onPress={() => router.push(isStaff ? '/staff' as never : '/requests' as never)}>
            <Text style={styles.sectionLink}>View all</Text>
          </Pressable>
        </View>

        {needsAttention.length ? (
          needsAttention.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onPress={() =>
                router.push({
                  pathname: '/request-detail',
                  params: { id: request.id, role },
                } as never)
              }
            />
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No open requests</Text>
            <Text style={styles.emptyText}>Everything is currently resolved in the local demo data.</Text>
          </View>
        )}
      </View>

      <View style={styles.twoColumn}>
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Quick Actions</Text>

          {isStaff ? (
            <>
              <QuickAction
                title="Open Staff Queue"
                subtitle="Review, filter, assign, and resolve work orders."
                route="/staff"
                variant="primary"
              />
              <QuickAction
                title="Activity Log"
                subtitle="Review local workflow notifications."
                route="/activity"
              />
            </>
          ) : (
            <>
              <QuickAction
                title="Create New Request"
                subtitle="Start a new report and run duplicate check."
                route="/report"
                variant="primary"
              />
              <QuickAction
                title="My Requests"
                subtitle="View submitted and followed issues."
                route="/requests"
              />
            </>
          )}

          <QuickAction
            title="Demo Walkthrough"
            subtitle="Step-by-step guide for reviewing the demo."
            route="/walkthrough"
          />

          <QuickAction
            title="Demo Tools"
            subtitle="Seed, clear, or reset local demo data."
            route="/demo-tools"
          />

          <QuickAction
            title="Architecture Notes"
            subtitle="Review the local-first, backend-ready structure."
            route="/architecture"
          />
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Recent Activity</Text>

          {recentActivity.length ? (
            recentActivity.map((item) => (
              <View key={item.id} style={styles.activityItem}>
                <View style={styles.activityDot} />
                <View style={styles.activityTextWrap}>
                  <Text style={styles.activityText}>{item.message}</Text>
                  <Text style={styles.activityTime}>{item.createdAt}</Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyActivity}>
              <Text style={styles.emptyTitle}>No activity yet</Text>
              <Text style={styles.emptyText}>Create or update a request to populate this panel.</Text>
            </View>
          )}

          <Pressable style={styles.activityButton} onPress={() => router.push('/activity' as never)}>
            <Text style={styles.activityButtonText}>Open Activity Log</Text>
          </Pressable>
        </View>
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
  overviewCard: {
    backgroundColor: colors.navy,
    borderRadius: radius.hero,
    padding: spacing.xl,
    marginBottom: spacing.section,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.lg,
  },
  overviewEyebrow: {
    color: '#93c5fd',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.black,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    marginBottom: spacing.sm,
  },
  overviewTitle: {
    color: colors.white,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.black,
    lineHeight: 29,
    maxWidth: 560,
  },
  overviewBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.blue,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  overviewBadgeText: {
    color: colors.white,
    fontWeight: fontWeight.black,
    fontSize: fontSize.sm,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.section,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.black,
  },
  sectionSubtitle: {
    color: colors.textSoft,
    fontWeight: fontWeight.semibold,
    marginTop: 4,
  },
  sectionLink: {
    color: colors.blueText,
    fontWeight: fontWeight.black,
  },
  twoColumn: {
    gap: spacing.section,
  },
  panel: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.xxl,
    padding: spacing.section,
    marginBottom: spacing.section,
  },
  panelTitle: {
    color: colors.text,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.black,
    marginBottom: spacing.md,
  },
  quickAction: {
    backgroundColor: colors.page,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  quickActionPrimary: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
  },
  quickActionTitle: {
    color: colors.text,
    fontWeight: fontWeight.black,
    fontSize: fontSize.lg,
  },
  quickActionTitlePrimary: {
    color: colors.white,
  },
  quickActionSubtitle: {
    color: colors.textMuted,
    fontWeight: fontWeight.semibold,
    lineHeight: 20,
    marginTop: 4,
  },
  quickActionSubtitlePrimary: {
    color: '#dbeafe',
  },
  activityItem: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderTopColor: colors.border,
    borderTopWidth: 1,
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.blue,
    marginTop: 5,
  },
  activityTextWrap: {
    flex: 1,
  },
  activityText: {
    color: colors.text,
    fontWeight: fontWeight.bold,
    lineHeight: 20,
  },
  activityTime: {
    color: colors.textSoft,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    marginTop: 3,
  },
  activityButton: {
    backgroundColor: colors.blueSoft,
    borderColor: colors.blueBorder,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  activityButtonText: {
    color: colors.blueText,
    fontWeight: fontWeight.black,
  },
  emptyCard: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.xl,
    padding: spacing.section,
  },
  emptyActivity: {
    backgroundColor: colors.page,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    color: colors.text,
    fontWeight: fontWeight.black,
    fontSize: fontSize.lg,
  },
  emptyText: {
    color: colors.textSoft,
    fontWeight: fontWeight.semibold,
    lineHeight: 20,
    marginTop: 5,
  },
});

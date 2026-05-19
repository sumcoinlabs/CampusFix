import React from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MetricCard } from '../components/MetricCard';
import { RequestCard } from '../components/RequestCard';
import { RoleBanner } from '../components/RoleBanner';
import { useAppState } from '../context/AppStateContext';
import { AppFooter } from '../components/AppFooter';

function HomeButton({ title, subtitle, route }: { title: string; subtitle: string; route: string }) {
  return (
    <Pressable style={styles.buttonCard} onPress={() => router.push(route as never)}>
      <Text style={styles.buttonTitle}>{title}</Text>
      <Text style={styles.buttonSubtitle}>{subtitle}</Text>
    </Pressable>
  );
}

export default function DashboardScreen() {
  const { currentUser, requests, notifications, logout } = useAppState();

  const role = currentUser?.role || 'resident';
  const openRequests = requests.filter((request) => request.status !== 'Resolved').length;
  const resolved = requests.filter((request) => request.status === 'Resolved').length;
  const followers = requests.reduce((sum, request) => sum + request.followers, 0);
  const featured = requests[0];

  function signOut() {
    logout();
    router.replace('/' as never);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <RoleBanner role={role} />

      <View style={styles.hero}>
        <Text style={styles.logo}>CampusFix</Text>
        <Text style={styles.tagline}>Welcome, {currentUser?.name || 'Demo User'}</Text>
        <Text style={styles.heroText}>
          Functional local demo: create requests, follow duplicates, update staff status, and persist changes.
        </Text>
      </View>

      <View style={styles.metricsGrid}>
        <MetricCard label="Open Requests" value={openRequests} helper="Updates as staff resolves items" />
        <MetricCard label="Resolved" value={resolved} helper="Completed local requests" />
        <MetricCard label="Followers" value={followers} helper="Duplicate reports avoided" />
        <MetricCard label="Notifications" value={notifications.length} helper="In-app activity log" />
      </View>

      {notifications[0] ? (
        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>Latest Activity</Text>
          <Text style={styles.noticeText}>{notifications[0].message}</Text>
        </View>
      ) : null}

      {featured ? (
        <>
          <Text style={styles.sectionTitle}>Most Recent Request</Text>
          <RequestCard
            request={featured}
            onPress={() => router.push({ pathname: '/request-detail', params: { id: featured.id, role } } as never)}
          />
        </>
      ) : null}

      {role === 'resident' ? (
        <>
          <HomeButton title="Report an Issue" subtitle="Create a real local request that appears in lists." route="/report" />
          <HomeButton title="My Requests" subtitle="Track local request status and public updates." route="/requests" />
        </>
      ) : (
        <>
          <HomeButton title="Open Staff Queue" subtitle="Assign requests, update status, and add notes." route="/staff" />
          <HomeButton title="View Resident Requests" subtitle="See the resident-facing request list." route="/requests" />
        </>
      )}

      <Pressable style={styles.signOut} onPress={signOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>
          <AppFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  hero: { backgroundColor: '#0f172a', borderRadius: 24, padding: 22, marginBottom: 16 },
  logo: { color: '#ffffff', fontSize: 34, fontWeight: '900' },
  tagline: { color: '#93c5fd', fontSize: 18, fontWeight: '900', marginTop: 4 },
  heroText: { color: '#cbd5e1', fontSize: 15, lineHeight: 22, marginTop: 14 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  notice: { backgroundColor: '#ecfeff', borderColor: '#67e8f9', borderWidth: 1, borderRadius: 18, padding: 16, marginBottom: 18 },
  noticeTitle: { color: '#155e75', fontWeight: '900' },
  noticeText: { color: '#164e63', marginTop: 4, fontWeight: '700' },
  sectionTitle: { fontSize: 22, fontWeight: '900', color: '#111827', marginBottom: 12 },
  buttonCard: { backgroundColor: '#ffffff', borderRadius: 20, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#e5e7eb' },
  buttonTitle: { fontSize: 19, fontWeight: '900', color: '#111827' },
  buttonSubtitle: { marginTop: 5, color: '#475569', fontSize: 14, lineHeight: 20 },
  signOut: { alignItems: 'center', padding: 14 },
  signOutText: { color: '#dc2626', fontWeight: '900' },
});

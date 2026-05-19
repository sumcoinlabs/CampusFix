import React from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppFooter } from '../components/AppFooter';
import { PageBrand } from '../components/PageBrand';
import { useAppState } from '../context/AppStateContext';

export default function ActivityScreen() {
  const { notifications, requests } = useAppState();

  const recentRequests = requests.slice(0, 4);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageBrand
        title="Activity Log"
        subtitle="Local in-app activity showing request creation, staff actions, updates, and status changes."
      />

      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{notifications.length}</Text>
          <Text style={styles.summaryLabel}>Activity Items</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{requests.length}</Text>
          <Text style={styles.summaryLabel}>Total Requests</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Activity</Text>

        {notifications.length ? (
          notifications.map((item) => (
            <View key={item.id} style={styles.activityItem}>
              <View style={styles.dot} />
              <View style={styles.activityTextWrap}>
                <Text style={styles.activityMessage}>{item.message}</Text>
                <Text style={styles.activityTime}>{item.createdAt}</Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>No activity yet</Text>
            <Text style={styles.emptyText}>
              Create a request or update one as staff to populate this activity log.
            </Text>
          </View>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Requests</Text>

        {recentRequests.map((request) => (
          <Pressable
            key={request.id}
            style={styles.requestRow}
            onPress={() =>
              router.push({
                pathname: '/request-detail',
                params: { id: request.id },
              } as never)
            }
          >
            <View>
              <Text style={styles.requestTitle}>{request.title}</Text>
              <Text style={styles.requestMeta}>
                {request.id} • {request.status} • {request.location}
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.noteCard}>
        <Text style={styles.noteTitle}>Demo Note</Text>
        <Text style={styles.noteText}>
          This is an in-app activity feed using local persisted state. In a production app,
          this could be backed by push notifications, server events, or an API activity table.
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
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    borderColor: '#e5e7eb',
    borderWidth: 1,
  },
  summaryNumber: {
    color: '#2563eb',
    fontSize: 30,
    fontWeight: '900',
  },
  summaryLabel: {
    color: '#334155',
    fontWeight: '900',
    marginTop: 4,
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
  activityItem: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
    borderTopColor: '#e5e7eb',
    borderTopWidth: 1,
  },
  dot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: '#2563eb',
    marginTop: 5,
  },
  activityTextWrap: {
    flex: 1,
  },
  activityMessage: {
    color: '#111827',
    fontWeight: '800',
    lineHeight: 20,
  },
  activityTime: {
    color: '#64748b',
    fontWeight: '700',
    marginTop: 3,
    fontSize: 12,
  },
  emptyBox: {
    backgroundColor: '#f8fafc',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  emptyTitle: {
    color: '#111827',
    fontWeight: '900',
    fontSize: 16,
  },
  emptyText: {
    color: '#64748b',
    marginTop: 5,
    lineHeight: 20,
    fontWeight: '700',
  },
  requestRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 13,
    borderTopColor: '#e5e7eb',
    borderTopWidth: 1,
    alignItems: 'center',
  },
  requestTitle: {
    color: '#111827',
    fontWeight: '900',
    fontSize: 15,
  },
  requestMeta: {
    color: '#64748b',
    marginTop: 3,
    fontWeight: '700',
    lineHeight: 18,
  },
  chevron: {
    color: '#94a3b8',
    fontSize: 32,
    fontWeight: '300',
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
  noteText: {
    color: '#334155',
    lineHeight: 21,
    fontWeight: '700',
  },
});

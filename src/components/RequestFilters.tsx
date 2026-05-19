import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { RequestPriority, RequestStatus } from '../types';

type StatusFilter = 'All' | RequestStatus;
type PriorityFilter = 'All' | RequestPriority;

type Props = {
  searchText: string;
  setSearchText: (value: string) => void;
  statusFilter: StatusFilter;
  setStatusFilter: (value: StatusFilter) => void;
  priorityFilter: PriorityFilter;
  setPriorityFilter: (value: PriorityFilter) => void;
  resultCount: number;
};

const statusOptions: StatusFilter[] = ['All', 'Submitted', 'Assigned', 'In Progress', 'Resolved'];
const priorityOptions: PriorityFilter[] = ['All', 'Low', 'Medium', 'High'];

export function RequestFilters({
  searchText,
  setSearchText,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  resultCount,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Search & Filter</Text>

      <TextInput
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search by title, ID, location, category, or description"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Status</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
        {statusOptions.map((item) => (
          <Pressable
            key={item}
            style={[styles.chip, statusFilter === item && styles.chipActive]}
            onPress={() => setStatusFilter(item)}
          >
            <Text style={[styles.chipText, statusFilter === item && styles.chipTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Text style={styles.label}>Priority</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
        {priorityOptions.map((item) => (
          <Pressable
            key={item}
            style={[styles.chip, priorityFilter === item && styles.chipActive]}
            onPress={() => setPriorityFilter(item)}
          >
            <Text style={[styles.chipText, priorityFilter === item && styles.chipTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Text style={styles.resultText}>{resultCount} matching request{resultCount === 1 ? '' : 's'}</Text>
    </View>
  );
}

export type { StatusFilter, PriorityFilter };

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderColor: '#e5e7eb',
    borderWidth: 1,
    marginBottom: 16,
  },
  title: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#f8fafc',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 14,
    padding: 13,
    fontSize: 15,
    color: '#111827',
    marginBottom: 12,
  },
  label: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    marginTop: 8,
    marginBottom: 8,
  },
  chipRow: {
    gap: 8,
    paddingBottom: 4,
  },
  chip: {
    backgroundColor: '#f8fafc',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  chipActive: {
    backgroundColor: '#0f172a',
    borderColor: '#0f172a',
  },
  chipText: {
    color: '#334155',
    fontWeight: '800',
  },
  chipTextActive: {
    color: '#ffffff',
  },
  resultText: {
    marginTop: 12,
    color: '#2563eb',
    fontWeight: '900',
  },
});

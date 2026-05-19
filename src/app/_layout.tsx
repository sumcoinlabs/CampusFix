import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#0f172a' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: '800' },
        contentStyle: { backgroundColor: '#f8fafc' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'CampusFix' }} />
      <Stack.Screen name="report" options={{ title: 'Report Issue' }} />
      <Stack.Screen name="duplicate" options={{ title: 'Similar Issue Found' }} />
      <Stack.Screen name="requests" options={{ title: 'My Requests' }} />
      <Stack.Screen name="staff" options={{ title: 'Staff Queue' }} />
      <Stack.Screen name="request-detail" options={{ title: 'Request Detail' }} />
    </Stack>
  );
}

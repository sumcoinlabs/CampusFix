import { Stack } from 'expo-router';
import React from 'react';
import { AppStateProvider } from '../context/AppStateContext';

export default function RootLayout() {
  return (
    <AppStateProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#0f172a' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: '800' },
          contentStyle: { backgroundColor: '#f8fafc' },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'CampusFix Demo Login' }} />
        <Stack.Screen name="dashboard" options={{ title: 'CampusFix Dashboard' }} />
        <Stack.Screen name="report" options={{ title: 'Report Issue' }} />
        <Stack.Screen name="duplicate" options={{ title: 'Similar Issue Found' }} />
        <Stack.Screen name="confirmation" options={{ title: 'Confirmation' }} />
        <Stack.Screen name="requests" options={{ title: 'My Requests' }} />
        <Stack.Screen name="staff" options={{ title: 'Staff Queue' }} />
        <Stack.Screen name="request-detail" options={{ title: 'Request Detail' }} />
      </Stack>
    </AppStateProvider>
  );
}

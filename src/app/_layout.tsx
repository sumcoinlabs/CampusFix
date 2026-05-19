import { Stack, router } from 'expo-router';
import React from 'react';
import { Pressable, Text } from 'react-native';
import { AppStateProvider, useAppState } from '../context/AppStateContext';

function HeaderLogout() {
  const { currentUser, logout } = useAppState();

  if (!currentUser) {
    return null;
  }

  function signOut() {
    logout();
    router.replace('/' as never);
  }

  return (
    <Pressable onPress={signOut} style={{ paddingHorizontal: 12, paddingVertical: 6 }}>
      <Text style={{ color: '#ffffff', fontWeight: '900' }}>Log Out</Text>
    </Pressable>
  );
}

function AppStack() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#0f172a' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: '800' },
        contentStyle: { backgroundColor: '#f8fafc' },
        headerRight: () => <HeaderLogout />,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'CampusFix Demo Login' }} />
      <Stack.Screen name="dashboard" options={{ title: 'Dashboard' }} />
      <Stack.Screen name="report" options={{ title: 'Report Issue' }} />
      <Stack.Screen name="duplicate" options={{ title: 'Duplicate Check' }} />
      <Stack.Screen name="confirmation" options={{ title: 'Confirmation' }} />
      <Stack.Screen name="requests" options={{ title: 'My Requests' }} />
      <Stack.Screen name="staff" options={{ title: 'Staff Queue' }} />
      <Stack.Screen name="request-detail" options={{ title: 'Request Detail' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AppStateProvider>
      <AppStack />
    </AppStateProvider>
  );
}

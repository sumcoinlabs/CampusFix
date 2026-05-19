import { Stack, router } from 'expo-router';
import React from 'react';
import { Pressable, Text } from 'react-native';
import { AppStateProvider, useAppState } from '../context/AppStateContext';
import { HeaderBrand } from '../components/HeaderBrand';

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
        headerTitleAlign: 'center',
        headerTitle: () => <HeaderBrand />,
        headerRight: () => <HeaderLogout />,
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: () => <HeaderBrand /> }} />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="walkthrough" />
      <Stack.Screen name="activity" />
      <Stack.Screen name="demo-tools" />
      <Stack.Screen name="report" />
      <Stack.Screen name="duplicate" />
      <Stack.Screen name="confirmation" />
      <Stack.Screen name="requests" />
      <Stack.Screen name="staff" />
      <Stack.Screen name="request-detail" />
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

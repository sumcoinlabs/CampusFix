import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  Account,
  AppNotification,
  CampusRequest,
  PendingRequest,
  RequestStatus,
  UserRole,
} from '../types';
import { initialRequests } from '../data/mockRequests';
import {
  addRequestUpdate,
  assignRequestToStaff,
  buildNewRequest,
  followExistingRequest,
  makeId,
  updateRequestStatus,
} from '../services/requestService';

type AppState = {
  currentUser: Account | null;
  accounts: Account[];
  requests: CampusRequest[];
  pendingRequest: PendingRequest | null;
  notifications: AppNotification[];
  loginDemo: (role: UserRole) => void;
  register: (name: string, email: string, role: UserRole) => void;
  logout: () => void;
  setPendingRequest: (request: PendingRequest | null) => void;
  createRequest: (request?: PendingRequest | null) => string;
  followRequest: (id: string) => void;
  assignToMe: (id: string) => void;
  updateStatus: (id: string, status: RequestStatus) => void;
  addPublicUpdate: (id: string, message: string) => void;
  addInternalNote: (id: string, message: string) => void;
  resetDemo: () => void;
};

const STORAGE_KEY = 'campusfix-state-v1';

const demoAccounts: Account[] = [
  { id: 'resident-demo', name: 'Resident Demo', email: 'resident@campusfix.demo', role: 'resident' },
  { id: 'staff-demo', name: 'Staff Admin Demo', email: 'staff@campusfix.demo', role: 'staff' },
];

const AppStateContext = createContext<AppState | undefined>(undefined);

function nowLabel() {
  return new Date().toLocaleString();
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Account | null>(null);
  const [accounts, setAccounts] = useState<Account[]>(demoAccounts);
  const [requests, setRequests] = useState<CampusRequest[]>(initialRequests);
  const [pendingRequest, setPendingRequest] = useState<PendingRequest | null>(null);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const data = JSON.parse(saved);
          setCurrentUser(data.currentUser ?? null);
          setAccounts(data.accounts ?? demoAccounts);
          setRequests(data.requests ?? initialRequests);
          setNotifications(data.notifications ?? []);
        }
      } finally {
        setLoaded(true);
      }
    }

    load();
  }, []);

  useEffect(() => {
    if (!loaded) return;

    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        currentUser,
        accounts,
        requests,
        notifications,
      })
    );
  }, [loaded, currentUser, accounts, requests, notifications]);

  function pushNotification(message: string) {
    setNotifications((items) => [
      { id: makeId('N'), message, createdAt: nowLabel() },
      ...items,
    ]);
  }

  function loginDemo(role: UserRole) {
    const account = demoAccounts.find((item) => item.role === role) || demoAccounts[0];
    setCurrentUser(account);
    pushNotification(`Signed in as ${account.name}.`);
  }

  function register(name: string, email: string, role: UserRole) {
    const account: Account = {
      id: makeId('A'),
      name: name.trim() || 'New Demo User',
      email: email.trim() || `user-${Date.now()}@campusfix.demo`,
      role,
    };

    setAccounts((items) => [account, ...items]);
    setCurrentUser(account);
    pushNotification(`Created local demo account for ${account.name}.`);
  }

  function logout() {
    setCurrentUser(null);
  }

  function createRequest(request?: PendingRequest | null) {
    const source = request || pendingRequest;
    const newRequest = buildNewRequest(source, currentUser?.name || 'Resident');

    setRequests((items) => [newRequest, ...items]);
    setPendingRequest(null);
    pushNotification(`Created request ${newRequest.id}.`);
    return newRequest.id;
  }

  function followRequest(id: string) {
    setRequests((items) => followExistingRequest(items, id));
    setPendingRequest(null);
    pushNotification(`You are now following request ${id}.`);
  }

  function assignToMe(id: string) {
    setRequests((items) =>
      assignRequestToStaff(items, id, currentUser?.name || 'Staff Admin')
    );
    pushNotification(`Assigned request ${id}.`);
  }

  function updateStatus(id: string, status: RequestStatus) {
    setRequests((items) =>
      updateRequestStatus(items, id, status, currentUser?.name || 'Facilities Team')
    );
    pushNotification(`Updated ${id} to ${status}.`);
  }

  function addPublicUpdate(id: string, message: string) {
    setRequests((items) =>
      addRequestUpdate(items, id, message, currentUser?.name || 'Facilities Team', 'Public')
    );
    pushNotification(`Posted public update on ${id}.`);
  }

  function addInternalNote(id: string, message: string) {
    setRequests((items) =>
      addRequestUpdate(items, id, message, currentUser?.name || 'Staff Admin', 'Internal')
    );
    pushNotification(`Added internal note on ${id}.`);
  }

  function resetDemo() {
    setCurrentUser(null);
    setAccounts(demoAccounts);
    setRequests(initialRequests);
    setPendingRequest(null);
    setNotifications([]);
    AsyncStorage.removeItem(STORAGE_KEY);
  }

  const value = useMemo<AppState>(
    () => ({
      currentUser,
      accounts,
      requests,
      pendingRequest,
      notifications,
      loginDemo,
      register,
      logout,
      setPendingRequest,
      createRequest,
      followRequest,
      assignToMe,
      updateStatus,
      addPublicUpdate,
      addInternalNote,
      resetDemo,
    }),
    [currentUser, accounts, requests, pendingRequest, notifications]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error('useAppState must be used inside AppStateProvider');
  }

  return context;
}

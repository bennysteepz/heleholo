import '../global.css';
import { useEffect } from 'react';
import { LogBox } from 'react-native';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useAuthStore } from '../store/authStore';

// Show all logs in the Metro terminal — never hide them during development
LogBox.ignoreAllLogs(false);

export default function RootLayout() {
  const { session, initialize } = useAuthStore();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (session === undefined) return; // still loading

    const inAuth = segments[0] === '(auth)';

    if (!session && !inAuth) {
      router.replace('/(auth)/welcome');
    } else if (session && inAuth) {
      const role = session.user.user_metadata?.role;
      if (role === 'guide') {
        router.replace('/(guide)');
      } else {
        router.replace('/(tourist)');
      }
    }
  }, [session, segments]);

  return <Slot />;
}

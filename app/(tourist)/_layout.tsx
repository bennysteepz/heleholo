import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TouristLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0ea5e9',
        tabBarInactiveTintColor: '#9ca3af',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🗺️</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>👤</Text>,
        }}
      />
      <Tabs.Screen name="guide/[id]" options={{ href: null }} />
      <Tabs.Screen name="book/[id]" options={{ href: null }} />
      <Tabs.Screen name="tour/[id]" options={{ href: null }} />
    </Tabs>
  );
}

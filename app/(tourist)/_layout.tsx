import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TouristLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2288C9',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E5EA',
          borderTopWidth: 1,
          height: 82,
          paddingBottom: 20,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: -2,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}>🗺️</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}>👤</Text>,
        }}
      />
      <Tabs.Screen name="guide/[id]" options={{ href: null }} />
      <Tabs.Screen name="book/[id]"  options={{ href: null }} />
      <Tabs.Screen name="tour/[id]"  options={{ href: null }} />
    </Tabs>
  );
}

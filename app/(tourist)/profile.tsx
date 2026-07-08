import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';

const MENU_SECTIONS = [
  {
    title: 'MY ACCOUNT',
    items: [
      { icon: '🧳', label: 'Upcoming trips', value: '0 upcoming' },
      { icon: '🗺️', label: 'Past experiences', value: '0 completed' },
      { icon: '❤️', label: 'Saved guides', value: '0 saved' },
    ],
  },
  {
    title: 'PREFERENCES',
    items: [
      { icon: '🌟', label: 'Interests', value: 'Not set' },
      { icon: '🗣️', label: 'Languages', value: 'Not set' },
    ],
  },
  {
    title: 'PAYMENTS',
    items: [
      { icon: '💳', label: 'Payment methods', value: 'Add card' },
      { icon: '🧾', label: 'Transaction history', value: 'View all' },
    ],
  },
  {
    title: 'SUPPORT',
    items: [
      { icon: '❓', label: 'Help & FAQ', value: '' },
      { icon: '⭐', label: 'Rate the app', value: '' },
    ],
  },
];

export default function TouristProfileScreen() {
  const { session } = useAuthStore();
  const name = session?.user.user_metadata?.full_name ?? 'Traveler';
  const email = session?.user.email ?? '';
  const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <ScrollView className="flex-1 bg-sand" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={{ backgroundColor: '#FFFFFF', paddingTop: 56, paddingHorizontal: 20, paddingBottom: 24, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{
            width: 64, height: 64, borderRadius: 32,
            backgroundColor: '#2288C9',
            alignItems: 'center', justifyContent: 'center',
            marginRight: 16,
          }}>
            <Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: '700' }}>{initials}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#1C1C1E' }}>{name}</Text>
            <Text style={{ fontSize: 14, color: '#8E8E93', marginTop: 2 }}>{email}</Text>
          </View>
        </View>
      </View>

      {/* Stats bar */}
      <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', marginTop: 8, paddingVertical: 16, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#E5E5EA' }}>
        {[
          { value: '0', label: 'Trips' },
          { value: '0', label: 'Reviews' },
          { value: '0', label: 'Saved' },
        ].map((stat, i) => (
          <View key={stat.label} style={{ flex: 1, alignItems: 'center', borderRightWidth: i < 2 ? 1 : 0, borderColor: '#E5E5EA' }}>
            <Text style={{ fontSize: 22, fontWeight: '800', color: '#1C1C1E' }}>{stat.value}</Text>
            <Text style={{ fontSize: 12, color: '#8E8E93', marginTop: 2 }}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Menu sections */}
      {MENU_SECTIONS.map((section) => (
        <View key={section.title} style={{ marginTop: 24, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 11, fontWeight: '700', color: '#8E8E93', letterSpacing: 1, marginBottom: 10 }}>
            {section.title}
          </Text>
          <View style={{ backgroundColor: '#FFFFFF', borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#E5E5EA' }}>
            {section.items.map((item, idx) => (
              <TouchableOpacity
                key={item.label}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  borderTopWidth: idx > 0 ? 1 : 0,
                  borderColor: '#E5E5EA',
                }}
              >
                <Text style={{ fontSize: 18, marginRight: 14 }}>{item.icon}</Text>
                <Text style={{ flex: 1, fontSize: 15, color: '#1C1C1E', fontWeight: '500' }}>{item.label}</Text>
                {item.value ? (
                  <Text style={{ fontSize: 13, color: '#8E8E93', marginRight: 6 }}>{item.value}</Text>
                ) : null}
                <Text style={{ color: '#C7C7CC', fontSize: 18 }}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* Sign out */}
      <View style={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 48 }}>
        <TouchableOpacity
          style={{ backgroundColor: '#FFFFFF', borderRadius: 16, paddingVertical: 16, alignItems: 'center', borderWidth: 1, borderColor: '#FFE5E5' }}
          onPress={() => supabase.auth.signOut()}
        >
          <Text style={{ color: '#D94F6B', fontWeight: '600', fontSize: 15 }}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

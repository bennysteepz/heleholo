import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import { SectionHeader } from '../../components/ui/SectionHeader';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const MENU_SECTIONS: {
  title: string;
  items: { icon: IoniconName; label: string; value?: string }[];
}[] = [
  {
    title: 'MY TRIPS',
    items: [
      { icon: 'airplane-outline',      label: 'Upcoming trips',      value: 'None yet' },
      { icon: 'checkmark-circle-outline', label: 'Past experiences', value: 'None yet' },
      { icon: 'heart-outline',         label: 'Saved guides',        value: 'None saved' },
    ],
  },
  {
    title: 'PREFERENCES',
    items: [
      { icon: 'star-outline',    label: 'Interests',   value: 'Add interests' },
      { icon: 'language-outline', label: 'Languages',  value: 'Not set' },
    ],
  },
  {
    title: 'PAYMENTS',
    items: [
      { icon: 'wallet-outline',  label: 'Payment methods',    value: 'Add card' },
      { icon: 'receipt-outline', label: 'Transaction history', value: 'View all' },
    ],
  },
  {
    title: 'SUPPORT',
    items: [
      { icon: 'help-circle-outline',  label: 'Help & FAQ' },
      { icon: 'star-half-outline',    label: 'Rate the app' },
      { icon: 'shield-outline',       label: 'Privacy & terms' },
    ],
  },
];

export default function TouristProfileScreen() {
  const { session } = useAuthStore();
  const name = session?.user.user_metadata?.full_name ?? 'Traveler';
  const email = session?.user.email ?? '';
  const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F8F4EC' }} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View
        style={{
          backgroundColor: '#FFFFFF',
          paddingTop: 58,
          paddingHorizontal: 20,
          paddingBottom: 24,
          borderBottomWidth: 1,
          borderBottomColor: '#E5E5EA',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 64, height: 64, borderRadius: 32,
              backgroundColor: '#2288C9',
              alignItems: 'center', justifyContent: 'center',
              marginRight: 16,
            }}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: '700' }}>{initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#1C1C1E' }}>{name}</Text>
            <Text style={{ fontSize: 13, color: '#8E8E93', marginTop: 3 }}>{email}</Text>
          </View>
          <TouchableOpacity
            style={{
              width: 36, height: 36, borderRadius: 18,
              backgroundColor: '#F8F4EC',
              alignItems: 'center', justifyContent: 'center',
              borderWidth: 1, borderColor: '#E5E5EA',
            }}
          >
            <Ionicons name="create-outline" size={16} color="#8E8E93" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats bar */}
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#FFFFFF',
          marginTop: 8,
          paddingVertical: 18,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: '#E5E5EA',
        }}
      >
        {[
          { value: '0', label: 'Trips' },
          { value: '0', label: 'Reviews' },
          { value: '0', label: 'Saved' },
        ].map((stat, i) => (
          <View
            key={stat.label}
            style={{
              flex: 1, alignItems: 'center',
              borderRightWidth: i < 2 ? 1 : 0,
              borderColor: '#E5E5EA',
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: '800', color: '#1C1C1E' }}>{stat.value}</Text>
            <Text style={{ fontSize: 12, color: '#8E8E93', marginTop: 3 }}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Menu sections */}
      {MENU_SECTIONS.map((section) => (
        <View key={section.title} style={{ marginTop: 24, paddingHorizontal: 20 }}>
          <SectionHeader title={section.title} />
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              overflow: 'hidden',
              borderWidth: 1,
              borderColor: '#E5E5EA',
            }}
          >
            {section.items.map((item, idx) => (
              <TouchableOpacity
                key={item.label}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 15,
                  borderTopWidth: idx > 0 ? 1 : 0,
                  borderColor: '#E5E5EA',
                }}
              >
                <View
                  style={{
                    width: 32, height: 32, borderRadius: 8,
                    backgroundColor: '#F8F4EC',
                    alignItems: 'center', justifyContent: 'center',
                    marginRight: 14,
                  }}
                >
                  <Ionicons name={item.icon} size={16} color="#2288C9" />
                </View>
                <Text style={{ flex: 1, fontSize: 15, color: '#1C1C1E', fontWeight: '500' }}>
                  {item.label}
                </Text>
                {item.value ? (
                  <Text style={{ fontSize: 13, color: '#8E8E93', marginRight: 8 }}>{item.value}</Text>
                ) : null}
                <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* Sign out */}
      <View style={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 52 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            paddingVertical: 16,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#FFE5E5',
          }}
          onPress={() => supabase.auth.signOut({ scope: 'local' })}
        >
          <Text style={{ color: '#D94F6B', fontWeight: '600', fontSize: 15 }}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

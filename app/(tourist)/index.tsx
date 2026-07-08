import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';
import { EmptyState } from '../../components/ui/EmptyState';
import { SectionHeader } from '../../components/ui/SectionHeader';

const EXPERIENCES = [
  { id: 'food',    icon: 'restaurant-outline' as const,  label: 'Local food',     sub: 'Shrimp trucks, poke & more' },
  { id: 'sunrise', icon: 'sunny-outline' as const,        label: 'Sunrise hikes',  sub: 'Diamond Head & beyond' },
  { id: 'surf',    icon: 'water-outline' as const,        label: 'Surf culture',   sub: 'North Shore immersion' },
  { id: 'scenic',  icon: 'car-outline' as const,          label: 'Island drive',   sub: 'The full circle tour' },
  { id: 'hidden',  icon: 'cafe-outline' as const,         label: 'Hidden spots',   sub: 'Where locals actually go' },
  { id: 'first',   icon: 'flower-outline' as const,       label: 'First day',      sub: 'Best way to start your trip' },
];

const NEIGHBORHOODS = ['Waikīkī', 'North Shore', 'Kaimukī', 'Kāneʻohe', 'Hāleʻiwa', 'Mānoa'];

export default function BrowseScreen() {
  const { session } = useAuthStore();
  const firstName = session?.user.user_metadata?.full_name?.split(' ')[0] ?? 'there';

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F8F4EC' }} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View
        style={{
          backgroundColor: '#FFFFFF',
          paddingTop: 58,
          paddingHorizontal: 20,
          paddingBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#E5E5EA',
        }}
      >
        <Text style={{ fontSize: 13, color: '#8E8E93', fontWeight: '500', marginBottom: 3 }}>
          Aloha, {firstName} 🤙
        </Text>
        <Text style={{ fontSize: 28, fontWeight: '800', color: '#1C1C1E', marginBottom: 18, lineHeight: 34 }}>
          What do you want{'\n'}to experience?
        </Text>

        {/* Search bar */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F8F4EC',
            borderRadius: 14,
            paddingHorizontal: 14,
            paddingVertical: 13,
            borderWidth: 1.5,
            borderColor: '#E5E5EA',
          }}
        >
          <Ionicons name="search-outline" size={18} color="#8E8E93" style={{ marginRight: 10 }} />
          <Text style={{ color: '#8E8E93', fontSize: 15 }}>Search experiences, guides, places…</Text>
        </TouchableOpacity>
      </View>

      {/* Experiences grid */}
      <View style={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 8 }}>
        <SectionHeader title="EXPERIENCES" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {EXPERIENCES.map((exp) => (
            <TouchableOpacity
              key={exp.id}
              activeOpacity={0.8}
              style={{
                width: '47.5%',
                backgroundColor: '#FFFFFF',
                borderRadius: 18,
                padding: 18,
                borderWidth: 1,
                borderColor: '#E5E5EA',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 8,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  backgroundColor: '#EBF5FB',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                }}
              >
                <Ionicons name={exp.icon} size={20} color="#2288C9" />
              </View>
              <Text style={{ fontSize: 15, fontWeight: '700', color: '#1C1C1E', marginBottom: 4 }}>
                {exp.label}
              </Text>
              <Text style={{ fontSize: 12, color: '#8E8E93', lineHeight: 16 }}>{exp.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Neighborhoods */}
      <View style={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 8 }}>
        <SectionHeader title="EXPLORE BY NEIGHBORHOOD" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {NEIGHBORHOODS.map((n) => (
            <TouchableOpacity
              key={n}
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 10,
                marginRight: 8,
                borderWidth: 1,
                borderColor: '#E5E5EA',
              }}
            >
              <Ionicons name="location-outline" size={13} color="#8E8E93" style={{ marginRight: 5 }} />
              <Text style={{ fontSize: 14, color: '#1C1C1E', fontWeight: '500' }}>{n}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Available guides */}
      <View style={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 48 }}>
        <SectionHeader title="AVAILABLE TODAY" trailing="See all" />
        <EmptyState
          icon="compass-outline"
          title="Guides coming soon"
          body="We're building our community of local guides. Check back soon — or be the first to explore."
          cta="Become a guide"
        />
      </View>
    </ScrollView>
  );
}

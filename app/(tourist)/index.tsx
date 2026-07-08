import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useAuthStore } from '../../store/authStore';

const EXPERIENCES = [
  { id: 'food',        emoji: '🍤', label: 'Local food',      sub: 'Shrimp trucks, poke & more' },
  { id: 'sunrise',     emoji: '🌅', label: 'Sunrise hikes',   sub: 'Diamond Head & beyond' },
  { id: 'surf',        emoji: '🏄', label: 'Surf culture',    sub: 'North Shore immersion' },
  { id: 'scenic',      emoji: '🚗', label: 'Island drive',    sub: 'The full circle tour' },
  { id: 'hidden',      emoji: '☕', label: 'Hidden spots',    sub: 'Where locals actually go' },
  { id: 'first',       emoji: '🌺', label: 'First day',       sub: 'Best way to start your trip' },
];

const NEIGHBORHOODS = ['Waikīkī', 'North Shore', 'Kaimukī', 'Kāneʻohe', 'Hāleʻiwa', 'Mānoa'];

export default function BrowseScreen() {
  const { session } = useAuthStore();
  const firstName = session?.user.user_metadata?.full_name?.split(' ')[0] ?? 'there';

  return (
    <ScrollView className="flex-1 bg-sand" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={{ backgroundColor: '#FFFFFF', paddingTop: 56, paddingHorizontal: 20, paddingBottom: 16 }}>
        <Text style={{ fontSize: 13, color: '#8E8E93', fontWeight: '500', marginBottom: 4 }}>
          Good day, {firstName} 🤙
        </Text>
        <Text style={{ fontSize: 28, fontWeight: '800', color: '#1C1C1E', marginBottom: 16 }}>
          What do you want{'\n'}to experience?
        </Text>

        {/* Search */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#F8F4EC',
          borderRadius: 14,
          paddingHorizontal: 14,
          paddingVertical: 12,
          borderWidth: 1,
          borderColor: '#E5E5EA',
        }}>
          <Text style={{ fontSize: 16, marginRight: 8 }}>🔍</Text>
          <Text style={{ color: '#8E8E93', fontSize: 15 }}>Search experiences, guides, places…</Text>
        </View>
      </View>

      {/* Experience categories */}
      <View style={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 8 }}>
        <Text style={{ fontSize: 13, fontWeight: '700', color: '#8E8E93', letterSpacing: 1, marginBottom: 14 }}>
          EXPERIENCES
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          {EXPERIENCES.map((exp) => (
            <TouchableOpacity
              key={exp.id}
              style={{
                width: '47%',
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: 16,
                borderWidth: 1,
                borderColor: '#E5E5EA',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 6,
              }}
            >
              <Text style={{ fontSize: 28, marginBottom: 8 }}>{exp.emoji}</Text>
              <Text style={{ fontSize: 15, fontWeight: '700', color: '#1C1C1E', marginBottom: 3 }}>
                {exp.label}
              </Text>
              <Text style={{ fontSize: 12, color: '#8E8E93' }}>{exp.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Neighborhoods */}
      <View style={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 8 }}>
        <Text style={{ fontSize: 13, fontWeight: '700', color: '#8E8E93', letterSpacing: 1, marginBottom: 14 }}>
          EXPLORE BY NEIGHBORHOOD
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {NEIGHBORHOODS.map((n) => (
            <TouchableOpacity
              key={n}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 10,
                marginRight: 8,
                borderWidth: 1,
                borderColor: '#E5E5EA',
              }}
            >
              <Text style={{ fontSize: 14, color: '#1C1C1E', fontWeight: '500' }}>{n}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Available guides section */}
      <View style={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 40 }}>
        <Text style={{ fontSize: 13, fontWeight: '700', color: '#8E8E93', letterSpacing: 1, marginBottom: 14 }}>
          AVAILABLE TODAY
        </Text>
        <View style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          padding: 24,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#E5E5EA',
        }}>
          <Text style={{ fontSize: 32, marginBottom: 10 }}>🌺</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#1C1C1E', marginBottom: 6 }}>
            Guides coming soon
          </Text>
          <Text style={{ fontSize: 14, color: '#8E8E93', textAlign: 'center' }}>
            We're recruiting local guides.{'\n'}Check back soon!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

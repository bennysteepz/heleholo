import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const TRUST_SIGNALS = [
  { icon: 'shield-checkmark-outline' as const, label: 'Verified locals' },
  { icon: 'lock-closed-outline' as const,      label: 'Private experiences' },
  { icon: 'ban-outline' as const,              label: 'No tour buses' },
];

const CATEGORIES = [
  { icon: 'restaurant-outline' as const,  label: 'Best local food' },
  { icon: 'sunny-outline' as const,       label: 'Sunrise adventures' },
  { icon: 'water-outline' as const,       label: 'Surf culture' },
  { icon: 'car-outline' as const,         label: 'Scenic island drives' },
  { icon: 'cafe-outline' as const,        label: 'Hidden cafés' },
  { icon: 'flower-outline' as const,      label: 'First day on Oahu' },
];

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#F8F4EC' }}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero */}
      <View
        style={{
          backgroundColor: '#1A6FA0',
          paddingTop: 72,
          paddingBottom: 48,
          paddingHorizontal: 24,
          alignItems: 'center',
        }}
      >
        {/* Decorative blobs */}
        <View style={{ position: 'absolute', top: -50, right: -50, width: 240, height: 240, borderRadius: 120, backgroundColor: '#2288C9', opacity: 0.2 }} />
        <View style={{ position: 'absolute', bottom: 20, left: -30, width: 160, height: 160, borderRadius: 80, backgroundColor: '#F5A623', opacity: 0.1 }} />

        <Text style={{ fontSize: 12, color: '#93C5FD', letterSpacing: 3, fontWeight: '700', marginBottom: 20 }}>
          HELEHOLO
        </Text>
        <Text style={{ fontSize: 36, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', lineHeight: 44, marginBottom: 14 }}>
          Explore Oahu{'\n'}with a local.
        </Text>
        <Text style={{ fontSize: 17, color: '#BFDBFE', textAlign: 'center', lineHeight: 26, maxWidth: 280 }}>
          Spend the day with someone who actually lives here. No scripts. No buses.
        </Text>
      </View>

      {/* Trust row */}
      <View
        style={{
          backgroundColor: '#FFFFFF',
          flexDirection: 'row',
          paddingVertical: 18,
          paddingHorizontal: 12,
          borderBottomWidth: 1,
          borderColor: '#E5E5EA',
        }}
      >
        {TRUST_SIGNALS.map((t, i) => (
          <View key={t.label} style={{ flex: 1, alignItems: 'center', borderRightWidth: i < 2 ? 1 : 0, borderColor: '#E5E5EA' }}>
            <Ionicons name={t.icon} size={18} color="#34C759" style={{ marginBottom: 4 }} />
            <Text style={{ fontSize: 11, color: '#34C759', fontWeight: '700', textAlign: 'center' }}>{t.label}</Text>
          </View>
        ))}
      </View>

      {/* What sets us apart */}
      <View style={{ backgroundColor: '#FFFFFF', paddingHorizontal: 20, paddingTop: 22, paddingBottom: 20, marginTop: 8 }}>
        <Text style={{ fontSize: 11, fontWeight: '700', color: '#8E8E93', letterSpacing: 1, marginBottom: 6 }}>
          WHY HELEHOLO?
        </Text>
        <Text style={{ fontSize: 15, color: '#8E8E93', lineHeight: 22 }}>
          Viator gives you a bus. Airbnb gives you a stranger's house. Heleholo gives you a local friend behind the wheel — someone who knows the shrimp truck that doesn't have a sign, the beach locals actually go to, and the stories that don't make the brochure.
        </Text>
      </View>

      {/* Experience categories */}
      <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 8, marginTop: 8 }}>
        <Text style={{ fontSize: 11, fontWeight: '700', color: '#8E8E93', letterSpacing: 1, marginBottom: 14 }}>
          WHAT DO YOU WANT TO DO?
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {CATEGORIES.map((c) => (
            <View
              key={c.label}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
                paddingHorizontal: 14,
                paddingVertical: 9,
                borderWidth: 1,
                borderColor: '#E5E5EA',
                marginBottom: 0,
              }}
            >
              <Ionicons name={c.icon} size={14} color="#2288C9" style={{ marginRight: 6 }} />
              <Text style={{ fontSize: 13, color: '#1C1C1E', fontWeight: '500' }}>{c.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* CTAs */}
      <View style={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 52 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#2288C9',
            borderRadius: 16,
            paddingVertical: 18,
            alignItems: 'center',
            marginBottom: 12,
            shadowColor: '#2288C9',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
          }}
          onPress={() => router.push('/(auth)/sign-up?role=tourist')}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 17 }}>Find a guide</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            paddingVertical: 18,
            alignItems: 'center',
            marginBottom: 24,
            borderWidth: 1.5,
            borderColor: '#2288C9',
          }}
          onPress={() => router.push('/(auth)/sign-up?role=guide')}
        >
          <Text style={{ color: '#2288C9', fontWeight: '700', fontSize: 17 }}>Become a guide</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.push('/(auth)/sign-in')}>
          <Text style={{ color: '#8E8E93', fontSize: 14 }}>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

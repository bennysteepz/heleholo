import { View, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const TRUST_SIGNALS = [
  { icon: '✓', label: 'Verified local guides' },
  { icon: '✓', label: 'Private experiences' },
  { icon: '✓', label: 'No tour buses' },
];

const EXPERIENCES = [
  '🍤  Best local food',
  '🌅  Sunrise adventures',
  '🏄  Surf culture',
  '🚗  Scenic island drives',
  '☕  Hidden cafés',
  '🌺  First day on Oahu',
];

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-sand" bounces={false} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <View className="h-96 bg-ocean-dark items-center justify-end pb-10 px-6">
        <View
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: '#1A6FA0',
            opacity: 0.95,
          }}
        />
        {/* Decorative circles — placeholders for real photography */}
        <View
          style={{
            position: 'absolute',
            top: -60, right: -60,
            width: 260, height: 260,
            borderRadius: 130,
            backgroundColor: '#2288C9',
            opacity: 0.25,
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 40, left: -40,
            width: 180, height: 180,
            borderRadius: 90,
            backgroundColor: '#F5A623',
            opacity: 0.12,
          }}
        />

        <Text style={{ fontSize: 15, color: '#93C5FD', letterSpacing: 2, fontWeight: '600', marginBottom: 12 }}>
          HELEHOLO
        </Text>
        <Text style={{ fontSize: 34, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', lineHeight: 42, marginBottom: 12 }}>
          Explore Oahu{'\n'}with a local.
        </Text>
        <Text style={{ fontSize: 16, color: '#BFDBFE', textAlign: 'center', lineHeight: 24 }}>
          Spend the day with someone{'\n'}who actually lives here.
        </Text>
      </View>

      {/* Trust signals */}
      <View className="flex-row justify-around px-6 py-5 bg-white border-b border-gray-line">
        {TRUST_SIGNALS.map((t) => (
          <View key={t.label} className="items-center flex-1">
            <Text style={{ fontSize: 13, color: '#34C759', fontWeight: '700' }}>
              {t.icon}  {t.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Experience categories */}
      <View className="px-6 pt-6 pb-2">
        <Text style={{ fontSize: 13, color: '#8E8E93', fontWeight: '600', letterSpacing: 1, marginBottom: 14 }}>
          WHAT DO YOU WANT TO DO?
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {EXPERIENCES.map((e) => (
            <View
              key={e}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderWidth: 1,
                borderColor: '#E5E5EA',
                marginBottom: 8,
              }}
            >
              <Text style={{ fontSize: 13, color: '#1C1C1E', fontWeight: '500' }}>{e}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* CTAs */}
      <View className="px-6 pt-4 pb-12">
        <TouchableOpacity
          style={{
            backgroundColor: '#2288C9',
            borderRadius: 16,
            paddingVertical: 18,
            alignItems: 'center',
            marginBottom: 12,
            shadowColor: '#2288C9',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
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
            marginBottom: 20,
            borderWidth: 1.5,
            borderColor: '#2288C9',
          }}
          onPress={() => router.push('/(auth)/sign-up?role=guide')}
        >
          <Text style={{ color: '#2288C9', fontWeight: '700', fontSize: 17 }}>Become a guide</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center" onPress={() => router.push('/(auth)/sign-in')}>
          <Text style={{ color: '#8E8E93', fontSize: 14 }}>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

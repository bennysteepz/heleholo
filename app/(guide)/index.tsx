import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';

export default function GuideDashboardScreen() {
  const { session } = useAuthStore();
  const [online, setOnline] = useState(false);
  const firstName = session?.user.user_metadata?.full_name?.split(' ')[0] ?? 'Guide';

  return (
    <ScrollView className="flex-1 bg-sand" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={{ backgroundColor: '#FFFFFF', paddingTop: 56, paddingHorizontal: 20, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' }}>
        <Text style={{ fontSize: 13, color: '#8E8E93', fontWeight: '500', marginBottom: 4 }}>
          Aloha, {firstName} 🤙
        </Text>
        <Text style={{ fontSize: 26, fontWeight: '800', color: '#1C1C1E' }}>Your dashboard</Text>
      </View>

      {/* Availability — dominant */}
      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <TouchableOpacity
          onPress={() => setOnline(!online)}
          style={{
            backgroundColor: online ? '#34C759' : '#1C1C1E',
            borderRadius: 20,
            padding: 24,
            alignItems: 'center',
            shadowColor: online ? '#34C759' : '#000',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: online ? 0.35 : 0.15,
            shadowRadius: 12,
          }}
        >
          <Text style={{ fontSize: 36, marginBottom: 10 }}>{online ? '🟢' : '⚫️'}</Text>
          <Text style={{ fontSize: 22, fontWeight: '800', color: '#FFFFFF', marginBottom: 6 }}>
            {online ? 'You\'re Online' : 'You\'re Offline'}
          </Text>
          <Text style={{ fontSize: 14, color: online ? '#D1FAE5' : '#9CA3AF', textAlign: 'center' }}>
            {online
              ? 'Tourists can find and book you right now'
              : 'Tap to go online and start receiving bookings'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Stats row */}
      <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 16, gap: 10 }}>
        {[
          { label: 'Today', value: '0', sub: 'bookings' },
          { label: 'Rating', value: '—', sub: 'avg score' },
          { label: 'Response', value: '—', sub: 'avg time' },
        ].map((stat) => (
          <View
            key={stat.label}
            style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              padding: 14,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#E5E5EA',
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: '800', color: '#1C1C1E' }}>{stat.value}</Text>
            <Text style={{ fontSize: 11, color: '#8E8E93', marginTop: 2 }}>{stat.sub}</Text>
          </View>
        ))}
      </View>

      {/* Today's requests */}
      <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
        <Text style={{ fontSize: 13, fontWeight: '700', color: '#8E8E93', letterSpacing: 1, marginBottom: 12 }}>
          TODAY'S REQUESTS
        </Text>
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: '#E5E5EA' }}>
          <Text style={{ fontSize: 24, marginBottom: 8 }}>📭</Text>
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#1C1C1E', marginBottom: 4 }}>No requests yet</Text>
          <Text style={{ fontSize: 13, color: '#8E8E93', textAlign: 'center' }}>
            Go online to start receiving booking requests
          </Text>
        </View>
      </View>

      {/* Upcoming tours */}
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <Text style={{ fontSize: 13, fontWeight: '700', color: '#8E8E93', letterSpacing: 1, marginBottom: 12 }}>
          UPCOMING TOURS
        </Text>
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: '#E5E5EA' }}>
          <Text style={{ fontSize: 24, marginBottom: 8 }}>🗓️</Text>
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#1C1C1E', marginBottom: 4 }}>Nothing scheduled</Text>
          <Text style={{ fontSize: 13, color: '#8E8E93', textAlign: 'center' }}>
            Your confirmed tours will appear here
          </Text>
        </View>
      </View>

      {/* Weekly earnings */}
      <View style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 40 }}>
        <View style={{ backgroundColor: '#EBF5FB', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#BFDBFE' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ fontSize: 12, color: '#2288C9', fontWeight: '600', marginBottom: 4 }}>THIS WEEK</Text>
              <Text style={{ fontSize: 32, fontWeight: '800', color: '#1A6FA0' }}>$0</Text>
            </View>
            <Text style={{ fontSize: 32 }}>💰</Text>
          </View>
          <Text style={{ fontSize: 13, color: '#2288C9', marginTop: 8 }}>0 tours completed this week</Text>
        </View>
      </View>
    </ScrollView>
  );
}

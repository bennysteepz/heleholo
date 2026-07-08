import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';
import { EmptyState } from '../../components/ui/EmptyState';
import { SectionHeader } from '../../components/ui/SectionHeader';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface KpiCardProps {
  icon: IoniconName;
  label: string;
  value: string;
  sub: string;
}

function KpiCard({ icon, label, value, sub }: KpiCardProps) {
  return (
    <View
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
      <Ionicons name={icon} size={18} color="#8E8E93" style={{ marginBottom: 6 }} />
      <Text style={{ fontSize: 20, fontWeight: '800', color: '#1C1C1E' }}>{value}</Text>
      <Text style={{ fontSize: 10, color: '#8E8E93', marginTop: 2, textAlign: 'center' }}>{sub}</Text>
    </View>
  );
}

export default function GuideDashboardScreen() {
  const { session } = useAuthStore();
  const [online, setOnline] = useState(false);
  const firstName = session?.user.user_metadata?.full_name?.split(' ')[0] ?? 'Guide';

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
        <Text style={{ fontSize: 26, fontWeight: '800', color: '#1C1C1E' }}>Your dashboard</Text>
      </View>

      {/* Availability card — dominant */}
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setOnline(!online)}
          style={{
            backgroundColor: online ? '#1A7A3C' : '#1C1C1E',
            borderRadius: 20,
            padding: 26,
            shadowColor: online ? '#34C759' : '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: online ? 0.3 : 0.12,
            shadowRadius: 16,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <View
              style={{
                backgroundColor: online ? '#34C759' : '#3A3A3C',
                borderRadius: 10,
                paddingHorizontal: 12,
                paddingVertical: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: 7, height: 7, borderRadius: 4,
                  backgroundColor: online ? '#FFFFFF' : '#8E8E93',
                  marginRight: 6,
                }}
              />
              <Text style={{ fontSize: 12, fontWeight: '700', color: online ? '#FFFFFF' : '#8E8E93' }}>
                {online ? 'ONLINE' : 'OFFLINE'}
              </Text>
            </View>
            <Ionicons name={online ? 'radio-button-on' : 'radio-button-off'} size={24} color={online ? '#34C759' : '#8E8E93'} />
          </View>

          <Text style={{ fontSize: 26, fontWeight: '800', color: '#FFFFFF', marginBottom: 8 }}>
            {online ? 'You\'re live' : 'You\'re offline'}
          </Text>
          <Text style={{ fontSize: 14, color: online ? '#86EFAC' : '#6B7280', lineHeight: 20 }}>
            {online
              ? 'Tourists can find and book you right now. Stay responsive to get more requests.'
              : 'Go online to start receiving booking requests from tourists in Oahu.'}
          </Text>

          {!online && (
            <View
              style={{
                marginTop: 18,
                backgroundColor: '#2288C9',
                borderRadius: 12,
                paddingVertical: 13,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 15 }}>Go online</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* KPI row */}
      <View style={{ paddingHorizontal: 20, paddingTop: 14, flexDirection: 'row', gap: 10 }}>
        <KpiCard icon="calendar-outline"    label="Bookings"  value="0"  sub="today" />
        <KpiCard icon="star-outline"        label="Rating"    value="—"  sub="avg score" />
        <KpiCard icon="time-outline"        label="Response"  value="—"  sub="avg time" />
      </View>

      {/* Today's requests */}
      <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
        <SectionHeader title="TODAY'S REQUESTS" trailing="View all" />
        <EmptyState
          icon="mail-outline"
          title="No requests yet"
          body={online
            ? "Booking requests will appear here. Stay online and respond quickly."
            : "Go online on your dashboard to start receiving booking requests."}
        />
      </View>

      {/* Upcoming tours */}
      <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
        <SectionHeader title="UPCOMING TOURS" trailing="View all" />
        <EmptyState
          icon="map-outline"
          title="Nothing scheduled"
          body="Confirmed tours will appear here. Accepted bookings become scheduled tours."
        />
      </View>

      {/* Weekly earnings */}
      <View style={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 48 }}>
        <SectionHeader title="THIS WEEK" />
        <View
          style={{
            backgroundColor: '#EBF5FB',
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: '#BFDBFE',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text style={{ fontSize: 12, color: '#2288C9', fontWeight: '600', marginBottom: 4 }}>EARNINGS</Text>
            <Text style={{ fontSize: 34, fontWeight: '800', color: '#1A6FA0' }}>$0</Text>
            <Text style={{ fontSize: 13, color: '#2288C9', marginTop: 4 }}>0 tours completed</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Ionicons name="cash-outline" size={40} color="#2288C9" style={{ opacity: 0.4 }} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

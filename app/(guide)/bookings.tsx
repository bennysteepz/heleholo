import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';

const TABS = ['Requests', 'Upcoming', 'Completed', 'Cancelled'];

export default function GuideBookingsScreen() {
  const [activeTab, setActiveTab] = useState(0);

  const EMPTY_STATES: Record<number, { icon: string; title: string; body: string }> = {
    0: { icon: '📬', title: 'No pending requests', body: 'Go online on your dashboard to start receiving booking requests.' },
    1: { icon: '🗓️', title: 'No upcoming tours',   body: 'Confirmed bookings will appear here.' },
    2: { icon: '✅', title: 'No completed tours', body: 'Once you complete a tour it will show here with earnings and reviews.' },
    3: { icon: '🚫', title: 'No cancellations',   body: 'Cancelled bookings will be listed here.' },
  };

  const empty = EMPTY_STATES[activeTab];

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F4EC' }}>
      {/* Header */}
      <View style={{ backgroundColor: '#FFFFFF', paddingTop: 56, paddingHorizontal: 20, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' }}>
        <Text style={{ fontSize: 26, fontWeight: '800', color: '#1C1C1E' }}>Bookings</Text>
      </View>

      {/* Tabs */}
      <View style={{ backgroundColor: '#FFFFFF', paddingHorizontal: 16, paddingBottom: 12 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {TABS.map((tab, i) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(i)}
              style={{
                paddingHorizontal: 18,
                paddingVertical: 9,
                marginRight: 8,
                borderRadius: 20,
                backgroundColor: activeTab === i ? '#2288C9' : '#F8F4EC',
                borderWidth: 1,
                borderColor: activeTab === i ? '#2288C9' : '#E5E5EA',
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: '600', color: activeTab === i ? '#FFFFFF' : '#8E8E93' }}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 20, padding: 32, alignItems: 'center', borderWidth: 1, borderColor: '#E5E5EA' }}>
          <Text style={{ fontSize: 32, marginBottom: 12 }}>{empty.icon}</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#1C1C1E', marginBottom: 8, textAlign: 'center' }}>
            {empty.title}
          </Text>
          <Text style={{ fontSize: 14, color: '#8E8E93', textAlign: 'center', lineHeight: 20 }}>
            {empty.body}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

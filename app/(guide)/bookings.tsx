import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { EmptyState } from '../../components/ui/EmptyState';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const TABS: { label: string; icon: IoniconName; emptyIcon: IoniconName; title: string; body: string }[] = [
  {
    label: 'Requests',
    icon: 'mail-outline',
    emptyIcon: 'mail-outline',
    title: 'No pending requests',
    body: 'Go online on your dashboard to start receiving booking requests from tourists.',
  },
  {
    label: 'Upcoming',
    icon: 'calendar-outline',
    emptyIcon: 'map-outline',
    title: 'No upcoming tours',
    body: 'Confirmed bookings become scheduled tours. Accept a request to get started.',
  },
  {
    label: 'Completed',
    icon: 'checkmark-circle-outline',
    emptyIcon: 'ribbon-outline',
    title: 'No completed tours yet',
    body: 'Statistics, ratings, and earnings appear here after your first completed experience.',
  },
  {
    label: 'Cancelled',
    icon: 'close-circle-outline',
    emptyIcon: 'ban-outline',
    title: 'No cancellations',
    body: 'Cancelled bookings will be listed here for your records.',
  },
];

export default function GuideBookingsScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = TABS[activeTab];

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F4EC' }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: '#FFFFFF',
          paddingTop: 58,
          paddingHorizontal: 20,
          paddingBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#E5E5EA',
        }}
      >
        <Text style={{ fontSize: 26, fontWeight: '800', color: '#1C1C1E', marginBottom: 16 }}>Bookings</Text>

        {/* Segmented control */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -4 }}>
          {TABS.map((t, i) => {
            const active = i === activeTab;
            return (
              <TouchableOpacity
                key={t.label}
                onPress={() => setActiveTab(i)}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 9,
                  marginHorizontal: 4,
                  borderRadius: 20,
                  backgroundColor: active ? '#2288C9' : '#F8F4EC',
                  borderWidth: 1,
                  borderColor: active ? '#2288C9' : '#E5E5EA',
                }}
              >
                <Ionicons name={t.icon} size={13} color={active ? '#FFFFFF' : '#8E8E93'} style={{ marginRight: 5 }} />
                <Text style={{ fontSize: 13, fontWeight: '600', color: active ? '#FFFFFF' : '#8E8E93' }}>
                  {t.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, paddingBottom: 48 }}>
        <EmptyState icon={tab.emptyIcon} title={tab.title} body={tab.body} />
      </ScrollView>
    </View>
  );
}

import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SectionHeader } from '../../components/ui/SectionHeader';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
  icon?: IoniconName;
}

function StatCard({ label, value, sub, accent, icon }: StatCardProps) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: accent ? '#EBF5FB' : '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: accent ? '#BFDBFE' : '#E5E5EA',
      }}
    >
      <Text style={{ fontSize: 10, fontWeight: '700', color: accent ? '#2288C9' : '#8E8E93', letterSpacing: 1, marginBottom: 8 }}>
        {label}
      </Text>
      <Text style={{ fontSize: 26, fontWeight: '800', color: accent ? '#1A6FA0' : '#1C1C1E', marginBottom: 4 }}>
        {value}
      </Text>
      {sub ? (
        <Text style={{ fontSize: 12, color: accent ? '#2288C9' : '#8E8E93' }}>{sub}</Text>
      ) : null}
    </View>
  );
}

interface PerformanceRowProps {
  icon: IoniconName;
  label: string;
  value: string;
  note: string;
}

function PerformanceRow({ icon, label, value, note }: PerformanceRowProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E5E5EA',
        marginBottom: 10,
      }}
    >
      <View
        style={{
          width: 36, height: 36, borderRadius: 10,
          backgroundColor: '#F8F4EC',
          alignItems: 'center', justifyContent: 'center',
          marginRight: 14,
        }}
      >
        <Ionicons name={icon} size={18} color="#2288C9" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#1C1C1E' }}>{label}</Text>
        <Text style={{ fontSize: 12, color: '#8E8E93', marginTop: 2 }}>{note}</Text>
      </View>
      <Text style={{ fontSize: 18, fontWeight: '800', color: '#1C1C1E' }}>{value}</Text>
    </View>
  );
}

export default function GuideEarningsScreen() {
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
        <Text style={{ fontSize: 26, fontWeight: '800', color: '#1C1C1E' }}>Earnings</Text>
        <Text style={{ fontSize: 14, color: '#8E8E93', marginTop: 4 }}>
          Statistics appear after your first completed tour.
        </Text>
      </View>

      {/* Period totals */}
      <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
        <SectionHeader title="TOTALS" />
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <StatCard label="THIS WEEK"  value="$0" sub="0 tours" accent />
          <StatCard label="THIS MONTH" value="$0" sub="0 tours" />
          <StatCard label="ALL TIME"   value="$0" sub="0 tours" />
        </View>
      </View>

      {/* Performance */}
      <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
        <SectionHeader title="PERFORMANCE" />
        <PerformanceRow
          icon="checkmark-done-outline"
          label="Completion rate"
          value="—"
          note="Tours completed vs accepted"
        />
        <PerformanceRow
          icon="cash-outline"
          label="Avg booking value"
          value="—"
          note="Average per tour"
        />
        <PerformanceRow
          icon="time-outline"
          label="Response time"
          value="—"
          note="Average reply to requests"
        />
        <PerformanceRow
          icon="star-outline"
          label="Rating"
          value="—"
          note="Average from tourist reviews"
        />
      </View>

      {/* Payouts */}
      <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
        <SectionHeader title="PAYOUTS" />

        {/* Upcoming payout */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: '#E5E5EA',
            marginBottom: 12,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 44, height: 44, borderRadius: 12,
              backgroundColor: '#EBF5FB',
              alignItems: 'center', justifyContent: 'center',
              marginRight: 14,
            }}
          >
            <Ionicons name="card-outline" size={22} color="#2288C9" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, color: '#8E8E93', marginBottom: 3 }}>Upcoming payout</Text>
            <Text style={{ fontSize: 24, fontWeight: '800', color: '#1C1C1E' }}>$0.00</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 11, color: '#8E8E93' }}>Every Monday</Text>
            <Text style={{ fontSize: 11, color: '#8E8E93', marginTop: 2 }}>via Stripe</Text>
          </View>
        </View>

        {/* Payout history empty state */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 28,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#E5E5EA',
          }}
        >
          <View
            style={{
              width: 48, height: 48, borderRadius: 24,
              backgroundColor: '#F8F4EC',
              alignItems: 'center', justifyContent: 'center',
              marginBottom: 12,
            }}
          >
            <Ionicons name="receipt-outline" size={22} color="#8E8E93" />
          </View>
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#1C1C1E', marginBottom: 6 }}>No payout history</Text>
          <Text style={{ fontSize: 13, color: '#8E8E93', textAlign: 'center', lineHeight: 18 }}>
            Payouts begin after your first completed tour. They'll be listed here with full details.
          </Text>
        </View>
      </View>

      {/* Stripe notice */}
      <View style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 52 }}>
        <View
          style={{
            backgroundColor: '#EBF5FB',
            borderRadius: 16,
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#BFDBFE',
          }}
        >
          <View
            style={{
              width: 40, height: 40, borderRadius: 10,
              backgroundColor: '#2288C9',
              alignItems: 'center', justifyContent: 'center',
              marginRight: 14,
            }}
          >
            <Ionicons name="logo-apple" size={20} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#1A6FA0', marginBottom: 2 }}>Powered by Stripe</Text>
            <Text style={{ fontSize: 12, color: '#2288C9' }}>Connect your bank account to receive weekly payouts</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#2288C9" />
        </View>
      </View>
    </ScrollView>
  );
}

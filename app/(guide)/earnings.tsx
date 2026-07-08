import { View, Text, ScrollView } from 'react-native';

const STAT_CARD = ({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) => (
  <View style={{
    flex: 1,
    backgroundColor: accent ? '#EBF5FB' : '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: accent ? '#BFDBFE' : '#E5E5EA',
  }}>
    <Text style={{ fontSize: 11, fontWeight: '700', color: accent ? '#2288C9' : '#8E8E93', letterSpacing: 1, marginBottom: 6 }}>
      {label}
    </Text>
    <Text style={{ fontSize: 28, fontWeight: '800', color: accent ? '#1A6FA0' : '#1C1C1E' }}>{value}</Text>
    {sub ? <Text style={{ fontSize: 12, color: '#8E8E93', marginTop: 3 }}>{sub}</Text> : null}
  </View>
);

export default function GuideEarningsScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F8F4EC' }} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={{ backgroundColor: '#FFFFFF', paddingTop: 56, paddingHorizontal: 20, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' }}>
        <Text style={{ fontSize: 26, fontWeight: '800', color: '#1C1C1E' }}>Earnings</Text>
      </View>

      {/* Period totals */}
      <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
        <Text style={{ fontSize: 11, fontWeight: '700', color: '#8E8E93', letterSpacing: 1, marginBottom: 12 }}>TOTALS</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <STAT_CARD label="THIS WEEK"  value="$0"  sub="0 tours"   accent />
          <STAT_CARD label="THIS MONTH" value="$0"  sub="0 tours" />
          <STAT_CARD label="ALL TIME"   value="$0"  sub="0 tours" />
        </View>
      </View>

      {/* Performance */}
      <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
        <Text style={{ fontSize: 11, fontWeight: '700', color: '#8E8E93', letterSpacing: 1, marginBottom: 12 }}>PERFORMANCE</Text>
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
          <STAT_CARD label="COMPLETION RATE"     value="—"   sub="of bookings" />
          <STAT_CARD label="AVG BOOKING VALUE"   value="—"   sub="per tour" />
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <STAT_CARD label="RESPONSE TIME" value="—"  sub="avg reply" />
          <STAT_CARD label="RATING"         value="—"  sub="avg score" />
        </View>
      </View>

      {/* Payouts */}
      <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
        <Text style={{ fontSize: 11, fontWeight: '700', color: '#8E8E93', letterSpacing: 1, marginBottom: 12 }}>PAYOUTS</Text>
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#E5E5EA', marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ fontSize: 12, color: '#8E8E93', marginBottom: 4 }}>Upcoming payout</Text>
              <Text style={{ fontSize: 24, fontWeight: '800', color: '#1C1C1E' }}>$0.00</Text>
            </View>
            <Text style={{ fontSize: 24 }}>🏦</Text>
          </View>
          <Text style={{ fontSize: 12, color: '#8E8E93', marginTop: 8 }}>Paid out every Monday via Stripe</Text>
        </View>

        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: '#E5E5EA' }}>
          <Text style={{ fontSize: 24, marginBottom: 8 }}>📊</Text>
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#1C1C1E', marginBottom: 4 }}>No payout history</Text>
          <Text style={{ fontSize: 13, color: '#8E8E93', textAlign: 'center' }}>
            Your completed payouts will appear here once you complete your first tour.
          </Text>
        </View>
      </View>

      {/* Stripe notice */}
      <View style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 48 }}>
        <View style={{ backgroundColor: '#EBF5FB', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#BFDBFE' }}>
          <Text style={{ fontSize: 20, marginRight: 12 }}>💳</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#1A6FA0', marginBottom: 2 }}>Payments via Stripe</Text>
            <Text style={{ fontSize: 12, color: '#2288C9' }}>Connect your bank account to receive payouts</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

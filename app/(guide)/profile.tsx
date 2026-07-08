import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { EmptyState } from '../../components/ui/EmptyState';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];
type VerificationStatus = 'not_started' | 'pending' | 'verified' | 'needs_attention';

interface VerificationItem {
  label: string;
  status: VerificationStatus;
}

const VERIFICATION_ITEMS: VerificationItem[] = [
  { label: 'Identity verified',    status: 'pending' },
  { label: "Driver's license",     status: 'not_started' },
  { label: 'Vehicle insurance',    status: 'not_started' },
  { label: 'Background check',     status: 'not_started' },
];

const STATUS_CONFIG: Record<VerificationStatus, { color: string; bg: string; label: string; icon: IoniconName }> = {
  verified:       { color: '#34C759', bg: '#D1FAE5', label: 'Verified',       icon: 'checkmark' },
  pending:        { color: '#F5A623', bg: '#FEF3C7', label: 'Pending',         icon: 'time-outline' },
  not_started:    { color: '#C7C7CC', bg: '#F2F2F7', label: 'Not started',     icon: 'ellipse-outline' },
  needs_attention:{ color: '#D94F6B', bg: '#FFE5E5', label: 'Needs attention', icon: 'alert-circle-outline' },
};

const PROFILE_SECTIONS: { icon: IoniconName; label: string; sub: string }[] = [
  { icon: 'create-outline',   label: 'Bio',              sub: 'Tell tourists about yourself' },
  { icon: 'language-outline', label: 'Languages',        sub: 'Add languages you speak' },
  { icon: 'car-sport-outline',label: 'Vehicle',          sub: 'Add your vehicle details' },
  { icon: 'location-outline', label: 'Areas you know',   sub: 'Neighborhoods & regions' },
  { icon: 'pricetag-outline', label: 'Tour categories',  sub: 'Food, Scenic, Adventure…' },
  { icon: 'images-outline',   label: 'Photos',           sub: 'Showcase your tours' },
];

export default function GuideProfileScreen() {
  const { session } = useAuthStore();
  const name = session?.user.user_metadata?.full_name ?? 'Guide';
  const email = session?.user.email ?? '';
  const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  const verifiedCount = VERIFICATION_ITEMS.filter((v) => v.status === 'verified').length;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F8F4EC' }} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View
        style={{
          backgroundColor: '#FFFFFF',
          paddingTop: 58,
          paddingHorizontal: 20,
          paddingBottom: 24,
          borderBottomWidth: 1,
          borderBottomColor: '#E5E5EA',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 64, height: 64, borderRadius: 32,
              backgroundColor: '#1C1C1E',
              alignItems: 'center', justifyContent: 'center',
              marginRight: 16,
            }}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: '700' }}>{initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#1C1C1E' }}>{name}</Text>
            <Text style={{ fontSize: 13, color: '#8E8E93', marginTop: 3 }}>{email}</Text>
          </View>
          <TouchableOpacity
            style={{
              width: 36, height: 36, borderRadius: 18,
              backgroundColor: '#F8F4EC',
              alignItems: 'center', justifyContent: 'center',
              borderWidth: 1, borderColor: '#E5E5EA',
            }}
          >
            <Ionicons name="create-outline" size={16} color="#8E8E93" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Approval notice — Apple review card style */}
      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <View
          style={{
            backgroundColor: '#FFFBEB',
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: '#FDE68A',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#F5A623', marginRight: 10 }} />
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#92400E' }}>Profile Under Review</Text>
          </View>
          <Text style={{ fontSize: 14, color: '#78350F', lineHeight: 20, marginBottom: 14 }}>
            Thanks for applying to be a heleholo guide. We review each application carefully — usually under 24 hours.
          </Text>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#D97706', marginRight: 4 }}>
              View submitted information
            </Text>
            <Ionicons name="chevron-forward" size={14} color="#D97706" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Verification checklist */}
      <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
        <SectionHeader title={`VERIFICATION (${verifiedCount}/${VERIFICATION_ITEMS.length} complete)`} />
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#E5E5EA',
          }}
        >
          {VERIFICATION_ITEMS.map((item, idx) => {
            const cfg = STATUS_CONFIG[item.status];
            return (
              <View
                key={item.label}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 15,
                  borderTopWidth: idx > 0 ? 1 : 0,
                  borderColor: '#E5E5EA',
                }}
              >
                <View
                  style={{
                    width: 28, height: 28, borderRadius: 14,
                    backgroundColor: cfg.bg,
                    alignItems: 'center', justifyContent: 'center',
                    marginRight: 14,
                  }}
                >
                  <Ionicons name={cfg.icon} size={15} color={cfg.color} />
                </View>
                <Text style={{ flex: 1, fontSize: 15, color: '#1C1C1E', fontWeight: '500' }}>
                  {item.label}
                </Text>
                <Text style={{ fontSize: 12, fontWeight: '600', color: cfg.color }}>{cfg.label}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Profile info */}
      <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
        <SectionHeader title="PROFILE INFO" />
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#E5E5EA',
          }}
        >
          {PROFILE_SECTIONS.map((item, idx) => (
            <TouchableOpacity
              key={item.label}
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 15,
                borderTopWidth: idx > 0 ? 1 : 0,
                borderColor: '#E5E5EA',
              }}
            >
              <View
                style={{
                  width: 32, height: 32, borderRadius: 8,
                  backgroundColor: '#F8F4EC',
                  alignItems: 'center', justifyContent: 'center',
                  marginRight: 14,
                }}
              >
                <Ionicons name={item.icon} size={16} color="#2288C9" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, color: '#1C1C1E', fontWeight: '500' }}>{item.label}</Text>
                <Text style={{ fontSize: 12, color: '#8E8E93', marginTop: 2 }}>{item.sub}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Ratings */}
      <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
        <SectionHeader title="RATINGS" />
        <EmptyState
          icon="star-outline"
          title="No reviews yet"
          body="Ratings from tourists appear here after your first completed tour."
        />
      </View>

      {/* Sign out */}
      <View style={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 52 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            paddingVertical: 16,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#FFE5E5',
          }}
          onPress={() => supabase.auth.signOut({ scope: 'local' })}
        >
          <Text style={{ color: '#D94F6B', fontWeight: '600', fontSize: 15 }}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

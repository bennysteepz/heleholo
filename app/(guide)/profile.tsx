import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';

const SECTION_ITEMS = [
  { icon: '📝', label: 'Bio',               sub: 'Tell tourists about yourself' },
  { icon: '🗣️', label: 'Languages',          sub: 'Add languages you speak' },
  { icon: '🚗', label: 'Vehicle',            sub: 'Add your vehicle details' },
  { icon: '📍', label: 'Areas you know',     sub: 'Neighborhoods & regions' },
  { icon: '🗺️', label: 'Tour categories',    sub: 'Food, Scenic, Adventure…' },
  { icon: '📷', label: 'Photos',             sub: 'Add photos of your tours' },
];

const VERIFICATION_ITEMS = [
  { label: 'Identity verified',   done: false },
  { label: "Driver's license",    done: false },
  { label: 'Vehicle insurance',   done: false },
  { label: 'Background check',    done: false },
];

export default function GuideProfileScreen() {
  const { session } = useAuthStore();
  const name = session?.user.user_metadata?.full_name ?? 'Guide';
  const email = session?.user.email ?? '';
  const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  const doneCount = VERIFICATION_ITEMS.filter((v) => v.done).length;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F8F4EC' }} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={{ backgroundColor: '#FFFFFF', paddingTop: 56, paddingHorizontal: 20, paddingBottom: 24, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{
            width: 64, height: 64, borderRadius: 32,
            backgroundColor: '#1C1C1E',
            alignItems: 'center', justifyContent: 'center',
            marginRight: 16,
          }}>
            <Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: '700' }}>{initials}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#1C1C1E' }}>{name}</Text>
            <Text style={{ fontSize: 14, color: '#8E8E93', marginTop: 2 }}>{email}</Text>
          </View>
        </View>
      </View>

      {/* Approval notice — Apple review card style */}
      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <View style={{
          backgroundColor: '#FFFBEB',
          borderRadius: 16,
          padding: 20,
          borderWidth: 1,
          borderColor: '#FDE68A',
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Text style={{ fontSize: 18, marginRight: 8 }}>🟡</Text>
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#92400E' }}>Profile Under Review</Text>
          </View>
          <Text style={{ fontSize: 14, color: '#78350F', lineHeight: 20, marginBottom: 12 }}>
            Thanks for applying to be a heleholo guide. We review each application carefully — usually under 24 hours.
          </Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#D97706' }}>View submitted information ›</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Verification checklist */}
      <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
        <Text style={{ fontSize: 11, fontWeight: '700', color: '#8E8E93', letterSpacing: 1, marginBottom: 12 }}>
          VERIFICATION ({doneCount}/{VERIFICATION_ITEMS.length} complete)
        </Text>
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#E5E5EA' }}>
          {VERIFICATION_ITEMS.map((item, idx) => (
            <View
              key={item.label}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 14,
                borderTopWidth: idx > 0 ? 1 : 0,
                borderColor: '#E5E5EA',
              }}
            >
              <View style={{
                width: 22, height: 22, borderRadius: 11,
                backgroundColor: item.done ? '#34C759' : '#E5E5EA',
                alignItems: 'center', justifyContent: 'center',
                marginRight: 14,
              }}>
                {item.done && <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '700' }}>✓</Text>}
              </View>
              <Text style={{ fontSize: 15, color: item.done ? '#1C1C1E' : '#8E8E93', fontWeight: '500' }}>
                {item.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Profile sections */}
      <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
        <Text style={{ fontSize: 11, fontWeight: '700', color: '#8E8E93', letterSpacing: 1, marginBottom: 12 }}>
          PROFILE INFO
        </Text>
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#E5E5EA' }}>
          {SECTION_ITEMS.map((item, idx) => (
            <TouchableOpacity
              key={item.label}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 14,
                borderTopWidth: idx > 0 ? 1 : 0,
                borderColor: '#E5E5EA',
              }}
            >
              <Text style={{ fontSize: 18, marginRight: 14 }}>{item.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, color: '#1C1C1E', fontWeight: '500' }}>{item.label}</Text>
                <Text style={{ fontSize: 12, color: '#8E8E93', marginTop: 2 }}>{item.sub}</Text>
              </View>
              <Text style={{ color: '#C7C7CC', fontSize: 18 }}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Ratings */}
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <Text style={{ fontSize: 11, fontWeight: '700', color: '#8E8E93', letterSpacing: 1, marginBottom: 12 }}>RATINGS</Text>
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: '#E5E5EA' }}>
          <Text style={{ fontSize: 24, marginBottom: 8 }}>⭐</Text>
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#1C1C1E', marginBottom: 4 }}>No reviews yet</Text>
          <Text style={{ fontSize: 13, color: '#8E8E93', textAlign: 'center' }}>
            Ratings from tourists will appear here after your first tour.
          </Text>
        </View>
      </View>

      {/* Sign out */}
      <View style={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 48 }}>
        <TouchableOpacity
          style={{ backgroundColor: '#FFFFFF', borderRadius: 16, paddingVertical: 16, alignItems: 'center', borderWidth: 1, borderColor: '#FFE5E5' }}
          onPress={() => supabase.auth.signOut()}
        >
          <Text style={{ color: '#D94F6B', fontWeight: '600', fontSize: 15 }}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

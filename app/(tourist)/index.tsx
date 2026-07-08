import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';
import { supabase } from '../../lib/supabase';
import { Adventure } from '../../types/database';
import { AdventureCard } from '../../components/AdventureCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { ErrorCard } from '../../components/ui/ErrorCard';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { GuideCardSkeleton } from '../../components/ui/Skeleton';

const CATEGORIES = [
  { id: 'all',       icon: 'apps-outline' as const,        label: 'All' },
  { id: 'food',      icon: 'restaurant-outline' as const,  label: 'Local Food' },
  { id: 'sunrise',   icon: 'sunny-outline' as const,       label: 'Sunrise' },
  { id: 'surf',      icon: 'water-outline' as const,       label: 'Surf' },
  { id: 'scenic',    icon: 'car-outline' as const,         label: 'Scenic Drive' },
  { id: 'hidden',    icon: 'cafe-outline' as const,        label: 'Hidden Spots' },
  { id: 'photo',     icon: 'camera-outline' as const,      label: 'Photography' },
  { id: 'family',    icon: 'people-outline' as const,      label: 'Family' },
  { id: 'history',   icon: 'library-outline' as const,     label: 'History' },
];

const CATEGORY_DB_MAP: Record<string, string[]> = {
  food:    ['Local Food'],
  sunrise: ['Sunrise Hike'],
  surf:    ['Surf Culture'],
  scenic:  ['Scenic Drive'],
  hidden:  ['Hidden Spots'],
  photo:   ['Photography'],
  family:  ['Family Friendly'],
  history: ['History & Culture'],
};

export default function BrowseScreen() {
  const { session } = useAuthStore();
  const firstName = session?.user.user_metadata?.full_name?.split(' ')[0] ?? 'there';

  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const fetchAdventures = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('adventures')
        .select('*, guide:guide_id(*)')
        .eq('is_active', true)
        .order('rating', { ascending: false });

      if (activeCategory !== 'all') {
        const dbCategories = CATEGORY_DB_MAP[activeCategory];
        if (dbCategories?.length) {
          query = query.in('category', dbCategories);
        }
      }

      const { data, error: err } = await query;
      if (err) throw err;
      setAdventures((data as Adventure[]) ?? []);
    } catch (e: any) {
      setError('Could not load adventures. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, [activeCategory]);

  useEffect(() => { fetchAdventures(); }, [fetchAdventures]);

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
        <Text style={{ fontSize: 28, fontWeight: '800', color: '#1C1C1E', marginBottom: 18, lineHeight: 34 }}>
          What do you want{'\n'}to experience?
        </Text>

        {/* Search bar */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F8F4EC',
            borderRadius: 14,
            paddingHorizontal: 14,
            paddingVertical: 13,
            borderWidth: 1.5,
            borderColor: '#E5E5EA',
          }}
        >
          <Ionicons name="search-outline" size={18} color="#8E8E93" style={{ marginRight: 10 }} />
          <Text style={{ color: '#8E8E93', fontSize: 15 }}>Search experiences, guides, places…</Text>
        </TouchableOpacity>
      </View>

      {/* Category filter chips */}
      <View style={{ paddingTop: 16, paddingBottom: 8 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}>
          {CATEGORIES.map((cat) => {
            const active = cat.id === activeCategory;
            return (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setActiveCategory(cat.id)}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 14,
                  paddingVertical: 9,
                  borderRadius: 20,
                  backgroundColor: active ? '#2288C9' : '#FFFFFF',
                  borderWidth: 1,
                  borderColor: active ? '#2288C9' : '#E5E5EA',
                }}
              >
                <Ionicons name={cat.icon} size={13} color={active ? '#FFFFFF' : '#8E8E93'} style={{ marginRight: 5 }} />
                <Text style={{ fontSize: 13, fontWeight: '600', color: active ? '#FFFFFF' : '#8E8E93' }}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Adventures list */}
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 48 }}>
        <SectionHeader
          title={activeCategory === 'all' ? 'ALL EXPERIENCES' : CATEGORIES.find(c => c.id === activeCategory)?.label.toUpperCase() ?? 'EXPERIENCES'}
          trailing={adventures.length > 0 ? `${adventures.length} available` : undefined}
        />

        {error ? (
          <ErrorCard message={error} onRetry={fetchAdventures} />
        ) : loading ? (
          <>
            <GuideCardSkeleton />
            <GuideCardSkeleton />
            <GuideCardSkeleton />
          </>
        ) : adventures.length === 0 ? (
          <EmptyState
            icon="compass-outline"
            title="No experiences found"
            body="Try a different category or check back soon as guides join the platform."
          />
        ) : (
          adventures.map((adv) => (
            <AdventureCard key={adv.id} adventure={adv} />
          ))
        )}
      </View>
    </ScrollView>
  );
}

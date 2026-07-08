import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../../lib/supabase';
import { Adventure, AdventureLeg, Review } from '../../../types/database';

export default function AdventureDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [adventure, setAdventure] = useState<Adventure | null>(null);
  const [legs, setLegs] = useState<AdventureLeg[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const [advRes, legsRes, revRes] = await Promise.all([
        supabase.from('adventures').select('*, guide:guide_id(*)').eq('id', id).single(),
        supabase.from('adventure_legs').select('*').eq('adventure_id', id).order('order_index'),
        supabase.from('reviews').select('*, tourist:tourist_id(full_name, avatar_url)').eq('adventure_id', id).order('created_at', { ascending: false }),
      ]);
      if (advRes.data) setAdventure(advRes.data as Adventure);
      if (legsRes.data) setLegs(legsRes.data as AdventureLeg[]);
      if (revRes.data)  setReviews(revRes.data as Review[]);
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#F8F4EC', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#2288C9" />
      </View>
    );
  }

  if (!adventure) {
    return (
      <View style={{ flex: 1, backgroundColor: '#F8F4EC', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <Ionicons name="alert-circle-outline" size={40} color="#8E8E93" />
        <Text style={{ fontSize: 16, color: '#8E8E93', marginTop: 12 }}>Adventure not found.</Text>
      </View>
    );
  }

  const guide = adventure.guide;

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F4EC' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero photo */}
        <View style={{ position: 'relative' }}>
          {adventure.photo_url ? (
            <Image source={{ uri: adventure.photo_url }} style={{ width: '100%', height: 300 }} resizeMode="cover" />
          ) : (
            <View style={{ width: '100%', height: 300, backgroundColor: '#EBF5FB' }} />
          )}

          {/* Back button */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              position: 'absolute', top: 56, left: 20,
              width: 40, height: 40, borderRadius: 20,
              backgroundColor: 'rgba(0,0,0,0.45)',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Category pill */}
          <View style={{
            position: 'absolute', bottom: 16, left: 16,
            backgroundColor: 'rgba(28,28,30,0.75)',
            borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5,
          }}>
            <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '700' }}>{adventure.category}</Text>
          </View>
        </View>

        {/* Main content */}
        <View style={{ padding: 20 }}>
          {/* Title + rating */}
          <Text style={{ fontSize: 24, fontWeight: '800', color: '#1C1C1E', lineHeight: 30, marginBottom: 10 }}>
            {adventure.title}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
            {adventure.rating && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="star" size={14} color="#F5A623" style={{ marginRight: 4 }} />
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#1C1C1E' }}>
                  {Number(adventure.rating).toFixed(2)}
                </Text>
                <Text style={{ fontSize: 13, color: '#8E8E93', marginLeft: 4 }}>({adventure.review_count} reviews)</Text>
              </View>
            )}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="time-outline" size={14} color="#8E8E93" style={{ marginRight: 4 }} />
              <Text style={{ fontSize: 13, color: '#8E8E93' }}>{adventure.duration_hours}h</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="people-outline" size={14} color="#8E8E93" style={{ marginRight: 4 }} />
              <Text style={{ fontSize: 13, color: '#8E8E93' }}>Up to {adventure.max_guests} guests</Text>
            </View>
            {adventure.neighborhood && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="location-outline" size={14} color="#8E8E93" style={{ marginRight: 4 }} />
                <Text style={{ fontSize: 13, color: '#8E8E93' }}>{adventure.neighborhood}</Text>
              </View>
            )}
          </View>

          {/* Guide card */}
          {guide && (
            <View style={{
              backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16,
              borderWidth: 1, borderColor: '#E5E5EA', marginBottom: 20,
              flexDirection: 'row', alignItems: 'center',
            }}>
              {guide.avatar_url ? (
                <Image source={{ uri: guide.avatar_url }} style={{ width: 52, height: 52, borderRadius: 26, marginRight: 14 }} />
              ) : (
                <View style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: '#EBF5FB', marginRight: 14, alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name="person-outline" size={24} color="#2288C9" />
                </View>
              )}
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#1C1C1E', marginBottom: 2 }}>{guide.full_name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                  {guide.verified && (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Ionicons name="shield-checkmark" size={12} color="#34C759" style={{ marginRight: 3 }} />
                      <Text style={{ fontSize: 11, fontWeight: '700', color: '#34C759' }}>Verified Local</Text>
                    </View>
                  )}
                  {guide.years_on_oahu && (
                    <Text style={{ fontSize: 12, color: '#8E8E93' }}>{guide.years_on_oahu} yrs on Oahu</Text>
                  )}
                  {guide.response_time && (
                    <Text style={{ fontSize: 12, color: '#8E8E93' }}>{guide.response_time}</Text>
                  )}
                </View>
                {guide.languages?.length > 0 && (
                  <Text style={{ fontSize: 12, color: '#8E8E93', marginTop: 3 }}>
                    Speaks {guide.languages.join(', ')}
                  </Text>
                )}
              </View>
            </View>
          )}

          {/* Description */}
          <Text style={{ fontSize: 11, fontWeight: '700', color: '#8E8E93', letterSpacing: 1, marginBottom: 10 }}>ABOUT THIS EXPERIENCE</Text>
          <Text style={{ fontSize: 15, color: '#1C1C1E', lineHeight: 24, marginBottom: 24 }}>{adventure.description}</Text>

          {/* What's included */}
          {adventure.included?.length > 0 && (
            <View style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 11, fontWeight: '700', color: '#8E8E93', letterSpacing: 1, marginBottom: 12 }}>WHAT'S INCLUDED</Text>
              <View style={{ backgroundColor: '#FFFFFF', borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#E5E5EA' }}>
                {adventure.included.map((item, idx) => (
                  <View key={idx} style={{
                    flexDirection: 'row', alignItems: 'center',
                    paddingHorizontal: 16, paddingVertical: 12,
                    borderTopWidth: idx > 0 ? 1 : 0, borderColor: '#E5E5EA',
                  }}>
                    <Ionicons name="checkmark-circle" size={16} color="#34C759" style={{ marginRight: 12 }} />
                    <Text style={{ fontSize: 14, color: '#1C1C1E' }}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Adventure legs */}
          {legs.length > 0 && (
            <View style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 11, fontWeight: '700', color: '#8E8E93', letterSpacing: 1, marginBottom: 12 }}>THE DAY'S STOPS</Text>
              <View style={{ backgroundColor: '#FFFFFF', borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#E5E5EA' }}>
                {legs.map((leg, idx) => (
                  <View key={leg.id} style={{
                    flexDirection: 'row',
                    paddingHorizontal: 16, paddingVertical: 14,
                    borderTopWidth: idx > 0 ? 1 : 0, borderColor: '#E5E5EA',
                  }}>
                    <View style={{
                      width: 26, height: 26, borderRadius: 13,
                      backgroundColor: '#EBF5FB',
                      alignItems: 'center', justifyContent: 'center',
                      marginRight: 12, marginTop: 1,
                    }}>
                      <Text style={{ fontSize: 11, fontWeight: '700', color: '#2288C9' }}>{idx + 1}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
                        <Text style={{ fontSize: 14, fontWeight: '700', color: '#1C1C1E', flex: 1 }}>{leg.title}</Text>
                        {leg.is_optional && (
                          <Text style={{ fontSize: 11, color: '#8E8E93', fontWeight: '600' }}>Optional</Text>
                        )}
                      </View>
                      {leg.description && (
                        <Text style={{ fontSize: 13, color: '#8E8E93', lineHeight: 18 }}>{leg.description}</Text>
                      )}
                      {leg.duration_minutes && (
                        <Text style={{ fontSize: 12, color: '#2288C9', marginTop: 4 }}>~{leg.duration_minutes} min</Text>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Reviews */}
          {reviews.length > 0 && (
            <View style={{ marginBottom: 32 }}>
              <Text style={{ fontSize: 11, fontWeight: '700', color: '#8E8E93', letterSpacing: 1, marginBottom: 12 }}>
                REVIEWS ({reviews.length})
              </Text>
              {reviews.map((rev) => (
                <View key={rev.id} style={{
                  backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16,
                  borderWidth: 1, borderColor: '#E5E5EA', marginBottom: 10,
                }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    {(rev.tourist as any)?.avatar_url ? (
                      <Image source={{ uri: (rev.tourist as any).avatar_url }} style={{ width: 32, height: 32, borderRadius: 16, marginRight: 10 }} />
                    ) : (
                      <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#EBF5FB', marginRight: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Ionicons name="person-outline" size={15} color="#2288C9" />
                      </View>
                    )}
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 13, fontWeight: '700', color: '#1C1C1E' }}>{(rev.tourist as any)?.full_name ?? 'Guest'}</Text>
                      <Text style={{ fontSize: 11, color: '#8E8E93' }}>{new Date(rev.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Ionicons key={i} name="star" size={12} color="#F5A623" />
                      ))}
                    </View>
                  </View>
                  <Text style={{ fontSize: 14, color: '#1C1C1E', lineHeight: 20 }}>{rev.body}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Sticky book bar */}
      <View style={{
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20, paddingVertical: 16,
        paddingBottom: 32,
        borderTopWidth: 1, borderColor: '#E5E5EA',
        flexDirection: 'row', alignItems: 'center',
      }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 22, fontWeight: '800', color: '#1C1C1E' }}>
            ${adventure.price_per_person}
          </Text>
          <Text style={{ fontSize: 12, color: '#8E8E93' }}>per person</Text>
        </View>
        <TouchableOpacity style={{
          backgroundColor: '#2288C9', borderRadius: 14,
          paddingHorizontal: 32, paddingVertical: 16,
          shadowColor: '#2288C9', shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3, shadowRadius: 8,
        }}>
          <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>Book now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

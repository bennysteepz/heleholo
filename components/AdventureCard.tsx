import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Adventure } from '../types/database';

interface AdventureCardProps {
  adventure: Adventure;
  onPress?: () => void;
}

export function AdventureCard({ adventure, onPress }: AdventureCardProps) {
  const guide = adventure.guide;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E5E5EA',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        marginBottom: 16,
      }}
    >
      {/* Photo */}
      {adventure.photo_url ? (
        <Image
          source={{ uri: adventure.photo_url }}
          style={{ width: '100%', height: 200 }}
          resizeMode="cover"
        />
      ) : (
        <View style={{ width: '100%', height: 200, backgroundColor: '#EBF5FB', alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="image-outline" size={32} color="#BFDBFE" />
        </View>
      )}

      {/* Category pill */}
      <View
        style={{
          position: 'absolute',
          top: 14,
          left: 14,
          backgroundColor: 'rgba(28,28,30,0.75)',
          borderRadius: 20,
          paddingHorizontal: 12,
          paddingVertical: 5,
        }}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '700' }}>{adventure.category}</Text>
      </View>

      {/* Content */}
      <View style={{ padding: 16 }}>
        {/* Guide row */}
        {guide && (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            {guide.avatar_url ? (
              <Image
                source={{ uri: guide.avatar_url }}
                style={{ width: 26, height: 26, borderRadius: 13, marginRight: 8, borderWidth: 1.5, borderColor: '#E5E5EA' }}
              />
            ) : (
              <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: '#EBF5FB', marginRight: 8, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="person-outline" size={13} color="#2288C9" />
              </View>
            )}
            <Text style={{ fontSize: 13, fontWeight: '600', color: '#1C1C1E', flex: 1 }}>{guide.full_name}</Text>
            {guide.verified && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="shield-checkmark" size={13} color="#34C759" style={{ marginRight: 3 }} />
                <Text style={{ fontSize: 11, fontWeight: '700', color: '#34C759' }}>Verified Local</Text>
              </View>
            )}
          </View>
        )}

        {/* Title */}
        <Text
          style={{ fontSize: 16, fontWeight: '800', color: '#1C1C1E', marginBottom: 6, lineHeight: 22 }}
          numberOfLines={2}
        >
          {adventure.title}
        </Text>

        {/* Meta row */}
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
          {adventure.neighborhood && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="location-outline" size={13} color="#8E8E93" style={{ marginRight: 3 }} />
              <Text style={{ fontSize: 13, color: '#8E8E93' }}>{adventure.neighborhood}</Text>
            </View>
          )}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="time-outline" size={13} color="#8E8E93" style={{ marginRight: 3 }} />
            <Text style={{ fontSize: 13, color: '#8E8E93' }}>{adventure.duration_hours}h</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="people-outline" size={13} color="#8E8E93" style={{ marginRight: 3 }} />
            <Text style={{ fontSize: 13, color: '#8E8E93' }}>Up to {adventure.max_guests}</Text>
          </View>
        </View>

        {/* Price & rating row */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 17, fontWeight: '800', color: '#1C1C1E' }}>
            ${adventure.price_per_person}
            <Text style={{ fontSize: 13, fontWeight: '400', color: '#8E8E93' }}> / person</Text>
          </Text>
          {adventure.rating && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="star" size={13} color="#F5A623" style={{ marginRight: 3 }} />
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#1C1C1E' }}>
                {adventure.rating.toFixed(2)}
              </Text>
              <Text style={{ fontSize: 13, color: '#8E8E93', marginLeft: 3 }}>
                ({adventure.review_count})
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

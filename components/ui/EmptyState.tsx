import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  body: string;
  cta?: string;
  onCta?: () => void;
}

export function EmptyState({ icon, title, body, cta, onCta }: EmptyStateProps) {
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 32,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E5EA',
      }}
    >
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: '#F8F4EC',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 14,
        }}
      >
        <Ionicons name={icon} size={26} color="#8E8E93" />
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          color: '#1C1C1E',
          marginBottom: 8,
          textAlign: 'center',
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: '#8E8E93',
          textAlign: 'center',
          lineHeight: 20,
        }}
      >
        {body}
      </Text>
      {cta && onCta && (
        <TouchableOpacity
          onPress={onCta}
          style={{
            marginTop: 18,
            backgroundColor: '#2288C9',
            borderRadius: 12,
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 14 }}>{cta}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

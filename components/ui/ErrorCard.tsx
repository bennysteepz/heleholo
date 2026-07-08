import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ErrorCardProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorCard({
  title = 'Something went wrong',
  message,
  onRetry,
}: ErrorCardProps) {
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFE5E5',
        marginHorizontal: 20,
      }}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: '#FFF0F0',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 12,
        }}
      >
        <Ionicons name="wifi-outline" size={22} color="#D94F6B" />
      </View>
      <Text style={{ fontSize: 15, fontWeight: '700', color: '#1C1C1E', marginBottom: 6 }}>
        {title}
      </Text>
      <Text style={{ fontSize: 13, color: '#8E8E93', textAlign: 'center', lineHeight: 18, marginBottom: 16 }}>
        {message}
      </Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F8F4EC',
            borderRadius: 10,
            paddingHorizontal: 16,
            paddingVertical: 9,
            borderWidth: 1,
            borderColor: '#E5E5EA',
          }}
        >
          <Ionicons name="refresh-outline" size={14} color="#1C1C1E" style={{ marginRight: 6 }} />
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#1C1C1E' }}>Try again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

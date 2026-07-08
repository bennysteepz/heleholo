import { View, Text } from 'react-native';

interface SectionHeaderProps {
  title: string;
  trailing?: string;
}

export function SectionHeader({ title, trailing }: SectionHeaderProps) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
      <Text style={{ fontSize: 11, fontWeight: '700', color: '#8E8E93', letterSpacing: 1 }}>
        {title}
      </Text>
      {trailing ? (
        <Text style={{ fontSize: 13, fontWeight: '600', color: '#2288C9' }}>{trailing}</Text>
      ) : null}
    </View>
  );
}

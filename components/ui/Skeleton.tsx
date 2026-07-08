import { useEffect, useRef } from 'react';
import { Animated, View, StyleProp, ViewStyle } from 'react-native';

interface SkeletonProps {
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

export function Skeleton({ width, height, borderRadius = 10, style }: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 750, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.35, duration: 750, useNativeDriver: true }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        { width: width as number, height, borderRadius, backgroundColor: '#E5E5EA', opacity },
        style,
      ]}
    />
  );
}

export function CardSkeleton() {
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E5E5EA',
        marginBottom: 12,
      }}
    >
      <Skeleton width="60%" height={14} borderRadius={7} style={{ marginBottom: 10 }} />
      <Skeleton width="100%" height={10} borderRadius={5} style={{ marginBottom: 6 }} />
      <Skeleton width="80%" height={10} borderRadius={5} />
    </View>
  );
}

export function GuideCardSkeleton() {
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E5E5EA',
        marginBottom: 12,
      }}
    >
      <Skeleton width="100%" height={180} borderRadius={0} />
      <View style={{ padding: 14 }}>
        <Skeleton width="50%" height={14} borderRadius={7} style={{ marginBottom: 8 }} />
        <Skeleton width="75%" height={10} borderRadius={5} style={{ marginBottom: 6 }} />
        <Skeleton width="40%" height={10} borderRadius={5} />
      </View>
    </View>
  );
}

export function StatSkeleton() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 14,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E5EA',
      }}
    >
      <Skeleton width={40} height={24} borderRadius={6} style={{ marginBottom: 6 }} />
      <Skeleton width={50} height={10} borderRadius={5} />
    </View>
  );
}

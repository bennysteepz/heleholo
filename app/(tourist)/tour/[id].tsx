import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ActiveTourScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      <Text className="text-4xl mb-4">🚗</Text>
      <Text className="text-2xl font-bold text-gray-900 mb-2">Tour in progress</Text>
      <Text className="text-gray-500 text-center mb-8">
        Your guide is on the way. Sit back and enjoy the ride.
      </Text>

      <View className="w-full bg-primary-50 rounded-2xl p-4 mb-4">
        <Text className="text-sm text-gray-500">Status</Text>
        <Text className="text-lg font-semibold text-primary-600 mt-1">Active</Text>
      </View>

      <TouchableOpacity className="w-full border border-gray-200 rounded-2xl py-4 items-center">
        <Text className="text-gray-700 font-medium">Message guide</Text>
      </TouchableOpacity>
    </View>
  );
}

import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';

const DURATIONS = [1, 2, 4, 8];

export default function BookingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [duration, setDuration] = useState(2);

  return (
    <ScrollView className="flex-1 bg-white" contentContainerClassName="px-5 pt-14 pb-12">
      <Text className="text-2xl font-bold text-gray-900 mb-6">Book your tour</Text>

      <Text className="text-sm font-medium text-gray-700 mb-3">Duration</Text>
      <View className="flex-row gap-3 mb-6">
        {DURATIONS.map((d) => (
          <TouchableOpacity
            key={d}
            className={`flex-1 py-3 rounded-xl border items-center ${
              duration === d ? 'bg-primary-500 border-primary-500' : 'border-gray-200'
            }`}
            onPress={() => setDuration(d)}
          >
            <Text className={`font-medium ${duration === d ? 'text-white' : 'text-gray-700'}`}>
              {d}h
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="bg-gray-50 rounded-2xl p-4 mb-6">
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Tour price</Text>
          <Text className="text-gray-900 font-medium">${duration * 40}</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Platform fee</Text>
          <Text className="text-gray-900 font-medium">${Math.round(duration * 40 * 0.18)}</Text>
        </View>
        <View className="border-t border-gray-200 mt-2 pt-2 flex-row justify-between">
          <Text className="font-semibold text-gray-900">Total</Text>
          <Text className="font-semibold text-gray-900">
            ${duration * 40 + Math.round(duration * 40 * 0.18)}
          </Text>
        </View>
      </View>

      <TouchableOpacity className="bg-primary-500 rounded-2xl py-4 items-center">
        <Text className="text-white font-semibold text-base">Confirm & Pay</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

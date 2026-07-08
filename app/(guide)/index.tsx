import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';

export default function GuideDashboardScreen() {
  const { session } = useAuthStore();
  const [available, setAvailable] = useState(false);
  const name = session?.user.user_metadata?.full_name ?? 'Guide';

  return (
    <ScrollView className="flex-1 bg-white" contentContainerClassName="px-5 pt-14 pb-12">
      <Text className="text-2xl font-bold text-gray-900 mb-1">Aloha, {name} 🤙</Text>
      <Text className="text-gray-500 mb-6">Here's your dashboard.</Text>

      <View className="flex-row items-center justify-between bg-gray-50 rounded-2xl p-4 mb-4">
        <View>
          <Text className="text-sm font-medium text-gray-700">Availability</Text>
          <Text className={`text-sm mt-1 ${available ? 'text-green-500' : 'text-gray-400'}`}>
            {available ? 'Active — you can receive bookings' : 'Inactive'}
          </Text>
        </View>
        <TouchableOpacity
          className={`w-14 h-8 rounded-full ${available ? 'bg-green-400' : 'bg-gray-300'} items-end justify-center px-1`}
          onPress={() => setAvailable(!available)}
        >
          <View className="w-6 h-6 bg-white rounded-full" />
        </TouchableOpacity>
      </View>

      <View className="bg-primary-50 rounded-2xl p-4 mb-4">
        <Text className="text-sm text-gray-500">Today's bookings</Text>
        <Text className="text-3xl font-bold text-primary-600 mt-1">0</Text>
      </View>

      <View className="bg-gray-50 rounded-2xl p-4">
        <Text className="text-sm text-gray-500">Total earnings</Text>
        <Text className="text-3xl font-bold text-gray-900 mt-1">$0</Text>
      </View>
    </ScrollView>
  );
}

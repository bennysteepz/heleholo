import { View, Text, ScrollView } from 'react-native';

export default function GuideBookingsScreen() {
  return (
    <ScrollView className="flex-1 bg-white" contentContainerClassName="px-5 pt-14 pb-12">
      <Text className="text-2xl font-bold text-gray-900 mb-6">Bookings</Text>

      <Text className="text-xs text-gray-400 uppercase tracking-wide mb-3">Pending</Text>
      <View className="bg-gray-50 rounded-2xl p-6 items-center mb-6">
        <Text className="text-gray-400 text-sm">No pending bookings</Text>
      </View>

      <Text className="text-xs text-gray-400 uppercase tracking-wide mb-3">Upcoming</Text>
      <View className="bg-gray-50 rounded-2xl p-6 items-center">
        <Text className="text-gray-400 text-sm">No upcoming bookings</Text>
      </View>
    </ScrollView>
  );
}

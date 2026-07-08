import { View, Text, ScrollView } from 'react-native';

export default function GuideEarningsScreen() {
  return (
    <ScrollView className="flex-1 bg-white" contentContainerClassName="px-5 pt-14 pb-12">
      <Text className="text-2xl font-bold text-gray-900 mb-6">Earnings</Text>

      <View className="flex-row gap-3 mb-6">
        <View className="flex-1 bg-primary-50 rounded-2xl p-4">
          <Text className="text-xs text-gray-500">This week</Text>
          <Text className="text-2xl font-bold text-primary-600 mt-1">$0</Text>
        </View>
        <View className="flex-1 bg-gray-50 rounded-2xl p-4">
          <Text className="text-xs text-gray-500">All time</Text>
          <Text className="text-2xl font-bold text-gray-900 mt-1">$0</Text>
        </View>
      </View>

      <Text className="text-xs text-gray-400 uppercase tracking-wide mb-3">History</Text>
      <View className="bg-gray-50 rounded-2xl p-6 items-center">
        <Text className="text-gray-400 text-sm">No completed tours yet</Text>
      </View>
    </ScrollView>
  );
}

import { View, Text, ScrollView } from 'react-native';

export default function ApprovalsScreen() {
  return (
    <ScrollView className="flex-1 bg-white" contentContainerClassName="px-5 pt-14 pb-12">
      <Text className="text-2xl font-bold text-gray-900 mb-6">Guide approvals</Text>

      <View className="bg-gray-50 rounded-2xl p-6 items-center">
        <Text className="text-gray-400 text-sm">No pending applications</Text>
      </View>
    </ScrollView>
  );
}

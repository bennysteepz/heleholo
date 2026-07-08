import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function GuideProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="h-48 bg-primary-100 items-center justify-center">
        <Text className="text-6xl">🧑‍🦱</Text>
      </View>

      <View className="px-5 pt-5">
        <Text className="text-2xl font-bold text-gray-900">Guide Name</Text>
        <Text className="text-primary-500 font-medium mt-1">⭐ 4.9 · 32 tours</Text>
        <Text className="text-gray-500 mt-3 leading-relaxed">
          Guide bio will load from Supabase here.
        </Text>

        <View className="mt-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Tours offered</Text>
          <View className="bg-gray-50 rounded-2xl p-4 mb-3">
            <Text className="font-medium text-gray-800">Tour listing placeholder</Text>
            <Text className="text-gray-500 text-sm mt-1">2 hours · $80</Text>
          </View>
        </View>

        <TouchableOpacity
          className="bg-primary-500 rounded-2xl py-4 items-center mt-6 mb-10"
          onPress={() => router.push(`/(tourist)/book/${id}`)}
        >
          <Text className="text-white font-semibold text-base">Book this guide</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

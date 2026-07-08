import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';

export default function TouristProfileScreen() {
  const { session } = useAuthStore();
  const name = session?.user.user_metadata?.full_name ?? 'Traveler';

  return (
    <ScrollView className="flex-1 bg-white" contentContainerClassName="px-5 pt-14 pb-12">
      <Text className="text-2xl font-bold text-gray-900 mb-1">{name}</Text>
      <Text className="text-gray-500 mb-8">{session?.user.email}</Text>

      <View className="bg-gray-50 rounded-2xl p-4 mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-1">Interests</Text>
        <Text className="text-gray-500 text-sm">Not set yet</Text>
      </View>

      <View className="bg-gray-50 rounded-2xl p-4 mb-8">
        <Text className="text-sm font-medium text-gray-700 mb-1">Past tours</Text>
        <Text className="text-gray-500 text-sm">No tours yet</Text>
      </View>

      <TouchableOpacity
        className="border border-red-200 rounded-2xl py-4 items-center"
        onPress={() => supabase.auth.signOut()}
      >
        <Text className="text-red-500 font-medium">Sign out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

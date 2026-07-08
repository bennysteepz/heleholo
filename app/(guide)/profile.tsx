import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';

export default function GuideProfileScreen() {
  const { session } = useAuthStore();
  const name = session?.user.user_metadata?.full_name ?? 'Guide';

  return (
    <ScrollView className="flex-1 bg-white" contentContainerClassName="px-5 pt-14 pb-12">
      <Text className="text-2xl font-bold text-gray-900 mb-1">{name}</Text>
      <Text className="text-gray-500 mb-8">{session?.user.email}</Text>

      <View className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
        <Text className="text-amber-700 text-sm font-medium">Pending approval</Text>
        <Text className="text-amber-600 text-xs mt-1">
          Your guide profile is under review. We'll notify you once approved.
        </Text>
      </View>

      <View className="bg-gray-50 rounded-2xl p-4 mb-3">
        <Text className="text-sm font-medium text-gray-700 mb-1">Bio</Text>
        <Text className="text-gray-400 text-sm">Not set — tap to edit</Text>
      </View>

      <View className="bg-gray-50 rounded-2xl p-4 mb-8">
        <Text className="text-sm font-medium text-gray-700 mb-1">Tours</Text>
        <Text className="text-gray-400 text-sm">No tours added yet</Text>
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

import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      <Text className="text-4xl font-bold text-primary-600 mb-2">heleholo</Text>
      <Text className="text-base text-gray-500 mb-12 text-center">
        Real local guides. Real Oahu.
      </Text>

      <TouchableOpacity
        className="w-full bg-primary-500 rounded-2xl py-4 mb-4 items-center"
        onPress={() => router.push('/(auth)/sign-up?role=tourist')}
      >
        <Text className="text-white font-semibold text-base">I'm a tourist</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="w-full border-2 border-primary-500 rounded-2xl py-4 mb-8 items-center"
        onPress={() => router.push('/(auth)/sign-up?role=guide')}
      >
        <Text className="text-primary-500 font-semibold text-base">I'm a local guide</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(auth)/sign-in')}>
        <Text className="text-gray-400 text-sm">Already have an account? Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

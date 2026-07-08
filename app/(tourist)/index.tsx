import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { CATEGORIES } from '../../constants/categories';

export default function BrowseScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <View className="flex-1 bg-white">
      <View className="px-5 pt-14 pb-4 bg-white border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900 mb-4">Find a guide</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-1">
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              className={`mr-2 px-4 py-2 rounded-full border ${
                selectedCategory === cat.id
                  ? 'bg-primary-500 border-primary-500'
                  : 'bg-white border-gray-200'
              }`}
              onPress={() =>
                setSelectedCategory(selectedCategory === cat.id ? null : cat.id)
              }
            >
              <Text
                className={`text-sm font-medium ${
                  selectedCategory === cat.id ? 'text-white' : 'text-gray-700'
                }`}
              >
                {cat.emoji} {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView className="flex-1 px-5 pt-4">
        <Text className="text-xs text-gray-400 uppercase tracking-wide mb-3">
          Available today
        </Text>

        {/* Guide cards will be populated from Supabase */}
        <View className="bg-gray-50 rounded-2xl p-8 items-center">
          <Text className="text-3xl mb-2">🌺</Text>
          <Text className="text-gray-500 text-center text-sm">
            Guides are being recruited.{'\n'}Check back soon!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { supabase } from '../../lib/supabase';

export default function SignUpScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: 'tourist' | 'guide' }>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const isGuide = role === 'guide';

  async function handleSignUp() {
    if (!email || !password || !fullName) {
      Alert.alert('Missing fields', 'Please fill in all fields.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role: role ?? 'tourist' },
      },
    });
    setLoading(false);
    if (error) {
      Alert.alert('Sign up failed', error.message);
    }
  }

  return (
    <ScrollView className="flex-1 bg-white" contentContainerClassName="px-6 pt-16 pb-12">
      <Text className="text-2xl font-bold text-gray-900 mb-1">
        {isGuide ? 'Become a guide' : 'Create your account'}
      </Text>
      <Text className="text-gray-500 mb-8">
        {isGuide
          ? 'Share your Oahu with the world.'
          : 'Find your perfect local experience.'}
      </Text>

      <Text className="text-sm font-medium text-gray-700 mb-1">Full name</Text>
      <TextInput
        className="border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-900"
        placeholder="Your name"
        value={fullName}
        onChangeText={setFullName}
        autoCapitalize="words"
      />

      <Text className="text-sm font-medium text-gray-700 mb-1">Email</Text>
      <TextInput
        className="border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-900"
        placeholder="you@example.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text className="text-sm font-medium text-gray-700 mb-1">Password</Text>
      <TextInput
        className="border border-gray-200 rounded-xl px-4 py-3 mb-8 text-gray-900"
        placeholder="Min 8 characters"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        className={`rounded-2xl py-4 items-center mb-4 ${loading ? 'bg-primary-300' : 'bg-primary-500'}`}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text className="text-white font-semibold text-base">
          {loading ? 'Creating account...' : 'Create account'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(auth)/sign-in')} className="items-center">
        <Text className="text-gray-400 text-sm">Already have an account? Sign in</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

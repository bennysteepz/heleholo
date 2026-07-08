import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    if (!email || !password) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) Alert.alert('Sign in failed', error.message);
  }

  return (
    <View className="flex-1 bg-white px-6 pt-16">
      <Text className="text-2xl font-bold text-gray-900 mb-1">Welcome back</Text>
      <Text className="text-gray-500 mb-8">Sign in to continue.</Text>

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
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        className={`rounded-2xl py-4 items-center mb-4 ${loading ? 'bg-primary-300' : 'bg-primary-500'}`}
        onPress={handleSignIn}
        disabled={loading}
      >
        <Text className="text-white font-semibold text-base">
          {loading ? 'Signing in...' : 'Sign in'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} className="items-center">
        <Text className="text-gray-400 text-sm">Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

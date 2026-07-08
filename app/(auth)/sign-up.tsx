import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
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
      options: { data: { full_name: fullName, role: role ?? 'tourist' } },
    });
    setLoading(false);
    if (error) Alert.alert('Sign up failed', error.message);
  }

  const inputStyle = {
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1C1C1E',
    backgroundColor: '#FFFFFF',
    marginBottom: 14,
  };

  const labelStyle = {
    fontSize: 13,
    fontWeight: '600' as const,
    color: '#8E8E93',
    letterSpacing: 0.5,
    marginBottom: 6,
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#F8F4EC' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: 56, paddingBottom: 48 }}>
        <Text style={{ fontSize: 13, color: '#2288C9', fontWeight: '700', letterSpacing: 2, marginBottom: 12 }}>
          {isGuide ? 'BECOME A GUIDE' : 'CREATE ACCOUNT'}
        </Text>
        <Text style={{ fontSize: 30, fontWeight: '800', color: '#1C1C1E', marginBottom: 6 }}>
          {isGuide ? 'Share your Oahu.' : 'Find a local experience.'}
        </Text>
        <Text style={{ fontSize: 16, color: '#8E8E93', marginBottom: 32, lineHeight: 22 }}>
          {isGuide
            ? 'Join our community of local guides and earn by showing visitors the real Oahu.'
            : 'Connect with local guides and experience the island like you actually live there.'}
        </Text>

        <Text style={labelStyle}>FULL NAME</Text>
        <TextInput
          style={inputStyle}
          placeholder="Your name"
          placeholderTextColor="#C7C7CC"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
        />

        <Text style={labelStyle}>EMAIL</Text>
        <TextInput
          style={inputStyle}
          placeholder="you@example.com"
          placeholderTextColor="#C7C7CC"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={labelStyle}>PASSWORD</Text>
        <TextInput
          style={{ ...inputStyle, marginBottom: 28 }}
          placeholder="Min 8 characters"
          placeholderTextColor="#C7C7CC"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={{
            backgroundColor: loading ? '#BFDBFE' : '#2288C9',
            borderRadius: 16,
            paddingVertical: 18,
            alignItems: 'center',
            marginBottom: 14,
            shadowColor: '#2288C9',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
          }}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 17 }}>
            {loading ? 'Creating account…' : isGuide ? 'Apply to be a guide' : 'Create account'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.push('/(auth)/sign-in')}>
          <Text style={{ color: '#8E8E93', fontSize: 14 }}>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

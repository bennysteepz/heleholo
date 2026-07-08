import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
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
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 48 }}>
        <Text style={{ fontSize: 13, color: '#2288C9', fontWeight: '700', letterSpacing: 2, marginBottom: 12 }}>
          HELEHOLO
        </Text>
        <Text style={{ fontSize: 30, fontWeight: '800', color: '#1C1C1E', marginBottom: 6 }}>
          Welcome back
        </Text>
        <Text style={{ fontSize: 16, color: '#8E8E93', marginBottom: 32 }}>
          Sign in to continue.
        </Text>

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
          placeholder="Password"
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
          onPress={handleSignIn}
          disabled={loading}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 17 }}>
            {loading ? 'Signing in…' : 'Sign in'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.back()}>
          <Text style={{ color: '#8E8E93', fontSize: 14 }}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

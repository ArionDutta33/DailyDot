import { Redirect, Stack, Tabs } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  TextInput,
  TextInputBase,
  Button,
  Text,
  Pressable,
} from 'react-native';

import { useAuth } from '~/provider/AuthProvider';
import { supabase } from '~/utils/supabase';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Login',
          animation: 'fade',
          animationTypeForReplace: 'push',
          animationDuration: 500,
          headerStyle: { backgroundColor: '' },
          headerTitleStyle: { color: 'white' },
        }}
      />
      <View className="flex-1 bg-[rgb(39,38,38)] p-4">
        <View className="mt-8 gap-4 ">
          <Text className="text-white">Email</Text>
          <TextInput
            placeholderTextColor="gray"
            onChangeText={(text) => setEmail(text)}
            value={email}
            className="border border-white text-white"
            placeholder="email@address.com"
            autoCapitalize="none"
          />
        </View>
        <View className=" my-8 gap-4">
          <Text className="text-white">Password</Text>
          <TextInput
            placeholderTextColor="gray"
            className="border border-white text-white"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
          />
        </View>
        <View className=" my-4 gap-4">
          <Pressable onPress={signInWithEmail} className=" bg-[crimson] p-4 ">
            <Text className="text-center text-xl font-bold text-white">Login</Text>
          </Pressable>
          <Pressable onPress={signUpWithEmail} className="bg-white ">
            <Text className=" p-4 text-center text-xl font-bold text-[crimson]">Register</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

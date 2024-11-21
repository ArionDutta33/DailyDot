import { Redirect } from 'expo-router';
import React from 'react';
import { View, Text, Pressable } from 'react-native';

import { useAuth } from '~/provider/AuthProvider';
import { supabase } from '~/utils/supabase';

const Profile = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }
  return (
    <View>
      <Text>Profile</Text>
      <Pressable
        onPress={() => {
          console.log('logout');
          supabase.auth.signOut();
        }}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Profile;

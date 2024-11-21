import React from 'react';
import { View, Text, Pressable } from 'react-native';

import { supabase } from '~/utils/supabase';

const Profile = () => {
  return (
    <View>
      <Text>Profile</Text>
      <Pressable
        onPress={() => {
          supabase.auth.signOut();
        }}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Profile;

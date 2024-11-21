import { Redirect } from 'expo-router';
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { BarChart, LineChart, PieChart, PopulationPyramid } from 'react-native-gifted-charts';

import { useAuth } from '~/provider/AuthProvider';
import { supabase } from '~/utils/supabase';

const Profile = () => {
  const { isAuthenticated } = useAuth();
  const pieData = [
    { value: 70, color: 'crimson' },

    { value: 30, color: 'gray' },
  ];

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }
  return (
    <>
      <View className="flex-1  bg-[rgb(39,38,38)]">
        <Text>Profile</Text>
        <Pressable
          onPress={() => {
            console.log('logout');
            supabase.auth.signOut();
          }}>
          <Text>Logout</Text>
        </Pressable>
        <View>
          <PieChart
            donut
            innerRadius={110}
            animationDuration={1000}
            isAnimated
            innerCircleColor="rgb(39,38,38)]"
            data={pieData}
            centerLabelComponent={() => {
              return <Text style={{ fontSize: 30, color: 'white' }}>70%</Text>;
            }}
          />
        </View>
      </View>
    </>
  );
};

export default Profile;

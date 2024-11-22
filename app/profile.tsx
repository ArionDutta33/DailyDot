import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { BarChart, LineChart, PieChart, PopulationPyramid } from 'react-native-gifted-charts';

import { useAuth } from '~/provider/AuthProvider';
import { supabase } from '~/utils/supabase';

const Profile = () => {
  const { isAuthenticated, user } = useAuth();

  // const fetchCompletedTasks = async () => {
  //   const { data: todos, error } = await supabase
  //     .from('todos')
  //     .where('completed', 'eq', true)
  //     .select('*');
  //   return todos;
  // };

  const pieData = [
    { value: 70, color: 'crimson' },

    { value: 30, color: 'gray' },
  ];

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Profile',
          headerStyle: {
            backgroundColor: 'rgb(39,38,38)',
          },
          headerShadowVisible: false,
          headerTintColor: 'white',
          statusBarBackgroundColor: 'crimson',
        }}
      />
      <View className="flex-1 bg-[rgb(39,38,38)]  px-4">
        <View className=" gap-1 border border-gray-500 py-6  ">
          <Text className="text-white ">{user?.email}</Text>
          <Text className="text-lg font-medium text-[crimson]">18 tasks completed</Text>
        </View>
      </View>
    </>
  );
};

export default Profile;

//  {
//    /* <PieChart
//             donut
//             innerRadius={110}
//             animationDuration={1000}
//             isAnimated
//             innerCircleColor="rgb(39,38,38)]"
//             data={pieData}
//             centerLabelComponent={() => {
//               return <Text style={{ fontSize: 30, color: 'white' }}>70%</Text>;
//             }}
//           /> */
//  }

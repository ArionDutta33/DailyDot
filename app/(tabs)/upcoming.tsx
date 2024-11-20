import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

import { TabBarIcon } from '~/components/TabBarIcon';

const Upcoming = () => {
  return (
    <>
      <Tabs.Screen
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="upcoming" size={18} color={color} />,
        }}
      />
      <View>
        <Text>Upcoming</Text>
      </View>
    </>
  );
};

export default Upcoming;

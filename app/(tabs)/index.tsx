import { Stack } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const Home = () => {
  return (
    <>
      <View className="flex-1 bg-[rgb(39,38,38)] px-4">
        <View className="border-b border-gray-500 ">
          <Text className="py-2 text-xl font-medium text-white">20 Nov &#8226; Wednesday</Text>
        </View>
      </View>
    </>
  );
};

export default Home;

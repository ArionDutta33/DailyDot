import Checkbox from 'expo-checkbox';
import { Stack } from 'expo-router';
import moment from 'moment';
import React from 'react';
import { View, Text, FlatList, ScrollView, KeyboardAvoidingView } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';

import { tasks, TaskType } from '~/assets/data/tasks';
import TaskItemBox from '~/components/customComponents/taskBox';
const Home = () => {
  return (
    <>
      <View className="flex-1 bg-[rgb(39,38,38)] px-4">
        <View className="border-b border-gray-500 py-1">
          <Text className="py-2 text-xl font-medium text-white">
            {moment().format(` MMMM D , dddd`)}
          </Text>
        </View>

        <FlatList
          keyExtractor={(item) => item.id}
          data={tasks}
          renderItem={({ item }) => <TaskItemBox task={item} />}
        />
        <FloatingAction color="crimson" animated />
      </View>
    </>
  );
};

export default Home;

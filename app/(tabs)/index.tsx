import moment from 'moment';
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';

import { tasks } from '~/assets/data/tasks';
import TaskItemBox from '~/components/customComponents/taskBox';
import { useAuth } from '~/provider/AuthProvider';
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
          showsVerticalScrollIndicator={false}
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

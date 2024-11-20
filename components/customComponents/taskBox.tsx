import { SimpleLineIcons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import React from 'react';
import { View, Text } from 'react-native';

import { TaskType } from '~/assets/data/tasks';

const TaskItemBox = ({ task }: { task: TaskType }) => {
  return (
    <View className="flex-row items-center gap-3 border-b border-gray-500 py-6  ">
      <Checkbox onChange={() => {}} value={false} style={{ borderRadius: '100%' }} />
      <View>
        <Text className="text-xl  text-white">{task.title}</Text>
        <View>
          <SimpleLineIcons name="link" className="py-1" size={10} color="white" />
          <Text className="py-1 text-gray-400">{task.description}</Text>
          <Text className="text-white">1/4</Text>
        </View>
      </View>
    </View>
  );
};

export default TaskItemBox;

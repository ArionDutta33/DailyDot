import { SimpleLineIcons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { TodoTypes } from '~/types/todos';
const TaskItemBox = ({ todos }: { todos: TodoTypes }) => {
  return (
    <View className="flex-row items-center gap-3 border-b border-gray-500 py-6  ">
      <Checkbox
        color="rgb(99, 170, 242)"
        onChange={() => {}}
        value={false}
        style={{ borderRadius: '100%' }}
      />
      <View>
        <Text className="text-xl  text-white">{todos.title}</Text>
        <View>
          <SimpleLineIcons name="link" className="py-1" size={10} color="white" />
          <Text className="py-1  text-[#ddd]">{todos.description}</Text>
          <Text className="text-white">1/4</Text>
        </View>
      </View>
    </View>
  );
};

export default TaskItemBox;

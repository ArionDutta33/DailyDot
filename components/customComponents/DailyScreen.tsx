import React from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

const DailyScreen = () => {
  const pieData = [
    { value: 70, color: 'crimson' },

    { value: 30, color: 'lightgray' },
  ];

  return (
    <View className="flex-1 bg-[rgb(39,39,39)] px-6">
      <View className="my-4 flex-row border border-white">
        <View>
          <Text className="text-gray-300">Goal Progress</Text>
          <Text className="my-4 text-xl text-white">0/5 Tasks</Text>
        </View>
        <View>
          <PieChart
            donut
            innerRadius={80}
            data={pieData}
            centerLabelComponent={() => {
              return <Text style={{ fontSize: 30 }}>70%</Text>;
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default DailyScreen;

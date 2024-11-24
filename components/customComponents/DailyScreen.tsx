import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { BarChart, PieChart } from 'react-native-gifted-charts';

import { useAuth } from '~/provider/AuthProvider';
import { supabase } from '~/utils/supabase';

const DailyScreen = () => {
  const [barData, setBarData] = useState([]);
  const [taskSummary, setTaskSummary] = useState([]);
  const { user } = useAuth();

  //*fetch the completed tasks
  const fetchCompletedTasks = async () => {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7); // Filter for the last 7 days

      const { data, error } = await supabase
        .from('todos')
        .select('created_at')
        .eq('user_id', user?.id)
        .eq('is_completed', true)
        .gte('created_at', startDate.toISOString()); // Get tasks from the last 7 days

      if (error) throw error;

      const grouped = {};

      // Group tasks by day
      data.forEach((task) => {
        const date = new Date(task.created_at).toISOString().split('T')[0]; // Extract date
        grouped[date] = (grouped[date] || 0) + 1;
      });

      // Convert grouped data into chart format
      const chartData = Object.entries(grouped)
        .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB)) // Sort by date
        .map(([date, count]) => ({
          label: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }), // Weekday as label
          value: count,
          date, // Keep original date for reference
        }));

      setBarData(chartData);
      setTaskSummary(chartData);
    } catch (err) {
      console.error('Error fetching completed tasks:', err);
    }
  };

  useEffect(() => {
    if (user?.id) fetchCompletedTasks();
  }, [user]);

  const pieData = [
    { value: 70, color: 'crimson' },

    { value: 30, color: 'lightgray' },
  ];

  return (
    <View className="flex-1 bg-[rgb(39,39,39)] px-6">
      <View className=" my-10 flex-row border border-white">
        <View>
          <Text className="text-gray-300">Goal Progress</Text>
          <Text className="mt-4 text-xl text-white">0/5 Tasks</Text>
          <Text className="text-xs text-[crimson]">What's in your mind today</Text>
        </View>
        <View className="ml-auto border border-white">
          <PieChart
            donut
            backgroundColor="rgb(39,39,39)"
            innerRadius={50}
            data={pieData}
            radius={60}
            centerLabelComponent={() => {
              return <Text style={{ fontSize: 30, color: 'white ' }}>70%</Text>;
            }}
          />
        </View>
      </View>
      <View>
        <View>
          <BarChart
            data={barData}
            barWidth={22}
            barBorderRadius={4}
            frontColor="crimson"
            yAxisThickness={0}
            xAxisThickness={0}
          />
        </View>
      </View>
    </View>
  );
};

export default DailyScreen;

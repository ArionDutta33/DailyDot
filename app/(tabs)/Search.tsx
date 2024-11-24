import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

import { useAuth } from '~/provider/AuthProvider';
import { supabase } from '~/utils/supabase';

const DailyScreen = () => {
  const [barData, setBarData] = useState([]);
  const [taskSummary, setTaskSummary] = useState([]);
  const { user } = useAuth();

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

  return (
    <ScrollView className="flex-1 bg-[rgb(39,39,39)] px-6">
      <Text className="mt-6 text-center text-lg text-white">Tasks Completed (Last 7 Days)</Text>

      <BarChart
        data={barData}
        barWidth={22}
        barBorderRadius={4}
        frontColor="crimson"
        yAxisThickness={0}
        xAxisThickness={0}
      />

      <View className="mt-6">
        <Text className="text-lg text-white">Daily Task Breakdown:</Text>
        {taskSummary.map((task) => (
          <View key={task.date} className="mt-2 flex-row justify-between">
            <Text className="text-gray-300">
              {task.label} ({task.date})
            </Text>
            <Text className="text-white">{task.value} tasks</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default DailyScreen;

import { Stack } from 'expo-router';
import * as React from 'react';
import { View, useWindowDimensions, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import DailyScreen from '~/components/customComponents/DailyScreen';
import WeeklyScreen from '~/components/customComponents/WeeklyScreen';

const FirstRoute = () => <DailyScreen />;

const SecondRoute = () => <WeeklyScreen />;

const renderScene = SceneMap({
  daily: FirstRoute,
  weekly: SecondRoute,
});

const renderTabBar = (props) => (
  <TabBar
    {...props}
    activeColor="crimson"
    style={{
      backgroundColor: 'rgb(39,39,39)', // TabBar background color
    }}
    contentContainerStyle={{
      borderBottomWidth: 1, // Border bottom on TabBar
      borderBottomColor: 'rgb(39,39,39)', // Border color
    }}
    tabStyle={{
      borderBottomWidth: 2, // Add border bottom only to tabs
      borderBottomColor: 'transparent', // Default to transparent
    }}
    indicatorStyle={{
      backgroundColor: 'crimson', // Indicator color
      height: 2, // Indicator thickness
    }}
    labelStyle={{
      color: 'white', // Tab label color
      fontWeight: 'bold',
    }}
  />
);

const routes = [
  { key: 'daily', title: 'Daily' },
  { key: 'weekly', title: 'Weekly' },
];

export default function Profile() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  return (
    <>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          title: 'Productivity',
          headerStyle: { backgroundColor: 'rgb(39,39,39)' },
          headerTintColor: 'white',
        }}
      />
      <TabView
        renderTabBar={renderTabBar} // Use the custom TabBar
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </>
  );
}

import { Link, Tabs } from 'expo-router';

import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
        headerShadowVisible: false,
        tabBarInactiveTintColor: 'white',
        tabBarActiveBackgroundColor: 'crimson',
        animation: 'fade',
        lazy: true,
        tabBarBadge: '2',

        tabBarIconStyle: {},

        tabBarStyle: {
          padding: 10,
          backgroundColor: 'rgb(29,29,29)',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          headerTitleStyle: {
            fontWeight: 'light',
          },
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'rgb(39, 38, 38)',
          },
          tabBarIcon: ({ color }) => <TabBarIcon size={18} name="calendar" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon size={18} name="search" color={color} />,
        }}
      />
    </Tabs>
  );
}

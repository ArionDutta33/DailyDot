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

        tabBarStyle: {
          backgroundColor: 'rgb(29,29,29)',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',

          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'rgb(39, 38, 38)',
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
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
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}

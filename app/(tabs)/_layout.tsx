import { AntDesign, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
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
        name="Search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <SimpleLineIcons size={18} name="magnifier" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Upcoming"
        options={{
          title: 'Upcoming',
          tabBarIcon: ({ color }) => <AntDesign size={18} name="clockcircleo" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Browse"
        options={{
          title: 'Browse',
          tabBarIcon: ({ color }) => <Ionicons size={18} name="menu-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}

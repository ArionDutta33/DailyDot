import { Stack } from 'expo-router';

import AuthProvider from '~/provider/AuthProvider';

import '../global.css';
import { ToastProvider } from 'react-native-toast-notifications';
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </AuthProvider>
    </ToastProvider>
  );
}

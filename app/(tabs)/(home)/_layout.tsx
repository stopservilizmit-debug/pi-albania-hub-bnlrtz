
import { Stack } from 'expo-router';

export default function HomeLayout() {
  console.log('HomeLayout: Rendering home stack');
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}

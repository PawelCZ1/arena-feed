import { Stack } from "expo-router";
import {ThemeProvider, DarkTheme, DefaultTheme} from "@react-navigation/native";
import {useColorScheme} from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          animation: 'none',
          gestureEnabled: false
        }}
      />
      <Stack.Screen
          name="main"
          options={{
            animation: 'fade'
          }}
      />
    </Stack>
  </ThemeProvider>;
}
